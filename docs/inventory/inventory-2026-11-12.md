# Project inventory — 12 November 2026 (T065)

This inventory is read-only. Nothing was moved, renamed, deleted or edited, and no git command that changes state was run. The only file created is this one. Commands used: `find`, `du`, `stat`, `md5sum`, `grep`, `git status/branch/tag/stash list/ls-files/check-ignore/log/ls-remote`.

- Taken from: `/home/engineer-salat/Documents/warren_law_courts`, branch `restore/pre-T061` at `6a14aeb`, working tree dirty (see §5).
- "Git" column values: **tracked** = in the index; **untracked** = not tracked and not ignored (shows in `git status`); **ignored** = matched by `.gitignore`.
- "Referenced by" means the file's name (or import path) appears in that file. A dash means no reference was found in code, tests, configs or docs.
- The database was **not** queried, so "not referenced in code" does not prove an upload is unused. The DB stores media URLs.

---

## 1. Full folder tree

Format: `folder/` — files in the folder and all its subfolders (direct files in brackets), apparent size. `node_modules/`, `.git/` and `.next/` are listed with their size but their contents are not counted.

Total: **1,189 files and 174 folders (152.5 MB)**, excluding node_modules, .git and .next. On disk the whole project is **2.0 GB**: `node_modules` 920 MB, `frontend/.next` 713 MB, `.git` 181 MB (`du -sh`).

