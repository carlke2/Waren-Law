# Direction

Rebuild of https://warenlaw.com for WAREN Law Advocates LLP, a Kenyan law firm with offices in Upper Hill, Nairobi and Nakuru.

**Build:** full rebuild in new code, replacing WordPress + Elementor.

## Tech stack

- **Languages:** TypeScript, HTML5, Tailwind CSS
- **Frameworks and libraries:** Next.js (routing, SSR, static generation), React
- **Runtime:** Node.js
- **Backend:** NestJS (Node.js + TypeScript), PostgreSQL, Prisma

## Architecture

Monorepo (pnpm workspaces) with two apps and a shared package:

- `frontend/`: Next.js public website and admin screens at `/admin`
- `backend/`: NestJS REST API at api.warenlaw.com: auth, content, media, contact form, PostgreSQL via Prisma
- `shared/`: Zod schemas and TypeScript types used by both

The frontend calls the backend over HTTPS/JSON at `API_URL`. The backend allows only the frontend origin (CORS).

## Admin

One administrator account only (password + TOTP 2FA, httpOnly session cookie).

## Hosting

Our company server with Docker (frontend, backend, PostgreSQL, Nginx + HTTPS). The firm's existing domain is pointed to it at launch.

## Database

PostgreSQL now. We may align with the firm's existing database later, so keep data access behind Prisma.

## Language and content

English only, British spelling, professional and plain. Content never gives legal advice. Legal content is marked NEEDS ADVOCATE REVIEW until the firm approves it.
