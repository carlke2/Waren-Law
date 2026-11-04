## Report: T045 — Practice areas
Status: Done
Branch / PR: task/T045-practice-areas
Summary: Built `/area-of-expertise/` and the practice template for all 8 areas at their current URLs, from the Home card, team band and insight band patterns.
Done when: index with cards, help band and CTA ✅ · practice page sections ✅ · checks and screenshots ✅
Files changed: `frontend/src/app/(site)/area-of-expertise/page.tsx`, `frontend/src/components/site/templates/practice-area-template.tsx`, `faq-list.tsx`, `insights-band.tsx`, dictionary.
Dependencies added: none
Decisions made: none
Questions / blockers: The FAQ section stays hidden because no practice area has structured FAQs: imported questions sit in the page body. Banking & Finance has no advocates or insights linked, so those bands are hidden.
Suggested next step: T046, our people.

New from existing parts: FAQ accordion (native `details`), help band wording in the dictionary.
