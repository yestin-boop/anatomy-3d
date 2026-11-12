# Workflow: View picking (2026-11-13)

Goal: In Explore View, covered muscles and the tight neck are reliably selectable. No invented meshes. Type-it quiz stays unchanged.

## Why it fails today

- Orbit target stays on mid-body (`enablePan = false`, `frameFullBody` target `0,0,0`). Even after selecting C3–C6, `frameMeshes` is not used in View, and its `min` distance of `1.4` is too far for a vertebra.
- `pickAt` returns only the frontmost solid hit. After isolation, peek-through (0.08 m) prefers a nearby *bone*, so a deep muscle under another muscle (vastus intermedius under the other quads; psoas major behind external oblique) is practically unclickable.

## Steps

1. **Click stack + cycle.** `pickAt` (or a new `pickAllAt`) returns unique structures along the ray, keyed by catalog id + side, front to back. Keep same-side and midline hits along the ray (skip the contralateral wall; cap depth at 0.5 m) so a chest tap does not grab the far side, but psoas behind the abdominal cavity still appears. Include ghosted/dim meshes after a selection, not only the auto-preferred bone.
   - A new tap starts at the frontmost structure.
   - A second tap near the same point (about 24 px) cycles to the next item in that stack, wrapping around.
   - Keep `PICK_MOVE_PX` so a drag still orbits, not picks.

2. **Short “also here” list.** When the stack has more than one structure, show a compact HUD chip row (existing View dark HUD, not a new page) listing the stack. Tapping a chip selects that structure. This is the fallback when cycling is unclear.

3. **Frame on selection.** After a View selection, ease the orbit target to the selected mesh center and set distance from its bbox (reuse/adapt `frameMeshes`). Drop the hard `1.4` minimum for small parts so cervical vertebrae can be tight. Neck/head selections should land in a close, readable frame; larger muscles can be a looser frame. Do not snap so hard that the model jumps. `enablePan` stays false. Leave quiz camera behavior alone.

4. **Copy.** Footer can mention tap-to-cycle. Do not change TYPE-it, origin/insertion word labels, or mesh assets.

5. **Build.** `npx tsc --noEmit` and `npm run build`. Do not commit or publish.

## Done check (playtest, then publish — parent, not this coding pass)

- C3–C6: click + tight readable neck frame; adjacent vertebrae selectable.
- Vastus intermedius: reachable via cycle and/or the also-here list from a quad tap.
- Psoas major: reachable the same way through the abdomen/oblique.
- Iliacus and serratus still work. Drag still orbits. Quiz unchanged.
- Then publish to https://yestin-boop.github.io/anatomy-3d/ and ping Yestin once with the link and what to test.

## Out of scope

- Sport track, extra muscles, licensed sources for lats/abs/split hip.
- Inventing or substituting meshes.
- Committing `qa/*.png`, `dist/`, or `node_modules/`.
