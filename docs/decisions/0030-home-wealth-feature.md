# 0030 — Homepage wealth feature card

Decision: Rebuild the homepage “Wealth Protection Plan” band as an ivory editorial section with an HTML/CSS webinar card and SVG Kenya/US flags, removing the navy flyer image and gold square. Homepage-only; other webinar surfaces stay unchanged.

Why: Keep the homepage palette uniform (no navy) and match the approved reference without hard-coding a flyer bitmap.

Consequences: Featured webinar detail is fetched on the homepage so a YouTube `recordingUrl` can surface when present. Flag assets live under `frontend/public/home/flags/`.
