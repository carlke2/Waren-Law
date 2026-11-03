# WAREN LAW WEBSITE REBUILD — AGENT BRIEF 01: PROJECT STRUCTURE SETUP

You are the **execution agent** for rebuilding https://warenlaw.com (WAREN Law Advocates LLP, a Kenyan law firm, offices in Upper Hill, Nairobi and Nakuru).

Roles:
- **Planner** (separate chat): scopes, plans, writes your briefs, reviews your work.
- **You**: carry out exactly what each brief asks, then report back.
- **Owner** (the human): reviews and approves, passes messages between planner and you.

Repository: https://github.com/carlke2/Waren-Law

## This brief: set up the complete project structure and rules ONLY

- ✅ Create the full folder structure (frontend, backend, shared, infra, scripts, docs) and the project rules below.
- ✅ Create root workspace files: `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `.editorconfig`, `.nvmrc`.
- ❌ Do **not** visit, crawl or analyse warenlaw.com or the WordPress site.
- ❌ Do **not** install packages, run `create-next-app` / `nest new`, or write application code.
- ❌ Do **not** start any task in `docs/tasks/`.

When finished, report back and **stop**. The owner reviews the structure before development starts.

---

## 1. Project context

- **Build:** full rebuild in new code, replacing WordPress + Elementor.
- **Tech stack:**
  - Languages: TypeScript · HTML5 · Tailwind CSS
  - Frameworks and libraries: Next.js (routing, SSR, static generation) · React
  - Runtime: Node.js
  - Backend: NestJS (Node.js + TypeScript) · PostgreSQL · Prisma
- **Architecture:** monorepo (pnpm workspaces) with two apps and a shared package:
  - `frontend/` — Next.js: public website + admin screens at `/admin`
  - `backend/` — NestJS REST API at `api.warenlaw.com`: auth, content, media, contact form, PostgreSQL via Prisma
  - `shared/` — Zod schemas and TypeScript types used by both
  - Frontend calls backend over HTTPS/JSON at `API_URL`; backend allows only the frontend origin (CORS).
- **Admin:** one administrator account only (password + TOTP 2FA, httpOnly session cookie).
- **Hosting:** our company server with Docker (frontend, backend, PostgreSQL, Nginx + HTTPS); firm's existing domain pointed to it at launch.
- **Database note:** PostgreSQL now; we may align with the firm's existing database later, so keep data access behind Prisma.
- **Language:** English only, British spelling, professional and plain. Content never gives legal advice; legal content is marked `NEEDS ADVOCATE REVIEW` until the firm approves it.

---

## 2. The structure (used until the end of the project)

```
Waren-Law/
├── README.md · CLAUDE.md · AGENTS.md
├── package.json                 root scripts (dev, build, lint, test for all apps)
├── pnpm-workspace.yaml          lists frontend, backend, shared
├── .gitignore · .editorconfig · .nvmrc
│
├── frontend/                    NEXT.JS APP — public website + admin screens
│   ├── src/
│   │   ├── app/
│   │   │   ├── (site)/          public pages
│   │   │   ├── admin/           admin screens: login, dashboard, editors
│   │   │   └── api/             frontend-only endpoints (e.g. revalidate hook)
│   │   ├── components/
│   │   │   ├── site/
│   │   │   ├── admin/
│   │   │   └── ui/
│   │   ├── lib/
│   │   │   ├── api/             typed client for calling the backend
│   │   │   └── utils/
│   │   └── styles/
│   ├── public/
│   └── tests/
│
├── backend/                     NESTJS API (Node.js + TypeScript)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── settings/
│   │   │   ├── pages/
│   │   │   ├── practice-areas/
│   │   │   ├── team/
│   │   │   ├── insights/
│   │   │   ├── webinars/
│   │   │   ├── client-logos/
│   │   │   ├── media/
│   │   │   ├── contact/
│   │   │   └── history/
│   │   ├── common/              guards, filters, interceptors, pipes, decorators
│   │   ├── config/              environment config + validation
│   │   └── database/            Prisma service
│   ├── prisma/
│   │   └── migrations/
│   ├── uploads/                 local media in development (git-ignored, keep folder)
│   └── tests/
│
├── shared/
│   └── src/
│       ├── schemas/             Zod schemas per content type
│       ├── types/               TypeScript types / API contracts
│       └── constants/
│
├── infra/
│   ├── nginx/
│   └── scripts/
│
├── scripts/                     one-off tools (e.g. WordPress migration)
│
└── docs/                        PLANNING — never deployed
    ├── DIRECTION.md · STRUCTURE.md · PLAN.md
    ├── tasks/ · decisions/ · audit/ · seo/ · brand/ · prompts/ · reports/
