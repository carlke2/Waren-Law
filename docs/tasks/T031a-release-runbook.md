# T031a: Release runbook

**Status:** Done
**Week:** 1 (Version 1, Day 3)
**Priority:** High

## Goal
`docs/runbook.md`: run V1 locally in production mode (one command), deploy to a server with Docker (prerequisites, env files, DNS records needed for a staging subdomain, first deploy, update, rollback), where logs are, how to re-run the import. Keep it short and exact.

## Done when
- [x] someone else could follow it.

## Files / inputs
- `docs/prompts/05-AGENT-V1-DAY3-FORMS-SEO-RELEASE.md`

## Result
`docs/runbook.md` covers running V1 locally in production mode with one command (`pnpm prod`), server prerequisites, env files with staging and live values, the staging DNS record, first deploy, update, rollback, logs, re-running the import, uploads backup, and the launch checklist from decision 0012. The Docker steps are written from the configuration but have not been executed, and the runbook says so.
