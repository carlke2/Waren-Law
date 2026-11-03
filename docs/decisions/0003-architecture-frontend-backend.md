# 0003: Separate frontend and backend, PostgreSQL, company server

**Date:** 3 November 2026
**Status:** Accepted (replaces the storage and hosting parts of 0001 and 0002)

## Decision
1. **Monorepo, two apps:** `frontend/` (Next.js + TypeScript) and `backend/` (Node.js + TypeScript, NestJS), plus `shared/` for types and validation schemas. pnpm workspaces.
2. **Admin screens live in the frontend** at `/admin` and talk to the backend API.
3. **PostgreSQL** via Prisma for all content; images stored on the server.
4. **Hosting on our company server** with Docker; firm's existing domain pointed to it. Hosting is paid at deployment (no longer limited to free plans).
5. **Single administrator account** (unchanged from 0002).

## Why
- Clear separation the owner asked for; each part can be developed, tested and deployed on its own, and the backend can serve other clients later.
- Next.js was pitched to the client; NestJS keeps the backend in Node + TypeScript with a consistent module structure the agent can follow.
- A real database gives a robust admin (drafts, history, relations such as advocates ↔ practice areas).
- Prisma supports PostgreSQL and MySQL, keeping the option to align with the firm's existing database later.
- Paid hosting removes the need for the GitHub-commit workaround.

## Consequences
- Content is stored in the database, not as files in the repo; `content/` folder is dropped.
- Need Docker Compose for local development and deployment, an Nginx reverse proxy, HTTPS certificates, database backups.
- Frontend ↔ backend contract defined in `shared/`; breaking changes caught at build time.
- Public pages pre-rendered and revalidated when the admin saves.
- Open: the firm's existing database type and how we align with it.
