# Project structure

One repository (monorepo) with two apps — **frontend** and **backend** — plus a **shared** package. Managed with pnpm workspaces. Planning lives in `docs/`. Used until the end of the project.

```
Waren-Law/
├── README.md                    project overview, links, status
├── CLAUDE.md                    points to AGENTS.md (loaded automatically by Claude)
├── AGENTS.md                    rules + workflow for the agent
├── package.json                 root scripts (dev, build, lint, test for all apps)
├── pnpm-workspace.yaml          lists frontend, backend, shared
├── .gitignore · .editorconfig · .nvmrc
│
├── frontend/                    NEXT.JS APP — public website + admin screens
│   ├── src/
│   │   ├── app/
│   │   │   ├── (site)/          public pages: home, about, our-team, area-of-expertise,
│   │   │   │                    insights, contact, legal pages
│   │   │   ├── admin/           admin screens: login, dashboard, editors
│   │   │   └── api/             frontend-only endpoints (e.g. revalidate hook) — no business logic
│   │   ├── components/
│   │   │   ├── site/            header, footer, cards, team profile, video player …
│   │   │   ├── admin/           editor forms, media picker, history …
│   │   │   └── ui/              buttons, inputs, typography (shared design system)
│   │   ├── lib/
│   │   │   ├── api/             typed client for calling the backend
│   │   │   └── utils/
│   │   └── styles/              Tailwind config, design tokens, globals
│   ├── public/                  static assets (logo, icons, favicon)
│   ├── tests/
│   ├── .env.example
│   └── Dockerfile
│
├── backend/                     NESTJS API (Node.js + TypeScript)
│   ├── src/
│   │   ├── main.ts              app entry
│   │   ├── app.module.ts
│   │   ├── modules/             one folder per feature:
│   │   │   ├── auth/            login, 2FA, sessions, lockout
│   │   │   ├── settings/        phones, offices, socials, WhatsApp, About video
│   │   │   ├── pages/
│   │   │   ├── practice-areas/
│   │   │   ├── team/
│   │   │   ├── insights/
│   │   │   ├── webinars/
│   │   │   ├── client-logos/
│   │   │   ├── media/           uploads, resizing, alt text
│   │   │   ├── contact/         contact form → email
│   │   │   └── history/         change history + restore
│   │   ├── common/              guards, filters, interceptors, pipes, decorators
│   │   ├── config/              environment config + validation
│   │   └── database/            Prisma service
│   ├── prisma/
│   │   ├── schema.prisma        database tables
│   │   ├── migrations/
│   │   └── seed.ts              sample data for development
│   ├── uploads/                 local media in development (git-ignored)
│   ├── tests/
│   ├── .env.example
│   └── Dockerfile
│
├── shared/                      SHARED PACKAGE — used by frontend and backend
│   └── src/
│       ├── schemas/             Zod validation schemas per content type
│       ├── types/               TypeScript types / API contracts
│       └── constants/
│
├── infra/                       DEPLOYMENT
│   ├── docker-compose.yml       local development (Postgres, backend, frontend)
│   ├── docker-compose.prod.yml  company server
│   ├── nginx/                   reverse proxy + HTTPS config
│   └── scripts/                 deploy, backup, restore
│
├── scripts/                     one-off tools (e.g. WordPress content migration)
│
└── docs/                        PLANNING — never deployed
    ├── DIRECTION.md             agreed brief: architecture, design, language
    ├── STRUCTURE.md             this file
    ├── PLAN.md                  implementation plan (agreed after structure review)
    ├── tasks/                   task briefs T001, T002 … + _TEMPLATE.md
    ├── decisions/               decision records 0001, 0002 … + _TEMPLATE.md
    ├── audit/                   findings about the current site
    ├── seo/                     URL inventory, redirect map, keywords
    ├── brand/                   logo files, colours, fonts, brand rules
    ├── prompts/                 briefs given to the agent
    └── reports/                 agent task reports
```

## Rules
1. **Frontend never talks to the database.** All data goes through the backend API.
2. **Business logic lives in the backend.** `frontend/src/app/api/` is only for frontend concerns (e.g. the revalidate hook).
3. **One source of truth for data shapes:** every content type has a Zod schema in `shared/src/schemas/`. Backend validates requests with it; frontend validates forms with it.
4. **Database changes only through Prisma migrations** committed in `backend/prisma/migrations/`. Never edit the database by hand.
5. **One backend module per feature** (controller + service + DTOs + tests in its folder).
6. **Admin routes are protected twice:** the frontend hides them, the backend enforces the session on every admin endpoint.
7. **Secrets** (database URL, session secret, 2FA secret, email keys) live only in environment variables. Each app has an `.env.example` with names, never values (created in each app's scaffold task). `.env` files are never committed.
8. **Uploads are not committed.** `backend/uploads/` is git-ignored; production media lives on a server volume.
9. **`docs/` is never deployed.**
10. **The `history` module** records every admin create, update, delete, publish and unpublish: who (the admin), when, which record, and a snapshot of the record before and after. The admin can view the history of any record and restore an earlier version (the restore is itself recorded).
11. **Tooling versions:** Node.js version in `.nvmrc`, pnpm version in root `package.json` (`packageManager`). Everyone, including the agent, uses those versions.
12. **Names:** folders and files lowercase kebab-case (except `README.md`, `CLAUDE.md`, `AGENTS.md`, `Dockerfile`, the `docs/*.md` index files and framework-required names).
