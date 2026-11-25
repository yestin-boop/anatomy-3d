/**
 * Sport muscle-actions and Grade II hamstring strain.
 * Run: npm test
 */
import { MUSCLES } from '../src/data/muscles.ts'
import {
  ACTION_LEARN,
  ACTION_QUIZ,
  actionTypeMatch,
  classifyStudyMesh,
  gradeActionTap,
  rightMeshes,
  type ActionTapStep,
  type ActionTypeStep,
} from '../src/data/muscleActions.ts'
import {
  HAMSTRING_LEARN,
  HAMSTRING_QUIZ,
  gradeHamstringTap,
  hamstringTypeMatch,
  type HamTapStep,
  type HamTypeStep,
} from '../src/data/hamstringStrain.ts'
import { RIGHT_FOOT_BONES } from '../src/data/ankleSprain.ts'
import {
  LATE_SWING_HIP,
  LATE_SWING_KNEE,
  limbPoseAt,
  pivotsFor,
  RIGHT_ARM_BONES,
  RIGHT_FOREARM_BONES,
  RIGHT_LEG_DISTAL,
  RIGHT_LIMB_BONES,
} from '../src/scene/limbCue.ts'
import {
  shouldResumeIdleSpinAfterControlsEnd,
  shouldResumeIdleSpinOnMenuOrExitView,
} from '../src/scene/idleSpin.ts'
import { quizContextLabel } from '../src/ui/quizHud.ts'

let passed = 0
let failed = 0

function assert(cond: unknown, msg: string): void {
  if (cond) {
    passed += 1
    return
  }
  failed += 1
  console.error(`FAIL  ${msg}`)
}

function typeStep<T extends { id: string; kind: string }>(list: readonly T[], id: string): T & { kind: 'type' } {
  const step = list.find((item) => item.id === id)
  if (!step || step.kind !== 'type') throw new Error(`missing type step ${id}`)
  return step as T & { kind: 'type' }
}

function tapStep<T extends { id: string; kind: string }>(list: readonly T[], id: string): T & { kind: 'tap' } {
  const step = list.find((item) => item.id === id)
  if (!step || step.kind !== 'tap') throw new Error(`missing tap step ${id}`)
  return step as T & { kind: 'tap' }
}

const packed = new Set(MUSCLES.flatMap((muscle) => muscle.meshNames))

function meshesArePacked(names: readonly string[], label: string): void {
  assert(names.length > 0, `${label} highlights a mesh`)
  for (const name of names) {
    assert(name.endsWith('_r'), `${label} uses the right side (${name})`)
    assert(packed.has(name), `${label} mesh ${name} is already in the pack`)
  }
}

assert(ACTION_QUIZ.length >= 8 && ACTION_QUIZ.length <= 12, `muscle-action quiz is 8–12, got ${ACTION_QUIZ.length}`)
assert(ACTION_LEARN.length >= 3 && ACTION_LEARN.length <= 6, 'muscle-action learn stays short')
assert(ACTION_QUIZ.some((step) => step.kind === 'type'), 'muscle actions include type questions')
assert(ACTION_QUIZ.some((step) => step.kind === 'tap'), 'muscle actions include tap questions')

const actionIds = [
  'gluteus_medius',
  'gluteus_minimus',
  'gluteus_maximus',
  'rectus_femoris',
  'vastus_lateralis',
  'gastrocnemius',
  'soleus',
  'tibialis_anterior',
  'biceps_femoris',
  'deltoid',
  'biceps_brachii',
  'triceps_brachii',
]
for (const id of actionIds) {
  assert(MUSCLES.some((muscle) => muscle.id === id), `${id} is a packed muscle`)
  meshesArePacked(rightMeshes(id), id)
}

for (const card of ACTION_LEARN) meshesArePacked(card.focus.highlight, `learn ${card.id}`)
for (const step of ACTION_QUIZ) meshesArePacked(step.focus.highlight, `quiz ${step.id}`)

