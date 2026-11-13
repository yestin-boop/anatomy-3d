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

## Cervical C3–C6 and deferred-muscle fill (2026-11-12)

Converted from BodyParts3D `isa_BP3D_4.0_obj_99` element OBJs via `obj2gltf`,
same Z-up coordinate frame as the existing extras (no recenter, no pre-rotation).

| GLB | Element ID |
| --- | --- |
| `extra/vertebra_c3.glb` | FJ3161 (FMA12521, C3) |
| `extra/vertebra_c4.glb` | FJ3164 (FMA12522, C4) |
| `extra/vertebra_c5.glb` | FJ3167 (FMA12523, C5) |
| `extra/vertebra_c6.glb` | FJ3170 (FMA12524, C6) |
| `extra/muscles/vastus_int_r.glb` / `vastus_int_l.glb` | FJ1441 / FJ1441M |
| `extra/muscles/iliacus_r.glb` / `iliacus_l.glb` | FJ1422 / FJ1422M |
| `extra/muscles/psoas_maj_r.glb` / `psoas_maj_l.glb` | FJ1431 / FJ1431M |
| `extra/muscles/serratus_ant_r.glb` / `serratus_ant_l.glb` | FJ1459 / FJ1459M |

The hip remains a single os coxae mesh per side (FJ3152 right, FJ3288 left).

## Additional pack muscles (2026-11-13)

Converted from BodyParts3D `isa_BP3D_4.0_obj_99` element OBJs via `obj2gltf`,
same Z-up coordinate frame as the existing extras (no recenter, no pre-rotation).
Left/right follows the pack convention: `FJxxxxM` is left and `FJxxxx` is right,
except neck muscles that use a separate FJ number on each side (no `M` suffix).

