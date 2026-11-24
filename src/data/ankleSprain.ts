/**
 * Lateral ankle sprain case. Facts are limited to the HPHS4107 notes
 * (SOAP ankle case, TOTAPS / common injuries) and the workflow's locked list.
 */
import { matchAliases, type AnswerMatchMode } from './answerMatch'

export type AnkleHit = 'atfl' | 'cfl' | 'deltoid' | 'fibula' | 'other-ankle' | 'other'

export type AnkleEmphasis = 'none' | 'atfl' | 'cfl' | 'both' | 'deltoid'

export type AnkleLearnCard = {
  id: string
  kicker: string
  title: string
  paragraphs: string[]
  emphasis: AnkleEmphasis
  motion: boolean
}

export type AnkleTypeStep = {
  kind: 'type'
  id: string
  region: string
  prompt: string
  official: string
  aliases: string[]
  hint: string
  reveal: string
}

export type AnkleTapStep = {
  kind: 'tap'
  id: string
  region: string
  prompt: string
  accept: AnkleHit[]
  correct: string
  wrong: Record<AnkleHit, string>
}

export type AnkleQuizStep = AnkleTypeStep | AnkleTapStep

/** Right foot bones that move. The tibia and fibula stay in the mortise. */
export const RIGHT_FOOT_BONES: readonly string[] = [
  'talus_r',
  'calcaneus_r',
  'navicular_r',
  'cuboid_r',
  'cuneiform_med_r',
  'cuneiform_int_r',
  'cuneiform_lat_r',
  'metatarsal1_r',
  'metatarsal2_r',
  'metatarsal3_r',
  'metatarsal4_r',
  'metatarsal5_r',
  'phal_foot_prox_1_r',
  'phal_foot_prox_2_r',
  'phal_foot_prox_3_r',
  'phal_foot_prox_4_r',
  'phal_foot_prox_5_r',
  'phal_foot_mid_2_r',
  'phal_foot_mid_3_r',
  'phal_foot_mid_4_r',
  'phal_foot_mid_5_r',
  'phal_foot_dist_1_r',
  'phal_foot_dist_2_r',
  'phal_foot_dist_3_r',
  'phal_foot_dist_4_r',
  'phal_foot_dist_5_r',
]

/** Bones kept solid while the rest of the skeleton fades. */
export const ANKLE_CONTEXT_BONES: readonly string[] = ['tibia_r', 'fibula_r', ...RIGHT_FOOT_BONES]

export const ANKLE_LIGAMENT_MESHES: readonly string[] = [
  'atfl_r',
  'atfl_l',
  'cfl_r',
  'cfl_l',
  'deltoid_r',
  'deltoid_l',
]

/** Meshes framed with the right ankle. Hindfoot only — the forefoot pulled the camera too far to read the bands. Full tibia/fibula would pull it up the shin. */
export const ANKLE_FRAME_MESHES: readonly string[] = [
  'talus_r',
  'calcaneus_r',
  'navicular_r',
  'cuboid_r',
  'atfl_r',
  'cfl_r',
  'deltoid_r',
]

