# 0018: Home content model, review gate and hero image

**Date:** 4 November 2026
**Status:** Accepted; points 2 and the launch-gate consequence replaced by decision 0020

## Decision
1. Home content is a new `HomeContent` table, one row linked to the `home` Page. That Page still provides the title, publishing status and SEO fields.
2. `HomeContent` starts as `needs_advocate_review`, and the import never changes that status. `GET /api/v1/home` follows the same gate as other new wording (decision 0011): 404 in production until approved, visible when `PREVIEW_UNREVIEWED_PAGES=true`. No notice appears on Home, because the locked design has none.
3. PracticeArea also gets `cardTitle` and `shortName`, beyond the brief's `icon` and `cardSummary`. The design uses shorter names on cards and in the footer than the full `name`, which stays for practice pages and SEO.
4. Primary and secondary phone are `contact.phones[0]` and `[1]`, not new fields, so each number is stored once. `addressLine` joins `contact`, `description` joins `firm`, and `newsletter.intro` is a new setting. The `homeHero` setting is removed because the hero now lives on `HomeContent`.
5. No Nairobi photo was supplied, so the hero uses the skyline illustration from the locked canvas, rendered to WebP. The import uses `docs/design/assets/hero-nairobi.jpg` instead as soon as that file exists.
6. To match the design, the import now orders practice areas and partners as the design does, and sets three partner role titles to the design's wording.

## Why
- Separate columns give the admin panel a clear record to edit, rather than a free-form block document.
- Recording an approval that hasn't happened would remove the launch gate without anyone noticing (decision 0011).
- The brief prefers the best wide image available. The other wide images show the team, whereas the owner approved the design with this skyline.

## Consequences
- **Before launch:** the firm's advocate must approve `HomeContent`, or `/` answers 404 in production. Add this to T034.
- The new one-line practice summaries sit on practice areas already marked `approved`, so that gate doesn't cover them. The firm should review them along with `HomeContent`.
- The firm should confirm the three role titles. They also appear on profile pages.
