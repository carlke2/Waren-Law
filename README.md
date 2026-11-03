# Waren-Law

Full rebuild of [warenlaw.com](https://warenlaw.com) (WAREN Law Advocates LLP) in new code, replacing WordPress + Elementor.

A pnpm monorepo with two apps and a shared package:

- `frontend/`: Next.js public website and admin screens at `/admin`
- `backend/`: NestJS REST API with PostgreSQL via Prisma
- `shared/`: Zod schemas and TypeScript types used by both

Start with [AGENTS.md](AGENTS.md) for working rules, [docs/DIRECTION.md](docs/DIRECTION.md) for project context and [docs/STRUCTURE.md](docs/STRUCTURE.md) for the structure and its rules.
