# Report: missing pages

Status: Done
Branch / PR: none (no page was missing, so no branch was opened)

## Summary

Every URL in `docs/seo/url-inventory.csv` was requested on a production build. 64 return the page. 37 return the 301 the inventory already called for. None 404. No new page was added.

## Pages found missing

**0.** The full check is in `docs/coverage/missing-pages.md`.

## Pages built

None this pass. Old URL and new URL are the same wherever the inventory said to keep the path. Moved URLs already redirect.

## Content differences still remaining

- Home does not repeat the old Elementor heading and section copy. Home was left unchanged.
- The practice index uses the locked service cards. The old marketing introduction is not on that index. Each practice page still has its WordPress text.
- The team index does not repeat the short paragraph that used to sit under each name. The biography is on the profile.
- Button labels are ours.

## Items not rebuilt on purpose

For the firm to decide. They are redirects today, not pages.

- `/how-medical-law-protects-healthcare-providers-and-patients/` → `/category/regulatory-services/`
- `/recovering-assets-legal-strategies-for-success-2/` → `/corporate-debt-recovery/`
- `/the-importance-of-legal-expertise-in-financial-disputes/` → `/banking-finance-law/`
- `/the-role-of-corporate-lawyers-in-navigating-complex-business-regulations/` → `/corporate-commercial-practice/`
- Placeholder “[Client Name]” testimonials
- Unverified debt-page claims (“500+ Clients”, “15 Years Legal Excellence”, “Same-Day Legal Response”)
- Client logos, until permission is confirmed

## Screenshots

No new page was built, so `docs/reports/missing-pages/` has no screenshots.

## How to view

From the repo root, with ports 3000 and 4000 free:

```bash
pnpm build && pnpm start
```

The site is then at http://localhost:3000. This check used http://localhost:3100 because port 3000 was already taken. Those processes have been stopped.
