# WAREN LAW WEBSITE REBUILD — AGENT BRIEF 05: V1 DAY 3 — FORMS, SEO, PRODUCTION BUILD, QA, RELEASE

**Goal:** V1 is release-ready. Contact form works end to end, SEO and redirects are complete, the app runs as a production build (and in containers), QA passes, and V1 is tagged.

Follow `AGENTS.md`, `docs/DIRECTION.md`, `docs/STRUCTURE.md`, `docs/PLAN.md`, decisions 0003–0012.

**Prerequisite:** brief 04 (T012–T020) is merged into `main`. If not, stop and say so.

## 0. Before you start
Commit this brief and `docs/decisions/0012-*.md`. Apply decision 0012 (production env examples set `PREVIEW_UNREVIEWED_PAGES=false`; release notes list the advocate review items). Create task files T011a, T021, T030a, T031a, T032a (status `Ready`). README status → "Version 1 — Day 3: forms, SEO, release (brief 05)".

Code standards (0006) apply: minimal comments, nothing hard-coded.

## 1. Tasks (in order, one branch each)

### T011a — Contact form, end to end
- Backend `POST /api/v1/contact`: validates with the shared Zod schema; honeypot field (silently accept and discard bots); rate limit per IP (from env); stores a `ContactSubmission` with minimal data and `consentAt`; sends an email to the firm address from Settings via SMTP when `SMTP_*` env values are present.
- **If SMTP is not configured**, the submission is still stored and the API still returns success; log a single warning at startup that email delivery is disabled. Never fail the visitor because email is off.
- Email body: plain, no tracking; includes name, email, phone, message, source page, time.
- Frontend: enable the form from T020; loading, success and error states from the dictionary; accessible error messages; no full page reload.
- Retention: a scheduled job (interval from env) deletes submissions older than the retention period from env (default 12 months).
- Tests: validation, honeypot, rate limit, stored record, email sent when configured (mock transport), success when not configured.
**Done when:** submitting the form on a production build stores the record; tests pass.

### T021 — SEO layer + redirects
- Per-route `generateMetadata`: title template (from Settings), description, canonical (self, absolute, from `SITE_URL` env), Open Graph + Twitter cards (image from record or a default from Settings), `robots` (noindex for admin, search, 404, and **all pages when `SITE_INDEXABLE=false`**, which is the default for V1/staging).
- JSON-LD: `LegalService` + `Organization` (name, logo, offices with addresses, phones, socials), `WebSite` with `SearchAction`, `Person` for profiled team members, `Article` for insights (author, dates, image), `FAQPage` where an FAQ exists, `Event` for upcoming webinars, `BreadcrumbList`.
- `sitemap.xml` from indexable, published records only (no redirects, no noindex); `robots.txt` that follows `SITE_INDEXABLE` (disallow all when false).
- Verification tags (Google, Bing) from Settings, rendered only when `SITE_INDEXABLE=true`.
- Redirects: middleware looks up the Redirect table (cached, revalidated by env interval) and issues a single 301; add pattern rules: `/author/*` and `/zh/author/*` → `/our-team/`, `/zh` and `/zh/*` → path without `/zh`, `/tag/*` → `/insights/`, MailPoet URLs → `/insights/` (decision 0010). Trailing-slash policy matches the current site (with slash), one hop.
- RSS feed at `/feed/` (latest insights).
- Check every URL in `docs/seo/url-inventory.csv` against the production build: each returns 200 at the same path or one 301 to its `proposed_new_url`. Write the result table to `docs/reports/v1-url-check.md`.
**Done when:** URL check shows 0 failures (or each exception explained); metadata and JSON-LD validate (record how you checked).

### T030a — Production build + containers
- `frontend/Dockerfile` and `backend/Dockerfile`: multi-stage, pinned Node 26 base, non-root user, only production dependencies, healthchecks; Next.js standalone output.
- `infra/docker-compose.prod.yml`: frontend, backend, Nginx; **database is Supabase (external)**, so no Postgres service in prod; uploads on a named volume mounted into the backend; env from `.env` files on the server (examples committed, values never).
- `infra/nginx/`: reverse proxy for the site and `/api` + `/uploads` (or `api.` subdomain — choose one, record it), gzip/brotli, caching for static and media, security headers (HSTS, CSP compatible with consent-gated tags, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors), request size limit, `/wp-admin`, `/wp-login.php`, `/xmlrpc.php` → 410.
- Optional HTTP basic auth on the whole site, switched by env, for staging.
- `infra/scripts/`: `deploy.sh` (pull, build, migrate deploy, sync uploads, restart, health check), `backup-uploads.sh`.
- Docker is not installed on this machine: **build and run the production apps without Docker** (`pnpm build` + start both) for verification, and validate the compose and Nginx files with available linters/syntax checks. Record exactly what was and wasn't executed.
**Done when:** production build runs locally end to end; container and Nginx files complete and validated as far as possible here.

### T031a — Release runbook
`docs/runbook.md`: run V1 locally in production mode (one command), deploy to a server with Docker (prerequisites, env files, DNS records needed for a staging subdomain, first deploy, update, rollback), where logs are, how to re-run the import. Keep it short and exact.
**Done when:** someone else could follow it.

### T032a — V1 QA + release
On the production build:
- Click-through of every route in the sitemap on 390 px and 1366 px; no console errors; no broken images or links (run a link check across the built site).
- Lighthouse mobile on home, a practice page, an article, team, contact: record scores; fix anything below 90 in performance, accessibility, best practices or SEO, or explain why.
- Keyboard pass: header, mobile menu, team filter, accordion, video, consent, contact form.
- Consent: no Google/Meta requests before accept; they load after accept; reject keeps them off.
- Contact form: valid, invalid, honeypot.
- Write `docs/releases/v1.md`: what V1 contains, known gaps (from the content-gaps list), what comes in V2.
- Tag `v1.0.0` on `main` and push the tag.
**Done when:** all checks pass or are listed as known gaps; tag pushed.

## 2. Report (one combined report, then stop)
```
## Report: V1 Day 3 — Forms, SEO, release (T011a, T021, T030a, T031a, T032a)
Status: Done | Blocked
Branches / PRs / tag: <per task, v1.0.0>
Summary: <3–5 sentences>
URL check: <passed / failed counts>
Lighthouse (mobile): <per page: perf, a11y, best practices, SEO>
How to run V1 in production mode: <one command + URL>
Executed vs not executed (Docker/Nginx): <list>
Environment variables added: <names>
Known gaps for the client: <list>
Dependencies added: <list with reason>
Hard-coded values that could not be avoided: <list or "none">
Decisions made: <list or "none">
Questions / blockers: <list or "none">
Suggested next step: <one line>
```