| GLB (left / right) | Element IDs (L / R) | Muscle |
| --- | --- | --- |
| `pec_min_l/r` | FJ1456M / FJ1456 | pectoralis minor |
| `subclav_l/r` | FJ1460M / FJ1460 | subclavius |
| `rhomb_maj_l/r` | FJ1536M / FJ1536 | rhomboid major |
| `rhomb_min_l/r` | FJ1537M / FJ1537 | rhomboid minor |
| `lev_scap_l/r` | FJ1532M / FJ1532 | levator scapulae |
| `supra_l/r` | FJ1506M / FJ1506 | supraspinatus |
| `infra_l/r` | FJ1500M / FJ1500 | infraspinatus |
| `subscap_l/r` | FJ1504M / FJ1504 | subscapularis |
| `teres_maj_l/r` | FJ1507M / FJ1507 | teres major |
| `teres_min_l/r` | FJ1508M / FJ1508 | teres minor |
| `serr_post_sup_l/r` | FJ1542M / FJ1542 | serratus posterior superior |
| `serr_post_inf_l/r` | FJ1541M / FJ1541 | serratus posterior inferior |
| `trans_thor_l/r` | FJ1461M / FJ1461 | transversus thoracis |
| `coracobrach_l/r` | FJ1488M / FJ1488 | coracobrachialis |
| `brachialis_l/r` | FJ1486M / FJ1486 | brachialis |
| `brachiorad_l/r` | FJ1487M / FJ1487 | brachioradialis |
| `anconeus_l/r` | FJ1485M / FJ1485 | anconeus |
| `pt_hum_l/r`, `pt_uln_l/r` | FJ1474M / FJ1474, FJ1516M / FJ1516 | pronator teres (humeral, ulnar heads) |
| `pron_quad_l/r` | FJ1503M / FJ1503 | pronator quadratus |
| `fcr_l/r` | FJ1496M / FJ1496 | flexor carpi radialis |
| `fcu_hum_l/r`, `fcu_uln_l/r` | FJ1473M / FJ1473, FJ1518M / FJ1518 | flexor carpi ulnaris (humeral, ulnar heads) |
| `pal_long_l/r` | FJ1502M / FJ1502 | palmaris longus |
| `fds_a_l/r`, `fds_b_l/r` | FJ1475M / FJ1475, FJ1499M / FJ1499 | flexor digitorum superficialis (two parts) |
| `fdp_l/r` | FJ1497M / FJ1497 | flexor digitorum profundus |
| `fpl_l/r` | FJ1498M / FJ1498 | flexor pollicis longus |
| `supinator_l/r` | FJ1505M / FJ1505 | supinator |
| `ecrl_l/r` | FJ1490M / FJ1490 | extensor carpi radialis longus |
| `ecrb_l/r` | FJ1489M / FJ1489 | extensor carpi radialis brevis |
| `ecu_a_l/r`, `ecu_b_l/r` | FJ1472M / FJ1472, FJ1517M / FJ1517 | extensor carpi ulnaris (two parts) |
| `ext_dig_l/r` | FJ1492M / FJ1492 | extensor digitorum |
| `edm_l/r` | FJ1491M / FJ1491 | extensor digiti minimi |
| `ext_ind_l/r` | FJ1493M / FJ1493 | extensor indicis |
| `apl_l/r` | FJ1484M / FJ1484 | abductor pollicis longus |
| `epl_l/r` | FJ1495M / FJ1495 | extensor pollicis longus |
| `epb_l/r` | FJ1494M / FJ1494 | extensor pollicis brevis |
| `glut_med_l/r` | FJ1419M / FJ1419 | gluteus medius |
| `glut_min_l/r` | FJ1420M / FJ1420 | gluteus minimus |
| `tfl_l/r` | FJ1438M / FJ1438 | tensor fasciae latae |
| `sartorius_l/r` | FJ1434M / FJ1434 | sartorius |
| `pectineus_l/r` | FJ1427M / FJ1427 | pectineus |
| `add_long_l/r` | FJ1402M / FJ1402 | adductor longus |
| `add_brev_l/r` | FJ1401M / FJ1401 | adductor brevis |
| `add_mag_l/r` | FJ1403M / FJ1403 | adductor magnus |
| `add_min_l/r` | FJ1404M / FJ1404 | adductor minimus |
| `gracilis_l/r` | FJ1421M / FJ1421 | gracilis |
| `piriformis_l/r` | FJ1428M / FJ1428 | piriformis |
| `obt_int_l/r` | FJ1426M / FJ1426 | obturator internus |
| `obt_ext_l/r` | FJ1425M / FJ1425 | obturator externus |
| `quad_fem_l/r` | FJ1432M / FJ1432 | quadratus femoris |
| `gem_sup_l/r` | FJ1417M / FJ1417 | gemellus superior |
| `gem_inf_l/r` | FJ1416M / FJ1416 | gemellus inferior |
| `plantaris_l/r` | FJ1429M / FJ1429 | plantaris |
| `popliteus_l/r` | FJ1430M / FJ1430 | popliteus |
| `fib_long_l/r` | FJ1410M / FJ1410 | fibularis longus |
| `fib_brev_l/r` | FJ1409M / FJ1409 | fibularis brevis |
| `fib_tert_l/r` | FJ1411M / FJ1411 | fibularis tertius |
| `tib_post_l/r` | FJ1440M / FJ1440 | tibialis posterior |
| `fdl_l/r` | FJ1414M / FJ1414 | flexor digitorum longus |
| `fhl_l/r` | FJ1415M / FJ1415 | flexor hallucis longus |
| `edl_l/r` | FJ1406M / FJ1406 | extensor digitorum longus |
| `ehl_l/r` | FJ1408M / FJ1408 | extensor hallucis longus |
| `scalene_ant_l/r` | FJ1570 / FJ1592 | scalenus anterior |
| `scalene_med_l/r` | FJ1571 / FJ1593 | scalenus medius |
| `scalene_post_l/r` | FJ1572 / FJ1594 | scalenus posterior |
| `sterno_hy_l/r` | FJ1574 / FJ1596 | sternohyoid |
| `sterno_th_l/r` | FJ1575 / FJ1597 | sternothyroid |
| `thyrohyoid_l/r` | FJ1577 / FJ1599 | thyrohyoid |
| `omohyoid_l/r` | FJ1565 / FJ1586 | omohyoid |
| `digastric_ant_l/r`, `digastric_post_l/r`, `digastric_mid_l` | FJ1555 / FJ1556, FJ1578 / FJ1579, FJ1560 (left only) | digastric |
| `mylohyoid_l/r` | FJ1562 / FJ1583 | mylohyoid |
| `stylohyoid_l/r` | FJ1576 / FJ1598 | stylohyoid |
| `geniohyoid_l/r` | FJ1559 / FJ1580 | geniohyoid |
| `platysma_l/r` | FJ1558 / FJ1587 | platysma |
| `longus_colli_inf_l`, `longus_colli_sup_l`, `longus_colli_vert_l` | FJ1557, FJ1600, FJ1601 (left only) | longus colli |
| `longus_cap_l/r` | FJ1561 / FJ1582 | longus capitis |
| `rect_cap_ant_l/r` | FJ1566 / FJ1588 | rectus capitis anterior |
| `rect_cap_lat_l/r` | FJ1569 / FJ1591 | rectus capitis lateralis |
| `rcp_maj_l/r` | FJ1567 / FJ1589 | rectus capitis posterior major |
| `rcp_min_l/r` | FJ1568 / FJ1590 | rectus capitis posterior minor |
| `obl_cap_sup_l/r` | FJ1564 / FJ1585 | obliquus capitis superior |
| `obl_cap_inf_l/r` | FJ1563 / FJ1584 | obliquus capitis inferior |
| `splenius_cap_l/r` | FJ1545M / FJ1545 | splenius capitis |
| `splenius_cerv_l/r` | FJ1546M / FJ1546 | splenius cervicis |
| `ic_cerv_l/r`, `ic_thor_l/r`, `ic_lumb_l/r` | FJ1526M / FJ1526, FJ1528M / FJ1528, FJ1527M / FJ1527 | iliocostalis |
| `longiss_cap_l/r`, `longiss_cerv_l/r`, `longiss_thor_l/r` | FJ1533M / FJ1533, FJ1534M / FJ1534, FJ1535M / FJ1535 | longissimus |
| `spinalis_a_l/r`, `spinalis_thor_l/r` | FJ1543M / FJ1543, FJ1544M / FJ1544 | spinalis (thoracis + an additional unnamed part) |
| `semispin_cap_l/r`, `semispin_cerv_l/r`, `semispin_thor_l/r` | FJ1538M / FJ1538, FJ1539M / FJ1539, FJ1540M / FJ1540 | semispinalis |
| `apb_l/r` | FJ1483M / FJ1483 | abductor pollicis brevis |
| `fpb_l/r`, `fpb_sup_l/r` | FJ1469M / FJ1469, FJ1514M / FJ1514 | flexor pollicis brevis |
| `opp_pol_l/r` | FJ1501M / FJ1501 | opponens pollicis |
| `ap_obl_l/r`, `ap_trans_l/r` | FJ1481M / FJ1481, FJ1515M / FJ1515 | adductor pollicis |
| `adm_hand_l/r` | FJ1466M / FJ1466 | abductor digiti minimi of hand |
| `fdmb_hand_l/r` | FJ1470M / FJ1470 | flexor digiti minimi brevis of hand |
| `odm_hand_l/r` | FJ1482M / FJ1482 | opponens digiti minimi of hand |
| `lumbricals_l/r` | FJ1510M / FJ1510 | lumbricals of hand (combined set) |
| `dors_inteross_l/r` | FJ1509M / FJ1509 | dorsal interossei of hand (combined set) |
| `palm_inteross_l/r` | FJ1511M / FJ1511 | palmar interossei (combined set) |
| `abd_hall_l/r` | FJ1400M / FJ1400 | abductor hallucis |
| `adm_foot_l/r` | FJ1390M / FJ1390 | abductor digiti minimi of foot |
| `fdb_l/r` | FJ1413M / FJ1413 | flexor digitorum brevis |
| `fhb_lat_l/r`, `fhb_med_l/r` | FJ1393M / FJ1393, FJ1396M / FJ1396 | flexor hallucis brevis |
| `fdmb_foot_l/r` | FJ1391M / FJ1391 | flexor digiti minimi brevis of foot |
| `ehb_l/r` | FJ1407M / FJ1407 | extensor hallucis brevis |
| `flex_acc_l/r` | FJ1412M / FJ1412 | flexor accessorius (quadratus plantae) |
| `odm_foot_l/r` | FJ1399M / FJ1399 | opponens digiti minimi of foot |

