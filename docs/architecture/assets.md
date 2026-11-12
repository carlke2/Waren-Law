# Asset map

Every file in `frontend/public/` and `backend/uploads/`, with what uses it. Built on 12 November 2026 (T070 Phase 0) from `main` at `8d75a7a`.

**Rule:** a file may be removed only when it is unused in **both** the code and the database. Check both before removing anything.

## How assets are served

There are two separate places, and they are served differently.

| | `frontend/public/` | `backend/uploads/` |
|---|---|---|
| What it holds | Fixed site design files: logo, home-page artwork, backgrounds | Firm content media: portraits, insight and webinar images, client logos, partner photos, the hero video |
| Who references it | **Code**: a path such as `/brand/golden-logo.png` written in a component | **Database**: a `Media` row (`fileName`) linked from a content record. A few files are named in code (see below). |
| Served by | Next.js, at the site root (`/brand/…`, `/home/…`) | The NestJS backend, as static files (`backend/src/app.setup.ts`, `useStaticAssets(UPLOADS_DIR)`) under the path of `PUBLIC_MEDIA_BASE_URL` (`/uploads/`). In production, Nginx proxies `/uploads/` to the backend and caches it. |
| How the URL is built | Written directly in code | The API returns `PUBLIC_MEDIA_BASE_URL + "/" + Media.fileName` (`content-presenter.service.ts:36`). The frontend allows that host in `next.config.ts` (`images.remotePatterns`). |
| In git | Tracked | Git-ignored. The WordPress import (`pnpm import:wp`) generates them, and deploys copy them separately. Exception: the 4 approved `*-grey.webp` portraits were committed in T066. |

Code-named uploads (no `Media` row needed):

- `frontend/src/lib/utils/content/photo-files.ts` swaps the stored portrait for `team-<slug>-profile|speaker|card|grey.webp` by keeping the API URL and replacing only the file name.
- `hero.mp4` has a `Media` row, but no record links to it. `backend/src/modules/home/home.service.ts:20` looks it up by name through `HERO_VIDEO_FILE` in `shared/src/constants/content.ts`.

## Method

- **Database:** a read-only transaction (`BEGIN TRANSACTION READ ONLY`, then rolled back) on the Supabase database used by `backend/.env`.
  - Read all 86 `Media` rows.
  - Searched every row of every content table for each `Media` id, and for every file name in both folders as plain text. The 23 tables are Award, Category, ChangeHistory (0 rows), ClientLogo, HomeContent, Insight, Media, Office, Page, Partner, PracticeArea, Redirect, Setting, Slug, TeamMember, Testimonial (0 rows), Webinar, and the 6 link tables (`_PartnerGallery` etc.).
  - Not read: ContactSubmission, Subscriber, AdminUser and Session. These hold personal data and no media.
- **Result:** content links media only by `Media` id. No content row contains a file name or URL as text. No database row mentions any `frontend/public/` file. All 86 `Media` file names exist on disk, and none has variants.
- **Code:** searched `frontend/src`, `backend/src` and `shared/src` (`.ts`, `.tsx`, `.css`, excluding tests) for the file name, or for the `/folder/file` path for public files. The importer (`scripts/import-wordpress/src`) is listed separately. It creates files and `Media` rows but does not serve the site.
- **Database column:** `Table (n): record [status]`, where the record is a slug, key or id. `no Media row` means the file has no database entry at all.

## Summary

| | Files | Used | Unused (code + database) |
|---|---|---|---|
| `backend/uploads/` | 121 (23.5 MB) | 96 | **25** (1.8 MB): 20 `team-*-cutout.webp`, 4 `team-*-grey.jpg`, `home-hero-skyline-illustration.webp` |
| `frontend/public/` | 9 (1.9 MB) | 4 | **4** (1.4 MB): `brand/logo.png`, `brand/logo.webp`, `home/intro-scales-balance.webp`, `home/lady-justice-cutout.png`. Plus 1 used only by dead code: `home/lady-justice.webp` |

Notes on edge cases:

