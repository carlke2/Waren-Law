# Frontend

Next.js (App Router) + React + TypeScript + Tailwind. The public website, rendered on the server from the backend API. See the root `README.md` for the whole project.

## Run

Copy `.env.example` to `.env` (`API_URL`, `PUBLIC_MEDIA_BASE_URL`, `SITE_URL`, `SITE_INDEXABLE`, `REVALIDATE_SECONDS`, `REDIRECT_CACHE_SECONDS`, `SKIP_PRERENDER`). Then, from the repo root:

| Command | What it does |
|---|---|
| `pnpm dev` | Shared package, backend and frontend in watch mode (frontend on port 3000) |
| `pnpm build` · `pnpm start` | Production build (needs the backend, which the script starts briefly) and production run |
| `pnpm --filter @waren/frontend test` | Unit tests (`tests/unit/`, Vitest + jsdom) |
| `pnpm test:e2e` | Playwright tests (`tests/e2e/`), including the visual snapshots in `tests/e2e/snapshots/`. Run `pnpm build` first |
| `pnpm lint` | Theme check (`scripts/check-theme.ts`: no raw colours, pixels or fonts in components) and ESLint |

## Layout

| Folder | What goes here |
|---|---|
| `src/app/` | Pages and routes. `(site)/` is the public site |
| `src/components/site/header/` | Site header and mega-menu |
| `src/components/site/footer/` | Site footer |
| `src/components/site/home/` | Home page sections only, with their `.module.css` |
| `src/components/site/templates/` | Page templates: about, contact, insight, legal, partners, practice area, root, webinar |
| `src/components/site/` | Other site pieces shared by several pages (logo, cards, forms, listings) |
| `src/components/ui/` | Small generic building blocks (buttons, fields, icons, links) |
| `src/lib/api/` | Data fetching from the backend API |
| `src/lib/utils/` | Helpers: dates, dictionary (all UI wording), navigation, header menu, SEO |
| `src/styles/` | `theme.css` (design tokens) and `globals.css` |
| `public/` | Images the **code** refers to by path (below) |
| `scripts/` | `check-theme.ts`, and `qa/` link, SEO and old-URL checks (run by hand: see the usage line at the top of each) |

## Images in `public/`

Files in `public/` are referenced from code by path, never from the database. Firm content media (portraits, insight images, logos, the hero video) lives in `backend/uploads/` and reaches the site through the API. See `backend/README.md`.

| File | Used by |
|---|---|
| `brand/golden-logo.png` | `components/site/logo.tsx` (header and footer logo); `lib/utils/seo/schema.ts` (organisation logo in structured data) |
| `home/lady-justice-cutout.webp` | `components/site/home/home-intro.tsx` (intro statue) |
| `home/prefooter-bg.webp` | `components/site/home/home-prefooter.tsx` (pre-footer background, desktop) |
| `home/prefooter-bg-mobile.webp` | `components/site/home/home-prefooter.tsx` (pre-footer background, phones) |

Before removing a file here, search the code for its path. Before adding one, make sure the code references it.
