/**
 * Achilles tendinopathy. Facts are limited to the HPHS4107 Foot & Ankle
 * lecture, Injury 4 (slides 58–63), and the brief that restates them.
 * A new Rehab case beside the lateral sprain and the high-ankle sprain.
 * Meshes already packed: calcaneal (Achilles) tendon, gastrocnemius, soleus.
 * No new meshes, no region bands, and no torn gap.
 */
import { matchAliases, type AnswerMatchMode } from './answerMatch'

export type AchillesHit =
  | 'tendon'
  | 'gastrocnemius'
  | 'soleus'
  | 'calcaneus'
  | 'atfl'
  | 'cfl'
  | 'ptfl'
  | 'deltoid'
  | 'aitfl'
  | 'pitfl'
  | 'trans_tibfib'
  | 'other-ankle'
  | 'other'

/** Tendon only, or the tendon together with the calf muscles that form it. */
export type AchillesLight = 'tendon' | 'anatomy'

/** Heel keeps the tendon. Calf lifts the frame so Thompson’s squeeze has a calf. */
export type AchillesSpan = 'heel' | 'calf'

export type AchillesLearnCard = {
  id: string
  kicker: string
  title: string
  paragraphs: string[]
  light: AchillesLight
  span: AchillesSpan
  motion: boolean
}

export type AchillesReject = {
  aliases: string[]
  message: string
}

export type AchillesTypeStep = {
  kind: 'type'
  id: string
  region: string
  prompt: string
  official: string
  aliases: string[]
  /** Long phrases only. One entry is the official wording. */
  choices?: readonly string[]
  hint: string
  reveal: string
  light: AchillesLight
  span: AchillesSpan
  /** A finished wrong phrase shows this contrast and is not marked correct. */
  rejects?: AchillesReject[]
}

export type AchillesTapStep = {
  kind: 'tap'
  id: string
  region: string
  prompt: string
  accept: AchillesHit[]
  revealName: string
  correct: string
  wrong: Record<AchillesHit, string>
  light: AchillesLight
  span: AchillesSpan
}

export type AchillesQuizStep = AchillesTypeStep | AchillesTapStep

/** Right and left calcaneal tendons. The right one is the case. */
export const ACHILLES_TENDON_MESHES: readonly string[] = ['calcaneal_r', 'calcaneal_l']

/** Calf muscles the lecture names. Left copies stay available for a wrong-side tap. */
export const ACHILLES_CALF_MESHES: readonly string[] = [
  'gastroc_lat_r',
  'gastroc_med_r',
  'soleus_r',
  'gastroc_lat_l',
  'gastroc_med_l',
  'soleus_l',
]

export const ACHILLES_RIGHT_CALF: readonly string[] = ['gastroc_lat_r', 'gastroc_med_r', 'soleus_r']

/**
 * Ligaments a wrong tap can land on. They stay dim. This case does not teach them.
 */
export const ACHILLES_CONTRAST_LIGAMENTS: readonly string[] = [
  'atfl_r',
  'cfl_r',
  'ptfl_r',
  'deltoid_r',
  'aitfl_r',
  'pitfl_r',
  'trans_tibfib_r',
]

/** Bones kept solid beside the tendon. The full shin is not the frame. */
export const ACHILLES_CONTEXT_BONES: readonly string[] = ['calcaneus_r', 'talus_r', 'tibia_r', 'fibula_r']

/** Meshes that set the camera box before the distal calf clip is added. */
export const ACHILLES_FRAME_MESHES: readonly string[] = ['calcaneal_r', 'calcaneus_r']

/**
 * Fraction of calf-muscle length kept above the distal end.
 * The full gastrocnemius would pull the camera up to the knee.
 */
export const ACHILLES_CALF_FRACTION = { heel: 0.36, calf: 0.58 } as const

export function achillesHotMeshes(light: AchillesLight): readonly string[] {
  if (light === 'anatomy') return ['calcaneal_r', ...ACHILLES_RIGHT_CALF]
  return ['calcaneal_r']
}

