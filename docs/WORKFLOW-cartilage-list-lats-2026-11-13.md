# Workflow — cartilage, View list + search, missing trunk muscles

Goal: still on the model (not Sport). (1) Add real pack cartilage with a filter to hide it. (2) Searchable bone/muscle/cartilage list in the right-hand View panel. (3) Add latissimus dorsi, rectus abdominis, and other major trunk muscles missing from BodyParts3D, from a licensed source that fits this body.

## What is in this pack (confirmed)
- Costal cartilages 1–7 left and right: FJ3239/3242/3245/3248/3251/3254/3255 (L) and FJ3333/3335/3337/3339/3341/3343/3345 (R). No 8–10 or costal margin meshes.
- Intervertebral discs C2–C3 through L5–S1, including unnamed FJ3211, which sits between the T11 and L1 discs in the official coordinates and should be labeled **T12–L1** (official list only says “intervertebral disk” / “articular disk of symphysis”).
  - Cervical: FJ3202 (axis / C2–C3), FJ3213 (C3), FJ3218–3221 (C4–C7)
  - Thoracic: FJ3222 (T1), FJ3223 (T2), FJ3224 (T3), FJ3203–3210 (T4–T11), FJ3211 (T12–L1, by position)
  - Lumbar: FJ3212 (L1), FJ3214–3217 (L2–L5)
- Also in the pack, same convert pass if cheap: nasal cartilages (FJ2554–2558) and laryngeal cartilages (thyroid FJ2808, cricoid FJ2440+FJ2769, arytenoids, etc.).
- **Not in this pack:** pubic symphysis (FMA67396 is a parent class covering the discs; no pubic mesh), menisci, labra, limb articular cartilage, costal cartilages 8–10. Do not invent them.

## Steps
1. Convert the listed BP3D OBJs with the standing path: `npx obj2gltf -i … -o …`, no recenter, no pre-rotation. Runtime remains UPRIGHT_EULER −π/2 X. Put GLBs under `public/models/extra/cartilage/` with a manifest. Update ATTRIBUTION.md (FJ table; note FJ3211 identification).
2. Catalog + View presentation: pale distinctive cartilage material (not bone cream, not muscle pink), pickable, labels/descriptions for costal cartilages and discs. Quiz type-it can stay unchanged in this slice.
3. Filter: add a **Cartilage** on/off chip (default on). Keep existing Both / Bones / Muscles and All / Mid / Deep. Cartilage visibility is independent so it can be turned off without hiding bone or muscle.
4. Right-hand View panel: search bar + scrollable list of bones, muscles, and cartilage (grouped or clearly marked). Typing filters the list. Clicking a row selects and frames that structure (reuse existing View pick/frame). Selected detail (name, attachments, description) stays available. Must work on the iPhone-width panel, not only desktop.
5. After 1–4 are playtested, commit (no qa/*.png), push main, deploy gh-pages (worktree, keep `.nojekyll`, credential helper `git -c credential.helper= -c credential.helper='!/usr/local/bin/gh auth git-credential'`), and wait until the live index references the new JS before calling it live.
6. Missing large muscles: use **Z-Anatomy / Écorché** (CC BY-SA 4.0), which fills latissimus dorsi, rectus abdominis, internal oblique, transversus abdominis, and related trunk gaps. Prefer a source already aligned to BodyParts3D coordinates (Écorché, or AnatomyScope `zanatomy-fill`). Do not invent meshes. Attribute both BodyParts3D and Z-Anatomy; share-alike applies to those added meshes. Also check that source for pubic symphysis and other joint cartilages still missing from our pack. Fit and visually verify against our BP3D body before publishing this part. No paid/commercial datasets (spend gate).

## Files
- New: `public/models/extra/cartilage/`, catalog module (e.g. `src/data/cartilage.ts`), this workflow doc
- Update: `src/scene/ThoraxScene.ts`, `src/main.ts`, `src/style.css`, `src/data/viewInfo.ts`, `public/models/ATTRIBUTION.md`

## Done check
- View shows costal cartilages 1–7 and the vertebral discs; Cartilage chip hides them.
- Search list finds and selects items (bone, muscle, cartilage).
- No invented meshes. Pubic symphysis stays absent until a licensed mesh is found and fitted.
- Lats / rectus abdominis only appear after a fitted, attributed Z-Anatomy (or Écorché) import passes a visual check.
- Pages is live only when the public index points at the new bundle.
