# T002: Monorepo tooling + CI

**Status:** Ready
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
pnpm workspaces wired; `tsconfig.base.json` (strict); ESLint flat config + Prettier shared at root; root scripts `dev`, `build`, `lint`, `typecheck`, `test`, `format`; `.github/workflows/ci.yml` (pnpm cache → lint → typecheck → test → build on PR and push to `main`).

## Done when
- [ ] root `pnpm install`, `pnpm lint`, `pnpm typecheck` pass.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
