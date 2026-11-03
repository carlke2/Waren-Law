# T003: Backend scaffold (NestJS)

**Status:** Blocked
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
`main.ts`, `app.module.ts`; `config/` with env validation (`NODE_ENV`, `PORT`, `DATABASE_URL`, `DIRECT_URL`, `FRONTEND_URL`, `SESSION_SECRET`, `SMTP_*`, `UPLOADS_DIR`, `PUBLIC_MEDIA_BASE_URL`); `database/` Prisma service; `schema.prisma` datasource uses `url = env("DATABASE_URL")` and `directUrl = env("DIRECT_URL")`; global validation pipe, JSON error filter, Helmet, CORS (only `FRONTEND_URL`, credentials), rate limiting, request logging; `GET /health` (checks DB); `backend/.env.example`; unit + e2e test for health.

## Done when
- [ ] backend starts, `/health` reports the Supabase database ok.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
Built and aligned with decision 0006: env validation (including `DIRECT_URL`, `UPLOADS_DIR`, `PUBLIC_MEDIA_BASE_URL`), Prisma service, validation pipe, JSON error filter, Helmet, CORS, rate limiting, request logging and `GET /health`. Unit and e2e tests pass against a local PostgreSQL.

**Blocked:** the done-when item needs `/health` to report the Supabase database. The owner must fill `DATABASE_URL` and `DIRECT_URL` in `backend/.env`.

**Prisma 7:** `url` and `directUrl` can't go in `schema.prisma`, so `prisma.config.ts` gives migrations `DIRECT_URL` and the driver adapter uses `DATABASE_URL` (decision 0007).
