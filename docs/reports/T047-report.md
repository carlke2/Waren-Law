## Report: T047 — Contact and consultation
Status: Done
Branch / PR: task/T047-contact
Summary: Built `/contact-us/` and `/book-a-consultation/` with one native form component that also serves webinar recording requests. It has a honeypot, a privacy line, source tracking, field errors and token-coloured states. Maps load on click, and every "Book a consultation" link now opens the new page.
Done when: contact form, direct contacts, offices ✅ · consultation form, next steps ✅ · FAQs hidden (none supplied) · rate limit on all three forms ✅ · checks and screenshots ✅
Files changed: `lead-form.tsx`, `map-embed.tsx`, `contact-template.tsx`, `book-a-consultation/page.tsx`, dictionary, `pageCopy` seed, Home snapshots.
Dependencies added: none
Decisions made: none
Questions / blockers: Enquiries are stored but emailed only if SMTP is configured in `backend/.env`. The three consultation steps and two hero sentences are new wording for the firm to review.
Suggested next step: T048, insights.

New from existing parts: form fields (input border token, Home button), office cards (practice card style), steps (About "How we work" pattern).