- `./` — 1189 files (14 direct), 152.5 MB
  - `.git/` — **contents excluded**, 173.4 MB on disk
  - `.github/` — 1 files (0 direct), 1.1 KB
    - `workflows/` — 1 files (1 direct), 1.1 KB
  - `backend/` — 526 files (10 direct), 26.6 MB
    - `dist/` — 233 files (1 direct), 745.6 KB
      - `prisma/` — 58 files (0 direct), 252.9 KB
        - `generated/` — 58 files (10 direct), 252.9 KB
          - `internal/` — 6 files (6 direct), 243.3 KB
          - `models/` — 42 files (42 direct), 3.8 KB
      - `src/` — 174 files (6 direct), 251.2 KB
        - `common/` — 10 files (10 direct), 11.4 KB
        - `config/` — 4 files (4 direct), 6.7 KB
        - `database/` — 8 files (8 direct), 7.4 KB
        - `modules/` — 146 files (0 direct), 215.4 KB
          - `awards/` — 6 files (6 direct), 6.4 KB
          - `categories/` — 6 files (6 direct), 6.3 KB
          - `client-logos/` — 6 files (6 direct), 6.6 KB
          - `contact/` — 10 files (10 direct), 22.5 KB
          - `content/` — 8 files (8 direct), 11.2 KB
          - `faqs/` — 6 files (6 direct), 7.8 KB
          - `health/` — 6 files (6 direct), 6.1 KB
          - `home/` — 6 files (6 direct), 7.9 KB
          - `insights/` — 6 files (6 direct), 11.8 KB
          - `leads/` — 10 files (10 direct), 21.2 KB
          - `newsletter/` — 10 files (10 direct), 16.6 KB
          - `offices/` — 6 files (6 direct), 6.7 KB
          - `pages/` — 6 files (6 direct), 7.7 KB
          - `partners/` — 6 files (6 direct), 6.7 KB
          - `practice-areas/` — 6 files (6 direct), 10.9 KB
          - `redirects/` — 6 files (6 direct), 7.2 KB
          - `resolve/` — 6 files (6 direct), 10.2 KB
          - `search/` — 6 files (6 direct), 7.6 KB
          - `settings/` — 6 files (6 direct), 6.0 KB
          - `team/` — 6 files (6 direct), 11.5 KB
          - `testimonials/` — 6 files (6 direct), 6.2 KB
          - `webinars/` — 6 files (6 direct), 10.5 KB
    - `node_modules/` — **contents excluded**, 37.7 KB on disk
    - `prisma/` — 38 files (1 direct), 2.2 MB
      - `generated/` — 29 files (5 direct), 2.2 MB
        - `internal/` — 3 files (3 direct), 319.8 KB
        - `models/` — 21 files (21 direct), 1.8 MB
      - `migrations/` — 8 files (1 direct), 25.7 KB
        - `20261103135727_init/` — 1 files (1 direct), 21.5 KB
        - `20261103135903_check_drift/` — 1 files (1 direct), 30 B
        - `20261103140000_enable_row_level_security/` — 1 files (1 direct), 427 B
        - `20261103140540_add_insight_faq/` — 1 files (1 direct), 86 B
        - `20261103160000_add_search_indexes/` — 1 files (1 direct), 484 B
        - `20261104120000_add_home_content_and_newsletter/` — 1 files (1 direct), 1.9 KB
        - `20261104200000_add_lead_attribution/` — 1 files (1 direct), 1.1 KB
    - `src/` — 110 files (3 direct), 95.5 KB
      - `common/` — 6 files (6 direct), 4.6 KB
      - `config/` — 4 files (4 direct), 4.0 KB
      - `database/` — 7 files (7 direct), 4.8 KB
      - `modules/` — 90 files (1 direct), 76.9 KB
        - `auth/` — 1 files (1 direct), 193 B
        - `awards/` — 3 files (3 direct), 1.5 KB
        - `categories/` — 3 files (3 direct), 1.5 KB
        - `client-logos/` — 4 files (4 direct), 1.7 KB
        - `contact/` — 7 files (7 direct), 10.9 KB
        - `content/` — 4 files (4 direct), 5.3 KB
        - `faqs/` — 3 files (3 direct), 2.2 KB
        - `health/` — 4 files (4 direct), 2.5 KB
        - `history/` — 1 files (1 direct), 350 B
        - `home/` — 4 files (4 direct), 2.4 KB
        - `insights/` — 4 files (4 direct), 4.3 KB
        - `leads/` — 6 files (6 direct), 10.0 KB
        - `media/` — 1 files (1 direct), 122 B
        - `newsletter/` — 6 files (6 direct), 5.9 KB
        - `offices/` — 3 files (3 direct), 1.8 KB
        - `pages/` — 4 files (4 direct), 2.1 KB
        - `partners/` — 3 files (3 direct), 1.7 KB
        - `practice-areas/` — 4 files (4 direct), 3.8 KB
        - `redirects/` — 3 files (3 direct), 1.8 KB
        - `resolve/` — 3 files (3 direct), 3.2 KB
        - `search/` — 3 files (3 direct), 3.0 KB
        - `settings/` — 4 files (4 direct), 1.5 KB
        - `team/` — 4 files (4 direct), 4.1 KB
        - `testimonials/` — 3 files (3 direct), 1.5 KB
        - `webinars/` — 4 files (4 direct), 3.6 KB
    - `tests/` — 13 files (12 direct), 53.5 KB
      - `imported/` — 1 files (1 direct), 6.5 KB
    - `uploads/` — 122 files (122 direct), 23.5 MB
  - `docs/` — 218 files (7 direct), 83.7 MB
    - `audit/` — 7 files (7 direct), 131.7 KB
    - `decisions/` — 31 files (31 direct), 43.2 KB
    - `design/` — 7 files (3 direct), 99.8 KB
      - `assets/` — 1 files (1 direct), 3.0 KB
      - `reference/` — 3 files (3 direct), 77.1 KB
    - `media-library/` — 15 files (15 direct), 1.3 MB
    - `reports/` — 150 files (7 direct), 82.1 MB
      - `restore-pre-T061/` — 8 files (8 direct), 3.2 MB
      - `t055/` — 4 files (4 direct), 1.7 MB
      - `t057/` — 4 files (4 direct), 1.6 MB
      - `t058-header/` — 13 files (13 direct), 13.7 MB
      - `t059-intro/` — 13 files (13 direct), 5.6 MB
      - `t060-services/` — 5 files (5 direct), 1.9 MB
      - `t062-insights/` — 11 files (11 direct), 7.7 MB
      - `t063-prefooter/` — 11 files (11 direct), 6.9 MB
      - `t064-portraits/` — 65 files (1 direct), 33.5 MB
        - `output/` — 40 files (40 direct), 4.6 MB
        - `sheets/` — 4 files (4 direct), 4.3 MB
        - `work/` — 20 files (20 direct), 24.7 MB
      - `t064-team/` — 9 files (9 direct), 6.4 MB
    - `seo/` — 1 files (1 direct), 21.3 KB
  - `frontend/` — 181 files (11 direct), 10.6 MB
    - `.next/` — **contents excluded**, 702.5 MB on disk
    - `node_modules/` — **contents excluded**, 33.5 KB on disk
    - `public/` — 9 files (0 direct), 1.9 MB
      - `brand/` — 3 files (3 direct), 470.6 KB
      - `home/` — 6 files (6 direct), 1.4 MB
    - `src/` — 133 files (1 direct), 467.5 KB
      - `app/` — 25 files (5 direct), 67.5 KB
        - `(site)/` — 16 files (3 direct), 35.1 KB
          - `[slug]/` — 1 files (1 direct), 1.4 KB
          - `area-of-expertise/` — 1 files (1 direct), 2.0 KB
          - `book-a-consultation/` — 1 files (1 direct), 2.7 KB
          - `category/` — 2 files (0 direct), 3.4 KB
            - `[slug]/` — 2 files (1 direct), 3.4 KB
              - `page/` — 1 files (0 direct), 1.9 KB
                - `[page]/` — 1 files (1 direct), 1.9 KB
          - `faq/` — 1 files (1 direct), 1.3 KB
          - `insights/` — 3 files (1 direct), 5.2 KB
            - `page/` — 1 files (0 direct), 2.0 KB
              - `[page]/` — 1 files (1 direct), 2.0 KB
            - `webinars/` — 1 files (1 direct), 2.0 KB
          - `our-team/` — 3 files (1 direct), 9.3 KB
            - `[slug]/` — 1 files (1 direct), 7.7 KB
            - `area/` — 1 files (0 direct), 1.0 KB
              - `[practiceArea]/` — 1 files (1 direct), 1.0 KB
          - `search/` — 1 files (1 direct), 3.2 KB
        - `admin/` — 2 files (2 direct), 627 B
        - `api/` — 1 files (1 direct), 124 B
        - `feed/` — 1 files (1 direct), 869 B
      - `components/` — 72 files (0 direct), 211.4 KB
        - `site/` — 60 files (29 direct), 199.5 KB
          - `home/` — 23 files (23 direct), 74.6 KB
          - `templates/` — 8 files (8 direct), 27.8 KB
        - `ui/` — 12 files (12 direct), 12.0 KB
      - `lib/` — 30 files (1 direct), 59.5 KB
        - `api/` — 3 files (3 direct), 5.8 KB
        - `utils/` — 26 files (10 direct), 53.6 KB
          - `attribution/` — 1 files (1 direct), 1.5 KB
          - `consent/` — 2 files (2 direct), 3.6 KB
          - `content/` — 7 files (7 direct), 8.9 KB
          - `redirects/` — 2 files (2 direct), 2.2 KB
          - `seo/` — 4 files (4 direct), 9.9 KB
      - `styles/` — 5 files (3 direct), 127.5 KB
        - `fonts/` — 2 files (2 direct), 87.1 KB
    - `test-results/` — 3 files (1 direct), 2.3 MB
      - `home-visual-snapshots-home-matches-at-1440/` — 1 files (1 direct), 1.3 MB
      - `home-visual-snapshots-home-matches-at-390/` — 1 files (1 direct), 1.0 MB
    - `tests/` — 25 files (0 direct), 5.7 MB
      - `e2e/` — 10 files (6 direct), 5.7 MB
        - `snapshots/` — 4 files (4 direct), 5.7 MB
      - `unit/` — 15 files (15 direct), 27.4 KB
  - `infra/` — 18 files (4 direct), 20.7 KB
    - `env/` — 3 files (3 direct), 1.8 KB
    - `nginx/` — 4 files (1 direct), 4.2 KB
      - `snippets/` — 2 files (2 direct), 1.3 KB
      - `templates/` — 1 files (1 direct), 3.0 KB
    - `scripts/` — 7 files (4 direct), 11.0 KB
      - `qa/` — 3 files (3 direct), 7.3 KB
  - `node_modules/` — **contents excluded**, 800.4 MB on disk
  - `scripts/` — 165 files (1 direct), 31.0 MB
    - `import-wordpress/` — 164 files (6 direct), 31.0 MB
      - `.cache/` — 138 files (138 direct), 30.9 MB
      - `node_modules/` — **contents excluded**, 28.5 KB on disk
      - `src/` — 17 files (10 direct), 102.7 KB
        - `importers/` — 7 files (7 direct), 42.0 KB
      - `tests/` — 3 files (3 direct), 6.3 KB
  - `shared/` — 66 files (3 direct), 266.4 KB
    - `dist/` — 45 files (3 direct), 222.8 KB
      - `constants/` — 18 files (18 direct), 28.2 KB
      - `schemas/` — 15 files (15 direct), 187.6 KB
      - `types/` — 9 files (9 direct), 5.7 KB
    - `node_modules/` — **contents excluded**, 8.5 KB on disk
    - `src/` — 18 files (1 direct), 41.0 KB
      - `constants/` — 7 files (7 direct), 9.6 KB
      - `schemas/` — 6 files (6 direct), 25.7 KB
      - `types/` — 4 files (4 direct), 5.3 KB

---

## 2. Top-level summary

### Folders

