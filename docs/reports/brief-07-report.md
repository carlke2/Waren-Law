## Report: Brief 07 — Complete site build
Time used: 1:54 of 2:45

Done (merged):
- T042 cleanup
- T043 Home: decision 0020 confirmed, query fixes, 768 and 390 layout fixes (targets partly met, see below)
- T044 `/about-us/`, `/our-partners/`
- T045 `/area-of-expertise/` and 8 practice pages at their current URLs
- T046 `/our-team/`, `/our-team/?practiceArea=…`, `/our-team/<slug>/`, old `/ephraim-ndegwa/` as one 301
- T041 source tracking and leads API (one item not done, see below)
- T047 `/contact-us/`, `/book-a-consultation/`, recording request form
- T048 `/insights/` and pages, `/category/<slug>/` and pages, articles, `/insights/webinars/`, webinar pages
- T049 `/search/`, 404, `/privacy-policy/`, `/terms/`, `/cookie-policy/`
- T050 redirects, sitemap, robots

Not done or not fully met:
- **Every public endpoint under 1 s: not met.** 28 of 35 have a median under 1 s, and 16 of 35 stayed under 1 s on all three calls. Failed calls went from 7 to 0.
- **Home at least 95% at 390: not met.** 92.9% whole page. 768, 1280 and 1440 pass (96.3, 95.5, 96.3). The footer is below 95% at every width, because of the two additions the design doesn't have: the newsletter privacy line (decision 0020) and "How did you hear about us?" (PAGE-MAP). At 390, a real article title also wraps to more lines.
- **Newsletter links tagged automatically (T041): not built.** Newsletter sending is out of scope, so no links exist to tag. `source=newsletter` already maps to the Newsletter channel.

Process note: T041 was merged and pushed with one backend test failing, because my command didn't stop on the failure. Only the test fixture was out of date, not product code. It was fixed and re-merged about 40 seconds later with all 111 backend tests passing, and the later merges stopped on failures.

Reverted: none.

Cleanup:
- Docs: `docs/design/archive-DESIGN-SPEC-v1-corporate.md`, `docs/design/archive-DESIGN-SPEC-v2-teal.md`, `docs/design/reference/archive-teal-reference.png`, four `*.dc.html` files, `docs/reports/v1-day2-screens/` (20 files).
- Code: `parseHomeContent`, holding page, route and helper, `featuredWebinar`, `getClientLogos`, `getAllInsightSummaries`, unused dictionary keys, `text-h1-holding`.
- Generated: `frontend/.next/dev/` (stale `pnpm dev` output that broke the type check; `next dev` recreates it).

Database speed: three calls per endpoint against Supabase from this machine; a round trip takes about 190 ms. `pnpm build` passes with the default 15 s limit, but it relies on build retries: single queries can still time out, and the retries absorbed them. Causes and fixes are in decision 0022.

| Endpoint | Before: median / worst | After: median / worst |
|---|---|---|
| `home` | 1.35 s / 1.42 s | 0.19 s / 0.60 s |
| `settings` | 0.38 s / 0.39 s | 0.63 s / 0.98 s |
| `offices` | 0.19 s / 0.20 s | 0.23 s / 0.79 s |
| `partners` | 1.21 s / 1.51 s | 0.80 s / 1.25 s |
| `awards` | 0.41 s / 0.79 s | 0.61 s / 0.62 s |
| `client-logos` | 0.42 s / 0.80 s | 0.19 s / 0.25 s |
| `categories` | 0.80 s / 2.56 s | 0.20 s / 0.89 s |
| `resolve` | 0.19 s / 1.75 s | 1.01 s / 1.04 s |
| `redirects/all` | 0.20 s / 0.29 s | 0.38 s / 1.01 s |
| `practice-areas` | 2.59 s / 5.10 s | 0.68 s / 1.42 s |
| `team` | 3.75 s / 4.75 s | 1.81 s / 2.02 s |
| `insights?pageSize=12` | 15.01 s / 15.02 s (500) | 0.99 s / 2.23 s |
| `webinars` | 2.39 s / 2.69 s | 0.19 s / 1.02 s |
| `pages/about-us` | 0.59 s / 0.81 s | 0.19 s / 0.19 s |
| `pages/our-partners` | 0.40 s / 0.81 s | 0.19 s / 0.19 s |
| `pages/contact-us` | 0.39 s / 0.79 s | 0.22 s / 0.25 s |
| `pages/privacy-policy` | 0.40 s / 0.44 s | 0.19 s / 0.20 s |
| `search?q=land` | 1.49 s / 1.75 s | 0.53 s / 0.59 s |
| `practice-areas/corporate-debt-recovery` | 9.29 s / 10.57 s | 0.89 s / 2.43 s |
| `practice-areas/corporate-commercial-practice` | 13.27 s / 18.57 s | 0.98 s / 1.27 s |
| `practice-areas/real-estate-conveyancing-land-law` | 14.43 s / 15.12 s | 0.87 s / 1.72 s |
| `practice-areas/wealth-management-investments` | 15.79 s / 18.48 s (500) | 0.78 s / 1.68 s |
| `practice-areas/litigation-dispute-resolution-international-arbitration` | 5.25 s / 8.93 s | 1.01 s / 1.21 s |
| `practice-areas/banking-finance-law` | 6.65 s / 13.26 s | 0.22 s / 0.87 s |
| `practice-areas/mining-energy-law` | 10.01 s / 11.75 s | 0.65 s / 1.10 s |
| `practice-areas/employment-labour-law` | 2.80 s / 5.81 s | 0.59 s / 2.01 s |
| `insights/cross-border-succession-planning-kenya-uk-us` | 12.60 s / 18.00 s (500) | 1.20 s / 2.01 s |
| `insights/conveyancing-lawyer-in-kenya-buying-property-safely` | 9.89 s / 11.45 s | 1.17 s / 1.40 s |
| `insights/warenlaw-com-land-registry-kenya-speed-corruption` | 8.45 s / 11.59 s | 1.23 s / 1.40 s |
| `webinars/trusts-taxes-protecting-wealth-across-borders` | 1.99 s / 4.47 s | 0.61 s / 0.63 s |
| `webinars/wealth-protection-plan-for-kenyans-abroad-webinar` | 2.76 s / 6.18 s | 0.61 s / 0.78 s |
| `webinars/wealth-built-abroad-protected-in-kenya-webinar` | 4.48 s / 4.81 s | 1.42 s / 1.99 s |
| `team/janice-wachuka` | 10.11 s / 15.71 s | 0.99 s / 1.60 s |
| `team/ephraim-ndegwa` | 1.11 s / 5.22 s | 0.40 s / 0.71 s |
| `team/martin-wachira` | 1.20 s / 2.47 s | 0.19 s / 0.19 s |

