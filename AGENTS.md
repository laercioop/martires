# Repository Guidelines

## Project Structure & Module Organization

This is a buildless HTML/CSS/JavaScript atlas published at `/martires/` on GitHub Pages.

- `index.html`, `style.css`, `app.js`: interface, styles, map behavior, and cumulative timeline.
- `assets/`: vendored Leaflet, fonts, licenses, and fallback cartography.
- `data/martyrs.json`: normalized public snapshot; `reviewed.json`: editorial corrections and additions; `wikidata.raw.json`: original response for auditing.
- `scripts/`: SPARQL query, Python importer, and data validator.
- `docs/`: source research and browser-validation notes.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`: product requirements and visual system.
- `.github/workflows/pages.yml`: validation and deployment.

## Build, Test, and Development Commands

No dependency installation or build step is required. Use Python 3, Node.js, and `curl` for data updates.

- `npm run dev`: serve locally at `http://127.0.0.1:4173`.
- `npm run check`: check JavaScript syntax and validate identifiers, dates, coordinates, sources, and required assets.
- `npm run data:update`: download Wikidata results and regenerate snapshots while preserving editorial overrides.
- `python scripts/import-wikidata.py --input data/wikidata.raw.json`: regenerate from the saved response without downloading.

## Coding Style & Naming Conventions

Use plain browser JavaScript, camelCase identifiers, kebab-case HTML IDs/classes, and relative asset paths compatible with the Pages subdirectory. Keep interface text in Brazilian Portuguese. Follow neighboring formatting; use two-space indentation for new HTML/CSS/JavaScript blocks and four spaces for new Python blocks. No formatter or linter is configured. Avoid unrelated reformatting and edits to vendored libraries. Consult `DESIGN.md` before interface changes.

## Testing Guidelines

Run `npm run check` before submitting. There is no committed browser-test framework or coverage threshold. For interaction changes, manually verify Jerusalem at c. 36, cumulative map expansion, playback, timeline keyboard controls, sidebar visibility/focus, filters, and shared URLs. Check desktop and mobile layouts. Record relevant results in the PR; see `docs/VALIDACAO.md`.

## Data Integrity

Make editorial changes in `data/reviewed.json`, regenerate, and inspect the diff. Preserve source links, approximate dates, and review status. Never substitute birthplace for death location or treat a feast day as the death date. Imported records remain unreviewed until explicitly checked.

## Commit & Pull Request Guidelines

History currently contains one imperative English subject: `Build cumulative martyrdom atlas with map and timeline`; no stricter convention exists. Use concise, action-oriented subjects. PRs should explain behavior changes, link relevant issues, report validation, and include desktop/mobile screenshots for UI changes. Document provenance for data changes. Every push to `main` automatically deploys; never commit secrets or local QA artifacts.
