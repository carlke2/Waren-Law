# WAREN LAW WEBSITE REBUILD — AGENT BRIEF 06: FRONTEND RESET + HOME PAGE

Build **only** the Home page, header and footer, matching `docs/design/DESIGN-SPEC.md` v3 and the design source `docs/design/reference/home-design-v3.dc.html` (open it in a browser to see the design; it is the visual source of truth).

Read first: `AGENTS.md`, **`docs/GROUND-RULES.md`** (binding), `docs/design/DESIGN-SPEC.md`, decisions 0013–0016. The spec is binding: no colour, font, size, spacing or layout outside it. If something is missing, stop and ask.

## 0. Before you start
1. Pull `main`. Commit the planner's files: `docs/GROUND-RULES.md`, `AGENTS.md`, `docs/design/` (spec v3, design source, archives), decisions 0013–0016, this brief. Delete `docs/prompts/06-AGENT-REDESIGN-FOUNDATION-HOME.md` if present.
2. **Report the current state** in 5 lines: did brief 05 run? What was merged? (Backend work from it is kept.)
3. Stop any servers you started earlier. Create task files T035–T039 (`Ready`). README status → "Frontend reset + Home page (brief 06)".

## 1. Tasks (in order, one branch each)

### T035 — Frontend reset
- **Delete** all visual code: `frontend/src/components/**`, all layouts and page templates in `frontend/src/app/(site)/**`, `frontend/src/styles/**`, `/_design`, `loading.tsx` files, and tests for deleted components.
- **Keep** (move into `frontend/src/lib/` if needed): API client, data loaders, slug resolver logic, consent state/storage/tag-loading logic, dictionary, SEO/metadata helpers, env handling, test setup.
- `next.config`: `devIndicators: false`.
- Minimal placeholder so the app builds. **Done when:** build, lint, typecheck, remaining tests pass; `grep` proof that no old component or style remains.

### T036 — Home content model (backend)
The Home page needs data the spec uses:
- Home page record: `heroImageId`, `heroVideoUrl?`, `heroCards` (ordered list of 3: `icon`, `title`, `text`, `href`), `pageH1` (visually hidden), `welcomeTitle`, `welcomeBody` (blocks), `welcomeCtaLabel`, `expertiseTitle`, `expertiseIntro`, `teamTitle`, `teamIntro`, `insightsTitle`, `ctaTitle`, `ctaBody`.
- PracticeArea: `icon` (name from a fixed icon set in `shared/src/constants`) and `cardSummary` (one line).
- Settings: `firmDescription` (footer line), `newsletterIntro`, primary/secondary phone, email, address line.
- Prisma migration + shared Zod schemas + API responses; seed via the import curation with the copy in the design (idempotent).
- Newsletter: `POST /api/v1/newsletter` (validated, honeypot, rate-limited, stores a Subscriber with consent time; double opt-in email only when SMTP is configured).
- Hero image: use `docs/design/assets/hero-nairobi.jpg` if the owner added it, else the best wide image available, listed as a gap. Record every image source in `docs/design/image-sources.md`.

### T037 — Tokens, fonts, header, footer
- **Theme file first (spec §0):** `frontend/src/styles/theme.css` with palette + semantic tokens, `fonts.ts`, Tailwind mapped to semantic tokens only, default Tailwind colours removed, and `scripts/check-theme.ts` wired into `pnpm lint` (fails on raw colours or font names in components).
- Newsreader + Manrope via `next/font`.
- The transparent header over the hero that turns solid navy on scroll (spec §4 items 1–3), with mobile full-screen menu; footer with native newsletter form, WhatsApp link button, consent panel wired to the kept consent logic (spec §4 items 1–3, 10 and Floating).
- Holding page for nav targets not yet built: header + footer + page title only.

### T038 — Home page
Spec §4 items 1–9 exactly, matching the design source section by section: hero (image now, video-ready) with only the three cards, welcome, 8 practice cards, partners band, latest 3 insights, recognition strip, CTA band. All content from the API. Fully pre-rendered; no client fetching; no loading states.

### T039 — Verification
- Production build + start (`pnpm build && pnpm start`), then:
- Screenshots (WebP) at **360, 390, 430, 768, 1024, 1280, 1440, 1920** (phones matched against the phone board), plus first-screen captures at **1366 × 768** and **1920 × 1080** proving the full hero cards are visible without scrolling, → `docs/reports/home-v3/`, plus one **side-by-side** image at 1440 of the design source and our Home.
- Playwright (dev dependency): header desktop + mobile menu + keyboard, practice/team/insight links, newsletter form states, consent accept/reject with no Google/Meta requests before Accept; visual snapshots at 375 and 1440.
- Lighthouse mobile on Home (record scores, CLS). Theme check: change `--palette-navy-900` once, screenshot, revert (spec §9 2c).
- **Stop all servers afterwards.**

## 2. Rules
- Ground rules + code standards: minimal comments, nothing hard-coded, tokens only, no embeds, no loading states.
- One branch per task; merge only with lint, typecheck, tests, Playwright and build green.
- **Build nothing beyond Home, header, footer and the holding page.**

## 3. Report, then STOP
```
## Report: Frontend reset + Home (T035–T039)
Status: Done | Blocked
State before starting: <brief 05 status>
Deleted vs kept: <lists + grep proof>
Spec deviations: <list with reason, or "none">
Images used and sources: <list; gaps>
Screenshots: docs/reports/home-v3/ (+ side-by-side)
Lighthouse mobile: perf / a11y / best practices / SEO / LCP / CLS
Tests: unit, Playwright, visual snapshots
How to run: <exact commands>
Dependencies added: <list with reason>
Hard-coded values that could not be avoided: <list or "none">
Questions / blockers: <list or "none">
```
