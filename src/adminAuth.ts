// ============================================================
// Admin authentication
// ============================================================
// Own auth (no Cloudflare Access, no ADMIN_TOKEN, no JWT de terceros):
//  - Password hashing: PBKDF2 (SHA-256) via Web Crypto, salt per user.
//  - Sessions: random opaque token stored in D1 as SHA-256 hash
//    (raw token only ever lives in the HttpOnly cookie).
//  - Cookie: HttpOnly, Secure (in production), SameSite=Strict.
//  - Guards every /api/admin/* route.
// ============================================================

const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;
const SESSION_COOKIE = "admin_session";
const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 256;

export type AdminSession = {
  adminId: number;
  username: string;
};

type SessionRow = {
  admin_id: number;
  username: string;
  expires_at: string;
};

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array<ArrayBuffer> {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");

  const normal = padded + "=".repeat((4 - (padded.length % 4)) % 4);

  const binary = atob(normal);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );

  return bytesToHex(new Uint8Array(digest));
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;

  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }

  return mismatch === 0;
}

async function pbkdf2Derive(
  password: string,
  salt: Uint8Array<ArrayBuffer>,
  iterations: number
): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    PBKDF2_KEYLEN
  );

  return new Uint8Array(bits);
}

// Format: pbkdf2$<iterations>$<salt_b64url>$<hash_hex>
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const derived = await pbkdf2Derive(password, salt, PBKDF2_ITERATIONS);

  return [
    "pbkdf2",
    String(PBKDF2_ITERATIONS),
    base64UrlEncode(salt),
    bytesToHex(derived),
  ].join("$");
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const parts = stored.split("$");

  if (parts.length !== 4 || parts[0] !== "pbkdf2") {
    return false;
  }

  const [, iterationsRaw, saltB64, expectedHex] = parts;

  const iterations = Number(iterationsRaw);

  if (!Number.isFinite(iterations) || iterations <= 0) {
    return false;
  }

  const salt = base64UrlDecode(saltB64);

  const derived = await pbkdf2Derive(password, salt, iterations);

  const expected = hexToBytes(expectedHex);

  if (derived.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(derived, expected);
}

function getCookieValue(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) {
    return null;
  }

  for (const part of cookieHeader.split(";")) {
    const index = part.indexOf("=");

    if (index === -1) {
      continue;
    }

    const key = part.slice(0, index).trim();

    if (key === name) {
      return decodeURIComponent(part.slice(index + 1).trim());
    }
  }

  return null;
}

function isSecureRequest(request: Request): boolean {
  return new URL(request.url).protocol === "https:";
}

function buildSessionCookie(
  token: string,
  request: Request,
  maxAgeSeconds: number
): string {
  const secure = isSecureRequest(request) ? "; Secure" : "";

  return [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "HttpOnly",
    `Max-Age=${maxAgeSeconds}`,
    `Path=/`,
    "SameSite=Strict",
    secure,
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearSessionCookie(request: Request): string {
  return buildSessionCookie("", request, 0);
}

export function sessionCookieName(): string {
  return SESSION_COOKIE;
}

async function getRawToken(request: Request): Promise<string | null> {
  const token = getCookieValue(request, SESSION_COOKIE);

  if (!token) {
    return null;
  }

  return token;
}

export async function validateSession(
  request: Request,
  db: D1Database
): Promise<AdminSession | null> {
  const token = await getRawToken(request);

  if (!token) {
    return null;
  }

  const tokenHash = await sha256Hex(token);

  const row = await db
    .prepare(
      `
        SELECT
          sessions.admin_id,
          sessions.expires_at,
          admins.username
        FROM sessions
        JOIN admins
          ON admins.id = sessions.admin_id
        WHERE sessions.token_hash = ?
      `
    )
    .bind(tokenHash)
    .first<SessionRow>();

  if (!row) {
    return null;
  }

  const expiresAt = Date.parse(row.expires_at);

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    await db
      .prepare("DELETE FROM sessions WHERE token_hash = ?")
      .bind(tokenHash)
      .run();

    return null;
  }

  return {
    adminId: Number(row.admin_id),
    username: row.username,
  };
}

export async function createSession(
  adminId: number,
  db: D1Database,
  request: Request
): Promise<{ token: string; cookie: string }> {
  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));

  const token = base64UrlEncode(tokenBytes);

  const tokenHash = await sha256Hex(token);

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  await db
    .prepare(
      `
        INSERT INTO sessions (token_hash, admin_id, expires_at)
        VALUES (?, ?, ?)
      `
    )
    .bind(tokenHash, adminId, expiresAt)
    .run();

  const cookie = buildSessionCookie(
    token,
    request,
    SESSION_DURATION_MS / 1000
  );

  return { token, cookie };
}

export async function destroySession(
  request: Request,
  db: D1Database
): Promise<void> {
  const token = await getRawToken(request);

  if (!token) {
    return;
  }

  const tokenHash = await sha256Hex(token);

  await db
    .prepare("DELETE FROM sessions WHERE token_hash = ?")
    .bind(tokenHash)
    .run();
}

export async function getAdminByUsername(
  username: string,
  db: D1Database
): Promise<{ id: number; username: string; password_hash: string } | null> {
  return db
    .prepare(
      `
        SELECT id, username, password_hash
        FROM admins
        WHERE username = ?
      `
    )
    .bind(username)
    .first<{ id: number; username: string; password_hash: string }>();
}