const glutMed = typeStep(ACTION_QUIZ, 'type-glut-med') as ActionTypeStep
assert(actionTypeMatch(glutMed, 'abducts the hip'), 'glute med accepts abducts the hip')
assert(actionTypeMatch(glutMed, 'hip abduction'), 'glute med accepts hip abduction')
assert(actionTypeMatch(glutMed, 'abduct the thigh'), 'glute med accepts abduct the thigh')
assert(!actionTypeMatch(glutMed, 'extends the thigh'), 'glute med does not accept hip extension')

const glutMax = typeStep(ACTION_QUIZ, 'type-glut-max') as ActionTypeStep
assert(actionTypeMatch(glutMax, 'extends the thigh'), 'glute max accepts extends the thigh')
assert(actionTypeMatch(glutMax, 'chief extensor of the flexed thigh', 'confirm'), 'glute max accepts the chief-extensor phrase on Enter')
assert(!actionTypeMatch(glutMax, 'abducts the hip'), 'glute max is not the abductor answer')

const rectus = typeStep(ACTION_QUIZ, 'type-rectus') as ActionTypeStep
assert(
  actionTypeMatch(rectus, 'extends the leg at the knee and flexes the thigh at the hip'),
  'rectus accepts the viewInfo sentence',
)
assert(actionTypeMatch(rectus, 'knee extension and hip flexion'), 'rectus accepts the student phrase')
assert(!actionTypeMatch(rectus, 'extends the leg at the knee'), 'knee extension alone is not the two-joint answer')

const gastroc = typeStep(ACTION_QUIZ, 'type-gastroc') as ActionTypeStep
assert(actionTypeMatch(gastroc, 'plantarflexes the foot'), 'gastroc accepts plantarflexes the foot')
assert(actionTypeMatch(gastroc, 'plantarflexion'), 'gastroc accepts plantarflexion')
assert(actionTypeMatch(gastroc, 'point the toes'), 'gastroc accepts point the toes')
assert(!actionTypeMatch(gastroc, 'dorsiflexion'), 'gastroc is not dorsiflexion')

const tibAnt = typeStep(ACTION_QUIZ, 'type-tib-ant') as ActionTypeStep
assert(actionTypeMatch(tibAnt, 'dorsiflexes the foot'), 'tibialis anterior accepts dorsiflexes the foot')
assert(actionTypeMatch(tibAnt, 'dorsiflexion'), 'tibialis anterior accepts dorsiflexion')
assert(actionTypeMatch(tibAnt, 'lifts the front of the foot'), 'tibialis anterior accepts the HPHS phrase')
assert(!actionTypeMatch(tibAnt, 'plantarflexion'), 'tibialis anterior is not plantarflexion')

const bicepsFem = typeStep(ACTION_QUIZ, 'type-biceps-fem') as ActionTypeStep
assert(actionTypeMatch(bicepsFem, 'flexes the leg at the knee'), 'biceps femoris accepts knee flexion')
assert(actionTypeMatch(bicepsFem, 'knee flexion'), 'biceps femoris accepts knee flexion wording')
assert(actionTypeMatch(bicepsFem, 'flexes the knee and extends the thigh'), 'biceps femoris accepts both actions')
assert(!actionTypeMatch(bicepsFem, 'extends the thigh'), 'thigh extension alone is not the knee answer')

const biceps = typeStep(ACTION_QUIZ, 'type-biceps') as ActionTypeStep
assert(actionTypeMatch(biceps, 'flexes the elbow'), 'biceps accepts elbow flexion')
assert(actionTypeMatch(biceps, 'elbow flexion'), 'biceps accepts elbow flexion wording')
assert(actionTypeMatch(biceps, 'chief supinator of the forearm'), 'biceps accepts chief supinator')
assert(!actionTypeMatch(biceps, 'extends the elbow'), 'biceps is not the elbow extensor')

const triceps = typeStep(ACTION_QUIZ, 'type-triceps') as ActionTypeStep
assert(actionTypeMatch(triceps, 'extends the elbow'), 'triceps accepts extends the elbow')
assert(actionTypeMatch(triceps, 'chief extensor of the elbow'), 'triceps accepts chief extensor')
assert(!actionTypeMatch(triceps, 'flexes the elbow'), 'triceps is not elbow flexion')

