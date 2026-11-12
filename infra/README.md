# infra

Deployment configuration: Docker, Nginx and HTTPS. How to run it is in the root README, under Production and deployment.

| Path | What it is |
|---|---|
| `docker-compose.yml` | Optional local PostgreSQL for tests |
| `docker-compose.prod.yml` | Frontend, backend and Nginx. The database is Supabase, so it has no database service |
| `env/*.env.example` | Examples of the server's env files. Real values are never committed |
| `nginx/` | Reverse proxy, caching, security headers, optional password for staging |
| `scripts/` | Build, start, deploy and backup |
