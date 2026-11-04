## Report: T044 — About and Our Partners
Status: Done
Branch / PR: task/T044-about
Summary: Built `/about-us/` and `/our-partners/` from their references, plus the shared page hero, block renderer and cards the later pages use. Copy in the references that the database didn't have is seeded in the `pageCopy` setting through the import curation.
Done when: pages built ✅ · film "coming soon" state ✅ · mission and vision from firm text ✅ · lint, theme, types, unit tests, Playwright ✅ · screenshots ✅
Files changed: `frontend/src/components/site/*`, `frontend/src/styles/*`, `shared/src/schemas/api.ts`, import curation.
Dependencies added: none
Decisions made: none
Questions / blockers: partner logos and a joint office photo don't exist, so those parts are hidden. The film block shows the existing poster photo.
Suggested next step: T045, practice areas.

New tokens, all taken from the About references: `text-h1-page`, `text-lead`, `text-h2-compact`, `text-statement`, `text-h3-row`, `tracking-chip`, `on-brand-lead`, `overlay-film`, the narrow and film containers, and the film, photo and certificate aspect ratios.
Also changed: detail queries omit `searchText`, and the build retries a failed page up to 3 times with lower concurrency, because the link to Supabase is slow.
