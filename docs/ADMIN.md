# Administración

## Acceso

- /admin/login — usuario + contraseña (sesión en cookie `admin_session`).

## Crear administrador

- Local: `node scripts/create-admin.mjs <usuario> <contraseña>`
- Producción: `node scripts/create-admin.mjs --remote <usuario> <contraseña>`

## Agregar categoría (desde el panel)

1. Entrar a `/admin/disenos`.
2. Abrir el formulario de nuevo diseño.
3. Junto a la etiqueta "Categoría", pulsar "+ Nueva".
4. Escribir el nombre y confirmar (Enter o botón guardar).

La categoría se crea vía `POST /api/admin/design-categories` y se guarda en
`design_categories`. El slug se genera automáticamente (minúsculas, sin
acentos, espacios → guiones) y debe ser único; `sort_order` se asigna como
el máximo + 1. Al crearse, la categoría queda seleccionada en el formulario.

## Categorías actuales (design_categories)

| id | name       | slug        | sort_order |
| -- | ---------- | ----------- | ---------- |
| 1  | Op Art     | op-art      | 1          |
| 2  | Ornamental | ornamental  | 2          |
| 3  | Tradicional| tradicional | 3          |
| 4  | Linework   | linework    | 4          |

`Linework` se agregó en local y en producción (remote).

## Ver categorías

- Panel: selector de categoría en `/admin/disenos`.
- SQL: `npx.cmd wrangler d1 execute sophie-art-tattoo-db --remote --command "SELECT id, name, slug, sort_order FROM design_categories ORDER BY sort_order;"`

## Ver diseños

- Panel: `/admin/disenos`.
- SQL: `npx.cmd wrangler d1 execute sophie-art-tattoo-db --remote --command "SELECT id, alt, category_id, featured, sort_order FROM designs ORDER BY sort_order;"`

## Deploy

```
npm run build
npx.cmd wrangler deploy
```