- **`home-hero-skyline-illustration.webp`:** a `Media` row exists, but no record links to it and no site code uses it. The importer (`curation.ts:848`) recreates both the file and the row on every `pnpm import:wp`. Removing only the file would leave a `Media` row pointing at a missing file, until the next import puts it back.
- **`public/home/lady-justice.webp`:** used only by `components/site/home/welcome.tsx`, which nothing imports (Phase 3 candidate). It becomes unused once that component is removed.
- **`public/brand/logo.png`:** byte-identical to `golden-logo.png`, which is the file the site uses (`logo.tsx`, `seo/schema.ts`).
- **The 4 `team-*-grey.jpg` files:** the site uses only the `.webp` versions (`GREY_PHOTO`). Identical copies of the `.jpg` files are in `docs/reports/t064-portraits/output/`.

## `backend/uploads/`

| File | Size | Database (table: record [status]) | Site code | Importer | Status |
|---|---|---|---|---|---|
| `about-video-poster.webp` | 103 KB | Setting (1): aboutVideo | – | curation.ts | USED |
| `award-legal-insider-2025-litigation-firm-of-the-year.webp` | 31 KB | Award (1): legal-insider-2025-litigation-firm-of-the-year [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-blue-globe-mark-name-to-confirm.webp` | 2 KB | ClientLogo (1): blue-globe-mark-name-to-confirm [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-britam.webp` | 5 KB | ClientLogo (1): britam [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-chint.webp` | 3 KB | ClientLogo (1): chint [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-county-crest-name-to-confirm.webp` | 11 KB | ClientLogo (1): county-crest-name-to-confirm [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-crest-name-to-confirm.webp` | 8 KB | ClientLogo (1): crest-name-to-confirm [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-honor.webp` | 2 KB | ClientLogo (1): honor [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-icea-lion-group.webp` | 4 KB | ClientLogo (1): icea-lion-group [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-jubilee-insurance.webp` | 2 KB | ClientLogo (1): jubilee-insurance [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-kebs.webp` | 15 KB | ClientLogo (1): kebs [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-ketepa.webp` | 5 KB | ClientLogo (1): ketepa [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-murang-a-county.webp` | 7 KB | ClientLogo (1): murang-a-county [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-nairobi-city-county.webp` | 9 KB | ClientLogo (1): nairobi-city-county [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-old-mutual.webp` | 2 KB | ClientLogo (1): old-mutual [published] | – | importers/site.ts (name pattern) | USED |
| `client-logo-republic-of-kenya-coat-of-arms.webp` | 18 KB | ClientLogo (1): republic-of-kenya-coat-of-arms [published] | – | importers/site.ts (name pattern) | USED |
| `hero.mp4` | 15.4 MB | Media row exists, **no record links to it** | `HERO_VIDEO_FILE` (shared/src/constants/content.ts), looked up by backend/src/modules/home/home.service.ts:20 | – | USED |
| `home-hero-skyline-illustration.webp` | 62 KB | Media row exists, **no record links to it** | – | curation.ts | **UNUSED (code + database)**, see note |
| `home-hero-team.webp` | 220 KB | Setting (1): seo | – | curation.ts | USED |
| `insight-beyond-the-boardroom-reflections-from-waren-laws-visit-to-china.webp` | 38 KB | Insight (1): beyond-the-boardroom-reflections-from-waren-laws-visit-to-china [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-buying-property-in-kenya-from-the-us-uk-or-europe.webp` | 68 KB | Insight (1): buying-property-in-kenya-from-the-us-uk-or-europe [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-buying-property-in-kenya-without-future-legal-problems.webp` | 27 KB | Insight (1): buying-property-in-kenya-without-future-legal-problems [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-case-summary-third-party-complexities-and-the-preservation-of-commercial-interests-in-statutory-power-of-sale-by-banks-in-kenya.webp` | 43 KB | Insight (1): case-summary-third-party-complexities-and-the-preservation-of-commercial-interests-in-statutory-power-of-sale-by-banks-in-kenya [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-contract-enforceability-in-kenya-1.webp` | 15 KB | Insight (1): contract-enforceability-in-kenya [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-conveyancing-lawyer-in-kenya-buying-property-safely.webp` | 149 KB | Insight (1): conveyancing-lawyer-in-kenya-buying-property-safely [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-cross-border-succession-planning-kenya-uk-us.webp` | 45 KB | Insight (1): cross-border-succession-planning-kenya-uk-us [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-entering-kenyas-mining-sector-what-us-and-european-investors-should-verify-before-spending-on-due-diligence.webp` | 99 KB | Insight (1): entering-kenyas-mining-sector-what-us-and-european-investors-should-verify-before-spending-on-due-diligence [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-estate-planning-kenya-diaspora-wills-family-trusts.webp` | 33 KB | Insight (1): estate-planning-kenya-diaspora-wills-family-trusts [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-how-kenyan-lenders-can-recover-smart-and-stay-compliant.webp` | 18 KB | Insight (1): how-kenyan-lenders-can-recover-smart-and-stay-compliant [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-how-kenyas-courts-are-taking-control-of-big-techs-data-decisions.webp` | 8 KB | Insight (1): how-kenyas-courts-are-taking-control-of-big-techs-data-decisions [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-how-to-keep-a-property-transaction-moving-without-taking-on-legal-risk.webp` | 31 KB | Insight (1): how-to-keep-a-property-transaction-moving-without-taking-on-legal-risk [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-investing-in-kenya-from-the-us-uk-canada-or-europe.webp` | 98 KB | Insight (1): investing-in-kenya-from-the-us-uk-canada-or-europe [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-is-kenyas-data-protection-regime-really-working.webp` | 22 KB | Insight (1): is-kenyas-data-protection-regime-really-working [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-kenya-a-safe-haven-for-foreign-investment.webp` | 10 KB | Insight (1): kenya-a-safe-haven-for-foreign-investment [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-kenya-energy-projects.webp` | 90 KB | Insight (1): kenya-energy-projects [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-kenya-where-risk-meets-opportunity.webp` | 79 KB | Insight (1): kenya-where-risk-meets-opportunity [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-knowing-your-rights-as-a-data-subject-in-kenya.webp` | 13 KB | Insight (1): knowing-your-rights-as-a-data-subject-in-kenya [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-living-in-the-u-s-but-own-property-in-kenya.webp` | 29 KB | Insight (1): living-in-the-u-s-but-own-property-in-kenya [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-regulatory-delays-in-kenya.webp` | 33 KB | Insight (1): regulatory-delays-in-kenya [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-statutory-power-of-sale-in-kenya.webp` | 37 KB | Insight (1): statutory-power-of-sale-in-kenya [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-the-cost-of-cheap-legal-structuring-in-a-high-value-kenya-investment.webp` | 86 KB | Insight (1): the-cost-of-cheap-legal-structuring-in-a-high-value-kenya-investment [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing-1.webp` | 9 KB | Insight (1): waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing-2.webp` | 12 KB | Insight (1): waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing-3.webp` | 9 KB | Insight (1): waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing-4.webp` | 11 KB | Insight (1): waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing.webp` | 50 KB | Insight (1): waren-law-advocates-llp-strengthens-china-africa-legal-ties-through-strategic-partnership-signing-in-beijing [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-warenlaw-com-land-registry-kenya-speed-corruption.webp` | 112 KB | Insight (1): warenlaw-com-land-registry-kenya-speed-corruption [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-wealth-protection-for-kenyans-abroad-how-wills-and-trusts-secure-your-kenyan-estate.webp` | 65 KB | Insight (1): wealth-protection-for-kenyans-abroad-how-wills-and-trusts-secure-your-kenyan-estate [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-what-foreign-investors-need-to-know-before-entering-the-kenyan-market.webp` | 64 KB | Insight (1): what-foreign-investors-need-to-know-before-entering-the-kenyan-market [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-when-consent-comes-with-a-price-tag.webp` | 29 KB | Insight (1): when-consent-comes-with-a-price-tag [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-why-foreign-lenders-need-kenyan-counsel-before-a-default-becomes-a-dispute.webp` | 88 KB | Insight (2): why-foreign-lenders-need-kenyan-counsel-before-a-default-becomes-a-dispute [published], kenyan-debt-recovery-for-foreign-companies [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-why-kenyans-abroad-are-afraid-to-invest-back-home-and-what-to-do-about-it.webp` | 61 KB | Insight (1): why-kenyans-abroad-are-afraid-to-invest-back-home-and-what-to-do-about-it [published] | – | importers/insights.ts (name pattern) | USED |
| `insight-why-the-high-court-has-pulled-road-accident-claims-out-of-the-small-claims-court.webp` | 70 KB | Insight (1): why-the-high-court-has-pulled-road-accident-claims-out-of-the-small-claims-court [published] | – | importers/insights.ts (name pattern) | USED |
| `nairobi-skyline-hero.webp` | 145 KB | HomeContent (1): de38e3f6-a12a-4755-8935-856d2212c24c | – | – | USED |
| `partner-signing-1-1.webp` | 38 KB | _PartnerGallery (2) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-1-2.webp` | 33 KB | _PartnerGallery (2) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-1-3.webp` | 43 KB | _PartnerGallery (2) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-1-4.webp` | 71 KB | _PartnerGallery (2) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-1-5.webp` | 47 KB | _PartnerGallery (2) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-1-6.webp` | 47 KB | _PartnerGallery (2) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-1-7.webp` | 39 KB | _PartnerGallery (2) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-2-1.webp` | 43 KB | _PartnerGallery (1) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-2-2.webp` | 52 KB | _PartnerGallery (1) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-2-3.webp` | 43 KB | _PartnerGallery (1) | – | importers/site.ts (name pattern) | USED |
| `partner-signing-2-4.webp` | 60 KB | _PartnerGallery (1) | – | importers/site.ts (name pattern) | USED |
| `team-alex-maina-cutout.webp` | 28 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-alex-maina.webp` | 13 KB | TeamMember (1): alex-maina [published] | – | importers/team.ts (name pattern) | USED |
| `team-barbra-katasi-cutout.webp` | 32 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-barbra-katasi.webp` | 37 KB | TeamMember (1): barbra-katasi [published] | – | importers/team.ts (name pattern) | USED |
| `team-cecilia-njeri-card.webp` | 63 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-cecilia-njeri-cutout.webp` | 34 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-cecilia-njeri-profile.webp` | 52 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-cecilia-njeri-speaker.webp` | 89 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-cecilia-njeri.webp` | 67 KB | TeamMember (1): cecilia-njeri [published] | – | importers/team.ts (name pattern) | USED |
| `team-charity-wambui-cutout.webp` | 41 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-charity-wambui.webp` | 55 KB | TeamMember (1): charity-wambui [published] | – | importers/team.ts (name pattern) | USED |
| `team-charles-ndombi-cutout.webp` | 37 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-charles-ndombi.webp` | 92 KB | TeamMember (1): charles-ndombi [published] | – | importers/team.ts (name pattern) | USED |
| `team-christine-muthoni-cutout.webp` | 36 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-christine-muthoni.webp` | 13 KB | TeamMember (1): christine-muthoni [published] | – | importers/team.ts (name pattern) | USED |
| `team-davis-wachira-cutout.webp` | 47 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-davis-wachira.webp` | 148 KB | TeamMember (1): davis-wachira [published] | – | importers/team.ts (name pattern) | USED |
| `team-ephraim-ndegwa-cutout.webp` | 63 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-ephraim-ndegwa-grey.jpg` | 221 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-ephraim-ndegwa-grey.webp` | 131 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-ephraim-ndegwa-profile.webp` | 202 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-ephraim-ndegwa-speaker.webp` | 75 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-ephraim-ndegwa.webp` | 90 KB | TeamMember (1): ephraim-ndegwa [published] | – | importers/team.ts (name pattern) | USED |
| `team-eutycus-kamathi-cutout.webp` | 38 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-eutycus-kamathi.webp` | 72 KB | TeamMember (1): eutycus-kamathi [published] | – | importers/team.ts (name pattern) | USED |
| `team-faith-wanjala-cutout.webp` | 31 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-faith-wanjala.webp` | 29 KB | TeamMember (1): faith-wanjala [published] | – | importers/team.ts (name pattern) | USED |
| `team-florence-wambugu-cutout.webp` | 37 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-florence-wambugu.webp` | 21 KB | TeamMember (1): florence-wambugu [published] | – | importers/team.ts (name pattern) | USED |
| `team-fridah-gakii-cutout.webp` | 72 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-fridah-gakii.webp` | 242 KB | TeamMember (1): fridah-gakii [published] | – | importers/team.ts (name pattern) | USED |
| `team-janice-wachuka-cutout.webp` | 87 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-janice-wachuka-grey.jpg` | 209 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-janice-wachuka-grey.webp` | 139 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-janice-wachuka-profile.webp` | 224 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-janice-wachuka.webp` | 298 KB | TeamMember (1): janice-wachuka [published] | – | importers/team.ts (name pattern) | USED |
| `team-jimmy-wamalwa-cutout.webp` | 46 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-jimmy-wamalwa.webp` | 167 KB | TeamMember (1): jimmy-wamalwa [published] | – | importers/team.ts (name pattern) | USED |
| `team-margaret-wanjiru-cutout.webp` | 54 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-margaret-wanjiru.webp` | 102 KB | TeamMember (1): margaret-wanjiru [published] | – | importers/team.ts (name pattern) | USED |
| `team-martin-wachira-cutout.webp` | 64 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-martin-wachira-grey.jpg` | 264 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-martin-wachira-grey.webp` | 183 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-martin-wachira-speaker.webp` | 219 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-martin-wachira.webp` | 444 KB | TeamMember (1): martin-wachira [published] | – | importers/team.ts (name pattern) | USED |
| `team-mary-wanjiku-cutout.webp` | 28 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-mary-wanjiku.webp` | 10 KB | TeamMember (1): mary-wanjiku [published] | – | importers/team.ts (name pattern) | USED |
| `team-nick-amboko-cutout.webp` | 40 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-nick-amboko.webp` | 39 KB | TeamMember (1): nick-amboko [published] | – | importers/team.ts (name pattern) | USED |
| `team-phylis-njane-cutout.webp` | 44 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-phylis-njane-grey.jpg` | 215 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-phylis-njane-grey.webp` | 107 KB | no Media row | frontend/src/lib/utils/content/photo-files.ts | – | USED |
| `team-phylis-njane.webp` | 83 KB | TeamMember (1): phylis-njane [published] | – | importers/team.ts (name pattern) | USED |
| `team-stephen-warutere-cutout.webp` | 38 KB | no Media row | – | – | **UNUSED (code + database)** |
| `team-stephen-warutere.webp` | 16 KB | TeamMember (1): stephen-warutere [published] | – | importers/team.ts (name pattern) | USED |
| `webinar-wealth-protection-plan-for-kenyans-abroad-webinar.webp` | 73 KB | Webinar (1): wealth-protection-plan-for-kenyans-abroad-webinar [published] | – | importers/webinars.ts (name pattern) | USED |


## `frontend/public/`

| File | Size | Site code | Database | Status |
|---|---|---|---|---|
| `public/brand/golden-logo.png` | 188 KB | frontend/src/components/site/logo.tsx, frontend/src/lib/utils/seo/schema.ts | not referenced | USED |
| `public/brand/logo.png` | 188 KB | – | not referenced | **UNUSED (code + database)** |
| `public/brand/logo.webp` | 95 KB | – | not referenced | **UNUSED (code + database)** |
| `public/home/intro-scales-balance.webp` | 76 KB | – | not referenced | **UNUSED (code + database)** |
| `public/home/lady-justice-cutout.png` | 1.1 MB | – | not referenced | **UNUSED (code + database)** |
| `public/home/lady-justice-cutout.webp` | 181 KB | frontend/src/components/site/home/home-intro.tsx | not referenced | USED |
| `public/home/lady-justice.webp` | 47 KB | frontend/src/components/site/home/welcome.tsx (component not imported anywhere) | not referenced | **USED ONLY BY DEAD CODE** |
| `public/home/prefooter-bg-mobile.webp` | 23 KB | frontend/src/components/site/home/home-prefooter.tsx | not referenced | USED |
| `public/home/prefooter-bg.webp` | 56 KB | frontend/src/components/site/home/home-prefooter.tsx | not referenced | USED |
