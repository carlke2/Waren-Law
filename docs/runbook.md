# Runbook: WAREN Law V1

## Run locally in production mode

Prerequisites: Node 26 (`nvm use`), `pnpm install`, and `backend/.env` and `frontend/.env` filled in from their `.env.example` files.

```bash
pnpm build   # once, and again after any code or content-structure change
pnpm start   # runs backend and frontend; builds nothing
```

Open http://localhost:3000. Press Ctrl+C to stop both apps. `pnpm prod` does both steps.

`pnpm build` starts the backend for a moment, because the frontend pre-renders from the API, so nothing else may be using port 4000. If the backend later stops, visitors still get the last built pages.

Tests that need the running site: `pnpm test:e2e` (Playwright, using the installed Chrome). It starts and stops the site itself. Run `pnpm build` first.

## Deploy to a server

### 1. Prerequisites

- A Linux server with Docker Engine and the Compose plugin, ports 80 and 443 open, and `git`.
- The Supabase connection strings.
- SMTP details, if the contact form should send email. Without them, enquiries are stored but no email is sent.

### 2. DNS for a staging subdomain

At Hostinger, add one record. **Don't change the MX, SPF, DMARC or other mail records.**

| Type | Name | Value |
|---|---|---|
| A | `staging` | The server's IPv4 address |

### 3. Certificate

Install certbot on the server, then, before starting Nginx (port 80 must be free):

```bash
sudo mkdir -p /var/www/acme
sudo certbot certonly --standalone -d staging.warenlaw.com
```

For the live domain, add `-d warenlaw.com -d www.warenlaw.com` instead. To renew later:

```bash
sudo certbot renew --webroot -w /var/www/acme
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml exec nginx nginx -s reload
```

### 4. Environment files

```bash
git clone https://github.com/carlke2/Waren-Law.git && cd Waren-Law
cp infra/env/deploy.env.example infra/env/deploy.env
cp infra/env/backend.env.example infra/env/backend.env
cp infra/env/frontend.env.example infra/env/frontend.env
```

Fill them in. These are never committed.

| Setting | Staging | Live site |
|---|---|---|
| `SITE_URL`, `FRONTEND_URL` | `https://staging.warenlaw.com` | `https://warenlaw.com` |
| `SERVER_NAME` | `staging.warenlaw.com` | `warenlaw.com` |
| `PUBLIC_MEDIA_BASE_URL` | `https://staging.warenlaw.com/uploads` | `https://warenlaw.com/uploads` |
| `SITE_INDEXABLE` | `false` | `true`, at launch only |
| `PREVIEW_UNREVIEWED_PAGES` | `true` | **`false`** |
| `BASIC_AUTH` | `WAREN staging` | `off` |

Create the staging password file, and set `BASIC_AUTH_FILE=./nginx/htpasswd` in `deploy.env`:

```bash
docker run --rm httpd:2 htpasswd -nbB <user> '<password>' > infra/nginx/htpasswd
```

### 5. Check the configuration

These have not been run yet, because the machine that built V1 has no Docker. Run them first:

```bash
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml --profile tools config --quiet
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml build
```

After the first deploy, check Nginx with:

```bash
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml exec nginx nginx -t
```

### 6. First deploy

Copy `backend/uploads/` to the server, or generate it with the import in the next section. Then:

```bash
infra/scripts/deploy.sh /path/to/uploads
```

This pulls the code, builds the images, applies migrations, copies the uploads, starts everything and waits until all services are healthy.

Then open the site and check: home page, an article, a redirect such as `/debt-solutions-recovery-asset-tracing/`, and a contact form test. The first visit to each page is slower while it generates.

### 7. Update

```bash
infra/scripts/deploy.sh
```

Changing `SITE_URL`, `SITE_INDEXABLE` or the other `deploy.env` values needs this too, because they are fixed into the frontend build.

### 8. Roll back

```bash
git checkout v1.0.0
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml up -d --build --remove-orphans
```

Use the tag you want to return to. Migrations don't roll back automatically. Before a release with a migration, take a Supabase backup; if the older code can't run on the newer schema, restore that backup.

## Logs

```bash
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml logs -f backend
```

Replace `backend` with `frontend` or `nginx`. Locally, logs go to the terminal running `pnpm start`. A startup warning that email delivery is disabled means `SMTP_*` isn't set.

## Re-run the content import

The import is safe to repeat. It only writes records that differ, and rewrites curated pages, so edits made directly in the database to imported records would be overwritten.

```bash
# Locally, from the repo root
pnpm import:wp

# On the server
docker compose --env-file infra/env/deploy.env -f infra/docker-compose.prod.yml --profile tools \
  run --rm tools pnpm import:wp
```

## Back up uploads

```bash
infra/scripts/backup-uploads.sh /path/to/backups
```

Uploads can also be regenerated by the import while the WordPress site is still online.

## Before the live launch (T034)

- [ ] The firm has gone through [`docs/content/firm-review-list.md`](content/firm-review-list.md) (decision 0020).
- [ ] The firm's advocate approves **Terms** and the **Cookie Policy**, and each is set to `approved`. Until then both are hidden on the live site, and the cookie banner's policy link would lead to a 404 (decision 0012).
- [ ] `PREVIEW_UNREVIEWED_PAGES=false` and `SITE_INDEXABLE=true` in the live environment.
- [ ] The domain is renewed. It expires on 29 November 2026.
- [ ] Download Supabase's CA certificate and set `DATABASE_SSL=verify` with `DATABASE_SSL_CA_PATH`.
- [ ] Set `SMTP_*`, and confirm a test enquiry reaches the firm.
- [ ] Only web DNS records change at Hostinger. MX, SPF, DMARC and verification records stay as they are.
- [ ] Re-run the import against the final WordPress content.