export const ANKLE_LEARN: readonly AnkleLearnCard[] = [
  {
    id: 'scenario',
    kicker: 'Subjective · soccer',
    title: 'The foot rolls on a cut',
    emphasis: 'none',
    motion: false,
    paragraphs: [
      'Sarah, an 18-year-old collegiate soccer winger, planted her right foot to cut past a defender. Her foot rolled. She heard a pop, felt immediate sharp pain on the outside of the ankle, and could not bear weight. Her athletic trainer helped her off. This is the sideline check, about 20 minutes later.',
      'Her words: "I rolled my ankle and heard a pop. It hurts on the outside and I can\'t walk on it."',
      'No previous ankle injuries. The pain is sharp and localized, about 7/10, and it increases with any attempted movement.',
    ],
  },
  {
    id: 'mechanism',
    kicker: 'Mechanism of injury',
    title: 'Inversion and plantarflexion',
    emphasis: 'both',
    motion: true,
    paragraphs: [
      'A sprain injures a ligament, the tissue that connects bone to bone. A twisting ankle injury is the example in the notes.',
      'Inversion turns the sole of the foot inward. Plantarflexion points the foot downward. This mechanism is an inversion plantarflexion sprain: an acute inversion and plantarflexion of the right ankle while cutting.',
      'Inversion puts the lateral ligaments under high tension. The notes name the ATFL and the CFL. Replay shows that motion on the bones we have. The ligaments stay in their resting position — these meshes are not rigged.',
    ],
  },
  {
    id: 'ligaments',
    kicker: 'Lateral ligaments',
    title: 'ATFL and CFL',
    emphasis: 'both',
    motion: false,
    paragraphs: [
      'The anterior talofibular ligament (ATFL) runs from the front of the lateral malleolus to the neck of the talus. The case impression names likely ATFL involvement.',
      'The calcaneofibular ligament (CFL) runs from the tip of the lateral malleolus down and back to the calcaneus. It is the other lateral ligament the notes put under high tension in inversion.',
      'The deltoid ligament is on the medial side. It is here so the two sides stay distinct. Inversion loads the lateral ligaments, and the deltoid was non-tender.',
    ],
  },
  {
    id: 'objective',
    kicker: 'Objective',
    title: 'Swelling and tenderness',
    emphasis: 'atfl',
    motion: false,
    paragraphs: [
      'Observation: mild swelling over the lateral malleolus and the ATFL area. No obvious deformity. She is guarding the ankle and holding it slightly inverted and plantarflexed.',
      'Palpation, with consent, starts away from the painful site. Point tenderness is over the ATFL. The distal fibula is non-tender. The deltoid ligament on the medial side is non-tender.',
      'Range of motion was not formally assessed. She was unwilling to move the ankle because of the pain.',
    ],
  },
  {
    id: 'plan',
    kicker: 'Assessment and plan',
    title: 'Grade II · POLICE',
    emphasis: 'atfl',
    motion: false,
    paragraphs: [
      'Ligament sprain grades in the notes: Grade I is micro-tearing (about 2–4 weeks). Grade II is a partial tear (about 4–12 weeks). Grade III is a complete tear (about 3–6+ months, and may require surgery).',
      'Course impression: Grade II inversion sprain of the right ankle, with likely involvement of the anterior talofibular ligament (ATFL). The notes tie that to the inversion mechanism, immediate pain and swelling, positive special tests, and loss of function.',
      'Immediate management: POLICE — Protect, Optimal Loading, Ice, Compression, Elevation.',
    ],
  },
]

const TAP_WRONG_BASE: Record<AnkleHit, string> = {
  atfl: '',
  cfl: '',
  deltoid: '',
  fibula: '',
  'other-ankle': 'That is the other ankle. This case is the right ankle.',
  other: '',
}