Endpoints with a median under 1 s: before 11 of 35, after 28 of 35. Every call under 1 s: before 9, after 16. Failed calls (500): before 7, after 0.

Match (Home, About), % with photos and real text excluded:

| Page | 390 | 768 | 1280 | 1440 |
|---|---|---|---|---|
| Home, whole page | 92.9 | 96.3 | 95.5 | 96.3 |
| About, whole page | 53.6 | 59.6 | 52.3 | 54.1 |

- About's whole-page score is low because the firm's real story is about 300 px longer than the reference, which pushes every later section out of line. By section at 768 and up, film, why, recognition, leadership, partners and CTA are 99–100%.
- About's story (62–73%) and mission and vision (64–83%) are low because of that longer real text, and the footer (82–90%) for the two additions above.
- `about-us.html` has no phone rules, so at 390 the build follows spec §7 and differs by design.
- Diffs: `docs/reports/home-v3/match/` and `docs/reports/complete-build/match-about/`.

URL check: passed, 101 of 101 (`docs/reports/T050-url-check.md`). Sitemap with indexing on: 73 URLs, all 200.

Lighthouse mobile (perf/a11y/bp/seo), run on the build before the final About polish:
- Home: 86/100/100/69 (LCP 3.3 s)
- Practice page: 90/100/100/69 (LCP 3.2 s)
- Article: 91/100/100/69 (LCP 3.1 s)

SEO 69 is expected: `SITE_INDEXABLE=false` adds `noindex` to every page. LCP is above the 3.0 s accepted in decision 0020. CLS is 0 on all three.

Tests on the final build: lint and theme check pass, types pass, 199 unit and API tests, 90 browser tests. No requests to Google or Meta before consent (`consent.spec.ts`). Every header and footer link returns 200. All servers stopped.

New things built from existing parts (for morning review):
- Page hero, and profile hero (page hero with portrait and contact buttons)
- Filter chips, pagination
- Article body styles (`prose-body`), including tables and quotes
- FAQ accordion (native `details`)
- Form fields, office cards, "What happens next" steps
- Featured insight, webinar card, newsletter band, help band on the practice index
- New tokens: `text-h1-page`, `text-lead`, `text-h2-compact`, `text-statement`, `text-h3-row`, `tracking-chip`, `on-brand-lead`, `overlay-film`, narrow, film, teaser, reading and profile containers, film, photo and certificate ratios. All but the reading and profile containers come from the About and Partners references; those two were needed for article text and profile portraits.
- `/our-team/area/<slug>/`: pre-rendered filter pages behind the shareable link.

Content gaps shown on the site:
- Partner firm logos and a Beijing joint office photo: hidden.
- About film: poster with "coming soon".
- Experience, education and admissions are empty for the profiles checked: hidden.
- FAQs on practice pages: none structured, so hidden (imported questions sit in the page body). Consultation FAQs: none supplied, so hidden.
- Banking & Finance has no advocates or insights linked. Regulatory Services has no insights.
- Most articles have no linked author, so no author box. Two articles have no featured image and show an empty panel.
- Terms and Cookie Policy are unapproved: they show with NEEDS ADVOCATE REVIEW only while `PREVIEW_UNREVIEWED_PAGES=true`.

Questions for the owner:
1. The footer's "How did you hear about us?" field lowers the design match. Keep it in the footer (PAGE-MAP), or only on the Insights band?
2. Spec §7 and the design disagree on the phone footer order, centred bottom bar and full-width CTA buttons. The spec says the design wins, so the build follows the design. Is that right?
3. Who approves Terms and Cookie Policy? Until then, in production the footer hides those links, but the cookie panel still links to `/cookie-policy/`, which would be a 404.
4. Should search be linked from the header or footer? The locked design has no search item, so it is reachable only from the 404 page and by URL.
5. Who reviews the new wording? It is listed in `docs/content/firm-review-list.md`.
6. Where will the production server be? Speed depends on its distance from Supabase, so re-measure there before treating these timings as final.

To set in `backend/.env` when wanted (no `.env` file was changed):
- `LEADS_API_KEY`: the leads API refuses every request until this is set.
- `SMTP_*`: enquiries are stored either way, but emailed only with these.
- `DATABASE_POOL_MIN`: optional, defaults to 4.

Database changes made in Supabase: migration `20261104200000_add_lead_attribution`, and the import was re-run to seed the new `pageCopy` setting.

How to run: pnpm build && pnpm start
