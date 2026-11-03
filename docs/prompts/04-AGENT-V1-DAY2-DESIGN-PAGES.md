# WAREN LAW WEBSITE REBUILD — AGENT BRIEF 04: V1 DAY 2 — DESIGN + ALL PUBLIC PAGES

**Goal for today:** every public page of the new site works locally, designed in code, with the real content from the API. Production code (decisions 0005, 0006, 0010).

Follow `AGENTS.md`, `docs/DIRECTION.md`, `docs/STRUCTURE.md`, `docs/PLAN.md`, decisions 0003–0010. Audit references: `docs/audit/02` (content), `05` (design and journeys), `06` (sitemap).

## 0. Before you start
1. Pull `main`; commit the planner's new files (`docs/decisions/0010-*.md`, this brief).
2. Apply decision 0010 point 2 in `scripts/import-wordpress` curation: hide quantified results and outcome claims; re-run the import (idempotent) and note what changed.
3. Create task files for T012–T020 (status `Ready`). README status → "Version 1 — Day 2: design + pages (brief 04)".

## 1. Global rules for today
- **Code standards (0006):** minimal comments, nothing hard-coded. Firm text, contacts, offices, links → API. UI wording → `lib/dictionary.ts`. Design values → tokens only. Route paths and enums → `shared/src/constants`.
- **Rendering:** Server Components by default; client components only where interaction needs them (menu, filter, consent, video, search box). Static generation with ISR; revalidate interval from env (`REVALIDATE_SECONDS`). `generateStaticParams` for every slug route. One fetch layer in `lib/api` with typed responses from `shared`.
- **Images:** `next/image` for everything; remote pattern built from `PUBLIC_MEDIA_BASE_URL`; width/height from the Media record; `alt` always from the record; priority only on the hero.
- **Fonts:** `next/font` (self-hosted at build, no runtime requests to Google).
- **Accessibility:** one `<h1>` per page, logical heading order, visible focus, keyboard-usable menu/filter/accordion/video, skip link, `aria` only where needed, colour contrast AA.
- **Every page** ends with a clear next step (book / WhatsApp / contact) driven by Settings.
- **Empty states:** a practice area with no advocates or insights hides that section cleanly (e.g. Banking & Finance).
- **No new dependencies** beyond what a task needs; list each with the reason. No UI kits.
- Tests: components with logic (filter, consent, video, slug resolver, pagination) get component tests. Lint, typecheck, test, build green before each merge.

## 2. Design direction (build this, refine on screen)
Refined version of the current brand: premium, calm, confident, generous white space.

| Token | Value / rule |
|---|---|
| `navy-900` | `#061557` (brand navy: header, headings, primary surfaces) |
| `navy-950` | `#000824` (footer, dark sections) |
| `gold-500` | `#D4AF37` (accent: rules, icons, highlights, buttons **with navy text**) |
| `gold-700` | a darker gold you derive that passes AA as text on white (for gold text/links on light backgrounds) |
| Neutrals | warm off-white page background, white cards, a grey scale for body text and borders; body text ≥ 7:1 where possible |
| Headings | **Cormorant Garamond** (600/700) — serif, authoritative |
| Body / UI | **Inter** (400/500/600) — continuity with the current site |
| Scale | fluid type scale (clamp) for h1–h6 and body; line length ~65–75ch for articles |
| Spacing | 4-px based scale; section padding generous; container max ~1200 px |
| Radius | small (2–4 px) — crisp, not playful |
| Motion | subtle (fade/slide ≤ 200 ms), respects `prefers-reduced-motion` |
| Imagery | real portraits on a consistent neutral treatment (same aspect ratio and crop for every card); no stock gavels |

Never white text on gold (fails contrast). Gold is an accent, never a large background behind body text.

## 3. Tasks (in order, one branch each)

### T012 — Design tokens + UI components
Tokens in Tailwind theme / CSS variables (above). `components/ui`: Button (primary navy, accent gold-with-navy-text, outline, link; sizes; as link), Container, Section, Heading, Text/Prose (article typography), Card, Badge/Tag, Input, Textarea, Select, Checkbox, Accordion, Tabs/Filter chips, Breadcrumbs, Pagination, VisuallyHidden, Icon set (inline SVG, minimal). A `/ _design` route **only in development** showing every component (excluded from production build/sitemap).
**Done when:** components render, are accessible, tests pass.

### T013 — Layout
Header (logo, primary nav per audit 06 sitemap with Areas of Expertise dropdown, "Book a consultation" CTA; sticky; mobile menu with focus trap), Footer (offices from API, quick links, practice areas, socials, legal links, copyright with current year), floating WhatsApp button (number + prefilled message from Settings), **cookie consent banner** (accept / reject / preferences; stored in a first-party cookie; GTM, Google tag and Meta Pixel load **only after** consent, IDs from Settings), skip link, `not-found`, `error`, and the shared page template (breadcrumb + hero/heading + content + CTA band).
**Done when:** layout on every route, consent verified (no tracking requests before accept), mobile menu keyboard-usable.

