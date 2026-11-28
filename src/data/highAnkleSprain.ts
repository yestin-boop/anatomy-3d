/**
 * High ankle (syndesmotic) sprain. Facts are limited to the HPHS4107
 * foot and ankle lecture. A new Rehab case beside the lateral sprain.
 * Meshes already packed: AITFL, PITFL, transverse tibiofibular, and the
 * lateral and deltoid ligaments used only as contrast. No new meshes.
 * The interosseous ligament and membrane are named in text only.
 */
import { matchAliases, type AnswerMatchMode } from './answerMatch'

export type HighAnkleHit =
  | 'aitfl'
  | 'pitfl'
  | 'trans_tibfib'
  | 'atfl'
  | 'cfl'
  | 'ptfl'
  | 'deltoid'
  | 'tibia'
  | 'fibula'
  | 'other-ankle'
  | 'other'

/** Which syndesmosis bands are lit. Empty emphasis lights every shown ligament. */
export type HighAnkleLight = 'none' | 'aitfl' | 'aitfl-pitfl' | 'syndesmosis'

/** Mortise is the distal joint. Calf includes the lower half of the shin for the Squeeze test. */
export type HighAnkleSpan = 'mortise' | 'calf'

export type HighAnkleLearnCard = {
  id: string
  kicker: string
  title: string
  paragraphs: string[]
  light: HighAnkleLight
  span: HighAnkleSpan
  motion: boolean
}

export type HighAnkleReject = {
  aliases: string[]
  message: string
}

export type HighAnkleTypeStep = {
  kind: 'type'
  id: string
  region: string
  prompt: string
  official: string
  aliases: string[]
  hint: string
  reveal: string
  light: HighAnkleLight
  span: HighAnkleSpan
  /** A finished wrong phrase shows this contrast and is not marked correct. */
  reject?: HighAnkleReject
}

export type HighAnkleTapStep = {
  kind: 'tap'
  id: string
  region: string
  prompt: string
  accept: HighAnkleHit[]
  revealName: string
  correct: string
  wrong: Record<HighAnkleHit, string>
  light: HighAnkleLight
  span: HighAnkleSpan
}

export type HighAnkleQuizStep = HighAnkleTypeStep | HighAnkleTapStep

/** Right ligaments this case can show. Left copies stay available for a wrong-side tap. */
export const HIGH_ANKLE_LIGAMENT_MESHES: readonly string[] = [
  'aitfl_r',
  'aitfl_l',
  'pitfl_r',
  'pitfl_l',
  'trans_tibfib_r',
  'trans_tibfib_l',
  'atfl_r',
  'atfl_l',
  'cfl_r',
  'cfl_l',
  'ptfl_r',
  'ptfl_l',
  'deltoid_r',
  'deltoid_l',
]

export const HIGH_ANKLE_RIGHT_LIGAMENTS: readonly string[] = HIGH_ANKLE_LIGAMENT_MESHES.filter((name) =>
  name.endsWith('_r'),
)

/**
 * Meshes that set the camera box, plus a clipped distal shaft of the tibia
 * and fibula. The full shin bones are not in this list: they would pull the
 * camera up to the knee.
 */
export const HIGH_ANKLE_FRAME_MESHES: readonly string[] = [
  'aitfl_r',
  'pitfl_r',
  'trans_tibfib_r',
  'atfl_r',
  'cfl_r',
  'ptfl_r',
  'deltoid_r',
  'talus_r',
]

/** Fraction of tibial and fibular length kept above the distal end. */
export const HIGH_ANKLE_SHAFT = { mortise: 0.18, calf: 0.5 } as const

export function highAnkleHotMeshes(light: HighAnkleLight): readonly string[] {
  if (light === 'aitfl') return ['aitfl_r']
  if (light === 'aitfl-pitfl') return ['aitfl_r', 'pitfl_r']
  if (light === 'syndesmosis') return ['aitfl_r', 'pitfl_r', 'trans_tibfib_r']
  return HIGH_ANKLE_RIGHT_LIGAMENTS
}

