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

Latissimus dorsi and rectus abdominis are not in this OBJ pack. The hip remains
a single os coxae mesh per side (FJ3152 right, FJ3288 left).

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

Still not in this OBJ pack: latissimus dorsi, rectus abdominis, internal oblique,
transversus abdominis, quadratus lumborum, masseter, temporalis, psoas minor,
multifidus, rotatores, extensor digitorum brevis, palmaris brevis. The hip remains
a single os coxae mesh per side (FJ3152 right, FJ3288 left). There is no hyoid mesh.

Skipped on purpose (size or scope, not forgotten): external / internal / innermost
intercostals (each side is a 7–9 MB OBJ); levatores costarum; interspinalis and
intertransversarii; foot lumbricals and plantar interossei; pelvic floor / perineal
muscles; facial expression, extra-ocular, pharyngeal, laryngeal, and tongue muscles.
