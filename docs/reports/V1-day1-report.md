## Report: V1 Day 1 — Foundation + data (T002–T006, T028a, T008)
Status: Done

Branches / PRs: `task/T002-monorepo-tooling`, `task/T003-backend-scaffold`, `task/T004-frontend-scaffold`, `task/T005-shared-local-stack`, `task/T006-database-schema`, `task/T028a-import-wordpress`, `task/T008-public-read-api`. All were fast-forwarded to `main`, because `gh` isn't installed.

Summary: The monorepo, backend, frontend and shared package are running, and the existing content is in Supabase and served by a tested public API under `/api/v1`. The import is safe to re-run: a second run changed 0 records and made 0 network requests. Lint, typecheck, tests and build all pass locally. GitHub CI and the optional Docker Compose file could not be checked from this machine.

Versions: Node 26.13.0, pnpm 12.16.1, Next.js 16.4.4, React 19.3.1, NestJS 12.3.2, Prisma 7.10.1, Tailwind 4.3.3, TypeScript 6.0.3, Zod 4.6.7. See decision 0007 for why Prisma and TypeScript aren't at npm's `latest`.

Environment variables added:
- backend: NODE_ENV, PORT, DATABASE_URL, DIRECT_URL, DATABASE_SSL, DATABASE_SSL_CA_PATH, TEST_DATABASE_URL, FRONTEND_URL, SESSION_SECRET, RATE_LIMIT_PER_MINUTE, UPLOADS_DIR, PUBLIC_MEDIA_BASE_URL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM
- frontend: API_URL
- import script: WP_BASE_URL, WP_REQUEST_INTERVAL_MS, WP_CACHE_DIR, WP_USER_AGENT, URL_INVENTORY_PATH
- infra (optional Docker): POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT

Hard-coded values that could not be avoided:
- `scripts/import-wordpress/src/curation.ts`: firm facts WordPress can't supply. It is the source that loads them into the database.
- `frontend/src/lib/dictionary.ts`: firm name and description, for the placeholder pages only, until pages read Settings.
- `lang="en-GB"` and the `english` search language: fixed by DIRECTION.
- `MEDIA_CACHE_MAX_AGE` in `backend/src/app.setup.ts`: not yet moved to `shared/`.

Import counts (read back from Supabase): insights 32 (4 dropped), categories 9, practice areas 8, team 20 (partners 4, advocates 5, consultants 1, staff 10), profiles 10 (3 with full content), webinars 3, pages 5, offices 3, partners 3, awards 1, logos 14 (all hidden), testimonials 0, media 81, redirects 29, settings 7.

Data fixes made during import:
- Cecilia Njeri's displayed email now matches her link (cwangeci@warenlaw.com)
- WhatsApp numbers stored in international format
- Phones stored once, so +254 714 350 932 no longer dials the second number
- "Intergrity" corrected to "Integrity", and "insightso" corrected on Our Partners
- LinkedIn uses the current company address
- Booking link cleaned of a stray query string
- Nairobi map tightened to zoom 15, without the P.O. Box in its search
- `utm_source` removed from article links
- Past Trusts & Taxes webinar no longer asks people to register
- About no longer has the wrong canonical
- Two debt pages merged, without testimonials, statistics or unverified claims

API endpoints (all GET under `/api/v1`): settings; offices; pages/:slug; practice-areas; practice-areas/:slug; team (?practiceArea=); team/:slug; insights (?page=, ?pageSize=, ?category=); insights/:slug; categories; webinars (?state=); webinars/:slug; partners; awards; client-logos; testimonials; resolve/:slug; search?q=; redirects?path=. Also `/health` and media under `/uploads`.

How to run locally: `nvm use`, `pnpm install`, copy the `.env.example` files, fill in `backend/.env`, `pnpm dev`. Full steps are in README "Run locally". The site is at :3000 and the API at :4000.

