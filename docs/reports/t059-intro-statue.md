# T059 update — Lady Justice cutout (no frame)

**Status:** Done — awaiting review  
**Branch:** `task/T059-intro`

## Confirmations
- No gold frame, corner lines, or `VOL. 01` / caption / `01` overlay remain.
- No checkerboard is visible; the asset is a transparent WebP/PNG on the ivory section.
- Hero video, header and other homepage sections were not changed for this update.

## Image source
- **Attached cutout:** `assets/lady_justice_cutout-ce08ae44-ac79-42e1-ba6a-71bdb5259193.png` (source **405 × 608**, already transparent — not the checkerboard preview).
- **Served as:** `frontend/public/home/lady-justice-cutout.webp` (+ `.png`) upscaled to **938 × 1480** (~2× the ~740px desktop display height).
- No higher-resolution version of this same bronze statue was found on warenlaw.com or in the media library.

## Screenshots
- `docs/reports/t059-intro/1440-statue.png` — desktop intro (statue height 740px)
- `docs/reports/t059-intro/390-statue.png` — mobile intro (statue height 450px)
- `docs/reports/t059-intro/1440-vs-design.png` — design (left) vs build (right)
- `docs/reports/t059-intro/intro_design.png` — attached design reference

## Notes
- Soft bottom fade: CSS dual-layer mask + ivory blend (no image edit for the fade).
- Desktop: faint warm halo + thin gold ring + base glow; mobile: halo/ring hidden.
