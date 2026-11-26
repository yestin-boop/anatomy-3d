import { AXIAL_BONES, type AxialBone } from './axialBones'
import { MUSCLES, allViewMuscles, type Muscle, type MuscleRegion, type ViewOnlyMuscle } from './muscles'
import { TISSUE, type TissueItem } from './tissue'

/**
 * The face the camera uses for a quiz or View target.
 * Side is not part of this value. It comes from the mesh's world box.
 */
export type AnatomicalView =
  | 'posterior'
  | 'posterior-lateral'
  | 'lateral'
  | 'anterior'
  | 'anterior-medial'
  | 'anterior-lateral'

export const ANATOMICAL_VIEWS: readonly AnatomicalView[] = [
  'posterior',
  'posterior-lateral',
  'lateral',
  'anterior',
  'anterior-medial',
  'anterior-lateral',
]

/**
 * Region default. A muscle whose face differs is listed in MUSCLE_VIEW.
 * The scene never recomputes this from the box centre.
 */
const MUSCLE_REGION_VIEW: Record<MuscleRegion, AnatomicalView> = {
  neck_back: 'posterior',
  chest_abdomen: 'anterior',
  shoulder_arm: 'anterior',
  forearm_hand: 'anterior-lateral',
  hip_thigh: 'anterior',
  lower_leg: 'anterior',
}

/** Explicit face for every muscle that should not use its region default. */
const MUSCLE_VIEW: Record<string, AnatomicalView> = {
  sternocleidomastoid: 'anterior-lateral',
  scalenus_anterior: 'anterior',
  scalenus_medius: 'anterior',
  scalenus_posterior: 'anterior',
  sternohyoid: 'anterior',
  sternothyroid: 'anterior',
  thyrohyoid: 'anterior',
  omohyoid: 'anterior',
  digastric: 'anterior',
  mylohyoid: 'anterior',
  stylohyoid: 'anterior',
  geniohyoid: 'anterior',
  platysma: 'anterior',
  longus_colli: 'anterior',
  longus_capitis: 'anterior',
  rectus_capitis_anterior: 'anterior',
  rectus_capitis_lateralis: 'lateral',

  quadratus_lumborum: 'posterior',
  serratus_anterior: 'lateral',
  external_oblique: 'anterior-lateral',
  internal_oblique: 'anterior-lateral',

  deltoid: 'posterior-lateral',
  triceps_brachii: 'posterior',
  anconeus: 'posterior',
  supraspinatus: 'posterior',
  infraspinatus: 'posterior',
  teres_major: 'posterior',
  teres_minor: 'posterior',

  brachioradialis: 'lateral',
  supinator: 'posterior',
  extensor_carpi_radialis_longus: 'posterior-lateral',
  extensor_carpi_radialis_brevis: 'posterior-lateral',
  extensor_carpi_ulnaris: 'posterior-lateral',
  extensor_digitorum: 'posterior-lateral',
  extensor_digiti_minimi: 'posterior-lateral',
  extensor_indicis: 'posterior',
  abductor_pollicis_longus: 'posterior-lateral',
  extensor_pollicis_longus: 'posterior-lateral',
  extensor_pollicis_brevis: 'posterior-lateral',
  dorsal_interossei_hand: 'posterior',

  gluteus_maximus: 'posterior',
  gluteus_medius: 'posterior-lateral',
  gluteus_minimus: 'posterior',
  biceps_femoris: 'posterior',
  semitendinosus: 'posterior',
  semimembranosus: 'posterior',
  piriformis: 'posterior',
  obturator_internus: 'posterior',
  obturator_externus: 'posterior',
  quadratus_femoris: 'posterior',
  gemellus_superior: 'posterior',
  gemellus_inferior: 'posterior',
  vastus_medialis: 'anterior-medial',
  vastus_lateralis: 'anterior-lateral',
  adductor_longus: 'anterior-medial',
  adductor_brevis: 'anterior-medial',
  adductor_magnus: 'anterior-medial',
  adductor_minimus: 'anterior-medial',
  gracilis: 'anterior-medial',
  pectineus: 'anterior-medial',
  tensor_fasciae_latae: 'lateral',

  gastrocnemius: 'posterior',
  soleus: 'posterior',
  plantaris: 'posterior',
  popliteus: 'posterior',
  tibialis_posterior: 'posterior',
  flexor_digitorum_longus: 'posterior',
  flexor_hallucis_longus: 'posterior',
  fibularis_longus: 'lateral',
  fibularis_brevis: 'lateral',
  fibularis_tertius: 'lateral',
  abductor_hallucis: 'posterior',
  abductor_digiti_minimi_foot: 'posterior',
  flexor_digitorum_brevis: 'posterior',
  flexor_hallucis_brevis: 'posterior',
  flexor_digiti_minimi_brevis_foot: 'posterior',
  flexor_accessorius: 'posterior',
  opponens_digiti_minimi_foot: 'posterior',
}

