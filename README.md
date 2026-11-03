# WAREN Law — Website Rebuild

Working repository for rebuilding **[warenlaw.com](https://warenlaw.com)** (WAREN Law Advocates LLP, Nairobi & Nakuru) as a Next.js frontend and a Node.js (NestJS) backend with a custom admin panel. Planning happens in chat; the Claude execution agent builds from tasks in `docs/tasks/`.

- **Repository:** https://github.com/carlke2/Waren-Law
- **Start date:** 3 November 2026
- **Duration:** flexible — plan agreed after structure review ([`docs/PLAN.md`](docs/PLAN.md))
- **Status:** T001 — analysing the existing WordPress site (agent brief 02)
- **Agent brief:** [`docs/prompts/02-AGENT-WORDPRESS-ANALYSIS.md`](docs/prompts/02-AGENT-WORDPRESS-ANALYSIS.md)

## Getting started

```bash
git clone https://github.com/carlke2/Waren-Law.git
cd Waren-Law
```

## Folder structure

One repo, two apps (frontend + backend) and a shared package, managed with pnpm. Full layout and rules: [`docs/STRUCTURE.md`](docs/STRUCTURE.md).

| Folder | What goes here |
|---|---|
| `frontend/` | Next.js + React + TypeScript + Tailwind: public website and `/admin` screens |
| `backend/` | NestJS (Node.js + TypeScript) API, PostgreSQL via Prisma, media uploads |
| `shared/` | Types and validation schemas used by both apps |
| `infra/` | Docker Compose, Nginx, deploy and backup scripts |
| `scripts/` | One-off tools (e.g. WordPress migration) |
| `docs/` | Planning: direction, plan, tasks, decisions, audit, SEO, brand, prompts, reports (not deployed) |

## Current site at a glance

- **Current platform:** WordPress + Elementor (being replaced)
- **Practice areas (8):** Debt Recovery · Real Estate & Conveyancing · Mining & Energy · Banking & Finance · Litigation & Arbitration · Corporate & Commercial · Employment & Labour · Wealth Management
- **Audience signals:** Kenyan corporates and individuals; strong diaspora focus (succession, trusts, wealth protection)
- **Contact:** info@warenlaw.com · +254 714 350 932 · +254 719 278 594 · WhatsApp chat

## Working agreement

1. Everything starts here — plans, audits, drafts and agent work are committed to this repo.
2. Each change gets a clear commit message.
3. Decisions go in `docs/decisions/` so we can see later why something was done.
