# WAREN LAW — AGENT BRIEF 07: COMPLETE SITE BUILD (ONE RUN, TIMEBOXED)

**Goal:** by the end of this run, every public page of warenlaw.com exists in the new design, works in production mode, and is merged to `main`. One design only: the locked Home.

**Timebox: 2 h 45 min from when you start.** At that point finish the page you are on, merge it, and go straight to section 6 (report). Do not start a new page after the timebox.

## 0. Read first (binding, in this order)
`AGENTS.md` → `docs/GROUND-RULES.md` → `docs/design/DESIGN-SPEC.md` (v3.4) → `docs/design/PAGE-MAP.md` → decisions 0016, 0017, 0020, 0021 → this brief.
Visual references: `docs/design/reference/home-design.html`, `about-us.html`, `our-partners.html` (open in a browser; resize for phone).

## 1. Scope — what you may and may not do

**You may:** delete design leftovers (section 2); fix Home (section 3); build the pages in section 4 in that order; build source tracking (T041) for the forms; add database fields, seed content through the import curation, and API endpoints needed by these pages; write tests.

**You must not:**
- invent a new visual style, colour, font, size, shadow, radius or section pattern — use only `theme.css` tokens and existing components; if a page needs something new, build the simplest version from existing parts and list it in the report;
- add dependencies other than `pixelmatch`/`pngjs` (already approved); list any you believe are unavoidable and stop that page instead of adding them;
- build the admin panel, newsletter sending, media uploads, payments, a careers page, case results or fee pages;
- deploy, change DNS, touch the live warenlaw.com, or change `.env` files (tell the owner if a new variable is needed and use a safe default in `.env.example`);
- publish placeholder text: any `[square-bracket]` text from the design references must come from the database (imported firm text) or the section is hidden;
- run `pnpm dev`; review and test in production mode only (`pnpm build && pnpm start`), on ports 3100/4100 if 3000/4000 are busy;
- leave servers running at the end.

## 2. Clean up (first, 10 min max)
On branch `task/T042-design-cleanup`:
- Delete: `docs/design/archive-*`, `docs/design/reference/archive-*`, every `*.dc.html` in the repo, and any other file describing a design other than the locked one (list them).
- Delete any frontend component, style or route not used by the locked design (list them). Theme check and lint must still pass.
- Update the match test (`pnpm test:match`) to use `home-design.html`.

## 3. Finish Home (30 min max)
On branch `task/T043-home-finish`:
- Apply decision 0020 if not already applied (Home approved, Phylis alt text, newsletter privacy line, success/error tokens, hero card links, font subsetting).
- **Database speed (required for every later page):** find and fix why practice-area queries take 1.7–15 s (N+1, missing indexes, pooling, query shape). Every public endpoint < 1 s against Supabase; `pnpm build` passes without raised timeouts. Record before/after timings.
- Fix tablet (768) and phone (390) differences. Target ≥ 95% match at 390, 768, 1280, 1440 (photos and real text excluded).

## 4. Build the pages (priority order, one branch and one merge per item)

Shared for every inner page: the **page hero** exactly as in `about-us.html` (header over a shorter Nairobi band, breadcrumb, eyebrow, title, one-line intro; active nav item in gold), the Home footer and CTA band, phone rules from spec §7, one H1, metadata and canonical, all content from the API, fully pre-rendered, no loading states, no client-side page fetching.

| # | Branch | Pages | Sections (from PAGE-MAP) |
|---|---|---|---|
| 1 | `task/T044-about` | `/about-us/`, `/our-partners/` | Exactly as `about-us.html` and `our-partners.html` (film block with "coming soon" state; mission/vision only if the firm's text exists in the database, else hide) |
| 2 | `task/T045-practice-areas` | `/area-of-expertise/` + 8 practice pages at their current URLs | Index: page hero, 8 practice cards (Home style), help band, CTA. Practice page: page hero, overview, how we help, advocates for this area (portrait cards), FAQs (accordion, if any), related insights (Home insight cards), CTA |
| 3 | `task/T046-our-people` | `/our-team/`, `/our-team/<slug>/` | Team: page hero, practice-area filter chips (links, work without JS), groups Partners / Advocates / Consultants / Staff (portrait cards, 2-up on phone). Profile: profile hero (portrait, name, role, contact buttons, book), biography, experience, education & admissions, practice areas, their insights, related people, CTA. Old `/ephraim-ndegwa/` → 301 |
| 4 | `task/T041-source-tracking` | — (backend) | Decision 0017 and `docs/tasks/T041-lead-attribution.md` |
| 5 | `task/T047-contact` | `/contact-us/`, `/book-a-consultation/` | Contact: page hero, contact form + direct contacts, offices (Nairobi, Nakuru, Beijing) with click-to-load maps. Consultation: page hero, form (fields in PAGE-MAP), what happens next, FAQs. Both forms: native, source tracking, privacy line, honeypot, rate limit, success/error states with theme tokens. Header "Contact Us" and every "Book a consultation" link point here |
| 6 | `task/T048-insights` | `/insights/` (+ pages), `/category/<slug>/`, article pages at current URLs, `/insights/webinars/`, webinar pages at current URLs | Listing: page hero, featured article, category chips, grid, pagination, newsletter band. Article: header, image, body (all block types), author box, related practice areas, related articles. Webinars: state (upcoming / recording / past); recording request form with source tracking |
| 7 | `task/T049-remaining` | `/search/`, 404, `/privacy-policy/`, `/terms/`, `/cookie-policy/` | Compact page hero + content; Terms and Cookie Policy visible only when approved (decision 0011/0012) |
| 8 | `task/T050-release-check` | — | Redirects for every URL in `docs/seo/url-inventory.csv` (each old URL = 200 or one 301); sitemap; robots (noindex while `SITE_INDEXABLE=false`) |

For each item before merging: lint, theme check, typecheck, unit tests, Playwright for its pages (navigation, forms, phone menu), screenshots at 390 and 1440 into `docs/reports/complete-build/<page>/`. If an item's checks fail and you cannot fix them within 10 minutes, stop that item, revert its branch, note it, and move to the next.

## 5. Final checks (15 min, inside the timebox)
Production build; click every route in the header and footer; URL check result table; `pnpm test:match` on Home and About; Lighthouse mobile on Home, one practice page, one article (record scores); confirm no requests to Google/Meta before consent; stop all servers.

## 6. Report, then STOP
Save to `docs/reports/brief-07-report.md` and post:
```
## Report: Brief 07 — Complete site build
Time used: <h:mm>
Done (merged): <items with routes>
Not done / reverted: <items + reason>
Cleanup: <deleted files/components>
Database speed: <before/after per endpoint>
Match (Home, About): <% per width>
URL check: <passed/failed>
Lighthouse mobile: <page: perf/a11y/bp/seo>
New things built from existing parts (for morning review): <list>
Content gaps shown on the site: <list>
Questions for the owner: <list>
How to run: pnpm build && pnpm start
```
