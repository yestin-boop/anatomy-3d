/**
 * High ankle (syndesmotic) sprain. Menu row, aliases, rejected contrasts, taps.
 * Run: npm test
 */
import { readFileSync } from 'node:fs'
import {
  ANKLE_FRAME_MESHES,
  ANKLE_LEARN,
  ANKLE_LIGAMENT_MESHES,
  ANKLE_QUIZ,
} from '../src/data/ankleSprain.ts'
import {
  HIGH_ANKLE_FRAME_MESHES,
  HIGH_ANKLE_LEARN,
  HIGH_ANKLE_LIGAMENT_MESHES,
  HIGH_ANKLE_QUIZ,
  HIGH_ANKLE_RIGHT_LIGAMENTS,
  HIGH_ANKLE_SHAFT,
  classifyHighAnkleMesh,
  gradeHighAnkleTap,
  highAnkleHotMeshes,
  highAnkleTypeMatch,
  highAnkleTypeReject,
  type HighAnkleTapStep,
  type HighAnkleTypeStep,
} from '../src/data/highAnkleSprain.ts'
import { activityFace, noteRevision, revisionId, type RevisionState } from '../src/ui/revision.ts'

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

function typeStep(id: string): HighAnkleTypeStep {
  const step = HIGH_ANKLE_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'type') throw new Error(`missing type step ${id}`)
  return step
}

function tapStep(id: string): HighAnkleTapStep {
  const step = HIGH_ANKLE_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'tap') throw new Error(`missing tap step ${id}`)
  return step
}

const mainSrc = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
const ankleAt = mainSrc.indexOf('data-region="ankle-foot"')
const thighAt = mainSrc.indexOf('data-region="thigh"')
const highRow = mainSrc.indexOf('id="btn-high-ankle-case"')
assert(ankleAt > 0 && thighAt > ankleAt, 'Ankle & foot is still listed before Thigh')
assert(highRow > ankleAt && highRow < thighAt, 'the high-ankle row sits in Ankle & foot, beside the lateral sprain')
assert(mainSrc.indexOf('id="btn-ankle-case"') < highRow, 'the lateral sprain row stays first in the group')
assert(mainSrc.includes('>High ankle sprain<'), 'menu title is High ankle sprain')
assert(
  mainSrc.includes('soccer training · dorsiflexion, eversion, and tibial internal rotation'),
  'menu subtitle names soccer training and the mechanism',
)
assert(mainSrc.includes('id="btn-high-ankle-case-learn"') && mainSrc.includes('id="btn-high-ankle-case-quiz"'), 'high ankle has Learn and Quiz')
assert(mainSrc.includes("openCase('high-ankle', 'learn')") && mainSrc.includes("openCase('high-ankle', 'quiz')"), 'Learn and Quiz open the new case kind')
assert(mainSrc.includes('data-revision="high-ankle-learn"') && mainSrc.includes('data-revision="high-ankle-quiz"'), 'revision marks use the new ids')
assert(mainSrc.includes("state.caseKind = 'high-ankle'"), 'high ankle is its own case kind')

const ankleJoined = ANKLE_LEARN.map((card) => card.paragraphs.join(' ')).join(' ')
assert(!ankleJoined.includes('inferior tibiofibular joint'), 'the lateral case does not absorb the syndesmosis lesson')
assert(ANKLE_QUIZ.length === 7, `lateral quiz stays the original set, got ${ANKLE_QUIZ.length}`)
assert(!ANKLE_LIGAMENT_MESHES.includes('aitfl_r'), 'AITFL is not folded into the lateral ligament list')
assert(!ANKLE_FRAME_MESHES.includes('aitfl_r'), 'the lateral frame stays on the hindfoot')
assert(!ANKLE_FRAME_MESHES.includes('tibia_r'), 'the lateral frame still omits the full tibia')

