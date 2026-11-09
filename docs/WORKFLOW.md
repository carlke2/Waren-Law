# How we run this project

## Roles
| Who | Does |
|---|---|
| **Owner** (you) | Approves direction, passes briefs to the agent and reports to the planner, talks to the client |
| **Planner** (Claude, chat) | Scopes, plans, writes briefs, reviews reports, keeps `docs/` up to date |
| **Agent** (Claude, in the repo) | Builds exactly what each brief says, tests it, merges it, reports back |
| **Client** (WAREN Law) | Reviews each version, supplies content and access when available (never blocks the build) |

## The loop (every batch of work)
1. **Planner** writes the brief and sends it to the owner.
2. **Owner** gives that brief to the agent.
3. **Agent** builds on one branch, runs lint, typecheck and tests, merges to `main`, and reports back in chat.
4. **Owner** pastes the report to the planner.
5. **Planner** reviews against the brief, records any decision in `docs/decisions/`, and writes the next brief.

Earlier briefs and build reports are in git history. The index of what is in `docs/` now is [README.md](README.md).

## Where things live
| File | Purpose |
|---|---|
| `docs/README.md` | Index of the planning documents |
| `docs/PLAN.md` | What we build and when |
| `docs/WORKFLOW.md` | This file: how we work |
| `docs/DIRECTION.md` | Agreed architecture, design, language |
| `docs/STRUCTURE.md` | Folder layout and structure rules |
| `docs/GROUND-RULES.md` | How the site runs |
| `docs/FIRM-REVIEW.md` | Items still waiting for the firm |
| `AGENTS.md` | Agent rules and code standards |
| `docs/decisions/` | Every decision and why |
| `docs/design/` | Design specification and reference assets |
| `docs/audit/` | The WordPress analysis |
| `docs/seo/` | URL inventory and redirects |

## Rules that never change
- `main` is always working: nothing merges with failing lint, typecheck or tests.
- One branch per task (`task/T0XX-short-name`).
- Code standards: minimal comments, nothing hard-coded (decision 0006).
- Secrets only in `.env` files on the machine/server; never in the repo or chat.
- Client inputs never block the build: defaults first (decision 0004), swapped in when the client delivers.
- Scope changes go through a decision record.

## Version rhythm
| Version | Goal | Client sees |
|---|---|---|
| **V1** (Thu 5 Nov) | Full public website with real content, on staging | Live staging link |
| **V2** (≈ 2 weeks) | Admin panel, media, newsletter, history | Admin demo; content editing |
| **V3 / Launch** | Content review, QA, production server, DNS switch | warenlaw.com live |

After each version: client feedback → planner writes the next brief.
