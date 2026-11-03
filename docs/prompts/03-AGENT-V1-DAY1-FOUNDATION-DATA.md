# WAREN LAW WEBSITE REBUILD — AGENT BRIEF 03: V1 DAY 1 — FOUNDATION + DATA

**Version 1 is due Thursday 5 November.** Today's goal: the production foundation is running and **all existing content is in PostgreSQL and served by the backend API**. This is real production code, not a prototype (decision 0005).

Follow `AGENTS.md`, `docs/DIRECTION.md`, `docs/STRUCTURE.md`, `docs/PLAN.md` (Version 1 section) and decisions 0003–0006.

**Code standards (decision 0006, enforced in every task):** minimal comments (self-explaining code; comment only a non-obvious *why*; no commented-out code or boilerplate comments) and **nothing hard-coded** — config in validated env variables, firm content in the database, fixed values in `shared/src/constants`, design values as tokens, UI wording in one frontend dictionary. No dead code, no `TODO`s, no `any`.

## 0. Before you start
1. Pull `main`. Commit the planner's new files if uncommitted: `AGENTS.md`, `docs/PLAN.md`, `docs/DIRECTION.md`, `docs/decisions/0004-*.md`, `0005-*.md`, `0006-*.md`, this brief (`docs: V1 plan and decisions`). Delete `docs/prompts/03-AGENT-PHASE0-FOUNDATION.md` if present (replaced by this brief).
2. Create task files from the template for T002, T003, T004, T005, T006, T028a, T008 (Goal + Done when from this brief), status `Ready`.
3. README: Status → "Version 1 — Day 1: foundation + data (brief 03)"; link this brief.
4. **Tooling:** Node 26 (`.nvmrc`) and pnpm (`packageManager`). If missing, install without sudo (`nvm install 26`, `corepack enable`). If that is not possible, stop and give the owner the exact commands.
5. **Database = Supabase PostgreSQL.** The owner puts the connection strings in `backend/.env` as `DATABASE_URL` (pooled, transaction mode, with the pgbouncer flag Supabase documents for Prisma) and `DIRECT_URL` (direct, for migrations). If `backend/.env` does not exist or these are empty, create it from `.env.example` with empty values and stop, asking the owner to fill them. **Never print, log, echo or commit these values.** Docker PostgreSQL in `infra/docker-compose.yml` stays optional for offline work and tests.

## 1. Rules
- Tasks **in order**, one branch each (`task/T00X-…`), merged to `main` only with lint, typecheck and tests passing (PR if `gh` exists, otherwise fast-forward and say so).
- **Current stable** versions of Next.js, React, NestJS, Prisma, Tailwind CSS, TypeScript, Zod, ESLint, Prettier. No beta/canary.
- **Speed matters, quality stays:** strict TypeScript, Zod validation, tests on API endpoints. No throwaway code.
- WordPress REST API: read-only, ~1 request/second, cache raw responses locally (git-ignored) so you never fetch twice.
- Never commit raw WordPress data, credentials or `.env` files.

## 2. Tasks

### T002 — Monorepo tooling + CI
pnpm workspaces wired; `tsconfig.base.json` (strict); ESLint flat config + Prettier shared at root; root scripts `dev`, `build`, `lint`, `typecheck`, `test`, `format`; `.github/workflows/ci.yml` (pnpm cache → lint → typecheck → test → build on PR and push to `main`).
**Done when:** root `pnpm install`, `pnpm lint`, `pnpm typecheck` pass.

### T003 — Backend scaffold (NestJS)
`main.ts`, `app.module.ts`; `config/` with env validation (`NODE_ENV`, `PORT`, `DATABASE_URL`, `DIRECT_URL`, `FRONTEND_URL`, `SESSION_SECRET`, `SMTP_*`, `UPLOADS_DIR`, `PUBLIC_MEDIA_BASE_URL`); `database/` Prisma service; `schema.prisma` datasource uses `url = env("DATABASE_URL")` and `directUrl = env("DIRECT_URL")`; global validation pipe, JSON error filter, Helmet, CORS (only `FRONTEND_URL`, credentials), rate limiting, request logging; `GET /health` (checks DB); `backend/.env.example`; unit + e2e test for health.
**Done when:** backend starts, `/health` reports the Supabase database ok.

### T004 — Frontend scaffold (Next.js)
App Router + TypeScript + Tailwind in `frontend/src` per STRUCTURE.md; `lib/api` typed fetch client using `API_URL`; root layout `lang="en-GB"`; placeholder home showing backend health; `/admin` placeholder with `noindex`; `frontend/.env.example`; one component test.
**Done when:** frontend runs and shows backend health; build/lint/typecheck/test pass.

### T005 — Shared package + local stack
`@waren/shared` workspace built with TypeScript (`schemas/`, `types/`, `constants/`), imported by both apps; `infra/docker-compose.yml` (optional local PostgreSQL with volume + healthcheck, for offline work/tests); root `pnpm dev` runs shared (watch) + backend + frontend; README "Run locally".
**Done when:** fresh clone → README steps → all three running.