assert(HIGH_ANKLE_LEARN.length === 9, `learn has eight cards plus the general TOTAPS card, got ${HIGH_ANKLE_LEARN.length}`)
assert(HIGH_ANKLE_LEARN.every((card) => card.motion === false), 'this slice keeps every card static')
assert(HIGH_ANKLE_LEARN[0]?.id === 'scenario' && HIGH_ANKLE_LEARN[0].title === 'A sprain above the usual site', 'the case opens on the injury')
assert(HIGH_ANKLE_LEARN[0]?.kicker === 'Rehab · high ankle', 'the opening kicker is Rehab · high ankle')
assert(HIGH_ANKLE_LEARN.some((card) => card.id === 'totaps' && card.title === 'Six stages, then stop'), 'a general TOTAPS card lets the case stand alone')
const learnIds = HIGH_ANKLE_LEARN.map((card) => card.id).join(',')
assert(
  learnIds === 'scenario,anatomy,mechanism,palpation,squeeze,external-rotation,pathway-early,pathway-late,totaps',
  `learn order follows the brief, got ${learnIds}`,
)

const joined = HIGH_ANKLE_LEARN.map((card) => card.paragraphs.join(' ')).join(' ')
assert(joined.includes('anteroinferior tibiofibular ligament (AITFL)'), 'the injury card names the AITFL')
assert(joined.includes('That is not the ATFL.'), 'the injury card keeps the ATFL distinct')
assert(joined.includes('interosseous ligament') && joined.includes('interosseous membrane'), 'anatomy names the interosseous ligament and membrane')
assert(joined.includes('does not include a mesh'), 'anatomy says those two structures are not on the model')
assert(joined.includes('dorsiflexion and eversion of the ankle with internal rotation of the tibia'), 'mechanism uses the lecture wording')
assert(joined.includes('not the inversion and plantarflexion mechanism'), 'mechanism contrasts the lateral sprain')
assert(!joined.toLowerCase().includes('these meshes are not rigged'), 'a static card does not add a motion caveat')
assert(!joined.toLowerCase().includes('fibre'), 'the lesson does not mention fibres shortening')
assert(joined.includes('Palpate the AITFL'), 'assessment names the AITFL')
assert(joined.includes('fracture, contusion, and compartment syndrome'), 'Squeeze test keeps the caveat')
assert(joined.includes('This case has no Ottawa findings of its own.'), 'Ottawa rules are not turned into findings')
assert(joined.includes('plantigrade foot'), 'External rotation test keeps the plantigrade foot')
assert(joined.includes('CAM boot') && !joined.includes('controlled ankle movement'), 'CAM boot stays unexpanded')
assert(joined.includes('CKC exercises') && !joined.includes('closed kinetic'), 'CKC stays unexpanded')
assert(joined.includes('Cleared to return to sport per physician.'), 'return to sport stays with the physician')
assert(joined.includes('Talk, Observe, Touch, Active movement, Passive movement, and Skill test'), 'TOTAPS card names the six stages')
assert(joined.includes('stop testing'), 'TOTAPS card keeps the stop rule')
assert(!/sarah|heard a pop|7\/10|grade ii|grade 2|days 0|weeks 1/i.test(joined), 'the lesson does not invent a patient, a grade, or a duration')
assert(!joined.includes('deepens the mortise') && !joined.toLowerCase().includes('strongest'), 'anatomy does not lift View blurbs')

assert(HIGH_ANKLE_QUIZ.length === 10, `quiz is Q1–Q10, got ${HIGH_ANKLE_QUIZ.length}`)
assert(!HIGH_ANKLE_QUIZ.some((step) => step.id.includes('not') || /mechanism this is not/i.test(step.prompt)), 'no extra contrast question')
assert(HIGH_ANKLE_QUIZ.filter((step) => step.kind === 'tap').length === 1, 'one tap question')
assert(HIGH_ANKLE_QUIZ.every((step) => step.span === 'mortise' || step.id === 'type-squeeze'), 'only the Squeeze question uses the taller frame')

const injury = typeStep('type-injury')
assert(highAnkleTypeMatch(injury, 'syndesmotic sprain'), 'syndesmotic sprain live-matches')
assert(highAnkleTypeMatch(injury, 'high ankle sprain', 'confirm'), 'high ankle sprain confirms')
assert(highAnkleTypeMatch(injury, 'high-ankle sprain', 'confirm'), 'hyphenated high-ankle sprain confirms')
assert(!highAnkleTypeMatch(injury, 'ATFL'), 'ATFL is not the name of this sprain')
assert(!highAnkleTypeMatch(injury, 'inversion sprain'), 'inversion sprain is not this injury')

