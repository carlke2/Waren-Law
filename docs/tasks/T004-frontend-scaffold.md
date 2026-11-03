# T004: Frontend scaffold (Next.js)

**Status:** Done
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
App Router + TypeScript + Tailwind in `frontend/src` per STRUCTURE.md; `lib/api` typed fetch client using `API_URL`; root layout `lang="en-GB"`; placeholder home showing backend health; `/admin` placeholder with `noindex`; `frontend/.env.example`; one component test.

## Done when
- [x] frontend runs and shows backend health; build/lint/typecheck/test pass.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
Next.js 16 App Router with Tailwind 4, typed API client using `API_URL`, `lang="en-GB"` root layout, a home placeholder showing backend health, `/admin` with `noindex`, a UI wording dictionary (decision 0006) and a component test. Checked in the running build: the home page showed `ok` / `up` with the backend running and `unreachable` with it stopped. The backend used a local PostgreSQL for this check. The firm name is in the dictionary for this placeholder only and moves to Settings once the API serves it.
