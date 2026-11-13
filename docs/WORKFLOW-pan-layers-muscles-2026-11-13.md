# Workflow — pan, muscle layers, and more muscles (2026-11-13)

**Goal:** After Yestin tried View picking, add three things: freer camera pan, a bones/muscles/both filter plus muscle-layer peel, and every remaining named skeletal muscle that is actually in the BodyParts3D 4.0 OBJ pack. Test, then publish to the iPhone Pages link.

**Source:** `/tmp/bp3d/isa_BP3D_4.0_obj_99.zip` (official, ~143 MB) plus `isa_parts_list_e.txt` and `isa_element_parts.txt`. Convert with `obj2gltf`, no recenter, no pre-rotation. Runtime already applies `rotation.x = -π/2`.

**Cannot add from this pack:** latissimus dorsi, rectus abdominis, unfused hip. Do not invent meshes or use unmarked stand-ins.

## Steps

1. **Pan (View only).** Turn on OrbitControls pan in View (`enablePan = true`, `screenSpacePanning = true`). Left-drag stays rotate; right-drag / two-finger drag pans up, down, and sideways. Restore `enablePan = false` when leaving View so quiz framing stays locked. Keep pick thresholds. Update the View footer tip.

2. **View visibility filter.** In View only, a compact glass control (existing HUD style, thumb-friendly on iPhone): **Both · Bones · Muscles**. Default is Both (current look). Bones hides all muscles. Muscles hides all bones. Quiz subject cards and type-it are unchanged.

3. **Muscle layers.** Same View control: **All · Mid · Deep** (enabled when muscles are visible). Default All. Mid hides superficial muscles; Deep hides superficial + intermediate. Peeled muscles are hidden and not pickable (no pickable ghosts). Also-here / pick stack only include visible meshes. If the current selection is hidden by a filter change, clear it cleanly. Each catalog muscle gets `layer: 'superficial' | 'intermediate' | 'deep'` from standard gross anatomy.

4. **Add remaining pack muscles.** Inventory FJ element IDs in the zip that are named skeletal muscles and not already in `scripts/muscle_mesh_map.json`. Prefer trunk, limb, and neck muscles, then major head (e.g. masseter, temporalis), then remaining named limb muscles. Skip cardiac/papillary, organ walls, diaphragm, and unnamed micro-slips. Group multi-head muscles the way deltoid / pec / trap already work. Convert, then update manifests, `muscle_mesh_map.json`, `muscles.ts` (ids, aliases, hints, layers, regions), `viewInfo.ts` (accurate description / origin / insertion / action / innervation / sitesForSide), and `ATTRIBUTION.md`. Combined names must not succeed for a single muscle (same rule as iliopsoas).

5. Rebuild `dist`. Serve preview on `:4173`. Do not publish yet.

6. Playtest on the box preview, then publish to https://yestin-boop.github.io/anatomy-3d/ and ping Yestin once with the link and what to try, including anything still missing from the pack.

**Done when:** Pan works in View; Both/Bones/Muscles and All/Mid/Deep work and affect picking; new pack muscles are in type-it and View; Pages is updated; honest leftover list (lats, abs, fused hip, plus any pack muscle we skipped) is in the ping.

**Files:** `src/scene/ThoraxScene.ts`, `src/main.ts`, `src/style.css`, `src/data/muscles.ts`, `src/data/viewInfo.ts`, `public/models/extra/muscles/*`, `scripts/muscle_mesh_map.json`, `public/models/ATTRIBUTION.md`, this doc.

## Implementation notes (2026-11-13, uncommitted)

Playable catalog is **21 → 126** named muscles (306 muscle GLBs). View pan, Both/Bones/Muscles, and All/Mid/Deep are in. Preview should be rebuilt on `:4173` before playtest. **Do not publish until Yestin has tried this locally.**

### What landed

- **Pan (View only).** `OrbitControls.enablePan = true` and `screenSpacePanning = true` in `enterView()`; pan is turned off again in `exitView()`. Left-drag still rotates; right-drag and two-finger drag pan. Pick thresholds are unchanged. View footer and empty-state copy mention pan.
- **Filter + layers (View only).** Compact glass HUD (`#view-filters` in `main.ts` / `style.css`): Both · Bones · Muscles (default Both) and All · Mid · Deep (default All; disabled when bones-only). Hidden muscles and bones are not pickable. A hidden selection is cleared. Quiz subject cards are unchanged. Implemented in `ThoraxScene.setViewDisplay` / `applyViewPresentation`.
- **Layers** on every catalog muscle (`src/data/muscles.ts`):
  - Superficial: trapezius, SCM, platysma, splenius capitis/cervicis, deltoid, pec major, external oblique, biceps, triceps, anconeus, brachioradialis, PT, FCR, FCU, palmaris longus, ECRL, ECRB, ECU, extensor digitorum, EDM, glut max, TFL, sartorius, gracilis, rectus femoris, vastus lateralis/medialis, biceps femoris, semitendinosus, gastrocnemius, tibialis anterior, fibularis longus, fibularis tertius, EDL, APB, ADM of hand, abductor hallucis, ADM of foot, FDB.
  - Intermediate: serratus anterior, pec minor, rhomboids, levator scapulae, teres major, SPS/SPI, coracobrachialis, brachialis, FDS, soleus, plantaris, semimembranosus, glut medius, pectineus, adductor longus/brevis, fibularis brevis, EHL, scalenes, infrahyoids, digastric, mylohyoid, stylohyoid, erector spinae (iliocostalis, longissimus, spinalis), thenar/hypothenar mid (FPB, OP, FDMB/ODM of hand), lumbricals of hand, EHB, flexor accessorius.
  - Deep: psoas major, iliacus, vastus intermedius, rotator cuff (supra/infra/subscap/teres minor), subclavius, transversus thoracis, PQ, FDP, FPL, supinator, APL/EPL/EPB/EI, glut minimus, adductors magnus/minimus, deep hip rotators, popliteus, tibialis posterior, FDL, FHL, prevertebral and suboccipital muscles, geniohyoid, semispinalis, adductor pollicis, interossei, FHB, FDMB/ODM of foot.

### New catalog muscles

105 added. Full GLB ↔ FJ map is in `public/models/ATTRIBUTION.md` and `scripts/muscle_mesh_map.json`. Pack quirks: longus colli is left-only (FJ1557, FJ1600, FJ1601); digastric has an extra left slip (`digastric_mid_l`, FJ1560) and only two right meshes; spinalis includes an additional unnamed part (`spinalis_a`, FJ1543) besides spinalis thoracis; no hyoid bone mesh (hyoid insertions are described, not pinned).

### Still missing from the pack

- **Not in the OBJ pack:** latissimus dorsi, rectus abdominis, internal oblique, transversus abdominis, quadratus lumborum, masseter, temporalis, psoas minor, multifidus, rotatores, extensor digitorum brevis, palmaris brevis. Hip remains a single fused os coxae mesh per side.
- **Skipped on purpose:** external / internal / innermost intercostals (each side is a 7–9 MB OBJ); levatores costarum; interspinalis and intertransversarii; foot lumbricals and plantar interossei (many tiny files); pelvic floor / perineal muscles; facial expression, extra-ocular, pharyngeal, laryngeal, and tongue muscles.
