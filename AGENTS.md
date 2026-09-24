# Sophie Art Tattoo

## Project

Professional tattoo artist website.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Cloudflare Workers
- Cloudflare D1
- Cloudflare R2
- Resend

## Structure

- src/pages
- src/components
- src/services
- src/types
- src/data
- src/worker.ts

## Database

D1 database:
sophie-art-tattoo-db

Tables:

- tattoos
- designs
- design_categories
- prints

## Storage

R2 bucket:

sophie-art-tattoo-images

Prefixes:

- tattoos/
- designs/
- prints/
- client-references/

## Rules

- Do not change the public API without approval.
- Do not add dependencies unless necessary.
- Keep business logic out of UI components.
- Use TypeScript.
- Do not use `any`.
- Preserve the existing visual design.
- Reuse existing components.
- Do not duplicate content already in data.ts.

## Verification

After TypeScript changes:

npm run build

Before completing a task:

- verify TypeScript
- verify build
- report modified files
- report remaining issues

# Reglas del proyecto

- Antes de hacer `git add`, `git commit` o `git push`, mostrar al usuario un resumen de los cambios y esperar su aprobación.

## Cloudflare

- El proyecto usa Cloudflare Workers + Vite Plugin.
- No modificar wrangler.jsonc sin explicar primero el motivo.
- No modificar secrets desde el código.
- Ejecutar npm run build antes de un deploy.
- Usar npx wrangler deploy para producción.
- No hacer cambios destructivos en infraestructura.