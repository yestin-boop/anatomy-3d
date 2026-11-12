# Anatomy 3D — Axial Type-It

Play: https://yestin-boop.github.io/anatomy-3d/


GoelEduc-style Three.js bone quiz for the **axial thorax** (spine + ribs + sternum).

Fresh local Vite + TypeScript + vanilla Three.js app. No Grok Build.

## Run

```bash
cd /workspace/anatomy-3d
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # serve dist/
```

## How to play

Four phases over the **same shuffled bone order** (memory builds):

1. **LEARN** — full name + etymology shown; type it to practice.
2. **FIRST LETTER** — only first letter hint (`t_______`).
3. **LAST LETTER** — only last letter hint (`_______m`).
4. **FROM MEMORY** — no letter hints; white bone only.

Correct → richer Web Audio chime → next. After phase 4, tap to reshuffle/restart.

**Input:** physical keyboard on desktop; tap the prompt to open the **native OS keyboard** on phone (no on-screen QWERTY).

## Quiz bones (44)

Cervical C1–C7; thoracic T1–T12; lumbar L1–L5; sacrum; sternum (manubrium / body / xiphoid); ribs 1, 7, 12; skull (frontal, parietal, temporal, occipital, mandible, maxilla, zygomatic); clavicle, scapula, humerus, radius, ulna; hip bone; femur, patella, tibia, fibula.


## Assets

See `public/models/ATTRIBUTION.md`. Primary mesh: `public/models/thorax.glb`
(BodyParts3D © DBCLS, CC BY 4.0, via AngioView thorax pack).

## Stack

- Vite 6 + TypeScript
- three.js (WebGLRenderer, GLTFLoader, OrbitControls, MeshPhysicalMaterial)
- Web Audio API chime (no CDN audio)
