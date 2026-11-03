# 0002: Content management — custom-built admin

**Date:** 3 November 2026
**Status:** Partly replaced by 0003 — the single administrator account stands; git-backed storage and free hosting are replaced by PostgreSQL and the company server

## Decision
We build our **own admin panel** inside the Next.js site.
- **One account only:** a single administrator, used for maintenance and content updates. No staff accounts, no roles.
- **Git-backed storage:** saving in the admin commits the change (content and images) to this GitHub repository through the GitHub API. The site then rebuilds and redeploys automatically.
- **No paid database or media server.** Running cost stays at zero beyond the domain.

## Why
- Payload/Sanity need a database, media storage or paid tiers that were not in the project costing.
- With one administrator, the hard parts of a CMS (user management, roles, approval workflows) disappear.
- Keeping content in the repo fits "everything begins at the repository": full history, easy rollback, and the Claude agent can read and maintain all content.
- Timelines can be adjusted to fit the extra build work.

## Admin scope
| Area | What the administrator can do |
|---|---|
| Login | Password + two-factor code (TOTP); signed session cookie; lockout after failed attempts |
| Pages | Edit Home, About (incl. preview video), Partners, Contact text |
| Practice areas | Create / edit / reorder the practice areas |
| Team | Add / edit / remove members: photo, role, bio, practice areas, admissions, LinkedIn, order |
| Insights | Write, edit, save as draft, preview, publish, unpublish articles; webinars |
| Client logos | Add / remove / reorder, with alt text |
| Media | Upload images (resized and compressed on upload, alt text required) |
| Site settings | Phones, email, offices, WhatsApp, social links, About video URL, SEO defaults |
| History | List of recent changes; restore a previous version (from git history) |

## Security rules
- Admin lives at a non-obvious path, is excluded from search engines, and every admin route checks the session server-side.
- Credentials and the GitHub token are stored only as hosting secrets, never in the repo.
- The GitHub token is limited to this one repository.
- Legal content keeps the `NEEDS ADVOCATE REVIEW` rule before publishing.

## Consequences
- Published changes go live after a short rebuild (about 1–2 minutes).
- The site needs server functions for the admin (Next.js on Cloudflare, free plan — limits to be confirmed at setup).
- The admin is roughly 8–10 working days of build; the timeline is adjusted accordingly.
- Content types are finalised from the T001 audit.