### T006 — Database schema (full model)
Prisma schema for the **full data model** in `docs/audit/06-findings-and-recommendations.md` (Setting, Office, Page, PracticeArea, TeamMember, Insight, Category, Webinar, ClientLogo, Partner, Award, Testimonial, Media, ContactSubmission, Subscriber, Redirect, AdminUser, Session, ChangeHistory), with: shared status / publishedAt / timestamps / SEO fields; `legalReviewStatus` enum; many-to-many relations (TeamMember↔PracticeArea, Insight↔PracticeArea, Insight↔TeamMember, Insight↔Category, Webinar↔TeamMember); `TeamMember.memberType` (partner, advocate, consultant, staff); slugs unique **across** Page, PracticeArea, Insight and Webinar (enforce in a service + a `Slug` registry table or equivalent, documented). First migration. Matching Zod schemas + types in `shared/`.
**Done when:** `prisma migrate deploy` applies cleanly to Supabase (use `migrate dev` only against a local/shadow database, never reset the Supabase database without the owner's approval); schemas compile in both apps.

### T028a — Import existing content from the WordPress REST API
Script in `scripts/import-wordpress/` (TypeScript, run with `pnpm import:wp`), **idempotent** (safe to re-run; upserts by slug / legacy WordPress ID):
- **Insights:** all 36 posts → title, slug, excerpt, body converted from HTML to the block JSON format used by `Page/Insight.body` (document the format in `shared/`), publishedAt, categories, featured image, legacy ID, reading minutes. Drop the 4 generic ~120-word posts per decision 0004, but record them for redirects.
- **Categories:** keep 8, merge the rest as in audit 06; add a "Data Protection" category for the uncategorised data-protection articles.
- **Practice areas:** 8 records from the practice pages; **merge the two debt pages into `corporate-debt-recovery`** without testimonials or unverified claims; link related insights by category.
- **Team:** all 20 people (name, role, memberType, short bio, practice areas, office, contacts where public, portrait); full profile content for Janice, Ephraim and Cecilia; `hasProfile = true` for partners, advocates and consultants. Use the cleanest available portrait file.
- **Webinars:** 3 records with state (`recording` / `past`) and panel links.
- **Pages:** Home, About, Partners, Contact, Privacy text as Page records.
- **Settings + Offices:** phones, email, WhatsApp, socials (current LinkedIn URL), booking URL, tracking IDs from audit 06; offices Nairobi (head), Nakuru (branch), Beijing (joint).
- **Partners + Awards:** 3 partners; the Legal Insider 2025 award.
- **Client logos:** all 14 imported with `permissionConfirmed = false` (hidden).
- **Media:** download only images actually used by imported records into `backend/uploads/` (git-ignored), rename to clean kebab-case names, convert to WebP, keep `legacyUrl`, set alt text (existing or generated from context, flagged for review).
- **Redirects:** load `docs/seo/url-inventory.csv` rows with a different `proposed_new_url` into the Redirect table.
- Imported published content → `legalReviewStatus = approved` (decision 0005). Fix the known data errors while importing (Cecilia's email link, WhatsApp number format, phone link mismatch, "Intergrity" typo) and list each fix.
- Prints a summary (counts per entity, skipped items, warnings).
Source URLs, rate limit and paths come from env/config, not literals. **Done when:** `pnpm import:wp` fills the Supabase database with the counts above; re-running changes nothing.

### T008 — Public read API
Versioned under `/api/v1`. Endpoints: settings; offices; pages by slug; practice areas (list, by slug with team + insights); team (list with `?practiceArea=` filter and grouping by memberType, by slug with insights); insights (paginated list, `?category=`, by slug with related); categories; webinars (`?state=`, by slug with panel); partners; awards; client logos (permitted only); testimonials (approved only); **slug resolver** `GET /api/v1/resolve/:slug` → `{ type, slug }`; search `GET /api/v1/search?q=` (PostgreSQL full-text over insights, practice areas, team); redirects lookup. Only `published` + `approved` content. Response shapes typed in `shared/`. Caching headers. E2E tests for every endpoint against the seeded/imported database.
**Done when:** every endpoint returns real imported content; tests pass; endpoints listed in `backend/README.md`.

## 3. Report (one combined report after T008, then stop)

```
## Report: V1 Day 1 — Foundation + data (T002–T006, T028a, T008)
Status: Done | Blocked
Branches / PRs: <per task>
Summary: <3–5 sentences>
Versions: Node, pnpm, Next.js, React, NestJS, Prisma, Tailwind, TypeScript, Zod
Environment variables added: <names only, per app>
Hard-coded values that could not be avoided: <list with reason, or "none">
Import counts: insights, categories, practice areas, team (by type), profiles, webinars, pages, offices, partners, awards, logos, media, redirects
Data fixes made during import: <list>
API endpoints: <list>
How to run locally: <short steps>
Done when: <per task ✅ / ❌>
Dependencies added: <list>
Decisions made: <list or "none">
Questions / blockers: <list or "none">
Suggested next step: <one line>
```
