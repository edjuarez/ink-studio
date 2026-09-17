# Reglas del proyecto

- Antes de hacer `git add`, `git commit` o `git push`, mostrar al usuario un resumen de los cambios y esperar su aprobación.

## Cloudflare

- El proyecto usa Cloudflare Workers + Vite Plugin.
- No modificar wrangler.jsonc sin explicar primero el motivo.
- No modificar secrets desde el código.
- Ejecutar npm run build antes de un deploy.
- Usar npx wrangler deploy para producción.
- No hacer cambios destructivos en infraestructura.