# Workflow: View mode — 2026-11-11

Goal: Add a View / Explore mode: solid (not X-ray) model, click a bone or muscle, side-panel description, and origin/insertion for muscles. Other parts go transparent only after a selection. Do not change type-it quiz visuals.

Steps:
1. Add a View mode entry on the start menu, separate from Combined / See / Hint / Memory.
2. In View, show bones and muscles together in a normal solid look (ivory/off-white bone, natural muscle color — opaque, not the quiz ghost/X-ray style).
3. Click to select a bone or muscle (raycast). A side panel shows name, kind, region, a short description, and — for muscles — origin, insertion, and action. Bones get a short description (location / articulations / notable features).
4. Before any selection, everything stays solid. After a selection, the chosen item stays solid and clearly marked; other items become transparent. Clicking empty space clears the selection and returns to the solid view.
5. For a selected muscle, also mark origin and insertion on the model (labeled points). Text must be standard anatomy. Markers should sit on the mesh as close as these BodyParts3D models allow (use authored attachment notes + nearest points on the relevant muscle/bone meshes). Do not invent false precision.
6. Type-it modes keep the existing translucent/X-ray materials and HUD.
7. Build and leave the preview running on :4173 for a playtest. Do not publish to GitHub Pages (parent will test, then publish).

Files:
- /workspace/anatomy-3d/src/scene/ThoraxScene.ts (solid materials, pick, view presentation, origin/insertion markers)
- /workspace/anatomy-3d/src/main.ts and src/style.css (menu, view HUD / side panel)
- /workspace/anatomy-3d/src/data/viewInfo.ts (descriptions, origin, insertion, action)
- /workspace/anatomy-3d/docs/WORKFLOW-view-2026-11-11.md

Done check:
- Start menu has View; starting it opens a solid full model (bones + muscles).
- Click a muscle or bone: side description appears; others go transparent; origin/insertion text (and markers for muscles) show.
- Clearing the selection restores the solid view.
- Combined / See / Hint / Memory still use the X-ray quiz look and typing HUD.
- `npm run build` passes; preview serves the new build.
