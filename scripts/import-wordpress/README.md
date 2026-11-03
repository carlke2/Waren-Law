# WordPress import

Reads the public WordPress REST API and page HTML, then upserts the content into the database in `DATABASE_URL`. Run it from the repo root with `pnpm import:wp`, after copying `.env.example` to `.env` here and applying migrations.

- **Safe to re-run:** a record is only written when it differs, so a repeat run changes nothing.
- **Polite:** requests are spaced by `WP_REQUEST_INTERVAL_MS`, and raw responses are cached in `.cache/` (git-ignored), so nothing is fetched twice.
- **Curated facts:** everything WordPress can't provide (member types, practice links, offices, settings, webinar states, what the debt merge keeps) is in `src/curation.ts`.
- **Media:** only images used by imported records are saved, as WebP, in the backend's `UPLOADS_DIR`.
- **Summary:** it prints counts per entity, data fixes, skipped items, notes for review and warnings.