const joint = typeStep('type-joint')
assert(highAnkleTypeMatch(joint, 'syndesmosis'), 'syndesmosis live-matches')
assert(highAnkleTypeMatch(joint, 'inferior tibiofibular joint', 'confirm'), 'the joint name confirms')
assert(highAnkleTypeMatch(joint, 'distal tibiofibular joint'), 'distal tibiofibular joint live-matches')
assert(!highAnkleTypeMatch(joint, 'talocrural joint', 'confirm'), 'the talocrural joint is not this joint')

const mechanism = typeStep('type-mechanism')
assert(highAnkleTypeMatch(mechanism, 'DF + eversion + tibial IR'), 'the short DF alias live-matches')
assert(
  highAnkleTypeMatch(mechanism, 'dorsiflexion and eversion of the ankle with internal rotation of the tibia'),
  'the lecture sentence live-matches',
)
assert(!highAnkleTypeMatch(mechanism, 'inversion and plantarflexion', 'confirm'), 'inversion and plantarflexion is not correct')
assert(
  highAnkleTypeReject(mechanism, 'inversion and plantarflexion')?.includes('common lateral'),
  'typing the lateral mechanism reveals the contrast',
)
assert(highAnkleTypeReject(mechanism, 'plantarflexion and inversion')?.includes('ATFL and CFL'), 'the reversed lateral mechanism is the same contrast')
assert(highAnkleTypeReject(mechanism, 'dorsiflexion') === null, 'a fragment of the real mechanism is not the contrast')

const palp = typeStep('type-palpate')
assert(highAnkleTypeMatch(palp, 'AITFL'), 'AITFL live-matches')
assert(highAnkleTypeMatch(palp, 'anterior inferior tibiofibular ligament'), 'the full AITFL name live-matches')
assert(highAnkleTypeMatch(palp, 'anteroinferior tibiofibular ligament'), 'the one-word anteroinferior form live-matches')
assert(!highAnkleTypeMatch(palp, 'ATFL', 'confirm'), 'ATFL is not accepted as the AITFL')
assert(!highAnkleTypeMatch(palp, 'anterior talofibular ligament', 'confirm'), 'the anterior talofibular ligament is not accepted')
assert(highAnkleTypeReject(palp, 'ATFL')?.includes('AITFL'), 'typing ATFL reveals the contrast')
assert(highAnkleTypeReject(palp, 'anterior talofibular ligament')?.includes('syndesmosis'), 'the full ATFL name reveals the contrast')
assert(highAnkleTypeReject(palp, 'AITFL') === null, 'the correct abbreviation is not a reject')

const tap = tapStep('tap-aitfl')
assert(gradeHighAnkleTap(tap, 'aitfl').ok, 'tapping the AITFL is correct')
assert(gradeHighAnkleTap(tap, 'aitfl').message.includes('distal tibia'), 'the correct tap names the joint')
for (const hit of ['atfl', 'cfl', 'ptfl', 'deltoid', 'pitfl', 'trans_tibfib', 'fibula', 'tibia', 'other-ankle', 'other'] as const) {
  const graded = gradeHighAnkleTap(tap, hit)
  assert(!graded.ok, `${hit} is not the AITFL tap`)
  assert(graded.message.length > 12, `${hit} has wrong-tap copy`)
}
assert(gradeHighAnkleTap(tap, 'atfl').message.includes('ATFL') && gradeHighAnkleTap(tap, 'atfl').message.includes('AITFL'), 'ATFL tap copy keeps the two ligaments apart')
assert(gradeHighAnkleTap(tap, 'cfl').message.toLowerCase().includes('lateral'), 'CFL tap copy says it is a lateral ligament')
assert(gradeHighAnkleTap(tap, 'ptfl').message.includes('not a syndesmosis band'), 'PTFL tap copy says it is not a syndesmosis band')
assert(gradeHighAnkleTap(tap, 'deltoid').message.toLowerCase().includes('medial'), 'deltoid tap copy says medial')
assert(gradeHighAnkleTap(tap, 'pitfl').message.includes('posterior inferior'), 'PITFL tap copy names that band')
assert(gradeHighAnkleTap(tap, 'trans_tibfib').message.toLowerCase().includes('transverse'), 'transverse tap copy names that band')
assert(gradeHighAnkleTap(tap, 'tibia').message.toLowerCase().includes('bone'), 'tibia tap copy says bone')
assert(gradeHighAnkleTap(tap, 'fibula').message.toLowerCase().includes('bone'), 'fibula tap copy says bone')
assert(gradeHighAnkleTap(tap, 'other-ankle').message.includes('right ankle'), 'the other ankle is named as the right ankle')
assert(gradeHighAnkleTap(tap, null).message === gradeHighAnkleTap(tap, 'other').message, 'a miss uses the other-tap line')

