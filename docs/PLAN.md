# Implementation plan

**Agreed:** 3 November 2026 · **Version 1:** Thursday 5 November 2026 · **V2:** Friday 20 November · **Production launch:** target week of 7 December 2026 (buffer to 21 December)
**Inputs:** `docs/DIRECTION.md`, `docs/STRUCTURE.md`, decisions 0001–0005, audit `docs/audit/01–06`.

How it runs: the planner writes a brief per batch of tasks → the agent builds on one branch per task → the owner pastes the report back → the planner reviews and releases the next batch. Client inputs arrive in parallel; **nothing waits on the firm** (defaults in decision 0004).

---

## Version 1 — due Thursday 5 November (decision 0005)

**V1 = the complete public website on the real production codebase**, with the firm's existing content imported into PostgreSQL and served through the backend API, deployed to a staging URL on the company server. Admin screens come in V2.

| Day | Brief | Tasks (from the full plan below) | End-of-day result |
|---|---|---|---|
| **Tue 3 Nov** (evening) | **03 — V1 Day 1: foundation + data** | T002 tooling + CI · T003 backend · T004 frontend · T005 shared + local stack · T006 database schema · **T028a** import from the WordPress REST API · T008 public read API | All content in the local database and available from the API |
| **Wed 4 Nov** | **04 — V1 Day 2: design + pages** | T012 design system (in code) · T013 layout (header, footer, WhatsApp, consent) · T014 Home · T015 About (video placeholder) · T016 Team + profiles · T017 Practice areas · T018 Insights · T019 Webinars · T020 Contact, Partners, legal pages, search, 404 | Every public page working locally with real content |
| **Thu 5 Nov** (morning) | **05 — V1 Day 3: forms, SEO, deploy** | T011a contact form (stores + emails) · T021 SEO layer + redirects for kept URLs · T030a production Docker + Nginx · T031a staging deploy · V1 QA (mobile, links, accessibility basics, Lighthouse) · V1 release notes | **V1 live on staging for the client** |

**In V1:** all public pages; real content (36 insights, 8 practice areas with the merged debt page, 20 team members, webinars, partners, offices); practice ↔ team ↔ insight links; team filter; profiles for partners, advocates and consultants; search; contact form; cookie consent with consent-gated tracking; SEO metadata, schema, sitemap; all current URLs working; mobile-first and fast.

**Not in V1 (V2):** admin screens (T022–T027), media uploads (T010), newsletter sending (rest of T011), change history UI, full WordPress XML migration polish (T028–T029), production launch (T032–T034).

**V1 quality bar (no shortcuts that get thrown away):** strict TypeScript, Zod validation at the API, tests for API endpoints and key components, CI green, Lighthouse 90+ mobile on Home, one H1 per page, alt text on every image.

**After V1:** V2 = admin panel + media + newsletter + history (≈2 weeks), then content review, QA and production launch. The phase tables below are the full task list; tasks already done in V1 are skipped.

---

## Roadmap after V1

| Stage | When | Brief | Tasks | Client sees |
|---|---|---|---|---|
| **V1 review** | Thu 5 – Fri 6 Nov | 06 — V1 fixes | Client feedback on staging → fixes and polish | Updated staging |
| **V2.1 Admin foundation** | Mon 9 – Wed 11 Nov | 07 | T007 auth (password + 2FA, sessions, lockout) · T009 admin content API + history · T010 media uploads | — |
| **V2.2 Admin screens** | Thu 12 – Tue 17 Nov | 08 | T022 admin shell + login · T023 settings, offices, pages · T024 practice areas + team · T025 insights, categories, webinars · T026 media library, logos, partners, awards, testimonials · T027 history, redirects, submissions, subscribers | — |
| **V2.3 Email + newsletter** | Wed 18 – Thu 19 Nov | 09 | Rest of T011: newsletter double opt-in, gated webinar recordings, SMTP via the firm's Google Workspace, sending switch | — |
| **V2 release** | Fri 20 Nov | — | V2 QA, release notes | **Admin demo: firm edits its own content on staging** |
| **V3.1 Real content** | 23 – 27 Nov | 10 | T028 full WordPress export import (all media) · T029 redirects + content QA · client fills bios, titles, approvals, video | Content review on staging |
| **V3.2 Production readiness** | 30 Nov – 4 Dec | 11 | T030 production Docker + Nginx + HTTPS · T031 backups, monitoring · T032 full QA (accessibility, performance, security) · T033 admin guide + runbook | Final sign-off |
| **Launch** | target week of 7 Dec (buffer to 21 Dec) | 12 | T034 DNS cutover at Hostinger (web records only, mail untouched), go-live checks, WordPress decommission | **warenlaw.com live** |

Launch depends on the domain being renewed and Hostinger DNS access. Everything before launch proceeds without client input.

## Milestones

| | When | What "done" means |
|---|---|---|
| **V1** | Thu 5 Nov | Full public website with real content on staging |
| **V2** | Fri 20 Nov | Admin manages all content; media, newsletter and history working |
| **V3** | Fri 4 Dec | Real content complete and reviewed; production server ready; QA passed |
| **Live** | target week of 7 Dec | DNS switched, site live, mail untouched, handover done |

