/**
 * Sport skill: muscle actions. Wording is limited to viewInfo.ts and the
 * HPHS4109 lines locked in the sport/rehab workflow. Meshes are the ones
 * already packed for these muscles.
 */
import type { AnatomicalView } from './anatomicalViews'
import { matchAliases, type AnswerMatchMode } from './answerMatch'
import { MUSCLES } from './muscles'
import type { LimbCue } from '../scene/limbCue'

export type StudyFocus = {
  highlight: readonly string[]
  frame: readonly string[]
  hide: readonly string[]
  context: readonly string[]
  view: AnatomicalView
  cue: LimbCue
}

export type ActionLearnCard = {
  id: string
  kicker: string
  title: string
  paragraphs: string[]
  focus: StudyFocus
  /** Play the bone cue once. The muscle mesh stays in its rest pose. */
  motion: boolean
}

export type ActionTypeStep = {
  kind: 'type'
  id: string
  region: string
  prompt: string
  official: string
  aliases: string[]
  hint: string
  reveal: string
  focus: StudyFocus
}

export type ActionTapStep = {
  kind: 'tap'
  id: string
  region: string
  prompt: string
  accept: string[]
  revealName: string
  correct: string
  wrong: Record<string, string>
  focus: StudyFocus
}

export type ActionQuizStep = ActionTypeStep | ActionTapStep

const MESH_TO_MUSCLE = new Map<string, string>()
for (const muscle of MUSCLES) {
  for (const name of muscle.meshNames) MESH_TO_MUSCLE.set(name, muscle.id)
}

export function muscleIdFromMesh(name: string): string | null {
  return MESH_TO_MUSCLE.get(name) ?? null
}

/** Right-side meshes for one packed muscle. */
export function rightMeshes(id: string): string[] {
  const muscle = MUSCLES.find((item) => item.id === id)
  if (!muscle) return []
  return muscle.meshNames.filter((name) => name.endsWith('_r'))
}

const HIP = ['hip_r', 'femur_r', 'sacrum'] as const
const THIGH = ['femur_r', 'hip_r', 'tibia_r', 'patella_r'] as const
const LEG = ['tibia_r', 'fibula_r', 'femur_r', 'talus_r', 'calcaneus_r'] as const
const ARM = ['humerus_r', 'scapula_r', 'clavicle_r', 'radius_r', 'ulna_r'] as const

function focus(
  id: string,
  view: AnatomicalView,
  cue: LimbCue,
  hide: readonly string[] = [],
  context: readonly string[] = THIGH,
): StudyFocus {
  const meshes = rightMeshes(id)
  return { highlight: meshes, frame: meshes, hide, context, view, cue }
}

const GLUT_MED = focus('gluteus_medius', 'posterior-lateral', 'hip-abduct', ['glut_max_r'], HIP)
const GLUT_MIN = focus('gluteus_minimus', 'posterior', 'hip-abduct', ['glut_max_r', 'glut_med_r'], HIP)
const GLUT_MAX = focus('gluteus_maximus', 'posterior', 'hip-extend', [], HIP)
const RECTUS = focus('rectus_femoris', 'anterior', 'hip-flex', ['sartorius_r'], THIGH)
const VASTUS_LAT = focus('vastus_lateralis', 'anterior-lateral', 'none', ['sartorius_r'], THIGH)
const GASTROC = focus('gastrocnemius', 'posterior', 'plantarflex', [], LEG)
const SOLEUS = focus('soleus', 'posterior', 'plantarflex', ['gastroc_lat_r', 'gastroc_med_r'], LEG)
const TIB_ANT = focus('tibialis_anterior', 'anterior', 'dorsiflex', [], LEG)
const BICEPS_FEM = focus('biceps_femoris', 'posterior', 'knee-flex', ['glut_max_r'], THIGH)
const DELTOID = focus('deltoid', 'posterior-lateral', 'arm-abduct', [], ARM)
const BICEPS = focus('biceps_brachii', 'lateral', 'elbow-flex', [], ARM)
const TRICEPS = focus('triceps_brachii', 'posterior', 'none', [], ARM)

