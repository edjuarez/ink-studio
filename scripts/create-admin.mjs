// ============================================================
// Create the first admin user for the admin panel.
//
// Usage:
//   node scripts/create-admin.mjs <username> <password>
//   node scripts/create-admin.mjs --remote <username> <password>
//
// Generates the PBKDF2 hash with the EXACT same format and
// parameters used by src/adminAuth.ts (Web Crypto, SHA-256,
// 100000 iterations, 256-bit key) and inserts the row into D1.
//
// Defaults to the LOCAL dev database. Pass --remote to target
// production. Never auto-create on production without an
// explicit --remote flag.
// ============================================================

import { execSync } from "node:child_process";

const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 256;

function toBase64Url(bytes) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return Buffer.from(binary, "binary")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function toHex(bytes) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password) {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);

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
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    PBKDF2_KEYLEN
  );

  const derived = new Uint8Array(bits);

  return [
    "pbkdf2",
    String(PBKDF2_ITERATIONS),
    toBase64Url(salt),
    toHex(derived),
  ].join("$");
}

function escapeSql(value) {
  return value.replace(/'/g, "''");
}

async function main() {
  const args = process.argv.slice(2);

  const remote = args.includes("--remote");

  const positional = args.filter((arg) => arg !== "--remote");

  const username = positional[0];
  const password = positional[1];

  if (!username || !password) {
    console.error("Uso: node scripts/create-admin.mjs [--remote] <username> <password>");
    process.exit(1);
  }

  const target = remote ? "--remote" : "--local";

  console.log(`Generando hash PBKDF2 para "${username}"...`);

  const passwordHash = await hashPassword(password);

  const sql = `INSERT INTO admins (username, password_hash) VALUES ('${escapeSql(username)}', '${escapeSql(passwordHash)}');`;

  console.log("Hash generado.");

  const command = `npx wrangler d1 execute sophie-art-tattoo-db ${target} --command "${sql.replace(/"/g, '\\"')}" --yes`;

  console.log(`\nINSERT a ejecutar en D1 (${remote ? "REMOTO" : "local"}):`);
  console.log(sql);

  try {
    execSync(command, {
      stdio: "inherit",
      shell: true,
    });
    console.log("\nAdministrador creado correctamente.");
  } catch (error) {
    console.error("\nError ejecutando wrangler d1 execute.");
    console.error("Podés ejecutar manualmente el INSERT de arriba.");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});