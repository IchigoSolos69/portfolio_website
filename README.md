# Adi Maitre — Ink & Steel

A personal portfolio built with React, TypeScript, Vite, GSAP, and an on-demand Three.js sculpture. Fonts and original SVG illustrations are served locally. The public site does not require credentials or a live GitHub API connection.

## Local development

Use Node.js 22.18+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

The default preview is http://localhost:3000. Use `npm run build` and `npm run preview` to inspect the static production bundle.

## Project catalog

`data/repositories.json` is an allowlisted snapshot of public repositories belonging to IchigoSolos69. `data/projects.ts` adds verified, curated descriptions, tags, original illustration choices, and featured placement.

```sh
npm run projects:sync
```

Refresh before a build when adding repositories. The command paginates GitHub's public API and replaces the snapshot only after a complete successful response. If GitHub is unavailable or rate limited, the last successful snapshot remains usable. New repositories appear with their public metadata and a description-pending label until editorial details are added. This does not overwrite curated project copy.

Private source code, metadata, screenshots, and unreviewed summaries do not belong in this public repository. Private drafts are kept in a separate local review document. Add a reviewed summary only after approval, using `source: 'private'` and `approved: true`, without a private repository URL or internal identifiers. Private source links are never rendered.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

Tests cover the complete public catalog, combined filters, private-draft exclusion, and successful and failed metadata refreshes. The 3D sculpture renders on demand, pauses offscreen, supports keyboard rotation, and falls back to original SVG art when motion is reduced or WebGL is unavailable. The project catalog uses a native modal dialog for keyboard focus containment and Escape dismissal.

## Assets and deployment

Barlow Condensed and Instrument Sans are distributed under their bundled SIL Open Font License files in `public/assets/fonts`. Project illustrations, the steel sculpture, and the brand assets were created for this portfolio; project artwork is illustrative and is not represented as captured application footage.

The generated static site is in `dist/`. Social metadata currently uses the existing canonical domain `https://adimaitre.pages.dev`; update that domain in `index.html` if hosting changes. No deployment is performed by the development or build commands.
