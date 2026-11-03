# T006: Database schema (full model)

**Status:** Done
**Week:** 1 (Version 1, Day 1)
**Priority:** High

## Goal
Prisma schema for the **full data model** in `docs/audit/06-findings-and-recommendations.md` (Setting, Office, Page, PracticeArea, TeamMember, Insight, Category, Webinar, ClientLogo, Partner, Award, Testimonial, Media, ContactSubmission, Subscriber, Redirect, AdminUser, Session, ChangeHistory), with: shared status / publishedAt / timestamps / SEO fields; `legalReviewStatus` enum; many-to-many relations (TeamMember↔PracticeArea, Insight↔PracticeArea, Insight↔TeamMember, Insight↔Category, Webinar↔TeamMember); `TeamMember.memberType` (partner, advocate, consultant, staff); slugs unique **across** Page, PracticeArea, Insight and Webinar (enforce in a service + a `Slug` registry table or equivalent, documented). First migration. Matching Zod schemas + types in `shared/`.

## Done when
- [x] `prisma migrate deploy` applies cleanly to Supabase (use `migrate dev` only against a local/shadow database, never reset the Supabase database without the owner's approval); schemas compile in both apps.

## Files / inputs
- `docs/prompts/03-AGENT-V1-DAY1-FOUNDATION-DATA.md`

## Result
Prisma schema for the full model (19 entities, the `Slug` registry and join tables), Zod schemas and types in `shared/`, and a block JSON format documented in `shared/README.md`. Slugs are unique across Page, PracticeArea, Insight and Webinar through `claimSlug` and the `Slug` table. `prisma migrate deploy` applied cleanly to Supabase with no drift. Row level security is on for every table (decision 0008). Departures from audit 06: the uncertain Tag entity is left out, `searchText` columns are added for search, `altTextNeedsReview` is added to Media, `slug` is added to several records so imports can upsert, and Setting's poster link became a general `mediaId`.