export const ACHILLES_LEARN: readonly AchillesLearnCard[] = [
  {
    id: 'scenario',
    kicker: 'Rehab · Achilles',
    title: 'Tendinopathy, or a tear',
    light: 'tendon',
    span: 'heel',
    motion: false,
    paragraphs: [
      'The lecture groups Achilles problems as tendinopathy or a tear.',
      'The opening figure shows a normal Achilles tendon, then three injured states: tendinitis, tendon rupture, and tendinosis.',
      'Beside tendinitis, the lecture writes sudden overload and short-term overuse, and a handwritten note marks inflammation and overuse.',
      'Beside tendinosis, it writes chronic degeneration, no inflammation, and long-term repetitive strain. An inset on that figure is labelled “Tiny tears.”',
      'Tendinitis and tendinosis are not the same thing. Tendinopathy is not simply inflammation. The rehab timeline later in the lecture is titled for Achilles tendinopathy.',
    ],
  },
  {
    id: 'anatomy',
    kicker: 'Anatomy',
    title: 'Achilles tendon',
    light: 'anatomy',
    span: 'calf',
    motion: false,
    paragraphs: [
      'The Achilles tendon is also called the calcaneal tendon. Gastrocnemius (medial and lateral heads) and soleus attach to the calcaneus through this tendon. The lecture’s muscle tables give those insertions as “calcaneus via Achilles.” Plantarflexion is the shared action; gastrocnemius also flexes the knee.',
      'The assessment slide maps the tendon into regions, measured up from the heel bone (calcaneus): Region 1, distal, 2 cm, including the tendon-bone junction (enthesis); Region 2, mid-substance, 4 cm; Region 3, proximal, 12 ± 3 cm, up to the muscle-tendon junction and the calf muscles.',
      'The model can show the packed tendon and the calf muscles. It does not include labelled region bands or a torn gap.',
    ],
  },
  {
    id: 'overuse',
    kicker: 'Mechanism of injury',
    title: 'Cumulative microtrauma',
    light: 'tendon',
    span: 'heel',
    motion: false,
    paragraphs: [
      'Overuse is cumulative microtrauma resulting from repetitive stress on the tendon from activities like running and jumping without sufficient recovery time.',
      'It is a gradual condition from repetitive stress causing micro-tears and degeneration over time.',
      'Overuse leads to increasing ache, stiffness, and pain with activity.',
    ],
  },
  {
    id: 'rupture',
    kicker: 'Mechanism of injury',
    title: 'A sudden tear',
    light: 'tendon',
    span: 'heel',
    motion: false,
    paragraphs: [
      'A rupture is a sudden, complete or partial tear of the tendon caused by a forceful, traumatic event.',
      'Rupture involves a sudden, sharp pain, a popping or snapping sensation, and a significant loss of strength and ability to walk on the injured foot.',
      'The lecture figure shows a push-off position with hip extension, knee extension, and foot dorsiflexion, and an inset of the tendon coming apart. Treat that as a figure, not a graded diagnosis for this case.',
      'This is not the same condition as overuse tendinopathy. The rehab timeline that follows is for tendinopathy, not a protocol for a complete tear.',
    ],
  },
  {
    id: 'palpation',
    kicker: 'Assessment',
    title: 'Observe and palpate the tendon',
    light: 'tendon',
    span: 'heel',
    motion: false,
    paragraphs: [
      'The physical assessment is observation, palpation, and Thompson’s test.',
      'The lecture shows a posterior view of both heels with the tendon path marked, and the same region map: distal (enthesis), mid-substance, and proximal, toward the muscle-tendon junction.',
      'Palpation can use those region names. The lecture photograph is not captioned with a tender site, swelling, bruising, or a palpable gap.',
    ],
  },
  {
    id: 'thompson',
    kicker: 'Special test',
    title: "Thompson's test",
    light: 'tendon',
    span: 'calf',
    motion: false,
    paragraphs: [
      'The lecture figure shows the examiner squeezing the calf, with the foot free to move.',
      'If the Achilles tendon is ruptured, a calf squeeze does not move the foot.',
      'If the foot is healthy, or the Achilles tendon is not fully ruptured, a calf squeeze moves the foot. The lecture shows that movement as the foot going into plantarflexion.',
      'The summary notes the same test as: squeeze the calf — no plantarflexion means rupture. The lecture figure is the wording to learn.',
      'A foot that still moves does not, on this figure, prove the tendon is completely intact. Thompson’s test is for rupture. It is not the lecture’s test for tendinopathy.',
    ],
  },
  {
    id: 'pathway-early',
    kicker: 'Rehab pathway',
    title: 'Symptom-management, then recovery',
    light: 'tendon',
    span: 'heel',
    motion: false,
    paragraphs: [
      'This is the lecture’s Achilles tendinopathy rehab figure, titled as a protocol after Silbernagel et al., JAT 2020. It is not the high-ankle or lateral-sprain timeline, and not a rupture protocol.',
      'The figure gives overlapping week ranges and status criteria. Both are taught as written.',
      'Symptom-management, about week 1 to 2. Status: pain and difficulty with all activities, and difficulty performing 10 one-legged heel rises. Treatment: progress loading up to 100% body weight with slow motion, 3×10 once a day. The figure lists circulation exercise (moving the foot up or down), two-legged and one-legged heel rises standing on the floor, eccentric heel rises standing on the floor, and sitting heel rises.',
      'Recovery, about week 2 to 5. Status: pain with exercise, morning stiffness, and pain when performing heel rises. Treatment: increased speed of movement and external resistance, 3×15 once a day. The figure lists two-legged, one-legged, and eccentric heel rises standing on the edge of a step, sitting heel rises, and quick-rebouncing heel rises.',
    ],
  },
  {
    id: 'pathway-late',
    kicker: 'Rehab pathway',
    title: 'Rebuilding, then return to sport',
    light: 'tendon',
    span: 'heel',
    motion: false,
    paragraphs: [
      'Rebuilding, about week 3 to 12. Status: tolerates the recovery-phase exercise program well, no pain at the distal tendon insertion, and possibly decreased or increased morning stiffness. Treatment: continue to progress external resistance and initiate plyometrics, 3×15, two to three times per week. The figure lists one-legged and eccentric heel rises standing on the edge of a step with added weight, sitting heel rises, quick-rebouncing heel rises, and plyometrics training (sport specific).',
      'Return-to-sport, about month 3 to 6. Status: minimal symptoms, some but not daily morning stiffness, and can participate in sports without difficulty. Treatment: sport-specific loading speed and movement patterns, 3×15, two to three times per week. The figure lists one-legged and eccentric heel rises standing on the edge of a step with added weight, and quick-rebouncing heel rises.',
      'These are teaching criteria from the lecture figure, not a date you are cleared.',
    ],
  },
]

