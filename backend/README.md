# Backend

NestJS API (Node.js + TypeScript), PostgreSQL via Prisma. See `docs/STRUCTURE.md`.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start with reload on port `PORT` (default 4000) |
| `pnpm build` · `pnpm start` | Compile to `dist/` and run the compiled app |
| `pnpm test` | Unit and e2e tests. They use only `TEST_DATABASE_URL`, a local database named `waren_test`, never Supabase |
| `pnpm db:migrate` | Create and apply a migration (local or shadow database only, never Supabase) |
| `pnpm db:deploy` | Apply committed migrations through `DIRECT_URL` |

## HTTP behaviour

- `GET /health` returns `{ "status": "ok", "database": "up" }`, or 503 if the database is down.
- Helmet headers, CORS for `FRONTEND_URL` only (with credentials), rate limiting by client address.
- Every error is JSON: `{ statusCode, error, message, details?, path, timestamp }`.
- The app connects through the pooled `DATABASE_URL`; migrations use `DIRECT_URL` (`prisma.config.ts`).
- The environment is validated at start-up (`src/config/env.schema.ts`); see `.env.example`.
