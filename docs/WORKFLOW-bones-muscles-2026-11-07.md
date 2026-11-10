# Workflow — more bones + smart filters → muscles (2026-11-07)

**Goal:** Add upper/lower bones Yestin needs for study; smarter easier filters; then add muscles subject.

**Steps**
1. Map school notes (Skeletal System & Joints + Common Anatomy Structures) → missing common upper/lower bones vs current AXIAL_BONES.
2. Source BodyParts3D GLBs for missing bones; update manifest + quiz catalog + regions/parts.
3. Smart filters UX: clearer groups, sensible presets (e.g. Upper limb / Lower limb / Spine+ribs), fewer taps, counts stay accurate.
4. Rebuild + Mac sync :4173; QA screenshots.
5. Then muscles: data + translucent overlays or mesh pack; enable Muscles subject in menu (bonetype-style).

**Done when:** more UL/LL bones playable; filters feel easy; Mac link works; muscles subject started/playable next slice.

## Shipped 2026-11-07 (bones + filters + muscles slice)

- Bones: 82 quiz entries (was ~55). Added 8 carpals, metacarpals (+ I–V), hand phalanges group, 7 tarsals, metatarsals (+ I–V), foot phalanges group. Patella → sesamoid. Hip stays fused (BP3D has no separate ilium/ischium/pubis meshes).
- Filters: Quick presets All / Upper / Lower / Axial / Hand & wrist / Foot & ankle / Spine & ribs; advanced under “More filters”; presets never empty AND.
- Muscles: 17 named playable (trapezius, SCM, deltoid, pec major, external oblique, biceps/triceps brachii, glut max, rectus femoris, vastus lat/med, biceps femoris, semitendinosus, semimembranosus, gastrocnemius, soleus, tibialis anterior). Pink ghost + highlight. Bones-first load; muscles lazy.
- Deferred (not in this BP3D OBJ pack / next slice): latissimus dorsi, rectus abdominis, vastus intermedius, iliacus, psoas major, serratus anterior; pelvis split.
