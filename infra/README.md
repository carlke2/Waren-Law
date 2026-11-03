# infra

Deployment configuration: Docker, Nginx and HTTPS. See `docs/runbook.md`.

| Path | What it is |
|---|---|
| `docker-compose.yml` | Optional local PostgreSQL for tests |
| `docker-compose.prod.yml` | Frontend, backend and Nginx. The database is Supabase, so it has no database service |
| `env/*.env.example` | Examples of the server's env files. Real values are never committed |
| `nginx/` | Reverse proxy, caching, security headers, optional password for staging |
| `scripts/` | `deploy.sh` and `backup-uploads.sh` |
