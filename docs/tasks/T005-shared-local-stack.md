# T005: Shared package + local stack

**Status:** Done
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
`@waren/shared` workspace built with TypeScript (`schemas/`, `types/`, `constants/`), imported by both apps; `infra/docker-compose.yml` (optional local PostgreSQL with volume + healthcheck, for offline work/tests); root `pnpm dev` runs shared (watch) + backend + frontend; README "Run locally".

## Done when
- [x] fresh clone → README steps → all three running.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
`@waren/shared` is built with TypeScript and imported by both apps, `pnpm dev` runs shared (watch), backend and frontend, and the README has Run locally steps. Verified from a fresh clone: `pnpm install --frozen-lockfile` and `pnpm dev` brought up all three, and the home page showed `ok` / `up` from Supabase. `infra/docker-compose.yml` is optional and uses PostgreSQL 17 to match Supabase. It has only been parsed as YAML, because Docker isn't installed on this machine.
