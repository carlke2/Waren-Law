## Report: T041 — Lead source tracking
Status: Done, except automatic newsletter link tagging
Branch / PR: task/T041-source-tracking
Summary: Every enquiry and subscriber now records form, page, source, campaign, channel and what the person says they heard about us; enquiries also record country. The firm's email starts with the source line. A leads API offers a list, filters, CSV export and a monthly summary.
Done when:
- Fields, migration and shared schemas ✅ (`ContactSubmission`, which also holds consultation and recording requests, and `Subscriber`; no country for subscribers)
- Channel rules in one tested module ✅ (`backend/src/modules/leads/attribution.ts`), names in `shared/src/constants/leads.ts`
- Referrers as host names only, nothing across visits ✅ (browser `sessionStorage` for the tab's visit, no cookie; sent only on submit)
- Enquiry email source line ✅
- Newsletter links tagged automatically ❌ Brief 07 excludes newsletter sending, so no links exist to tag. The rule is ready: `source=newsletter` maps to the Newsletter channel.
- Leads API ✅ gated by `LEADS_API_KEY`
- One log line per submission without personal details ✅
- Tests ✅ newsletter, Google, LinkedIn, direct, `heardAbout`, country
Files changed: `backend/src/modules/leads/*`, contact and newsletter modules, migration `20261104200000_add_lead_attribution`, shared schemas, `frontend/src/lib/attribution/visit.ts`.
Dependencies added: none
Decisions made: 0023
Questions / blockers: To use the leads API, set `LEADS_API_KEY` in `backend/.env`. It is empty by default, and then every request gets 403. I didn't change any `.env` file.
Suggested next step: T047, contact forms.