---

## Full task list
Task IDs are fixed. V1 and the roadmap above pick tasks from these phases; a task is done once, wherever it appears.

## Phase 0 — Foundation (V1)

| ID | Task | Delivers | Depends on |
|---|---|---|---|
| T002 | **Monorepo tooling + CI** | pnpm workspaces wired; shared TypeScript base config (strict); ESLint + Prettier; root scripts (`dev`, `build`, `lint`, `typecheck`, `test`); GitHub Actions running lint, typecheck, test on every PR | — |
| T003 | **Backend scaffold** | NestJS app in `backend/`; config module with env validation; Prisma connected to PostgreSQL; `GET /health`; global validation, error filter, CORS for `FRONTEND_URL`; Helmet; rate-limit module; `.env.example`; one test | T002 |
| T004 | **Frontend scaffold** | Next.js (App Router) + Tailwind in `frontend/`; route groups `(site)` and `admin`; typed API client in `lib/api` reading `API_URL`; placeholder home calling `/health`; `.env.example`; one test | T002 |
| T005 | **Shared package + local stack** | `shared/` builds and is imported by both apps; first Zod schema + type (Setting); `infra/docker-compose.yml` with PostgreSQL (+ optional pgAdmin) for local dev; README "run locally" steps | T003, T004 |

## Phase 1 — Data and API (V1 + V2.1)

| ID | Task | Delivers | Depends on |
|---|---|---|---|
| T006 | **Database schema** | Full Prisma schema from audit 06 data model (Setting, Office, Page, PracticeArea, TeamMember, Insight, Category, Webinar, ClientLogo, Partner, Award, Testimonial, Media, ContactSubmission, Subscriber, Redirect, AdminUser, Session, ChangeHistory); relations; first migration; seed with realistic sample data; Zod schemas for every entity in `shared/` | T005 |
| T007 | **Auth module** | Single admin: argon2 password, TOTP 2FA (setup + verify), session cookie (httpOnly, secure, SameSite), session table, lockout after failed attempts, login rate limit, logout; CLI command to create/reset the admin; admin guard for all `/admin/*` endpoints; tests | T006 |
| T008 | **Public read API** | `GET` endpoints for settings, offices, pages, practice areas (with team + insights), team (filter by practice area), insights (list, category, by slug, related), categories, webinars (by state), partners, awards, visible client logos, approved testimonials; slug resolver endpoint for root paths; pagination; only `published` + legal-approved content; tests | T006 |
| T009 | **Admin content API + history** | CRUD for every entity behind the admin guard; draft / publish / unpublish / archive; `legalReviewStatus` gate (cannot publish legal content until approved); history module recording before/after on every change + restore endpoint; frontend revalidation call on save; tests | T007, T008 |
| T010 | **Media module** | Upload endpoint; type + size limits; resize/compress to WebP variants (sharp); alt text required for images; files on a volume (`backend/uploads/` locally); delete only when unused; tests | T007 |
| T011 | **Forms, email, newsletter, search, redirects** | Contact form endpoint (honeypot, rate limit, consent timestamp, email to firm via SMTP); newsletter subscribe / unsubscribe (double opt-in) and gated webinar recording email; Settings switch for sending; search endpoint (PostgreSQL full-text); redirects table + lookup endpoint; tests | T008 |

## Phase 2 — Design system (V1)

| ID | Task | Delivers | Depends on |
|---|---|---|---|
| T012 | **Design tokens + UI components** | Tailwind tokens built from the current brand (navy, gold with accessible contrast, neutrals, serif headings + sans body, spacing, radius); `components/ui`: buttons, links, inputs, select, textarea, checkbox, badge, card, tag, tabs, accordion, modal, toast; focus states; WCAG AA contrast | T004 |
| T013 | **Site layout** | Header + navigation (desktop + mobile menu), footer (offices, quick links, practice areas, socials, legal links), WhatsApp button, cookie consent banner with consent-gated tag loading, breadcrumbs, page templates (one H1 each), SEO metadata helper | T012, T008 |

## Phase 3 — Public site (V1)

| ID | Task | Delivers | Depends on |
|---|---|---|---|
| T014 | **Home** | Hero (static image on mobile, optional video desktop), who-we-serve line, all 8 practice areas, trust (awards, permitted logos), featured advocates, latest insights, upcoming webinar, CTA | T013 |
| T015 | **About** | Story, mission/values, About video section (placeholder, poster, captions, loads on play), awards, partners teaser, CTA | T013 |
| T016 | **Team + profiles** | Team page grouped (partners, advocates, consultants, staff) with practice-area filter; profile template `/our-team/[slug]/`: portrait, role, practice areas, bio, experience, education, admissions, contacts, booking, their insights | T013 |
| T017 | **Practice areas** | Index + 8 practice pages: summary, structured body, FAQ, responsible advocates, related insights, CTA; merged debt page | T013 |
| T018 | **Insights** | Listing with category filter + pagination, category pages, article template at root slug (author, practice links, related, FAQ schema), feed at `/feed/` | T013 |
| T019 | **Webinars** | Webinars index; webinar page with state (upcoming → register, recording → gated sign-up, past → summary), panel, FAQ; inside site header/footer | T013, T011 |
| T020 | **Contact, Partners, legal, search, 404** | Contact (offices incl. Beijing, maps, form with privacy notice, WhatsApp, booking); Partners page; Privacy, Terms, Cookie pages; search results page; 404 | T013, T011 |
| T021 | **SEO layer** | Per-page metadata + canonical; Open Graph; JSON-LD (LegalService, Organization, Person for advocates, Article, FAQ, Event); sitemap from indexable records; robots.txt; verification tags from Settings; redirect middleware | T014–T020 |

