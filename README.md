# Tattoo Artist Portfolio

Sitio web de portfolio para una tatuadora: galerías de tatuajes, diseños y prints, información de la artista y formulario de contacto para pedir cita.

## 🚧 Estado

En desarrollo.

## ✨ Funcionalidades

- Diseño responsive
- Hero con efecto parallax
- Selección de trabajos recientes
- Galerías de tatuajes, diseños y prints
- Información de la artista
- FAQ
- Sección de contacto con formulario
- Envío del formulario mediante Cloudflare Worker + Resend
- Página 404 para rutas inexistentes

## 🛠️ Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Cloudflare Workers + Vite Plugin
- Resend (envío del formulario de contacto)

## 📁 Estructura del Proyecto

```text
src/
├── components/
├── pages/
├── data/
├── App.tsx
├── main.tsx
└── worker.ts
```

## 🚀 Deploy

```bash
npm run build
npx wrangler deploy
```

### Variables de entorno

- `RESEND_API_KEY`: clave de API de Resend. Se define como secret (`npx wrangler secret put RESEND_API_KEY`) o en `.dev.vars` para desarrollo.
- `RESEND_FROM_EMAIL`: remitente del email. En prueba se usa `onboarding@resend.dev`; en producción debe ser un dominio verificado en Resend.
- `CONTACT_TO_EMAIL`: destinatario del formulario de contacto.

## 👤 Autor

Creado por **Eduardo Juarez**.