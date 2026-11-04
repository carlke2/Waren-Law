# WAREN Law — Website Rebuild

Working repository for rebuilding **[warenlaw.com](https://warenlaw.com)** (WAREN Law Advocates LLP, Nairobi & Nakuru) as a Next.js frontend and a Node.js (NestJS) backend with a custom admin panel. Planning happens in chat; the Claude execution agent builds from tasks in `docs/tasks/`.

- **Repository:** https://github.com/carlke2/Waren-Law
- **Start date:** 3 November 2026
- **Duration:** flexible — plan agreed after structure review ([`docs/PLAN.md`](docs/PLAN.md))
- **Status:** Frontend reset + Home page (brief 06)
- **Agent brief:** [`docs/prompts/06-AGENT-HOME-PAGE.md`](docs/prompts/06-AGENT-HOME-PAGE.md)

## Getting started

```bash
git clone https://github.com/carlke2/Waren-Law.git
cd Waren-Law
```

## Run locally

You need Node 26 (`nvm use`) and pnpm through Corepack. Node 26 doesn't bundle Corepack, so install it once with `npm i -g corepack`, then run `corepack enable`.

```bash
git clone https://github.com/carlke2/Waren-Law.git
cd Waren-Law
nvm use
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

In `backend/.env`, set:

- `DATABASE_URL`: Supabase pooler, transaction mode.
- `DIRECT_URL`: Supabase direct connection with `?sslmode=require`. The direct host is IPv6-only, so without IPv6 use the session pooler (the same pooler host on port 5432).
- `SESSION_SECRET`: the output of `openssl rand -hex 32`.

Never commit these values or paste them into chat, tickets or logs.

Locally and on staging, also set `PREVIEW_UNREVIEWED_PAGES=true` to show pages awaiting advocate review (decision 0011). Leave it out in production.

```bash
pnpm dev
```

This runs the shared package (watch), the backend at http://localhost:4000 and the frontend at http://localhost:3000.

A production frontend build needs the backend running, because it pre-renders every page from the API. To build without it, as CI does, set `SKIP_PRERENDER=true`; pages then render on request.

To run in production mode, use `pnpm prod`. Server deployment, logs and rollback are in [`docs/runbook.md`](docs/runbook.md).

### Tests and offline work

Tests never use Supabase. They need a local PostgreSQL with a database named `waren_test`, set as `TEST_DATABASE_URL` in `backend/.env`. To run one with Docker:

```bash
cp infra/.env.example infra/.env
docker compose --env-file infra/.env -f infra/docker-compose.yml up -d
pnpm test
```

Fill in `POSTGRES_PASSWORD` in `infra/.env` first.

## Folder structure

One repo, two apps (frontend + backend) and a shared package, managed with pnpm. Full layout and rules: [`docs/STRUCTURE.md`](docs/STRUCTURE.md).

| Folder | What goes here |
|---|---|
| `frontend/` | Next.js + React + TypeScript + Tailwind: public website and `/admin` screens |
| `backend/` | NestJS (Node.js + TypeScript) API, PostgreSQL via Prisma, media uploads |
| `shared/` | Types and validation schemas used by both apps |
| `infra/` | Docker Compose, Nginx, deploy and backup scripts |
| `scripts/` | One-off tools (e.g. WordPress migration) |
| `docs/` | Planning: direction, plan, tasks, decisions, audit, SEO, brand, prompts, reports (not deployed) |

## Current site at a glance

- **Current platform:** WordPress + Elementor (being replaced)
- **Practice areas (8):** Debt Recovery · Real Estate & Conveyancing · Mining & Energy · Banking & Finance · Litigation & Arbitration · Corporate & Commercial · Employment & Labour · Wealth Management
- **Audience signals:** Kenyan corporates and individuals; strong diaspora focus (succession, trusts, wealth protection)
- **Contact:** info@warenlaw.com · +254 714 350 932 · +254 719 278 594 · WhatsApp chat

## Working agreement

1. Everything starts here — plans, audits, drafts and agent work are committed to this repo.
2. Each change gets a clear commit message.
3. Decisions go in `docs/decisions/` so we can see later why something was done.
