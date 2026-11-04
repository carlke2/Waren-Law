## Report: Frontend reset + Home (T035–T039)
Status: Done. Stopped here for owner and planner review.

State before starting: Brief 05 had run. T011a, T021, T030a, T031a and T032a were on `main`, tagged `v1.0.0`. All its backend work is kept. The old frontend was still in place, and no servers were running on ports 3000 or 4000.

Deleted vs kept:
- **Deleted:** `frontend/src/components/**`, `frontend/src/styles/**`, every layout and template in `frontend/src/app/(site)/**`, `/_design`, and 7 tests for deleted components. There were no `loading.tsx` files.
- **Kept in `frontend/src/lib/`:** API client, loaders, slug resolver, consent state and tag loading, dictionary, SEO helpers, redirects, env handling, plus the test setup.
- **Proof, at the end of T035:** both folders were gone, and `grep -rnE "@/components|@/styles|text-on-dark|bg-navy|gold-500" frontend/src frontend/tests` found nothing. The T037 and T038 code was then written new.

Spec deviations:
1. **Hero image:** the skyline illustration from the locked canvas, because no Nairobi photo was supplied. The canvas's "Nairobi skyline (illustration)" label is a design note and is left out.
2. **Where spec and design differ, the design is followed (spec's own rule):** hero overlay 86/55/10 %, not section 1's 92/72/30 %; nav weight 500, not 600; H2 `clamp(34px, 3.6vw, 52px)`; card text 14–15 px despite the 16 px body-text rule.
3. **Hero height:** 636 px at 1366, 647 at 1440 and 671 at 1920, against "≈ 560–640". On phones it is 488 px against "≈ 420–460". These follow the design's own measurements. The full cards still fit the first screen at 1366 × 768 and 1920 × 1080.
4. **Grids:** at 1024 px and up, practice, team and footer grids use the 4 columns in spec section 7. The design's auto-fit alone gives 3 columns at 1024.
5. **Insight labels and titles come from the API:** the labels read "Conveyancing and Commercial Services", where the design shows "Conveyancing" and "Land Registry". The first title reads "the UK, and the US".
6. **Choices the spec doesn't cover:** the WhatsApp button uses gold, because the spec has no green. "Book a consultation" goes to the Contact holding page until the native form exists. The consent panel is 480 px wide, so it clears the hero cards at 1366 × 768.
7. **Added beyond the brief, so Home could match the design or the ground rules:** `cardTitle` and `shortName` on practice areas; new practice-area and partner order; three partner role titles; a holding-style 404 page; `SiteLink` with no prefetch.

Images used and sources: full list in `docs/design/image-sources.md`.
- **Hero:** our illustration. **Gap:** a licensed Nairobi photo, at least 2400 × 1350.
- **Partner portraits (4) and insight images (3):** from the firm's current site; the firm should confirm rights.
- **Gaps:** the first insight image is only 624 × 351. Its file name doesn't show its origin, and the third insight's file name suggests an AI-generated image.

Screenshots: `docs/reports/home-v3/` (all widths, first screens, first visit with consent panel, mobile menu, side-by-sides at 1440 and 390, theme check).

Lighthouse mobile: performance 93 / accessibility 100 / best practices 100 / SEO 100 / LCP 3.0 s / CLS 0. These are warm runs on a temporary `SITE_INDEXABLE=true` build; the first run after a build, with a cold cache, scored 86. The spec's targets are met. **LCP misses the 2.5 s target in `docs/DIRECTION.md`.** The largest remaining file is the 132 KB Newsreader font; not preloading it made results worse (87–90, LCP 3.3–3.4 s).

Tests: unit and API 186 (frontend 74, backend 94, import 18), plus 16 read-only checks against the imported content. Playwright 39, including visual snapshots at 375 and 1440. Lint, theme check and typecheck pass. Playwright is not in CI, because it needs the running site and its database.

How to run:
```bash
pnpm build
pnpm start    # http://localhost:3000, Ctrl+C to stop
pnpm test:e2e # after pnpm build; starts and stops the site itself
```

Changes outside the repo:
- **Supabase:** migration `20261104120000_add_home_content_and_newsletter` applied, and the import re-run. This added the Home record, updated practice areas and 3 team members, updated Settings, and removed the `homeHero` setting. A second run changed nothing.
- **`backend/uploads/`:** added `home-hero-skyline-illustration.webp`, which needs copying to any other environment or regenerating with the import.
- **`.env` files:** none changed. `NEWSLETTER_RATE_LIMIT_PER_HOUR` is new and optional (default 5).
- **Live warenlaw.com:** not changed.
- **Pushed:** `main` and the task branches.

Dependencies added: `@playwright/test` (dev), for the brief's browser tests.

Hard-coded values that could not be avoided:
- The "WAREN" and "LAW ADVOCATES LLP" logo words are in the dictionary, as they are logo artwork rather than editable firm content.
- Icon and logo drawing data is in components.
- The hero illustration's colours are in its SVG, so it won't follow a theme change. Theme tokens do not apply inside an image.

Questions / blockers (none blocks review):
1. **Launch gate:** the Home record is `needs_advocate_review`, so `/` answers 404 in production until the firm approves it (decision 0018; added to the runbook's launch list). Local and staging show it through `PREVIEW_UNREVIEWED_PAGES=true`. Is this gate what you want for Home?
2. **Firm to review:** the new Home copy, the 8 one-line practice summaries, and the role titles for Ephraim Ndegwa, Martin Wachira and Phylis Njane. The titles also appear on profiles. The first three partners' portrait alt text still has the old titles, and Phylis Njane's still says "Partner Ruiru Branch", although the Ruiru branch is unconfirmed.
3. **Form states:** the spec lists `--color-success` and `--color-error` with no values. They currently point at white and gold, so no new colour is introduced. What values should they have?
4. **Newsletter privacy notice:** `docs/DIRECTION.md` asks for a notice on every form, but the locked design shows none, so none is shown. Should one be added?
5. **Newsletter confirmation:** with SMTP on, the emailed link confirms the address and lands on Home with no message, because no page exists for it yet. Is that acceptable for now?
6. **Hero card links:** all three use the spec's default `/area-of-expertise/`. Please confirm the targets with the firm.
7. **LCP:** accept 3.0 s for now, or should the heading font change? Removing the optical-size axis would shrink the file but alter the heading look the owner approved.
8. **Repo housekeeping:** `docs/PLAN.md`, decision 0017 and task T041 are the planner's and weren't in the brief's commit list, so they remain uncommitted. Decision number 0013 is used twice (`0013-frontend-redesign.md`, `0013-same-domain-api.md`).
