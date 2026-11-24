/**
 * Lateral ankle sprain case: locked answers, tap grading, and the motion curve.
 * Run: npm test
 */
import { ANKLE_INJURY_U, ANKLE_PLANTARFLEXION_RAD, anklePoseAt } from '../src/scene/anklePose.ts'
import {
  ANKLE_FRAME_MESHES,
  ANKLE_LEARN,
  ANKLE_QUIZ,
  RIGHT_FOOT_BONES,
  ankleTypeMatch,
  classifyAnkleMesh,
  gradeAnkleTap,
  type AnkleTapStep,
  type AnkleTypeStep,
} from '../src/data/ankleSprain.ts'
import * as THREE from 'three'
import {
  ANKLE_BONE_COLOR,
  ANKLE_FRAME_FILL,
  LIGAMENT_DIM,
  LIGAMENT_INFLATE_WORLD,
  LIGAMENT_LOOK,
  ankleLigamentLabelsVisible,
  inflateGeometryAlongNormals,
  ligamentLabel,
  ligamentRole,
} from '../src/scene/ligamentLook.ts'

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


assert(LIGAMENT_LOOK.atfl.color !== LIGAMENT_LOOK.cfl.color, 'ATFL and CFL use distinct hues')
assert(LIGAMENT_LOOK.atfl.color !== LIGAMENT_LOOK.deltoid.color, 'ATFL and deltoid use distinct hues')
assert(LIGAMENT_LOOK.cfl.color !== LIGAMENT_LOOK.deltoid.color, 'CFL and deltoid use distinct hues')
assert(LIGAMENT_LOOK.atfl.color !== ANKLE_BONE_COLOR, 'ATFL is not cream bone')
assert(LIGAMENT_LOOK.cfl.color !== ANKLE_BONE_COLOR, 'CFL is not cream bone')
assert(LIGAMENT_LOOK.deltoid.color !== ANKLE_BONE_COLOR, 'deltoid is not cream bone')
assert(LIGAMENT_LOOK.atfl.color !== 0xffe6b0, 'ATFL is no longer the washed pale gold')
assert(LIGAMENT_LOOK.cfl.color !== 0xffe6b0, 'CFL is no longer the washed pale gold')
assert(LIGAMENT_DIM.color !== LIGAMENT_LOOK.atfl.color, 'dim ligaments are darker than the hot ATFL')
assert(LIGAMENT_INFLATE_WORLD === 0.008, 'inflate stays at the chosen 0.008 scene units')
assert(LIGAMENT_INFLATE_WORLD > 0.004 && LIGAMENT_INFLATE_WORLD < 0.016, 'inflate is a band, not a fleck or a sausage')
assert(ANKLE_FRAME_FILL > 0.66 && ANKLE_FRAME_FILL <= 0.88, 'ankle frame is tighter than the general quiz fill')
assert(ligamentRole('atfl_r') === 'atfl' && ligamentRole('cfl_r') === 'cfl', 'mesh names map to ligament roles')
assert(ligamentLabel('atfl_r') === 'ATFL' && ligamentLabel('cfl_r') === 'CFL', 'right lateral bands have short labels')
assert(ligamentLabel('deltoid_r') === null, 'deltoid stays unlabeled so the lateral tags stay clear')
assert(ankleLigamentLabelsVisible(true, true), 'labels show on the Learn ligaments step at rest')
assert(!ankleLigamentLabelsVisible(false, true), 'labels hide when unrigged ligaments hide off neutral')
assert(!ankleLigamentLabelsVisible(true, false), 'labels stay off outside the ligaments step')

const box = new THREE.BoxGeometry(1, 1, 0.1)
box.computeBoundingBox()
const before = box.boundingBox!.getSize(new THREE.Vector3())
const fat = inflateGeometryAlongNormals(box, 0.05)
fat.computeBoundingBox()
const after = fat.boundingBox!.getSize(new THREE.Vector3())
assert(Math.abs(after.z - (before.z + 0.1)) < 1e-6, 'inflate thickens a slab by twice the offset')
assert(Math.abs(after.x - (before.x + 0.1)) < 1e-6, 'inflate also moves the other faces out')
assert(box.boundingBox!.getSize(new THREE.Vector3()).z === before.z, 'inflate clones the geometry and leaves the source alone')

assert(!ANKLE_FRAME_MESHES.includes('metatarsal1_r'), 'forefoot metatarsals no longer pull the ankle frame out')
assert(!ANKLE_FRAME_MESHES.includes('metatarsal5_r'), 'fifth metatarsal is not in the tight ankle frame')
assert(ANKLE_FRAME_MESHES.includes('talus_r') && ANKLE_FRAME_MESHES.includes('calcaneus_r'), 'hindfoot bones still frame the ankle')
assert(ANKLE_FRAME_MESHES.includes('atfl_r') && ANKLE_FRAME_MESHES.includes('cfl_r'), 'lateral ligaments are in the frame')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} ankle-sprain tests failed`)
}
console.log(`${passed} passed`)
