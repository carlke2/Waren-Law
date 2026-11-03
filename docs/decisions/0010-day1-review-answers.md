# 0010: Answers to the V1 Day 1 review

**Date:** 3 November 2026
**Status:** Accepted

## Decisions
1. **Debt page stays `approved`.** It is a reorganisation of text the firm already published, with testimonials, statistics and claims removed. No new wording was written.
2. **Quantified results and outcome claims are hidden** until the firm confirms them (e.g. "over 100 properties", success rates, amounts recovered). Representative experience that only describes the kind of work stays. Implement as content edits in the import curation (idempotent), not as a code special case.
3. **Media for staging and production:** files stay on a server volume (decision 0003). The deploy step syncs `backend/uploads/` to the server volume; the import can regenerate them. No new storage service.
4. **Speed with Supabase in Frankfurt:** public pages are statically generated and revalidated (ISR), so visitors never wait on a database round-trip. Revalidation interval comes from env; on-demand revalidation arrives with the admin in V2.
5. **Agent decisions 0007–0009 accepted** (toolchain versions, row-level security on every table, import assumptions). Prisma 7 config via `prisma.config.ts` replaces the `directUrl` line in 0006.
6. **Remaining redirects:** author URLs → `/our-team/` by a pattern rule (T021); MailPoet URLs → `/insights/` until the newsletter ships in V2.
7. **Empty stray migration** stays; it changes nothing.