const LATERAL_MECHANISM = [
  'inversion and plantarflexion',
  'inversion and plantar flexion',
  'plantarflexion and inversion',
  'plantar flexion and inversion',
  'inversion plantarflexion',
  'inversion plantar flexion',
  'plantarflexion inversion',
]

const HIGH_ANKLE_MECHANISM = [
  'dorsiflexion, eversion, and tibial internal rotation',
  'dorsiflexion and eversion with tibial internal rotation',
  'dorsiflexion and eversion of the ankle with internal rotation of the tibia',
  'DF + eversion + tibial IR',
  'dorsiflexion and eversion and tibial internal rotation',
]

const OVERUSE_PHRASES = [
  'cumulative microtrauma from running and jumping',
  'cumulative microtrauma resulting from repetitive stress on the tendon from activities like running and jumping without sufficient recovery time',
  'repetitive stress without sufficient recovery',
  'running and jumping without sufficient recovery',
  'cumulative microtrauma',
  'microtrauma from repetitive stress',
]

const RUPTURE_PHRASES = [
  'rupture',
  'achilles rupture',
  'achilles tear',
  'achilles tendon rupture',
  'achilles tendon tear',
  'tendon rupture',
  'complete tear',
  'a complete tear',
  'sudden complete or partial tear',
]

const TENDINITIS_PHRASES = [
  'tendinitis',
  'tendonitis',
  'achilles tendinitis',
  'achilles tendonitis',
  'achilles tendon tendinitis',
  'calcaneal tendinitis',
]