| Folder | Size | Git | What it is for |
|---|---|---|---|
| `.git/` | 181 MB | – | Git history, refs and stashes. |
| `.github/` | 1.1 KB | tracked | `workflows/ci.yml`: lint, typecheck, test and build on PRs and pushes to `main`. |
| `backend/` | 26.6 MB (+node_modules) | mixed | NestJS API: `src/` (modules), `prisma/` (schema, migrations, generated client), `tests/` (e2e specs), `uploads/` (media, ignored), `dist/` (build output, ignored). |
| `docs/` | 83.7 MB | mixed | Planning only. Plans, decisions (31), audit, design spec and references, media library, SEO URL inventory, and `reports/` (task screenshots: 82.1 MB of the 83.7 MB). |
| `frontend/` | 10.6 MB (+713 MB .next) | mixed | Next.js site: `src/` (app routes, components, lib, styles), `public/` (brand and home images), `tests/` (unit, e2e, visual snapshots), `test-results/` (Playwright output, ignored). |
| `infra/` | 20.7 KB | tracked | Docker Compose (local and prod), Nginx config, env examples, and the build, start, deploy, backup and QA scripts. |
| `node_modules/` | 920 MB | ignored | pnpm store for the workspace. |
| `scripts/` | 31.0 MB | mixed | `check-theme.ts` (run by `pnpm lint`) and the `import-wordpress/` package (WordPress importer, tests, and the ignored `.cache/` of 138 raw responses, 30.9 MB). |
| `shared/` | 266 KB | mixed | `@waren/shared`: constants, Zod schemas and types for both apps. `dist/` is build output (ignored). |

### Root files

| File | What it is for |
|---|---|
| `.dockerignore` | Keeps node_modules, builds, env files, docs (except `docs/seo`), uploads and caches out of Docker builds. |
| `.editorconfig` | Editor indentation and line-ending defaults. |
| `.gitignore` | Ignore rules (node_modules, .next, dist, test outputs, env files, uploads, import cache, OS files). |
| `.nvmrc` | Node version (26). |
| `.prettierignore` / `.prettierrc.json` | Prettier exclusions and settings. |
| `AGENTS.md` | Instructions for the execution agent. |
| `CLAUDE.md` | Points Claude Code at AGENTS.md and README.md. |
| `README.md` | Project overview, run, test and deploy instructions. |
| `eslint.config.mjs` | Workspace ESLint config. |
| `package.json` | Workspace scripts (dev, build, start, prod, lint, typecheck, test, test:e2e, import:wp, format). |
| `pnpm-lock.yaml` | Dependency lockfile (239 KB). |
| `pnpm-workspace.yaml` | Workspace packages (frontend, backend, shared, scripts/import-wordpress) and allowed build scripts. |
| `tsconfig.base.json` | Shared TypeScript settings. |

---

## 3. Everything test-related

### 3a. Test code

Runners: backend Vitest (`src/**/*.spec.ts`, `tests/**/*.e2e-spec.ts`); frontend Vitest (`tests/unit/**/*.test.{ts,tsx}`); frontend Playwright (`tests/e2e`, snapshots in `tests/e2e/snapshots`); import-wordpress Vitest (`tests/**/*.test.ts`). CI runs `pnpm test` but not Playwright. All test code is **tracked**. App code imports none of it (tests import app code, not the other way round).

| Path | Size | Modified | Git | Used by / notes |
|---|---|---|---|---|
| `backend/vitest.config.ts` | 358 B | 2026-11-09 | tracked | `pnpm --filter backend test` |
| `backend/src/config/env.schema.spec.ts` | 1.2 KB | 2026-11-03 | tracked | backend Vitest |
| `backend/src/database/database-ssl.spec.ts` | 669 B | 2026-11-03 | tracked | backend Vitest |
| `backend/src/database/enums.spec.ts` | 1.0 KB | 2026-11-03 | tracked | backend Vitest |
| `backend/src/modules/contact/contact-mailer.service.spec.ts` | 1.7 KB | 2026-11-04 | tracked | backend Vitest |
| `backend/src/modules/health/health.controller.spec.ts` | 1.2 KB | 2026-11-03 | tracked | backend Vitest |
| `backend/src/modules/leads/attribution.spec.ts` | 2.1 KB | 2026-11-04 | tracked | backend Vitest |
| `backend/tests/.gitkeep` | 0 B | 2026-11-03 | tracked | empty placeholder; folder already has files |
| `backend/tests/setup-env.ts` | 969 B | 2026-11-04 | tracked | Vitest `setupFiles` |
| `backend/tests/global-setup.ts` | 535 B | 2026-11-03 | tracked | Vitest `globalSetup` |
| `backend/tests/create-test-app.ts` | 836 B | 2026-11-03 | tracked | helper for e2e specs |
| `backend/tests/fixtures.ts` | 9.8 KB | 2026-11-04 | tracked | helper for e2e specs |
| `backend/tests/contact.e2e-spec.ts` | 7.5 KB | 2026-11-04 | tracked | backend Vitest |
| `backend/tests/health.e2e-spec.ts` | 1.6 KB | 2026-11-03 | tracked | backend Vitest |
| `backend/tests/leads.e2e-spec.ts` | 2.8 KB | 2026-11-04 | tracked | backend Vitest |
| `backend/tests/newsletter.e2e-spec.ts` | 5.9 KB | 2026-11-04 | tracked | backend Vitest |
| `backend/tests/public-api.e2e-spec.ts` | 15.1 KB | 2026-11-05 | tracked | backend Vitest |
| `backend/tests/row-level-security.e2e-spec.ts` | 671 B | 2026-11-03 | tracked | backend Vitest |
| `backend/tests/slug-registry.e2e-spec.ts` | 1.5 KB | 2026-11-03 | tracked | backend Vitest |
| `backend/tests/imported/imported-content.e2e-spec.ts` | 6.5 KB | 2026-11-04 | tracked | backend Vitest |
| `frontend/vitest.config.ts` | 472 B | 2026-11-09 | tracked | `pnpm --filter frontend test` |
| `frontend/playwright.config.ts` | 577 B | 2026-11-09 | tracked | `pnpm test:e2e` (starts the site with `pnpm start`) |
| `frontend/tests/unit/setup.ts` | 150 B | 2026-11-09 | tracked | Vitest `setupFiles` |
| `frontend/tests/unit/api-client.test.ts` | 2.1 KB | 2026-11-09 | tracked | tests `lib/api/client` |
| `frontend/tests/unit/check-theme.test.ts` | 994 B | 2026-11-09 | tracked | tests `scripts/check-theme.ts` |
| `frontend/tests/unit/content-sections.test.ts` | 1.2 KB | 2026-11-09 | tracked | tests `lib/utils/content/sections` |
| `frontend/tests/unit/cookie-consent.test.tsx` | 2.9 KB | 2026-11-09 | tracked | tests `cookie-consent` |
| `frontend/tests/unit/dates.test.ts` | 359 B | 2026-11-09 | tracked | tests `lib/utils/dates` |
| `frontend/tests/unit/hero-video.test.tsx` | 989 B | 2026-11-10 | tracked | **tests `home/hero-video.tsx`, which nothing in the app imports** (see §4b) |
| `frontend/tests/unit/home-hero-video.test.tsx` | 2.6 KB | 2026-11-10 | tracked | tests `home/home-hero-video.tsx` (used by `hero.tsx`) |
| `frontend/tests/unit/insights-listing.test.ts` | 1.9 KB | 2026-11-09 | tracked | tests `lib/utils/content/insights` |
| `frontend/tests/unit/newsletter-form.test.tsx` | 2.0 KB | 2026-11-09 | tracked | tests `newsletter-form` |
| `frontend/tests/unit/root-content.test.ts` | 1.6 KB | 2026-11-09 | tracked | tests `lib/utils/content/root-content` |
| `frontend/tests/unit/seo.test.ts` | 7.9 KB | 2026-11-09 | tracked | tests redirects, feed, metadata, schema, sitemap |
| `frontend/tests/unit/shared-schemas.test.ts` | 687 B | 2026-11-09 | tracked | tests `@waren/shared` |
| `frontend/tests/unit/team-filter.test.ts` | 1.4 KB | 2026-11-09 | tracked | tests `lib/utils/content/team` |
| `frontend/tests/unit/visit-attribution.test.ts` | 745 B | 2026-11-09 | tracked | tests `lib/utils/attribution/visit` |
| `frontend/tests/e2e/helpers.ts` | 882 B | 2026-11-09 | tracked | Playwright helper |
| `frontend/tests/e2e/consent.spec.ts` | 2.9 KB | 2026-11-09 | tracked | Playwright |
| `frontend/tests/e2e/forms.spec.ts` | 7.2 KB | 2026-11-09 | tracked | Playwright |
| `frontend/tests/e2e/home.spec.ts` | 6.4 KB | 2026-11-11 | tracked | Playwright; includes the visual snapshot tests (home and about at 1440 and 390) |
| `frontend/tests/e2e/navigation.spec.ts` | 4.3 KB | 2026-11-11 | tracked | Playwright |
| `frontend/tests/e2e/pages.spec.ts` | 5.0 KB | 2026-11-09 | tracked | Playwright |
| `scripts/import-wordpress/vitest.config.ts` | 141 B | 2026-11-03 | tracked | importer Vitest |
| `scripts/import-wordpress/tests/html-to-blocks.test.ts` | 3.0 KB | 2026-11-03 | tracked | importer Vitest |
| `scripts/import-wordpress/tests/reshape.test.ts` | 1.7 KB | 2026-11-03 | tracked | importer Vitest |
| `scripts/import-wordpress/tests/sync.test.ts` | 1.6 KB | 2026-11-03 | tracked | importer Vitest |
| `infra/scripts/qa/check-links.mjs` | 1.7 KB | 2026-11-09 | tracked | manual QA script (`node infra/scripts/qa/check-links.mjs <siteUrl>`); not wired into any package script or CI |
| `infra/scripts/qa/check-seo.mjs` | 2.8 KB | 2026-11-09 | tracked | manual QA script; not wired into any script or CI |
| `infra/scripts/qa/check-urls.mjs` | 2.8 KB | 2026-11-09 | tracked | manual QA script (uses `docs/seo/url-inventory.csv`); not wired into any script or CI |

