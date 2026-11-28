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
  KICK_HIP,
  KICK_KNEE,
  LATE_SWING_HIP,
  LATE_SWING_KNEE,
  limbPoseAt,
  pivotsFor,
  RIGHT_ARM_BONES,
  RIGHT_FOREARM_BONES,
  RIGHT_LEG_DISTAL,
  RIGHT_LIMB_BONES,
} from '../src/scene/limbCue.ts'
import { seatInfluence, type SeatBox } from '../src/scene/muscleSeat.ts'
import {
  shouldResumeIdleSpinAfterControlsEnd,
  shouldResumeIdleSpinOnMenuOrExitView,
} from '../src/scene/idleSpin.ts'
import { quizContextLabel, skipButtonLabel } from '../src/ui/quizHud.ts'
import { activityFace, noteRevision, type RevisionState } from '../src/ui/revision.ts'
import { readFileSync } from 'node:fs'

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

assert(ACTION_QUIZ.length >= 8 && ACTION_QUIZ.length <= 22, `muscle-action quiz stays tight, got ${ACTION_QUIZ.length}`)
assert(ACTION_LEARN.length >= 3 && ACTION_LEARN.length <= 10, `muscle-action learn stays short, got ${ACTION_LEARN.length}`)
assert(ACTION_QUIZ.some((step) => step.kind === 'type'), 'muscle actions include type questions')
assert(ACTION_QUIZ.some((step) => step.kind === 'tap'), 'muscle actions include tap questions')

