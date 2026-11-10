# Anatomy data — sources and licences

Every file in this folder is derived from **BodyParts3D 4.0** (whole-body set `isa_BP3D_4.0_obj_99`),
© The Database Center for Life Science (DBCLS), licensed **CC BY 4.0** (relicensed 2025-02-25; the 4.0 OBJ file
headers still carry the older "CC Attribution-Share Alike 2.1 Japan" notice). Attribution:
"BodyParts3D, © The Database Center for Life Science, CC BY 4.0", https://dbarchive.biosciencedbc.jp/en/bodyparts3d/

**No file here uses the BodyParts3D heart 5.0 set** (CC BY-SA 2.1 JP). The 5.0 set was used only as a reading
reference (report 04) and for the isocentre comparison quoted in the metadata.

| file | derived from | how |
|---|---|---|
| heart.glb (**modified**) | 4.0: Wall of ventricle, walls and cavities of LA/RA/LV/RV, ascending aorta, arch, descending aorta, pulmonary trunk, L/R pulmonary arteries, 4 pulmonary veins, SVC, IVC | voxelised (1 mm), split into labels, re-meshed (1.6 mm surface nets + Taubin smoothing); LV/RV myocardium split by nearest cavity; **modified**: aortic root re-modelled with three sinuses of Valsalva (31 mm), neighbouring LA/RA/RV/LV walls receding ≤ 7 mm (§6e); then the whole heart deformed by a smooth landmark-driven displacement field carrying its own interventricular grooves, crux and AV-groove surface onto the population-placed coronary trunks (≤ 20 mm, walls and cavities together), the left atrial appendage trimmed near the left main bifurcation and smoothed (15.3 cm³); the apex region pinned so it keeps its original shape, and shallow seating grooves carved under the trunks (2.1 cm³) — ANATOMY-NOTES §6g |
| thorax.glb | 4.0: C7, T1–T12, L1 vertebrae; ribs 1–12; costal cartilages 1–7; manubrium, sternal body, xiphoid; diaphragm | voxelised and re-meshed (2.6–5 mm) |
| thorax-extra.glb | 4.0: left and right clavicles (FJ3237, FJ3362) | voxelised and re-meshed (2.6 mm) like thorax.glb, by tools/anatomy/grafts.py; loaded with the grafts layer only |
| heart-lite.glb, thorax-lite.glb | the shipped heart.glb and thorax.glb (so the same 4.0 sources) | the same parts decimated to about a quarter / a third of the triangles (meshoptimizer simplification, tools/anatomy/make-lite.mjs); drawn by the 3D heart and room views on the low quality tier only (a machine without a usable GPU, or after frame pacing stepped the canvases down) — the angiogram keeps the full meshes everywhere (docs/PERFORMANCE.md) |
| grafts-right.json | 4.0: left internal thoracic artery (FJ1972), left subclavian artery (FJ3479), brachiocephalic artery (FJ3417, origin height only); the shipped heart.glb, thorax.glb and coronary-right.json | LIMA graft = the measured ITA centreline moved to published chest-wall positions, then a synthesised course to the LAD; vein grafts (SVG→OM1, SVG→PDA) synthesised on the shipped heart, their aortic ostia placed from aggregate statistics of the Vascular Model Repository (below); subclavian centreline landmark; sternal wires and clips synthesised (tools/anatomy/grafts.py, docs/research/grafts/GRAFTS-geometry.md) |
| coronary-right.json, coronary-left.json, coronary-co.json | 4.0 coronary-artery meshes (centrelines extracted), laid on the 4.0 heart; synthesised vessels as listed in docs/ANATOMY-NOTES.md | tools/anatomy/build.py |

Coronary courses are guided by aggregate statistics of ImageCAS-X (Bransby KM, Paulsen RR, Zenodo 2026, doi:10.5281/zenodo.21887809, CC BY 4.0); no case geometry is included.
Radii use Dodge JT Jr et al., Circulation 1992;86:232–246 (Tables 6–7, transcribed in docs/research/dodge1992_diameters.json).
Targets used for the proximal-left re-model: Kočka V et al., JACC Cardiovasc Interv 2020;13:2560; Tu S et al., Int J Cardiovasc Imaging 2012;28:1617.

Vein-graft ostium heights, azimuths, take-off and anastomosis angles use only aggregate means of measurements made on 16
post-CABG models of the Vascular Model Repository (no model data are included in this folder): "The data used herein was
provided in whole or in part with Federal funds from the National Library of Medicine under Grant No. R01LM013120, and the
National Heart, Lung, and Blood Institute, National Institutes of Health, Department of Health and Human Services, under
Contract No. HHSN268201100035C"; N.M. Wilson, A.K. Ortiz and A.B. Johnson, "The Vascular Model Repository: A Public Resource
of Medical Imaging Data and Blood Flow Simulation Results", J. Med. Devices 7(4), 040923 (2013), doi:10.1115/1.4025983;
www.vascularmodel.com. Details: docs/research/grafts/VMR-measurements.md.