Done when:
- T002 ✅ `pnpm install`, `pnpm lint` and `pnpm typecheck` pass. The workflow file exists, but its run on GitHub is unconfirmed.
- T003 ✅ The backend starts and `/health` reports the Supabase database as up, over TLS.
- T004 ✅ The frontend shows backend health; build, lint, typecheck and test pass.
- T005 ✅ A fresh clone, following the README, ran all three services. The Docker Compose file is only checked as valid YAML, because Docker isn't installed here.
- T006 ✅ `prisma migrate deploy` applied cleanly to Supabase, with no drift. Schemas compile in both apps.
- T028a ✅ `pnpm import:wp` filled Supabase with the counts above; re-running changed nothing.
- T008 ✅ Every endpoint returned real imported content on the built server. Tests pass: 60 backend tests, plus 16 of 16 read-only checks against Supabase. Endpoints are listed in `backend/README.md`.

Dependencies added:
- backend: @nestjs/common, core, platform-express, throttler; @prisma/client, @prisma/adapter-pg, prisma; pg; zod; helmet; dotenv; rxjs; reflect-metadata; dev: @nestjs/cli, schematics, testing; vitest, vite, supertest and type packages
- frontend: next, react, react-dom, zod, tailwindcss, @tailwindcss/postcss, postcss; dev: vitest, @vitejs/plugin-react, jsdom, Testing Library, type packages
- import script: cheerio, domhandler, sharp, csv-parse, tsx, plus the Prisma packages above
- root: eslint, @eslint/js, typescript-eslint, eslint-config-prettier, @next/eslint-plugin-next, eslint-plugin-react-hooks, globals, prettier, typescript

Decisions made: 0007 toolchain versions; 0008 row level security on every Supabase table; 0009 import assumptions.

Deviations:
- Prisma 7 rejects `url` and `directUrl` in `schema.prisma`, so `prisma.config.ts` holds the migration URL (decision 0007).
- `backend/.env` edits: fixed a typo in `DATABASE_URL` (`ostgresql://`), and pointed `DIRECT_URL` at the session pooler, because the direct host is IPv6-only and this machine has no IPv6. The original is kept as `DIRECT_URL_IPV6`.
- The pooler hostname (not the password or full connection string) appeared in tool output during migrations.
- An empty migration, `20261103135903_check_drift`, was created by mistake and applied. It changes nothing and stays in the history, because rewriting history on a live database is riskier.
- PostgreSQL 18 is installed locally in `~/.local` for tests, without sudo. Supabase and CI use 17.

Questions / blockers: no blockers.
For the planner:
1. Debt page: marked `approved` because every sentence was already published, though decision 0005 treats rewritten content as `needs_advocate_review`. Switching it would hide the page from the API.
2. Representative experience was imported as published, including Cecilia's "over 100 properties". Decision 0005 keeps unverified result claims out, so should it stay?
3. Media files are only in `backend/uploads/` on this machine. The staging deploy must copy them, or brief 05 must choose storage.
4. API responses took 0.2–3 s from here to Supabase in Frankfurt. The server's location and Next.js caching will decide real speed.
For the owner:
5. Download Supabase's CA certificate. Connections are encrypted, but the server isn't verified until `DATABASE_SSL=verify` is set.
6. Turn off Supabase's Data API if nothing needs it.
7. Check the GitHub Actions tab for the latest run on `main`.
For the firm (with audit 06):
8. Nobody is linked to Banking & Finance. Banking & Finance and Employment & Labour have no insights, and Regulatory Services has none after the 4 dropped posts.
9. 28 of 32 insights have no named author, 2 have no featured image, and 58 of 81 images have generated alt text to review.
10. Confirm the assumptions in decision 0009 (member types, offices, practice links, the Trusts & Taxes year).

Also noted: 7 redirects weren't loaded: 5 author URLs are redacted in the inventory and 2 MailPoet URLs are undecided. Author archives need a pattern rule in T021. Supabase calls failed briefly during testing: one run showed a DNS failure, and another a timeout and 500s whose cause wasn't captured. Repeat runs passed (39 of 39 requests, and the 16 checks), so this looks like the connection here, but it isn't proven.

Suggested next step: Planner reviews questions 1–3, then releases brief 04 (design and pages).
