/** Playable muscle quiz set — BodyParts3D meshes (CC BY 4.0). */

export type MuscleRegion =
  | 'neck_back'
  | 'chest_abdomen'
  | 'shoulder_arm'
  | 'hip_thigh'
  | 'lower_leg'

export const MUSCLE_REGIONS: { id: MuscleRegion; label: string }[] = [
  { id: 'neck_back', label: 'Neck & back' },
  { id: 'chest_abdomen', label: 'Chest & abdomen' },
  { id: 'shoulder_arm', label: 'Shoulder & arm' },
  { id: 'hip_thigh', label: 'Hip & thigh' },
  { id: 'lower_leg', label: 'Lower leg' },
]

export type Muscle = {
  id: string
  region: MuscleRegion
  meshNames: string[]
  displayName: string
  aliases: string[]
  hint: string
}

const T = (side: 'l' | 'r', keys: string[]) => keys.map((k) => `${k}_${side}`)

/** First playable slice — ≥12 named muscles with real meshes. */
export const MUSCLES: Muscle[] = [
  {
    id: 'trapezius',
    region: 'neck_back',
    meshNames: [
      ...T('l', ['trap_asc', 'trap_trans', 'trap_desc']),
      ...T('r', ['trap_asc', 'trap_trans', 'trap_desc']),
    ],
    displayName: 'trapezius',
    aliases: ['trapezius', 'traps', 'trapezius muscle'],
    hint: 'trapezius · diamond-shaped upper back',
  },
  {
    id: 'sternocleidomastoid',
    region: 'neck_back',
    meshNames: ['scm_l', 'scm_r'],
    displayName: 'sternocleidomastoid',
    aliases: ['sternocleidomastoid', 'scm', 'sternomastoid'],
    hint: 'SCM · sternum + clavicle → mastoid',
  },
  {
    id: 'deltoid',
    region: 'shoulder_arm',
    meshNames: [
      ...T('l', ['delt_clav', 'delt_acro', 'delt_spin']),
      ...T('r', ['delt_clav', 'delt_acro', 'delt_spin']),
    ],
    displayName: 'deltoid',
    aliases: ['deltoid', 'deltoid muscle', 'delts'],
    hint: 'deltoid · shoulder cap (clavicular, acromial, spinal)',
  },
  {
    id: 'pectoralis_major',
    region: 'chest_abdomen',
    meshNames: [
      ...T('l', ['pec_clav', 'pec_stern', 'pec_abd']),
      ...T('r', ['pec_clav', 'pec_stern', 'pec_abd']),
    ],
    displayName: 'pectoralis major',
    aliases: ['pectoralis major', 'pec major', 'pectoralis', 'pecs', 'pectoral'],
    hint: 'pectoralis major · clavicular + sternocostal + abdominal',
  },
  {
    id: 'external_oblique',
    region: 'chest_abdomen',
    meshNames: ['ext_oblique_l', 'ext_oblique_r'],
    displayName: 'external oblique',
    aliases: ['external oblique', 'external abdominal oblique', 'obliquus externus'],
    hint: 'external oblique · hands-in-pockets fiber direction',
  },
  {
    id: 'biceps_brachii',
    region: 'shoulder_arm',
    meshNames: [
      ...T('l', ['biceps_long', 'biceps_short']),
      ...T('r', ['biceps_long', 'biceps_short']),
    ],
    displayName: 'biceps brachii',
    aliases: ['biceps brachii', 'biceps', 'biceps of arm'],
    hint: 'biceps brachii · long + short heads',
  },
  {
    id: 'triceps_brachii',
    region: 'shoulder_arm',
    meshNames: [
      ...T('l', ['triceps_long', 'triceps_lat', 'triceps_med']),
      ...T('r', ['triceps_long', 'triceps_lat', 'triceps_med']),
    ],
    displayName: 'triceps brachii',
    aliases: ['triceps brachii', 'triceps', 'triceps of arm'],
    hint: 'triceps brachii · long + lateral + medial heads',
  },
  {
    id: 'gluteus_maximus',
    region: 'hip_thigh',
    meshNames: ['glut_max_l', 'glut_max_r'],
    displayName: 'gluteus maximus',
    aliases: ['gluteus maximus', 'glute max', 'glutes', 'gluteus maximus muscle'],
    hint: 'gluteus maximus · primary hip extensor',
  },
  {
    id: 'rectus_femoris',
    region: 'hip_thigh',
    meshNames: ['rectus_fem_l', 'rectus_fem_r'],
    displayName: 'rectus femoris',
    aliases: ['rectus femoris', 'rectus femoris muscle'],
    hint: 'rectus femoris · only quad that crosses the hip',
  },
  {
    id: 'vastus_lateralis',
    region: 'hip_thigh',
    meshNames: ['vastus_lat_l', 'vastus_lat_r'],
    displayName: 'vastus lateralis',
    aliases: ['vastus lateralis', 'vastus lateralis muscle'],
    hint: 'vastus lateralis · largest quadriceps muscle',
  },
  {
    id: 'vastus_medialis',
    region: 'hip_thigh',
    meshNames: ['vastus_med_l', 'vastus_med_r'],
    displayName: 'vastus medialis',
    aliases: ['vastus medialis', 'vastus medialis muscle', 'vmo'],
    hint: 'vastus medialis · teardrop on the medial knee',
  },
  {
    id: 'biceps_femoris',
    region: 'hip_thigh',
    meshNames: [
      ...T('l', ['bf_long', 'bf_short']),
      ...T('r', ['bf_long', 'bf_short']),
    ],
    displayName: 'biceps femoris',
    aliases: ['biceps femoris', 'biceps femoris muscle'],
    hint: 'biceps femoris · lateral hamstring (long + short)',
  },
  {
    id: 'semitendinosus',
    region: 'hip_thigh',
    meshNames: ['semitend_l', 'semitend_r'],
    displayName: 'semitendinosus',
    aliases: ['semitendinosus', 'semitendinosus muscle'],
    hint: 'semitendinosus · medial hamstring (pes anserinus)',
  },
  {
    id: 'semimembranosus',
    region: 'hip_thigh',
    meshNames: ['semimemb_l', 'semimemb_r'],
    displayName: 'semimembranosus',
    aliases: ['semimembranosus', 'semimembranosus muscle'],
    hint: 'semimembranosus · deepest medial hamstring',
  },
  {
    id: 'gastrocnemius',
    region: 'lower_leg',
    meshNames: [
      ...T('l', ['gastroc_lat', 'gastroc_med']),
      ...T('r', ['gastroc_lat', 'gastroc_med']),
    ],
    displayName: 'gastrocnemius',
    aliases: ['gastrocnemius', 'gastroc', 'calf muscle'],
    hint: 'gastrocnemius · two-headed calf (crosses knee)',
  },
  {
    id: 'soleus',
    region: 'lower_leg',
    meshNames: ['soleus_l', 'soleus_r'],
    displayName: 'soleus',
    aliases: ['soleus', 'soleus muscle'],
    hint: 'soleus · deep calf postural muscle',
  },
  {
    id: 'tibialis_anterior',
    region: 'lower_leg',
    meshNames: ['tib_ant_l', 'tib_ant_r'],
    displayName: 'tibialis anterior',
    aliases: ['tibialis anterior', 'tibialis anterior muscle', 'ta'],
    hint: 'tibialis anterior · primary dorsiflexor',
  },
]

export function normalizeMuscleAnswer(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function muscleAnswersMatch(typed: string, m: Muscle): boolean {
  const n = normalizeMuscleAnswer(typed)
  if (!n) return false
  const compact = n.replace(/\s+/g, '')
  return m.aliases.some((a) => {
    const na = normalizeMuscleAnswer(a)
    return na === n || na.replace(/\s+/g, '') === compact
  })
}

export function filterMuscles(regions: Iterable<MuscleRegion>): Muscle[] {
  const set = new Set(regions)
  return MUSCLES.filter((m) => set.has(m.region))
}

/** Deferred (not in this BP3D OBJ pack): latissimus dorsi, rectus abdominis, vastus intermedius as separate, iliacus/psoas. */
export const MUSCLES_DEFERRED = [
  'latissimus dorsi',
  'rectus abdominis',
  'vastus intermedius',
  'iliacus',
  'psoas major',
  'serratus anterior',
] as const
