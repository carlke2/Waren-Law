# Backend

NestJS API (Node.js + TypeScript), PostgreSQL (Supabase) via Prisma. See the root `README.md` for the whole project.

## Run

Copy `.env.example` to `.env` and set `DATABASE_URL`, `DIRECT_URL` and `SESSION_SECRET` (see the root README). Then `pnpm dev` from the repo root runs the API on port 4000 with the frontend. Never print or commit connection strings.

For admin work, point `.env` at the `waren-dev` Supabase project, set `UPLOADS_DIR=uploads-dev` (git-ignored) and `ADMIN_WRITES_ALLOWED=true`. Only there may admin endpoints change data.

| Folder | What goes here |
|---|---|
| `src/modules/` | One module per feature (controller, service, DTOs), with its `*.spec.ts` unit tests |
| `tests/` | End-to-end tests against a local `waren_test` database |
| `prisma/` | Schema and committed migrations (`generated/` is built, git-ignored) |
| `uploads/` | Media files the **database** refers to (below) |
| `scripts/import-wordpress/` | The WordPress importer, with its tests and inputs (`data/`) |

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

`GET /api/v1/home` returns the Home page record. Until the firm approves it, it answers 404 unless `PREVIEW_UNREVIEWED_PAGES=true` (decision 0018).

`POST /api/v1/newsletter` accepts `{ email, website? }` and returns `{ received: true }`, whether or not the address is new. `website` is a honeypot. It stores a Subscriber with its consent time, and is limited per IP by `NEWSLETTER_RATE_LIMIT_PER_HOUR`. When `SMTP_*` is set it also emails a confirmation link to `GET /api/v1/newsletter/confirm?token=`, which redirects to the Home page.

## Uploads and database media

- `uploads/` holds firm content media: team portraits, insight and webinar images, client and partner logos, partner photos, award images and the home hero video. The folder is git-ignored. The importer creates its files, and deploys copy them to the server (`infra/scripts/deploy.sh`). Exception: the 4 approved grey partner portraits (`team-*-grey.webp`) are committed.
- Each file normally has a `Media` row (`fileName`, size, dimensions, alt text). Content records link to it by id: team portrait, insight featured image, webinar hero, client logo, partner logo and gallery, award image, home hero image, and settings such as the SEO image and about video poster.
- The API turns a `Media` row into a URL as `PUBLIC_MEDIA_BASE_URL/<fileName>` (`src/modules/content/content-presenter.service.ts`). The backend serves the folder at that path (`src/app.setup.ts`, `useStaticAssets(UPLOADS_DIR)`), and in production Nginx proxies and caches `/uploads/`.
- A few files are named in code instead of linked: `hero.mp4` (`HERO_VIDEO_FILE`, looked up by `src/modules/home/home.service.ts`), and the alternative portrait crops in `frontend/src/lib/utils/content/photo-files.ts` (`team-<slug>-profile|speaker|card|grey.webp`).
- **Before removing a file from `uploads/`, check both the code and the database** (read-only). A file is unused only if neither refers to it.

## WordPress importer

`scripts/import-wordpress/` reads the old WordPress site and **writes to the database** in `DATABASE_URL` and to `uploads/`. It rewrites curated pages. **Never run `pnpm import:wp`, or any other script that writes to the database, without the owner's approval and a list of what it would overwrite.** Its own tests (`pnpm --filter @waren/import-wordpress test`) do not touch the database.