Those BodyParts3D gaps are partly filled from Z-Anatomy (see below). Still not
in either pack used here: masseter, temporalis, psoas minor, rotatores (present
in Écorché but not imported), extensor digitorum brevis, palmaris brevis. The hip
remains a single os coxae mesh per side (FJ3152 right, FJ3288 left). There is no
hyoid mesh.

Skipped on purpose (size or scope, not forgotten): external / internal / innermost
intercostals (each side is a 7–9 MB OBJ); levatores costarum; interspinalis and
intertransversarii; foot lumbricals and plantar interossei; pelvic floor / perineal
muscles; facial expression, extra-ocular, pharyngeal, laryngeal, and tongue muscles.

## Cartilage fill (2026-11-13)

Converted from BodyParts3D `isa_BP3D_4.0_obj_99` element OBJs via `obj2gltf`,
same Z-up coordinate frame as the existing extras (no recenter, no pre-rotation).
Runtime still applies `rotation.x = -π/2`. Files live in `extra/cartilage/`.

### Costal cartilages 1–7

| GLB (left / right) | Element IDs (L / R) | Structure |
| --- | --- | --- |
| `costal_l1` / `costal_r1` | FJ3239 / FJ3333 | first costal cartilage |
| `costal_l2` / `costal_r2` | FJ3242 / FJ3335 | second costal cartilage |
| `costal_l3` / `costal_r3` | FJ3245 / FJ3337 | third costal cartilage |
| `costal_l4` / `costal_r4` | FJ3248 / FJ3339 | fourth costal cartilage |
| `costal_l5` / `costal_r5` | FJ3251 / FJ3341 | fifth costal cartilage |
| `costal_l6` / `costal_r6` | FJ3254 / FJ3343 | sixth costal cartilage |
| `costal_l7` / `costal_r7` | FJ3255 / FJ3345 | seventh costal cartilage |