export const ANKLE_QUIZ: readonly AnkleQuizStep[] = [
  {
    kind: 'type',
    id: 'type-atfl',
    region: 'LIKELY INVOLVED',
    prompt: 'Type the ligament this case says is likely involved.',
    official: 'anterior talofibular ligament',
    aliases: [
      'anterior talofibular ligament',
      'anterior talo-fibular ligament',
      'anterior talofibular',
      'atfl',
    ],
    hint: 'Grade II inversion sprain. The impression names one lateral ligament.',
    reveal:
      'The impression is a Grade II inversion sprain of the right ankle, with likely involvement of the anterior talofibular ligament (ATFL).',
  },
  {
    kind: 'type',
    id: 'type-cfl',
    region: 'ALSO AT RISK',
    prompt: 'Type the other lateral ligament inversion puts under high tension.',
    official: 'calcaneofibular ligament',
    aliases: ['calcaneofibular ligament', 'calcaneo-fibular ligament', 'calcaneofibular', 'cfl'],
    hint: 'Inversion loads the lateral ligaments. The notes name the ATFL and this one.',
    reveal:
      'Inversion puts the lateral ligaments under high tension. The notes name the ATFL and the CFL, the calcaneofibular ligament.',
  },
  {
    kind: 'tap',
    id: 'tap-atfl',
    region: 'TAP THE LIGAMENT',
    prompt: 'Tap the anterior talofibular ligament.',
    accept: ['atfl'],
    correct:
      'That is the ATFL, from the front of the lateral malleolus to the neck of the talus. The case names likely ATFL involvement.',
    wrong: {
      ...TAP_WRONG_BASE,
      atfl: '',
      cfl: 'That is the calcaneofibular ligament, from the tip of the lateral malleolus down to the calcaneus. This question is the ATFL, the band in front of the malleolus.',
      deltoid:
        'That is the deltoid ligament on the medial side. This inversion sprain loads the lateral ligaments, not the deltoid.',
      fibula: 'That is the fibula. The ATFL is the ligament just anterior to the lateral malleolus, not the bone.',
      other: 'Tap the anterior talofibular ligament on the outside of the right ankle.',
    },
  },
  {
    kind: 'tap',
    id: 'tap-cfl',
    region: 'TAP THE LIGAMENT',
    prompt: 'Tap the calcaneofibular ligament.',
    accept: ['cfl'],
    correct: 'That is the CFL. Inversion puts it under high tension along with the ATFL.',
    wrong: {
      ...TAP_WRONG_BASE,
      cfl: '',
      atfl: 'That is the ATFL, the band to the talar neck. The CFL runs from the tip of the lateral malleolus down and back to the calcaneus.',
      deltoid: 'That is the deltoid ligament on the medial side. The CFL is on the lateral side.',
      fibula: 'That is the fibula. The CFL leaves the tip of the lateral malleolus and runs down to the calcaneus.',
      other: 'Tap the calcaneofibular ligament on the outside of the right ankle.',
    },
  },
  {
    kind: 'tap',
    id: 'palpate',
    region: 'PALPATION',
    prompt: 'Tap the tender site. The distal fibula and the deltoid were non-tender.',
    accept: ['atfl'],
    correct:
      'Point tenderness was over the ATFL. The distal fibula and the deltoid ligament were non-tender.',
    wrong: {
      ...TAP_WRONG_BASE,
      atfl: '',
      fibula: 'The distal fibula was non-tender. Tenderness was over the ATFL.',
      deltoid: 'The deltoid ligament on the medial side was non-tender. Tenderness was over the ATFL.',
      cfl: 'The CFL is under tension in this mechanism. In this case the point tenderness was over the ATFL.',
      other:
        'The tender site was the ATFL, just in front of the lateral malleolus. The distal fibula and the deltoid were non-tender.',
    },
  },
]

export function ankleTypeMatch(step: AnkleTypeStep, typed: string, mode: AnswerMatchMode = 'live'): boolean {
  return matchAliases(typed, step.aliases, mode, step.official)
}

export function gradeAnkleTap(
  step: AnkleTapStep,
  hit: AnkleHit | null,
): { ok: boolean; message: string } {
  if (hit && step.accept.includes(hit)) return { ok: true, message: step.correct }
  const key = hit ?? 'other'
  return { ok: false, message: step.wrong[key] || step.wrong.other }
}

export function classifyAnkleMesh(name: string): AnkleHit {
  if (name === 'atfl_r') return 'atfl'
  if (name === 'cfl_r') return 'cfl'
  if (name === 'deltoid_r') return 'deltoid'
  if (name === 'atfl_l' || name === 'cfl_l' || name === 'deltoid_l') return 'other-ankle'
  if (name === 'fibula_r') return 'fibula'
  if (name.endsWith('_l')) return 'other-ankle'
  return 'other'
}