const glutMin = tapStep(ACTION_QUIZ, 'tap-glut-min') as ActionTapStep
assert(gradeActionTap(glutMin, 'gluteus_minimus').ok, 'tapping gluteus minimus is correct')
assert(!gradeActionTap(glutMin, 'gluteus_medius').ok, 'gluteus medius is the wrong tap')
assert(!gradeActionTap(glutMin, 'gluteus_maximus').ok, 'gluteus maximus is the wrong tap')
assert(gradeActionTap(glutMin, 'gluteus_minimus').message.toLowerCase().includes('internally rotates'), 'minimus feedback names internal rotation')

const soleus = tapStep(ACTION_QUIZ, 'tap-soleus') as ActionTapStep
assert(gradeActionTap(soleus, 'soleus').ok, 'tapping soleus is correct')
assert(!gradeActionTap(soleus, 'gastrocnemius').ok, 'gastrocnemius is not soleus')
assert(!gradeActionTap(soleus, 'tibialis_anterior').ok, 'tibialis anterior is not soleus')

const deltoid = tapStep(ACTION_QUIZ, 'tap-deltoid') as ActionTapStep
assert(gradeActionTap(deltoid, 'deltoid').ok, 'tapping deltoid is correct')
assert(!gradeActionTap(deltoid, 'biceps_brachii').ok, 'biceps is not the shoulder abductor')

assert(classifyStudyMesh('glut_med_r', 'muscle') === 'gluteus_medius', 'right glute med mesh classifies')
assert(classifyStudyMesh('glut_med_l', 'muscle') === 'other-side', 'left glute med is the other side')
assert(classifyStudyMesh('femur_r', 'bone') === 'bone', 'a bone tap is bone')

const actionCopy = ACTION_LEARN.map((card) => card.paragraphs.join(' ')).join(' ')
assert(actionCopy.includes('abducts the hip'), 'learn says glute med abducts the hip')
assert(actionCopy.includes('chief extensor of the flexed thigh'), 'learn keeps the glute max phrase')
assert(actionCopy.includes('powers push-off'), 'learn keeps the gastroc push-off line')
assert(actionCopy.includes('lifts the front of the foot'), 'learn keeps tibialis anterior wording')
assert(actionCopy.includes('chief abductor of the arm'), 'learn keeps the deltoid phrase')
assert(actionCopy.includes('chief supinator'), 'learn keeps the biceps phrase')
assert(actionCopy.includes('chief extensor of the elbow'), 'learn keeps the triceps phrase')
assert(!/lisfranc|pcl|whiplash|high ankle|shoulder dislocation/i.test(actionCopy), 'sport learn does not add other injuries')

assert(HAMSTRING_QUIZ.length >= 6 && HAMSTRING_QUIZ.length <= 10, `hamstring quiz stays tight, got ${HAMSTRING_QUIZ.length}`)
for (const id of ['biceps_femoris', 'semitendinosus', 'semimembranosus'] as const) {
  meshesArePacked(rightMeshes(id), id)
}
for (const card of HAMSTRING_LEARN) meshesArePacked(card.focus.highlight, `ham learn ${card.id}`)
for (const step of HAMSTRING_QUIZ) meshesArePacked(step.focus.highlight, `ham quiz ${step.id}`)

const hamCopy = HAMSTRING_LEARN.map((card) => card.paragraphs.join(' ')).join(' ')
assert(hamCopy.toLowerCase().includes('muscle–tendon') || hamCopy.toLowerCase().includes('muscle-tendon'), 'strain names the muscle-tendon unit')
assert(hamCopy.toLowerCase().includes('sprinting'), 'the example is a sprint')
assert(hamCopy.toLowerCase().includes('eccentric tensile overload'), 'mechanism is eccentric tensile overload')
assert(hamCopy.toLowerCase().includes('acute'), 'onset is acute')
assert(hamCopy.includes('Grade I') && hamCopy.includes('Grade II') && hamCopy.includes('Grade III'), 'all three grades are taught')
assert(hamCopy.toLowerCase().includes('partial tear'), 'grade II is a partial tear')
assert(hamCopy.toLowerCase().includes('not a way to grade someone from symptoms alone'), 'grades are teaching examples')
assert(hamCopy.includes('Nordic hamstring curls'), 'phase 2 names Nordic hamstring curls')
assert(hamCopy.toLowerCase().includes('away from the painful site'), 'TOTAPS starts away from the painful site')
assert(hamCopy.toLowerCase().includes('ischial tuberosity'), 'the shared origin is named')
assert(hamCopy.toLowerCase().includes('teaching pathway, not a date'), 'phase ranges are not clearance dates')
assert(!/lisfranc|pcl\b|whiplash|high ankle|achilles rupture|ottawa|surgery is required/i.test(hamCopy), 'hamstring learn does not invent other injuries')

