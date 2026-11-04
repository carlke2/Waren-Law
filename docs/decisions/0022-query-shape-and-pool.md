# 0022: Database query shape and connection pool

**Date:** 4 November 2026
**Status:** Accepted (brief 07)

## Decision
1. Prisma's `relationJoins` preview feature is on, so a query with relations is one round trip instead of one per relation.
2. Summary queries omit large columns (`body`, `faq`, `searchText`, `longBio` and the JSON profile lists).
3. Practice-area responses carry at most `RELATED_INSIGHTS_LIMIT` insights, the number the page shows.
4. `DATABASE_POOL_MIN` (default 4) keeps connections open.

## Why
A round trip to Supabase from this machine takes about 190 ms, and opening a connection takes about 1 s. Practice-area and insight pages made many round trips and downloaded every related article's full text only to discard it.

## Consequences
- `relationJoins` is a preview feature, so re-test it when upgrading Prisma.
- The under-1 s target is met by median on most endpoints but not on every call. See `docs/reports/T043-report.md`.