### T014 — Home
Hero: headline + who-we-serve line from the Home page record, two CTAs, static optimised image (no video on mobile; optional muted video on desktop only if a video URL is set). Then: practice areas (all 8), why choose us, featured advocates (partners first), trust (award; client logos only if permitted — currently none, so section hidden), latest 3 insights, latest/upcoming webinar, CTA band.
**Done when:** content from API only; Lighthouse mobile ≥ 90 locally on a production build.

### T015 — About
Story, mission/vision, values, **About video section** (poster image, play button, loads the embed/file only on click, captions track supported, video URL + poster from Settings; placeholder until the firm's video arrives), awards, partners teaser, CTA.

### T016 — Team + profiles
`/our-team/`: grouped (Partners, Advocates, Consultants, Staff) with practice-area filter chips (URL query `?practiceArea=` so filtered views are shareable; works without JS as links); consistent portrait cards (name, role, practice areas; link to profile when `hasProfile`). `/our-team/[slug]/`: portrait, name, role, practice areas (linked), office, contact actions (email, phone, WhatsApp, LinkedIn, booking — only those present), bio, experience, education, admissions, memberships, languages, their insights, CTA. Old `/ephraim-ndegwa/` handled by redirect (T021).

### T017 — Practice areas
`/area-of-expertise/` index (8 cards with summaries). Practice page at its **existing root URL**: hero, summary, structured body, FAQ (accordion), **advocates for this area**, **related insights**, CTA. Debt page = the merged `corporate-debt-recovery`.

### T018 — Insights
`/insights/` listing with category filter chips and pagination (`/insights/page/[n]/`), category pages `/category/[slug]/`, article pages at their **existing root slugs**: title, date, reading time, author(s) (linked profile when known; firm name otherwise), categories, practice-area links, featured image, block-rendered body (headings, paragraphs, lists, quotes, links, images, tables), related insights, CTA. Block renderer in `components/site` covers every block type the importer produces.

### T019 — Webinars
`/insights/webinars/` index; webinar pages at existing root slugs, inside the normal layout: state badge (upcoming / recording / past), summary, takeaways, panel (linked profiles), FAQ, action by state (upcoming → registration link; recording → "Request the recording" form placeholder that shows the dictionary message "available soon" until V2; past → summary only).

### T020 — Contact, Partners, legal pages, search, 404
Contact: offices (Nairobi, Nakuru, Beijing) each with address and map embed from the Office record, phones, email, WhatsApp, booking, and the **contact form UI** (fields, validation with the shared Zod schema, privacy notice, honeypot field; submission wiring is T011a tomorrow — today submit is disabled with the dictionary message). Partners page (partners, joint office). Privacy, Terms/Disclaimer and Cookie Policy pages from Page records: Privacy uses the firm's existing privacy text; Terms/Disclaimer and Cookie Policy get short, neutral, factual text (what the site is, that content is general information and not legal advice, which cookies are used and how consent works), added through the import curation. List all three in the report for the firm's advocate to review before launch. Search page `/search?q=` using the API. Styled 404.

**Root slug routing:** one `app/(site)/[slug]/page.tsx` that calls `resolve/:slug` and renders the right template (practice area, insight, webinar, page); static params generated for all slugs.

## 4. Verification before reporting
- Production build (`pnpm build` + start) and click through every route in the audit 06 sitemap.
- Headless Chrome screenshots at 390 px and 1366 px of: home, about, team, one profile, one practice page, insights listing, one article, one webinar, contact, 404. Save compressed WebP to `docs/reports/v1-day2-screens/` (commit them).
- Lighthouse (local) on home, one practice page and one article, mobile: record scores.
- Check: no request to Google/Meta before consent; every image has alt; one h1 per page; no console errors.

## 5. Report (one combined report, then stop)
```
## Report: V1 Day 2 — Design + pages (T012–T020)
Status: Done | Blocked
Branches / PRs: <per task>
Summary: <3–5 sentences>
Routes built: <list>
Lighthouse (mobile): home / practice / article — perf, a11y, best practices, SEO
Screenshots: docs/reports/v1-day2-screens/
Content gaps visible on the site: <list>
Done when: <per task ✅ / ❌>
Dependencies added: <list with reason>
Hard-coded values that could not be avoided: <list or "none">
Decisions made: <list or "none">
Questions / blockers: <list or "none">
Suggested next step: <one line>
```
