import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
  sophie_art_tattoo_db: D1Database;
  sophie_art_tattoo_images: R2Bucket;
}

const R2_PUBLIC_URL =
  "https://pub-38c671ca23e94690aca2af9565c3231c.r2.dev";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const adminEmail = "sophie.tattoo@icloud.com"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

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

          const extension =
            reference.type === "image/jpeg"
              ? "jpg"
              : reference.type === "image/png"
                ? "png"
                : "webp";

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
    // SYNC TATTOOS
    // ============================================================

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

    // ============================================================
    // SYNC DESIGNS
    // ============================================================

    if (
      url.pathname === "/api/admin/sync-designs" &&
      request.method === "POST"
    ) {
      const listed =
        await env.sophie_art_tattoo_images.list({
          prefix: "designs/",
        });

      let inserted = 0;

      for (const object of listed.objects) {
        const imageKey = object.key;

        if (imageKey.endsWith("/")) {
          continue;
        }

        const parts = imageKey.split("/");

        if (parts.length < 3) {
          continue;
        }

        const category = parts[1];

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

        await env.sophie_art_tattoo_db
          .prepare(`
            INSERT INTO designs (
              image_key,
              alt,
              category,
              featured,
              sort_order
            )
            VALUES (?, ?, ?, ?, ?)
          `)
          .bind(
            imageKey,
            `Design ${parts[parts.length - 1]}`,
            category,
            0,
            inserted
          )
          .run();

        inserted++;
      }

      return Response.json({
        message: "Designs sincronizados",
        inserted,
      });
    }

    // ============================================================
    // SYNC PRINTS
    // ============================================================

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

    // ============================================================
    // NOT FOUND
    // ============================================================

    return new Response("Ruta no encontrada", {
      status: 404,
    });
  },
};