# WAREN LAW WEBSITE REBUILD — AGENT BRIEF 01b: RECONCILE PLANNER FILES

Thanks for the setup. Answers to your questions, then one short job.

## Answers
1. **Yes, the planner's files existed** but had not been pushed. The owner has now copied them into the repo folder: `AGENTS.md`, `CLAUDE.md`, `README.md` and the whole `docs/` folder. **These planner versions are the authority** and replace the versions you wrote.
2. `docs/PLAN.md` stays a placeholder for now. The decision template is `docs/decisions/_TEMPLATE.md` (planner's); remove your `docs/decisions/template.md`.
3. **History module:** records every admin create, update, delete, publish and unpublish: who, when, which record, and a before/after snapshot. The admin can view any record's history and restore an earlier version (the restore is itself recorded). See `docs/STRUCTURE.md` rule 10.
4. **Node/pnpm:** approved: keep `.nvmrc` at 26 and your extra `.gitignore` entries. Keep `packageManager` pinned, but confirm the pinned pnpm version actually exists (`npm view pnpm version` or the pnpm releases page) and correct it to the latest published version if not. The owner will install Node 26 and pnpm.
5. **`.env.example` files:** yes, each app's scaffold task will add them. Nothing to do now.

## Do now (no installs, no code, no website access)
1. If `setup/project-structure` is not yet in `main`, merge it into `main` (fast-forward if possible).
2. On a branch `setup/reconcile-planner-docs`, check `git status`: the planner's `AGENTS.md`, `CLAUDE.md`, `README.md` and `docs/` should now be the ones in the working tree. Keep them as they are.
3. Delete `docs/decisions/template.md`. Remove `.gitkeep` files from `docs/` subfolders that now contain files.
4. Keep all your root workspace files (`package.json`, `pnpm-workspace.yaml`, `.gitignore`, `.editorconfig`, `.nvmrc`) and the whole folder skeleton.
5. Update `backend/src/modules/history/README.md` to match answer 3.
6. Compare the folder tree with `docs/STRUCTURE.md`. Fix any folder that is missing. Do **not** create files the structure marks as later (e.g. `docker-compose*.yml`, `Dockerfile`, `.env.example`, `schema.prisma`); just list them in your report as "planned, not yet created".
7. Make sure `README.md`'s folder table matches the actual folders.
8. Commit `Reconcile planner docs with project structure`, push, and merge into `main` (open a pull request instead if you can).
9. Report in the standard format (task ID `SETUP-01b`), then **stop**. Do not start T001 yet.
