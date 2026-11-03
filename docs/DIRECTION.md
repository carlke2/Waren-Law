# Project direction

Agreed 3 November 2026 (architecture: decision 0003; scope and defaults after the audit: decision 0004). This is the brief everything else follows. Change it only through a decision record in `docs/decisions/`.

## 1. What we are building

A **full rebuild** of warenlaw.com as a custom-coded system in this repository, replacing the current WordPress + Elementor site:
- a **frontend** (public website + admin screens), and
- a **backend** API with a database, used by the admin to manage all content.

**Goals**
- Present WAREN Law as a premium, trustworthy, modern Kenyan firm with a global outlook.
- Turn visitors into consultations (book, call, WhatsApp, email).
- Rank well for Kenyan legal searches and diaspora topics (succession, property, wealth protection).
- Be fast, secure, accessible and easy to maintain.

## 2. Architecture and technology

```
Browser ──▶ FRONTEND (warenlaw.com) ──HTTPS/JSON──▶ BACKEND (api.warenlaw.com) ──▶ PostgreSQL
            Next.js: site + /admin                  NestJS: auth, content, media      + media storage
```

**Tech stack (as pitched to the client)**

| | |
|---|---|
| Languages | TypeScript · HTML5 · Tailwind CSS |
| Frameworks and libraries | Next.js (routing, server-side rendering, static generation) · React (UI library) |
| Runtime | Node.js (server-side runtime for frontend and backend) |
| Backend additions | NestJS (Node.js + TypeScript API framework) · PostgreSQL · Prisma |

| Area | Choice |
|---|---|
| Repository | One repo (monorepo) with `frontend/`, `backend/` and `shared/`, managed with **pnpm** workspaces |
| Frontend | **Next.js** (App Router) + **TypeScript** (strict) + **Tailwind CSS** with design tokens |
| Admin screens | Inside the frontend at `/admin` (hidden, not indexed), calling the backend API |
| Backend | **Node.js + TypeScript** with **NestJS** (REST API, one module per content type) |
| Database | **PostgreSQL on Supabase** via **Prisma** ORM (migrations in the repo; pooled `DATABASE_URL` + `DIRECT_URL`). Must be able to align with the firm's existing database later — see section 5. Decision 0006 |
| Code standards | Minimal comments, nothing hard-coded (env / database / shared constants / design tokens / UI dictionary). Decision 0006 |
| Shared | `shared/`: TypeScript types and validation schemas (Zod) used by both frontend and backend |
| Media | Uploaded images stored on the server (persistent volume), served by the web server; resized/compressed on upload |
| Auth | Single administrator account: password (argon2 hash) + TOTP two-factor, httpOnly secure session cookie on `.warenlaw.com`, lockout after failed attempts |
| Connection | Frontend calls the backend at `API_URL` (env variable). Backend allows only the frontend's origin (CORS). Public pages are pre-rendered and refreshed on demand when the admin saves (backend calls a secured revalidate endpoint) |
| Forms | Contact and newsletter forms post to the backend; email sent via SMTP (firm's Google Workspace); minimal data stored, privacy notice on every form, honeypot + rate limiting |
| Email | SMTP settings in environment variables; newsletter sending can be switched off in Settings |
| Search | PostgreSQL full-text search over insights, practice areas and team |
| Consent | Cookie consent banner; analytics/ads tags (GTM, Google tag, Meta Pixel) load only after consent |
| URLs | All current paths kept; root-level slug resolver; redirects managed in the database and applied by the frontend middleware / Nginx |
| Hosting | Our company server, using **Docker** (frontend, backend, PostgreSQL, Nginx reverse proxy with HTTPS) |
| Domain | warenlaw.com, registrar and DNS at **Hostinger**. Mail (Google Workspace MX, SPF, DMARC) must stay unchanged at launch; only web records move to our server |
| Environments | Local (Docker Compose) · Staging · Production |
| Quality | ESLint, Prettier, type checks, unit + API tests; automated checks on every pull request |

**SEO continuity:** every existing URL either keeps its path or gets a permanent (301) redirect. The two debt-recovery pages are merged into one.

## 3. Design requirements

**Direction:** refine the current brand — keep the gold logo and identity, make it more premium, modern and clean. (Design and system flow to be detailed with the planner after the WordPress analysis.)

**Principles**
- Calm, confident and uncluttered; generous white space.
- Gold as the signature accent, never overused.
- Serif headings for authority, clean sans-serif body text for readability.
- Real photography of the team and offices preferred over stock images.
- Mobile-first: most Kenyan visitors arrive on phones.

**Standards**
- Accessibility: WCAG 2.2 AA (contrast, keyboard use, alt text, focus states).
- Performance: Lighthouse 90+ on mobile; Largest Contentful Paint under 2.5s.
- Every page has a clear next step (Book a Consultation / WhatsApp).
- Consistent components: header, footer, buttons, cards, practice-area blocks, insight cards, contact form.

**Client requirements**
- *About Us video:* a preview video near the top of About Us. The firm provides the final video; during development we use our own placeholder. Loads only on play, with a poster image and captions. Video set from the admin.
- *Team page redesign:* consistent professional portraits; cards with name, role and practice areas; a profile page per advocate (`/our-team/[slug]`) with bio, expertise, admissions and LinkedIn; filter by practice area; advocates shown on their practice-area pages. Managed from the admin.
- *Admin panel:* one administrator account for maintenance and updates to pages, insights, webinars, team members, client logos, media and site settings, with drafts, preview and change history.

**Pages (sitemap)** — final version confirmed after the WordPress analysis
- Home
- About · Our Team · Our Partners
- Areas of Expertise (index) + 8 practice-area pages
- Insights (index) + articles; webinars/events
- Contact (Nairobi head office, Nakuru branch, Beijing joint office; maps, form, WhatsApp, booking)
- Webinars index + webinar pages (upcoming / recording / past)
- Search results
- Privacy Policy · Terms / Legal Disclaimer · Cookie Policy

No diaspora hub: diaspora content stays in Insights (decision 0004).

## 4. Language

- **Site content:** English only. The current Chinese (zh_CN) alternate is dropped; other languages can be added later.
- **Spelling:** British English (as used in Kenyan legal practice), e.g. "organisation", "labour", "advocate".
- **Tone:** professional, clear and reassuring. Plain language first, legal terms explained.
- **Rule:** content informs, it never gives legal advice. All legal content is marked `NEEDS ADVOCATE REVIEW` until a lawyer at the firm approves it.
- **Code language:** TypeScript everywhere; code, comments and commit messages in English.

## 5. Open client inputs (do not block development — defaults in decision 0004)

- Domain renewal and Hostinger account access (urgent: expires 29 Nov 2026)
- Firm's existing database: what it is and whether we align with it (Prisma keeps PostgreSQL/MySQL open)
- Company server details (OS, Docker, who manages it)
- Brand files (original logo, colours, fonts), office photos, final About video
- Team: bios, titles, preferred names, admissions, who gets profiles
- Legal content approver; testimonials, result claims and client-logo permissions
- Official phone/WhatsApp numbers, offices (Ruiru?), booking system
- Newsletter subscriber export, ODPC registration and data protection contact
