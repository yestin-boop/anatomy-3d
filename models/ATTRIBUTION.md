# 3D model attribution

All skeletal meshes in this app are derived from **BodyParts3D** 4.0,
© The Database Center for Life Science (DBCLS).

- License: **Creative Commons Attribution 4.0 International (CC BY 4.0)**
  (https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html — relicensed Feb 2025)
- Source: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/
- Cite: Mitsuhashi N. et al., *Nucleic Acids Res.* 2009, PMID 18835852

## Files

| Path | Contents | Provenance |
| --- | --- | --- |
| `thorax.glb` | C7, T1–T12, L1, ribs 1–12, costal cartilages, sternum, diaphragm | AngioView BodyParts3D thorax pack (reference only — not loaded at runtime) |
| `extra/*.glb` | Skull, vertebrae, full rib cage (L/R 1–12), sternum parts, clavicle, scapula, limbs, pelvis, sacrum | Direct from BodyParts3D `isa_BP3D_4.0_obj_99` OBJs → GLB |
| `spine-360.glb` | Merged vertebral column (optional / unused in quiz) | BodyParts3D-derived |

Required credit:

> BodyParts3D, © The Database Center for Life Science, CC BY 4.0

## Frame note (2026-11-07)

Quiz runtime loads **only** `extra/*.glb` (unified BodyParts3D Z-up frame), then applies
`rotation.x = -π/2` so cranial → +Y. The earlier AngioView `thorax.glb` was Y-up/recentered
and is **not** composited at runtime (kept on disk for reference only).

## Rib cage fill (2026-11-07 polish)

Missing ribs 2–6 and 8–11 (L/R) were converted from BodyParts3D `isa_BP3D_4.0_obj_99`
element OBJs (FJ3225–FJ3348) via `obj2gltf`, same coordinate frame as existing
`rib_l1` / `rib_l7` / `rib_l12`. Manifest lists all 24 rib GLBs so the cage reads as full.
