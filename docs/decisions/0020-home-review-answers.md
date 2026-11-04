# 0020: Answers to the brief 06 review

**Date:** 4 November 2026
**Status:** Accepted (planner's review of brief 06)

## Decision
1. **Home is not legal content.** Its record is `approved` and `GET /api/v1/home` no longer checks `legalReviewStatus`, so `/` is published in production. This replaces point 2 of decision 0018. The gate is for practice pages, insights, webinars and legal pages. The firm's review of the wording is tracked in [`docs/content/firm-review-list.md`](../content/firm-review-list.md) and doesn't block the page.
2. **Phylis Njane's portrait alt text** is "Phylis Njane, Partner". The import now sets it from `portraitAlt` in the curation file, because it otherwise keeps whatever alt text is already stored.
3. **Newsletter form** has one line under the field: "We’ll only use your email to send our insights." and a Privacy Policy link. The wording is in the dictionary.
4. **Form state tokens:** `--color-success` #1F6B45 and `--color-error` #B42318 on light; `--color-success-on-brand` #7FD3A6 and `--color-error-on-brand` #FF9C8F on navy. The footer form uses the on-brand pair.
5. **Hero card links**, stored in the database through the import: For Businesses → `/corporate-commercial-practice/`, For Property & Families → `/real-estate-conveyancing-land-law/`, For Kenyans Abroad → `/wealth-management-investments/`.
6. **Heading font:** Newsreader is now a committed file, loaded with `next/font/local`. It is cut from the Google Fonts Latin subset to weights 400–600 and optical sizes 16–72, which is everything the headings use (smallest heading 17 px). The file drops from 132 KB to 85 KB. `next/font/google` can't do this: it only accepts the full variable font when an extra axis is kept, and Google Fonts returns the same file for a narrower weight range.
7. **LCP limit:** up to 3.0 s is accepted for now.

## Why
- Removing the optical-size axis would have changed the approved heading look. Limiting its range doesn't change headings at the sizes in use: a pixel comparison at 375 and 1440 shows only faint anti-aliasing differences.

## Consequences
- **The LCP limit is not met.** See the measurements below. The font saves 47 KB for visitors but doesn't move LCP, because the LCP element in Lighthouse's mobile run is the hero image (17 KB) and the delay is main-thread work, not that download.
- About, Our Partners and Contact still pass through the shared page gate. It has no effect today because all three are `approved`, so the code wasn't changed. The planner may want it limited to the legal template when the admin panel can change these statuses.
- `HomeContent.legalReviewStatus` stays in the table but no longer affects anything.
- To regenerate the font, use `fonttools` (a one-off tool, not a project dependency) on the Latin file from Google Fonts: `instancer` with `wght=400:600 opsz=16:72`, saved as WOFF2. Newsreader's licence is next to the file in `frontend/src/styles/fonts/`.

## LCP measurements
Lighthouse 13.6 mobile, same machine, same morning. Performance, LCP and total blocking time.

| Build | Performance | LCP | Blocking time |
|---|---|---|---|
| Old font, with the other changes in this decision (5 runs) | 84–88 | 3.3–3.4 s | 220–340 ms |
| New font (5 runs) | 81–86 | 3.2–3.4 s | 290–410 ms |
| New font, normal `noindex` build, after Playwright (5 runs) | 80–87 | 3.2–3.3 s | 280–480 ms |
| Brief 06 report, for comparison (2 warm runs) | 93 | 3.0 s | 120–140 ms |

Accessibility and best practices scored 100 in every run, and CLS was 0. SEO scored 100 on the indexable builds and 69 on the `noindex` build, as intended. The machine was busier than during brief 06 (lower Lighthouse benchmark, higher blocking time), so the 3.0 s result wasn't reproduced even with the old font. LCP moves with blocking time on this machine, so a measurement on a quieter machine or the staging server is needed before treating either figure as final.
