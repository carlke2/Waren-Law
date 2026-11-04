## Report: T035 — Frontend reset
Status: Done
Branch / PR: `task/T035-frontend-reset`, fast-forwarded to `main` (`gh` isn't installed)
Summary: Deleted all components, site layouts and templates, styles, `/_design` and the tests for deleted components. The API client, loaders, slug resolver, consent logic, dictionary, SEO helpers, env handling and test setup stay in `frontend/src/lib/`. A placeholder Home builds, and `devIndicators` is off. There were no `loading.tsx` files left to delete.
Done when:
- ✅ Visual code and its tests deleted
- ✅ Plumbing kept
- ✅ `devIndicators: false`, placeholder builds
- ✅ Build, lint, typecheck and remaining tests pass (frontend 49, import 18, backend suite green). Proof: `frontend/src/components` and `frontend/src/styles` no longer exist, and `grep -rnE "@/components|@/styles|text-on-dark|bg-navy|gold-500" frontend/src frontend/tests` finds nothing.
Files changed: `frontend/src/app/**`, `frontend/src/components/**` (deleted), `frontend/src/styles/**` (deleted), `frontend/src/lib/content/{filter-chip,team,insights}.ts`, `frontend/src/lib/seo/schema.ts`, `frontend/next.config.ts`, `frontend/tests/*` (7 deleted)
Dependencies added: none
Decisions made: none
Questions / blockers: none
Suggested next step: T036
