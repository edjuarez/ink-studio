import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
  sophie_art_tattoo_db: D1Database;
  sophie_art_tattoo_images: R2Bucket;
}
type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  idea: string;
  placement: string;
  size: string;
  style: string;
  budget: string;
  date: string;
  availability: string;
  additional: string;
};
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      const data = await request.json() as ContactFormData;

      const resend = new Resend(env.RESEND_API_KEY);

      const { data: emailData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "edjuarezcba@gmail.com",
        subject: "Nueva consulta - Sophie Art Tattoo",
        html: `
          <h2>Nuevo contacto</h2>
          <p><strong>Nombre:</strong> ${data.name ?? "—"}</p>
          <p><strong>Email:</strong> ${data.email ?? "—"}</p>
          <p><strong>WhatsApp / Teléfono:</strong> ${data.phone ?? "—"}</p>
          <p><strong>Idea:</strong> ${data.idea ?? "—"}</p>
          <p><strong>Zona del cuerpo:</strong> ${data.placement ?? "—"}</p>
          <p><strong>Tamaño aproximado:</strong> ${data.size ?? "—"}</p>
          <p><strong>Estilo:</strong> ${data.style ?? "—"}</p>
          <p><strong>Presupuesto aproximado:</strong> ${data.budget ?? "—"}</p>
          <p><strong>Fecha:</strong> ${data.date ?? "—"}</p>
          <p><strong>Disponibilidad:</strong> ${data.availability ?? "—"}</p>
          <p><strong>Información adicional:</strong> ${data.additional ?? "—"}</p>
        `,
      });

      if (error) {
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
      });
    }
    if (url.pathname === "/api/tattoos" && request.method === "GET") {
      const featured = url.searchParams.get("featured") === "true";
      const limit = Number(url.searchParams.get("limit")) || 50;

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
          LIMIT ?
        `;

      const { results } = await env.sophie_art_tattoo_db
        .prepare(query)
        .bind(limit)
        .all();

      const R2_PUBLIC_URL =
        "https://pub-38c671ca23e94690aca2af9565c3231c.r2.dev";

      const tattoos = results.map((tattoo) => ({
        ...tattoo,
        image_url: `${R2_PUBLIC_URL}/${tattoo.image_key}`,
      }));

      return Response.json(tattoos);
    }
    if (url.pathname === "/api/designs" && request.method === "GET") {
      const featured = url.searchParams.get("featured") === "true";
      const limit = Number(url.searchParams.get("limit")) || 50;

      const query = featured
        ? `
          SELECT
            id,
            image_key,
            alt,
            category,
            featured,
            sort_order
          FROM designs
          WHERE featured = 1
          ORDER BY sort_order ASC
          LIMIT ?
        `
        : `
          SELECT
            id,
            image_key,
            alt,
            category,
            featured,
            sort_order
          FROM designs
          ORDER BY sort_order ASC
          LIMIT ?
        `;

      const { results } = await env.sophie_art_tattoo_db
        .prepare(query)
        .bind(limit)
        .all();

      const R2_PUBLIC_URL =
        "https://pub-38c671ca23e94690aca2af9565c3231c.r2.dev";

      const designs = results.map((design) => ({
        ...design,
        image_url: `${R2_PUBLIC_URL}/${design.image_key}`,
      }));

      return Response.json(designs);
    }
    if (url.pathname === "/api/prints" && request.method === "GET") {
      const featured = url.searchParams.get("featured") === "true";
      const limit = Number(url.searchParams.get("limit")) || 50;

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
          LIMIT ?
        `;

      const { results } = await env.sophie_art_tattoo_db
        .prepare(query)
        .bind(limit)
        .all();

      const R2_PUBLIC_URL =
        "https://pub-38c671ca23e94690aca2af9565c3231c.r2.dev";

      const prints = results.map((print) => ({
        ...print,
        image_url: `${R2_PUBLIC_URL}/${print.image_key}`,
      }));

      return Response.json(prints);
    }
    if (
      url.pathname === "/api/admin/sync-tattoos" &&
      request.method === "POST"
    ) {
      const listed = await env.sophie_art_tattoo_images.list({
        prefix: "tattoos/",
      });

      let inserted = 0;

      for (const object of listed.objects) {
        const imageKey = object.key;

        const existing = await env.sophie_art_tattoo_db
          .prepare("SELECT id FROM tattoos WHERE image_key = ?")
          .bind(imageKey)
          .first();

        if (existing) {
          continue;
        }
        if (imageKey.endsWith("/")) {
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
    if (
      url.pathname === "/api/admin/sync-designs" &&
      request.method === "POST"
    ) {
      const listed = await env.sophie_art_tattoo_images.list({
        prefix: "designs/",
      });

      let inserted = 0;

      for (const object of listed.objects) {
        const imageKey = object.key;

        // designs/{category}/{filename}
        const parts = imageKey.split("/");

        if (parts.length < 3) {
          continue;
        }
        if (imageKey.endsWith("/")) {
          continue;
        }
        const category = parts[1];

        const existing = await env.sophie_art_tattoo_db
          .prepare("SELECT id FROM designs WHERE image_key = ?")
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
    if (
      url.pathname === "/api/admin/sync-prints" &&
      request.method === "POST"
    ) {
      const listed = await env.sophie_art_tattoo_images.list({
        prefix: "prints/",
      });

      let inserted = 0;

      for (const object of listed.objects) {
        const imageKey = object.key;

        const existing = await env.sophie_art_tattoo_db
          .prepare("SELECT id FROM prints WHERE image_key = ?")
          .bind(imageKey)
          .first();

        if (existing) {
          continue;
        }
        if (imageKey.endsWith("/")) {
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
    return new Response("Ruta no encontrada", {
      status: 404,
    });
  },
};