Not present anywhere: `__tests__/`, `__mocks__/`, `cypress/`, `coverage/`, `playwright-report/`.

### 3b. Test outputs and snapshots

| Path | Size | Modified | Git | Used by / notes |
|---|---|---|---|---|
| `frontend/tests/e2e/snapshots/home-1440.png` | 1.3 MB | 2026-11-11 | tracked | Playwright baseline (`snapshotPathTemplate`) |
| `frontend/tests/e2e/snapshots/home-390.png` | 1.0 MB | 2026-11-11 | tracked | Playwright baseline |
| `frontend/tests/e2e/snapshots/about-1440.png` | 2.1 MB | 2026-11-10 | tracked | Playwright baseline |
| `frontend/tests/e2e/snapshots/about-390.png` | 1.3 MB | 2026-11-10 | tracked | Playwright baseline |
| `frontend/test-results/.last-run.json` | 45 B | 2026-11-11 08:58 | ignored | Playwright last run: `"status": "passed"` |
| `frontend/test-results/home-visual-snapshots-home-matches-at-1440/home-1440-actual.png` | 1.3 MB | 2026-11-11 08:58 | ignored | leftover output; **byte-identical** to `snapshots/home-1440.png` |
| `frontend/test-results/home-visual-snapshots-home-matches-at-390/home-390-actual.png` | 1.0 MB | 2026-11-11 08:58 | ignored | leftover output; **byte-identical** to `snapshots/home-390.png` |

Stash `stash@{0}` (T061-broken-snapshot) also holds a different `home-390.png` snapshot (see §5).

### 3c. Screenshots and images in reports and docs

No app code imports anything under `docs/`. The only code reference into docs is the importer: `scripts/import-wordpress/src/curation.ts` reads `docs/design/assets/hero-skyline-illustration.svg`.

**`docs/reports/`: 150 files, 82.1 MB.** Tracked: t055, t057, t058-header, t059-intro, t060-services, t063-prefooter and their `.md` files. Untracked: `restore-pre-T061*`, `t062-insights/`, `t064-portraits/`, `t064-team/` (94 files, 50.8 MB). There is no `.md` report for t062, t063 or t064. Most screenshots are not linked from any report text.

