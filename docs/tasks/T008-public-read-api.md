# T008: Public read API

**Status:** Ready
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
Versioned under `/api/v1`. Endpoints: settings; offices; pages by slug; practice areas (list, by slug with team + insights); team (list with `?practiceArea=` filter and grouping by memberType, by slug with insights); insights (paginated list, `?category=`, by slug with related); categories; webinars (`?state=`, by slug with panel); partners; awards; client logos (permitted only); testimonials (approved only); **slug resolver** `GET /api/v1/resolve/:slug` → `{ type, slug }`; search `GET /api/v1/search?q=` (PostgreSQL full-text over insights, practice areas, team); redirects lookup. Only `published` + `approved` content. Response shapes typed in `shared/`. Caching headers. E2E tests for every endpoint against the seeded/imported database.

## Done when
- [ ] every endpoint returns real imported content; tests pass; endpoints listed in `backend/README.md`.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
