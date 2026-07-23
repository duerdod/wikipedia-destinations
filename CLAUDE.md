# CLAUDE.md

Guide for working on this repo. Terse and declarative — read it before making changes.

## What this is

Wikidestinations: a Wikipedia navigation game. Race from one article to another using only the links inside the pages. Client-side SPA plus one Cloudflare Pages Function. No database, no auth.

## Stack

Vite 8, React 19, TypeScript, React Router 7, Tailwind v4, DOMPurify. Deployed to Cloudflare Pages (static assets + Pages Functions). The old Create React App version is preserved at the `v1-cra` git tag.

## Commands

- `npm run dev` — Vite + HMR on :5173. Proxies `/api` → :8788.
- `npm run dev:api` — wrangler runs the Function on :8788. Run it alongside `dev` or article loading fails.
- `npm run build` — `tsc -b` + `vite build` → `dist/`.
- `npm run typecheck` — `tsc -b` (the root tsconfig is solution-style; `--noEmit` alone checks nothing).
- `npm run preview` — build + `wrangler pages dev dist` (full stack, one process, no HMR).
- `npm run deploy` — build + `wrangler pages deploy dist`.

Function code lives in `functions/` and has its own `functions/tsconfig.json` (Workers types). Check it with `npx tsc -p functions/tsconfig.json`.

## Data flow

- **Article HTML**: client → `GET /api/wiki/:title` (`functions/api/wiki/[title].ts`) → fetches Wikipedia's parse API server-side with a real User-Agent → transforms with HTMLRewriter → caches via `caches.default` → returns JSON `{ title, pageid, displaytitle, html, disambiguation }`. The client runs a final `DOMPurify.sanitize` before injecting — that is the XSS boundary, not the edge transform.
- **Summaries** (start/destination pickers): client → Wikipedia REST summary directly (CORS-enabled, no processing needed). `src/lib/wiki.ts` `getSummary`. Its `type` field ("standard" | "disambiguation" | …) drives disambiguation detection in the form.
- **State**: `GameContext` (steps, articles, crumbs, win detection) and `PopupContext` (a single active popup id). `src/context/`.

## Key files

- `functions/api/wiki/[title].ts` — the edge transform: `DROP_SELECTORS`, `CUT_SECTION_IDS`, link rules, cache.
- `src/lib/{wiki,types,disambiguation}.ts`
- `src/hooks/useWikiArticle.ts` — fetch + DOMPurify pass.
- `src/components/Article.tsx` — renders article, intercepts in-article link clicks, win detection, disambiguation picker.
- `src/components/StartForm.tsx` — start form; disambiguation + not-found handling.
- `src/components/Popup.tsx` — portal modal, CSS transition (no animation library).
- `src/components/ui.tsx` — `Button` / `ButtonLink` / `ButtonRow` / `Card`.
- `src/styles/index.css` — Tailwind `@theme` tokens, injected-article CSS, shimmer skeleton.

## Conventions

- Styling is Tailwind utilities. Design tokens live in `index.css` `@theme`. Colour scales keep Wikipedia-theme tint indices: `blue-0` is the base hue, higher numbers lighter (same for `red`/`green`/`beige`); `paper` = #f7f7f7, `ink` = #042f4b. Heading font is `font-title`.
- Injected Wikipedia HTML can't carry utility classes, so it is styled by descending from `.fetched-article` in `index.css`.
- Popups: render `<Popup id="x">`, control visibility with `usePopup().showPopup('x')` / `hidePopup()`. Only one popup shows at a time.
- Dynamic Tailwind classes must be full literal strings (no string interpolation of class fragments) or they get purged — see the `COLOR` map in `ui.tsx`.

## Edge transform rules

- `DROP_SELECTORS`: tables, figures, thumbnails, infoboxes, navboxes, hatnotes, edit-section links, inline `sup.reference` markers, TOC, reference lists.
- `CUT_SECTION_IDS`: on the first trailing-section heading (`See_also`, `References`, `External_links`, `Further_reading`, `Notes`, …) it removes that heading and everything after it (stateful `tail.cutting` flag over `.mw-parser-output > *`). All these sections are trailing per Wikipedia layout convention.
- Links: keep only `/wiki/…` without a colon (excludes `File:`/`Help:`/`Category:` etc.) and in-page `#anchors` (not `#cite`). Everything else is unwrapped to plain text.
- Inline `style` attributes stripped.

## Gotchas

- Wikipedia `displaytitle` is HTML (`<span>…</span>`). Use the plain `title` field for the heading and crumbs.
- Step semantics: `START_GAME` resets steps to 0; landing on the departure is step 1; disambiguation landings are NOT counted (`Article.tsx`). `Article` uses a `counted` ref so StrictMode's double-invoked effects don't double-count.
- Disambiguation: detected via `summary.type` (form) and parse `properties.disambiguation` (edge). The picker is `DisambiguationPopup` (`options` + `onSelect`) — reused by the form (fill + begin) and the article (navigate).
- wrangler sometimes serves a stale compiled worker. Fix: `rm -rf .wrangler`, kill stray `workerd` on :8788, restart.
- The `_redirects` SPA rule (`/* /index.html 200`) makes wrangler log a benign "infinite loop" warning; it still serves `index.html` for client routes.

## Deploy notes

- Cloudflare Pages project `wikipedia-destinations` on the `erik.pehrers@norce.io` account.
- Custom domain `wikidestinations.okbry.cool` is NOT attached yet.
- Deploys are manual (`npm run deploy`); no Git auto-deploy is configured.
- See `PROJECT_LOG.md` (gitignored) for current status and open issues.
