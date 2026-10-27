# Adi Maitre — Ink & Steel

A personal portfolio built with React, TypeScript, Vite, GSAP, and an on-demand Three.js katana. Fonts, original SVG illustrations, and the public project capture are served locally. Saved project content is available immediately; a server API refreshes commit dates and public README excerpts without giving credentials to the browser.

## Local development

Use Node.js 22.18+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

The default preview is http://localhost:3000. Use `npm run build` and `npm run preview` to inspect the production bundle. Both Vite servers include the local `/api/projects` endpoint.

## Project catalog

`data/repositories.json` is an allowlisted snapshot of public repositories belonging to IchigoSolos69. The latest refresh contains twenty public repositories and twelve authorized private summaries. `data/projects.ts` adds presentation, tags, and the six-project featured order. `data/public-readme-insights.ts` supplies reviewed descriptions and scope limitations as fallbacks. Three repositories have no root README, so their descriptions use inspected source.

`data/project-activity.json` holds saved commit dates and optional public README excerpts. Dates come from the most recent commit's **committer timestamp on the default branch**, rather than repository update or push time. Every archive row, selected project, and public dialog displays its date. Each project card includes a short progress note beneath its content; stages describe documented scope rather than completion percentages.

```sh
npm run projects:sync
```

Refresh before a build when adding public repositories. The command loads `.env.local`, paginates GitHub's public repository API, and replaces the repository snapshot only after a complete successful response. It also saves refreshed commit dates, README descriptions, and opted-in public summaries, retaining safe content when upstream requests fail. New public repositories receive README-based descriptions when suitable documentation exists; otherwise their descriptions await review. Curated source fallbacks and presentation choices remain available.

### Automatic updates and server configuration

`server/project-content.mjs` is a small source-text content adapter used by `server/project-api.mjs`, Vite, the Cloudflare Pages Function, and the catalog sync command. It requires no AI service or additional dependencies. The browser requests `/api/projects` on load and every 15 minutes while visible, with a visibility-triggered retry. Server data refreshes every 15 minutes with a token, or hourly without one to respect GitHub's unauthenticated rate limit. Requests are coalesced and limited to four upstream requests at a time. Server-only ETags support conditional requests; unchanged content is reused on `304`. Cached values and the bundled snapshot preserve safe content during timeouts, rate limits, missing public READMEs, and permission errors. A confirmed empty repository displays “No commits yet”; unavailable dates display “Date unavailable.”

Set these **server-side** values:

- `GITHUB_TOKEN`: a fine-grained token with **Contents: read** access to the intended repositories. `GH_TOKEN` is accepted as an alternative. Never use a `VITE_` prefix or put a token in project data.
- `PRIVATE_PROJECT_REPOS`: a JSON object mapping approved neutral project IDs to private repository names under the configured owner. Only the twelve existing display IDs are accepted. Private names remain in environment configuration, never in the public catalog.

