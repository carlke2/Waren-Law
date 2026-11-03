# 0004: Scope and defaults after the WordPress audit (T001)

**Date:** 3 November 2026
**Status:** Accepted

## Decisions
1. **URLs:** keep every current path (articles, practice areas and webinars stay at the root). Root-level slug resolver in Next.js; slugs unique across Page, PracticeArea, Insight and Webinar.
2. **Debt pages:** merge into `/corporate-debt-recovery/`; `/debt-solutions-recovery-asset-tracing/` → 301.
3. **No diaspora hub.** Diaspora content stays in Insights, organised by categories.
4. **Design process:** the planner produces mockups of the key pages; the client approves; the agent builds from the approved mockups.
5. **Data model:** adopt the model proposed in `docs/audit/06-findings-and-recommendations.md`, including the `legalReviewStatus` publishing gate and `ChangeHistory`.
6. **Registrar is Hostinger** (not Namecheap). Mail is Google Workspace and must not be touched at launch.

## Defaults for open client questions (build now, switch later)
Nothing waits on the firm. Each item is built so it can be changed from the admin or one config value.

| Open question | Default |
|---|---|
| Newsletter + gated webinar recordings | **Keep.** Subscribers stored in our database; emails sent via SMTP (configured for the firm's Google Workspace). Sending can be switched off in Settings |
| Testimonials | Model and admin built; **hidden** until each one is marked consent-confirmed and firm-approved |
| Client logos | Shown only when `permissionConfirmed` is ticked; all start unticked |
| Result claims ("98% recovery" etc.) | Not migrated |
| Offices | Nairobi (head), Nakuru (branch), Beijing (joint office). Ruiru added only when confirmed |
| Phone / WhatsApp numbers | Stored once in Settings; current site values as placeholders |
| Team | All 20 people, grouped partners / advocates / consultants / staff; profile page for every partner, advocate and consultant; staff on the team page only |
| Practice areas | 8, as today |
| Four early ~120-word posts | Dropped with 301s to related pages (firm can reverse) |
| Booking | One booking URL in Settings (current Microsoft Bookings link) |
| Tracking | Loads **only after cookie consent**; GTM, Google tag and Meta Pixel IDs carried over |
| Search | Included (PostgreSQL full-text over insights, practice areas, team) |
| About video | Placeholder video until the firm supplies the final one |

## Consequences
- DIRECTION.md updated (Hostinger, offices, new features).
- New backend features: subscribers, email sending, search, redirects, consent-aware tracking.
- Client inputs are collected in parallel and dropped in through the admin; they do not block development.
