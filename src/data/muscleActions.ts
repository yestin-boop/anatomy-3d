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
  /** Play the bone cue. The lit muscle rides the moving limb. */
  motion: boolean
}

export type ActionTypeStep = {
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

const GLUT_MED = focus('gluteus_medius', 'posterior', 'hip-abduct', ['glut_max_r'], HIP)
const GLUT_MIN = focus('gluteus_minimus', 'posterior', 'hip-abduct', ['glut_max_r', 'glut_med_r'], HIP)
const GLUT_MAX = focus('gluteus_maximus', 'lateral', 'hip-extend', [], HIP)
const RECTUS = focus('rectus_femoris', 'lateral', 'kick', ['sartorius_r'], THIGH)
const VASTUS_LAT = focus('vastus_lateralis', 'lateral', 'knee-extend', ['sartorius_r'], THIGH)
const GASTROC = focus('gastrocnemius', 'lateral', 'plantarflex', [], LEG)
const SOLEUS = focus('soleus', 'lateral', 'plantarflex', ['gastroc_lat_r', 'gastroc_med_r'], LEG)
const TIB_ANT = focus('tibialis_anterior', 'lateral', 'dorsiflex', [], LEG)
const BICEPS_FEM = focus('biceps_femoris', 'lateral', 'knee-flex', ['glut_max_r'], THIGH)
const DELTOID = focus('deltoid', 'posterior', 'arm-abduct', [], ARM)
const BICEPS = focus('biceps_brachii', 'lateral', 'elbow-flex', [], ARM)
const TRICEPS = focus('triceps_brachii', 'lateral', 'elbow-extend', [], ARM)
const VASTUS_MED = focus('vastus_medialis', 'anterior-medial', 'knee-extend', ['sartorius_r'], THIGH)
const GIRDLE = [
  'humerus_r',
  'scapula_r',
  'clavicle_r',
  'sternum_body',
  'sternum_manubrium',
  'rib_r5',
  'rib_r6',
  'rib_r7',
  'rib_r8',
] as const
const DELT_HIDE = ['delt_clav_r', 'delt_acro_r', 'delt_spin_r'] as const
const BICEPS_HIDE = ['biceps_long_r', 'biceps_short_r'] as const
const PEC_HIDE = ['pec_clav_r', 'pec_stern_r', 'pec_abd_r'] as const
const CUFF_HIDE = [...DELT_HIDE, 'trap_desc_r', 'trap_trans_r', 'trap_asc_r', 'lat_r'] as const

function focusMany(
  ids: readonly string[],
  view: AnatomicalView,
  cue: LimbCue,
  hide: readonly string[] = [],
  context: readonly string[] = THIGH,
): StudyFocus {
  const meshes = ids.flatMap((id) => rightMeshes(id))
  return { highlight: meshes, frame: meshes, hide, context, view, cue }
}

const ILIOPSOAS = focusMany(
  ['iliacus', 'psoas_major'],
  'anterior',
  'hip-flex',
  ['rectus_abd_r', 'ext_oblique_r', 'int_oblique_r', 'sartorius_r', 'pectineus_r'],
  HIP,
)

const LATS = focus('latissimus_dorsi', 'posterior-lateral', 'none', [], GIRDLE)
const PEC_MAJOR = focus('pectoralis_major', 'anterior', 'none', [], GIRDLE)
const SERRATUS = focus('serratus_anterior', 'lateral', 'none', PEC_HIDE, GIRDLE)
const GIRDLE_GROUP = focusMany(
  ['latissimus_dorsi', 'pectoralis_major', 'serratus_anterior', 'trapezius', 'rhomboid_major', 'rhomboid_minor'],
  'lateral',
  'none',
  [],
  GIRDLE,
)
const CUFF = focusMany(
  ['supraspinatus', 'infraspinatus', 'teres_minor', 'subscapularis'],
  'posterior',
  'arm-abduct',
  CUFF_HIDE,
  ARM,
)
const SUPRA = focus('supraspinatus', 'posterior', 'arm-abduct', CUFF_HIDE, ARM)
const ELBOW_FLEX_ASSIST = focusMany(
  ['brachialis', 'brachioradialis'],
  'lateral',
  'elbow-flex',
  BICEPS_HIDE,
  ARM,
)
const BRACHIALIS = focus('brachialis', 'lateral', 'elbow-flex', BICEPS_HIDE, ARM)

export const ACTION_LEARN: readonly ActionLearnCard[] = [
  {
    id: 'pull',
    kicker: 'Sport · muscle actions',
    title: 'Muscles pull on bones',
    motion: true,
    focus: BICEPS,
    paragraphs: [
      'A muscle pulls on the bones it crosses, and the joint moves. The muscle is lit on the model. You type the movement, or you tap the muscle that does it.',
      'The bones show a short movement, and the lit muscle moves with the limb. The mesh does not shorten fibre by fibre.',
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
    id: 'iliopsoas',
    kicker: 'Hip',
    title: 'The chief flexor',
    motion: true,
    focus: ILIOPSOAS,
    paragraphs: [
      'Iliacus and psoas major form iliopsoas, the chief flexor of the hip. The two muscles remain separate on the model. Iliopsoas names the combined unit, not either muscle alone.',
      'Iliacus fills the iliac fossa. Psoas major runs from the lumbar spine to the proximal femur. Together they flex the thigh at the hip.',
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
  {
    id: 'girdle',
    kicker: 'Shoulder girdle',
    title: 'Pull and press',
    motion: false,
    focus: GIRDLE_GROUP,
    paragraphs: [
      'Latissimus dorsi internally rotates, adducts, and extends the shoulder. The notes place it in climbing, rowing, and swimming. Pectoralis major adducts, horizontally adducts, and medially rotates the shoulder. It is the primary pushing muscle.',
      'Serratus anterior protracts and upwardly rotates the scapula, and holds it against the thoracic wall. That prevents scapular winging, and it is a key force-transfer muscle in pushing.',
      'Trapezius works by part: the upper fibers elevate and upwardly rotate the scapula and extend the neck; the middle fibers retract the scapula; the lower fibers depress and upwardly rotate the scapula. The rhomboids retract the scapula and rotate it downward.',
    ],
  },
  {
    id: 'cuff',
    kicker: 'Rotator cuff',
    title: 'A stabilizing cuff',
    motion: true,
    focus: CUFF,
    paragraphs: [
      'The rotator cuff is four muscles that form a stabilizing cuff around the glenohumeral joint: supraspinatus, infraspinatus, teres minor, and subscapularis.',
      'Supraspinatus initiates shoulder abduction in the first 15–30 degrees. It is the most commonly injured rotator cuff muscle. The arm lifts here so you can see that start of abduction. The mesh does not shorten fibre by fibre.',
      'Infraspinatus and teres minor externally rotate the shoulder. Subscapularis internally rotates the shoulder.',
    ],
  },
  {
    id: 'elbow-assist',
    kicker: 'Elbow',
    title: 'Assist at the elbow',
    motion: true,
    focus: ELBOW_FLEX_ASSIST,
    paragraphs: [
      'Brachialis sits deep to biceps brachii. It is a powerful elbow flexor, and it inserts on the ulna, flexing the elbow. Brachioradialis helps flex the forearm.',
      'Anconeus inserts near the olecranon and assists elbow extension.',
    ],
  },
]

const TAP_OTHER = 'Tap the muscle this question names.'

/** Blanks and the revealed word use the short movement name. The notes sentence stays an alias. Hints, reveals, and tap prompts stay on the notes wording. */
export const ACTION_QUIZ: readonly ActionQuizStep[] = [
  {
    kind: 'type',
    id: 'type-glut-med',
    region: 'GLUTEUS MEDIUS',
    prompt: 'What does this muscle do at the hip?',
    official: 'abduction',
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
    official: 'extension',
    aliases: [
      'extends the thigh',
      'extend the thigh',
      'extends the hip',
      'hip extension',
      'thigh extension',
      'extension',
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
    id: 'type-iliopsoas',
    region: 'ILIOPSOAS',
    prompt: 'What does iliopsoas do at the hip?',
    official: 'flexion',
    aliases: [
      'flexes the thigh at the hip',
      'flexes the hip',
      'flex the hip',
      'hip flexion',
      'flexion of the hip',
      'flexion',
      'flexes the thigh',
      'chief flexor of the hip',
      'principal hip flexor',
      'the chief flexor of the hip',
      'chief flexor',
    ],
    hint: 'Iliacus and psoas major together. The chief flexor of the hip.',
    reveal: 'Iliacus and psoas major form iliopsoas, the chief flexor of the hip. Together they flex the thigh at the hip.',
    focus: ILIOPSOAS,
  },
  {
    kind: 'tap',
    id: 'tap-iliopsoas',
    region: 'ILIOPSOAS',
    prompt: 'Tap iliopsoas, the chief flexor of the hip.',
    accept: ['iliacus', 'psoas_major'],
    revealName: 'iliopsoas',
    correct: 'Iliacus and psoas major form iliopsoas, the chief flexor of the hip.',
    wrong: {
      other: TAP_OTHER,
      'other-side': 'That is the other side. This one is on the right.',
      bone: 'That is bone. Iliopsoas is iliacus in the iliac fossa and psoas major beside the lumbar spine.',
      rectus_femoris: 'That is rectus femoris. It also flexes the hip, but iliopsoas is the chief flexor: iliacus and psoas major.',
      sartorius: 'That is sartorius. Iliopsoas is iliacus and psoas major, deeper in the iliac fossa and along the lumbar spine.',
      pectineus: 'That is pectineus. Iliopsoas is the combined iliacus and psoas major.',
      gluteus_maximus: 'That is gluteus maximus. It extends the thigh. Iliopsoas flexes the hip.',
    },
    focus: ILIOPSOAS,
  },
  {
    kind: 'type',
    id: 'type-rectus',
    region: 'RECTUS FEMORIS',
    prompt: 'Type what this muscle does at the knee and the hip.',
    official: 'knee extension and hip flexion',
    aliases: [
      'extends the leg at the knee and flexes the thigh at the hip',
      'extends the knee and flexes the hip',
      'flexes the hip and extends the knee',
      'extends the leg and flexes the thigh',
      'knee extension and hip flexion',
      'hip flexion and knee extension',
      'extends knee and flexes hip',
      'flexes hip and extends knee',
      'knee extension, hip flexion',
      'hip flexion, knee extension',
      'extends the leg at the knee and flexes the thigh',
    ],
    choices: [
      'knee extension and hip flexion',
      'extension',
      'flexion',
      'abduction',
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
    official: 'plantarflexion',
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
    official: 'dorsiflexion',
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
    official: 'flexion',
    aliases: [
      'flexes the leg at the knee',
      'flexes the knee',
      'flex the knee',
      'knee flexion',
      'flexion of the knee',
      'flexion',
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
    official: 'flexion',
    aliases: [
      'flexes the elbow',
      'flex the elbow',
      'elbow flexion',
      'flexion of the elbow',
      'flexion',
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
    official: 'extension',
    aliases: [
      'extends the elbow',
      'extend the elbow',
      'elbow extension',
      'extension of the elbow',
      'extension',
      'extends the forearm',
      'chief extensor of the elbow',
      'chief extensor',
    ],
    hint: 'Chief extensor of the elbow.',
    reveal: 'Triceps brachii is the chief extensor of the elbow.',
    focus: TRICEPS,
  },
  {
    kind: 'type',
    id: 'type-lats',
    region: 'LATISSIMUS DORSI',
    prompt: 'What does this muscle do at the shoulder?',
    official: 'internal rotation, adduction, and extension',
    aliases: [
      'internally rotates, adducts, and extends the shoulder',
      'internal rotation, adduction, and extension',
      'shoulder internal rotation, adduction, and extension',
      'adducts, extends, and internally rotates the shoulder',
      'extends, adducts, and internally rotates the shoulder',
      'internal rotation',
      'internally rotates the shoulder',
      'shoulder internal rotation',
      'medial rotation',
      'medially rotates the shoulder',
      'adduction',
      'adducts the shoulder',
      'shoulder adduction',
      'adducts the arm',
      'extension',
      'extends the shoulder',
      'shoulder extension',
      'extends the arm',
      'climbing, rowing, and swimming',
      'climbing',
      'rowing',
      'swimming',
    ],
    choices: [
      'internal rotation, adduction, and extension',
      'adduction, horizontal adduction, and medial rotation',
      'protraction and upward rotation',
      'knee extension and hip flexion',
    ],
    hint: 'Shoulder internal rotation, adduction, and extension. Climbing, rowing, and swimming.',
    reveal: 'Latissimus dorsi internally rotates, adducts, and extends the shoulder. The notes place it in climbing, rowing, and swimming.',
    focus: LATS,
  },
  {
    kind: 'type',
    id: 'type-pec-major',
    region: 'PECTORALIS MAJOR',
    prompt: 'What does this muscle do at the shoulder?',
    official: 'adduction, horizontal adduction, and medial rotation',
    aliases: [
      'adducts, horizontally adducts, and medially rotates the shoulder',
      'adduction, horizontal adduction, and medial rotation',
      'shoulder adduction, horizontal adduction, and medial rotation',
      'adducts and medially rotates the shoulder',
      'adducts the shoulder',
      'shoulder adduction',
      'adduction',
      'horizontal adduction',
      'horizontally adducts the shoulder',
      'medial rotation',
      'medially rotates the shoulder',
      'internal rotation',
      'internally rotates the shoulder',
      'primary pushing muscle',
      'the primary pushing muscle',
    ],
    choices: [
      'adduction, horizontal adduction, and medial rotation',
      'internal rotation, adduction, and extension',
      'protraction and upward rotation',
      'initiates abduction',
    ],
    hint: 'Adduction, horizontal adduction, and medial rotation. The primary pushing muscle.',
    reveal: 'Pectoralis major adducts, horizontally adducts, and medially rotates the shoulder. It is the primary pushing muscle.',
    focus: PEC_MAJOR,
  },
  {
    kind: 'type',
    id: 'type-serratus',
    region: 'SERRATUS ANTERIOR',
    prompt: 'What does this muscle do to the scapula?',
    official: 'protraction and upward rotation',
    aliases: [
      'protracts and upwardly rotates the scapula',
      'scapular protraction and upward rotation',
      'protraction and upward rotation',
      'protracts the scapula',
      'scapular protraction',
      'protraction',
      'upward rotation',
      'upwardly rotates the scapula',
      'scapular upward rotation',
      'holds the scapula against the thoracic wall',
      'holds the scapula to the wall',
      'holds the scapula against the wall',
      'prevents scapular winging',
      'prevents winging',
    ],
    choices: [
      'protraction and upward rotation',
      'internal rotation, adduction, and extension',
      'adduction, horizontal adduction, and medial rotation',
      'initiates abduction',
    ],
    hint: 'It protracts and upwardly rotates the scapula, and holds it against the thoracic wall.',
    reveal: 'Serratus anterior protracts and upwardly rotates the scapula, and holds it against the thoracic wall. That prevents scapular winging.',
    focus: SERRATUS,
  },
  {
    kind: 'type',
    id: 'type-supra',
    region: 'SUPRASPINATUS',
    prompt: 'What does this muscle do at the shoulder?',
    official: 'initiates abduction',
    aliases: [
      'initiates shoulder abduction',
      'initiates abduction',
      'initiates abduction of the arm',
      'initiates abduction of the shoulder',
      'initiates shoulder abduction in the first 15-30 degrees',
      'initiates shoulder abduction in the first 15 30 degrees',
      'first 15-30 degrees of abduction',
      'first 15 30 degrees of abduction',
      'initiates the first 15-30 degrees of abduction',
      'abducts the shoulder',
      'shoulder abduction',
      'abducts the arm',
      'abduction',
    ],
    hint: 'It initiates shoulder abduction in the first 15–30 degrees.',
    reveal: 'Supraspinatus initiates shoulder abduction in the first 15–30 degrees. It is the most commonly injured rotator cuff muscle.',
    focus: SUPRA,
  },
  {
    kind: 'type',
    id: 'type-brachialis',
    region: 'BRACHIALIS',
    prompt: 'What does this muscle do at the elbow?',
    official: 'flexion',
    aliases: [
      'flexes the elbow',
      'flex the elbow',
      'elbow flexion',
      'flexion of the elbow',
      'flexion',
      'flexes the forearm',
      'a powerful elbow flexor',
      'powerful elbow flexor',
    ],
    hint: 'It sits deep to biceps brachii and is a powerful elbow flexor.',
    reveal: 'Brachialis is a powerful elbow flexor. It sits deep to biceps brachii and inserts on the ulna, flexing the elbow.',
    focus: BRACHIALIS,
  },
  {
    kind: 'tap',
    id: 'tap-vastus-med',
    region: 'VASTUS MEDIALIS',
    prompt: 'Tap the inner-thigh muscle that extends the leg at the knee.',
    accept: ['vastus_medialis'],
    revealName: 'vastus medialis',
    correct: 'Vastus medialis extends the leg at the knee.',
    wrong: {
      other: TAP_OTHER,
      'other-side': 'That is the other thigh. Use the right side.',
      bone: 'That is bone. The muscle is the teardrop on the inner thigh.',
      rectus_femoris: 'That is rectus femoris, in the midline. It also flexes the hip. Vastus medialis is on the inner thigh and acts at the knee.',
      vastus_lateralis: 'That is vastus lateralis, on the outer side. This question is the inner thigh.',
      vastus_intermedius: 'That is vastus intermedius, under rectus femoris. The inner thigh is vastus medialis.',
      sartorius: 'That is sartorius, the strap across the thigh. Vastus medialis is the teardrop on the inner thigh.',
    },
    focus: VASTUS_MED,
  },
]

export function actionTypeMatch(step: ActionTypeStep, typed: string, mode: AnswerMatchMode = 'live'): boolean {
  // Live typing uses the shared matcher. A short alias that is only a prefix
  // of a longer accepted name waits for Enter. The official name still
  // auto-succeeds, including a complete word such as "abduction" when a
  // longer alias starts with that word. Wrong actions stay exact.
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
