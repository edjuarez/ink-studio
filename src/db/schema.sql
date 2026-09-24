-- ============================================================
-- Sophie Art Tattoo - Canonical schema
-- ============================================================
-- Source of truth: production D1 (sophie-art-tattoo-db),
-- inspected on 2026-09-24.
--
-- PURPOSE:
--  - Documentation of the real database structure.
--  - Provisioning of a fresh LOCAL dev D1 so `wrangler dev` works:
--      npx wrangler d1 execute sophie-art-tattoo-db --local --file src/db/schema.sql
--
-- WARNINGS:
--  - Do NOT run this against the production database. Production already
--    has this structure and contains data.
--  - No destructive DDL. Uses CREATE TABLE IF NOT EXISTS only.
--  - designs.category_id -> design_categories.id is the source of truth.
--    designs.category is LEGACY: never write it and never drop it.
--  - No FOREIGN KEY constraint exists in production; integrity is enforced
--    in the worker (category_id is validated against design_categories).
--
-- ADMIN AUTH (panel /admin):
--  - admins: username + password_hash (PBKDF2, never plain text).
--    First admin is created with scripts/create-admin.mjs.
--  - sessions: random opaque token stored ONLY as SHA-256 hash; the raw
--    token lives in an HttpOnly cookie. Sessions are revoked on logout
--    and expire (default 12h). These two tables are NEW (not yet in the
--    production DB) and will be applied to production as part of the
--    admin panel deploy.
-- ============================================================

-- ------------------------------------------------------------
-- Admin authentication (new)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_hash TEXT NOT NULL UNIQUE,
  admin_id INTEGER NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Public content (existing production schema)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS design_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tattoos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_key TEXT NOT NULL,
  alt TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS designs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_key TEXT NOT NULL UNIQUE,
  alt TEXT NOT NULL,
  category TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  category_id INTEGER
);

CREATE TABLE IF NOT EXISTS prints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_key TEXT NOT NULL,
  alt TEXT NOT NULL,
  title TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);