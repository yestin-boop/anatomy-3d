# Workflow — add missing C3–C6 and deferred muscles (2026-11-12)

**Goal:** Add the anatomy Yestin asked to bring back, using real BodyParts3D meshes only. Then plan the next move.

**What we can add (in isa_BP3D_4.0_obj_99):**
- C3–C6: FJ3161, FJ3164, FJ3167, FJ3170 → `vertebra_c3`…`vertebra_c6`
- vastus intermedius: FJ1441 / FJ1441M → `vastus_int_r` / `vastus_int_l`
- iliacus: FJ1422 / FJ1422M → `iliacus_r` / `iliacus_l`
- psoas major: FJ1431 / FJ1431M → `psoas_maj_r` / `psoas_maj_l`
- serratus anterior: FJ1459 / FJ1459M → `serratus_ant_r` / `serratus_ant_l`

**What we cannot add from this pack:**
- latissimus dorsi — not in the BodyParts3D 4.0 parts list or element files
- rectus abdominis — not present (abdomen muscles in this pack are only external oblique)
- Unfused hip — only a single os coxae mesh per side (FJ3152 right, FJ3288 left). Do not invent a geometric split.

**Steps**
1. Extract those OBJs from `/tmp/bp3d/isa_BP3D_4.0_obj_99.zip`. Convert with `obj2gltf` (same as existing extras; no recenter, no pre-rotation). Runtime already applies `rotation.x = -π/2`.
2. Sanity-check: new C3–C6 GLBs should sit in the cervical gap between existing C2 and C7 in the same frame as `vertebra_c7.glb`.
3. Update bone/muscle manifests, `muscle_mesh_map.json`, quiz catalogs (`axialBones.ts`, `muscles.ts`), and View study notes + origin/insertion sites (`viewInfo.ts`). Fix stale copy that says C3–C6 or vastus intermedius are absent.
4. Rebuild `dist`. Do not publish yet.
5. Playtest type-it + Explore View, then publish to GitHub Pages (standing: after a tested playable update).
6. Then plan the next move (View pick polish, Sport, other real BP3D muscles, honest gap on lats/abs/hip).

**Done when:** C3–C6 and the four available muscles are playable in type-it and View; public Pages is updated; next-move plan is written for Yestin.
