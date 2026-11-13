import { assetUrl } from '../assetUrl'
import {
  matchAliases,
  normalizeAnswerText,
  type AnswerMatchMode,
} from './answerMatch'

export type BoneRegion =
  | 'skull'
  | 'spine'
  | 'thorax'
  | 'upper'
  | 'lower'
  | 'pelvis'

export const BONE_REGIONS: { id: BoneRegion; label: string }[] = [
  { id: 'skull', label: 'Skull' },
  { id: 'spine', label: 'Spine' },
  { id: 'thorax', label: 'Thorax' },
  { id: 'upper', label: 'Upper limb' },
  { id: 'lower', label: 'Lower limb' },
  { id: 'pelvis', label: 'Pelvis' },
]

/** Anatomical bone-class / part filters (AND with region) */
export type BonePart =
  | 'vertebrae'
  | 'ribs_sternum'
  | 'cranial'
  | 'long'
  | 'flat'
  | 'irregular'
  | 'short'
  | 'sesamoid'

export const BONE_PARTS: { id: BonePart; label: string }[] = [
  { id: 'vertebrae', label: 'Vertebrae' },
  { id: 'ribs_sternum', label: 'Ribs / sternum' },
  { id: 'cranial', label: 'Skull bones' },
  { id: 'long', label: 'Long bones' },
  { id: 'flat', label: 'Flat bones' },
  { id: 'short', label: 'Short bones' },
  { id: 'sesamoid', label: 'Sesamoid' },
  { id: 'irregular', label: 'Irregular' },
]

/** One-tap study presets (region ∩ part safe — never empty). */
export type FilterPreset =
  | 'all'
  | 'upper'
  | 'lower'
  | 'axial'
  | 'hand_wrist'
  | 'foot_ankle'
  | 'spine_ribs'

export const FILTER_PRESETS: { id: FilterPreset; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'upper', label: 'Upper limb' },
  { id: 'lower', label: 'Lower limb' },
  { id: 'axial', label: 'Axial' },
  { id: 'hand_wrist', label: 'Hand & wrist' },
  { id: 'foot_ankle', label: 'Foot & ankle' },
  { id: 'spine_ribs', label: 'Spine & ribs' },
]

export type BoneTag = 'hand_wrist' | 'foot_ankle'

export type AxialBone = {
  id: string
  region: BoneRegion
  part: BonePart
  /** Mesh node name(s) — highlight all of these */
  meshNames: string[]
  displayName: string
  /** Accepted answers (case-insensitive, punctuation stripped) */
  aliases: string[]
  /** Short etymology / hint shown after correct / during LEARN */
  hint: string
  /** Study tags for one-tap presets */
  tags?: BoneTag[]
}

const EXTRA = assetUrl('models/extra')

/** Manifest of extra BodyParts3D GLBs loaded alongside thorax.glb */
export const EXTRA_MODEL_URLS: string[] = [
  'frontal', 'parietal_l', 'parietal_r', 'temporal_l', 'temporal_r', 'occipital',
  'mandible', 'maxilla_l', 'maxilla_r', 'zygomatic_l', 'zygomatic_r',
  'clavicle_l', 'clavicle_r', 'scapula_l', 'scapula_r',
  'humerus_l', 'humerus_r', 'radius_l', 'radius_r', 'ulna_l', 'ulna_r',
  'femur_l', 'femur_r', 'tibia_l', 'tibia_r', 'fibula_l', 'fibula_r',
  'patella_l', 'patella_r', 'hip_l', 'hip_r', 'sacrum',
  'vertebra_l2', 'vertebra_l3', 'vertebra_l4', 'vertebra_l5',
  'vertebra_c1', 'vertebra_c2', 'vertebra_c3', 'vertebra_c4', 'vertebra_c5', 'vertebra_c6',
].map((n) => `${EXTRA}/${n}.glb`)