For local work, copy `.env.example` to `.env.local` (or edit the existing local file), then restart Vite after changes. For Cloudflare development, use an ignored `.dev.vars` file following `.dev.vars.example`. On Cloudflare Pages, configure the token as a secret and the mapping as a server environment value, then deploy the project with its `functions/` directory and `dist/` as the output directory. Uploading `dist/` alone to a static host provides the saved catalog only; automatic refresh requires the API function. See [Cloudflare Pages secrets](https://developers.cloudflare.com/pages/functions/bindings/#secrets).

Commit authors, messages, SHAs, ETags, and error bodies are not returned. Public README extraction is bounded plain text, without executable HTML, setup commands, documentation preambles, or roadmap items presented as implemented features. The first suitable overview sentence supplies a short summary of up to 240 characters, shortened only at word boundaries. The shared project model updates selected work, archive/search, dialog overviews, features, and documented progress together. Commit-only changes update dates without inventing capabilities. `contentSource` and `contentCheckedAt` identify content provenance and the last successful validation; failed checks do not advance verification dates. Engineering notes remain separately curated and show their review date.

### Private summaries

Published private entries contain a neutral id, public display title, brief summary, brief progress statement, source label, optional status label, and presentation/featured-order fields. The API refreshes commit dates and may read one explicitly public file: `portfolio.public.json` at the private repository's root on its default branch. Private READMEs and source files are never fetched. Private paths and URLs, code, implementation metadata, staff/customer information, and screenshots stay outside public source and the browser bundle.

The approved file must use this exact opt-in format; `progressBrief` and `status` are optional:

```json
{
  "version": 1,
  "publish": true,
  "summary": "A brief description intended for the public portfolio.",
  "progressBrief": "Prototype under review.",
  "status": "Prototype"
}
```

Only these five keys are accepted. The file is limited to 4 KB, the summary to 280 characters, and the progress brief to 160. Values must be plain text without links, markup, or internal details. Status values are `Prototype`, `Concept`, `Concept website`, or `Demo data`. The server publishes only the approved display fields plus content source/check metadata. Unknown fields, invalid files, `publish: false`, and confirmed missing files restore the original reviewed summary. Temporary network, permission, rate-limit, or server errors retain the last safe text and its check date. Preparing templates does not change any private repository; add the corresponding file before automatic private description updates become available.

`Project` is a discriminated union of `PublicProject` and `PrivateProjectSummary`. Public-only detail fields cannot be added to private entries through the typed catalog. Future private additions must use the same summary-only shape and be authorized before inclusion. Private work is searchable through the collection filter and text search; technology filters match public projects only.

## Educational project experiences

Eighteen public projects have an **Overview** and a lazily loaded **Educational demo** tab. Newly discovered repositories remain browsable with their documentation and source links. Every demo is explicitly labelled as a simplified illustration and uses fictional records, fixed sample data, or teaching models. None starts an ML model, training job, external browser, provider session, or location collector. Six public projects also include dated engineering notes separating reviewed evidence from research or pilot limitations. Private entries remain summary-only and cannot open project dialogs or demos.

**Seven questions**, between Selected Work and the archive, is an optional game based on the Number Guessing Game project. It loads only after an explicit Start action and shares its component with that project's educational tab. Think of a number from 1 to 100, answer seven cards, then explore the binary explanation after the reveal. Undo, Restart, keyboard controls, a rapid-input guard, invalid-answer recovery, and reduced-motion transitions are included. There is no timer, sound, automatic play, or stored score.

TT Trajectory Engine leads Selected Work. Its real desktop capture includes zoomable callouts for source/model controls, indexed frame review, and tracking overlays. The other educational visuals are original illustrations, not product screenshots or performance evidence.

Share a public project with `?project=tt-trajectory-engine&view=demo`. The `view` value is `overview` or `demo`; archive search uses `q`, `category`, and `technology`. Dialogs retain demo state when switching tabs and reset when closed. Browser Back/Forward closes and reopens project views, while direct-link closing stays on the portfolio. Unrelated URL parameters and section hashes are preserved.

Sticky section navigation, clickable skill technologies, `/` search focus, and copy-email/project-link controls support quick browsing. The slash shortcut does not intercept form editing or an open dialog. Clipboard failures show selectable text. Playback is user-triggered and pauses when hidden, offscreen, or reduced motion is enabled; manual stepping remains available.

Explainer metadata lives in `data/project-experiences.ts`. Interactive modules in `components/explainers/` are loaded only after a demo is opened. SVG diagrams and data tables scroll internally on narrow screens. The GitHub API format and private summary whitelist are unchanged.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

Tests cover the catalog, featured order, private field whitelist, combined filters, concept labels, refresh failures, activity merging, committer dates, README extraction, conditional requests, honest content freshness, approved-file opt-in/withdrawal, and private response exclusion. Game tests cover every number from 1 to 100, Undo/Restart, inconsistent combinations, and stale rapid inputs. The katana renders on demand, pauses offscreen, supports keyboard rotation, and falls back to original SVG art for reduced motion or unavailable WebGL. Native public-project dialogs contain keyboard focus and support Escape; private projects remain summary-only.

Validate the Functions bundle separately using the Wrangler version from Pages build logs:

```sh
npx --yes --package wrangler@3.114.17 wrangler pages functions build functions --outfile .wrangler/build/_worker.js
```

This compiles locally without deploying. The small CommonJS adapter in `server/project-data.cjs` lets Node and the older Pages bundler load the same JSON catalogs without unsupported import-attribute syntax.

## Assets and deployment

Barlow Condensed and Instrument Sans use the bundled SIL Open Font License files in `public/assets/fonts`. Illustrations, the katana, and brand assets were created for this portfolio. Explanatory artwork is illustrative; TT Trajectory Engine media is an actual desktop capture from its public repository.

The browser build is in `dist/`. Social metadata uses `https://adimaitre.pages.dev`; update that domain in `index.html` if hosting changes. Development and build commands perform no deployment.
