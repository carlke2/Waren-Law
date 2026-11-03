# T030a: Production build + containers

**Status:** Done
**Week:** 1 (Version 1, Day 3)
**Priority:** High

## Goal
- `frontend/Dockerfile` and `backend/Dockerfile`: multi-stage, pinned Node 26 base, non-root user, only production dependencies, healthchecks; Next.js standalone output.
- `infra/docker-compose.prod.yml`: frontend, backend, Nginx; **database is Supabase (external)**, so no Postgres service in prod; uploads on a named volume mounted into the backend; env from `.env` files on the server (examples committed, values never).
- `infra/nginx/`: reverse proxy for the site and `/api` + `/uploads` (or `api.` subdomain — choose one, record it), gzip/brotli, caching for static and media, security headers (HSTS, CSP compatible with consent-gated tags, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors), request size limit, `/wp-admin`, `/wp-login.php`, `/xmlrpc.php` → 410.
- Optional HTTP basic auth on the whole site, switched by env, for staging.
- `infra/scripts/`: `deploy.sh` (pull, build, migrate deploy, sync uploads, restart, health check), `backup-uploads.sh`.
- Docker is not installed on this machine: **build and run the production apps without Docker** (`pnpm build` + start both) for verification, and validate the compose and Nginx files with available linters/syntax checks. Record exactly what was and wasn't executed.

## Done when
- [x] production build runs locally end to end; container and Nginx files complete and validated as far as possible here.

## Files / inputs
- `docs/prompts/05-AGENT-V1-DAY3-FORMS-SEO-RELEASE.md`

## Result
Added multi-stage Dockerfiles (pinned Node 26, non-root, production dependencies only, healthchecks, Next.js standalone), `infra/docker-compose.prod.yml` (frontend, backend, Nginx, with Supabase external), Nginx config (one domain, gzip, caching, security headers and CSP, 1 MB limit, 410 for WordPress paths, optional staging password), env examples with `PREVIEW_UNREVIEWED_PAGES=false`, and `deploy.sh` and `backup-uploads.sh`.\n\n**Executed:** the backend ran from a `pnpm deploy --prod` folder (no dev tools) with the Dockerfile's health command; the frontend ran as the standalone server with static files copied as the Dockerfile does. This found and fixed a real bug: `SKIP_PRERENDER=true` at runtime made root pages return 500. Compose was parsed as YAML with its references checked, and scripts passed `bash -n`.\n\n**Not executed:** `docker build`, `docker compose`, `nginx -t`, hadolint and shellcheck, because Docker isn't installed and downloading those tools was not permitted here. Commands are in `docs/runbook.md`.
