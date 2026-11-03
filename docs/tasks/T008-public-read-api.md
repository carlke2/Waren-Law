# T008: Public read API

**Status:** Done
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
Versioned under `/api/v1`. Endpoints: settings; offices; pages by slug; practice areas (list, by slug with team + insights); team (list with `?practiceArea=` filter and grouping by memberType, by slug with insights); insights (paginated list, `?category=`, by slug with related); categories; webinars (`?state=`, by slug with panel); partners; awards; client logos (permitted only); testimonials (approved only); **slug resolver** `GET /api/v1/resolve/:slug` → `{ type, slug }`; search `GET /api/v1/search?q=` (PostgreSQL full-text over insights, practice areas, team); redirects lookup. Only `published` + `approved` content. Response shapes typed in `shared/`. Caching headers. E2E tests for every endpoint against the seeded/imported database.

## Done when
- [x] every endpoint returns real imported content; tests pass; endpoints listed in `backend/README.md`.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
Public read API under `/api/v1` with 19 routes, plus media serving, response shapes in `shared/` and caching headers, listed in `backend/README.md`. Hidden content is tested for every gate (draft, awaiting legal review, no logo permission, no testimonial consent). 36 fixture tests of the API and its database rules run in CI against a local database. `pnpm test:imported` checks real content read-only and passed 16 of 16 on Supabase. A smoke test of all routes on the built server returned 200.