export const HIGH_ANKLE_LEARN: readonly HighAnkleLearnCard[] = [
  {
    id: 'scenario',
    kicker: 'Rehab · high ankle',
    title: 'A sprain above the usual site',
    light: 'aitfl',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'A syndesmotic sprain is a high ankle sprain. It involves the inferior tibiofibular joint, where the distal tibia and fibula meet, and the inferior tibiofibular ligaments that hold them — the syndesmosis.',
      'The lecture figure places this injury higher on the ankle than a common inversion sprain. The band it labels at the tear is the anteroinferior tibiofibular ligament (AITFL). That is not the ATFL.',
    ],
  },
  {
    id: 'anatomy',
    kicker: 'Anatomy',
    title: 'Inferior tibiofibular joint',
    light: 'syndesmosis',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'The distal tibia and fibula articulate at the inferior tibiofibular joint. They are supported by the inferior tibiofibular ligaments, or syndesmosis. The small amount of movement at this joint is extremely important for normal walking and running.',
      'The lecture figures name the anterior inferior tibiofibular ligament (AITFL), the posterior inferior tibiofibular ligament (PITFL), the transverse ligament (also labelled inferior transverse tibiofibular ligament), the interosseous ligament, and the interosseous membrane. The model can show the first three. It does not include a mesh for the interosseous ligament or membrane.',
    ],
  },
  {
    id: 'mechanism',
    kicker: 'Mechanism of injury',
    title: 'Dorsiflexion, eversion, and tibial internal rotation',
    light: 'aitfl-pitfl',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'The mechanism is dorsiflexion and eversion of the ankle with internal rotation of the tibia. The lecture figure also shows a lateral force to the knee in a cleated player.',
      'This is not the inversion and plantarflexion mechanism of a common lateral sprain.',
    ],
  },
  {
    id: 'palpation',
    kicker: 'Assessment',
    title: 'Palpate the AITFL',
    light: 'aitfl',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'The physical assessment starts with palpation, then the Squeeze test and the External rotation test.',
      'Palpate the AITFL. The same assessment slide also lists the ATFL, CFL, and PTFL — the lateral ligaments — so this injury stays distinct from a common inversion sprain. The AITFL sits at the distal tibia–fibula joint, higher and more in front of the syndesmosis than the ATFL, which runs from the front of the lateral malleolus toward the talus.',
    ],
  },
  {
    id: 'squeeze',
    kicker: 'Special test',
    title: 'Squeeze test',
    light: 'syndesmosis',
    span: 'calf',
    motion: false,
    paragraphs: [
      'The patient lies supine. The examiner grasps the lower leg at mid-calf and squeezes the tibia and fibula together, then applies the same load at more distal locations, moving toward the ankle.',
      'Pain around the syndesmosis, or pain in the lower leg, may indicate a syndesmosis injury. That reading holds only if fracture, contusion, and compartment syndrome have been ruled out. The lecture figure also says fracture should be excluded before performing this test.',
      'The same lecture gives the Ottawa Ankle Rules for deciding whether an ankle or foot injury needs an X-ray: pain in the ankle or midfoot, plus inability to walk four steps immediately after the injury and during evaluation, or bone tenderness at the tips or posterior edges of the malleoli, or at the base of the fifth metatarsal or the navicular. This case has no Ottawa findings of its own.',
    ],
  },
  {
    id: 'external-rotation',
    kicker: 'Special test',
    title: 'External rotation test',
    light: 'syndesmosis',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'If pain is reproduced with manual external rotation of the foot and ankle relative to the tibia, the test is positive. The tibia must be stabilised while the test is performed.',
      'The lecture figure adds: the examiner stabilises the lower leg with one hand and externally rotates a plantigrade foot with the other. Pain around the syndesmosis is a positive test.',
    ],
  },
  {
    id: 'pathway-early',
    kicker: 'Rehab pathway',
    title: 'Acute, then sub-acute',
    light: 'syndesmosis',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'This is the lecture’s high-ankle timeline, not the three-phase lateral-sprain pathway, and not the generic “Acute → Sub-acute → Functional → Return to Sport” line in the summary. The lecture names four phases. It does not give day or week ranges.',
      'Phase 1, acute. Goals: control pain and swelling; restore pain-free range of motion; protect healing structures with a splint, brace, or heel lift. Precautions: often non-weight bearing with crutches, with progression to a CAM boot. Avoid painful dorsiflexion and eversion.',
      'Phase 2, sub-acute. Goals: maintain range of motion and improve flexibility; progress weight-bearing and normalise gait mechanics; improve strength and initiate double-limb balance activities. The athlete may still need a CAM boot and/or crutches for weight bearing.',
    ],
  },
  {
    id: 'pathway-late',
    kicker: 'Rehab pathway',
    title: 'Strengthening, then return to sport',
    light: 'syndesmosis',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'Phase 3, strengthening. Goals: maximise strength and initiate CKC exercises; maximise neuromuscular control and initiate single-limb exercises; initiate treadmill walking. Full weight bearing, but a heel lift or ankle brace may still be used for protection.',
      'Phase 4, return to activity or sport. Goals: continue dynamic strengthening and proprioceptive exercises; initiate a jog-to-run progression; initiate cutting, pivoting, and sport-specific drills. Cleared to return to sport per physician. These are teaching goals, not a date you are cleared.',
    ],
  },
  {
    id: 'totaps',
    kicker: 'TOTAPS',
    title: 'Six stages, then stop',
    light: 'aitfl',
    span: 'mortise',
    motion: false,
    paragraphs: [
      'TOTAPS is a structured pitch-side assessment: Talk, Observe, Touch, Active movement, Passive movement, and Skill test. If any stage reveals a problem, stop testing. Do not immediately return the athlete to play.',
      'Touch, with consent, starts away from the injury; bones first, then ligaments. For this injury, the ligament the lecture names to palpate is the AITFL.',
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
  'an inversion plantarflexion sprain',
  'inversion plantarflexion sprain',
  'acute inversion and plantarflexion',
  'inverted and plantarflexed',
]

const ATFL_NAMES = [
  'atfl',
  'anterior talofibular ligament',
  'anterior talo-fibular ligament',
  'anterior talofibular',
]

const TAP_OTHER = 'Tap the anterior inferior tibiofibular ligament on the right ankle.'

const BONE_WRONG =
  'That is bone. The AITFL is the ligament joining the distal tibia and fibula at the front of the syndesmosis.'

/** Blanks use the short name. Each previous official phrase stays an alias. Hints, reveals, and tap prompts stay on the notes wording. */
export const HIGH_ANKLE_QUIZ: readonly HighAnkleQuizStep[] = [
  {
    kind: 'type',
    id: 'type-injury',
    region: 'NAME IT',
    prompt: 'Type the name of this sprain.',
    official: 'high ankle sprain',
    aliases: [
      'high ankle sprain',
      'syndesmotic sprain',
      'syndesmosis sprain',
      'high ankle (syndesmotic) sprain',
      'syndesmotic (high ankle) sprain',
      'high-ankle sprain',
      'high ankle sprain (syndesmotic sprain)',
    ],
    hint: 'It involves the inferior tibiofibular joint, not the ATFL.',
    reveal: 'A syndesmotic sprain is a high ankle sprain. It is not a common inversion sprain of the ATFL or CFL.',
    light: 'aitfl',
    span: 'mortise',
  },
  {
    kind: 'type',
    id: 'type-joint',
    region: 'JOINT',
    prompt: 'Type the joint this sprain involves.',
    official: 'syndesmosis',
    aliases: [
      'inferior tibiofibular joint',
      'inferior tibiofibular syndesmosis',
      'distal tibiofibular joint',
      'distal tibiofibular syndesmosis',
      'syndesmosis',
      'tibiofibular syndesmosis',
      'inferior tibio-fibular joint',
      'inferior tibiofibular joint (syndesmosis)',
    ],
    hint: 'The distal tibia and fibula meet here.',
    reveal:
      'The distal tibia and fibula articulate at the inferior tibiofibular joint, supported by the inferior tibiofibular ligaments, or syndesmosis. A small amount of movement here is extremely important for normal walking and running.',
    light: 'syndesmosis',
    span: 'mortise',
  },
  {
    kind: 'type',
    id: 'type-mechanism',
    region: 'MECHANISM',
    prompt: 'Type the mechanism of a high ankle sprain.',
    official: 'DF + eversion + tibial IR',
    aliases: [
      'dorsiflexion and eversion with tibial internal rotation',
      'dorsiflexion and eversion of the ankle with internal rotation of the tibia',
      'DF and eversion with tibial internal rotation',
      'DF + eversion + tibial IR',
      'tibia IR and ankle eversion and dorsiflexion',
      'dorsiflexion, eversion, and tibial internal rotation',
      'eversion and dorsiflexion with tibial internal rotation',
    ],
    hint: 'The ankle goes up and out, and the tibia turns in.',
    reveal: 'The mechanism is dorsiflexion and eversion of the ankle with internal rotation of the tibia.',
    light: 'aitfl-pitfl',
    span: 'mortise',
    reject: {
      aliases: LATERAL_MECHANISM,
      message:
        'That mechanism is the common lateral (inversion) sprain, which loads the ATFL and CFL. This case is dorsiflexion and eversion with tibial internal rotation.',
    },
  },
  {
    kind: 'type',
    id: 'type-palpate',
    region: 'PALPATION',
    prompt: 'Type the ligament this assessment tells you to palpate.',
    official: 'AITFL',
    aliases: [
      'anterior inferior tibiofibular ligament',
      'anteroinferior tibiofibular ligament',
      'anterior tibiofibular ligament',
      'AITFL',
      'anterior inferior tibio-fibular ligament',
      'anterior inferior tibiofibular',
    ],
    hint: 'It is the anterior ligament of the syndesmosis, not the ATFL.',
    reveal: 'Palpate the AITFL, the anterior inferior tibiofibular ligament. It is not the ATFL.',
    light: 'aitfl',
    span: 'mortise',
    reject: {
      aliases: ATFL_NAMES,
      message:
        'That is the ATFL, the anterior talofibular ligament, lower down toward the talus. This question is the AITFL, at the syndesmosis.',
    },
  },
  {
    kind: 'tap',
    id: 'tap-aitfl',
    region: 'TAP THE LIGAMENT',
    prompt: 'Tap the anterior inferior tibiofibular ligament.',
    accept: ['aitfl'],
    revealName: 'AITFL',
    correct: 'That is the AITFL, the anterior inferior tibiofibular ligament, at the distal tibia–fibula joint.',
    wrong: {
      aitfl: '',
      atfl: 'That is the ATFL, the anterior talofibular ligament, lower down toward the talus. This question is the AITFL, at the syndesmosis.',
      cfl: 'That is the calcaneofibular ligament, a lateral ligament. The AITFL is at the distal tibia–fibula joint.',
      ptfl: 'That is the posterior talofibular ligament, a lateral ligament, not a syndesmosis band.',
      deltoid: 'That is the deltoid ligament on the medial side. The AITFL is at the front of the syndesmosis.',
      pitfl: 'That is the posterior inferior tibiofibular ligament. The lecture figures also label it, but this question is the AITFL, the anterior band the assessment lists for palpation.',
      trans_tibfib:
        'That is the transverse (inferior transverse tibiofibular) ligament. This question is the AITFL, the anterior band.',
      fibula: BONE_WRONG,
      tibia: BONE_WRONG,
      'other-ankle': 'That is the other ankle. This case is the right ankle.',
      other: TAP_OTHER,
    },
    light: 'aitfl',
    span: 'mortise',
  },
  {
    kind: 'type',
    id: 'type-squeeze',
    region: 'SPECIAL TEST',
    prompt: 'How do you perform the Squeeze test?',
    official: 'mid-calf squeeze',
    aliases: [
      'squeeze the tibia and fibula together at mid-calf, then move distally',
      'mid-calf squeeze of the tibia and fibula, moving toward the ankle',
      'compress the tibia and fibula at mid-calf and move distally',
      'squeeze tibia and fibula at mid-calf',
      'mid-calf squeeze',
      'squeeze test at mid-calf',
    ],
    hint: 'The patient is supine. Start mid-calf, then move toward the ankle.',
    reveal:
      'The patient lies supine. Grasp the lower leg at mid-calf and squeeze the tibia and fibula together, then apply the same load more distally, moving toward the ankle. Pain around the syndesmosis may indicate a syndesmosis injury, provided fracture, contusion, and compartment syndrome have been ruled out.',
    light: 'syndesmosis',
    span: 'calf',
  },
  {
    kind: 'type',
    id: 'type-squeeze-positive',
    region: 'SPECIAL TEST',
    prompt: 'What makes a Squeeze test positive, and what must already be ruled out?',
    official: 'pain around the syndesmosis; fracture, contusion, and compartment syndrome ruled out',
    aliases: [
      'pain around the syndesmosis; fracture, contusion, and compartment syndrome ruled out',
      'pain around the syndesmosis, after fracture, contusion, and compartment syndrome have been ruled out',
      'pain around the syndesmosis after fracture, contusion, and compartment syndrome have been ruled out',
      'pain in the lower leg after fracture, contusion, and compartment syndrome have been ruled out',
      'pain near the syndesmosis after fracture, contusion, and compartment syndrome have been ruled out',
      'pain around the syndesmosis provided fracture, contusion, and compartment syndrome have been ruled out',
      'pain around the syndesmosis',
      'pain in the lower leg',
      'pain near the syndesmosis',
    ],
    hint: 'A positive test is pain at the syndesmosis. The lecture will not read that test until something more serious is out of the way.',
    reveal:
      'Pain around the syndesmosis, or pain in the lower leg, may indicate a syndesmosis injury, provided fracture, contusion, and compartment syndrome have been ruled out. Fracture should be excluded before the test.',
    light: 'aitfl',
    span: 'mortise',
  },
  {
    kind: 'type',
    id: 'type-external-rotation',
    region: 'SPECIAL TEST',
    prompt: 'What makes the External rotation test positive?',
    official: 'pain with ER of the foot',
    aliases: [
      'pain with external rotation of the foot and ankle relative to a stabilised tibia',
      'pain reproduced with external rotation of the foot and ankle',
      'pain around the syndesmosis with external rotation',
      'external rotation of a plantigrade foot with the tibia stabilised, pain around the syndesmosis',
      'pain on ER with the tibia stabilised',
      'pain with ER of the foot',
    ],
    hint: 'Stabilise the tibia. Turn the foot out. Pain means the test is positive.',
    reveal:
      'If pain is reproduced with manual external rotation of the foot and ankle relative to the tibia, the test is positive. The tibia must be stabilised. The lecture figure uses a plantigrade foot, and a positive test is pain around the syndesmosis.',
    light: 'aitfl',
    span: 'mortise',
  },
  {
    kind: 'type',
    id: 'type-phase-1',
    region: 'PHASE 1',
    prompt: 'Type the Phase 1 precautions in this high-ankle pathway.',
    official: 'NWB with crutches, then CAM boot; avoid painful DF and eversion',
    aliases: [
      'NWB with crutches, then CAM boot; avoid painful DF and eversion',
      'often non-weight bearing with crutches, progressing to a CAM boot',
      'often non-weight bearing with crutches, progressing to a CAM boot; avoid painful dorsiflexion and eversion',
      'NWB with crutches, then CAM boot',
      'non-weight bearing with crutches and progression to CAM boot',
      'avoid painful dorsiflexion and eversion',
      'avoid painful DF and eversion',
      'NWB crutches CAM boot, avoid painful DF and eversion',
    ],
    hint: 'Protection first. The motions to avoid are the same ones in the mechanism.',
    reveal:
      'Phase 1 is often non-weight bearing with crutches, with progression to a CAM boot. Avoid painful dorsiflexion and eversion. Goals are to control pain and swelling, restore pain-free range of motion, and protect healing structures with a splint, brace, or heel lift.',
    light: 'aitfl',
    span: 'mortise',
  },
  {
    kind: 'type',
    id: 'type-phase-4',
    region: 'PHASE 4',
    prompt: 'Type the Phase 4 work in this high-ankle pathway.',
    official: 'jog-to-run, then cutting and pivoting',
    aliases: [
      'jog-to-run, then cutting and pivoting',
      'jog-to-run progression, then cutting, pivoting, and sport-specific drills',
      'jog-to-run progression',
      'cutting, pivoting, and sport-specific drills',
      'cutting and pivoting',
      'sport-specific drills',
      'dynamic strengthening and proprioceptive exercises, jog-to-run, cutting and pivoting',
    ],
    hint: 'Return to activity: run, then cut and pivot, then the sport. Clearance is not yours alone.',
    reveal:
      'Phase 4 continues dynamic strengthening and proprioceptive exercises, initiates a jog-to-run progression, and initiates cutting, pivoting, and sport-specific drills. Cleared to return to sport per physician.',
    light: 'aitfl',
    span: 'mortise',
  },
]

export function highAnkleTypeMatch(
  step: HighAnkleTypeStep,
  typed: string,
  mode: AnswerMatchMode = 'live',
): boolean {
  return matchAliases(typed, step.aliases, mode, step.official)
}

/** A complete rejected phrase, such as the lateral mechanism or the ATFL. Not a correct answer. */
export function highAnkleTypeReject(step: HighAnkleTypeStep, typed: string): string | null {
  if (!step.reject) return null
  return matchAliases(typed, step.reject.aliases, 'confirm', step.reject.aliases[0] ?? '')
    ? step.reject.message
    : null
}

export function gradeHighAnkleTap(
  step: HighAnkleTapStep,
  hit: HighAnkleHit | null,
): { ok: boolean; message: string } {
  if (hit && step.accept.includes(hit)) return { ok: true, message: step.correct }
  const key = hit ?? 'other'
  return { ok: false, message: step.wrong[key] || step.wrong.other }
}

export function classifyHighAnkleMesh(name: string): HighAnkleHit {
  if (name === 'aitfl_r') return 'aitfl'
  if (name === 'pitfl_r') return 'pitfl'
  if (name === 'trans_tibfib_r') return 'trans_tibfib'
  if (name === 'atfl_r') return 'atfl'
  if (name === 'cfl_r') return 'cfl'
  if (name === 'ptfl_r') return 'ptfl'
  if (name === 'deltoid_r') return 'deltoid'
  if (name === 'tibia_r') return 'tibia'
  if (name === 'fibula_r') return 'fibula'
  if (
    name === 'aitfl_l' ||
    name === 'pitfl_l' ||
    name === 'trans_tibfib_l' ||
    name === 'atfl_l' ||
    name === 'cfl_l' ||
    name === 'ptfl_l' ||
    name === 'deltoid_l' ||
    name.endsWith('_l')
  ) {
    return 'other-ankle'
  }
  return 'other'
}