const squeeze = typeStep('type-squeeze')
assert(highAnkleTypeMatch(squeeze, 'squeeze test at mid-calf'), 'squeeze test at mid-calf live-matches')
assert(highAnkleTypeMatch(squeeze, 'mid-calf squeeze', 'confirm'), 'mid-calf squeeze confirms when a longer alias continues it')
assert(highAnkleTypeMatch(squeeze, 'squeeze tibia and fibula at mid-calf'), 'the short squeeze line live-matches')
assert(!highAnkleTypeMatch(squeeze, 'squeeze', 'confirm'), 'the word squeeze alone is not the test')

const positive = typeStep('type-squeeze-positive')
assert(highAnkleTypeMatch(positive, 'pain around the syndesmosis', 'confirm'), 'the short positive finding confirms')
assert(
  highAnkleTypeMatch(positive, 'pain around the syndesmosis after fracture, contusion, and compartment syndrome have been ruled out'),
  'the finding plus the full caveat live-matches',
)
assert(!highAnkleTypeMatch(positive, 'pain', 'confirm'), 'pain alone is not enough')
assert(!highAnkleTypeMatch(positive, 'fracture', 'confirm'), 'the caveat alone is not the positive finding')

const external = typeStep('type-external-rotation')
assert(highAnkleTypeMatch(external, 'pain with ER of the foot'), 'the short external-rotation alias live-matches')
assert(highAnkleTypeMatch(external, 'pain on ER with the tibia stabilised'), 'stabilised tibia alias live-matches')
assert(!highAnkleTypeMatch(external, 'pain', 'confirm'), 'pain alone is not the external rotation test')

const phase1 = typeStep('type-phase-1')
assert(highAnkleTypeMatch(phase1, 'avoid painful DF and eversion'), 'the short precaution live-matches')
assert(highAnkleTypeMatch(phase1, 'NWB with crutches, then CAM boot'), 'the weight-bearing precaution live-matches')
assert(!highAnkleTypeMatch(phase1, 'RICE', 'confirm'), 'RICE is the lateral pathway, not this precaution')

const phase4 = typeStep('type-phase-4')
assert(highAnkleTypeMatch(phase4, 'jog-to-run progression', 'confirm'), 'jog-to-run confirms')
assert(highAnkleTypeMatch(phase4, 'cutting and pivoting'), 'cutting and pivoting live-matches')
assert(highAnkleTypeMatch(phase4, 'sport-specific drills'), 'sport-specific drills live-matches')
assert(!highAnkleTypeMatch(phase4, 'plyometrics', 'confirm'), 'plyometrics is not this phase')

