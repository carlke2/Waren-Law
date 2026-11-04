# T035: Frontend reset

**Status:** Ready
**Week:** 1
**Priority:** High

## Goal
Delete all visual frontend code and keep the plumbing, so Home starts from zero (ground rule 4).

## Steps
See `docs/prompts/06-AGENT-HOME-PAGE.md`, section 1.

## Done when
- [ ] Components, site layouts and templates, styles, `/_design`, `loading.tsx` and their tests are deleted
- [ ] API client, loaders, slug resolver, consent logic, dictionary, SEO helpers, env handling and test setup are kept
- [ ] `devIndicators: false`, and a minimal placeholder builds
- [ ] Build, lint, typecheck and remaining tests pass; `grep` proof that no old component or style remains

## Files / inputs
- `docs/GROUND-RULES.md`, `docs/design/DESIGN-SPEC.md` v3.4, `docs/design/reference/home-design-v3.dc.html`, `docs/design/reference/home-phone.dc.html`

## Result
_(Filled in by the agent: what was done, files changed, questions or blockers.)_
