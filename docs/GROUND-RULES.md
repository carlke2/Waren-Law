# Ground rules

Agreed 4 November 2026 (decision 0014). Binding for the planner and the agent. They override any brief that conflicts with them.

## 1. The site runs on its own, independent of the agent
- The owner starts the whole system with one command from the repo root: `pnpm start` (production mode). No agent session is needed.
- `pnpm start` builds nothing at run time; `pnpm build` prepares everything first. The runbook shows start, stop and rebuild in a few lines.
- The agent never leaves servers or databases running after a task, and never changes `.env` files without stating exactly which keys and why.

## 2. No visible loading, ever
- **Production mode for every review and demo.** `pnpm dev` is for development only.
- **Next.js dev indicator disabled** (`devIndicators: false`), so no "Rendering/Compiling" badge appears even in development.
- **Every public page is pre-rendered** and arrives complete: no spinners, skeletons, "loading…" text, or content appearing after the page.
- **The browser never fetches page content.** Data is read on the server at build or revalidation time only. Client-side fetching is allowed only for user actions (submitting a form, running a search).
- **No `loading.tsx` / Suspense fallbacks on public pages.**
- If the backend is down, visitors get the last built pages, never an error or loading screen.

## 3. Everything native, nothing embedded
- All forms are our own, handled by our backend: contact, **consultation request** (replaces Microsoft Bookings and Calendly), newsletter, webinar sign-up.
- No third-party embedded forms, booking pages, chat widgets or iframes. Maps load only on click. Tracking loads only after consent.
- WhatsApp is a plain link (`wa.me`), not a widget script.
- A native booking calendar can be added later; external booking embeds are not allowed.

## 4. The frontend starts from zero
- The existing frontend is deleted completely, not restyled. Backend, database, content and API stay.
- No frontend code is written until research, site structure and design are approved.

## 5. Order of work
1. Research current law firm websites (international, African, Kenyan).
2. Comparison and lessons.
3. Site map and page flow: what goes where and why.
4. Design specification + a visual of the Home page, approved by the owner.
5. Build one page type at a time; review after Home before anything else is built.

## 6. The owner approves the look before it spreads
No page is built in a style the owner has not seen and approved.
