# Backend

NestJS API (Node.js + TypeScript), PostgreSQL via Prisma. See `docs/STRUCTURE.md`.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start with reload on port `PORT` (default 4000) |
| `pnpm build` · `pnpm start` | Compile to `dist/` and run the compiled app |
| `pnpm test` | Unit and e2e tests (always against a database named `waren_test`) |
| `pnpm db:migrate` | Create and apply a migration in development |
| `pnpm db:deploy` | Apply committed migrations |

## HTTP behaviour

- `GET /health` returns `{ "status": "ok", "database": "up" }`, or 503 if the database is down.
- Helmet headers, CORS for `FRONTEND_URL` only (with credentials), rate limiting by client address.
- Every error is JSON: `{ statusCode, error, message, details?, path, timestamp }`.
- The environment is validated at start-up (`src/config/env.schema.ts`); see `.env.example`.