const anyHam = tapStep(HAMSTRING_QUIZ, 'tap-hamstring') as HamTapStep
assert(gradeHamstringTap(anyHam, 'biceps_femoris').ok, 'biceps femoris counts as a hamstring')
assert(gradeHamstringTap(anyHam, 'semitendinosus').ok, 'semitendinosus counts as a hamstring')
assert(gradeHamstringTap(anyHam, 'semimembranosus').ok, 'semimembranosus counts as a hamstring')
assert(!gradeHamstringTap(anyHam, 'rectus_femoris').ok, 'rectus femoris is not a hamstring')
assert(!gradeHamstringTap(anyHam, 'gastrocnemius').ok, 'gastrocnemius is not a hamstring')

const nameSemi = typeStep(HAMSTRING_QUIZ, 'type-semitend') as HamTypeStep
assert(hamstringTypeMatch(nameSemi, 'semitendinosus'), 'semitendinosus name matches')
assert(!hamstringTypeMatch(nameSemi, 'semimembranosus'), 'semimembranosus is not semitendinosus')

const bicepsTap = tapStep(HAMSTRING_QUIZ, 'tap-biceps-fem') as HamTapStep
assert(gradeHamstringTap(bicepsTap, 'biceps_femoris').ok, 'lateral hamstring tap is biceps femoris')
assert(!gradeHamstringTap(bicepsTap, 'semitendinosus').ok, 'medial hamstring is not biceps femoris')

const deepTap = tapStep(HAMSTRING_QUIZ, 'tap-semimemb') as HamTapStep
assert(gradeHamstringTap(deepTap, 'semimembranosus').ok, 'deep hamstring tap is semimembranosus')
assert(!gradeHamstringTap(deepTap, 'semitendinosus').ok, 'semitendinosus is not the deep one')

const mechanism = typeStep(HAMSTRING_QUIZ, 'type-mechanism') as HamTypeStep
assert(hamstringTypeMatch(mechanism, 'eccentric tensile overload'), 'full mechanism matches')
assert(hamstringTypeMatch(mechanism, 'tension', 'confirm'), 'tension confirms')
assert(hamstringTypeMatch(mechanism, 'tensile force'), 'tensile force matches')
assert(!hamstringTypeMatch(mechanism, 'inversion'), 'inversion is not this mechanism')

const grade = typeStep(HAMSTRING_QUIZ, 'type-grade') as HamTypeStep
assert(hamstringTypeMatch(grade, 'grade II'), 'grade II matches')
assert(hamstringTypeMatch(grade, 'grade 2'), 'grade 2 matches')
assert(hamstringTypeMatch(grade, 'partial tear'), 'partial tear matches')
assert(!hamstringTypeMatch(grade, 'grade III'), 'grade III is not this case')
assert(!hamstringTypeMatch(grade, 'grade I'), 'grade I is not this case')

const nordic = typeStep(HAMSTRING_QUIZ, 'type-nordic') as HamTypeStep
assert(hamstringTypeMatch(nordic, 'Nordic hamstring curls'), 'Nordic hamstring curls match')
assert(hamstringTypeMatch(nordic, 'nordic curls'), 'nordic curls match')
assert(!hamstringTypeMatch(nordic, 'leg curl'), 'a generic leg curl is not the named exercise')

