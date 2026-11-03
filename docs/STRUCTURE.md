# Structure

This structure is used until the end of the project.

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

## Rules

- Frontend never talks to the database. All data goes through the backend API.
- Business logic lives in the backend. `frontend/src/app/api/` is only for frontend concerns.
- Every content type has one Zod schema in `shared/src/schemas/`; backend and frontend both use it.
- Database changes only through Prisma migrations in `backend/prisma/migrations/`.
- One backend module per feature (controller + service + DTOs + tests in its folder).
- Admin routes are protected twice: hidden in the frontend, enforced by the backend on every admin endpoint.
- Secrets only in environment variables; each app gets an `.env.example` (names, never values); `.env` files never committed.
- Uploads are not committed (`backend/uploads/` git-ignored).
- `docs/` is never deployed.
- Names: lowercase kebab-case, except README.md, CLAUDE.md, AGENTS.md, Dockerfile, docs/*.md index files and framework-required names.
