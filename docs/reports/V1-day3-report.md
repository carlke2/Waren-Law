## Report: V1 Day 3 — Forms, SEO, release (T011a, T021, T030a, T031a, T032a)
Status: Done. Docker and Nginx files are complete but have not been run.

Branches / PRs / tag: `task/T011a-contact-form`, `task/T021-seo-redirects`, `task/T030a-production-containers`, `task/T031a-release-runbook`, `task/T032a-qa-release`, fast-forwarded to `main` because `gh` isn't installed. Tag: `v1.0.0`.

Summary: The contact form works end to end, SEO and redirects are complete, V1 runs in production mode with one command, and it is tagged. Final QA on a clean build with Supabase content passed. Docker, Compose and Nginx have not been executed. No email has been sent, because SMTP isn't set.

URL check: 101 passed, 0 failed (`docs/reports/v1-url-check.md`).

Lighthouse (mobile, performance / accessibility / best practices / SEO): home 89–91 / 100 / 100 / 69; practice 95 / 100 / 100 / 69; article 97 / 100 / 100 / 69; team 94 / 100 / 100 / 69; contact 91 / 100 / 100 / 69. SEO is 69 because V1 sets `noindex` on purpose; with indexing on, all five scored 100.

How to run V1 in production mode: `pnpm prod`, then http://localhost:3000.

Full details: `docs/releases/v1.md`, `docs/runbook.md`.