| Path | Size | Modified | Git | Referenced by |
|---|---|---|---|---|
| `docs/reports/restore-pre-T061/1440-feature.png` | 169.3KB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061/1440-home-top.png` | 1.7MB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061/1440-intro.png` | 459.5KB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061/1440-services.png` | 134.7KB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061/390-feature.png` | 96.6KB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061/390-home-top.png` | 487.9KB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061/390-intro.png` | 172.4KB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061/390-services.png` | 93.3KB | 2026-11-11 | untracked | – |
| `docs/reports/restore-pre-T061.md` | 402.0B | 2026-11-11 | untracked | – |
| `docs/reports/t055/1440-intro.png` | 119.8KB | 2026-11-10 | tracked | – |
| `docs/reports/t055/1440-top.png` | 1.2MB | 2026-11-10 | tracked | – |
| `docs/reports/t055/390-intro.png` | 104.1KB | 2026-11-10 | tracked | – |
| `docs/reports/t055/390-top.png` | 300.2KB | 2026-11-10 | tracked | – |
| `docs/reports/t057/1440-intro.png` | 200.3KB | 2026-11-11 | tracked | – |
| `docs/reports/t057/1440-top.png` | 1.1MB | 2026-11-11 | tracked | – |
| `docs/reports/t057/390-intro.png` | 79.4KB | 2026-11-11 | tracked | – |
| `docs/reports/t057/390-top.png` | 213.3KB | 2026-11-11 | tracked | – |
| `docs/reports/t057-homepage.md` | 3.7KB | 2026-11-11 | tracked | – |
| `docs/reports/t058-header/desktop-hovered-row.png` | 499.5KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-panel-about.png` | 740.4KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-panel-contact.png` | 506.8KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-panel-expertise.png` | 331.5KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-panel-insights.png` | 247.3KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-panel-partners.png` | 146.3KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-panel-team.png` | 433.5KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-resting-full.png` | 1.3MB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/desktop-resting.png` | 14.9KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/header-float-scroll.webm` | 9.2MB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header.md` | 2.2KB | 2026-11-11 | tracked | – |
| `docs/reports/t058-header/mobile-closed.png` | 355.2KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/mobile-menu-open.png` | 31.0KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t058-header/mobile-section-expanded.png` | 34.9KB | 2026-11-11 | tracked | docs/reports/t058-header.md  |
| `docs/reports/t059-intro/1440-intro-context.png` | 514.4KB | 2026-11-11 | tracked | docs/reports/t059-intro.md  |
| `docs/reports/t059-intro/1440-intro-context-section.png` | 444.9KB | 2026-11-11 | tracked | – |
| `docs/reports/t059-intro/1440-statue.png` | 444.4KB | 2026-11-11 | tracked | docs/reports/t059-intro-statue.md  |
| `docs/reports/t059-intro/1440-tight.png` | 459.5KB | 2026-11-11 | tracked | docs/reports/t059-intro-tight.md  |
| `docs/reports/t059-intro/1440-vs-design.png` | 896.3KB | 2026-11-11 | tracked | docs/reports/t059-intro-tight.md docs/reports/t059-intro-statue.md  |
| `docs/reports/t059-intro/390-intro-context.png` | 110.6KB | 2026-11-11 | tracked | docs/reports/t059-intro.md  |
| `docs/reports/t059-intro/390-intro-context-section.png` | 124.5KB | 2026-11-11 | tracked | – |
| `docs/reports/t059-intro/390-intro-lower.png` | 155.6KB | 2026-11-11 | tracked | docs/reports/t059-intro.md  |
| `docs/reports/t059-intro/390-statue.png` | 178.4KB | 2026-11-11 | tracked | docs/reports/t059-intro-statue.md  |
| `docs/reports/t059-intro/390-tight.png` | 171.8KB | 2026-11-11 | tracked | docs/reports/t059-intro-tight.md  |
| `docs/reports/t059-intro/cutout-on-ivory.png` | 978.6KB | 2026-11-11 | tracked | – |
| `docs/reports/t059-intro/cutout-preview.png` | 1.2MB | 2026-11-11 | tracked | – |
| `docs/reports/t059-intro/intro_design.png` | 142.2KB | 2026-11-11 | tracked | docs/reports/t059-intro-tight.md docs/reports/t059-intro-statue.md  |
| `docs/reports/t059-intro.md` | 2.5KB | 2026-11-11 | tracked | – |
| `docs/reports/t059-intro-statue.md` | 1.4KB | 2026-11-11 | tracked | – |
| `docs/reports/t059-intro-tight.md` | 607.0B | 2026-11-11 | tracked | – |
| `docs/reports/t060-services/1024.png` | 107.4KB | 2026-11-11 | tracked | docs/reports/t060-services.md  |
| `docs/reports/t060-services/1440.png` | 116.2KB | 2026-11-11 | tracked | docs/reports/t060-services.md  |
| `docs/reports/t060-services/1440-vs-reference.png` | 1.2MB | 2026-11-11 | tracked | docs/reports/t060-services.md  |
| `docs/reports/t060-services/390.png` | 93.3KB | 2026-11-11 | tracked | docs/reports/t060-services.md  |
| `docs/reports/t060-services.md` | 1.2KB | 2026-11-11 | tracked | – |
| `docs/reports/t060-services/reference.png` | 436.0KB | 2026-11-11 | tracked | – (name matches refs to another reference.png) |
| `docs/reports/t062-insights/1024-insights.png` | 1.3MB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/1024-insights-section.png` | 755.2KB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/1440-home-full.png` | 1.6MB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/1440-home-full-section.png` | 1011.8KB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/1440-proof-hero.png` | 1.4MB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/1440-proof-services.png` | 125.6KB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/1440-proof-team.png` | 423.7KB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/1440-proof-wealth.png` | 171.0KB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/390-home-full.png` | 593.1KB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/390-home-full-section.png` | 465.4KB | 2026-11-11 | untracked | – |
| `docs/reports/t062-insights/reference.png` | 127.9KB | 2026-11-11 | untracked | – (name matches refs to another reference.png) |
| `docs/reports/t063-prefooter/1024-prefooter.png` | 1.3MB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/1024-prefooter-section.png` | 611.4KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/1440-home-full.png` | 1.6MB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/1440-home-full-section.png` | 662.9KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/1440-proof-footer.png` | 84.6KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/1440-proof-insights.png` | 1011.8KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/1440-proof-team.png` | 423.7KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/1440-right-crop.png` | 136.6KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/390-home-full.png` | 593.5KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/390-home-full-section.png` | 154.2KB | 2026-11-11 | tracked | – |
| `docs/reports/t063-prefooter/reference.png` | 569.8KB | 2026-11-11 | tracked | – (name matches refs to another reference.png) |
| `docs/reports/t064-portraits/output/team-alex-maina-grey.jpg` | 112.4KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-alex-maina-grey.webp` | 44.3KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-barbra-katasi-grey.jpg` | 97.9KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-barbra-katasi-grey.webp` | 38.4KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-cecilia-njeri-grey.jpg` | 124.5KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-cecilia-njeri-grey.webp` | 52.0KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-charity-wambui-grey.jpg` | 160.9KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-charity-wambui-grey.webp` | 73.4KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-charles-ndombi-grey.jpg` | 125.5KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-charles-ndombi-grey.webp` | 55.5KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-christine-muthoni-grey.jpg` | 115.3KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-christine-muthoni-grey.webp` | 51.9KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-davis-wachira-grey.jpg` | 143.2KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-davis-wachira-grey.webp` | 68.3KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-ephraim-ndegwa-grey.jpg` | 221.0KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-ephraim-ndegwa-grey.webp` | 130.6KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json frontend/src/lib/utils/content/photo-files.ts  |
| `docs/reports/t064-portraits/output/team-eutycus-kamathi-grey.jpg` | 144.9KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-eutycus-kamathi-grey.webp` | 62.8KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-faith-wanjala-grey.jpg` | 88.0KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-faith-wanjala-grey.webp` | 35.2KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-florence-wambugu-grey.jpg` | 127.2KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-florence-wambugu-grey.webp` | 51.7KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-fridah-gakii-grey.jpg` | 271.2KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-fridah-gakii-grey.webp` | 174.6KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-janice-wachuka-grey.jpg` | 209.4KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-janice-wachuka-grey.webp` | 139.3KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json frontend/src/lib/utils/content/photo-files.ts  |
| `docs/reports/t064-portraits/output/team-jimmy-wamalwa-grey.jpg` | 164.2KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-jimmy-wamalwa-grey.webp` | 89.3KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-margaret-wanjiru-grey.jpg` | 154.1KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-margaret-wanjiru-grey.webp` | 75.5KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-martin-wachira-grey.jpg` | 264.1KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-martin-wachira-grey.webp` | 182.6KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json frontend/src/lib/utils/content/photo-files.ts  |
| `docs/reports/t064-portraits/output/team-mary-wanjiku-grey.jpg` | 94.5KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-mary-wanjiku-grey.webp` | 36.6KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-nick-amboko-grey.jpg` | 122.8KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-nick-amboko-grey.webp` | 58.1KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-phylis-njane-grey.jpg` | 215.2KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-phylis-njane-grey.webp` | 107.1KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json frontend/src/lib/utils/content/photo-files.ts  |
| `docs/reports/t064-portraits/output/team-stephen-warutere-grey.jpg` | 134.7KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/output/team-stephen-warutere-grey.webp` | 63.9KB | 2026-11-11 | untracked | docs/reports/t064-portraits/part1-meta.json  |
| `docs/reports/t064-portraits/part1-meta.json` | 5.1KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/sheets/sheet-00-homepage-partners-strip.png` | 789.3KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/sheets/sheet-01-before-after.png` | 834.5KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/sheets/sheet-02-before-after.png` | 1.4MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/sheets/sheet-03-before-after.png` | 1.4MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/alex-maina-cutout.png` | 221.2KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/barbra-katasi-cutout.png` | 546.1KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/cecilia-njeri-cutout.png` | 1.4MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/charity-wambui-cutout.png` | 932.0KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/charles-ndombi-cutout.png` | 1.4MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/christine-muthoni-cutout.png` | 147.5KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/davis-wachira-cutout.png` | 2.0MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/ephraim-ndegwa-cutout.png` | 1017.0KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/eutycus-kamathi-cutout.png` | 1.1MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/faith-wanjala-cutout.png` | 479.5KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/florence-wambugu-cutout.png` | 372.8KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/fridah-gakii-cutout.png` | 2.6MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/janice-wachuka-cutout.png` | 2.9MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/jimmy-wamalwa-cutout.png` | 2.2MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/margaret-wanjiru-cutout.png` | 1.4MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/martin-wachira-cutout.png` | 4.5MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/mary-wanjiku-cutout.png` | 174.8KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/nick-amboko-cutout.png` | 546.8KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/phylis-njane-cutout.png` | 1.1MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-portraits/work/stephen-warutere-cutout.png` | 169.2KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/1024-team.png` | 1.3MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/1024-team-section.png` | 697.7KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/1440-home-full.png` | 1.5MB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/1440-home-full-section.png` | 392.8KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/1440-proof-insights.png` | 1004.3KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/1440-proof-prefooter.png` | 662.2KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/390-home-full.png` | 587.8KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/390-home-full-section.png` | 166.7KB | 2026-11-11 | untracked | – |
| `docs/reports/t064-team/reference.png` | 242.0KB | 2026-11-11 | untracked | – (name matches refs to another reference.png) |