```

Structure rules (must match `docs/STRUCTURE.md`):
1. Frontend never talks to the database. All data goes through the backend API.
2. Business logic lives in the backend. `frontend/src/app/api/` is only for frontend concerns.
3. Every content type has one Zod schema in `shared/src/schemas/`; backend and frontend both use it.
4. Database changes only through Prisma migrations in `backend/prisma/migrations/`.
5. One backend module per feature (controller + service + DTOs + tests in its folder).
6. Admin routes are protected twice: hidden in the frontend, enforced by the backend on every admin endpoint.
7. Secrets only in environment variables; each app gets an `.env.example` (names, never values); `.env` files never committed.
8. Uploads are not committed (`backend/uploads/` git-ignored).
9. `docs/` is never deployed.
10. Names: lowercase kebab-case, except `README.md`, `CLAUDE.md`, `AGENTS.md`, `Dockerfile`, `docs/*.md` index files and framework-required names.

---

## 3. Rules for every future task (must match `AGENTS.md`)

**How you work**
1. Read `AGENTS.md`, `docs/DIRECTION.md`, `docs/STRUCTURE.md`, then the task brief.
2. Only work on tasks marked `Status: Ready`, lowest number first. If none are Ready, stop and say so.
3. Set the task to `In progress`. Work on a branch named `task/T00X-short-name`.
4. Do only what the brief asks. No extra features; no new dependencies or services beyond what the brief allows (list any you add).
5. Unclear or blocked → set `Status: Blocked`, write the question under **Result**, stop. Never guess on legal content, brand assets, credentials or anything that costs money.
6. Check every **Done when** item. For code: lint, type check and tests must pass.
7. Commit as `T00X: what changed`. Open a pull request (or leave the branch pushed) with your report as its description.
8. Set the task to `Done` or `Blocked`, fill in **Result**, save the report to `docs/reports/T00X-report.md`.
9. Record any decision you made in `docs/decisions/` using the template.

**Never**
- Change or publish anything on the live warenlaw.com unless a task explicitly says so.
- Put passwords, keys, tokens or client data in the repo.
- Copy full articles from the current site into the repo (summaries only).
- Give legal advice in any content.
- Add a new paid service or external dependency without the planner's approval.

**Report format** (end every task with this)
```
## Report: T00X — <title>
Status: Done | Blocked
Branch / PR: <name or link>
Summary: <2–4 sentences>
Done when: <each item ✅ or ❌ with a note>
Files changed: <list>
Dependencies added: <list or "none">
Decisions made: <list or "none">
Questions / blockers: <list or "none">
Suggested next step: <one line>
```

---

## 4. What to do now

1. **Check what exists.** The planner has committed planning files (`README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/DIRECTION.md`, `docs/STRUCTURE.md`, `docs/PLAN.md`, `docs/decisions/`, `docs/tasks/`, `docs/prompts/`). Do **not** overwrite their content. Only add what is missing and fix anything that contradicts this brief (list every fix in your report). If none of these files exist, create them from this brief.
2. **Create every folder** in section 2. In each of `frontend/`, `backend/`, `shared/`, `infra/`, `scripts/` and in every subfolder of `frontend/src/`, `backend/src/` (including each module) and `shared/src/`, add a short `README.md` (1–3 lines) saying what belongs there and which rule applies. Use `.gitkeep` only for empty leaf folders where a README adds nothing (e.g. `backend/prisma/migrations/`, `backend/uploads/`).
3. **Root workspace files** (no installs):
   - `pnpm-workspace.yaml` listing `frontend`, `backend`, `shared`.
   - `package.json`: `"private": true`, name `waren-law`, `packageManager` set to pnpm, and placeholder scripts `dev`, `build`, `lint`, `test` that run across workspaces (`pnpm -r …`).
   - `.nvmrc` with the current Node.js LTS major version.
   - `.editorconfig` (2 spaces, LF, UTF-8, final newline).
   - `.gitignore` covering Node, Next.js, NestJS, Prisma and OS files: `node_modules/`, `.next/`, `out/`, `dist/`, `coverage/`, `.env*` (but not `.env.example`), `backend/uploads/*` (but keep `.gitkeep`), `*.log`, `.DS_Store`, `.vscode/` (except shared settings if added later).
4. **Commit** on a branch `setup/project-structure` with the message `Set up project structure and agent rules`, and open a pull request to `main`.
5. **Report** using the format in section 3 (use `SETUP` as the task ID), include the final folder tree (`tree -a -I '.git|node_modules'` or equivalent), and stop.
