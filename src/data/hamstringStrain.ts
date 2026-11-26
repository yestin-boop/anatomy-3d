/**
 * Grade II hamstring strain. Facts are limited to HPHS4107 (strain, grades,
 * eccentric pathway, TOTAPS) and the HPHS4109 hamstring attachments named
 * in the sport/rehab workflow. Meshes: biceps_femoris, semitendinosus,
 * semimembranosus.
 */
import type { AnatomicalView } from './anatomicalViews'
import { matchAliases, type AnswerMatchMode } from './answerMatch'
import { rightMeshes, type StudyFocus } from './muscleActions'
import type { LimbCue } from '../scene/limbCue'

export type HamLearnCard = {
  id: string
  kicker: string
  title: string
  paragraphs: string[]
  focus: StudyFocus
  motion: boolean
}

export type HamTypeStep = {
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

export type HamTapStep = {
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

export type HamQuizStep = HamTypeStep | HamTapStep

const POSTERIOR: AnatomicalView = 'posterior'
const THIGH = ['femur_r', 'hip_r', 'tibia_r', 'fibula_r'] as const

const HAM_MESHES = [
  ...rightMeshes('biceps_femoris'),
  ...rightMeshes('semitendinosus'),
  ...rightMeshes('semimembranosus'),
]

function hamFocus(
  highlight: readonly string[],
  cue: LimbCue,
  hide: readonly string[],
  view: AnatomicalView = POSTERIOR,
): StudyFocus {
  return {
    highlight,
    frame: highlight,
    hide,
    context: THIGH,
    view,
    cue,
  }
}

const ALL = hamFocus(HAM_MESHES, 'none', ['glut_max_r'])
const ALL_SWING = hamFocus(HAM_MESHES, 'late-swing', ['glut_max_r'], 'lateral')
const SEMITEND = hamFocus(rightMeshes('semitendinosus'), 'none', ['glut_max_r'])
const BICEPS = hamFocus(rightMeshes('biceps_femoris'), 'knee-flex', ['glut_max_r'], 'lateral')
const SEMIMEMB = hamFocus(rightMeshes('semimembranosus'), 'none', ['glut_max_r', 'semitend_r'])

export const HAMSTRING_LEARN: readonly HamLearnCard[] = [
  {
    id: 'sprint',
    kicker: 'Rehab · hamstring',
    title: 'Pain in a sprint',
    motion: false,
    focus: ALL,
    paragraphs: [
      'A strain injures a muscle or the muscle–tendon unit. The lecture example is a hamstring injury during sprinting. This one is acute: sudden, and tied to that sprint.',
      'Biceps femoris, semitendinosus, and semimembranosus share a footprint on the ischial tuberosity, the sit bone, and they insert onto the tibia and fibula. The short head of biceps femoris originates on the femur.',
    ],
  },
  {
    id: 'mechanism',
    kicker: 'Mechanism',
    title: 'Tension while it lengthens',
    motion: true,
    focus: ALL_SWING,
    paragraphs: [
      'The force is tension: a pull lengthwise. A hamstring strain in a sprint is an eccentric tensile overload.',
      'The thigh swings forward here so you can see that lengthened position. The muscles move with the limb. Nothing on the model is torn.',
    ],
  },
  {
    id: 'grade',
    kicker: 'Grade',
    title: 'A partial tear',
    motion: false,
    focus: ALL,
    paragraphs: [
      'These grades are teaching examples. They are not a way to grade someone from symptoms alone.',
      'Grade I is micro-tearing, a pulled muscle: pain with active movement and minimal strength loss. Grade II is a partial tear: sharp pain during activity, palpable pain and weakness, possible bruising, significant strength loss, and pain with contraction. Grade III is a complete rupture of the muscle–tendon unit: severe immediate pain, a popping sensation, significant bruising, a visible gap, and complete loss of function.',
      'The pattern in this case is Grade II, a partial tear.',
    ],
  },
  {
    id: 'pathway',
    kicker: 'Eccentric pathway',
    title: 'Three phases, then touch',
    motion: false,
    focus: ALL,
    paragraphs: [
      'Phase 1, acute, days 0–4: manage pain, limit bleeding, and keep some mobility. Gentle active stretching and pain-free inner-range work, such as sub-maximal isometrics.',
      'Phase 2, regeneration and repair, weeks 1–4: restore muscle length and begin eccentric loading. Progressive eccentric exercises, such as Nordic hamstring curls, plus core and glute strengthening.',
      'Phase 3, functional return, weeks 4–8 and after: high-speed eccentric strength and a return to sprinting. High-speed running, sport-specific drills, and continued eccentric work. These ranges are a teaching pathway, not a date you are cleared.',
      'TOTAPS Touch, with consent, starts away from the painful site. Note tenderness, warmth, swelling, and unusual bumps. If a stage shows a problem, stop. Do not go straight back to play.',
    ],
  },
  {
    id: 'totaps',
    kicker: 'TOTAPS',
    title: 'Six stages, then stop',
    motion: false,
    focus: ALL,
    paragraphs: [
      'TOTAPS is a structured pitch-side assessment: Talk, Observe, Touch, Active movement, Passive movement, and Skill test.',
      'Talk clarifies the mechanism, the current problem, the site of pain, and any previous similar injury. Observe compares both sides: swelling, discoloration, deformity, and how the athlete holds or moves the area.',
      'Touch, with consent, starts away from the painful site. Active movement: ask the athlete to move independently, only as far as comfortable; do not push through pain. Passive movement, if appropriate and safe, is checked without forcing it. A skill test is only if the earlier stages are reassuring and full movement is pain-free.',
      'If any stage reveals a problem, stop testing. Do not immediately return the athlete to play.',
    ],
  },
]

const TAP_OTHER = 'Tap a hamstring on the back of the right thigh.'

export const HAMSTRING_QUIZ: readonly HamQuizStep[] = [
  {
    kind: 'tap',
    id: 'tap-hamstring',
    region: 'POSTERIOR THIGH',
    prompt: 'Tap a hamstring on the back of the thigh.',
    accept: ['biceps_femoris', 'semitendinosus', 'semimembranosus'],
    revealName: 'hamstrings',
    correct: 'That is one of the three hamstrings on the back of the thigh.',
    wrong: {
      other: TAP_OTHER,
      'other-side': 'That is the other thigh. This one is the right.',
      bone: 'That is bone. The hamstrings are the muscles on the back of the thigh.',
      gluteus_maximus: 'That is gluteus maximus, above the thigh. The hamstrings run down the back of the thigh from the sit bone.',
      rectus_femoris: 'That is rectus femoris, on the front of the thigh. The hamstrings are on the back.',
      vastus_lateralis: 'That is vastus lateralis, on the outer front of the thigh. Come around to the back.',
      gastrocnemius: 'That is gastrocnemius, in the calf. The hamstrings are above the knee, on the back of the thigh.',
    },
    focus: ALL,
  },
  {
    kind: 'type',
    id: 'type-semitend',
    region: 'NAME IT',
    prompt: 'Type the name of the highlighted hamstring.',
    official: 'semitendinosus',
    aliases: ['semitendinosus', 'semitendinosus muscle'],
    hint: 'Medial hamstring, the one with the long cord-like tendon.',
    reveal: 'Semitendinosus. With the long head of biceps femoris it shares the ischial tuberosity, and it inserts on the tibia.',
    focus: SEMITEND,
  },
  {
    kind: 'tap',
    id: 'tap-biceps-fem',
    region: 'LATERAL HAMSTRING',
    prompt: 'Tap biceps femoris, the lateral hamstring.',
    accept: ['biceps_femoris'],
    revealName: 'biceps femoris',
    correct: 'Biceps femoris is the lateral hamstring. The long head shares the sit bone. The short head comes from the femur.',
    wrong: {
      other: 'Tap biceps femoris, on the outer side of the back of the thigh.',
      'other-side': 'That is the other thigh. Use the right side.',
      bone: 'That is bone. Biceps femoris is the muscle on the outer back of the thigh.',
      semitendinosus: 'That is semitendinosus, on the medial side. Biceps femoris is lateral.',
      semimembranosus: 'That is semimembranosus, the deep medial hamstring. Biceps femoris is the lateral one.',
      gluteus_maximus: 'That is gluteus maximus. Biceps femoris continues down the outer back of the thigh.',
    },
    focus: BICEPS,
  },
  {
    kind: 'tap',
    id: 'tap-semimemb',
    region: 'DEEP MEDIAL',
    prompt: 'Tap semimembranosus, the deepest of the three.',
    accept: ['semimembranosus'],
    revealName: 'semimembranosus',
    correct: 'Semimembranosus is the deepest hamstring. It shares the ischial tuberosity and inserts on the tibia.',
    wrong: {
      other: 'Tap semimembranosus. It lies deep to semitendinosus on the medial side.',
      'other-side': 'That is the other thigh. Use the right side.',
      bone: 'That is bone. Semimembranosus is the deep muscle on the medial back of the thigh.',
      semitendinosus: 'That is semitendinosus, more superficial. Semimembranosus is deep to it.',
      biceps_femoris: 'That is biceps femoris, the lateral hamstring. Semimembranosus is medial and deep.',
    },
    focus: SEMIMEMB,
  },
  {
    kind: 'type',
    id: 'type-mechanism',
    region: 'MECHANISM',
    prompt: 'Type the force pattern of this sprint injury.',
    official: 'eccentric tensile overload',
    aliases: [
      'eccentric tensile overload',
      'eccentric overload',
      'tensile overload',
      'tensile force',
      'tension',
      'eccentric tensile force',
      'tension during sprinting',
    ],
    hint: 'Tension, pulling lengthwise, while the muscle is lengthening in the sprint.',
    reveal: 'A hamstring strain in a sprint is an eccentric tensile overload. The force is tension.',
    focus: ALL_SWING,
  },
  {
    kind: 'type',
    id: 'type-grade',
    region: 'GRADE',
    prompt: 'Type the grade of a partial tear in these teaching examples.',
    official: 'grade II',
    aliases: ['grade ii', 'grade 2', 'partial tear'],
    hint: 'Partial tear of muscle fibres. Not a complete rupture.',
    reveal: 'Grade II is a partial tear. These grades are teaching examples, not a way to grade someone from symptoms alone.',
    focus: ALL,
  },
  {
    kind: 'type',
    id: 'type-nordic',
    region: 'PHASE 2',
    prompt: 'Type the eccentric exercise named for phase 2.',
    official: 'nordic hamstring curls',
    aliases: [
      'nordic hamstring curls',
      'nordic hamstring curl',
      'nordic curls',
      'nordic curl',
      'nordics',
      'nordic hamstring',
    ],
    hint: 'Phase 2 begins eccentric loading. The example is a curl named for the Nordic region.',
    reveal: 'Phase 2 uses progressive eccentric exercises, such as Nordic hamstring curls.',
    focus: ALL,
  },
  {
    kind: 'type',
    id: 'type-palpate',
    region: 'TOTAPS TOUCH',
    prompt: 'Where do you start palpation?',
    official: 'away from the pain',
    aliases: [
      'away from the painful site',
      'away from the pain',
      'away from the tender site',
      'away from the tenderness',
      'start away from the pain',
      'start away from the painful site',
      'palpate away from the painful site',
    ],
    hint: 'TOTAPS Touch, with consent. Do not start on the sorest spot.',
    reveal: 'With consent, palpate from away from the painful site. If a stage shows a problem, stop. Do not go straight back to play.',
    focus: ALL,
  },
  {
    kind: 'type',
    id: 'type-totaps-stop',
    region: 'TOTAPS',
    prompt: 'If a TOTAPS stage reveals a problem, what do you do?',
    official: 'stop testing',
    aliases: [
      'stop testing',
      'stop',
      'stop the test',
      'stop assessment',
      'stop the assessment',
      'do not return to play',
      'do not immediately return to play',
      'do not go straight back to play',
      'stop and do not return to play',
      'stop testing and do not return to play',
      'stop and refer',
      'arrange referral',
      'stop testing. do not immediately return the athlete to play',
    ],
    hint: 'If any stage reveals a problem, stop. Do not immediately return the athlete to play.',
    reveal: 'If any stage reveals a problem, stop testing. Do not immediately return the athlete to play.',
    focus: ALL,
  },
  {
    kind: 'type',
    id: 'type-totaps-stages',
    region: 'TOTAPS',
    prompt: 'Name the six TOTAPS stages.',
    official: 'Talk, Observe, Touch, Active movement, Passive movement, and Skill test',
    aliases: [
      'Talk, Observe, Touch, Active movement, Passive movement, and Skill test',
      'talk observe touch active movement passive movement skill test',
      'talk, observe, touch, active movement, passive movement, skill test',
      'talk observe touch active movement passive movement skill',
      'talk observe touch active passive skill test',
      'talk observe touch active passive skill',
      'talk, observe, touch, active, passive, skill',
    ],
    hint: 'The pitch-side mnemonic: Talk, Observe, Touch, then the two movement checks, then a skill test.',
    reveal: 'TOTAPS is Talk, Observe, Touch, Active movement, Passive movement, and Skill test. If any stage reveals a problem, stop testing.',
    focus: ALL,
  },
]

export function hamstringTypeMatch(step: HamTypeStep, typed: string, mode: AnswerMatchMode = 'live'): boolean {
  return matchAliases(typed, step.aliases, mode, step.official)
}

export function gradeHamstringTap(step: HamTapStep, hit: string | null): { ok: boolean; message: string } {
  if (hit && step.accept.includes(hit)) return { ok: true, message: step.correct }
  const key = hit ?? 'other'
  return { ok: false, message: step.wrong[key] || step.wrong.other || TAP_OTHER }
}

export const HAMSTRING_MESHES = HAM_MESHES
