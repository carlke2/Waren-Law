# 0008: Row level security on every Supabase table

**Date:** 3 November 2026
**Status:** Accepted

## Decision
Every table in the `public` schema has row level security enabled with no policies. A test fails if a new table is added without it, so each new table's migration must enable it. `_prisma_migrations` was covered by the original migration when it ran on Supabase and is excluded from the test, because a fresh database creates it at a different time.

## Why
Supabase can expose the `public` schema through its automatic Data API. Without this, tables holding admin credentials, sessions, contact submissions and subscribers could be reached with the project's public key. The app connects as the table owner, which RLS doesn't restrict, so it keeps working.

## Consequences
- No content is reachable through the Supabase Data API. The NestJS API stays the only way in, as decision 0006 intends.
- The owner should also turn off the Data API in the Supabase dashboard if nothing needs it.
