# 0001: Rebuild, stack, design and language

**Date:** 3 November 2026
**Status:** Accepted

## Decisions
1. **Full rebuild in new code**, replacing WordPress + Elementor.
2. **Next.js + TypeScript** as the framework and language.
3. **Refine the current brand** rather than create a new identity.
4. **English only** for site content; drop the zh_CN alternate.

## Why
- A code-based site in this repo gives full control, speed and clean SEO, and lets the Claude execution agent work through version-controlled tasks.
- Next.js has strong SEO, static generation and a large ecosystem.
- The gold brand already has recognition; refining it is lower risk than replacing it.
- One language done well beats several done poorly; others can be added later.

## Consequences
- Existing URLs need a redirect map so search rankings are kept.
- Insights articles must be migrated from WordPress to Markdown.
- The firm will edit content through the repo (or a CMS added later) instead of WordPress admin.