const palp = typeStep(HAMSTRING_QUIZ, 'type-palpate') as HamTypeStep
assert(hamstringTypeMatch(palp, 'away from the painful site'), 'palpation starts away from the painful site')
assert(hamstringTypeMatch(palp, 'away from the pain'), 'the short palpation phrase matches')
assert(!hamstringTypeMatch(palp, 'on the painful site'), 'starting on the sore spot is wrong')

const rest = limbPoseAt('plantarflex', 0)
const plantar = limbPoseAt('plantarflex', 1)
const dorsi = limbPoseAt('dorsiflex', 1)
assert(rest.primary === 0 && rest.knee === 0, 'cues start at rest')
assert(plantar.primary > 0.3 && plantar.axis === 'x', 'plantarflexion is +X')
assert(dorsi.primary < -0.2 && dorsi.axis === 'x', 'dorsiflexion is −X')
assert(limbPoseAt('knee-flex', 1).primary > 0.4, 'knee flexion swings the leg back')
assert(limbPoseAt('elbow-flex', 1).primary < -0.4, 'elbow flexion brings the hand forward')
assert(limbPoseAt('hip-abduct', 1).axis === 'z' && limbPoseAt('hip-abduct', 1).primary < 0, 'right hip abduction is −Z')
assert(limbPoseAt('hip-extend', 1).primary > 0.2, 'hip extension swings the thigh back')
assert(limbPoseAt('arm-abduct', 1).primary < 0, 'right arm abduction is outward')
const late = limbPoseAt('late-swing', 1)
assert(late.primary === LATE_SWING_HIP && late.primary < 0, 'late swing flexes the hip')
assert(late.knee === LATE_SWING_KNEE && late.knee > 0, 'late swing keeps a little knee flexion')
assert(limbPoseAt('none', 1).primary === 0, 'no cue stays still')

for (const cue of ['plantarflex', 'dorsiflex', 'knee-flex', 'elbow-flex', 'hip-abduct', 'hip-extend', 'hip-flex', 'arm-abduct', 'late-swing'] as const) {
  for (const spec of pivotsFor(cue)) {
    for (const bone of spec.bones) assert(bone.endsWith('_r'), `${cue} only moves right-side ${bone}`)
  }
}
assert(!RIGHT_LEG_DISTAL.includes('femur_r'), 'knee flexion leaves the femur still')
assert(!RIGHT_FOREARM_BONES.includes('humerus_r'), 'elbow flexion leaves the humerus still')
assert(RIGHT_ARM_BONES.includes('humerus_r') && RIGHT_ARM_BONES.includes('radius_r'), 'arm abduction carries the whole arm')
assert(RIGHT_LIMB_BONES.includes('femur_r') && RIGHT_LIMB_BONES.includes('tibia_r'), 'hip cues carry the limb')
assert(RIGHT_FOOT_BONES.includes('talus_r') && !RIGHT_FOOT_BONES.includes('tibia_r'), 'ankle cue is the foot, not the shin')

const idle = { disposed: false, viewMode: false, ankleCase: false, targetCount: 0 }
assert(!shouldResumeIdleSpinAfterControlsEnd({ ...idle, studyCase: true }), 'a study module does not resume spin')
assert(!shouldResumeIdleSpinOnMenuOrExitView({ ankleCase: false, studyCase: true }), 'menu spin stays off during a study module')
assert(shouldResumeIdleSpinAfterControlsEnd(idle), 'the menu still resumes spin')
assert(shouldResumeIdleSpinOnMenuOrExitView({ ankleCase: false }), 'existing ankle callers still resume on the menu')

assert(quizContextLabel({ viewing: false, subject: 'sport', activity: 'type' }) === 'Sport · type it', 'sport type label')
assert(quizContextLabel({ viewing: false, subject: 'sport', activity: 'tap' }) === 'Sport · tap it', 'sport tap label')
assert(quizContextLabel({ viewing: false, subject: 'sport', activity: 'learn' }) === 'Sport · learn', 'sport learn label')
assert(quizContextLabel({ viewing: false, subject: 'rehab', activity: 'learn' }) === 'Rehab · learn', 'hamstring stays under Rehab')

console.log(`${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
