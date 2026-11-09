# Project structure

One repository (monorepo) with two apps — **frontend** and **backend** — plus a **shared** package. Managed with pnpm workspaces. Planning lives in `docs/`.

```
Waren-Law/
├── README.md                    project overview, how to run, how to deploy
├── CLAUDE.md                    points to AGENTS.md
├── AGENTS.md                    rules for the agent
├── package.json                 root scripts (dev, build, lint, test)
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── tsconfig.base.json
├── eslint.config.mjs
├── .gitignore · .editorconfig · .nvmrc · .prettierrc.json · .prettierignore · .dockerignore
├── .github/workflows/ci.yml
│
├── frontend/                    NEXT.JS APP — public website + admin screens
│   ├── src/
│   │   ├── app/
│   │   │   ├── (site)/          public pages
│   │   │   ├── admin/           admin screens
│   │   │   └── api/             frontend-only endpoints — no business logic
│   │   ├── components/
│   │   │   ├── site/            header, footer, cards, home sections, templates
│   │   │   ├── admin/           editor forms, media picker, history
│   │   │   └── ui/              buttons, inputs, typography
│   │   ├── lib/
│   │   │   ├── api/             typed client for the backend
│   │   │   └── utils/           dictionary, navigation, content, seo, consent
│   │   ├── styles/
│   │   └── proxy.ts             redirects and trailing slashes
│   ├── public/
│   ├── tests/
│   │   ├── unit/
│   │   └── e2e/
│   ├── .env.example
│   ├── Dockerfile
│   ├── next.config.ts · tsconfig.json · postcss.config.mjs
│   ├── playwright.config.ts · vitest.config.ts
│   └── package.json
│
├── backend/                     NESTJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── modules/             one folder per feature
│   │   ├── common/
│   │   ├── config/
│   │   └── database/
│   ├── prisma/
│   ├── tests/                   API and end-to-end tests
│   ├── uploads/                 local media (git-ignored, except .gitkeep)
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json · nest-cli.json · tsconfig.json · vitest.config.ts
│
├── shared/
│   └── src/
│       ├── schemas/
│       ├── types/
│       └── constants/
│
├── infra/
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   ├── nginx/
│   └── scripts/                 build, start, deploy, backup, qa
│
├── scripts/
│   ├── import-wordpress/
│   └── check-theme.ts
│
└── docs/                        PLANNING — never deployed
    ├── README.md                index of these documents
    ├── DIRECTION.md
    ├── STRUCTURE.md             this file
    ├── PLAN.md
    ├── GROUND-RULES.md
    ├── WORKFLOW.md
    ├── FIRM-REVIEW.md
    ├── design/
    ├── decisions/
    ├── audit/
    └── seo/
```

## Rules
1. **Frontend never talks to the database.** All data goes through the backend API.
2. **Business logic lives in the backend.** `frontend/src/app/api/` is only for frontend concerns (e.g. the revalidate hook).
3. **One source of truth for data shapes:** every content type has a Zod schema in `shared/src/schemas/`. Backend validates requests with it; frontend validates forms with it.
4. **Database changes only through Prisma migrations** committed in `backend/prisma/migrations/`. Never edit the database by hand.
5. **One backend module per feature** (controller + service + DTOs + tests in its folder).
6. **Admin routes are protected twice:** the frontend hides them, the backend enforces the session on every admin endpoint.
7. **Secrets** (database URL, session secret, 2FA secret, email keys) live only in environment variables. Each app has an `.env.example` with names, never values. `.env` files are never committed.
8. **Uploads are not committed.** `backend/uploads/` is git-ignored; production media lives on a server volume.
9. **`docs/` is never deployed.**
10. **The `history` module** records every admin create, update, delete, publish and unpublish: who (the admin), when, which record, and a snapshot of the record before and after. The admin can view the history of any record and restore an earlier version (the restore is itself recorded).
11. **Tooling versions:** Node.js version in `.nvmrc`, pnpm version in root `package.json` (`packageManager`). Everyone, including the agent, uses those versions.
12. **Names:** folders and files lowercase kebab-case (except `README.md`, `CLAUDE.md`, `AGENTS.md`, `Dockerfile`, the `docs/*.md` index files and framework-required names).
13. **Generated output is never committed:** `.next/`, `dist/`, `node_modules/`, `coverage/`, `test-results/`, `playwright-report/`, `*.tsbuildinfo`.
