# T003: Backend scaffold (NestJS)

**Status:** Ready
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
`main.ts`, `app.module.ts`; `config/` with env validation (`NODE_ENV`, `PORT`, `DATABASE_URL`, `FRONTEND_URL`, `SESSION_SECRET`, `SMTP_*` placeholders); `database/` Prisma service; global validation pipe, JSON error filter, Helmet, CORS (only `FRONTEND_URL`, credentials), rate limiting, request logging; `GET /health` (checks DB); `backend/.env.example`; unit + e2e test for health.

## Done when
- [ ] backend starts, `/health` ok with the database.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