/** Full playable quiz set (thorax + skull + limbs + pelvis + lumbar fill) */
export const AXIAL_BONES: AxialBone[] = [
  // —— Cervical / thoracic / lumbar ——
  {
    id: 'c1',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_c1'],
    displayName: 'C1',
    aliases: ['c1', 'c 1', 'atlas', 'cervical 1', '1st cervical', 'first cervical'],
    hint: 'atlas · first cervical vertebra',
  },
  {
    id: 'c2',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_c2'],
    displayName: 'C2',
    aliases: ['c2', 'c 2', 'axis', 'cervical 2', '2nd cervical', 'second cervical'],
    hint: 'axis · second cervical vertebra',
  },
  {
    id: 'c3',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_c3'],
    displayName: 'C3',
    aliases: ['c3', 'c 3', 'cervical 3', '3rd cervical', 'third cervical', 'cervical vertebra 3'],
    hint: 'third cervical vertebra',
  },
  {
    id: 'c4',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_c4'],
    displayName: 'C4',
    aliases: ['c4', 'c 4', 'cervical 4', '4th cervical', 'fourth cervical', 'cervical vertebra 4'],
    hint: 'fourth cervical vertebra',
  },
  {
    id: 'c5',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_c5'],
    displayName: 'C5',
    aliases: ['c5', 'c 5', 'cervical 5', '5th cervical', 'fifth cervical', 'cervical vertebra 5'],
    hint: 'fifth cervical vertebra',
  },
  {
    id: 'c6',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_c6'],
    displayName: 'C6',
    aliases: ['c6', 'c 6', 'cervical 6', '6th cervical', 'sixth cervical', 'cervical vertebra 6'],
    hint: 'sixth cervical vertebra',
  },
  {
    id: 'c7',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_c7'],
    displayName: 'C7',
    aliases: ['c7', 'c 7', 'cervical 7', '7th cervical', 'seventh cervical', 'vertebra prominens'],
    hint: 'vertebra prominens · seventh cervical',
  },
  ...(['t1','t2','t3','t4','t5','t6','t7','t8','t9','t10','t11','t12'] as const).map((id, i) => {
    const n = i + 1
    const ordinals = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth']
    return {
      id,
      region: 'spine' as const,
      part: 'vertebrae' as const,
      meshNames: [`vertebra_${id}`],
      displayName: id.toUpperCase(),
      aliases: [id, `t ${n}`, `thoracic ${n}`, `${n}th thoracic`, `${ordinals[i]} thoracic`, `thoracic vertebra ${n}`, `${n}st thoracic`, `${n}nd thoracic`, `${n}rd thoracic`].filter(Boolean),
      hint: `${ordinals[i]} thoracic vertebra`,
    } satisfies AxialBone
  }),
  {
    id: 'l1',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_l1'],
    displayName: 'L1',
    aliases: ['l1', 'l 1', 'lumbar 1', '1st lumbar', 'first lumbar', 'lumbar vertebra 1'],
    hint: 'first lumbar vertebra',
  },
  {
    id: 'l2',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_l2'],
    displayName: 'L2',
    aliases: ['l2', 'l 2', 'lumbar 2', '2nd lumbar', 'second lumbar', 'lumbar vertebra 2'],
    hint: 'second lumbar vertebra',
  },
  {
    id: 'l3',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_l3'],
    displayName: 'L3',
    aliases: ['l3', 'l 3', 'lumbar 3', '3rd lumbar', 'third lumbar', 'lumbar vertebra 3'],
    hint: 'third lumbar vertebra',
  },
  {
    id: 'l4',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_l4'],
    displayName: 'L4',
    aliases: ['l4', 'l 4', 'lumbar 4', '4th lumbar', 'fourth lumbar', 'lumbar vertebra 4'],
    hint: 'fourth lumbar vertebra',
  },
  {
    id: 'l5',
    part: 'vertebrae',
    region: 'spine',
    meshNames: ['vertebra_l5'],
    displayName: 'L5',
    aliases: ['l5', 'l 5', 'lumbar 5', '5th lumbar', 'fifth lumbar', 'lumbar vertebra 5'],
    hint: 'fifth lumbar vertebra',
  },
  {
    id: 'sacrum',
    part: 'irregular',
    region: 'pelvis',
    meshNames: ['sacrum'],
    displayName: 'sacrum',
    aliases: ['sacrum', 'sacral bone', 'os sacrum'],
    hint: 'os sacrum · sacred bone',
  },

  // —— Sternum / ribs ——
  {
    id: 'manubrium',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['sternum_manubrium'],
    displayName: 'manubrium',
    aliases: ['manubrium', 'manubrium of sternum', 'sternal manubrium', 'handle of sternum'],
    hint: 'manubrium sterni · handle (Latin manubrium)',
  },
  {
    id: 'sternum_body',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['sternum_body'],
    displayName: 'body of sternum',
    aliases: ['body of sternum', 'sternal body', 'sternum body', 'gladiolus', 'corpus sterni', 'sternum'],
    hint: 'corpus sterni · gladiolus (sword blade)',
  },
  {
    id: 'xiphoid',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['sternum_xiphoid'],
    displayName: 'xiphoid process',
    aliases: ['xiphoid', 'xiphoid process', 'xiphisternum', 'ensiform process'],
    hint: 'xiphoid · sword-shaped (Greek xiphos)',
  },
  {
    id: 'rib1',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l1', 'rib_r1'],
    displayName: '1st rib',
    aliases: ['1st rib', 'first rib', 'rib 1', 'rib1', '1 rib'],
    hint: 'costa I · atypical short broad rib',
  },
  {
    id: 'rib2',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l2', 'rib_r2'],
    displayName: '2nd rib',
    aliases: ['2nd rib', 'second rib', 'rib 2', 'rib2', '2 rib'],
    hint: 'costa II · atypical, thinner than 1st',
  },
  {
    id: 'rib3',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l3', 'rib_r3'],
    displayName: '3rd rib',
    aliases: ['3rd rib', 'third rib', 'rib 3', 'rib3', '3 rib'],
    hint: 'costa III · typical true rib',
  },
  {
    id: 'rib4',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l4', 'rib_r4'],
    displayName: '4th rib',
    aliases: ['4th rib', 'fourth rib', 'rib 4', 'rib4', '4 rib'],
    hint: 'costa IV · typical true rib',
  },
  {
    id: 'rib5',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l5', 'rib_r5'],
    displayName: '5th rib',
    aliases: ['5th rib', 'fifth rib', 'rib 5', 'rib5', '5 rib'],
    hint: 'costa V · typical true rib',
  },
  {
    id: 'rib6',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l6', 'rib_r6'],
    displayName: '6th rib',
    aliases: ['6th rib', 'sixth rib', 'rib 6', 'rib6', '6 rib'],
    hint: 'costa VI · typical true rib',
  },
  {
    id: 'rib7',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l7', 'rib_r7'],
    displayName: '7th rib',
    aliases: ['7th rib', 'seventh rib', 'rib 7', 'rib7', '7 rib'],
    hint: 'costa VII · last true rib',
  },
  {
    id: 'rib8',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l8', 'rib_r8'],
    displayName: '8th rib',
    aliases: ['8th rib', 'eighth rib', 'rib 8', 'rib8', '8 rib'],
    hint: 'costa VIII · first false rib',
  },
  {
    id: 'rib9',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l9', 'rib_r9'],
    displayName: '9th rib',
    aliases: ['9th rib', 'ninth rib', 'rib 9', 'rib9', '9 rib'],
    hint: 'costa IX · false rib',
  },
  {
    id: 'rib10',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l10', 'rib_r10'],
    displayName: '10th rib',
    aliases: ['10th rib', 'tenth rib', 'rib 10', 'rib10', '10 rib'],
    hint: 'costa X · false rib',
  },
  {
    id: 'rib11',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l11', 'rib_r11'],
    displayName: '11th rib',
    aliases: ['11th rib', 'eleventh rib', 'rib 11', 'rib11', '11 rib', 'floating rib'],
    hint: 'costa XI · floating rib',
  },
  {
    id: 'rib12',
    part: 'ribs_sternum',
    region: 'thorax',
    meshNames: ['rib_l12', 'rib_r12'],
    displayName: '12th rib',
    aliases: ['12th rib', 'twelfth rib', 'rib 12', 'rib12', '12 rib', 'floating rib'],
    hint: 'costa XII · floating rib',
  },

  // —— Skull ——
  {
    id: 'frontal',
    part: 'cranial',
    region: 'skull',
    meshNames: ['frontal'],
    displayName: 'frontal bone',
    aliases: ['frontal', 'frontal bone', 'os frontale'],
    hint: 'os frontale · forehead bone',
  },
  {
    id: 'parietal',
    part: 'cranial',
    region: 'skull',
    meshNames: ['parietal_l', 'parietal_r'],
    displayName: 'parietal bone',
    aliases: ['parietal', 'parietal bone', 'os parietale'],
    hint: 'os parietale · wall of the skull',
  },
  {
    id: 'temporal',
    part: 'cranial',
    region: 'skull',
    meshNames: ['temporal_l', 'temporal_r'],
    displayName: 'temporal bone',
    aliases: ['temporal', 'temporal bone', 'os temporale'],
    hint: 'os temporale · temple bone',
  },
  {
    id: 'occipital',
    part: 'cranial',
    region: 'skull',
    meshNames: ['occipital'],
    displayName: 'occipital bone',
    aliases: ['occipital', 'occipital bone', 'os occipitale'],
    hint: 'os occipitale · back of the head',
  },
  {
    id: 'mandible',
    part: 'cranial',
    region: 'skull',
    meshNames: ['mandible'],
    displayName: 'mandible',
    aliases: ['mandible', 'jaw', 'jawbone', 'lower jaw', 'mandibular bone'],
    hint: 'mandible · lower jaw',
  },
  {
    id: 'maxilla',
    part: 'cranial',
    region: 'skull',
    meshNames: ['maxilla_l', 'maxilla_r'],
    displayName: 'maxilla',
    aliases: ['maxilla', 'upper jaw', 'maxillary bone'],
    hint: 'maxilla · upper jaw',
  },
  {
    id: 'zygomatic',
    part: 'cranial',
    region: 'skull',
    meshNames: ['zygomatic_l', 'zygomatic_r'],
    displayName: 'zygomatic bone',
    aliases: ['zygomatic', 'zygomatic bone', 'cheekbone', 'cheek bone', 'malar bone'],
    hint: 'zygoma · cheekbone',
  },

  // —— Upper limb ——
  {
    id: 'clavicle',
    part: 'long',
    region: 'upper',
    meshNames: ['clavicle_l', 'clavicle_r'],
    displayName: 'clavicle',
    aliases: ['clavicle', 'collarbone', 'collar bone'],
    hint: 'clavicle · little key (Latin clavicula)',
  },
  {
    id: 'scapula',
    part: 'flat',
    region: 'upper',
    meshNames: ['scapula_l', 'scapula_r'],
    displayName: 'scapula',
    aliases: ['scapula', 'shoulder blade', 'shoulderblade'],
    hint: 'scapula · shoulder blade',
  },
  {
    id: 'humerus',
    part: 'long',
    region: 'upper',
    meshNames: ['humerus_l', 'humerus_r'],
    displayName: 'humerus',
    aliases: ['humerus', 'upper arm bone'],
    hint: 'humerus · upper arm bone',
  },
  {
    id: 'radius',
    part: 'long',
    region: 'upper',
    meshNames: ['radius_l', 'radius_r'],
    displayName: 'radius',
    aliases: ['radius', 'radial bone'],
    hint: 'radius · lateral forearm bone',
  },
  {
    id: 'ulna',
    part: 'long',
    region: 'upper',
    meshNames: ['ulna_l', 'ulna_r'],
    displayName: 'ulna',
    aliases: ['ulna', 'ulnar bone'],
    hint: 'ulna · medial forearm bone',
  },

  // —— Pelvis / lower limb ——
  {
    id: 'hip',
    part: 'flat',
    region: 'pelvis',
    meshNames: ['hip_l', 'hip_r'],
    displayName: 'hip bone',
    aliases: ['hip bone', 'hipbone', 'os coxae', 'coxal bone', 'innominate bone', 'ilium', 'pelvic bone'],
    hint: 'os coxae · hip bone (ilium + ischium + pubis fused)',
  },
  {
    id: 'femur',
    part: 'long',
    region: 'lower',
    meshNames: ['femur_l', 'femur_r'],
    displayName: 'femur',
    aliases: ['femur', 'thigh bone', 'thighbone'],
    hint: 'femur · thigh bone',
  },
  {
    id: 'patella',
    part: 'sesamoid',
    region: 'lower',
    meshNames: ['patella_l', 'patella_r'],
    displayName: 'patella',
    aliases: ['patella', 'kneecap', 'knee cap'],
    hint: 'patella · kneecap (sesamoid)',
  },
  {
    id: 'tibia',
    part: 'long',
    region: 'lower',
    meshNames: ['tibia_l', 'tibia_r'],
    displayName: 'tibia',
    aliases: ['tibia', 'shinbone', 'shin bone'],
    hint: 'tibia · shinbone',
  },
  {
    id: 'fibula',
    part: 'long',
    region: 'lower',
    meshNames: ['fibula_l', 'fibula_r'],
    displayName: 'fibula',
    aliases: ['fibula', 'calf bone'],
    hint: 'fibula · calf bone (Latin clasp)',
  },

  // —— Hand / wrist (carpals, metacarpals, phalanges) ——
  {
    id: 'scaphoid',
    part: 'short',
    region: 'upper',
    meshNames: ['scaphoid_l', 'scaphoid_r'],
    displayName: 'scaphoid',
    aliases: ['scaphoid', 'scaphoid bone', 'navicular of hand'],
    hint: 'scaphoid · boat-shaped carpal (most fractured)',
    tags: ['hand_wrist'],
  },
  {
    id: 'lunate',
    part: 'short',
    region: 'upper',
    meshNames: ['lunate_l', 'lunate_r'],
    displayName: 'lunate',
    aliases: ['lunate', 'lunate bone', 'semilunar'],
    hint: 'lunate · moon-shaped carpal',
    tags: ['hand_wrist'],
  },
  {
    id: 'triquetrum',
    part: 'short',
    region: 'upper',
    meshNames: ['triquetrum_l', 'triquetrum_r'],
    displayName: 'triquetrum',
    aliases: ['triquetrum', 'triquetral', 'triquetral bone', 'triangular bone'],
    hint: 'triquetrum · three-cornered carpal',
    tags: ['hand_wrist'],
  },
  {
    id: 'pisiform',
    part: 'short',
    region: 'upper',
    meshNames: ['pisiform_l', 'pisiform_r'],
    displayName: 'pisiform',
    aliases: ['pisiform', 'pisiform bone'],
    hint: 'pisiform · pea-shaped carpal (sesamoid-like)',
    tags: ['hand_wrist'],
  },
  {
    id: 'trapezium',
    part: 'short',
    region: 'upper',
    meshNames: ['trapezium_l', 'trapezium_r'],
    displayName: 'trapezium',
    aliases: ['trapezium', 'trapezium bone', 'greater multangular'],
    hint: 'trapezium · under the thumb (1st CMC)',
    tags: ['hand_wrist'],
  },
  {
    id: 'trapezoid',
    part: 'short',
    region: 'upper',
    meshNames: ['trapezoid_l', 'trapezoid_r'],
    displayName: 'trapezoid',
    aliases: ['trapezoid', 'trapezoid bone', 'lesser multangular'],
    hint: 'trapezoid · under index metacarpal',
    tags: ['hand_wrist'],
  },
  {
    id: 'capitate',
    part: 'short',
    region: 'upper',
    meshNames: ['capitate_l', 'capitate_r'],
    displayName: 'capitate',
    aliases: ['capitate', 'capitate bone', 'os magnum'],
    hint: 'capitate · largest carpal (headed)',
    tags: ['hand_wrist'],
  },
  {
    id: 'hamate',
    part: 'short',
    region: 'upper',
    meshNames: ['hamate_l', 'hamate_r'],
    displayName: 'hamate',
    aliases: ['hamate', 'hamate bone', 'unciform'],
    hint: 'hamate · hooked carpal (hamulus)',
    tags: ['hand_wrist'],
  },
  {
    id: 'metacarpals',
    part: 'long',
    region: 'upper',
    meshNames: ['metacarpal1_l', 'metacarpal1_r', 'metacarpal2_l', 'metacarpal2_r', 'metacarpal3_l', 'metacarpal3_r', 'metacarpal4_l', 'metacarpal4_r', 'metacarpal5_l', 'metacarpal5_r'],
    displayName: 'metacarpals',
    aliases: ['metacarpals', 'metacarpal bones', 'metacarpal', 'metacarpus'],
    hint: 'metacarpals · five bones of the palm (I–V)',
    tags: ['hand_wrist'],
  },
  {
    id: 'metacarpal1',
    part: 'long',
    region: 'upper',
    meshNames: ['metacarpal1_l', 'metacarpal1_r'],
    displayName: '1st metacarpal',
    aliases: ['1st metacarpal', 'first metacarpal', 'metacarpal 1', 'metacarpal i', 'thumb metacarpal'],
    hint: '1st metacarpal · thumb metacarpal',
    tags: ['hand_wrist'],
  },
  {
    id: 'metacarpal2',
    part: 'long',
    region: 'upper',
    meshNames: ['metacarpal2_l', 'metacarpal2_r'],
    displayName: '2nd metacarpal',
    aliases: ['2nd metacarpal', 'second metacarpal', 'metacarpal 2', 'metacarpal ii', 'index metacarpal'],
    hint: '2nd metacarpal · index finger',
    tags: ['hand_wrist'],
  },
  {
    id: 'metacarpal3',
    part: 'long',
    region: 'upper',
    meshNames: ['metacarpal3_l', 'metacarpal3_r'],
    displayName: '3rd metacarpal',
    aliases: ['3rd metacarpal', 'third metacarpal', 'metacarpal 3', 'metacarpal iii'],
    hint: '3rd metacarpal · middle finger',
    tags: ['hand_wrist'],
  },
  {
    id: 'metacarpal4',
    part: 'long',
    region: 'upper',
    meshNames: ['metacarpal4_l', 'metacarpal4_r'],
    displayName: '4th metacarpal',
    aliases: ['4th metacarpal', 'fourth metacarpal', 'metacarpal 4', 'metacarpal iv'],
    hint: '4th metacarpal · ring finger',
    tags: ['hand_wrist'],
  },
  {
    id: 'metacarpal5',
    part: 'long',
    region: 'upper',
    meshNames: ['metacarpal5_l', 'metacarpal5_r'],
    displayName: '5th metacarpal',
    aliases: ['5th metacarpal', 'fifth metacarpal', 'metacarpal 5', 'metacarpal v'],
    hint: '5th metacarpal · little finger',
    tags: ['hand_wrist'],
  },
  {
    id: 'hand_phalanges',
    part: 'long',
    region: 'upper',
    meshNames: ['phal_hand_prox_thumb_l', 'phal_hand_prox_index_l', 'phal_hand_prox_middle_l', 'phal_hand_prox_ring_l', 'phal_hand_prox_little_l', 'phal_hand_mid_index_l', 'phal_hand_mid_middle_l', 'phal_hand_mid_ring_l', 'phal_hand_mid_little_l', 'phal_hand_dist_thumb_l', 'phal_hand_dist_index_l', 'phal_hand_dist_middle_l', 'phal_hand_dist_ring_l', 'phal_hand_dist_little_l', 'phal_hand_prox_thumb_r', 'phal_hand_prox_index_r', 'phal_hand_prox_middle_r', 'phal_hand_prox_ring_r', 'phal_hand_prox_little_r', 'phal_hand_mid_index_r', 'phal_hand_mid_middle_r', 'phal_hand_mid_ring_r', 'phal_hand_mid_little_r', 'phal_hand_dist_thumb_r', 'phal_hand_dist_index_r', 'phal_hand_dist_middle_r', 'phal_hand_dist_ring_r', 'phal_hand_dist_little_r'],
    displayName: 'hand phalanges',
    aliases: ['hand phalanges', 'phalanges of hand', 'finger bones', 'phalanges', 'phalanx of finger', 'finger phalanges'],
    hint: 'phalanges · proximal, middle, distal (thumb has two)',
    tags: ['hand_wrist'],
  },

  // —— Foot / ankle (tarsals, metatarsals, phalanges) ——
  {
    id: 'calcaneus',
    part: 'short',
    region: 'lower',
    meshNames: ['calcaneus_l', 'calcaneus_r'],
    displayName: 'calcaneus',
    aliases: ['calcaneus', 'calcaneum', 'heel bone', 'heelbone'],
    hint: 'calcaneus · heel bone',
    tags: ['foot_ankle'],
  },
  {
    id: 'talus',
    part: 'short',
    region: 'lower',
    meshNames: ['talus_l', 'talus_r'],
    displayName: 'talus',
    aliases: ['talus', 'astragalus', 'ankle bone'],
    hint: 'talus · ankle bone (trochlea)',
    tags: ['foot_ankle'],
  },
  {
    id: 'navicular',
    part: 'short',
    region: 'lower',
    meshNames: ['navicular_l', 'navicular_r'],
    displayName: 'navicular',
    aliases: ['navicular', 'navicular bone', 'navicular of foot'],
    hint: 'navicular · boat-shaped tarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'cuboid',
    part: 'short',
    region: 'lower',
    meshNames: ['cuboid_l', 'cuboid_r'],
    displayName: 'cuboid',
    aliases: ['cuboid', 'cuboid bone'],
    hint: 'cuboid · lateral tarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'cuneiform_medial',
    part: 'short',
    region: 'lower',
    meshNames: ['cuneiform_med_l', 'cuneiform_med_r'],
    displayName: 'medial cuneiform',
    aliases: ['medial cuneiform', 'first cuneiform', '1st cuneiform', 'cuneiform medial'],
    hint: 'medial cuneiform · under 1st metatarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'cuneiform_intermediate',
    part: 'short',
    region: 'lower',
    meshNames: ['cuneiform_int_l', 'cuneiform_int_r'],
    displayName: 'intermediate cuneiform',
    aliases: ['intermediate cuneiform', 'middle cuneiform', 'second cuneiform', '2nd cuneiform'],
    hint: 'intermediate cuneiform · under 2nd metatarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'cuneiform_lateral',
    part: 'short',
    region: 'lower',
    meshNames: ['cuneiform_lat_l', 'cuneiform_lat_r'],
    displayName: 'lateral cuneiform',
    aliases: ['lateral cuneiform', 'third cuneiform', '3rd cuneiform'],
    hint: 'lateral cuneiform · under 3rd metatarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'metatarsals',
    part: 'long',
    region: 'lower',
    meshNames: ['metatarsal1_l', 'metatarsal1_r', 'metatarsal2_l', 'metatarsal2_r', 'metatarsal3_l', 'metatarsal3_r', 'metatarsal4_l', 'metatarsal4_r', 'metatarsal5_l', 'metatarsal5_r'],
    displayName: 'metatarsals',
    aliases: ['metatarsals', 'metatarsal bones', 'metatarsal', 'metatarsus'],
    hint: 'metatarsals · five bones of the forefoot (I–V)',
    tags: ['foot_ankle'],
  },
  {
    id: 'metatarsal1',
    part: 'long',
    region: 'lower',
    meshNames: ['metatarsal1_l', 'metatarsal1_r'],
    displayName: '1st metatarsal',
    aliases: ['1st metatarsal', 'first metatarsal', 'metatarsal 1', 'metatarsal i'],
    hint: '1st metatarsal · great toe',
    tags: ['foot_ankle'],
  },
  {
    id: 'metatarsal2',
    part: 'long',
    region: 'lower',
    meshNames: ['metatarsal2_l', 'metatarsal2_r'],
    displayName: '2nd metatarsal',
    aliases: ['2nd metatarsal', 'second metatarsal', 'metatarsal 2', 'metatarsal ii'],
    hint: '2nd metatarsal · longest metatarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'metatarsal3',
    part: 'long',
    region: 'lower',
    meshNames: ['metatarsal3_l', 'metatarsal3_r'],
    displayName: '3rd metatarsal',
    aliases: ['3rd metatarsal', 'third metatarsal', 'metatarsal 3', 'metatarsal iii'],
    hint: '3rd metatarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'metatarsal4',
    part: 'long',
    region: 'lower',
    meshNames: ['metatarsal4_l', 'metatarsal4_r'],
    displayName: '4th metatarsal',
    aliases: ['4th metatarsal', 'fourth metatarsal', 'metatarsal 4', 'metatarsal iv'],
    hint: '4th metatarsal',
    tags: ['foot_ankle'],
  },
  {
    id: 'metatarsal5',
    part: 'long',
    region: 'lower',
    meshNames: ['metatarsal5_l', 'metatarsal5_r'],
    displayName: '5th metatarsal',
    aliases: ['5th metatarsal', 'fifth metatarsal', 'metatarsal 5', 'metatarsal v'],
    hint: '5th metatarsal · styloid base (common avulsion)',
    tags: ['foot_ankle'],
  },
  {
    id: 'foot_phalanges',
    part: 'long',
    region: 'lower',
    meshNames: ['phal_foot_prox_1_l', 'phal_foot_prox_2_l', 'phal_foot_prox_3_l', 'phal_foot_prox_4_l', 'phal_foot_prox_5_l', 'phal_foot_mid_2_l', 'phal_foot_mid_3_l', 'phal_foot_mid_4_l', 'phal_foot_mid_5_l', 'phal_foot_dist_1_l', 'phal_foot_dist_2_l', 'phal_foot_dist_3_l', 'phal_foot_dist_4_l', 'phal_foot_dist_5_l', 'phal_foot_prox_1_r', 'phal_foot_prox_2_r', 'phal_foot_prox_3_r', 'phal_foot_prox_4_r', 'phal_foot_prox_5_r', 'phal_foot_mid_2_r', 'phal_foot_mid_3_r', 'phal_foot_mid_4_r', 'phal_foot_mid_5_r', 'phal_foot_dist_1_r', 'phal_foot_dist_2_r', 'phal_foot_dist_3_r', 'phal_foot_dist_4_r', 'phal_foot_dist_5_r'],
    displayName: 'foot phalanges',
    aliases: ['foot phalanges', 'phalanges of foot', 'toe bones', 'toe phalanges', 'phalanges of toes'],
    hint: 'toe phalanges · proximal, middle, distal (hallux has two)',
    tags: ['foot_ankle'],
  },
]

