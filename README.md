# GT Bailey IT Solutions LLC - Decision Tree

A fully offline decision-tree assistant for home users. The old LLM/chat stack has been removed; everything now ships as static HTML/CSS/JS so it can live on a USB stick, in a zip file, or inside an iframe embed.

## Quick start

1. Open `public/index.html` in any modern browser (Chrome/Edge preferred).
2. Click **Start troubleshooting** and follow the branch that matches the device or symptom.
3. Use **Back**, **Start over**, and **Copy plan** to keep notes while you work with the user.

## Editing the tree

The tree lives inside `public/app.js` (`DECISION_TREE` constant). Each node supports:

- `title`, `summary`, `response`
- optional `tags`, `links`
- nested `children` array for follow-up branches

Add or reorder nodes, then reload the page - no build step is required.

## Embedding

Use the iframe snippet shown at the bottom of `index.html` (also copied into `tech_support_landing (1).html`). Drop it inside Wix, Squarespace, WordPress, or any page builder.

## Portable bundle

Run `npm run portable` to mirror everything from `public/` into `portable/` plus a one-click `Launch GT Bailey IT Solutions LLC.bat`. Copy that folder to removable storage and double-click the batch file to launch the tool offline.

## Maintenance utilities

- `npm run check-links` - verifies that all vendor videos and articles still load (writes results to `reports/link-status.json`).
- `scripts/build-portable.mjs` - helper used by the `portable` script; adjust if you add new asset folders.

## Legacy artifacts

Older LLM-specific files (knowledge base JSON, Express server) are no longer required but remain in the repo for reference. The project now boots entirely from the static assets described above.