No 8th–10th costal cartilages or costal-margin mesh is in this pack.

### Intervertebral discs

Official names follow the vertebra above (e.g. “intervertebral disk of axis” = C2–C3).

| GLB | Element ID | Label |
| --- | --- | --- |
| `disc_c2_c3` | FJ3202 | C2–C3 (disk of axis) |
| `disc_c3_c4` | FJ3213 | C3–C4 |
| `disc_c4_c5` | FJ3218 | C4–C5 |
| `disc_c5_c6` | FJ3219 | C5–C6 |
| `disc_c6_c7` | FJ3220 | C6–C7 |
| `disc_c7_t1` | FJ3221 | C7–T1 |
| `disc_t1_t2` | FJ3222 | T1–T2 |
| `disc_t2_t3` | FJ3223 | T2–T3 |
| `disc_t3_t4` | FJ3224 | T3–T4 |
| `disc_t4_t5` | FJ3203 | T4–T5 |
| `disc_t5_t6` | FJ3204 | T5–T6 |
| `disc_t6_t7` | FJ3205 | T6–T7 |
| `disc_t7_t8` | FJ3206 | T7–T8 |
| `disc_t8_t9` | FJ3207 | T8–T9 |
| `disc_t9_t10` | FJ3208 | T9–T10 |
| `disc_t10_t11` | FJ3209 | T10–T11 |
| `disc_t11_t12` | FJ3210 | T11–T12 |
| `disc_t12_l1` | FJ3211 | T12–L1 |
| `disc_l1_l2` | FJ3212 | L1–L2 |
| `disc_l2_l3` | FJ3214 | L2–L3 |
| `disc_l3_l4` | FJ3215 | L3–L4 |
| `disc_l4_l5` | FJ3216 | L4–L5 |
| `disc_l5_s1` | FJ3217 | L5–S1 |

FJ3211 is listed only as “intervertebral disk” / “articular disk of symphysis”
(no vertebral level). It is labeled **T12–L1** because its centroid sits between
the T11 disc (FJ3210, z ≈ 1099) and the L1 disc (FJ3212, z ≈ 1040); FJ3211 is
at z ≈ 1070 in the official coordinates.

FMA67396 (“articular disk of symphysis”) is a parent class covering these discs.
There is no pubic symphysis mesh in this pack, and none was invented.

### Nasal and laryngeal cartilages

Included in the same convert pass (all present and small enough).

| GLB | Element ID | Structure |
| --- | --- | --- |
| `nasal_alar_r` / `nasal_alar_l` | FJ2554 / FJ2555 | major alar cartilage |
| `nasal_lateral_r` / `nasal_lateral_l` | FJ2558 / FJ2556 | lateral nasal cartilage |
| `nasal_septal` | FJ2557 | septal nasal cartilage |
| `thyroid_cartilage` | FJ2808 | thyroid cartilage |
| `cricoid` | FJ2440 | cricoid cartilage |
| `arytenoid_l` / `arytenoid_r` | FJ2775 / FJ2792 | arytenoid cartilage |
| `corniculate_l` / `corniculate_r` | FJ2776 / FJ2793 | corniculate cartilage |
| `cuneiform_l` / `cuneiform_r` | FJ2773 / FJ2795 | cuneiform cartilage |
| `epiglottis` | FJ2770 | epiglottis |

