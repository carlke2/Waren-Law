# Backend

NestJS API (Node.js + TypeScript), PostgreSQL via Prisma. See `docs/STRUCTURE.md`.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start with reload on port `PORT` (default 4000) |
| `pnpm build` · `pnpm start` | Compile to `dist/` and run the compiled app |
| `pnpm test` | Unit and e2e tests. They use only `TEST_DATABASE_URL`, a local database named `waren_test`, never Supabase |
| `pnpm test:imported` | Read-only checks of every endpoint against the imported content in `DATABASE_URL` |
| `pnpm db:migrate` | Create and apply a migration (local or shadow database only, never Supabase) |
| `pnpm db:deploy` | Apply committed migrations through `DIRECT_URL` |

## HTTP behaviour

- `GET /health` returns `{ "status": "ok", "database": "up" }`, or 503 if the database is down.
- Helmet headers, CORS for `FRONTEND_URL` only (with credentials), rate limiting by client address.
- Every error is JSON: `{ statusCode, error, message, details?, path, timestamp }`.
- Database connections use TLS (`DATABASE_SSL`).
- The app connects through the pooled `DATABASE_URL`; migrations use `DIRECT_URL` (`prisma.config.ts`).
- The environment is validated at start-up (`src/config/env.schema.ts`); see `.env.example`.

## Public read API

All routes are `GET`, under `/api/v1`, and return only published content (and legally approved content where the record has a review status). Response shapes are in `shared/src/schemas/api.ts`. Successful responses carry a public `Cache-Control` header.

| Endpoint | Returns |
|---|---|
| `/settings` | Site settings by key: firm, contact, WhatsApp, socials, booking, tracking, verification |
| `/offices` | Offices |
| `/pages/:slug` | One page |
| `/practice-areas` | All practice areas |
| `/practice-areas/:slug` | One practice area with its team and insights |
| `/team` | Team grouped by member type; filter with `?practiceArea=<slug>` |
| `/team/:slug` | One profile with its insights (partners, advocates and consultants only) |
| `/insights` | Paginated list; `?page=`, `?pageSize=`, `?category=<slug>` |
| `/insights/:slug` | One insight with related insights |
| `/categories` | Categories with insight counts |
| `/webinars` | Webinars; filter with `?state=upcoming`, `recording` or `past` |
| `/webinars/:slug` | One webinar with its panel |
| `/partners` | Partners with galleries |
| `/awards` | Visible awards |
| `/client-logos` | Only logos with permission confirmed |
| `/testimonials` | Only testimonials with consent and firm approval |
| `/resolve/:slug` | `{ type, slug }` for a root-level URL |
| `/search?q=` | Full-text search over insights, practice areas and team |
| `/redirects?path=` | The redirect for an old path, or 404 |

`POST /api/v1/contact` accepts the contact form: `{ firstName, lastName, email, phone?, message, source, website? }`. It returns `{ received: true }`, stores the submission and emails the firm when `SMTP_*` is set. `website` is a honeypot. Requests are limited per IP by `CONTACT_RATE_LIMIT_PER_HOUR`. Submissions older than `CONTACT_RETENTION_MONTHS` are deleted every `CONTACT_RETENTION_INTERVAL_HOURS`.

Uploaded media is served from the path in `PUBLIC_MEDIA_BASE_URL`.