/** Face for one muscle. Region default, then an explicit override. */
export function viewForMuscle(muscle: Muscle | ViewOnlyMuscle): AnatomicalView {
  if (muscle.id === 'masseter' || muscle.id === 'temporalis') return 'lateral'
  if (muscle.id === 'extensor_digitorum_brevis') return 'anterior'
  if (muscle.region === 'head') return 'lateral'
  return MUSCLE_VIEW[muscle.id] ?? MUSCLE_REGION_VIEW[muscle.region]
}

/** Face for one bone, by group, with the few bones that need their own face. */
export function viewForBone(bone: AxialBone): AnatomicalView {
  if (bone.id === 'femur') return 'anterior-medial'
  if (bone.id === 'scaphoid') return 'anterior-lateral'
  if (bone.id.startsWith('rib')) return 'anterior-medial'
  if (bone.id === 'scapula' || bone.id === 'occipital' || bone.id === 'sacrum') return 'posterior'
  if (bone.id === 'hip') return 'anterior-lateral'
  if (bone.part === 'vertebrae') return 'posterior'
  if (bone.part === 'short') return 'anterior-lateral'
  if (bone.region === 'skull') return 'anterior'
  return 'anterior'
}

export function viewForMuscleId(id: string): AnatomicalView {
  const muscle = allViewMuscles().find((m) => m.id === id)
  return muscle ? viewForMuscle(muscle) : 'anterior'
}

export function viewForBoneId(id: string): AnatomicalView {
  const bone = AXIAL_BONES.find((b) => b.id === id)
  return bone ? viewForBone(bone) : 'anterior'
}

/** Every catalog id resolves. Used by the framing tests. */
const TISSUE_VIEW_FACE: Record<string, AnatomicalView> = {
  atfl: 'lateral',
  cfl: 'lateral',
  ptfl: 'posterior-lateral',
  aitfl: 'anterior-lateral',
  pitfl: 'posterior-lateral',
  trans_tibfib: 'posterior-lateral',
  deltoid_ligament: 'anterior-medial',
  long_plantar: 'posterior',
  calcaneal_tendon: 'posterior',
  it_tract: 'lateral',
  flexor_retinaculum_wrist: 'anterior',
  cervical_ligament: 'anterior-lateral',
  interosseous_talocalcaneal: 'anterior-lateral',
  flexor_retinaculum_ankle: 'anterior-medial',
  spring_ligament: 'posterior',
  bifurcate: 'anterior-lateral',
  dorsal_tarsometatarsal: 'anterior',
  plantar_tarsometatarsal: 'posterior',
  cuneometatarsal_interosseous: 'anterior',
  acl: 'anterior',
  pcl: 'posterior',
  lcl: 'lateral',
}

export function viewForTissue(item: TissueItem): AnatomicalView {
  return TISSUE_VIEW_FACE[item.id] ?? 'lateral'
}

export function viewForTissueId(id: string): AnatomicalView {
  const item = TISSUE.find((row) => row.id === id)
  return item ? viewForTissue(item) : 'lateral'
}

export function catalogCoverage(): { muscles: number; bones: number; unknownOverrides: string[] } {
  const ids = new Set(allViewMuscles().map((m) => m.id))
  const unknownOverrides = Object.keys(MUSCLE_VIEW).filter((id) => !ids.has(id))
  return { muscles: MUSCLES.length, bones: AXIAL_BONES.length, unknownOverrides }
}

export type Vec3 = { x: number; y: number; z: number }

function norm(x: number, y: number, z: number): Vec3 {
  const len = Math.hypot(x, y, z) || 1
  return { x: x / len, y: y / len, z: z / len }
}

/**
 * Sign of the box edge farthest from the midline.
 * Positive x is one side of the body, negative x the other.
 * This is the mesh's world position, not its name.
 */
export function sideFromBox(minX: number, maxX: number): -1 | 0 | 1 {
  const outer = Math.abs(maxX) >= Math.abs(minX) ? maxX : minX
  if (Math.abs(outer) < 0.05) return 0
  return outer > 0 ? 1 : -1
}

/**
 * Unit vector from the target toward the camera.
 * `side` only mirrors the view. It does not change which face is shown.
 * A midline target (side 0) uses the body's positive-x side for oblique views.
 */
export function directionFor(view: AnatomicalView, side: -1 | 0 | 1): Vec3 {
  const s = side === 0 ? 1 : side
  switch (view) {
    case 'anterior':
      return norm(0, 0.16, 1)
    case 'posterior':
      return norm(s * 0.18, 0.16, -1)
    case 'lateral':
      return norm(s, 0.14, 0.08)
    case 'anterior-medial':
      return norm(-s * 0.7, 0.16, 0.86)
    case 'anterior-lateral':
      return norm(s * 0.4, 0.16, 0.94)
    case 'posterior-lateral':
      return norm(s * 0.7, 0.2, -0.78)
  }
}
