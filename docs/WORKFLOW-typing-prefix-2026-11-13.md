# Workflow — type-it prefix-alias early success

Goal: stop Memory (and See / Hint / Combined) from marking an answer correct mid-word when the typed text is a short accepted alias that is a proper prefix of a longer accepted name.

## Steps
1. Change live matching in `src/data/axialBones.ts` (`answersMatch`) and `src/data/muscles.ts` (`muscleAnswersMatch`) so character-by-character success only fires when the compact typed string equals an accepted alias that is **not** a proper prefix of a longer accepted name for that item.
2. Still accept those short aliases on Enter / Done (wire this; hiddenInput currently `preventDefault`s Enter).
3. Keep `firstWrongIndex` as-is if a prefix of any accepted name is already treated as not-wrong.
4. Add unit coverage for muscle cases (`pectoralis` mid `pectoralis major`, `biceps` mid `biceps brachii`, `gastroc` mid `gastrocnemius`) and bone cases (`sternum` vs body of sternum, `frontal` vs frontal bone, `manubrium`, and any other short alias that prefixes a longer official name). Confirm full official names still succeed live, and short aliases succeed only after Enter/Done.
5. Rebuild and refresh the :4173 preview. Playtest or script the matcher; no need to change View, filters, or meshes.
6. After the matcher is verified, commit source only (no `qa/*.png`), push `main`, deploy `gh-pages` with the usual worktree + keep `.nojekyll` path, and wait until the live index references the new bundle before reporting done.

## Files
- `src/data/axialBones.ts`
- `src/data/muscles.ts`
- `src/main.ts` (Enter / Done)
- tests as appropriate under the existing test layout, or a small node script if there is none
- this workflow doc

## Done check
- Typing `pectoralis` / `biceps` / `gastroc` mid-word does not auto-succeed in Memory (or other modes).
- Full names still auto-succeed when complete.
- Short aliases still succeed on Enter / Done.
- Same rule for bones.
- Preview :4173 serves the new dist; Pages is live only after the new JS hash is what the public index references.