**Other images and media in `docs/`** (tracked):

| Path | Size | Modified | Git | Referenced by |
|---|---|---|---|---|
| `docs/design/assets/hero-skyline-illustration.svg` | 3.1KB | 2026-11-04 | tracked | docs/design/image-sources.md scripts/import-wordpress/src/curation.ts  |
| `docs/media-library/advocates-seated-source.webp` | 169.3KB | 2026-11-11 | tracked | – |
| `docs/media-library/advocates-seated.webp` | 83.8KB | 2026-11-11 | tracked | docs/media-library/README.md docs/reports/t059-intro.md  |
| `docs/media-library/client-or-misc-download-1.webp` | 3.5KB | 2026-11-11 | tracked | – |
| `docs/media-library/client-or-misc-download-3.png` | 4.3KB | 2026-11-11 | tracked | – |
| `docs/media-library/client-or-misc-download-4.png` | 2.5KB | 2026-11-11 | tracked | – |
| `docs/media-library/client-or-misc-download.png` | 2.2KB | 2026-11-11 | tracked | – |
| `docs/media-library/client-or-misc-kebs-logo-png_seeklogo-280724-1.webp` | 15.8KB | 2026-11-11 | tracked | – |
| `docs/media-library/client-or-misc-Screenshot-2025-12-11-120209.webp` | 2.2KB | 2026-11-11 | tracked | – |
| `docs/media-library/studio-arrangement-work-source.webp` | 287.4KB | 2026-11-11 | tracked | – |
| `docs/media-library/studio-arrangement-work.webp` | 104.6KB | 2026-11-11 | tracked | docs/media-library/README.md docs/reports/t059-intro.md  |
| `docs/media-library/team-group-office-source.webp` | 338.9KB | 2026-11-11 | tracked | – |
| `docs/media-library/team-group-office.webp` | 187.5KB | 2026-11-11 | tracked | docs/media-library/README.md docs/reports/t059-intro.md  |
| `docs/media-library/truth-concept-arrangement-with-balance-source.webp` | 137.6KB | 2026-11-11 | tracked | docs/media-library/README.md  |

Images elsewhere (app assets, not report images) are covered in §4a.

### 3d. Throwaway scripts, scratch files, temp folders and backups

There are no `*.bak`, `*.orig`, `*-old*`, `*-copy*`, `tmp/`, `temp/` or `scratch*` files. The name scan found these:

| Path | Size | Modified | Git | Notes |
|---|---|---|---|---|
| `docs/reports/t064-portraits/work/` (20 `*-cutout.png`) | 24.7 MB | 2026-11-11 | untracked | Intermediate portrait cutouts from T064. Nothing references them. The largest untracked group. |
| `docs/reports/t064-portraits/output/` (20 `.jpg` + 20 `.webp`) | 4.6 MB | 2026-11-11 | untracked | Generated grey portraits. 4 slugs (janice-wachuka, ephraim-ndegwa, martin-wachira, phylis-njane) were copied byte-for-byte into `backend/uploads/` (§4c). The other 16 are referenced nowhere. |
| `docs/reports/t064-portraits/sheets/` (4 png) | 4.3 MB | 2026-11-11 | untracked | Before/after review sheets; not referenced. |
| `docs/reports/t064-portraits/part1-meta.json` | 5.0 KB | 2026-11-11 | untracked | Processing metadata; not referenced. |
| `infra/scripts/backup-uploads.sh` | – | 2026-11-03 | tracked | Matched "backup" by name only. It is the real backup script documented in README; **not** clutter. |
| `backend/uploads/client-logo-old-mutual.webp` | – | – | ignored | Matched "-old" by name only (Old Mutual logo). **Not** clutter. |
| `scripts/import-wordpress/.cache/` (138 files) | 30.9 MB | – | ignored | Raw WordPress response cache used by the importer (`.gitignore`d by design). |

Git-level backups (branches, tags and stashes named backup/safe/restore) are listed in §5.

---

## 4. Clutter candidates (listed only — nothing decided or removed)

### 4a. Images and videos not referenced

**`frontend/public/` (all tracked):**

| File | Size | Evidence |
|---|---|---|
| `public/brand/logo.png` | 188 KB | Code uses only `/brand/golden-logo.png` (`logo.tsx:5`, `seo/schema.ts:17`). `logo.png` is **byte-identical** to `golden-logo.png`. It is mentioned in `scripts/import-wordpress/src/curation.ts` and `docs/audit/02`. Check curation.ts before treating it as unused. |
| `public/brand/logo.webp` | 95 KB | Mentioned only in `docs/audit/02-content-and-media.md`. No code reference. |
| `public/home/lady-justice.webp` | 47 KB | Used only by `home/welcome.tsx`, which nothing imports (§4b). |
| `public/home/lady-justice-cutout.png` | 1.1 MB | No reference anywhere. The `.webp` version is used by `home-intro.tsx`. |
| `public/home/intro-scales-balance.webp` | 76 KB | Mentioned only in `docs/decisions/0028` and `docs/media-library/README.md`. No code reference. |

