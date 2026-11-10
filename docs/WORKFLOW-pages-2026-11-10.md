# Workflow — public GitHub Pages (2026-11-10)

Goal: Give Yestin an iPhone try-link while off home Wi-Fi, via a public GitHub Pages site (same pattern as bonetype).

Steps:
1. Use relative Vite `base: './'` and `assetUrl()` so `/models/...` works under `/anatomy-3d/`.
2. Build `dist/` (about 22 MB). Keep BodyParts3D CC BY 4.0 attribution.
3. Create public repo `yestin-boop/anatomy-3d` (source on `main`, site on `gh-pages`).
4. Enable GitHub Pages and confirm https://yestin-boop.github.io/anatomy-3d/ returns 200.

Done when: the Pages URL loads the type-it app (bones + muscles) from a phone browser.