export const ACTION_LEARN: readonly ActionLearnCard[] = [
  {
    id: 'pull',
    kicker: 'Sport · muscle actions',
    title: 'Muscles pull on bones',
    motion: true,
    focus: BICEPS,
    paragraphs: [
      'A muscle pulls on the bones it crosses, and the joint moves. The muscle is lit on the model. You type the movement, or you tap the muscle that does it.',
      'The bones can show a short movement. The muscle mesh stays in its resting shape.',
    ],
  },
  {
    id: 'hip',
    kicker: 'Hip',
    title: 'Abduct and extend',
    motion: true,
    focus: GLUT_MED,
    paragraphs: [
      'Gluteus medius abducts the hip.',
      'Gluteus maximus extends the thigh. It is the chief extensor of the flexed thigh, in rising, climbing, and sprinting.',
    ],
  },
  {
    id: 'thigh',
    kicker: 'Thigh',
    title: 'Knee and hip',
    motion: true,
    focus: RECTUS,
    paragraphs: [
      'Rectus femoris extends the leg at the knee and flexes the thigh at the hip.',
      'Vastus lateralis extends the leg at the knee. Biceps femoris flexes the leg at the knee. Its long head also extends the thigh.',
    ],
  },
  {
    id: 'ankle',
    kicker: 'Ankle',
    title: 'Push off and lift',
    motion: true,
    focus: GASTROC,
    paragraphs: [
      'Gastrocnemius plantarflexes the foot and powers push-off in walking, running, and jumping.',
      'Soleus plantarflexes the foot. It does not cross the knee. Tibialis anterior dorsiflexes the foot: it lifts the front of the foot.',
    ],
  },
  {
    id: 'arm',
    kicker: 'Shoulder and elbow',
    title: 'Lift and bend',
    motion: true,
    focus: DELTOID,
    paragraphs: [
      'Deltoid is the chief abductor of the arm.',
      'Biceps brachii flexes the elbow and is the chief supinator of the forearm. Triceps brachii is the chief extensor of the elbow.',
    ],
  },
]

const TAP_OTHER = 'Tap the muscle this question names.'

