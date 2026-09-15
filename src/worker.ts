import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      const data = await request.json();

      const resend = new Resend(env.RESEND_API_KEY);

      const { data: emailData, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "edjuarezcba@gmail.com",
        subject: "Nuevo contacto - Sophie Art Tattoo",
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

    return new Response("Ruta no encontrada", {
      status: 404,
    });
  },
};