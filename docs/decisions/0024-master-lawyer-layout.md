# 0024: Public site follows the Master Lawyer layout, with WAREN colour and content

**Date:** 5 November 2026
**Status:** Accepted

## Decision
1. The public site uses the section rhythm of the Master Lawyer template (utility bar, dark navigation, full-screen hero, practice grid, why-us, questions, people, client quotes, news, offices, closing call to action). The implementation is original code in this repository. The template’s HTML, CSS and images are not copied.
2. Colour, photography, wording and pages come from WAREN: navy `#061557`, gold `#D4AF37`, and the content already served by the API. Gold buttons keep navy text so the contrast stays readable.
3. Published questions from practice areas, insights and webinars are served together at `GET /api/v1/faqs`. The home page and `/faq/` read that endpoint. Testimonials and client logos, which the API already had, are shown when the firm has approved them.
4. Pages the template includes but WAREN does not (careers, fees, case results) are not invented.

## Why
The owner asked for that layout, with nothing from the current public frontend kept as the look, and with every visible fact coming from the backend.

## Consequences
- Home, header and footer no longer follow design specification v3. Inner pages keep their content and use the same navy header and hero.
- `/faq/` is a new path. Existing WAREN paths stay.
- Visual snapshots of the old home page need to be recaptured.
