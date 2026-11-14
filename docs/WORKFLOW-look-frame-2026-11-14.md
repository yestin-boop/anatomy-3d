# Workflow — quiz framing + look picker (2026-11-14)

## Goal
- Quiz camera frames one side of a paired structure so a hand bone (or one deltoid) is easy to see — not the whole body.
- Non-target muscles (and supporting bones) go translucent in muscle test so the target is clear.
- User can pick **X-ray** or **Solid** in the start menu, View, and test. Choice is remembered.

## Steps
1. Frame only the left side when a target has L+R meshes; pad small parts to a hand-sized region; lower the 1.4 / 0.8 distance floors; pause auto-spin while a target is up.
2. Muscle test: target stays solid; other muscles fade (~0.18 opacity); bone underlay stays faint.
3. Add X-ray / Solid chips (menu + View filter bar, which also shows in test). Solid = current study/flesh look. X-ray = translucent ghost + solid highlight.
4. Visual check: scaphoid question tight on one hand; muscle question shows a clear solid target against faded neighbours. Then publish to Pages.

## Files
- `src/scene/ThoraxScene.ts` — framing, look palettes, spin/minDistance
- `src/main.ts`, `src/style.css` — chips, localStorage, quiz filter bar

## Done
- Scaphoid (and similar paired bones) is framed on one hand, not the full skeleton.
- Target muscle reads clearly against transparent neighbours.
- X-ray / Solid works in View and test; View filters and typing still behave.
- `npm test` + `tsc` clean; live Pages serves the new bundle.