export const ACTION_QUIZ: readonly ActionQuizStep[] = [
  {
    kind: 'type',
    id: 'type-glut-med',
    region: 'GLUTEUS MEDIUS',
    prompt: 'What does this muscle do at the hip?',
    official: 'abducts the hip',
    aliases: [
      'abducts the hip',
      'abduct the hip',
      'abducts hip',
      'abducts the thigh',
      'abduct the thigh',
      'hip abduction',
      'abduction of the hip',
      'thigh abduction',
      'abduction',
    ],
    hint: 'Gluteus medius. HPHS: abducts the hip.',
    reveal: 'Gluteus medius abducts the hip.',
    focus: GLUT_MED,
  },
  {
    kind: 'tap',
    id: 'tap-glut-min',
    region: 'GLUTEUS MINIMUS',
    prompt: 'Tap the muscle that abducts the hip and internally rotates it.',
    accept: ['gluteus_minimus'],
    revealName: 'gluteus minimus',
    correct: 'Gluteus minimus abducts and internally rotates the hip.',
    wrong: {
      other: TAP_OTHER,
      'other-side': 'That is the other side. This one is on the right.',
      bone: 'That is bone. Tap the muscle deep to gluteus medius.',
      gluteus_medius: 'That is gluteus medius. It abducts the hip. Minimus also internally rotates it, and it lies deep to medius.',
      gluteus_maximus: 'That is gluteus maximus, the superficial buttock. It extends the thigh.',
    },
    focus: GLUT_MIN,
  },
  {
    kind: 'type',
    id: 'type-glut-max',
    region: 'GLUTEUS MAXIMUS',
    prompt: 'What does this muscle do to the thigh?',
    official: 'extends the thigh',
    aliases: [
      'extends the thigh',
      'extend the thigh',
      'extends the hip',
      'hip extension',
      'thigh extension',
      'extends the flexed thigh',
      'chief extensor of the flexed thigh',
      'chief extensor',
    ],
    hint: 'Chief extensor of the flexed thigh: rising, climbing, sprinting.',
    reveal: 'Gluteus maximus extends the thigh. It is the chief extensor of the flexed thigh.',
    focus: GLUT_MAX,
  },
  {
    kind: 'type',
    id: 'type-rectus',
    region: 'RECTUS FEMORIS',
    prompt: 'Type what this muscle does at the knee and the hip.',
    official: 'extends the leg at the knee and flexes the thigh at the hip',
    aliases: [
      'extends the leg at the knee and flexes the thigh at the hip',
      'extends the knee and flexes the hip',
      'flexes the hip and extends the knee',
      'extends the leg and flexes the thigh',
      'knee extension and hip flexion',
      'hip flexion and knee extension',
      'extends the leg at the knee and flexes the thigh',
    ],
    hint: 'The only quadriceps muscle that crosses both the hip and the knee.',
    reveal: 'Rectus femoris extends the leg at the knee and flexes the thigh at the hip.',
    focus: RECTUS,
  },
  {
    kind: 'tap',
    id: 'tap-vastus-lat',
    region: 'VASTUS LATERALIS',
    prompt: 'Tap the outer-thigh muscle that extends the leg at the knee.',
    accept: ['vastus_lateralis'],
    revealName: 'vastus lateralis',
    correct: 'Vastus lateralis extends the leg at the knee.',
    wrong: {
      other: TAP_OTHER,
      'other-side': 'That is the other thigh. Use the right side.',
      bone: 'That is bone. The muscle is the bulk on the outer thigh.',
      rectus_femoris: 'That is rectus femoris, in the midline. It also flexes the hip. Vastus lateralis is on the outer thigh and acts at the knee.',
      vastus_medialis: 'That is vastus medialis, on the inner side. This question is the outer thigh.',
      vastus_intermedius: 'That is vastus intermedius, under rectus femoris. The outer thigh is vastus lateralis.',
      sartorius: 'That is sartorius, the strap across the thigh. Vastus lateralis is the bulk of the outer thigh.',
    },
    focus: VASTUS_LAT,
  },
  {
    kind: 'type',
    id: 'type-gastroc',
    region: 'GASTROCNEMIUS',
    prompt: 'What does this muscle do to the foot?',
    official: 'plantarflexes the foot',
    aliases: [
      'plantarflexes the foot',
      'plantarflex the foot',
      'plantar flexion',
      'plantarflexion',
      'plantarflexes the ankle',
      'points the toes',
      'point the toes',
      'points the toes down',
      'push off',
      'pushes off',
      'powers push-off',
      'powers pushing off',
      'plantarflexes the foot and flexes the leg at the knee',
      'plantarflexes the foot and flexes the knee',
    ],
    hint: 'It powers push-off in walking, running, and jumping.',
    reveal: 'Gastrocnemius plantarflexes the foot and powers push-off in walking, running, and jumping.',
    focus: GASTROC,
  },
  {
    kind: 'tap',
    id: 'tap-soleus',
    region: 'SOLEUS',
    prompt: 'Tap the muscle that plantarflexes the foot and does not cross the knee.',
    accept: ['soleus'],
    revealName: 'soleus',
    correct: 'Soleus plantarflexes the foot. It does not cross the knee.',
    wrong: {
      other: TAP_OTHER,
      'other-side': 'That is the other leg. Use the right calf.',
      bone: 'That is bone. Soleus is the broad muscle deep in the calf.',
      gastrocnemius: 'That is gastrocnemius. It also plantarflexes, and it crosses the knee. Soleus is deep to it.',
      tibialis_anterior: 'That is tibialis anterior, on the front of the leg. It dorsiflexes the foot.',
    },
    focus: SOLEUS,
  },
  {
    kind: 'type',
    id: 'type-tib-ant',
    region: 'TIBIALIS ANTERIOR',
    prompt: 'What does this muscle do to the foot?',
    official: 'dorsiflexes the foot',
    aliases: [
      'dorsiflexes the foot',
      'dorsiflex the foot',
      'dorsiflexion',
      'lifts the front of the foot',
      'lifts the foot',
      'points the toes up',
      'dorsiflexes and inverts the foot',
      'dorsiflexes the foot and inverts it',
    ],
    hint: 'It lifts the front of the foot.',
    reveal: 'Tibialis anterior dorsiflexes the foot. It lifts the front of the foot.',
    focus: TIB_ANT,
  },
  {
    kind: 'type',
    id: 'type-biceps-fem',
    region: 'BICEPS FEMORIS',
    prompt: 'What does this muscle do at the knee?',
    official: 'flexes the leg at the knee',
    aliases: [
      'flexes the leg at the knee',
      'flexes the knee',
      'flex the knee',
      'knee flexion',
      'flexion of the knee',
      'flexes the leg',
      'flexes the knee and extends the thigh',
      'extends the thigh and flexes the knee',
      'flexes the leg at the knee and extends the thigh',
      'flexes the leg and extends the thigh',
    ],
    hint: 'Lateral hamstring. The long head also extends the thigh.',
    reveal: 'Biceps femoris flexes the leg at the knee. The long head also extends the thigh.',
    focus: BICEPS_FEM,
  },
  {
    kind: 'tap',
    id: 'tap-deltoid',
    region: 'DELTOID',
    prompt: 'Tap the chief abductor of the arm.',
    accept: ['deltoid'],
    revealName: 'deltoid',
    correct: 'Deltoid is the chief abductor of the arm.',
    wrong: {
      other: TAP_OTHER,
      'other-side': 'That is the other shoulder. Use the right arm.',
      bone: 'That is bone. Deltoid is the cap over the shoulder.',
      biceps_brachii: 'That is biceps brachii. It flexes the elbow. Deltoid caps the shoulder.',
      triceps_brachii: 'That is triceps brachii, on the back of the arm. It extends the elbow.',
      pectoralis_major: 'That is pectoralis major. Deltoid is the muscle that caps the shoulder.',
    },
    focus: DELTOID,
  },
  {
    kind: 'type',
    id: 'type-biceps',
    region: 'BICEPS BRACHII',
    prompt: 'What does this muscle do at the elbow?',
    official: 'flexes the elbow',
    aliases: [
      'flexes the elbow',
      'flex the elbow',
      'elbow flexion',
      'flexion of the elbow',
      'flexes the forearm',
      'supinates the forearm',
      'chief supinator',
      'chief supinator of the forearm',
      'flexes the elbow and supinates the forearm',
      'flexes and supinates',
      'supination',
    ],
    hint: 'It flexes the elbow and is the chief supinator of the forearm.',
    reveal: 'Biceps brachii flexes the elbow and is the chief supinator of the forearm.',
    focus: BICEPS,
  },
  {
    kind: 'type',
    id: 'type-triceps',
    region: 'TRICEPS BRACHII',
    prompt: 'What does this muscle do at the elbow?',
    official: 'extends the elbow',
    aliases: [
      'extends the elbow',
      'extend the elbow',
      'elbow extension',
      'extension of the elbow',
      'extends the forearm',
      'chief extensor of the elbow',
      'chief extensor',
    ],
    hint: 'Chief extensor of the elbow.',
    reveal: 'Triceps brachii is the chief extensor of the elbow.',
    focus: TRICEPS,
  },
]

export function actionTypeMatch(step: ActionTypeStep, typed: string, mode: AnswerMatchMode = 'live'): boolean {
  return matchAliases(typed, step.aliases, mode, step.official)
}

export function gradeActionTap(step: ActionTapStep, hit: string | null): { ok: boolean; message: string } {
  if (hit && step.accept.includes(hit)) return { ok: true, message: step.correct }
  const key = hit ?? 'other'
  return { ok: false, message: step.wrong[key] || step.wrong.other || TAP_OTHER }
}

export function classifyStudyMesh(name: string, kind: string): string {
  if (kind === 'bone') return 'bone'
  if (kind !== 'muscle') return 'other'
  const id = muscleIdFromMesh(name)
  if (!id) return 'other'
  if (name.endsWith('_l')) return 'other-side'
  return id
}