## Phase 4 — Admin panel (V2.2)

| ID | Task | Delivers | Depends on |
|---|---|---|---|
| T022 | **Admin shell + login** | `/admin` layout (noindex), login + 2FA screens, first-time 2FA setup, session expiry handling, dashboard (drafts, needs review, recent changes, recent submissions) | T012, T007 |
| T023 | **Settings, offices, pages** | Forms for Settings (contacts, socials, booking, WhatsApp, About video, tracking IDs, email switch), Offices, Pages with a block-based rich-text editor | T022, T009 |
| T024 | **Practice areas + team** | Editors with relations (assign advocates/practice areas), ordering, portrait picker, profile toggle | T022, T009, T010 |
| T025 | **Insights, categories, webinars** | Article editor (blocks, excerpt, featured image, authors, categories, practice areas, SEO fields), draft / preview / publish, legal review status; category manager; webinar editor with state | T022, T009, T010 |
| T026 | **Media + trust content** | Media library (upload, alt text, usage, delete when unused); client logos (permission tick), partners, awards, testimonials (consent + approval ticks) | T022, T010 |
| T027 | **History, redirects, submissions, subscribers** | History viewer + restore; redirects manager; contact submissions list; subscribers list with CSV export and unsubscribe; retention clean-up job | T022, T009, T011 |

## Phase 5 — Content migration (V1 import + V3.1)

| ID | Task | Delivers | Depends on |
|---|---|---|---|
| T028 | **WordPress import** | Script in `scripts/` importing from a WordPress export (XML + uploads): posts, pages, categories, team, practice text, webinars; media renamed + alt text carried or flagged; all imported legal content set to `needs_advocate_review`; dry-run mode; report of gaps | T006, T010 |
| T029 | **Redirects + content QA** | Load redirect map from `docs/seo/url-inventory.csv`; check every old URL resolves (200 or one 301); fix import issues; list content still needing the firm | T028, T021 |

## Phase 6 — Infrastructure, QA, launch (V1 staging + V3.2 + Launch)

| ID | Task | Delivers | Depends on |
|---|---|---|---|
| T030 | **Production Docker + Nginx** | Dockerfiles (frontend, backend); `infra/docker-compose.prod.yml` (frontend, backend, Postgres, Nginx); HTTPS (Let's Encrypt) for apex, www, api; security headers; gzip/caching; one-hop canonical redirects; block `/wp-admin`, `/wp-login.php`, `/xmlrpc.php` | Phase 3–4 |
| T031 | **Staging + backups + monitoring** | Staging deploy on the company server; deploy script; nightly Postgres + uploads backups with restore test; uptime/error monitoring; log rotation | T030 |
| T032 | **QA pass** | Accessibility (WCAG 2.2 AA), Lighthouse 90+ mobile on key pages, cross-browser/phone checks, form tests, admin end-to-end tests, broken-link check, security review of auth and uploads | T031 |
| T033 | **Admin guide + handover** | `docs/admin-guide.md` (post an article, update team, swap the video, approve legal content, restore a version); operations runbook (deploy, backup, restore, rotate secrets) | T032 |
| T034 | **Launch** | DNS cutover checklist at Hostinger (web records only; MX/SPF/DMARC untouched; lowered TTL), go-live, post-launch checks (redirects, forms, email, Search Console sitemap, analytics with consent), WordPress backup + decommission | T033, domain renewed |

---

## Client inputs (collected in parallel — never blocking)

| Input | Needed for | Until then |
|---|---|---|
| Domain renewed + Hostinger access | T034 launch | **Urgent: expires 29 Nov** |
| Original logo, brand colours/fonts | T012 | Use logo and colours from the current site |
| Team bios, titles, preferred names, admissions, photos | T016, T024 | Current site text, marked for review |
| Legal content approver | Publishing | Content stays `needs_advocate_review` on staging |
| About video | T015 | Placeholder video |
| Client-logo permissions, testimonials, claims | T014, T026 | Hidden |
| Official numbers, offices, booking link | T013, T020 | Current values in Settings |
| WordPress export (XML + uploads), subscriber export | T028 | Public REST data for development |
| Company server access (OS, Docker) | T030 | Local Docker |
| Office photos | T014, T015, T020 | Neutral images |

## Working rules for this plan
- Task IDs are fixed; dates can move.
- One branch and one report per task; a brief may contain several tasks, done in order.
- No task merges to `main` with failing lint, typecheck or tests.
- Any change to scope or direction goes through a decision record.
