# Project direction

Agreed 3 November 2026 (architecture updated the same day, see decision 0003). This is the brief everything else follows. Change it only through a decision record in `docs/decisions/`.

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
| Database | **PostgreSQL** via **Prisma** ORM (migrations in the repo). Must be able to align with the firm's existing database later — see section 5 |
| Shared | `shared/`: TypeScript types and validation schemas (Zod) used by both frontend and backend |
| Media | Uploaded images stored on the server (persistent volume), served by the web server; resized/compressed on upload |
| Auth | Single administrator account: password (argon2 hash) + TOTP two-factor, httpOnly secure session cookie on `.warenlaw.com`, lockout after failed attempts |
| Connection | Frontend calls the backend at `API_URL` (env variable). Backend allows only the frontend's origin (CORS). Public pages are pre-rendered and refreshed on demand when the admin saves (backend calls a secured revalidate endpoint) |
| Forms | Contact form posts to the backend, which emails info@warenlaw.com; submissions stored with minimal data |
| Hosting | Our company server, using **Docker** (frontend, backend, PostgreSQL, Nginx reverse proxy with HTTPS) |
| Domain | Firm's existing domain (likely Namecheap); DNS pointed to our server at launch |
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
- Contact (Nairobi and Nakuru offices, map, form, WhatsApp)
- Privacy Policy · Terms / Legal Disclaimer

## 4. Language

- **Site content:** English only. The current Chinese (zh_CN) alternate is dropped; other languages can be added later.
- **Spelling:** British English (as used in Kenyan legal practice), e.g. "organisation", "labour", "advocate".
- **Tone:** professional, clear and reassuring. Plain language first, legal terms explained.
- **Rule:** content informs, it never gives legal advice. All legal content is marked `NEEDS ADVOCATE REVIEW` until a lawyer at the firm approves it.
- **Code language:** TypeScript everywhere; code, comments and commit messages in English.

## 5. Still to decide

- **The firm's existing database:** what it is (the current WordPress site runs on MySQL/MariaDB), and whether we connect to it, migrate from it, or move to a database they provide. Prisma supports PostgreSQL and MySQL, so the choice stays open.
- Company server details (OS, Docker available, who manages it) and DNS access at Namecheap
- Final About Us video file (firm to provide)
- Brand assets: original logo files, exact colours and fonts
- Who at the firm approves legal content
- Analytics and Search Console access