In use: `golden-logo.png`, `lady-justice-cutout.webp`, `prefooter-bg.webp`, `prefooter-bg-mobile.webp`.

**`backend/uploads/` (122 files, 23.5 MB, all git-ignored).** Most names follow importer patterns (`insight-*`, `webinar-*`, `team-<slug>.webp`, `client-logo-*`, `partner-signing-*`, `award-*`) or are named in `curation.ts` (`home-hero-team`, `about-video-poster`, `home-hero-skyline-illustration`) or `photo-files.ts` / `shared` (`*-profile`, `*-speaker`, `*-card`, `*-grey.webp`, `hero.mp4`). These have **no reference in code, the importer or shared constants** (DB not checked):

| File(s) | Size | Evidence |
|---|---|---|
| `nairobi-skyline-hero.webp` | 145 KB | No reference by name or by importer pattern. |
| 20 × `team-<slug>-cutout.webp` | 0.9 MB total | No code reference to any `team-*-cutout`. The only `cutout` in code is `/home/lady-justice-cutout.webp`. |
| `team-{janice-wachuka,ephraim-ndegwa,martin-wachira,phylis-njane}-grey.jpg` | 0.9 MB total | `photo-files.ts` references only the `-grey.webp` versions. The `.jpg` copies are duplicates of files in `docs/reports/t064-portraits/output/`. |

### 4b. Components, CSS and dictionary keys not used

**Components nothing imports** (searched `frontend/src` and `frontend/tests` for the import path and exported name). All were last changed in `18fe61e chore: clean codebase to agreed structure`:

| File | Size | Export | Evidence |
|---|---|---|---|
| `src/components/site/morphic-navbar.tsx` | 22.2 KB | `MorphicNavbar` | 0 references. |
| `src/components/site/home/welcome.tsx` | 4.6 KB | `Welcome` | 0 references. Only user of `lady-justice.webp`, `.welcome-statue`, `bg-welcome`. |
| `src/components/site/home/stats-bar.tsx` | 4.7 KB | `StatsBar` | 0 references. |
| `src/components/site/home/offices-band.tsx` | 2.0 KB | `OfficesBand` | 0 references. |
| `src/components/site/home/recognition-strip.tsx` | 1.6 KB | `RecognitionStrip` | 0 references. |
| `src/components/site/home/audience.tsx` | 1.5 KB | `Audience` | 0 references. |
| `src/components/site/home/testimonials.tsx` | 1.2 KB | `Testimonials` | 0 references. |
| `src/components/site/home/expertise.tsx` | 1.1 KB | `Expertise` | 0 imports (the word appears only as text in `dictionary.ts`). |
| `src/components/site/home/help-intro.tsx` | 668 B | `HelpIntro` | 0 references. |
| `src/components/site/home/hero-video.tsx` | 745 B | `HeroVideo` | Imported only by `tests/unit/hero-video.test.tsx`; the live hero uses `home-hero-video.tsx`. |

Not flagged: `src/proxy.ts` (a Next.js convention file loaded by the framework). Backend placeholders `backend/src/modules/{auth,media,history}/` contain only a `README.md` (planned admin modules).

**Global CSS with no reference in `frontend/src` `.ts/.tsx`** (from `src/styles/globals.css` and `theme.css`; CSS-module classes in the 3 `*.module.css` files are all used):

| Class / utility | Defined at | Evidence |
|---|---|---|
| `.peach-card` | `globals.css:74` | no reference |
| `@utility border-b-card-rule` | `theme.css:341` | no reference |
| `@utility aspect-intro` | `theme.css:457` | no reference |
| `@utility aspect-insight-short` / `-mid` / `-tall` | `theme.css:461/465/469` | no reference |
| `@utility grid-auto-hero` | `theme.css:491` | no reference |
| `@utility grid-auto-footer` | `theme.css:507` | no reference |
| `@utility bg-welcome`, `bg-gold-gradient`, `text-gold-gradient` | `theme.css:345/360/364` | used only by the unused components above |
| `.welcome-statue` | `theme.css:371` | used only by `welcome.tsx` |

Not checked: individual `@theme` design tokens (CSS variables).

**Dictionary keys (`frontend/src/lib/utils/dictionary.ts`, 313 leaf keys)** whose key name does not appear anywhere else in `src/` or `tests/`:

- Unused anywhere: `home.aboutEyebrow`, `home.teamBadge`, `home.teamLead`, `home.heroServices`, `home.scrollCue`, `home.talkToUs`, `home.clientsEyebrow`, `home.heroCardArrow`.
- Used only by the unused components above: `nav.showAllLinks`, `home.expertiseEyebrow`, `home.audienceEyebrow`, `home.testimonialsEyebrow`, `home.testimonialsTitle`, `home.heroCardButton`, `home.qualifiedLawyers`, `home.successfulCases`, `home.happyClients`, `home.honorsAwards`, `home.helpEyebrow`, `home.helpIntro`, `home.partnersLabel`, `home.awardLabel`.
- Not flagged: `team.groups.advocate` / `.consultant` are read dynamically (`text.groups[memberType]` in `team-listing.tsx:33`).

Method note: a key counts as used if its name appears as a whole word in any other file. This can miss keys whose name matches an unrelated word, so the true unused list may be longer, not shorter.

### 4c. Duplicate files (identical MD5, excluding node_modules, .git, .next, dist, generated, .cache)

| Copies | Notes |
|---|---|
| `frontend/public/brand/golden-logo.png` = `frontend/public/brand/logo.png` | Both tracked; only `golden-logo.png` is used. |
| `frontend/tests/e2e/snapshots/home-1440.png` = `frontend/test-results/.../home-1440-actual.png` | test-results is ignored output. |
| `frontend/tests/e2e/snapshots/home-390.png` = `frontend/test-results/.../home-390-actual.png` | Same. |
| `backend/uploads/team-{janice-wachuka,ephraim-ndegwa,martin-wachira,phylis-njane}-grey.{jpg,webp}` = `docs/reports/t064-portraits/output/` same names | 8 pairs; uploads copies are used (webp), report copies are untracked. |
| `docs/reports/restore-pre-T061/1440-intro.png` = `docs/reports/t059-intro/1440-tight.png` | Untracked copy of a tracked file. |
| `docs/reports/t062-insights/1440-proof-team.png` = `docs/reports/t063-prefooter/1440-proof-team.png` | Untracked copy of a tracked file. |
| `docs/reports/t062-insights/1440-home-full-section.png` = `docs/reports/t063-prefooter/1440-proof-insights.png` | Untracked copy of a tracked file. |
| `frontend/.env` = `frontend/.env.example` | `.env` is ignored and identical to the example. Contents not printed. |

### 4d. Files over 5 MB (excluding node_modules, .git, .next)

