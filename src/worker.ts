import { Resend } from "resend";
import {
  verifyPassword,
  createSession,
  validateSession,
  destroySession,
  clearSessionCookie,
  getAdminByUsername,
} from "./adminAuth";
import { R2_PUBLIC_URL, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from "./constants";

interface Env {
  RESEND_API_KEY: string;
  sophie_art_tattoo_db: D1Database;
  sophie_art_tattoo_images: R2Bucket;
}

const adminEmail = "sophie.tattoo@icloud.com";

type AdminSession = {
  adminId: number;
  username: string;
};

type JsonRecord = Record<string, unknown>;

async function readJsonBody(request: Request): Promise<JsonRecord | null> {
  try {
    const body: unknown = await request.json();

    if (body !== null && typeof body === "object" && !Array.isArray(body)) {
      return body as JsonRecord;
    }

    return null;
  } catch {
    return null;
  }
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toInt(value: unknown): number | null {
  const parsed = toNumber(value);

  return parsed === null ? null : Math.trunc(parsed);
}

function toFeatured(value: unknown): number {
  return value === true || value === 1 ? 1 : 0;
}

function imageExtension(type: string): string {
  return type === "image/jpeg"
    ? "jpg"
    : type === "image/png"
      ? "png"
      : "webp";
}

function unauthorized(): Response {
  return Response.json(
    { message: "No autorizado" },
    { status: 401 }
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // ============================================================
    // ADMIN AUTH: all routes under /api/admin/*
    // ============================================================

    if (url.pathname.startsWith("/api/admin/")) {
      // ----------------------------------------------------------
      // LOGIN (public, no session required)
      // ----------------------------------------------------------

      if (url.pathname === "/api/admin/login") {
        if (request.method !== "POST") {
          return Response.json(
            { message: "Método no permitido" },
            { status: 405 }
          );
        }

        const body = await readJsonBody(request);

        const username =
          typeof body?.username === "string" ? body.username.trim() : "";
        const password =
          typeof body?.password === "string" ? body.password : "";

        if (!username || !password) {
          return Response.json(
            { message: "Usuario y contraseña requeridos" },
            { status: 400 }
          );
        }

        const admin = await getAdminByUsername(
          username,
          env.sophie_art_tattoo_db
        );

        if (!admin) {
          return Response.json(
            { message: "Credenciales inválidas" },
            { status: 401 }
          );
        }

        const valid = await verifyPassword(password, admin.password_hash);

        if (!valid) {
          return Response.json(
            { message: "Credenciales inválidas" },
            { status: 401 }
          );
        }

        const { cookie } = await createSession(
          admin.id,
          env.sophie_art_tattoo_db,
          request
        );

        return new Response(
          JSON.stringify({
            message: "Sesión iniciada",
            username: admin.username,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": cookie,
            },
          }
        );
      }

      // ----------------------------------------------------------
      // LOGOUT (session required)
      // ----------------------------------------------------------

      if (url.pathname === "/api/admin/logout") {
        if (request.method !== "POST") {
          return Response.json(
            { message: "Método no permitido" },
            { status: 405 }
          );
        }

        const session = await validateSession(
          request,
          env.sophie_art_tattoo_db
        );

        if (!session) {
          return unauthorized();
        }

        await destroySession(request, env.sophie_art_tattoo_db);

        return new Response(
          JSON.stringify({ message: "Sesión cerrada" }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": clearSessionCookie(request),
            },
          }
        );
      }

      // ----------------------------------------------------------
      // SESSION REQUIRED for the rest of /api/admin/*
      // ----------------------------------------------------------

      const session: AdminSession | null = await validateSession(
        request,
        env.sophie_art_tattoo_db
      );

      if (!session) {
        return unauthorized();
      }

      // ==========================================================
      // GET /api/admin/me (session check)
      // ==========================================================

      if (
        url.pathname === "/api/admin/me" &&
        request.method === "GET"
      ) {
        return Response.json({
          message: "Sesión activa",
          username: session.username,
        });
      }

      // ==========================================================
      // GET /api/admin/design-categories
      // ==========================================================

      if (
        url.pathname === "/api/admin/design-categories" &&
        request.method === "GET"
      ) {
        const { results } = await env.sophie_art_tattoo_db
          .prepare(`
            SELECT
              id,
              name,
              slug,
              sort_order
            FROM design_categories
            ORDER BY sort_order ASC
          `)
          .all();

        return Response.json(results);
      }

      // ==========================================================
      // POST /api/admin/upload (multipart: file + prefix)
      // ==========================================================

      if (
        url.pathname === "/api/admin/upload" &&
        request.method === "POST"
      ) {
        const formData = await request.formData().catch(() => null);

        if (!formData) {
          return Response.json(
            { message: "Cuerpo inválido" },
            { status: 400 }
          );
        }

        const file = formData.get("file");

        if (!(file instanceof File)) {
          return Response.json(
            { message: "Archivo requerido" },
            { status: 400 }
          );
        }

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          return Response.json(
            { message: "Solo se permiten imágenes JPG, PNG o WebP." },
            { status: 400 }
          );
        }

        if (file.size > MAX_FILE_SIZE) {
          return Response.json(
            { message: "Cada imagen debe pesar menos de 5 MB." },
            { status: 400 }
          );
        }

        const prefix =
          typeof formData.get("prefix") === "string"
            ? String(formData.get("prefix"))
            : "";

        const validPrefix = /^(tattoos|prints)\/$|^designs\/[a-z0-9-]+\/$/.test(
          prefix
        );

        if (!validPrefix) {
          return Response.json(
            { message: "Prefijo de imagen inválido" },
            { status: 400 }
          );
        }

        const extension = imageExtension(file.type);

        const imageKey = `${prefix}${crypto.randomUUID()}.${extension}`;

        await env.sophie_art_tattoo_images.put(imageKey, file, {
          httpMetadata: {
            contentType: file.type,
          },
        });

        return Response.json({
          image_key: imageKey,
          image_url: `${R2_PUBLIC_URL}/${imageKey}`,
        });
      }

      // ==========================================================
      // TATTOOS CRUD
      // ==========================================================

      const tattooMatch = url.pathname.match(
        /^\/api\/admin\/tattoos\/(\d+)$/
      );

      if (tattooMatch && request.method === "PUT") {
        const body = await readJsonBody(request);

        if (!body) {
          return Response.json(
            { message: "Cuerpo inválido" },
            { status: 400 }
          );
        }

        const id = Number(tattooMatch[1]);

        const sets: string[] = [];
        const values: (string | number)[] = [];

        if (typeof body.alt === "string") {
          sets.push("alt = ?");
          values.push(body.alt.trim());
        }

        if (body.featured !== undefined) {
          sets.push("featured = ?");
          values.push(toFeatured(body.featured));
        }

        const sortOrder = toInt(body.sort_order);

        if (sortOrder !== null) {
          sets.push("sort_order = ?");
          values.push(sortOrder);
        }

        if (sets.length === 0) {
          return Response.json(
            { message: "Sin campos para actualizar" },
            { status: 400 }
          );
        }

        values.push(id);

        const result = await env.sophie_art_tattoo_db
          .prepare(`UPDATE tattoos SET ${sets.join(", ")} WHERE id = ?`)
          .bind(...values)
          .run();

        if (result.meta.changes === 0) {
          return Response.json(
            { message: "No encontrado" },
            { status: 404 }
          );
        }

        return Response.json({ message: "Tattoo actualizado" });
      }

      if (tattooMatch && request.method === "DELETE") {
        const id = Number(tattooMatch[1]);

        const item = await env.sophie_art_tattoo_db
          .prepare("SELECT image_key FROM tattoos WHERE id = ?")
          .bind(id)
          .first<{ image_key: string }>("image_key");

        const result = await env.sophie_art_tattoo_db
          .prepare("DELETE FROM tattoos WHERE id = ?")
          .bind(id)
          .run();

        if (result.meta.changes === 0) {
          return Response.json(
            { message: "No encontrado" },
            { status: 404 }
          );
        }

        if (item?.image_key) {
          await env.sophie_art_tattoo_images.delete(item.image_key);
        }

        return Response.json({ message: "Tattoo eliminado" });
      }

      if (url.pathname === "/api/admin/tattoos") {
        if (request.method === "GET") {
          const { results } = await env.sophie_art_tattoo_db
            .prepare(`
              SELECT
                id,
                image_key,
                alt,
                featured,
                sort_order
              FROM tattoos
              ORDER BY sort_order ASC
            `)
            .all();

          const tattoos = results.map((tattoo) => ({
            ...tattoo,
            image_url: `${R2_PUBLIC_URL}/${tattoo.image_key}`,
          }));

          return Response.json(tattoos);
        }

        if (request.method === "POST") {
          const body = await readJsonBody(request);

          if (!body) {
            return Response.json(
              { message: "Cuerpo inválido" },
              { status: 400 }
            );
          }

          const imageKey =
            typeof body.image_key === "string" ? body.image_key.trim() : "";
          const alt =
            typeof body.alt === "string" ? body.alt.trim() : "";

          if (!imageKey || !alt) {
            return Response.json(
              { message: "image_key y alt son obligatorios" },
              { status: 400 }
            );
          }

          const sortOrder = toInt(body.sort_order) ?? 0;

          const result = await env.sophie_art_tattoo_db
            .prepare(`
              INSERT INTO tattoos (
                image_key,
                alt,
                featured,
                sort_order
              )
              VALUES (?, ?, ?, ?)
            `)
            .bind(
              imageKey,
              alt,
              toFeatured(body.featured),
              sortOrder
            )
            .run();

          return Response.json(
            {
              id: result.meta.last_row_id,
              image_key: imageKey,
              image_url: `${R2_PUBLIC_URL}/${imageKey}`,
              alt,
              featured: toFeatured(body.featured),
              sort_order: sortOrder,
            },
            { status: 201 }
          );
        }
      }

      // ==========================================================
      // DESIGNS CRUD
      // ==========================================================

      const designMatch = url.pathname.match(
        /^\/api\/admin\/designs\/(\d+)$/
      );

      if (designMatch && request.method === "PUT") {
        const body = await readJsonBody(request);

        if (!body) {
          return Response.json(
            { message: "Cuerpo inválido" },
            { status: 400 }
          );
        }

        const id = Number(designMatch[1]);

        const sets: string[] = [];
        const values: (string | number)[] = [];

        if (typeof body.alt === "string") {
          sets.push("alt = ?");
          values.push(body.alt.trim());
        }

        if (body.featured !== undefined) {
          sets.push("featured = ?");
          values.push(toFeatured(body.featured));
        }

        const sortOrder = toInt(body.sort_order);

        if (sortOrder !== null) {
          sets.push("sort_order = ?");
          values.push(sortOrder);
        }

        const categoryId = toInt(body.category_id);

        if (categoryId !== null) {
          const category = await env.sophie_art_tattoo_db
            .prepare("SELECT id FROM design_categories WHERE id = ?")
            .bind(categoryId)
            .first<{ id: number }>("id");

          if (!category) {
            return Response.json(
              { message: "La categoría no existe" },
              { status: 400 }
            );
          }

          sets.push("category_id = ?");
          values.push(categoryId);
        }

        if (sets.length === 0) {
          return Response.json(
            { message: "Sin campos para actualizar" },
            { status: 400 }
          );
        }

        values.push(id);

        const result = await env.sophie_art_tattoo_db
          .prepare(`UPDATE designs SET ${sets.join(", ")} WHERE id = ?`)
          .bind(...values)
          .run();

        if (result.meta.changes === 0) {
          return Response.json(
            { message: "No encontrado" },
            { status: 404 }
          );
        }

        return Response.json({ message: "Design actualizado" });
      }

      if (designMatch && request.method === "DELETE") {
        const id = Number(designMatch[1]);

        const item = await env.sophie_art_tattoo_db
          .prepare("SELECT image_key FROM designs WHERE id = ?")
          .bind(id)
          .first<{ image_key: string }>("image_key");

        const result = await env.sophie_art_tattoo_db
          .prepare("DELETE FROM designs WHERE id = ?")
          .bind(id)
          .run();

        if (result.meta.changes === 0) {
          return Response.json(
            { message: "No encontrado" },
            { status: 404 }
          );
        }

        if (item?.image_key) {
          await env.sophie_art_tattoo_images.delete(item.image_key);
        }

        return Response.json({ message: "Design eliminado" });
      }

      if (url.pathname === "/api/admin/designs") {
        if (request.method === "GET") {
          const { results } = await env.sophie_art_tattoo_db
            .prepare(`
              SELECT
                designs.id,
                designs.image_key,
                designs.alt,
                designs.featured,
                designs.sort_order,
                designs.category_id,
                design_categories.slug AS category_slug,
                design_categories.name AS category_name
              FROM designs
              LEFT JOIN design_categories
                ON designs.category_id = design_categories.id
              ORDER BY designs.sort_order ASC
            `)
            .all();

          const designs = results.map((design) => ({
            ...design,
            image_url: `${R2_PUBLIC_URL}/${design.image_key}`,
          }));

          return Response.json(designs);
        }

        if (request.method === "POST") {
          const body = await readJsonBody(request);

          if (!body) {
            return Response.json(
              { message: "Cuerpo inválido" },
              { status: 400 }
            );
          }

          const imageKey =
            typeof body.image_key === "string" ? body.image_key.trim() : "";
          const alt =
            typeof body.alt === "string" ? body.alt.trim() : "";
          const categoryId = toInt(body.category_id);

          if (!imageKey || !alt || categoryId === null) {
            return Response.json(
              {
                message:
                  "image_key, alt y category_id son obligatorios",
              },
              { status: 400 }
            );
          }

          const category = await env.sophie_art_tattoo_db
            .prepare("SELECT id FROM design_categories WHERE id = ?")
            .bind(categoryId)
            .first<{ id: number }>("id");

          if (!category) {
            return Response.json(
              { message: "La categoría no existe" },
              { status: 400 }
            );
          }

          const sortOrder = toInt(body.sort_order) ?? 0;

          const result = await env.sophie_art_tattoo_db
            .prepare(`
              INSERT INTO designs (
                image_key,
                alt,
                featured,
                sort_order,
                category_id
              )
              VALUES (?, ?, ?, ?, ?)
            `)
            .bind(
              imageKey,
              alt,
              toFeatured(body.featured),
              sortOrder,
              categoryId
            )
            .run();

          return Response.json(
            {
              id: result.meta.last_row_id,
              image_key: imageKey,
              image_url: `${R2_PUBLIC_URL}/${imageKey}`,
              alt,
              featured: toFeatured(body.featured),
              sort_order: sortOrder,
              category_id: categoryId,
            },
            { status: 201 }
          );
        }
      }

      // ==========================================================
      // PRINTS CRUD
      // ==========================================================

      const printMatch = url.pathname.match(
        /^\/api\/admin\/prints\/(\d+)$/
      );

      if (printMatch && request.method === "PUT") {
        const body = await readJsonBody(request);

        if (!body) {
          return Response.json(
            { message: "Cuerpo inválido" },
            { status: 400 }
          );
        }

        const id = Number(printMatch[1]);

        const sets: string[] = [];
        const values: (string | number)[] = [];

        if (typeof body.alt === "string") {
          sets.push("alt = ?");
          values.push(body.alt.trim());
        }

        if (typeof body.title === "string") {
          sets.push("title = ?");
          values.push(body.title.trim());
        }

        if (body.featured !== undefined) {
          sets.push("featured = ?");
          values.push(toFeatured(body.featured));
        }

        const sortOrder = toInt(body.sort_order);

        if (sortOrder !== null) {
          sets.push("sort_order = ?");
          values.push(sortOrder);
        }

        if (sets.length === 0) {
          return Response.json(
            { message: "Sin campos para actualizar" },
            { status: 400 }
          );
        }

        values.push(id);

        const result = await env.sophie_art_tattoo_db
          .prepare(`UPDATE prints SET ${sets.join(", ")} WHERE id = ?`)
          .bind(...values)
          .run();

        if (result.meta.changes === 0) {
          return Response.json(
            { message: "No encontrado" },
            { status: 404 }
          );
        }

        return Response.json({ message: "Print actualizado" });
      }

      if (printMatch && request.method === "DELETE") {
        const id = Number(printMatch[1]);

        const item = await env.sophie_art_tattoo_db
          .prepare("SELECT image_key FROM prints WHERE id = ?")
          .bind(id)
          .first<{ image_key: string }>("image_key");

        const result = await env.sophie_art_tattoo_db
          .prepare("DELETE FROM prints WHERE id = ?")
          .bind(id)
          .run();

        if (result.meta.changes === 0) {
          return Response.json(
            { message: "No encontrado" },
            { status: 404 }
          );
        }

        if (item?.image_key) {
          await env.sophie_art_tattoo_images.delete(item.image_key);
        }

        return Response.json({ message: "Print eliminado" });
      }

      if (url.pathname === "/api/admin/prints") {
        if (request.method === "GET") {
          const { results } = await env.sophie_art_tattoo_db
            .prepare(`
              SELECT
                id,
                image_key,
                alt,
                title,
                featured,
                sort_order
              FROM prints
              ORDER BY sort_order ASC
            `)
            .all();

          const prints = results.map((print) => ({
            ...print,
            image_url: `${R2_PUBLIC_URL}/${print.image_key}`,
          }));

          return Response.json(prints);
        }

        if (request.method === "POST") {
          const body = await readJsonBody(request);

          if (!body) {
            return Response.json(
              { message: "Cuerpo inválido" },
              { status: 400 }
            );
          }

          const imageKey =
            typeof body.image_key === "string" ? body.image_key.trim() : "";
          const alt =
            typeof body.alt === "string" ? body.alt.trim() : "";

          if (!imageKey || !alt) {
            return Response.json(
              { message: "image_key y alt son obligatorios" },
              { status: 400 }
            );
          }

          const sortOrder = toInt(body.sort_order) ?? 0;

          const result = await env.sophie_art_tattoo_db
            .prepare(`
              INSERT INTO prints (
                image_key,
                alt,
                title,
                featured,
                sort_order
              )
              VALUES (?, ?, ?, ?, ?)
            `)
            .bind(
              imageKey,
              alt,
              typeof body.title === "string" ? body.title.trim() : null,
              toFeatured(body.featured),
              sortOrder
            )
            .run();

          return Response.json(
            {
              id: result.meta.last_row_id,
              image_key: imageKey,
              image_url: `${R2_PUBLIC_URL}/${imageKey}`,
              alt,
              title:
                typeof body.title === "string" ? body.title.trim() : null,
              featured: toFeatured(body.featured),
              sort_order: sortOrder,
            },
            { status: 201 }
          );
        }
      }

      // ==========================================================
      // SYNC TATTOOS (requires session)
      // ==========================================================

      if (
        url.pathname === "/api/admin/sync-tattoos" &&
        request.method === "POST"
      ) {
        const listed =
          await env.sophie_art_tattoo_images.list({
            prefix: "tattoos/",
          });

        let inserted = 0;

        for (const object of listed.objects) {
          const imageKey = object.key;

          if (imageKey.endsWith("/")) {
            continue;
          }

          const existing =
            await env.sophie_art_tattoo_db
              .prepare(
                "SELECT id FROM tattoos WHERE image_key = ?"
              )
              .bind(imageKey)
              .first();

          if (existing) {
            continue;
          }

          await env.sophie_art_tattoo_db
            .prepare(`
              INSERT INTO tattoos (
                image_key,
                alt,
                featured,
                sort_order
              )
              VALUES (?, ?, ?, ?)
            `)
            .bind(
              imageKey,
              `Tattoo ${imageKey.split("/").pop()}`,
              1,
              0
            )
            .run();

          inserted++;
        }

        return Response.json({
          message: "Tattoos sincronizados",
          inserted,
        });
      }

      // ==========================================================
      // SYNC DESIGNS (requires session)
      // ==========================================================

      if (
        url.pathname === "/api/admin/sync-designs" &&
        request.method === "POST"
      ) {
        const listed =
          await env.sophie_art_tattoo_images.list({
            prefix: "designs/",
          });

        let inserted = 0;
        let skipped = 0;

        for (const object of listed.objects) {
          const imageKey = object.key;

          if (imageKey.endsWith("/")) {
            continue;
          }

          const parts = imageKey.split("/");

          if (parts.length < 3) {
            continue;
          }

          const slug = parts[1];

          const existing =
            await env.sophie_art_tattoo_db
              .prepare(
                "SELECT id FROM designs WHERE image_key = ?"
              )
              .bind(imageKey)
              .first();

          if (existing) {
            continue;
          }

          const category =
            await env.sophie_art_tattoo_db
              .prepare(
                "SELECT id FROM design_categories WHERE slug = ?"
              )
              .bind(slug)
              .first();

          if (!category) {
            skipped++;
            continue;
          }

          await env.sophie_art_tattoo_db
            .prepare(`
              INSERT INTO designs (
                image_key,
                alt,
                featured,
                sort_order,
                category_id
              )
              VALUES (?, ?, ?, ?, ?)
            `)
            .bind(
              imageKey,
              `Design ${parts[parts.length - 1]}`,
              0,
              inserted,
              category.id
            )
            .run();

          inserted++;
        }

        return Response.json({
          message: "Designs sincronizados",
          inserted,
          skipped,
        });
      }

      // ==========================================================
      // SYNC PRINTS (requires session)
      // ==========================================================

      if (
        url.pathname === "/api/admin/sync-prints" &&
        request.method === "POST"
      ) {
        const listed =
          await env.sophie_art_tattoo_images.list({
            prefix: "prints/",
          });

        let inserted = 0;

        for (const object of listed.objects) {
          const imageKey = object.key;

          if (imageKey.endsWith("/")) {
            continue;
          }

          const existing =
            await env.sophie_art_tattoo_db
              .prepare(
                "SELECT id FROM prints WHERE image_key = ?"
              )
              .bind(imageKey)
              .first();

          if (existing) {
            continue;
          }

          await env.sophie_art_tattoo_db
            .prepare(`
              INSERT INTO prints (
                image_key,
                alt,
                title,
                featured,
                sort_order
              )
              VALUES (?, ?, ?, ?, ?)
            `)
            .bind(
              imageKey,
              `Print ${imageKey.split("/").pop()}`,
              null,
              0,
              inserted
            )
            .run();

          inserted++;
        }

        return Response.json({
          message: "Prints sincronizados",
          inserted,
        });
      }

      return Response.json(
        { message: "Ruta admin no encontrada" },
        { status: 404 }
      );
    }

    // ============================================================
    // CONTACT
    // ============================================================

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const formData = await request.formData();

        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const phone = String(formData.get("phone") ?? "");
        const idea = String(formData.get("idea") ?? "");
        const placement = String(formData.get("placement") ?? "");
        const size = String(formData.get("size") ?? "");
        const style = String(formData.get("style") ?? "");
        const budget = String(formData.get("budget") ?? "");

        const references = formData.getAll("references");

        const uploadedImages: {
          key: string;
          url: string;
        }[] = [];

        // ------------------------------------------------------------
        // Upload references to R2
        // ------------------------------------------------------------

        for (const reference of references) {
          if (!(reference instanceof File)) {
            continue;
          }

          if (!ALLOWED_IMAGE_TYPES.includes(reference.type)) {
            return Response.json(
              {
                message:
                  "Solo se permiten imágenes JPG, PNG o WebP.",
              },
              { status: 400 }
            );
          }

          if (reference.size > MAX_FILE_SIZE) {
            return Response.json(
              {
                message:
                  "Cada imagen debe pesar menos de 5 MB.",
              },
              { status: 400 }
            );
          }

          const extension = imageExtension(reference.type);

          const imageKey = `client-references/${crypto.randomUUID()}.${extension}`;

          await env.sophie_art_tattoo_images.put(
            imageKey,
            reference,
            {
              httpMetadata: {
                contentType: reference.type,
              },
            }
          );

          uploadedImages.push({
            key: imageKey,
            url: `${R2_PUBLIC_URL}/${imageKey}`,
          });
        }

        // ------------------------------------------------------------
        // Build references section for email
        // ------------------------------------------------------------

        const referencesHtml =
          uploadedImages.length > 0
            ? `
              <h3>Referencias</h3>
              <ul>
                ${uploadedImages
                  .map(
                    (image) => `
                      <li>
                        <a href="${image.url}" target="_blank">
                          Ver imagen
                        </a>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            `
            : `
              <p><strong>Referencias:</strong> No se adjuntaron imágenes.</p>
            `;

        // ------------------------------------------------------------
        // Send email with Resend
        // ------------------------------------------------------------

        const resend = new Resend(env.RESEND_API_KEY);

        const { data: emailData, error } =
          await resend.emails.send({
            from: "Sophie Art Tattoo <hola@sophiearttattoo.com>",
            to: adminEmail,
            replyTo: email,
            subject: "Nueva consulta - Sophie Art Tattoo",
            html: `
              <h2>Nueva consulta</h2>

              <h3>Datos del cliente</h3>

              <p>
                <strong>Nombre:</strong>
                ${name || "—"}
              </p>

              <p>
                <strong>Email:</strong>
                ${email || "—"}
              </p>

              <p>
                <strong>WhatsApp / Teléfono:</strong>
                ${phone || "—"}
              </p>

              <h3>Consulta</h3>

              <p>
                <strong>Idea:</strong>
                ${idea || "—"}
              </p>

              <p>
                <strong>Zona del cuerpo:</strong>
                ${placement || "—"}
              </p>

              <p>
                <strong>Tamaño aproximado:</strong>
                ${size || "—"}
              </p>

              <p>
                <strong>Estilo:</strong>
                ${style || "—"}
              </p>

              <p>
                <strong>Presupuesto aproximado:</strong>
                ${budget || "—"}
              </p>

              ${referencesHtml}
            `,
          });

        // ------------------------------------------------------------
        // If Resend fails, remove uploaded images from R2
        // ------------------------------------------------------------

        if (error) {
          await Promise.all(
            uploadedImages.map((image) =>
              env.sophie_art_tattoo_images.delete(image.key)
            )
          );

          return Response.json(
            {
              message: "Error enviando email",
              error,
            },
            { status: 500 }
          );
        }

        return Response.json({
          message: "Email enviado",
          email: emailData,
          references: uploadedImages,
        });
      } catch (error) {
        console.error("Error en /api/contact:", error);

        return Response.json(
          {
            message: "Error procesando el formulario",
          },
          { status: 500 }
        );
      }
    }

    // ============================================================
    // TATTOOS
    // ============================================================

    if (
      url.pathname === "/api/tattoos" &&
      request.method === "GET"
    ) {
      const featured =
        url.searchParams.get("featured") === "true";

      const limit =
        Number(url.searchParams.get("limit")) || 6;

      const query = featured
        ? `
          SELECT
            id,
            image_key,
            alt,
            featured,
            sort_order
          FROM tattoos
          WHERE featured = 1
          ORDER BY sort_order ASC
          LIMIT ?
        `
        : `
          SELECT
            id,
            image_key,
            alt,
            featured,
            sort_order
          FROM tattoos
          ORDER BY sort_order ASC
        `;

      const statement = featured
        ? env.sophie_art_tattoo_db
            .prepare(query)
            .bind(limit)
        : env.sophie_art_tattoo_db.prepare(query);

      const { results } = await statement.all();

      const tattoos = results.map((tattoo) => ({
        ...tattoo,
        image_url: `${R2_PUBLIC_URL}/${tattoo.image_key}`,
      }));

      return Response.json(tattoos);
    }

    // ============================================================
    // DESIGNS
    // ============================================================

    if (
      url.pathname === "/api/designs" &&
      request.method === "GET"
    ) {
      const featured =
        url.searchParams.get("featured") === "true";

      const limit =
        Number(url.searchParams.get("limit")) || 3;

      const query = featured
        ? `
          SELECT
            designs.id,
            designs.image_key,
            designs.alt,
            designs.featured,
            designs.sort_order,
            design_categories.name AS category,
            design_categories.slug AS category_slug
          FROM designs
          JOIN design_categories
            ON designs.category_id = design_categories.id
          WHERE designs.featured = 1
          ORDER BY designs.sort_order ASC
          LIMIT ?
        `
        : `
          SELECT
            designs.id,
            designs.image_key,
            designs.alt,
            designs.featured,
            designs.sort_order,
            design_categories.name AS category,
            design_categories.slug AS category_slug
          FROM designs
          JOIN design_categories
            ON designs.category_id = design_categories.id
          ORDER BY designs.sort_order ASC
        `;

      const statement = featured
        ? env.sophie_art_tattoo_db
            .prepare(query)
            .bind(limit)
        : env.sophie_art_tattoo_db.prepare(query);

      const { results } = await statement.all();

      const designs = results.map((design) => ({
        ...design,
        image_url: `${R2_PUBLIC_URL}/${design.image_key}`,
      }));

      return Response.json(designs);
    }

    // ============================================================
    // PRINTS
    // ============================================================

    if (
      url.pathname === "/api/prints" &&
      request.method === "GET"
    ) {
      const featured =
        url.searchParams.get("featured") === "true";

      const limit =
        Number(url.searchParams.get("limit")) || 3;

      const query = featured
        ? `
          SELECT
            id,
            image_key,
            alt,
            title,
            featured,
            sort_order
          FROM prints
          WHERE featured = 1
          ORDER BY sort_order ASC
          LIMIT ?
        `
        : `
          SELECT
            id,
            image_key,
            alt,
            title,
            featured,
            sort_order
          FROM prints
          ORDER BY sort_order ASC
        `;

      const statement = featured
        ? env.sophie_art_tattoo_db
            .prepare(query)
            .bind(limit)
        : env.sophie_art_tattoo_db.prepare(query);

      const { results } = await statement.all();

      const prints = results.map((print) => ({
        ...print,
        image_url: `${R2_PUBLIC_URL}/${print.image_key}`,
      }));

      return Response.json(prints);
    }

    // ============================================================
    // NOT FOUND
    // ============================================================

    return new Response("Ruta no encontrada", {
      status: 404,
    });
  },
};