assert(classifyHighAnkleMesh('aitfl_r') === 'aitfl', 'right AITFL classifies as AITFL')
assert(classifyHighAnkleMesh('pitfl_r') === 'pitfl', 'right PITFL classifies as PITFL')
assert(classifyHighAnkleMesh('trans_tibfib_r') === 'trans_tibfib', 'right transverse ligament classifies')
assert(classifyHighAnkleMesh('atfl_r') === 'atfl', 'right ATFL stays a contrast target')
assert(classifyHighAnkleMesh('cfl_r') === 'cfl', 'right CFL stays a contrast target')
assert(classifyHighAnkleMesh('ptfl_r') === 'ptfl', 'right PTFL stays a contrast target')
assert(classifyHighAnkleMesh('deltoid_r') === 'deltoid', 'right deltoid stays a contrast target')
assert(classifyHighAnkleMesh('tibia_r') === 'tibia', 'right tibia is bone')
assert(classifyHighAnkleMesh('fibula_r') === 'fibula', 'right fibula is bone')
assert(classifyHighAnkleMesh('aitfl_l') === 'other-ankle', 'left AITFL is the other ankle')
assert(classifyHighAnkleMesh('talus_l') === 'other-ankle', 'a left bone is the other ankle')
assert(classifyHighAnkleMesh('calcaneus_r') === 'other', 'the calcaneus is not a scored ligament')

assert(HIGH_ANKLE_RIGHT_LIGAMENTS.includes('aitfl_r'), 'the shown set includes the right AITFL')
assert(HIGH_ANKLE_RIGHT_LIGAMENTS.includes('pitfl_r') && HIGH_ANKLE_RIGHT_LIGAMENTS.includes('trans_tibfib_r'), 'the shown set includes the other two syndesmosis bands')
assert(!HIGH_ANKLE_FRAME_MESHES.includes('tibia_r') && !HIGH_ANKLE_FRAME_MESHES.includes('fibula_r'), 'the frame list does not take the whole shin')
assert(HIGH_ANKLE_FRAME_MESHES.includes('talus_r') && HIGH_ANKLE_FRAME_MESHES.includes('aitfl_r'), 'the frame includes the mortise and the AITFL')
assert(HIGH_ANKLE_SHAFT.mortise < HIGH_ANKLE_SHAFT.calf && HIGH_ANKLE_SHAFT.calf <= 0.55, 'the calf frame stops around mid-shin')
assert(!HIGH_ANKLE_LIGAMENT_MESHES.some((name) => name.includes('interosseous')), 'no interosseous mesh is proposed')
assert(highAnkleHotMeshes('aitfl').join(',') === 'aitfl_r', 'the palpation light is the AITFL only')
assert(highAnkleHotMeshes('aitfl-pitfl').includes('pitfl_r') && !highAnkleHotMeshes('aitfl-pitfl').includes('trans_tibfib_r'), 'the mechanism lights AITFL and PITFL')
assert(highAnkleHotMeshes('syndesmosis').length === 3, 'anatomy lights the three packed syndesmosis bands')

const sceneSrc = readFileSync(new URL('../src/scene/ThoraxScene.ts', import.meta.url), 'utf8')
assert(sceneSrc.includes('enterHighAnkleCase'), 'the scene can enter the high-ankle stage')
assert(sceneSrc.includes('distalShaftBox'), 'the frame clips the distal shaft instead of the whole bone')
assert(sceneSrc.includes("frameLockedBox(box, 'lateral')"), 'the mortise is framed from the side, above the hindfoot')
assert(!sceneSrc.includes('eversionRad') && !sceneSrc.includes('tibialInternal'), 'no eversion pose and no fake tibial rotation were added')

let revision: RevisionState = { done: [], resume: null }
const learnId = revisionId('high-ankle', 'learn')
const quizId = revisionId('high-ankle', 'quiz')
revision = noteRevision(revision, learnId, 2, HIGH_ANKLE_LEARN.length, 'learn')
assert(activityFace(revision, learnId).label === 'Continue', 'an unfinished high-ankle Learn offers Continue')
revision = noteRevision(revision, learnId, HIGH_ANKLE_LEARN.length - 1, HIGH_ANKLE_LEARN.length, 'learn')
assert(activityFace(revision, learnId).done, 'the last Learn card marks the case finished')
revision = noteRevision(revision, quizId, HIGH_ANKLE_QUIZ.length, HIGH_ANKLE_QUIZ.length, 'quiz')
assert(activityFace(revision, quizId).done, 'finishing the quiz marks it done')

console.log(`${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