| File | Size | Git | Notes |
|---|---|---|---|
| `backend/uploads/hero.mp4` | 15.4 MB | ignored | Home hero video (`HERO_VIDEO_FILE` in `shared/src/constants/content.ts:35`). In use. |
| `docs/reports/t058-header/header-float-scroll.webm` | 9.1 MB | **tracked** | Screen recording linked from `docs/reports/t058-header.md`. Committed to git history. |

Largest folders after those: `docs/reports/t064-portraits/work/` 24.7 MB (untracked) and `docs/reports/t058-header/` 13.7 MB (tracked).

### 4e. Build output, logs, OS files

No `.DS_Store`, `Thumbs.db`, `*.log`, `*.swp` or `*~` files anywhere. All build output present is **already git-ignored**:

| Path | Size | Ignored by |
|---|---|---|
| `frontend/.next/` | 713 MB | `.next/` |
| `node_modules/` (root + 4 package folders) | 920 MB | `node_modules/` |
| `backend/dist/` (233 files, incl. `tsconfig.build.tsbuildinfo`) | 746 KB | `dist/` |
| `shared/dist/` (45 files) | 223 KB | `dist/` |
| `backend/prisma/generated/` (29 files) | 2.2 MB | `backend/prisma/generated/` |
| `frontend/tsconfig.tsbuildinfo` | 247 KB | `*.tsbuildinfo` |
| `frontend/next-env.d.ts` | 296 B | `next-env.d.ts` |
| `frontend/test-results/` | 2.3 MB | `test-results/` |
| `scripts/import-wordpress/.cache/` | 30.9 MB | `scripts/import-wordpress/.cache/` |

The only clutter not covered by `.gitignore` is the 94 untracked files in `docs/reports/` (§3c, §3d). `.gitignore` has no rule for `docs/reports/**/work/` or `**/output/`.

Empty files: `backend/uploads/.gitkeep`, `backend/tests/.gitkeep` (folder has files), `infra/nginx/htpasswd.example`.

---

## 5. Git state

**Current branch:** `restore/pre-T061` at `6a14aeb` (T063: pre-footer redesign). It is 5 commits ahead of `main` (merge base `67694ac`), with no upstream.

**Uncommitted changes:**

| Path | State | Notes |
|---|---|---|
| `frontend/src/components/site/home/latest-insights.tsx` | modified | +223 / −38 |
| `frontend/src/components/site/home/partners-band.tsx` | modified | +56 / −38 |
| `frontend/src/lib/utils/content/photo-files.ts` | modified | +8 (adds `GREY_PHOTO`) |
| `frontend/src/components/site/home/latest-insights.module.css` | **untracked** | imported by the modified `latest-insights.tsx` |
| `frontend/src/components/site/home/partners-band.module.css` | **untracked** | imported by the modified `partners-band.tsx` |
| `docs/reports/restore-pre-T061.md` + `restore-pre-T061/` (8) | untracked | |
| `docs/reports/t062-insights/` (11) | untracked | |
| `docs/reports/t064-portraits/` (65) | untracked | |
| `docs/reports/t064-team/` (9) | untracked | |

Total: 3 modified, 96 untracked files. The app code depends on two of the untracked files (the `.module.css` files).

**Is `main` pushed to GitHub? No.** `git ls-remote origin` shows GitHub `main` = `0555258` ("first commit"). Local `main` = `67694ac` ("Merge branch 'chore/cleanup'"), **2 commits ahead**: `18fe61e` and `67694ac`. The last fetch was 2026-11-10 16:33.

**Branches: 61 local.** 16 exist only locally (not on GitHub):

`restore/pre-T061` (current), `chore/cleanup`, `backup-before-revert`, `backup/T061-broken-base`, `backup/full-snapshot-T057-T061`, `task/T051-images-as-warenlaw`, `task/T052-hero-media-pwc`, `task/T052-hero-menu-colour`, `task/T055-video-hero`, `task/T056-home-pwc-flow`, `task/T057-pwc-home`, `task/T058-header`, `task/T059-intro`, `task/T060-what-we-handle`, `task/T061-wealth-feature`, `task/shared-hero`.

The other 45 local branches exist on GitHub: `main` (2 commits ahead, see above) and 44 that match `origin/*` exactly (`setup/*` ×4, `task/0020-home-review-answers`, 38 `task/T001`–`T050` branches including the `a` variants, `task/brief-07-report`). Note that `task/T055-video-hero`, `task/T057-pwc-home`, `task/T058-header`, `task/T059-intro`, `task/T060-what-we-handle`, `task/T061-wealth-feature` and `backup/T061-broken-base` all point at the same commit `76649cc`, so they hold no T057–T061 work of their own. That work is on `backup/full-snapshot-T057-T061` (`306cfa2`) and in `restore/pre-T061`.

Full local list with tips:

| Branch | Tip | On GitHub |
|---|---|---|
| backup-before-revert | 6b4eade wip(T056) unfinished | no |
| backup/T061-broken-base | 76649cc | no |
| backup/full-snapshot-T057-T061 | 306cfa2 Checkpoint T057–T061 | no |
| chore/cleanup | 18fe61e | no |
| main | 67694ac | ahead 2 of origin |
| **restore/pre-T061** | 6a14aeb T063 | no |
| setup/brief-06-planner-docs, setup/day2-content, setup/project-structure, setup/reconcile-planner-docs | – | yes |
| task/0020-home-review-answers | e1f24f7 | yes |
| task/T001 … task/T050 (38 branches), task/brief-07-report | – | yes |
| task/T051-images-as-warenlaw | 0555258 "first commit" (= origin/main) | no (as a branch) |
| task/T052-hero-media-pwc | 1a5ac80 | no |
| task/T052-hero-menu-colour | a0ffdab | no |
| task/T055-video-hero, T057, T058, T059, T060, T061 | 76649cc | no |
| task/T056-home-pwc-flow | 7f39fab | no |
| task/shared-hero | b6ffd0b | no |

**Tags (5):**

| Tag | Commit | Date | On GitHub |
|---|---|---|---|
| `v1.0.0` | 90a9cde | 2026-11-03 | yes |
| `safe-before-T055-merge` | 67694ac | 2026-11-09 | no |
| `safe-before-T056` | 7f39fab | 2026-11-10 | no |
| `backup-before-revert` | 6b4eade | 2026-11-10 | no. **Same name as a branch**, so git calls it `tags/backup-before-revert` and the name is ambiguous. |
| `approved/T063-prefooter` | 6a14aeb | 2026-11-11 | no |

**Stashes (3):**

| Stash | Made on | Date | Content |
|---|---|---|---|
| `stash@{0}` | task/T061-wealth-feature | 2026-11-11 11:40 | "T061-broken-snapshot": 26 files, +1925/−493, includes `home-390.png` snapshot |
| `stash@{1}` | main | 2026-11-10 20:06 | "main overlay before restoring T055": 16 files, +188/−167 |
| `stash@{2}` | main | 2026-11-10 13:52 | "wip before T055": 12 files, +180/−167 |

**Remote:** `origin` → `https://github.com/carlke2/Waren-Law.git`.
