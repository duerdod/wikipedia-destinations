# Wikidestinations

A Wikipedia navigation game: race from one article to another using only the
links inside the pages. Available at https://wikidestinations.okbry.cool 📖 🔎 🧭 🕯

## Stack (v2)

- **Vite + React 19 + TypeScript** — SPA, built to static assets.
- **React Router 7** for client-side routing.
- **Tailwind v4** for styling (tokens live in `src/styles/index.css`).
- **Cloudflare Pages** hosts the static app plus a **Pages Function**.

Article HTML is fetched and cleaned by an edge function
(`functions/api/wiki/[title].ts`): it calls Wikipedia's parse API, transforms
the markup with **HTMLRewriter** (strips tables/infoboxes/citations, keeps only
in-game links), and caches the result at the edge. The client runs a final
**DOMPurify** pass before injecting the HTML — that's the XSS boundary.

Article summaries for the start/destination pickers come straight from
Wikipedia's CORS-enabled REST API (`src/lib/wiki.ts`); they need no processing.

## Develop

```sh
npm install

# Terminal 1 — the edge function (Wikipedia proxy) on :8788
npm run dev:api

# Terminal 2 — the app with HMR on :5173 (proxies /api to :8788)
npm run dev
```

Or run a single production-like server (build + functions + assets):

```sh
npm run preview
```

## Deploy

Cloudflare Pages, connected to this repo:

- Build command: `npm run build`
- Build output directory: `dist`

Functions in `functions/` are picked up automatically. From the CLI:

```sh
npm run deploy
```

The previous Create React App version is preserved at the `v1-cra` git tag.
