# WAREN Law — Website Rebuild

Working repository for rebuilding **[warenlaw.com](https://warenlaw.com)** (WAREN Law Advocates LLP, Nairobi & Nakuru) as a Next.js frontend and a Node.js (NestJS) backend with a custom admin panel.

- **Repository:** https://github.com/carlke2/Waren-Law
- **Start date:** 3 November 2026
- **Status:** Public pages built, awaiting owner review
- **Planning archive:** plans, decisions, audits and task reports up to 12 November 2026 are kept outside the repo in `~/warenlaw-archive/2026-11-12/docs/`

## Getting started

```bash
git clone https://github.com/carlke2/Waren-Law.git
cd Waren-Law
```

## Run locally

You need Node 26 (`nvm use`) and pnpm through Corepack. Node 26 doesn't bundle Corepack, so install it once with `npm i -g corepack`, then run `corepack enable`.

```bash
git clone https://github.com/carlke2/Waren-Law.git
cd Waren-Law
nvm use
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

In `backend/.env`, set:

- `DATABASE_URL`: Supabase pooler, transaction mode.
- `DIRECT_URL`: Supabase direct connection with `?sslmode=require`. The direct host is IPv6-only, so without IPv6 use the session pooler (the same pooler host on port 5432).
- `SESSION_SECRET`: the output of `openssl rand -hex 32`.

Never commit these values or paste them into chat, tickets or logs.

Locally and on staging, also set `PREVIEW_UNREVIEWED_PAGES=true` to show pages awaiting advocate review (decision 0011). Leave it out in production.

```bash
pnpm dev
```

This runs the shared package (watch), the backend at http://localhost:4000 and the frontend at http://localhost:3000.

A production frontend build needs the backend running, because it pre-renders every page from the API. To build without it, as CI does, set `SKIP_PRERENDER=true`; pages then render on request.

To run in production mode, use `pnpm build`, then `pnpm start` (decision 0014). Press Ctrl+C to stop. Deployment, logs and rollback are in [Production and deployment](#production-and-deployment).

### Tests and offline work

Tests never use Supabase. They need a local PostgreSQL with a database named `waren_test`, set as `TEST_DATABASE_URL` in `backend/.env`. To run one with Docker:

```bash
cp infra/.env.example infra/.env
docker compose --env-file infra/.env -f infra/docker-compose.yml up -d
pnpm test
```

Fill in `POSTGRES_PASSWORD` in `infra/.env` first.

## Folder structure

One repo, two apps (frontend + backend) and a shared package, managed with pnpm.

| Folder | What goes here |
|---|---|
| `frontend/` | Next.js + React + TypeScript + Tailwind: public website and `/admin` screens |
| `backend/` | NestJS (Node.js + TypeScript) API, PostgreSQL via Prisma, media uploads |
| `shared/` | Types and validation schemas used by both apps |
| `infra/` | Docker Compose, Nginx, and the scripts that build, start, deploy and back up |
| `scripts/` | WordPress import and the theme check |
| `docs/` | Two importer inputs only (`seo/url-inventory.csv`, `design/assets/`) |

## Current site at a glance

- **Current platform:** WordPress + Elementor (being replaced)
- **Practice areas (8):** Debt Recovery · Real Estate & Conveyancing · Mining & Energy · Banking & Finance · Litigation & Arbitration · Corporate & Commercial · Employment & Labour · Wealth Management
- **Audience signals:** Kenyan corporates and individuals; strong diaspora focus (succession, trusts, wealth protection)
- **Contact:** info@warenlaw.com · +254 714 350 932 · +254 719 278 594 · WhatsApp chat

## Working agreement

1. Everything starts here — plans, audits, drafts and agent work are committed to this repo.
2. Each change gets a clear commit message.
3. Decisions are recorded so we can see later why something was done. Decisions 0001–0031 are archived in `~/warenlaw-archive/2026-11-12/docs/decisions/`.

## Production and deployment

`pnpm build` prepares the site. It starts the backend for a moment, because the frontend pre-renders from the API, so nothing else may be using port 4000. `pnpm start` runs the built site and builds nothing. `pnpm prod` does both. `pnpm test:e2e` starts and stops the site itself; run `pnpm build` first.

### Deploy to a server

You need a Linux server with Docker Engine and the Compose plugin, ports 80 and 443 open, and git. You also need the Supabase connection strings, and SMTP details if the contact form should send email. Without SMTP, enquiries are stored and no email is sent.

At Hostinger, add one A record for `staging` pointing at the server. Do not change the MX, SPF, DMARC or other mail records.

Install certbot, then, before starting Nginx (port 80 must be free):

```bash
sudo mkdir -p /var/www/acme
sudo certbot certonly --standalone -d staging.warenlaw.com
```

For the live domain, add `-d warenlaw.com -d www.warenlaw.com`. To renew later:

```bash
sudo certbot renew --webroot -w /var/www/acme
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml exec nginx nginx -s reload
```

Copy the env examples and fill them in. They are never committed.

```bash
cp infra/env/deploy.env.example infra/env/deploy.env
cp infra/env/backend.env.example infra/env/backend.env
cp infra/env/frontend.env.example infra/env/frontend.env
```

| Setting | Staging | Live site |
|---|---|---|
| `SITE_URL`, `FRONTEND_URL` | `https://staging.warenlaw.com` | `https://warenlaw.com` |
| `SERVER_NAME` | `staging.warenlaw.com` | `warenlaw.com` |
| `PUBLIC_MEDIA_BASE_URL` | `https://staging.warenlaw.com/uploads` | `https://warenlaw.com/uploads` |
| `SITE_INDEXABLE` | `false` | `true`, at launch only |
| `PREVIEW_UNREVIEWED_PAGES` | `true` | `false` |
| `BASIC_AUTH` | `WAREN staging` | `off` |

Create the staging password file, and set `BASIC_AUTH_FILE=./nginx/htpasswd` in `deploy.env`:

```bash
docker run --rm httpd:2 htpasswd -nbB <user> '<password>' > infra/nginx/htpasswd
```

Check the configuration, then deploy. Copy `backend/uploads/` to the server, or generate it with the import.

```bash
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml --profile tools config --quiet
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml build
infra/scripts/deploy.sh /path/to/uploads
```

A later update is `infra/scripts/deploy.sh`. Changing `SITE_URL`, `SITE_INDEXABLE` or the other `deploy.env` values needs a deploy too, because they are fixed into the frontend build.

To roll back, check out the tag you want and start the stack again. Migrations do not roll back automatically. Before a release with a migration, take a Supabase backup.

```bash
git checkout v1.0.0
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml up -d --build --remove-orphans
```

Logs:

```bash
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml logs -f backend
```

Replace `backend` with `frontend` or `nginx`. Locally, logs go to the terminal running `pnpm start`.

The import is safe to repeat. It only writes records that differ, and rewrites curated pages.

```bash
pnpm import:wp
```

Back up uploads with `infra/scripts/backup-uploads.sh /path/to/backups`.

Before the live launch, the firm goes through [`FIRM-REVIEW.md`](FIRM-REVIEW.md). Terms and the Cookie Policy stay hidden until an advocate sets each to `approved`. On the live environment, `PREVIEW_UNREVIEWED_PAGES` is `false` and `SITE_INDEXABLE` is `true`. Set `SMTP_*` and confirm a test enquiry arrives. Only web DNS records change at Hostinger.
