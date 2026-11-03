# How we run this project

## Roles
| Who | Does |
|---|---|
| **Owner** (you) | Approves direction, passes briefs to the agent and reports to the planner, talks to the client |
| **Planner** (Claude, chat) | Scopes, plans, writes briefs, reviews reports, keeps `docs/` up to date |
| **Agent** (Claude, in the repo) | Builds exactly what each brief says, tests it, merges it, reports back |
| **Client** (WAREN Law) | Reviews each version, supplies content and access when available (never blocks the build) |

## The loop (every batch of work)
1. **Planner** writes a brief → `docs/prompts/NN-….md` (sent to the owner as a zip of changed planner files).
2. **Owner** extracts the zip into the repo and tells the agent: *"Carry out docs/prompts/NN-….md, then report and stop."*
3. **Agent** creates the task files, builds one branch per task, runs lint + typecheck + tests, merges to `main`, writes `docs/reports/…`, posts the report, stops.
4. **Owner** pastes the report to the planner.
5. **Planner** reviews against the brief, records any decision in `docs/decisions/`, writes the next brief.

## Where things live
| File | Purpose |
|---|---|
| `docs/PLAN.md` | What we build and when (versions, phases, tasks T002–T034) |
| `docs/WORKFLOW.md` | This file: how we work |
| `docs/DIRECTION.md` | Agreed architecture, design, language |
| `docs/STRUCTURE.md` | Folder layout and structure rules |
| `AGENTS.md` | Agent rules + code standards (loaded automatically) |
| `docs/decisions/` | Every decision and why |
| `docs/prompts/` | Every brief given to the agent |
| `docs/tasks/` | One file per task with status and "Done when" |
| `docs/reports/` | Agent reports |
| `docs/audit/` | The WordPress analysis |

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

After each version: client feedback → planner turns it into tasks → next brief.
