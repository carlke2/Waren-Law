# T041: Lead source tracking (backend)

**Status:** Draft — starts after the Home build (brief 06) is signed off
**Priority:** High
**Decision:** 0017

## Goal
Every enquiry and subscriber shows where the person came from and their country.

## Done when
- [ ] Fields `form`, `page`, `source`, `campaign`, `channel`, `heardAbout`, `country` on contact submissions, consultation requests and subscribers (no `country` for subscribers); migration + shared Zod schema
- [ ] Channel rules in one tested module; channel and form names in `shared/src/constants`
- [ ] Referrers stored as host names only; nothing stored across visits
- [ ] Enquiry email shows the source line
- [ ] Newsletter links tagged automatically
- [ ] Leads API for the admin: list, filters, CSV export, monthly summary by channel and country
- [ ] One log line per submission without personal details
- [ ] Tests: newsletter link → Newsletter, Google → Search, LinkedIn → Social, no referrer → Direct, `heardAbout` and `country` saved
