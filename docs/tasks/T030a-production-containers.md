# T030a: Production build + containers

**Status:** Ready
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
- [ ] production build runs locally end to end; container and Nginx files complete and validated as far as possible here.

## Files / inputs
- `docs/prompts/05-AGENT-V1-DAY3-FORMS-SEO-RELEASE.md`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
