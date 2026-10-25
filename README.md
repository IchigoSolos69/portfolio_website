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

`data/repositories.json` is an allowlisted snapshot of public repositories belonging to IchigoSolos69. `data/projects.ts` adds descriptions, tags, illustration choices, and the six-project featured order. `data/public-readme-insights.ts` contains reviewed public descriptions, capabilities, limitations, and progress briefs. Three repositories have no root README, so their descriptions use inspected source. Twelve authorized private entries contain brief summaries only.

`data/project-activity.json` holds saved commit dates and optional public README excerpts. Dates come from the most recent commit's **committer timestamp on the default branch**, rather than repository update or push time. Every archive row, selected project, and public dialog displays its date. A progress list covers all 30 projects at the very bottom; stages describe documented scope rather than completion percentages.

```sh
npm run projects:sync
```

Refresh before a build when adding public repositories. The command loads `.env.local`, paginates GitHub's public repository API, and replaces the repository snapshot only after a complete successful response. It also saves refreshed commit dates and public README excerpts, retaining existing fields when upstream requests fail. New public repositories appear with public metadata and a description-pending label until editorial details are added. Refreshing never overwrites curated descriptions or private summaries.

### Automatic updates and server configuration

`server/project-api.mjs` is shared by Vite and the Cloudflare Pages Function in `functions/api/projects.ts`. The browser requests `/api/projects` on load and every 15 minutes while visible, with a visibility-triggered retry. Server data refreshes every 15 minutes with a token, or hourly without one to respect GitHub's unauthenticated rate limit. Requests are coalesced and limited to four upstream requests at a time. Cached values and the bundled snapshot preserve content during timeouts, rate limits, missing READMEs, and permission errors. A confirmed empty repository displays “No commits yet”; unavailable dates display “Date unavailable.”

Set these **server-side** values:

- `GITHUB_TOKEN`: a fine-grained token with **Contents: read** access to the intended repositories. `GH_TOKEN` is accepted as an alternative. Never use a `VITE_` prefix or put a token in project data.
- `PRIVATE_PROJECT_REPOS`: a JSON object mapping approved neutral project IDs to private repository names under the configured owner. Only the twelve existing display IDs are accepted. Private names remain in environment configuration, never in the public catalog.

For local work, copy `.env.example` to `.env.local` (or edit the existing local file), then restart Vite after changes. For Cloudflare development, use an ignored `.dev.vars` file following `.dev.vars.example`. On Cloudflare Pages, configure the token as a secret and the mapping as a server environment value, then deploy the project with its `functions/` directory and `dist/` as the output directory. Uploading `dist/` alone to a static host provides the saved catalog only; automatic refresh requires the API function. See [Cloudflare Pages secrets](https://developers.cloudflare.com/pages/functions/bindings/#secrets).

Commit authors, messages, SHAs, and error bodies are not returned. Public README extraction is bounded plain text, without executable HTML, setup commands, or roadmap items presented as implemented features. Current excerpts can update the overview, feature list, and documented progress; reviewed scope limitations remain visible in project dialogs.

### Private summaries

Published private entries contain a neutral id, public display title, brief summary, brief progress statement, source label, optional status label, and presentation/featured-order fields. The API adds only a last-commit timestamp and availability state. The UI shows the title, summary, **Private** tag, date, and any prototype or concept status. Private READMEs are never fetched. Private paths and URLs, code, implementation metadata, staff/customer information, and screenshots stay outside public source and the browser bundle.

`Project` is a discriminated union of `PublicProject` and `PrivateProjectSummary`. Public-only detail fields cannot be added to private entries through the typed catalog. Future private additions must use the same summary-only shape and be authorized before inclusion. Private work is searchable through the collection filter and text search; technology filters match public projects only.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

Tests cover the catalog, featured order, private field whitelist, combined filters, concept labels, metadata refresh failures, activity merging, committer dates, README extraction, caching, and private response exclusion. The katana renders on demand, pauses offscreen, supports keyboard rotation, and falls back to original SVG art for reduced motion or unavailable WebGL. Native public-project dialogs contain keyboard focus and support Escape; private projects remain summary-only.

## Assets and deployment

Barlow Condensed and Instrument Sans use the bundled SIL Open Font License files in `public/assets/fonts`. Illustrations, the katana, and brand assets were created for this portfolio. Explanatory artwork is illustrative; TT Trajectory Engine media is an actual desktop capture from its public repository.

The browser build is in `dist/`. Social metadata uses `https://adimaitre.pages.dev`; update that domain in `index.html` if hosting changes. Development and build commands perform no deployment.
