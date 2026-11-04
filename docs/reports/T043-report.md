## Report: T043 — Finish Home
Status: Done
Branch / PR: task/T043-home-finish
Summary: Fixed the query shape, so practice-area and insight endpoints no longer time out and `pnpm build` passes with the default 15 s limit. Home now follows the design at 768 and 390. The "every public endpoint under 1 s" target is only partly met.
Done when:
- Decision 0020 applied ✅ (already merged)
- Database speed ❌ partly: see the table. Medians improved, but spikes above 1 s remain on most detail endpoints, and one call in this run hit the 15 s limit.
- `pnpm build` passes without raised timeouts ✅
- At least 95% match ❌ partly: 768, 1280 and 1440 pass; 390 was 93.6% before the CTA button fix. See `pnpm test:match`.
Files changed: backend query files, Home components, site footer, match test, snapshots.
Dependencies added: none
Decisions made: 0022
Questions / blockers: The spec's phone table and the design differ on footer order, centred bottom bar and full-width CTA buttons. The spec says the design wins, so the build now follows the design.
Suggested next step: T044, About.

## Remaining 390 differences
The newsletter privacy line (decision 0020) makes the footer taller, and a real article title wraps to more lines in Insights.

## Timings
Three rounds per endpoint against Supabase, from this machine, production backend.

| Endpoint | Before: median / worst | After: median / worst |
|---|---|---|
| `home` | 1.35 s / 1.42 s | 0.23 s / 0.42 s |
| `settings` | 0.38 s / 0.39 s | 0.20 s / 0.21 s |
| `offices` | 0.19 s / 0.20 s | 0.20 s / 0.20 s |
| `partners` | 1.21 s / 1.51 s | 0.63 s / 2.47 s |
| `awards` | 0.41 s / 0.79 s | 0.27 s / 1.07 s |
| `client-logos` | 0.42 s / 0.80 s | 0.21 s / 0.22 s |
| `categories` | 0.80 s / 2.56 s | 0.21 s / 0.80 s |
| `resolve` | 0.19 s / 1.75 s | 2.08 s / 2.30 s |
| `redirects/all` | 0.20 s / 0.29 s | 0.27 s / 0.43 s |
| `practice-areas` | 2.59 s / 5.10 s | 0.21 s / 0.39 s |
| `team` | 3.75 s / 4.75 s | 0.40 s / 1.19 s |
| `insights?pageSize=12` | 15.01 s / 15.02 s (500) | 1.22 s / 1.28 s |
| `webinars` | 2.39 s / 2.69 s | 0.20 s / 0.38 s |
| `pages/about-us` | 0.59 s / 0.81 s | 0.20 s / 0.23 s |
| `pages/our-partners` | 0.40 s / 0.81 s | 0.19 s / 0.20 s |
| `pages/contact-us` | 0.39 s / 0.79 s | 0.20 s / 2.19 s |
| `pages/privacy-policy` | 0.40 s / 0.44 s | 0.21 s / 0.21 s |
| `search?q=land` | 1.49 s / 1.75 s | 0.56 s / 0.77 s |
| `practice-areas/corporate-debt-recovery` | 9.29 s / 10.57 s | 1.23 s / 1.85 s |
| `practice-areas/corporate-commercial-practice` | 13.27 s / 18.57 s | 2.12 s / 2.40 s |
| `practice-areas/real-estate-conveyancing-land-law` | 14.43 s / 15.12 s | 1.63 s / 15.02 s (500) |
| `practice-areas/wealth-management-investments` | 15.79 s / 18.48 s (500) | 0.83 s / 2.54 s |
| `practice-areas/litigation-dispute-resolution-international-arbitration` | 5.25 s / 8.93 s | 0.62 s / 0.77 s |
| `practice-areas/banking-finance-law` | 6.65 s / 13.26 s | 0.63 s / 2.07 s |
| `practice-areas/mining-energy-law` | 10.01 s / 11.75 s | 0.76 s / 1.46 s |
| `practice-areas/employment-labour-law` | 2.80 s / 5.81 s | 0.43 s / 0.59 s |
| `insights/cross-border-succession-planning-kenya-uk-us` | 12.60 s / 18.00 s (500) | 0.97 s / 2.04 s |
| `insights/conveyancing-lawyer-in-kenya-buying-property-safely` | 9.89 s / 11.45 s | 2.45 s / 2.62 s |
| `insights/warenlaw-com-land-registry-kenya-speed-corruption` | 8.45 s / 11.59 s | 0.67 s / 1.20 s |
| `webinars/trusts-taxes-protecting-wealth-across-borders` | 1.99 s / 4.47 s | 1.31 s / 1.55 s |
| `webinars/wealth-protection-plan-for-kenyans-abroad-webinar` | 2.76 s / 6.18 s | 0.91 s / 3.78 s |
| `webinars/wealth-built-abroad-protected-in-kenya-webinar` | 4.48 s / 4.81 s | 0.89 s / 1.55 s |
| `team/janice-wachuka` | 10.11 s / 15.71 s | 1.31 s / 3.06 s |
| `team/ephraim-ndegwa` | 1.11 s / 5.22 s | 0.66 s / 1.82 s |
| `team/martin-wachira` | 1.20 s / 2.47 s | 0.64 s / 2.37 s |

Endpoints with a median under 1 s: before 11 of 35, after 27 of 35. Every call under 1 s: before 9, after 14.
