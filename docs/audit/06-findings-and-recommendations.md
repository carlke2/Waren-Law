# 06: Findings and recommendations

**Date:** 3 November 2026
**Sources:** audit files 01–05 and `docs/seo/url-inventory.csv`.
**Could not check:** see the coverage check at the end.

These are recommendations for the planner and owner. Nothing here is decided, and legal items need the firm's review.

## Prioritised issues

### High

| # | Issue | One-line fix |
|---|---|---|
| 1 | **Domain expires 29 Nov 2026** | Firm confirms renewal and auto-renew now, before any project work |
| 2 | **Placeholder testimonials** (`[Client Name]`) live on the debt page | Firm removes or replaces them now on the current site |
| 3 | Unverified result claims ("98% Recovery Rate" and others) | Firm evidences or removes them; don't migrate without approval |
| 4 | `/about-us/` canonical points to the corporate practice page | Fix now in Rank Math; self-canonical in the rebuild |
| 5 | Blank grey mobile hero; 7.6 s home LCP on a cold load | Static, compressed hero image with no video on phones |
| 6 | Tracking runs with no consent step; privacy policy unlinked; no notice on forms | Firm decides approach; add consent, notices and footer links |
| 7 | Wrong phone link and wrong displayed email on key pages; malformed WhatsApp links | Fix now; in the rebuild, one validated contact source in Settings |
| 8 | Two competing debt pages | Merge into one with a 301 |
| 9 | 13 pages have no H1; all posts have multiple H1s | One H1 per template, enforced in components |
| 10 | SPF doesn't cover Google or Microsoft mail in use | Mail administrator reviews before launch |
| 11 | Past webinar still says "Register today", and the Zoom link appears dead | Webinar state: upcoming, recording or past |

### Medium

| # | Issue | One-line fix |
|---|---|---|
| 12 | White-on-gold buttons at 2.1:1 | Navy text on gold, or a darker gold, as design tokens |
| 13 | 190 of 276 library images have no alt text; WhatsApp and ChatGPT file names | Required alt text, renamed files on migration |
| 14 | Team page: 3 of 20 profiles, inconsistent titles, no filter | Profile template, title review, filter by practice area |
| 15 | Practice pages thin and repetitive, with no people or articles | Rewrite with structured content and relations |
| 16 | Security headers missing; versions and user list exposed | Nginx headers; no WordPress surface in the new stack |
| 17 | Heavy pages: 79–110 requests; 15.8 MB video; 2.9 MB of team images | Next.js image pipeline; no page builder overhead |
| 18 | Schema names the firm "warenlaw.com"; no `LegalService`; no address | Correct organisation and office schema |
| 19 | Client logos and crests | Firm approves each logo; store permission in the admin |
| 20 | Uncategorised posts (6) and overlapping categories | Align categories with practice areas |
| 21 | Stale LinkedIn slug, inconsistent firm name and typos | Correct in Settings and content review |
| 22 | `/zh/` empty with a canonical that 404s | Drop with a 301, as DIRECTION says |

### Low

| # | Issue | One-line fix |
|---|---|---|
| 23 | Sitemap lists noindex, system and redirecting URLs | Generate from indexable records only |
| 24 | `/favicon.ico` 404; no manifest | Add icon set and manifest |
| 25 | `/page/2/` duplicate; case-insensitive URLs | Strict routing; 301 where needed |
| 26 | `utm_source=chatgpt.com` in a link | Strip during migration |
| 27 | Two-hop `http://www` redirect | One hop in Nginx |
| 28 | Link to `/author/` 404s; author archives are thin | Remove; use profiles |