export function normalizeAnswer(raw: string): string {
  return normalizeAnswerText(raw)
}

export function answersMatch(
  typed: string,
  bone: AxialBone,
  mode: AnswerMatchMode = 'live',
): boolean {
  return matchAliases(typed, bone.aliases, mode, bone.displayName, normalizeAnswer)
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function bonesInRegions(regions: Iterable<BoneRegion>): AxialBone[] {
  const set = new Set(regions)
  return AXIAL_BONES.filter((b) => set.has(b.region))
}

export function filterBones(
  regions: Iterable<BoneRegion>,
  parts: Iterable<BonePart>,
): AxialBone[] {
  const rSet = new Set(regions)
  const pSet = new Set(parts)
  return AXIAL_BONES.filter((b) => rSet.has(b.region) && pSet.has(b.part))
}

export function countByRegion(): Record<BoneRegion, number> {
  const out = { skull: 0, spine: 0, thorax: 0, upper: 0, lower: 0, pelvis: 0 }
  for (const b of AXIAL_BONES) out[b.region]++
  return out
}

export function countByPart(): Record<BonePart, number> {
  const out: Record<BonePart, number> = {
    vertebrae: 0,
    ribs_sternum: 0,
    cranial: 0,
    long: 0,
    flat: 0,
    short: 0,
    sesamoid: 0,
    irregular: 0,
  }
  for (const b of AXIAL_BONES) out[b.part]++
  return out
}

/** Apply a one-tap preset → never returns empty. Also returns region/part sets to mirror UI. */
export function applyPreset(preset: FilterPreset): {
  bones: AxialBone[]
  regions: Set<BoneRegion>
  parts: Set<BonePart>
} {
  let bones: AxialBone[]
  switch (preset) {
    case 'all':
      bones = [...AXIAL_BONES]
      break
    case 'upper':
      bones = AXIAL_BONES.filter((b) => b.region === 'upper')
      break
    case 'lower':
      bones = AXIAL_BONES.filter((b) => b.region === 'lower')
      break
    case 'axial':
      bones = AXIAL_BONES.filter((b) =>
        b.region === 'skull' || b.region === 'spine' || b.region === 'thorax',
      )
      break
    case 'hand_wrist':
      bones = AXIAL_BONES.filter((b) => b.tags?.includes('hand_wrist'))
      break
    case 'foot_ankle':
      bones = AXIAL_BONES.filter((b) => b.tags?.includes('foot_ankle'))
      break
    case 'spine_ribs':
      bones = AXIAL_BONES.filter(
        (b) => b.region === 'spine' || b.region === 'thorax' || b.part === 'vertebrae' || b.part === 'ribs_sternum',
      )
      break
  }
  if (bones.length === 0) bones = [...AXIAL_BONES]
  const regions = new Set<BoneRegion>(bones.map((b) => b.region))
  const parts = new Set<BonePart>(bones.map((b) => b.part))
  return { bones, regions, parts }
}

export function presetCount(preset: FilterPreset): number {
  return applyPreset(preset).bones.length
}
