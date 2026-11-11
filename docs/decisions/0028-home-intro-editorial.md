# 0028: Homepage intro editorial redesign

**Date:** 2026-11-11
**Status:** Accepted

## Decision
Replace the homepage intro (below the video hero, above “What we handle”) with an editorial cream/gold layout: eyebrow, serif headline with gold italic emphasis, two CTAs, framed image with corner lines and caption overlay, and a three-cell information strip fed from offices, partners and contact phones. Keep Newsreader for the serif; do not add Cormorant or Playfair. Add section tokens `--palette-intro`, `--palette-intro-gold`, `--palette-intro-ink` for the cream and muted gold the brief requires.

## Why
T059 brief and reference image, with prompt corrections: this is the intro, not the video hero; header stays approved; content and strip data must be verified from the database; founding year is not in settings so the eyebrow omits “EST.”.

## Consequences
- Welcome paragraphs and why-points remain in the database/API but are no longer rendered on the home intro.
- Framed image is the live site Why Choose Us scales photo, optimised to `frontend/public/home/intro-scales-balance.webp`.
- Other warenlaw.com images collected under `docs/media-library/` for later approval before swapping into approved sections.