**Corrections to the first look (`00-first-look.md`).**
- LinkedIn (#2): works by redirect, so it's stale rather than wrong. Priority lowered to Medium.
- Footer "Get Started" twice (#6): it's in the markup, within header navigation, but I couldn't see it in the footer in either render.
- `zh_CN` (#7): confirmed as an empty shell.

## Page decisions

Every URL has a decision in `docs/seo/url-inventory.csv`: **45 keep, 20 rewrite, 6 merge, 30 drop**.

| Group | Count | Decision |
|---|---|---|
| Home, About, Team, Partners, Expertise, Contact, Privacy | 7 | Rewrite, keep path |
| Practice areas | 9 URLs, 8 areas | Rewrite, keep path; merge the 2 debt pages |
| Profiles | 3 | Rewrite to the standard template |
| Webinars | 3 | Rewrite as webinar records, keep path |
| Articles | 36 | 32 keep; 4 generic posts of about 120 words drop (firm to confirm) |
| Categories | 12 | 8 keep, 4 merge |
| Tags (16), author archives (6), `/zh/`, Elementor template, MailPoet pages (2) | 26 | Drop with 301; MailPoet pages depend on the newsletter decision |
| Pagination (3), old Ephraim URL, Insights listing | 5 | Keep |

**Which debt URL survives?** I recommend `/corporate-debt-recovery/`: it has the deeper content, is in the main menu and matches the search term. Check Search Console before finalising; if `/debt-solutions-recovery-asset-tracing/` has more clicks, reverse it. The two have a nearly equal count of pages linking to them (94).

## Proposed sitemap

```
/                                        Home
/about-us/                               About (with video)
/our-team/                               Team (filter by practice area)
/our-team/[slug]/                        Profile, one per advocate
/our-partners/                           Partners and joint offices
/area-of-expertise/                      Index of 8 areas
  /corporate-debt-recovery/              Debt Recovery and Asset Tracing (merged)
  /corporate-commercial-practice/
  /real-estate-conveyancing-land-law/
  /wealth-management-investments/
  /litigation-dispute-resolution-international-arbitration/
  /banking-finance-law/
  /mining-energy-law/
  /employment-labour-law/
/insights/                               Listing; /insights/page/[n]/
  /[article-slug]/                       Existing paths kept
  /category/[slug]/                      Filter pages
/insights/webinars/                      New index of webinars and events
  /[webinar-slug]/                       Existing paths kept
/contact-us/                             Offices, map, form, WhatsApp, booking
/privacy-policy/
/terms/                                  New: Terms / Legal Disclaimer
/cookie-policy/                          New, if the firm wants it separate
```

**Proposed for discussion:** a diaspora hub (for example `/diaspora/`) gathering wealth, property and succession content. It isn't in DIRECTION, so it needs the planner's decision.

**URL decision for the planner.** Practice areas, articles and webinars all sit at the root today. I recommend keeping these paths, because that needs no redirects and carries the least ranking risk. The cost is a root-level slug resolver in Next.js and a uniqueness rule across content types. Moving articles to `/insights/[slug]/` is cleaner but needs 36 redirects.

## URL map

`docs/seo/url-inventory.csv` gives a proposed URL for each of the 101 URLs. Pattern rules for the redirect map:

| Old | New | Status |
|---|---|---|
| `/debt-solutions-recovery-asset-tracing/` | `/corporate-debt-recovery/` | 301 |
| `/ephraim-ndegwa/` | `/our-team/ephraim-ndegwa/` | 301 (keep) |
| `/tag/*` | `/insights/` | 301 |
| `/author/*`, `/zh/author/*` | `/insights/` | 301 |
| `/zh/`, `/zh/*` | Same path without `/zh`, or `/` | 301 |
| `/category/uncategorized/` | `/insights/` | 301 |
| `/category/commercial-law/`, `/category/land-registry/` | `/category/conveyancing-and-commercial-services/` | 301 |
| `/category/financial-services-regulatory/` | `/category/regulatory-services/` | 301 |
| 4 generic posts | Related page (see CSV) | 301 |
| `/wp-content/uploads/*` | Migrated media where the file is kept | 301 |
| `/feed/` | New feed at the same path | Keep |
| `http`, `www`, no trailing slash | Canonical form, one hop | 301 |

Also consider `/wp-admin/`, `/wp-login.php` and `/xmlrpc.php` returning 404 or 410 after launch.

## Proposed data model

Types are PostgreSQL via Prisma. `?` means optional. **Uncertain** items need a decision. All content records share: `id`, `status` (draft, published, archived), `publishedAt?`, `createdAt`, `updatedAt`, and SEO fields `metaTitle?`, `metaDescription?`, `ogImageId?`, `canonicalUrl?`, `noindex` (boolean).

| Entity | Fields | Relations |
|---|---|---|
| **Setting** | `key` (unique), `value` (JSON). Holds phones, emails, WhatsApp number and message, socials, About video, booking URL, tracking IDs, verification tags | `aboutVideoPosterId?` → Media |
| **Office** | `name`, `type` (head, branch, joint), `addressLine`, `building?`, `city`, `country`, `poBox?`, `phone?`, `email?`, `latitude?`, `longitude?`, `mapEmbedUrl?`, `sortOrder` | Partner? for joint offices |
| **Page** | `slug` (unique), `title`, `body` (JSON blocks), `template`, `legalReviewStatus` | Media |
| **PracticeArea** | `slug` (unique), `name`, `shortSummary`, `body` (JSON blocks), `faq` (JSON), `sortOrder`, `heroImageId?`, `legalReviewStatus` | ↔ TeamMember; ↔ Insight; → Category? |
| **TeamMember** | `slug` (unique), `fullName`, `displayName?`, `roleTitle`, `memberType` (partner, advocate, consultant, staff), `isAdvocate`, `shortBio`, `longBio?` (JSON), `experience?` (JSON list), `education?` (JSON list), `admissions?` (JSON list), `memberships?` (JSON list), `languages` (text array), `email?`, `phone?`, `whatsApp?`, `linkedInUrl?`, `bookingUrl?`, `portraitId?`, `officeId?`, `hasProfile`, `sortOrder` | ↔ PracticeArea; → Office; ↔ Insight (authors); ↔ Webinar (panel); ↔ Award |
| **Insight** | `slug` (unique), `title`, `excerpt`, `body` (JSON blocks), `readingMinutes`, `featuredImageId?`, `legacyWordpressId?`, `legalReviewStatus` | ↔ Category; ↔ PracticeArea; ↔ TeamMember; ↔ Tag **(uncertain: tags have few uses)** |
| **Category** | `slug` (unique), `name`, `description?`, `sortOrder` | ↔ Insight |
| **Webinar** | `slug` (unique), `title`, `summary`, `body` (JSON), `startsAt?`, `timezone?`, `state` (upcoming, recording, past), `registrationUrl?`, `recordingUrl?`, `recordingGated`, `faq` (JSON), `audience?`, `heroImageId?`, `legalReviewStatus` | ↔ TeamMember (panel) |
| **ClientLogo** | `name`, `logoId`, `altText`, `permissionConfirmed` (boolean), `permissionNote?`, `sortOrder`, `visible` | → Media |
| **Partner** | `slug`, `name`, `description`, `websiteUrl?`, `logoId?`, `sortOrder` | → Office? ; ↔ Media (gallery) |
| **Award** | `name`, `awarder`, `year`, `category`, `imageId?`, `visible`, `approvalNote?` | → TeamMember? (null means firm-wide) |
| **Testimonial (uncertain)** | `quote`, `attribution`, `location?`, `consentConfirmed`, `approvedByFirm`, `visible` | → TeamMember?, → PracticeArea?. Exists only if the firm decides testimonials are allowed |
| **Media** | `fileName`, `originalName`, `mimeType`, `sizeBytes`, `width?`, `height?`, `altText` (required for images), `caption?`, `variants` (JSON), `legacyUrl?` | Used by most entities |
| **ContactSubmission** | `name`, `email`, `phone?`, `message`, `source`, `consentAt?`, `emailedAt?`, `createdAt`. Minimal data and a retention rule | None |
| **Lead / Subscriber (uncertain)** | `email`, `firstName?`, `source` (newsletter, webinar), `webinarId?`, `consentAt`, `unsubscribedAt?` | → Webinar? Depends on the newsletter decision below |
| **Redirect** | `fromPath` (unique), `toPath`, `statusCode`, `note?` | Used by Nginx or middleware |
| **AdminUser** | Single row: `email`, `passwordHash`, `totpSecret` (encrypted), `failedAttempts`, `lockedUntil?` | ← Session, ← ChangeHistory |
| **Session** | `tokenHash`, `adminUserId`, `expiresAt`, `createdAt` | → AdminUser |
| **ChangeHistory** | `entityType`, `entityId`, `action` (create, update, delete, publish, unpublish, restore), `adminUserId`, `createdAt`, `before` (JSON), `after` (JSON) | → AdminUser. See STRUCTURE rule 10 |

**Why the structure helps:** the many-to-many links are what fix the journeys in 05, since every practice page can show its people and articles, and every profile its articles. `legalReviewStatus` (`needs_advocate_review`, `approved`) enforces the DIRECTION rule, and publishing can be blocked until approved.

## Features

**The new site needs** (missing now): practice-area and team relations; filter by practice area; a profile for each advocate; About video with poster and captions; a consent mechanism; a privacy notice on each form; Terms / Disclaimer page; Nakuru map; webinar states and index; correct structured data; article authors; drafts, preview and history; redirect management.

**Must not be lost in the rebuild** (not all are in DIRECTION):

| Feature | Note |
|---|---|
| **Newsletter sign-up** and subscriber list | MailPoet. **Not in DIRECTION.** Needs a decision and a new sending route, which may mean a paid service, so it needs the planner's approval |
| **Gated webinar recordings**, emailed on sign-up | Same dependency |
| **Booking links** | Microsoft Bookings and Calendly |
| **WhatsApp widget** | With a pre-filled message |
| **Search** | Not named in DIRECTION |
| **Beijing joint office and partners** | Not in DIRECTION's contact description |
| **Testimonials, recognition and representative experience** | Subject to the firm's checks |
| **FAQ schema on articles** | 15 long articles currently carry it |
| **Tracking** | GTM, Google tag, Meta Pixel, subject to consent decision |
| **Feeds and search-engine verification** | Keep |

## Launch dependencies

- **Domain:** renewal first. Registrar and DNS are at **Hostinger**, not Namecheap as DIRECTION suggests. Needs access or a named contact.
- **DNS:** full export. Add `api.warenlaw.com`. Lower TTLs before cutover.
- **Mail records to keep unchanged:** all five Google MX records, SPF TXT (after the firm's review), DMARC, `MS=ms32625013`, any DKIM. Moving the website must not touch these.
- **Verification to carry over:** both Google tokens, Bing `msvalidate.01`.
- **Analytics to keep:** GTM `GTM-T58XBX56`, `GT-5MRWVKJK`, Meta Pixel `1808355966500012`. Jetpack Stats ends with WordPress.
- **Certificates:** new HTTPS on the company server for apex, www and api.
- **Content export:** full WordPress export and media, including Elementor pages, since REST output doesn't match some rendered pages (`/insights/` for example).
- **MailPoet and WPForms data:** export under a process the firm approves. Don't put any of it in this repository.
- **WordPress decommissioning:** keep a backup for rollback, then close the old login.

## Open questions for the firm

1. **Is the domain set to renew?** Who holds the Hostinger account?
2. Who approves legal content, and are the debt page's testimonials and figures genuine?
3. Do the 14 logos, including the national arms and county crests, have permission? Can the two unidentified county crests and the blue globe mark (file `Screenshot-2025-12-11-120209`, reads like "NFEC") be named?
4. **Is there a Ruiru branch?** Which offices should be listed?
5. Which phone numbers are official? (0714 350 932, 0719 278 594, 0797 899 003.) Which is the WhatsApp line?
6. **What is Janice's preferred name?** The site uses Janice Wachuka, Janice Maina and Janice Wachuka Maina.
7. Correct titles: Nick (Consultant or Consultant Partner), Ephraim, Martin (Cross-Border or Diaspora Liaison).
8. Which team members get profiles? Who needs the content written (bios, admissions, LinkedIn)?
9. **Was the firm formerly Maina Murimi & Advocates?** Is there an old domain with links worth redirecting? Founding year?
10. Keep the newsletter and gated recordings? Which mail service? Are subscribers to be moved?
11. Should the four early generic posts be retired? Should the data protection and road accident articles have a practice-area home?
12. Is the firm registered with the ODPC? Who is its data protection contact? Is advertising tracking to continue?
13. Which booking system is the single official one? Why is the calendar named "Copy"?
14. Is there a Google Business listing? Who manages it, and which socials are current?
15. Original logo files, brand colours and fonts; final About video; office photos.
16. Is 8 still the right number of practice areas? Data protection, tax and diaspora work are prominent in content but have no page.

**Note for the planner:** `DIRECTION.md` says Namecheap and describes only two offices, and it doesn't cover the newsletter, gated recordings, search or testimonials. I haven't changed it, because it changes only through a decision record.

## Coverage check

| Section | Not checked | Why |
|---|---|---|
| A | Content of `/insights/zh/`-style pages beyond `/zh/` | Empty shell; URLs not in sitemap |
| B | Article accuracy | Not this task; needs advocates |
| B | Exact use of 143 media items not seen in crawled HTML | May be CSS backgrounds or unused; needs a WordPress export |
| B | Webinar recording delivery | Requires a form submission |
| C | Lighthouse / PageSpeed scores | Public API quota exceeded; Chrome measurements used instead |
| C | Field Core Web Vitals, Search Console, analytics | No access |
| C | Form confirmation and destination | Forms must not be submitted |
| C | Keyboard, screen reader, real devices | Markup and renders only |
| C | Facebook, Bookings, Jointide, WeChat, some LinkedIn targets | Refuse automated requests; need manual clicks |
| D | Domain auto-renew, registrant, DKIM, ODPC registration | Not publicly visible or selector unknown |
| D | Compliance conclusions | Firm's decision; not legal advice |
| D | Google Business, Instagram and Facebook page names | No login allowed; searches found nothing |
| E | Real user journeys | No analytics or user testing |