FJ2769 is also listed as cricoid cartilage but is a byte-for-byte duplicate of
FJ2440 except for the file-id comment, so only FJ2440 was converted.

Still not in this pack (do not invent): pubic symphysis, costal cartilages 8–10 /
costal margin, menisci, labra, and limb articular cartilage.

## Z-Anatomy trunk fills (2026-11-13)

Latissimus dorsi, rectus abdominis, internal abdominal oblique, transversus
abdominis, quadratus lumborum, and multifidus are **not** in the BodyParts3D
`isa_BP3D_4.0_obj_99` pack. They were added from Z-Anatomy (CC BY-SA 4.0),
itself derived from BodyParts3D. Share-alike applies to these added meshes;
they are not BodyParts3D-only.

### AnatomyScope `zanatomy-fill-r010` (lats, rectus, internal oblique, transversus)

Source: https://anatomyscope.com/models/zanatomy-fill-r010.glb
Licence file: https://anatomyscope.com/models/LICENSE.txt
Z-Anatomy: https://github.com/LluisV/Z-Anatomy

AnatomyScope aligned these four muscles to BodyParts3D coordinates, pushed
surfaces out where deeper BodyParts3D muscles poked through, decimated,
quantized, and meshopt-compressed the file. We decoded that GLB, baked each
node’s translation/scale, and converted from metres, Y-up, +Z anterior into
this app’s BodyParts3D millimetre Z-up frame:

    (x, y, z)_mm = (x_m, −z_m, y_m) × 1000

Runtime still applies `rotation.x = −π/2` only. No second camera frame.

| GLB (left / right) | Structure |
| --- | --- |
| `extra/muscles/lat_l` / `lat_r` | latissimus dorsi |
| `extra/muscles/rectus_abd_l` / `rectus_abd_r` | rectus abdominis |
| `extra/muscles/int_oblique_l` / `int_oblique_r` | internal abdominal oblique |
| `extra/muscles/trans_abd_l` / `trans_abd_r` | transversus abdominis |

Left and right latissimus / rectus each shipped as two primitives in the
source file; those were merged into one mesh per side.

### Écorché (quadratus lumborum, multifidus)

Source: https://github.com/Charleeh/ecorche (`model/ecorche.glb`)
Licence: CC BY-SA 4.0. Credit: BodyParts3D © DBCLS, CC BY 4.0; Z-Anatomy by
Gauthier Kervyn, CC BY-SA 4.0; this derivative CC BY-SA 4.0.

Écorché uses the same metres / Y-up / +Z anterior convention, with a root
scale of 1e-4. The same axis conversion as above was applied, then a rigid
offset measured on shared BodyParts3D landmarks (left and right hip, sternal
body, L1, T12, left 1st and 7th costal cartilages; spread < 0.3 mm) to land
on this pack’s original coordinates:

    subtract (0, 79.3393, 78.1219) mm after the axis conversion

Without that offset, Écorché meshes sit about 79 mm too posterior and 78 mm
too cranial relative to our un-recentered BodyParts3D extras. After the
offset, Écorché’s own latissimus and rectus overlap the AnatomyScope fills
closely; those two were **not** taken from Écorché (AnatomyScope’s copies
were already fitted to this body). Quadratus lumborum and multifidus
(cervicis, thoracis, lumborum) were taken from Écorché and visually checked
against psoas, iliacus, iliocostalis, and the lumbar/cervical vertebrae.

| GLB (left / right) | Structure |
| --- | --- |
| `extra/muscles/ql_l` / `ql_r` | quadratus lumborum |
| `extra/muscles/multifidus_cerv_l/r`, `multifidus_thor_l/r`, `multifidus_lumb_l/r` | multifidus |

### Checked but not added

- **Pubic symphysis, costal cartilages 8–10 / costal margin, menisci, labra:**
  not present as named meshes in Écorché (its 42 cartilages are costal 1–7,
  nasal, the external ear, and the intervertebral discs — the same set we
  already have from BodyParts3D). Not invented.
- **Rotatores:** present in Écorché, skipped (a long combined set, not
  visually reviewed as a clean single muscle).
- **Thoracolumbar fascia, masseter, temporalis, and facial muscles:** present
  in Écorché; out of scope for this trunk-muscle fill (fascia is not a
  muscle; face/jaw were not part of the missing-trunk brief).
- **nqwrc/3d-anatomy** and other CC BY-NC packs were not used.
