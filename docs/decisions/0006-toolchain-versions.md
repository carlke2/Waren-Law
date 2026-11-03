# 0006: Toolchain versions where "latest" can't be used

**Date:** 3 November 2026
**Status:** Accepted

## Decision
1. **TypeScript 6.0.x, not 7.0.** TypeScript 7.0.2 is the latest stable release, but typescript-eslint 8 requires `<6.1.0` and the NestJS 12 template targets 6.0.
2. **Prisma 7.10.x, not 8.** The npm `latest` tag for Prisma points at `8.0.0-rc.29`, a release candidate. The brief forbids pre-releases, so we use the newest stable release.
3. **Node 26 has no bundled Corepack.** It is installed with `npm i -g corepack` (no sudo).

## Why
The brief asks for current stable versions with no beta or canary builds. These are the newest versions that are both stable and work together.

## Consequences
- Revisit TypeScript when typescript-eslint supports 7.x, and Prisma when 8.0 ships as stable.