const TENDINITIS_LABELS = [
  'sudden overload',
  'short-term overuse',
  'short term overuse',
  'sudden overload and short-term overuse',
  'sudden overload and short term overuse',
]

const HEALTHY_THOMPSON = [
  'calf squeeze moves the foot',
  'a calf squeeze moves the foot',
  'squeeze the calf and the foot moves',
  'the foot plantarflexes',
  'calf squeeze plantarflexes the foot',
]

const LIGAMENT_WRONG = 'That is a ligament, not the Achilles tendon.'

const TAP_OTHER = 'Tap the Achilles tendon on the right ankle.'

export const ACHILLES_QUIZ: readonly AchillesQuizStep[] = [
  {
    kind: 'type',
    id: 'type-injury',
    region: 'NAME IT',
    prompt: 'Type the overuse condition this case is about.',
    official: 'Achilles tendinopathy',
    aliases: [
      'Achilles tendinopathy',
      'Achilles tendinosis',
      'calcaneal tendinopathy',
      'Achilles tendon tendinopathy',
    ],
    hint: 'The lecture also labels this as tendinosis: chronic degeneration, not a sudden tear.',
    reveal:
      'The overuse condition is Achilles tendinopathy. Beside tendinosis, the lecture notes chronic degeneration, no inflammation, and long-term repetitive strain. A rupture is a sudden, complete or partial tear, and is a different problem.',
    light: 'tendon',
    span: 'heel',
    rejects: [
      {
        aliases: TENDINITIS_PHRASES,
        message:
          'Tendinitis is labelled with sudden overload, short-term overuse, and inflammation. Tendinosis is labelled chronic degeneration, no inflammation, and long-term repetitive strain. This case follows the tendinopathy pathway.',
      },
      {
        aliases: RUPTURE_PHRASES,
        message:
          'A rupture is a sudden, complete or partial tear, and is a different problem. The overuse condition is Achilles tendinopathy.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-tendon',
    region: 'NAME IT',
    prompt: 'Type the name of this tendon.',
    official: 'Achilles tendon',
    aliases: [
      'Achilles tendon',
      'calcaneal tendon',
      'Achilles',
      'tendo calcaneus',
      'heel tendon',
      'tendo Achilles',
    ],
    hint: 'It is also called the calcaneal tendon. It attaches the calf muscles to the heel bone.',
    reveal: 'The Achilles tendon, or calcaneal tendon, attaches gastrocnemius and soleus to the calcaneus.',
    light: 'tendon',
    span: 'heel',
  },
  {
    kind: 'tap',
    id: 'tap-tendon',
    region: 'TAP THE TENDON',
    prompt: 'Tap the Achilles tendon.',
    accept: ['tendon'],
    revealName: 'Achilles tendon',
    correct: 'That is the Achilles tendon, also called the calcaneal tendon, attaching the calf muscles to the heel.',
    wrong: {
      tendon: '',
      gastrocnemius:
        'That is gastrocnemius, a calf muscle. This question is the tendon that attaches the calf to the heel.',
      soleus: 'That is soleus, a calf muscle. This question is the Achilles tendon.',
      calcaneus: 'That is the heel bone. The Achilles tendon attaches to it, but this question is the tendon.',
      atfl: LIGAMENT_WRONG,
      cfl: LIGAMENT_WRONG,
      ptfl: LIGAMENT_WRONG,
      deltoid: LIGAMENT_WRONG,
      aitfl: LIGAMENT_WRONG,
      pitfl: LIGAMENT_WRONG,
      trans_tibfib: LIGAMENT_WRONG,
      'other-ankle': 'That is the other ankle. This case is the right ankle.',
      other: TAP_OTHER,
    },
    light: 'tendon',
    span: 'heel',
  },
  {
    kind: 'type',
    id: 'type-overuse',
    region: 'MECHANISM',
    prompt: 'Type the overuse mechanism for this tendon.',
    official: 'cumulative microtrauma from running and jumping',
    aliases: OVERUSE_PHRASES,
    choices: [
      'cumulative microtrauma from running and jumping',
      'sudden complete or partial tear',
      'inversion and plantarflexion',
      'dorsiflexion, eversion, and tibial internal rotation',
    ],
    hint: 'It builds up from repetitive stress, in activities like running and jumping, when recovery is not enough.',
    reveal:
      'Overuse is cumulative microtrauma from repetitive stress on the tendon, from activities like running and jumping, without sufficient recovery time. It is gradual, with increasing ache, stiffness, and pain with activity.',
    light: 'tendon',
    span: 'heel',
    rejects: [
      {
        aliases: LATERAL_MECHANISM,
        message:
          'That mechanism is the common lateral sprain. This tendon’s overuse mechanism is cumulative microtrauma from running and jumping, without sufficient recovery time.',
      },
      {
        aliases: HIGH_ANKLE_MECHANISM,
        message:
          'That mechanism is the high-ankle sprain. This tendon’s overuse mechanism is cumulative microtrauma from running and jumping, without sufficient recovery time.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-rupture',
    region: 'MECHANISM',
    prompt: 'Type what a rupture of this tendon is.',
    official: 'sudden complete or partial tear',
    aliases: [
      'sudden complete or partial tear',
      'a sudden, complete or partial tear of the tendon',
      'complete or partial tear caused by a forceful, traumatic event',
      'sudden tear from a forceful traumatic event',
      'forceful traumatic event',
    ],
    choices: [
      'sudden complete or partial tear',
      'cumulative microtrauma from running and jumping',
      'calf squeeze does not move the foot',
      'chronic degeneration, no inflammation',
    ],
    hint: 'It is sudden, and the tear may be complete or partial.',
    reveal:
      'A rupture is a sudden, complete or partial tear of the tendon caused by a forceful, traumatic event. It involves sudden, sharp pain, a popping or snapping sensation, and a significant loss of strength and ability to walk on the injured foot.',
    light: 'tendon',
    span: 'heel',
    rejects: [
      {
        aliases: OVERUSE_PHRASES,
        message:
          'That is the overuse mechanism: cumulative microtrauma from repetitive stress. A rupture is a sudden, complete or partial tear caused by a forceful, traumatic event.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-thompson',
    region: 'SPECIAL TEST',
    prompt: 'What happens in Thompson’s test when this tendon is ruptured?',
    official: 'calf squeeze does not move the foot',
    aliases: [
      'calf squeeze does not move the foot',
      'a calf squeeze does not move the foot',
      'squeeze the calf and the foot does not move',
      'squeeze calf, no plantarflexion',
      'no plantarflexion',
      'squeeze the calf — no PF',
      'squeeze the calf - no PF',
      'calf squeeze does not plantarflex the foot',
    ],
    choices: [
      'calf squeeze does not move the foot',
      'calf squeeze moves the foot',
      'sudden complete or partial tear',
      'cumulative microtrauma from running and jumping',
    ],
    hint: 'Squeeze the calf. Watch the foot.',
    reveal:
      'If the Achilles tendon is ruptured, a calf squeeze does not move the foot. If the foot is healthy, or the tendon is not fully ruptured, a calf squeeze moves the foot — the lecture shows that as plantarflexion. A moving foot does not, on this figure, prove the tendon is completely intact. Thompson’s test is for rupture, not for tendinopathy.',
    light: 'tendon',
    span: 'calf',
    rejects: [
      {
        aliases: HEALTHY_THOMPSON,
        message:
          'If the foot is healthy, or the tendon is not fully ruptured, a calf squeeze moves the foot. If the Achilles tendon is ruptured, a calf squeeze does not move the foot. A moving foot does not prove the tendon is completely intact.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-tendinosis',
    region: 'THE INJURY',
    prompt: 'What does the lecture note beside tendinosis?',
    official: 'chronic degeneration, no inflammation',
    aliases: [
      'chronic degeneration, no inflammation',
      'chronic degeneration',
      'no inflammation',
      'long-term repetitive strain',
      'long term repetitive strain',
      'tiny tears',
    ],
    choices: [
      'chronic degeneration, no inflammation',
      'sudden overload',
      'short-term overuse',
    ],
    hint: 'The lecture is clear this is not an inflammatory label.',
    reveal:
      'Beside tendinosis, the lecture notes chronic degeneration, no inflammation, and long-term repetitive strain. An inset is labelled “Tiny tears.” That is not the same as the tendinitis labels: inflammation, sudden overload, and short-term overuse.',
    light: 'tendon',
    span: 'heel',
    rejects: [
      {
        aliases: TENDINITIS_LABELS,
        message:
          'Those words sit beside tendinitis: inflammation, sudden overload, and short-term overuse. Beside tendinosis, the lecture notes chronic degeneration, no inflammation, and long-term repetitive strain.',
      },
    ],
  },
  {
    kind: 'type',
    id: 'type-phase',
    region: 'PHASE 1',
    prompt: 'Type the first phase of this tendinopathy rehab pathway.',
    official: 'symptom-management',
    aliases: ['symptom-management', 'symptom management', 'symptom-management phase'],
    hint: 'The first status is pain and difficulty with all activities, including 10 one-legged heel rises.',
    reveal:
      'The first phase is symptom-management, about week 1 to 2. Status: pain and difficulty with all activities, and difficulty performing 10 one-legged heel rises. Treatment is slow loading up to 100% body weight, 3×10 once a day, as the lecture figure lists.',
    light: 'tendon',
    span: 'heel',
  },
  {
    kind: 'type',
    id: 'type-return',
    region: 'RETURN TO SPORT',
    prompt: 'Type the return-to-sport status in this pathway.',
    official: 'minimal symptoms, and not daily morning stiffness',
    aliases: [
      'minimal symptoms, and not daily morning stiffness',
      'minimal symptoms, some but not daily morning stiffness',
      'minimal symptoms, some but not daily morning stiffness, can participate in sports without difficulty',
      'can participate in sports without difficulty',
      'some but not daily morning stiffness',
    ],
    choices: [
      'minimal symptoms, and not daily morning stiffness',
      'symptom-management',
      'chronic degeneration, no inflammation',
      'sudden complete or partial tear',
    ],
    hint: 'Stiffness may still be there, but not every morning, and sport is possible without difficulty.',
    reveal:
      'Return-to-sport, about month 3 to 6, is for minimal symptoms, some but not daily morning stiffness, and participation in sports without difficulty. Treatment is sport-specific loading speed and movement patterns, 3×15, two to three times per week, as the lecture figure lists. These are teaching criteria, not a date you are cleared.',
    light: 'tendon',
    span: 'heel',
  },
]

export function achillesTypeMatch(
  step: AchillesTypeStep,
  typed: string,
  mode: AnswerMatchMode = 'live',
): boolean {
  return matchAliases(typed, step.aliases, mode, step.official)
}

/** A complete rejected phrase, such as tendinitis or a sprain mechanism. Not a correct answer. */
export function achillesTypeReject(step: AchillesTypeStep, typed: string): string | null {
  if (!step.rejects) return null
  for (const reject of step.rejects) {
    if (matchAliases(typed, reject.aliases, 'confirm', reject.aliases[0] ?? '')) return reject.message
  }
  return null
}

export function gradeAchillesTap(
  step: AchillesTapStep,
  hit: AchillesHit | null,
): { ok: boolean; message: string } {
  if (hit && step.accept.includes(hit)) return { ok: true, message: step.correct }
  const key = hit ?? 'other'
  return { ok: false, message: step.wrong[key] || step.wrong.other }
}

export function classifyAchillesMesh(name: string): AchillesHit {
  if (name === 'calcaneal_r') return 'tendon'
  if (name === 'gastroc_lat_r' || name === 'gastroc_med_r') return 'gastrocnemius'
  if (name === 'soleus_r') return 'soleus'
  if (name === 'calcaneus_r') return 'calcaneus'
  if (name === 'atfl_r') return 'atfl'
  if (name === 'cfl_r') return 'cfl'
  if (name === 'ptfl_r') return 'ptfl'
  if (name === 'deltoid_r') return 'deltoid'
  if (name === 'aitfl_r') return 'aitfl'
  if (name === 'pitfl_r') return 'pitfl'
  if (name === 'trans_tibfib_r') return 'trans_tibfib'
  if (name.endsWith('_l')) return 'other-ankle'
  return 'other'
}
