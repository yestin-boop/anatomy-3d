/**
 * Lateral ankle sprain case: locked answers, tap grading, and the motion curve.
 * Run: npm test
 */
import { ANKLE_INJURY_U, ANKLE_PLANTARFLEXION_RAD, anklePoseAt } from '../src/scene/anklePose.ts'
import {
  ANKLE_LEARN,
  ANKLE_QUIZ,
  RIGHT_FOOT_BONES,
  ankleTypeMatch,
  classifyAnkleMesh,
  gradeAnkleTap,
  type AnkleTapStep,
  type AnkleTypeStep,
} from '../src/data/ankleSprain.ts'

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

function typeStep(id: string): AnkleTypeStep {
  const step = ANKLE_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'type') throw new Error(`missing type step ${id}`)
  return step
}

function tapStep(id: string): AnkleTapStep {
  const step = ANKLE_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'tap') throw new Error(`missing tap step ${id}`)
  return step
}

const atfl = typeStep('type-atfl')
assert(ankleTypeMatch(atfl, 'ATFL'), 'ATFL abbreviation live-matches')
assert(ankleTypeMatch(atfl, 'anterior talofibular ligament'), 'full ATFL name live-matches')
assert(ankleTypeMatch(atfl, 'anterior talofibular', 'confirm'), 'shorter ATFL name confirms on Enter')
assert(!ankleTypeMatch(atfl, 'anterior talofibular'), 'shorter ATFL name waits while it is a prefix')
assert(!ankleTypeMatch(atfl, 'deltoid'), 'deltoid is not the ATFL answer')
assert(!ankleTypeMatch(atfl, 'cfl'), 'CFL is not the ATFL answer')
assert(!ankleTypeMatch(atfl, 'ptfl'), 'PTFL is not required')
assert(!ankleTypeMatch(atfl, 'posterior talofibular ligament'), 'posterior talofibular is not the answer')

const cfl = typeStep('type-cfl')
assert(ankleTypeMatch(cfl, 'cfl'), 'CFL abbreviation live-matches')
assert(ankleTypeMatch(cfl, 'calcaneofibular ligament'), 'full CFL name live-matches')
assert(!ankleTypeMatch(cfl, 'atfl'), 'ATFL is not the CFL answer')
assert(!ankleTypeMatch(cfl, 'deltoid ligament', 'confirm'), 'deltoid is not accepted for the lateral ligament')

const tapAtfl = tapStep('tap-atfl')
assert(gradeAnkleTap(tapAtfl, 'atfl').ok, 'tapping ATFL is correct')
assert(!gradeAnkleTap(tapAtfl, 'cfl').ok, 'tapping CFL is the wrong ligament for the ATFL question')
assert(!gradeAnkleTap(tapAtfl, 'deltoid').ok, 'deltoid is wrong for the lateral sprain')
assert(!gradeAnkleTap(tapAtfl, 'fibula').ok, 'fibula bone is not the ligament')
assert(gradeAnkleTap(tapAtfl, 'deltoid').message.toLowerCase().includes('medial'), 'deltoid feedback says medial')

const tapCfl = tapStep('tap-cfl')
assert(gradeAnkleTap(tapCfl, 'cfl').ok, 'tapping CFL is correct')
assert(!gradeAnkleTap(tapCfl, 'atfl').ok, 'ATFL is not the CFL tap')
assert(!gradeAnkleTap(tapCfl, 'deltoid').ok, 'deltoid is not the CFL')

const palp = tapStep('palpate')
assert(gradeAnkleTap(palp, 'atfl').ok, 'tender site is the ATFL region')
assert(!gradeAnkleTap(palp, 'fibula').ok, 'distal fibula is the non-tender bone')
assert(!gradeAnkleTap(palp, 'deltoid').ok, 'deltoid is the non-tender medial ligament')
assert(gradeAnkleTap(palp, 'fibula').message.toLowerCase().includes('non-tender'), 'fibula feedback says non-tender')
assert(gradeAnkleTap(palp, 'deltoid').message.toLowerCase().includes('non-tender'), 'deltoid feedback says non-tender')

assert(classifyAnkleMesh('atfl_r') === 'atfl', 'right ATFL mesh classifies as ATFL')
assert(classifyAnkleMesh('cfl_r') === 'cfl', 'right CFL mesh classifies as CFL')
assert(classifyAnkleMesh('deltoid_r') === 'deltoid', 'right deltoid mesh classifies as deltoid')
assert(classifyAnkleMesh('fibula_r') === 'fibula', 'right fibula is the bone distractor')
assert(classifyAnkleMesh('atfl_l') === 'other-ankle', 'left ATFL is the other ankle')
assert(classifyAnkleMesh('tibia_r') === 'other', 'tibia is not scored as the distal fibula')

assert(RIGHT_FOOT_BONES.includes('talus_r'), 'the moving set includes the talus')
assert(RIGHT_FOOT_BONES.includes('calcaneus_r'), 'the moving set includes the calcaneus')
assert(!RIGHT_FOOT_BONES.includes('tibia_r'), 'the tibia stays in the mortise')
assert(!RIGHT_FOOT_BONES.includes('fibula_r'), 'the fibula stays in the mortise')

const joined = ANKLE_LEARN.map((card) => card.paragraphs.join(' ')).join(' ')
assert(joined.includes('POLICE'), 'learn text names POLICE')
assert(joined.includes('Grade II'), 'learn text names the Grade II impression')
assert(joined.toLowerCase().includes('inversion'), 'learn text names inversion')
assert(joined.toLowerCase().includes('plantarflexion'), 'learn text names plantarflexion')
assert(!/ottawa|harm\b|surgery is required/i.test(joined), 'learn text does not add a treatment claim past the notes')

const start = anklePoseAt(0)
const end = anklePoseAt(1)
const injury = anklePoseAt(ANKLE_INJURY_U)
assert(start.plantarRad === 0 && start.inversionRad === 0, 'motion starts neutral')
assert(start.ligamentsVisible, 'ligaments show at the neutral start')
assert(end.plantarRad === 0 && end.inversionRad === 0, 'motion ends neutral')
assert(Math.abs(injury.plantarRad - ANKLE_PLANTARFLEXION_RAD) < 1e-9, 'injury pose uses the notes 40° plantarflexion')
assert(injury.inversionRad > 0.2, 'injury pose also inverts')
assert(!injury.ligamentsVisible, 'unrigged ligaments hide while the foot is off neutral')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} ankle-sprain tests failed`)
}
console.log(`${passed} passed`)
