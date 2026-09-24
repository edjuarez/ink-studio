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
- admins (auth del panel admin)
- sessions (auth del panel admin)

## Admin panel

Rutas:

- /admin/login — login del panel
- /admin, /admin/tatuajes, /admin/disenos, /admin/prints — panel admin

Autenticación (propia, sin Cloudflare Access, sin ADMIN_TOKEN, sin localStorage):

- Usuario + contraseña en la tabla `admins`.
- La contraseña se guarda solo como hash PBKDF2-SHA-256
  (formato `pbkdf2$<iteraciones>$<salt_b64url>$<hash_hex>`).
- La sesión es un token aleatorio opaco guardado en D1 (tabla `sessions`)
  como SHA-256; el token crudo vive únicamente en la cookie
  `admin_session` (HttpOnly, Secure en producción, SameSite=Strict).
- El worker valida la sesión y protege todos los `/api/admin/*`.
- No exponer credenciales ni secretos al cliente.

Crear el primer admin:

- Local: `node scripts/create-admin.mjs <username> <password>`
- Producción: `node scripts/create-admin.mjs --remote <username> <password>`

Endpoints admin (todos requieren sesión salvo login):

- POST /api/admin/login — público
- POST /api/admin/logout
- GET  /api/admin/me
- GET  /api/admin/design-categories
- POST /api/admin/upload (multipart: file + prefix)
- CRUD /api/admin/tattoos
- CRUD /api/admin/designs
- CRUD /api/admin/prints
- POST /api/admin/sync-tattoos
- POST /api/admin/sync-designs
- POST /api/admin/sync-prints

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