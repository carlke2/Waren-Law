# T002: Monorepo tooling + CI

**Status:** Done
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
pnpm workspaces wired; `tsconfig.base.json` (strict); ESLint flat config + Prettier shared at root; root scripts `dev`, `build`, `lint`, `typecheck`, `test`, `format`; `.github/workflows/ci.yml` (pnpm cache → lint → typecheck → test → build on PR and push to `main`).

## Done when
- [x] root `pnpm install`, `pnpm lint`, `pnpm typecheck` pass.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
Root ESLint flat config, Prettier, strict `tsconfig.base.json`, root scripts and `.github/workflows/ci.yml` added. TypeScript is held at 6.0.x, because typescript-eslint and the Nest toolchain do not yet support 7.0 (decision 0007). Root `pnpm install`, `pnpm lint` and `pnpm typecheck` pass.