const actionIds = [
  'gluteus_medius',
  'gluteus_minimus',
  'gluteus_maximus',
  'iliacus',
  'psoas_major',
  'rectus_femoris',
  'vastus_lateralis',
  'vastus_medialis',
  'gastrocnemius',
  'soleus',
  'tibialis_anterior',
  'biceps_femoris',
  'deltoid',
  'biceps_brachii',
  'triceps_brachii',
  'latissimus_dorsi',
  'pectoralis_major',
  'serratus_anterior',
  'trapezius',
  'rhomboid_major',
  'rhomboid_minor',
  'supraspinatus',
  'infraspinatus',
  'teres_minor',
  'subscapularis',
  'brachialis',
  'brachioradialis',
  'anconeus',
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
assert(actionTypeMatch(glutMax, 'extends the thigh', 'confirm'), 'glute max accepts extends the thigh on Enter')
assert(actionTypeMatch(glutMax, 'chief extensor of the flexed thigh', 'confirm'), 'glute max accepts the chief-extensor phrase on Enter')
assert(!actionTypeMatch(glutMax, 'abducts the hip'), 'glute max is not the abductor answer')

const rectus = typeStep(ACTION_QUIZ, 'type-rectus') as ActionTypeStep
assert(
  actionTypeMatch(rectus, 'extends the leg at the knee and flexes the thigh at the hip'),
  'rectus accepts the viewInfo sentence',
)
assert(actionTypeMatch(rectus, 'knee extension and hip flexion'), 'rectus accepts the student phrase')
assert(!actionTypeMatch(rectus, 'extends the leg at the knee'), 'knee extension alone is not the two-joint answer')
assert(!actionTypeMatch(rectus, 'knee extension'), 'knee extension alone does not pass')
assert(!actionTypeMatch(rectus, 'hip flexion'), 'hip flexion alone does not pass')

const gastroc = typeStep(ACTION_QUIZ, 'type-gastroc') as ActionTypeStep
assert(
  actionTypeMatch(gastroc, 'plantarflexes the foot', 'confirm'),
  'gastroc accepts plantarflexes the foot on Enter',
)
assert(!actionTypeMatch(gastroc, 'plantarflexes the foot'), 'plantarflexes the foot waits, because a longer alias continues')
assert(actionTypeMatch(gastroc, 'plantarflexion'), 'gastroc accepts plantarflexion')
assert(actionTypeMatch(gastroc, 'point the toes'), 'gastroc accepts point the toes')
assert(!actionTypeMatch(gastroc, 'dorsiflexion'), 'gastroc is not dorsiflexion')

const tibAnt = typeStep(ACTION_QUIZ, 'type-tib-ant') as ActionTypeStep
assert(
  actionTypeMatch(tibAnt, 'dorsiflexes the foot', 'confirm'),
  'tibialis anterior accepts dorsiflexes the foot on Enter',
)
assert(!actionTypeMatch(tibAnt, 'dorsiflexes the foot'), 'dorsiflexes the foot waits, because a longer alias continues')
assert(actionTypeMatch(tibAnt, 'dorsiflexion'), 'tibialis anterior accepts dorsiflexion')
assert(actionTypeMatch(tibAnt, 'lifts the front of the foot'), 'tibialis anterior accepts the HPHS phrase')
assert(!actionTypeMatch(tibAnt, 'plantarflexion'), 'tibialis anterior is not plantarflexion')

const bicepsFem = typeStep(ACTION_QUIZ, 'type-biceps-fem') as ActionTypeStep
assert(
  actionTypeMatch(bicepsFem, 'flexes the leg at the knee', 'confirm'),
  'biceps femoris accepts knee flexion on Enter',
)
assert(!actionTypeMatch(bicepsFem, 'flexes the leg at the knee'), 'knee flexion phrase waits, because a longer alias continues')
assert(actionTypeMatch(bicepsFem, 'knee flexion'), 'biceps femoris accepts knee flexion wording')
assert(actionTypeMatch(bicepsFem, 'flexes the knee and extends the thigh'), 'biceps femoris accepts both actions')
assert(!actionTypeMatch(bicepsFem, 'extends the thigh'), 'thigh extension alone is not the knee answer')

const biceps = typeStep(ACTION_QUIZ, 'type-biceps') as ActionTypeStep
assert(actionTypeMatch(biceps, 'flexes the elbow', 'confirm'), 'biceps accepts elbow flexion on Enter')
assert(!actionTypeMatch(biceps, 'flexes the elbow'), 'flexes the elbow waits, because a longer alias continues')
assert(actionTypeMatch(biceps, 'elbow flexion'), 'biceps accepts elbow flexion wording')
assert(actionTypeMatch(biceps, 'chief supinator of the forearm'), 'biceps accepts chief supinator')
assert(!actionTypeMatch(biceps, 'extends the elbow'), 'biceps is not the elbow extensor')

const triceps = typeStep(ACTION_QUIZ, 'type-triceps') as ActionTypeStep
assert(actionTypeMatch(triceps, 'extends the elbow'), 'triceps accepts extends the elbow')
assert(actionTypeMatch(triceps, 'chief extensor of the elbow'), 'triceps accepts chief extensor')
assert(!actionTypeMatch(triceps, 'flexes the elbow'), 'triceps is not elbow flexion')

const lats = typeStep(ACTION_QUIZ, 'type-lats') as ActionTypeStep
assert(actionTypeMatch(lats, 'internally rotates, adducts, and extends the shoulder'), 'lats accepts the three shoulder actions')
assert(actionTypeMatch(lats, 'shoulder adduction'), 'lats accepts shoulder adduction')
assert(actionTypeMatch(lats, 'climbing, rowing, and swimming'), 'lats accepts the notes functional context')
assert(!actionTypeMatch(lats, 'initiates shoulder abduction'), 'lats is not the initiator of abduction')

const pec = typeStep(ACTION_QUIZ, 'type-pec-major') as ActionTypeStep
assert(actionTypeMatch(pec, 'adducts, horizontally adducts, and medially rotates the shoulder'), 'pec major accepts the three actions')
assert(actionTypeMatch(pec, 'horizontal adduction'), 'pec major accepts horizontal adduction')
assert(actionTypeMatch(pec, 'primary pushing muscle'), 'pec major accepts primary pushing muscle')
assert(!actionTypeMatch(pec, 'scapular protraction'), 'pec major is not serratus protraction')

const serratus = typeStep(ACTION_QUIZ, 'type-serratus') as ActionTypeStep
assert(actionTypeMatch(serratus, 'protracts and upwardly rotates the scapula'), 'serratus accepts protraction and upward rotation')
assert(actionTypeMatch(serratus, 'holds the scapula against the thoracic wall'), 'serratus accepts holds the scapula against the thoracic wall')
assert(actionTypeMatch(serratus, 'prevents scapular winging'), 'serratus accepts prevents scapular winging')
assert(!actionTypeMatch(serratus, 'internally rotates the shoulder'), 'serratus is not a humeral rotator')

const supra = typeStep(ACTION_QUIZ, 'type-supra') as ActionTypeStep
assert(
  actionTypeMatch(supra, 'initiates shoulder abduction', 'confirm'),
  'supraspinatus accepts initiates shoulder abduction on Enter',
)
assert(!actionTypeMatch(supra, 'initiates shoulder abduction'), 'initiates shoulder abduction waits, because a longer alias continues')
assert(actionTypeMatch(supra, 'initiates abduction', 'confirm'), 'supraspinatus accepts initiates abduction on Enter')
assert(!actionTypeMatch(supra, 'externally rotates the shoulder'), 'supraspinatus is not the external rotator answer')

const brachialis = typeStep(ACTION_QUIZ, 'type-brachialis') as ActionTypeStep
assert(actionTypeMatch(brachialis, 'flexes the elbow'), 'brachialis accepts flexes the elbow')
assert(actionTypeMatch(brachialis, 'powerful elbow flexor'), 'brachialis accepts powerful elbow flexor')
assert(!actionTypeMatch(brachialis, 'chief flexor of the elbow'), 'brachialis does not use the unsourced chief-flexor phrase')
assert(!actionTypeMatch(brachialis, 'extends the elbow'), 'brachialis is not elbow extension')

assert(actionTypeMatch(glutMed, 'abduction'), 'glute med accepts abduction while typing')
assert(!actionTypeMatch(glutMed, 'adduction'), 'adduction does not match abduction')
assert(!actionTypeMatch(glutMed, 'abduct'), 'a clipped verb is not the abduction answer')
assert(actionTypeMatch(glutMax, 'extension'), 'glute max accepts extension')
assert(!actionTypeMatch(glutMax, 'abduction'), 'glute max does not accept abduction')
assert(!actionTypeMatch(glutMax, 'flexion'), 'glute max does not accept flexion')
const ilioShort = typeStep(ACTION_QUIZ, 'type-iliopsoas') as ActionTypeStep
assert(actionTypeMatch(ilioShort, 'flexion'), 'iliopsoas accepts flexion')
assert(!actionTypeMatch(ilioShort, 'extension'), 'iliopsoas does not accept extension')
assert(actionTypeMatch(rectus, 'extends knee and flexes hip'), 'rectus accepts the short two-joint phrase')
assert(actionTypeMatch(rectus, 'knee extension, hip flexion'), 'rectus accepts the comma two-joint phrase')
assert(!actionTypeMatch(rectus, 'extension'), 'rectus does not accept extension alone')
assert(!actionTypeMatch(rectus, 'flexion'), 'rectus does not accept flexion alone')
assert(!actionTypeMatch(rectus, 'hip extension and knee flexion'), 'the hamstring pairing is not rectus')
assert(actionTypeMatch(bicepsFem, 'flexion'), 'biceps femoris accepts flexion at the knee')
assert(!actionTypeMatch(bicepsFem, 'extension'), 'biceps femoris does not accept extension alone')
assert(actionTypeMatch(biceps, 'flexion'), 'biceps accepts flexion')
assert(actionTypeMatch(biceps, 'supination'), 'biceps accepts supination')
assert(!actionTypeMatch(biceps, 'extension'), 'biceps does not accept extension')
assert(actionTypeMatch(triceps, 'extension'), 'triceps accepts extension')
assert(!actionTypeMatch(triceps, 'flexion'), 'triceps does not accept flexion')
assert(!actionTypeMatch(triceps, 'adduction'), 'triceps does not accept adduction')
const latsShort = typeStep(ACTION_QUIZ, 'type-lats') as ActionTypeStep
assert(!actionTypeMatch(latsShort, 'internal rotation'), 'live internal rotation does not finish lats')
assert(actionTypeMatch(latsShort, 'internal rotation', 'confirm'), 'Enter still accepts internal rotation')
assert(actionTypeMatch(latsShort, latsShort.official), 'lats official auto-succeeds when finished')
assert(actionTypeMatch(latsShort, 'adduction'), 'lats accepts adduction')
assert(actionTypeMatch(latsShort, 'extension'), 'lats accepts extension')
assert(!actionTypeMatch(latsShort, 'abduction'), 'lats does not accept abduction')
const pecShort = typeStep(ACTION_QUIZ, 'type-pec-major') as ActionTypeStep
assert(!actionTypeMatch(pecShort, 'adduction'), 'live adduction does not finish pec major')
assert(actionTypeMatch(pecShort, 'adduction', 'confirm'), 'Enter still accepts adduction for pec major')
assert(actionTypeMatch(pecShort, 'horizontal adduction'), 'pec major accepts horizontal adduction')
assert(!actionTypeMatch(pecShort, 'abduction'), 'pec major does not accept abduction')
const serratusShort = typeStep(ACTION_QUIZ, 'type-serratus') as ActionTypeStep
assert(!actionTypeMatch(serratusShort, 'protraction'), 'live protraction does not finish serratus')
assert(actionTypeMatch(serratusShort, 'protraction', 'confirm'), 'Enter still accepts protraction')
assert(actionTypeMatch(serratusShort, 'protraction and upward rotation'), 'serratus official auto-succeeds when finished')
assert(actionTypeMatch(serratusShort, 'upward rotation'), 'serratus accepts upward rotation')
assert(!actionTypeMatch(serratusShort, 'adduction'), 'serratus does not accept adduction')
const supraShort = typeStep(ACTION_QUIZ, 'type-supra') as ActionTypeStep
assert(actionTypeMatch(supraShort, 'abduction'), 'supraspinatus accepts abduction')
assert(!actionTypeMatch(supraShort, 'adduction'), 'supraspinatus does not accept adduction')
assert(actionTypeMatch(brachialis, 'flexion'), 'brachialis accepts flexion')
assert(!actionTypeMatch(brachialis, 'adduction'), 'brachialis does not accept adduction')

const SHORT_OFFICIAL: Record<string, string> = {
  'type-glut-med': 'abduction',
  'type-glut-max': 'extension',
  'type-iliopsoas': 'flexion',
  'type-rectus': 'knee extension and hip flexion',
  'type-gastroc': 'plantarflexion',
  'type-tib-ant': 'dorsiflexion',
  'type-biceps-fem': 'flexion',
  'type-biceps': 'flexion',
  'type-triceps': 'extension',
  'type-lats': 'internal rotation, adduction, and extension',
  'type-pec-major': 'adduction, horizontal adduction, and medial rotation',
  'type-serratus': 'protraction and upward rotation',
  'type-supra': 'initiates abduction',
  'type-brachialis': 'flexion',
}
const LEGACY_OFFICIAL: Record<string, string> = {
  'type-glut-med': 'abducts the hip',
  'type-glut-max': 'extends the thigh',
  'type-iliopsoas': 'flexes the thigh at the hip',
  'type-rectus': 'extends the leg at the knee and flexes the thigh at the hip',
  'type-gastroc': 'plantarflexes the foot',
  'type-tib-ant': 'dorsiflexes the foot',
  'type-biceps-fem': 'flexes the leg at the knee',
  'type-biceps': 'flexes the elbow',
  'type-triceps': 'extends the elbow',
  'type-lats': 'internally rotates, adducts, and extends the shoulder',
  'type-pec-major': 'adducts, horizontally adducts, and medially rotates the shoulder',
  'type-serratus': 'protracts and upwardly rotates the scapula',
  'type-supra': 'initiates shoulder abduction',
  'type-brachialis': 'flexes the elbow',
}
const LOCKED_REVEAL: Record<string, string> = {
  'type-glut-med': 'Gluteus medius abducts the hip.',
  'type-glut-max': 'Gluteus maximus extends the thigh. It is the chief extensor of the flexed thigh.',
  'type-iliopsoas': 'Iliacus and psoas major form iliopsoas, the chief flexor of the hip. Together they flex the thigh at the hip.',
  'type-rectus': 'Rectus femoris extends the leg at the knee and flexes the thigh at the hip.',
  'type-gastroc': 'Gastrocnemius plantarflexes the foot and powers push-off in walking, running, and jumping.',
  'type-tib-ant': 'Tibialis anterior dorsiflexes the foot. It lifts the front of the foot.',
  'type-biceps-fem': 'Biceps femoris flexes the leg at the knee. The long head also extends the thigh.',
  'type-biceps': 'Biceps brachii flexes the elbow and is the chief supinator of the forearm.',
  'type-triceps': 'Triceps brachii is the chief extensor of the elbow.',
  'type-lats': 'Latissimus dorsi internally rotates, adducts, and extends the shoulder. The notes place it in climbing, rowing, and swimming.',
  'type-pec-major': 'Pectoralis major adducts, horizontally adducts, and medially rotates the shoulder. It is the primary pushing muscle.',
  'type-serratus': 'Serratus anterior protracts and upwardly rotates the scapula, and holds it against the thoracic wall. That prevents scapular winging.',
  'type-supra': 'Supraspinatus initiates shoulder abduction in the first 15–30 degrees. It is the most commonly injured rotator cuff muscle.',
  'type-brachialis': 'Brachialis is a powerful elbow flexor. It sits deep to biceps brachii and inserts on the ulna, flexing the elbow.',
}
for (const step of ACTION_QUIZ) {
  if (step.kind !== 'type') continue
  const official = SHORT_OFFICIAL[step.id]
  const legacy = LEGACY_OFFICIAL[step.id]
  assert(official != null && step.official === official, `${step.id} blanks use the short name`)
  assert(legacy != null && step.aliases.includes(legacy), `${step.id} keeps the notes phrase as an alias`)
  assert(step.aliases.includes(step.official), `${step.id} official is accepted`)
  assert(actionTypeMatch(step, step.official), `${step.id} accepts its short official`)
  assert(actionTypeMatch(step, legacy ?? '', 'confirm'), `${step.id} still accepts the notes phrase on Enter`)
  assert(step.official.length < (legacy ?? '').length, `${step.id} official is shorter than the notes phrase`)
  assert(step.reveal === LOCKED_REVEAL[step.id], `${step.id} reveal stays notes-locked`)
}
assert(glutMed.reveal === 'Gluteus medius abducts the hip.', 'glute med reveal stays notes-locked')
assert(glutMed.hint === 'Gluteus medius. HPHS: abducts the hip.', 'glute med hint stays notes-locked')
assert(tapStep(ACTION_QUIZ, 'tap-glut-min').prompt.includes('abducts the hip'), 'tap prompt stays on the notes wording')
assert(!actionTypeMatch(glutMed, 'initiates abduction'), 'glute med does not take the supraspinatus phrase')
assert(!actionTypeMatch(supraShort, 'abducts the hip'), 'supraspinatus does not take the glute med phrase')
assert(!actionTypeMatch(ilioShort, 'knee extension and hip flexion'), 'iliopsoas does not take the two-joint rectus phrase')
assert(!actionTypeMatch(bicepsFem, 'knee extension and hip flexion'), 'biceps femoris does not take the rectus phrase')

const vastusMed = tapStep(ACTION_QUIZ, 'tap-vastus-med') as ActionTapStep
assert(gradeActionTap(vastusMed, 'vastus_medialis').ok, 'tapping vastus medialis is correct')
assert(!gradeActionTap(vastusMed, 'vastus_lateralis').ok, 'vastus lateralis is the wrong side of the thigh')
assert(!gradeActionTap(vastusMed, 'rectus_femoris').ok, 'rectus femoris is not the inner vastus')
assert(gradeActionTap(vastusMed, 'vastus_medialis').message.toLowerCase().includes('extends the leg at the knee'), 'vastus medialis feedback names knee extension')

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
assert(actionCopy.includes('moves with the limb'), 'learn says the muscle moves with the limb')
assert(!actionCopy.includes('stays in its resting shape'), 'learn does not claim the muscle stays at rest')
assert(!/lisfranc|pcl|whiplash|high ankle|shoulder dislocation/i.test(actionCopy), 'sport learn does not add other injuries')
assert(ACTION_LEARN.find((card) => card.id === 'thigh')?.focus.cue === 'kick', 'knee and hip plays the kick')
assert(ACTION_QUIZ.find((step) => step.id === 'type-rectus')?.focus.cue === 'kick', 'rectus quiz plays the kick')
assert(ACTION_QUIZ.find((step) => step.id === 'tap-vastus-lat')?.focus.cue === 'knee-extend', 'vastus quiz shows knee extension')
assert(ACTION_QUIZ.find((step) => step.id === 'type-triceps')?.focus.cue === 'elbow-extend', 'triceps quiz shows elbow extension')
assert(ACTION_LEARN.find((card) => card.id === 'girdle')?.motion === false, 'shoulder girdle card is highlight-only')
assert(ACTION_LEARN.find((card) => card.id === 'girdle')?.focus.cue === 'none', 'shoulder girdle has no invented scapular or rotation cue')
assert(ACTION_LEARN.find((card) => card.id === 'cuff')?.motion === true, 'rotator cuff card plays motion')
assert(ACTION_LEARN.find((card) => card.id === 'cuff')?.focus.cue === 'arm-abduct', 'rotator cuff uses the existing arm-abduct cue')
assert(ACTION_LEARN.find((card) => card.id === 'elbow-assist')?.focus.cue === 'elbow-flex', 'elbow assistants play elbow flexion')
assert(ACTION_QUIZ.find((step) => step.id === 'type-lats')?.focus.cue === 'none', 'lats quiz stays highlight-only')
assert(ACTION_QUIZ.find((step) => step.id === 'type-pec-major')?.focus.cue === 'none', 'pec major quiz stays highlight-only')
assert(ACTION_QUIZ.find((step) => step.id === 'type-serratus')?.focus.cue === 'none', 'serratus quiz stays highlight-only')
assert(ACTION_QUIZ.find((step) => step.id === 'type-supra')?.focus.cue === 'arm-abduct', 'supraspinatus quiz uses arm-abduct')
assert(ACTION_QUIZ.find((step) => step.id === 'type-brachialis')?.focus.cue === 'elbow-flex', 'brachialis quiz uses elbow-flex')
assert(ACTION_QUIZ.find((step) => step.id === 'tap-vastus-med')?.focus.cue === 'knee-extend', 'vastus medialis quiz uses knee-extend')
assert(actionCopy.includes('internally rotates, adducts, and extends the shoulder'), 'learn keeps the lats actions')
assert(actionCopy.includes('primary pushing muscle'), 'learn keeps the pec major pushing line')
assert(actionCopy.includes('holds it against the thoracic wall'), 'learn keeps the serratus wall line')
assert(actionCopy.includes('initiates shoulder abduction in the first 15–30 degrees'), 'learn keeps the supraspinatus initiation line')
assert(actionCopy.includes('most commonly injured rotator cuff muscle'), 'learn names supraspinatus as the most commonly injured cuff muscle')
assert(actionCopy.includes('powerful elbow flexor'), 'learn keeps the brachialis joints-lecture wording')
assert(actionCopy.includes('helps flex the forearm'), 'learn keeps the brachioradialis joints-lecture wording')
assert(actionCopy.includes('assists elbow extension'), 'learn keeps the anconeus joints-lecture wording')
assert(!/pronat|chief flexor of the elbow/i.test(actionCopy), 'elbow-assist learn does not add unsourced brachialis claims')
for (const card of ACTION_LEARN) {
  if (card.motion) assert(card.focus.cue !== 'none', `${card.id} motion has a cue`)
}

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
assert(hamCopy.includes('move with the limb'), 'hamstring learn moves the muscles with the limb')
assert(!hamCopy.includes('stay in their resting shape'), 'hamstring learn does not claim the meshes stay at rest')
assert(HAMSTRING_LEARN.find((card) => card.id === 'mechanism')?.focus.cue === 'late-swing', 'mechanism lesson still swings the thigh')
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
assert(nordic.official === 'nordic hamstring curls', 'nordic blanks use the normal name')
assert(nordic.aliases.includes('nordic curls'), 'nordic keeps the short form as an alias')
assert(nordic.reveal === 'Phase 2 uses progressive eccentric exercises, such as Nordic hamstring curls.', 'nordic reveal stays notes-locked')
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
assert(limbPoseAt('hip-flex', 1).primary < -0.6, 'hip flexion is large enough to read')
assert(Math.abs(limbPoseAt('elbow-flex', 1).primary) > 1, 'elbow flexion is a clear bend')
assert(limbPoseAt('arm-abduct', 1).primary < -0.5, 'arm abduction lifts the arm clear of the side')
const late = limbPoseAt('late-swing', 1)
assert(late.primary === LATE_SWING_HIP && late.primary < 0, 'late swing flexes the hip')
assert(late.knee === LATE_SWING_KNEE && late.knee > 0 && late.knee < 0.45, 'late swing keeps a little knee flexion')
assert(limbPoseAt('none', 1).primary === 0, 'no cue stays still')
const kick0 = limbPoseAt('kick', 0)
const kick1 = limbPoseAt('kick', 1)
assert(kick0.primary === 0 && kick0.knee === KICK_KNEE && kick0.knee > 0.6, 'kick starts with the knee bent')
assert(kick1.primary === KICK_HIP && kick1.primary < -0.6 && kick1.knee === 0, 'kick ends with the hip flexed and the knee extended')
const kneeExt0 = limbPoseAt('knee-extend', 0)
const kneeExt1 = limbPoseAt('knee-extend', 1)
assert(kneeExt0.primary > 0.6 && kneeExt1.primary === 0, 'knee extension starts bent and finishes straight')
const elbowExt0 = limbPoseAt('elbow-extend', 0)
const elbowExt1 = limbPoseAt('elbow-extend', 1)
assert(elbowExt0.primary < -0.6 && elbowExt1.primary === 0, 'elbow extension starts bent and finishes straight')
const kickPivots = pivotsFor('kick')
assert(kickPivots[0]?.bones.includes('femur_r') && !kickPivots[0]?.bones.includes('tibia_r'), 'kick hip pivot is the femur')
assert(kickPivots[1]?.bones.includes('tibia_r') && !kickPivots[1]?.bones.includes('femur_r'), 'kick knee pivot is the shin')
assert(pivotsFor('knee-extend').every((spec) => !spec.bones.includes('femur_r')), 'knee extension leaves the thigh bone still')
assert(
  pivotsFor('elbow-extend').some((spec) => spec.bones.includes('radius_r') && !spec.bones.includes('humerus_r')),
  'elbow extension moves the forearm',
)

const femurBox: SeatBox = { pivot: 0, minX: -0.4, maxX: -0.15, minY: 0.2, maxY: 1, minZ: -0.08, maxZ: 0.08 }
const pelvisBox: SeatBox = { pivot: -1, minX: -0.25, maxX: 0.25, minY: 1.08, maxY: 1.5, minZ: -0.2, maxZ: 0.2 }
const onFemur = seatInfluence([femurBox, pelvisBox], -0.25, 0.6, 0)
assert(onFemur.pivotA === 0 && onFemur.t === 0, 'a mid-thigh point follows the femur pivot')
const onPelvis = seatInfluence([femurBox, pelvisBox], 0, 1.25, 0)
assert(onPelvis.pivotA === -1 && onPelvis.t === 0, 'a pelvic point stays in rest space')
const atHip = seatInfluence([femurBox, pelvisBox], -0.2, 1.04, 0)
assert(atHip.t > 0.2 && atHip.t < 0.51, 'the hip joint blends the two bones')

for (const cue of ['plantarflex', 'dorsiflex', 'knee-flex', 'knee-extend', 'elbow-flex', 'elbow-extend', 'hip-abduct', 'hip-extend', 'hip-flex', 'arm-abduct', 'kick', 'late-swing'] as const) {
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

const ilio = typeStep(ACTION_QUIZ, 'type-iliopsoas') as ActionTypeStep
assert(actionTypeMatch(ilio, 'flexes the thigh at the hip'), 'iliopsoas accepts flexes the thigh at the hip')
assert(actionTypeMatch(ilio, 'chief flexor of the hip'), 'iliopsoas accepts chief flexor of the hip')
assert(actionTypeMatch(ilio, 'hip flexion'), 'iliopsoas accepts hip flexion')
assert(!actionTypeMatch(ilio, 'extends the thigh'), 'iliopsoas is not hip extension')
const ilioTap = tapStep(ACTION_QUIZ, 'tap-iliopsoas') as ActionTapStep
assert(gradeActionTap(ilioTap, 'iliacus').ok, 'tapping iliacus counts as iliopsoas')
assert(gradeActionTap(ilioTap, 'psoas_major').ok, 'tapping psoas major counts as iliopsoas')
assert(!gradeActionTap(ilioTap, 'rectus_femoris').ok, 'rectus femoris is not the chief hip flexor here')
assert(ACTION_LEARN.some((card) => card.id === 'iliopsoas' && card.focus.cue === 'hip-flex'), 'iliopsoas learn plays hip flexion')
assert(actionCopy.includes('chief flexor of the hip'), 'learn names iliopsoas as the chief flexor of the hip')
assert(actionCopy.includes('not either muscle alone'), 'learn keeps iliacus and psoas major as separate muscles')

assert(HAMSTRING_LEARN.some((card) => card.id === 'totaps'), 'hamstring learn has a TOTAPS stages card')
assert(hamCopy.toLowerCase().includes('talk, observe, touch, active movement, passive movement, and skill test'), 'TOTAPS stages are named')
assert(hamCopy.toLowerCase().includes('stop testing'), 'TOTAPS learn teaches the stop rule')
const totapsStop = typeStep(HAMSTRING_QUIZ, 'type-totaps-stop') as HamTypeStep
assert(hamstringTypeMatch(totapsStop, 'stop testing'), 'TOTAPS stop rule accepts stop testing')
assert(hamstringTypeMatch(totapsStop, 'do not immediately return to play'), 'TOTAPS stop rule accepts do not return to play')
assert(!hamstringTypeMatch(totapsStop, 'return to play'), 'returning to play is not the stop rule')
const totapsStages = typeStep(HAMSTRING_QUIZ, 'type-totaps-stages') as HamTypeStep
assert(
  totapsStages.official === 'Talk, Observe, Touch, Active movement, Passive movement, Skill test',
  'TOTAPS blanks use the normal stage names',
)
assert(totapsStages.official !== 'TOTAPS', 'TOTAPS blanks are not the bare acronym')
assert(
  totapsStages.official.includes('Active movement') &&
    totapsStages.official.includes('Passive movement') &&
    totapsStages.official.includes('Skill test'),
  'TOTAPS blanks name Active movement, Passive movement, and Skill test',
)
assert(hamstringTypeMatch(totapsStages, 'Talk, Observe, Touch, Active movement, Passive movement, Skill test'), 'TOTAPS stages accept the normal stage names')
assert(
  hamstringTypeMatch(totapsStages, 'Talk, Observe, Touch, Active, Passive, Skill', 'confirm'),
  'TOTAPS stages still accept the six-word short list on Enter',
)
assert(
  !hamstringTypeMatch(totapsStages, 'Talk, Observe, Touch, Active, Passive, Skill'),
  'the six-word list waits while it is a prefix of skill test',
)
assert(hamstringTypeMatch(totapsStages, 'Talk, Observe, Touch, Active movement, Passive movement, and Skill test'), 'TOTAPS stages still accept the previous official')
assert(hamstringTypeMatch(totapsStages, 'talk observe touch active passive skill test'), 'TOTAPS stages accept a compact six-name form')
assert(!hamstringTypeMatch(totapsStages, 'totaps'), 'the mnemonic alone is not the six stages')
assert(!hamstringTypeMatch(totapsStages, 'talk'), 'a single stage is not the six-name answer')
assert(
  totapsStages.reveal === 'TOTAPS is Talk, Observe, Touch, Active movement, Passive movement, and Skill test. If any stage reveals a problem, stop testing.',
  'TOTAPS reveal stays on the full stage names',
)
const HAM_UNCHANGED: Record<string, string> = {
  'type-semitend': 'semitendinosus',
  'type-mechanism': 'eccentric tensile overload',
  'type-grade': 'grade II',
  'type-palpate': 'away from the pain',
  'type-totaps-stop': 'stop testing',
}
for (const step of HAMSTRING_QUIZ) {
  if (step.kind !== 'type') continue
  const unchanged = HAM_UNCHANGED[step.id]
  if (unchanged) {
    assert(step.official === unchanged, `${step.id} official stays short`)
    continue
  }
  assert(step.aliases.includes(step.official), `${step.id} official is accepted`)
}

const mainSrc = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
const cssSrc = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const sceneSrc = readFileSync(new URL('../src/scene/ThoraxScene.ts', import.meta.url), 'utf8')

assert(mainSrc.includes('id="btn-muscle-actions-learn"') && mainSrc.includes('id="btn-muscle-actions-quiz"'), 'Sport has separate Learn and Quiz entry points')
assert(mainSrc.includes('id="btn-ankle-case-learn"') && mainSrc.includes('id="btn-ankle-case-quiz"'), 'ankle has separate Learn and Quiz entry points')
assert(mainSrc.includes('id="btn-hamstring-case-learn"') && mainSrc.includes('id="btn-hamstring-case-quiz"'), 'hamstring has separate Learn and Quiz entry points')
assert(!mainSrc.includes('Start quiz'), 'the last learn card does not say Start quiz')
assert(mainSrc.includes('function jumpFromLearnToQuiz'), 'an optional jump from Learn to Quiz exists')
const advance = mainSrc.slice(mainSrc.indexOf('function advanceCaseLearn'), mainSrc.indexOf('function jumpFromLearnToQuiz'))
assert(!advance.includes('startStudyQuiz') && !advance.includes('startAnkleQuiz'), 'finishing Learn does not auto-start the quiz')
assert(mainSrc.includes("openCase('actions', 'quiz')"), 'Sport Quiz opens the quiz directly')
assert(mainSrc.includes("openCase('ankle', 'quiz')"), 'ankle Quiz opens the quiz directly')
assert(mainSrc.includes('data-region="ankle-foot"') && mainSrc.includes('Ankle &amp; foot'), 'ankle stays in the Ankle & foot group')
assert(mainSrc.includes('data-region="thigh"') && mainSrc.includes('>Thigh<'), 'hamstring stays in the Thigh group')
const ankleAt = mainSrc.indexOf('data-region="ankle-foot"')
const thighAt = mainSrc.indexOf('data-region="thigh"')
assert(ankleAt > 0 && thighAt > ankleAt, 'Ankle & foot is listed before Thigh')
assert(mainSrc.indexOf('id="btn-ankle-case"') > ankleAt && mainSrc.indexOf('id="btn-ankle-case"') < thighAt, 'the ankle case row sits in its region')
assert(mainSrc.indexOf('id="btn-hamstring-case"') > thighAt, 'the hamstring case row sits in its region')
const sportBlock = mainSrc.slice(mainSrc.indexOf('id="sport-section"'), mainSrc.indexOf('id="rehab-section"'))
assert(!sportBlock.includes('region-label'), 'Sport has no group label for its one module')
assert(sportBlock.includes('Muscle actions'), 'muscle actions stays the Sport module')
const menuHeadings = [...mainSrc.slice(mainSrc.indexOf('id="menu-overlay"'), mainSrc.indexOf('id="view-panel"')).matchAll(/<h2>([^<]+)<\/h2>/g)].map((match) => match[1])
assert(
  menuHeadings.join('|') === 'Explore|Sport|Rehab|Subject|Mode|Quick filters|Per session',
  `start menu keeps its sections, got ${menuHeadings.join('|')}`,
)
const sportSkip = cssSrc.slice(cssSrc.indexOf('html.touch-quiz.sport-quiz:not(.phone-landscape) .skip-btn'))
assert(sportSkip.slice(0, 360).includes('min-height: var(--target-compact)'), 'phone Sport Skip uses the 32px compact target')
assert(sportSkip.slice(0, 360).includes('padding: 2px 8px'), 'phone Sport Skip padding is tighter')
assert(sportSkip.slice(0, 360).includes('font-size: var(--type-quiet)'), 'phone Sport Skip type is quieter')
assert(cssSrc.includes('min-height: var(--target-min)'), 'the base Skip target stays 44px')
assert(
  cssSrc.includes('html.touch-quiz:not(.phone-landscape) .chrome--top:not(.is-view) .pill'),
  'phone portrait quiz menu pill can shrink',
)
assert(
  cssSrc.includes('html.touch-quiz:not(.phone-landscape) #quiz-look .view-filter-btn'),
  'phone portrait quiz look chips can shrink',
)
assert(
  skipButtonLabel({ touch: true, width: 390, height: 844, sportTypeIt: true }) === 'Skip',
  'phone portrait Sport type-it Skip is Skip',
)
assert(
  skipButtonLabel({ touch: true, width: 390, height: 844, sportTypeIt: false }) === 'Skip · show answer',
  'other phone quizzes keep Skip · show answer',
)
assert(
  skipButtonLabel({ touch: true, width: 844, height: 390, sportTypeIt: true }) === 'Skip · show answer',
  'phone landscape Sport keeps Skip · show answer',
)
assert(
  skipButtonLabel({ touch: false, width: 1440, height: 900, sportTypeIt: true }) === 'Skip · show answer',
  'desktop Sport keeps Skip · show answer',
)
assert(mainSrc.includes('skipButtonLabel('), 'the quiz bar uses the Skip label rule')

let revision: RevisionState = { done: [], resume: null }
revision = noteRevision(revision, 'ankle-learn', 1, 6, 'learn')
assert(activityFace(revision, 'ankle-learn').label === 'Continue', 'an unfinished ankle Learn offers Continue')
assert(!activityFace(revision, 'ankle-learn').done, 'a mid-lesson Learn is not finished')
revision = noteRevision(revision, 'hamstring-quiz', 2, 8, 'quiz')
assert(activityFace(revision, 'hamstring-quiz').label === 'Continue', 'Continue follows the latest unfinished activity')
assert(activityFace(revision, 'ankle-learn').label === 'Learn', 'an earlier unfinished activity keeps Learn')
revision = noteRevision(revision, 'ankle-learn', 5, 6, 'learn')
assert(activityFace(revision, 'ankle-learn').done, 'reaching the last Learn card marks it finished')
assert(activityFace(revision, 'ankle-learn').label === 'Learn', 'a finished Learn stays Learn')
assert(revision.resume?.id === 'hamstring-quiz', 'finishing one activity leaves the other Continue in place')
revision = noteRevision(revision, 'ankle-learn', 0, 6, 'learn')
assert(activityFace(revision, 'ankle-learn').done, 'replaying a finished Learn does not clear the mark')
assert(activityFace(revision, 'ankle-learn').label !== 'Continue', 'a finished replay is not a new Continue')
revision = noteRevision(revision, 'hamstring-quiz', 8, 8, 'quiz')
assert(activityFace(revision, 'hamstring-quiz').done, 'finishing the quiz marks it done')
assert(revision.resume === null, 'a finished quiz clears Continue')
assert(cssSrc.includes('html.case-learn .chrome-center'), 'quiz accuracy is hidden during Learn')
assert(cssSrc.includes('--lesson-column'), 'desktop learn uses a side lesson column')
assert(cssSrc.includes('html.case-learn .case-panel') && cssSrc.includes('left: auto'), 'the desktop lesson column sits beside the stage')
assert(cssSrc.includes('--target-desktop'), 'laptop chips use a slightly smaller desktop target')
assert(cssSrc.includes('min-height: var(--target-min)'), 'phone tap targets still use --target-min')

function enablePanIn(src: string, fn: string, expected: 'true' | 'false'): boolean {
  const start = src.indexOf(`${fn}(`)
  if (start < 0) return false
  const nextFn = src.slice(start + fn.length + 1).search(/\n  (async )?[A-Za-z]+\(/)
  const body = nextFn >= 0 ? src.slice(start, start + fn.length + 1 + nextFn) : src.slice(start, start + 900)
  const matches = [...body.matchAll(/enablePan = (true|false)/g)].map((m) => m[1])
  return matches[0] === expected || matches.at(-1) === expected
}
assert(enablePanIn(sceneSrc, 'enterView', 'true'), 'View still enables pan')
assert(enablePanIn(sceneSrc, 'enterStudyCase', 'true'), 'study Learn/Quiz enables pan')
assert(enablePanIn(sceneSrc, 'enterAnkleCase', 'true'), 'ankle Learn/Quiz enables pan')
assert(enablePanIn(sceneSrc, 'exitView', 'false'), 'leaving View disables pan')
assert(enablePanIn(sceneSrc, 'exitStudyCase', 'false'), 'leaving a study module disables pan')
assert(enablePanIn(sceneSrc, 'exitAnkleCase', 'false'), 'leaving the ankle case disables pan')
assert(sceneSrc.includes('screenSpacePanning = true'), 'panning is screen-space')
assert(mainSrc.includes('scene.replayStudyCue()'), 'Replay still restarts the motion clip')

assert(quizContextLabel({ viewing: false, subject: 'sport', activity: 'type' }) === 'Sport · type it', 'sport type label')
assert(quizContextLabel({ viewing: false, subject: 'sport', activity: 'tap' }) === 'Sport · tap it', 'sport tap label')
assert(quizContextLabel({ viewing: false, subject: 'sport', activity: 'learn' }) === 'Sport · learn', 'sport learn label')
assert(quizContextLabel({ viewing: false, subject: 'rehab', activity: 'learn' }) === 'Rehab · learn', 'hamstring stays under Rehab')

console.log(`${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
