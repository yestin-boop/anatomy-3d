# Workflow: Lateral ankle sprain learn-and-quiz (first Sport/Rehab slice)

Date: 2026-11-24
Repo: https://github.com/yestin-boop/anatomy-3d
Live: https://yestin-boop.github.io/anatomy-3d/
Start from current main. Open a branch and a PR. Do not merge or publish to GitHub Pages.

## Goal

Ship one playable module: a lateral ankle sprain learn-and-quiz on the existing Vite + TypeScript + Three.js app. Students read a real-situation scenario, watch a short animation of the injury movement on our 3D model, tap the injured ligaments on the model, and type their names. Quality first. This is the first Sport/Rehab slice, not the whole system, and not the item-2 UI redesign.

## Locked clinical content (do not invent or contradict)

Primary sources are the attached HPHS4107 course-note extracts (Mechanism of Injury and Physical Assessment). Do not add clinical claims from the open web. If a fact is not in these notes, leave it out.

From TOTAPS / common injuries:
- A sprain injures ligament (bone-to-bone). Example: twisting ankle injury.
- Inversion of the ankle puts the lateral ligaments under high tension, leading to sprains; the notes name ATFL and CFL.
- Mechanism example: inversion plantarflexion (foot rolling inward, often with the foot pointed down).
- Ligament sprain grades in the notes: Grade I micro-tearing (~2–4 weeks), Grade II partial tear (~4–12 weeks), Grade III complete tear (~3–6+ months; may require surgery).
- TOTAPS Touch: with consent, palpate from away from the painful site; note tenderness, warmth, swelling.

From the Week 1 SOAP ankle-sprain case (use this as the learn scenario, you may tighten the wording for the UI but keep the facts):
- A soccer player is cutting, the foot rolls, they hear a pop, sharp pain on the outside of the ankle, difficulty bearing weight.
- Mechanism of injury: acute inversion and plantarflexion of the right ankle.
- Observation: mild swelling over the lateral malleolus and ATFL area; no obvious deformity.
- Palpation: point tenderness over the ATFL; distal fibula non-tender; deltoid ligament on the medial side non-tender.
- Course impression in the notes: Grade II inversion sprain of the right ankle, with likely involvement of the anterior talofibular ligament (ATFL).
- Immediate management in the notes: POLICE — Protect, Optimal Loading, Ice, Compression, Elevation.

Quiz answers to support:
- Which ligaments are at risk / typically injured in this lateral (inversion) ankle sprain? Accept anterior talofibular ligament / ATFL as the primary answer. CFL / calcaneofibular ligament is also at risk per the notes (lateral ligaments under tension). Do not mark the deltoid ligament correct for this mechanism. Do not require PTFL unless the notes name it for this mechanism (they emphasize ATFL and CFL).
- Tap-to-identify: student should tap ATFL (and may also be asked to tap CFL). Tapping the deltoid / medial side is wrong for this case.
- Palpation item: tap the ATFL region (the tender site in the case). Distal fibula and the deltoid are the non-tender structures in the case — those are useful wrong targets, not correct palpation answers for the injured ligament.
- Type-it accepted aliases should include full names and common abbreviations (ATFL, CFL) using the existing answer-matching style.

## Animation (honest limit)

Our meshes are static, unrigged BodyParts3D / Z-Anatomy GLBs. Animate by moving the existing ankle and foot bones through inversion and plantarflexion (kinematic joint motion). Do not invent a rigged character, muscle morphs, or made-up soft-tissue deformation. A short, clear, replayable motion of the right ankle is enough. Bones we already have include tibia, fibula, talus, calcaneus, and the other foot bones.

## Ligament meshes (do not invent)

The current pack has bones, muscles, and cartilage only — no ligaments. For tap-to-choose to feel like touching the ligament, try to add licensed meshes for ATFL, CFL, and (if present and useful as a distractor or completeness) the deltoid, from Z-Anatomy (CC BY-SA 4.0, derived from BodyParts3D, CC BY-SA 2.1 JP) — the same path used earlier for latissimus dorsi and rectus abdominis. Fit them to our existing skeleton and visually verify attachments (ATFL: anterior lateral malleolus to the talar neck; CFL: tip of the lateral malleolus down/back to the calcaneus). Attribute in the existing attribution files. Share-alike applies to added meshes. If a mesh does not fit cleanly, do not invent geometry; fall back to clearly documented landmark hit-targets on the existing bones (e.g. the soft area just anterior to the lateral malleolus for ATFL) and still require typing the ligament name.

Do not change unrelated pack contents. Do not invent cartilages or split the hip. Do not commit `qa/*.png`.

## Steps

1. Add a start-menu entry for this module (a Rehab / case item is fine). Keep the existing Learn, quiz levels, View, and Common bones. Do not redesign the whole app in this PR; the new screens should still be clear, comfortable to read, and nice to use on iPhone and desktop.
2. Learn: present the locked soccer scenario; show the 3D right ankle; play the short inversion + plantarflexion animation; name and highlight the ligaments (or landmarks).
3. Quiz: at least (a) type the injured / at-risk ligament name(s), and (b) tap the correct ligament(s) on the model. A short palpation tap (ATFL region, not the deltoid or distal fibula) is valuable if it stays simple. Reuse the native iOS keyboard rules already in the app: the big word stays the answer display; autocomplete, autocorrect, and spellcheck off; Prompt and Skip lift above the keyboard; desktop typing unchanged.
4. Add tests and run the existing suite. You own real-scene / screenshot QA with the repo's QA_ASSERT harness and table. Check iPhone (390×844), at least one landscape or iPad size, and desktop, both with and without a simulated keyboard inset where type-it is used. The ligaments or landmarks must be tappable and visibly the intended structures, not the wrong side of the ankle.
5. Open a PR. Do not merge. Report what fitted, what fell back to landmarks, test counts, and QA results.

## Files (expected areas; investigate and decide the exact shape)

- `src/main.ts`, `src/style.css`, start-menu / HUD
- `src/scene/ThoraxScene.ts`, framing, picking
- `src/data/` for a small case/quiz catalog (new file is fine)
- `src/data/answerMatch.ts` if aliases need wiring
- `public/models/` plus attribution files only if licensed ligament meshes are added
- `docs/WORKFLOW-ankle-sprain-2026-11-24.md` — add this workflow to the PR
- tests and the existing QA harness

## Done check

- Playable learn + quiz for this one case, reachable from the start menu.
- Scenario and feedback match the locked facts above.
- A short inversion + plantarflexion animation plays on our model.
- Student can tap the correct ligament (or honest landmark) and type the name.
- Ligament meshes are licensed, fitted, and attributed — or the landmark fallback is clearly used, not fake meshes.
- iPhone and desktop remain typable and readable; Skip / prompt still lift above the keyboard.
- Tests pass; your QA table is in the PR; no `qa/*.png` committed.
- PR is open and is not merged.
