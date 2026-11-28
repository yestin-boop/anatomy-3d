/**
 * Achilles tendinopathy. Menu row, notes-locked copy, aliases, rejected contrasts, taps.
 * Run: npm test
 */
import { readFileSync } from 'node:fs'
import {
  ACHILLES_CALF_FRACTION,
  ACHILLES_CALF_MESHES,
  ACHILLES_FRAME_MESHES,
  ACHILLES_LEARN,
  ACHILLES_QUIZ,
  ACHILLES_RIGHT_CALF,
  ACHILLES_TENDON_MESHES,
  achillesHotMeshes,
  achillesTypeMatch,
  achillesTypeReject,
  classifyAchillesMesh,
  gradeAchillesTap,
  type AchillesTapStep,
  type AchillesTypeStep,
} from '../src/data/achillesTendinopathy.ts'
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

function typeStep(id: string): AchillesTypeStep {
  const step = ACHILLES_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'type') throw new Error(`missing type step ${id}`)
  return step
}

function tapStep(id: string): AchillesTapStep {
  const step = ACHILLES_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'tap') throw new Error(`missing tap step ${id}`)
  return step
}

const mainSrc = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
const ankleAt = mainSrc.indexOf('data-region="ankle-foot"')
const thighAt = mainSrc.indexOf('data-region="thigh"')
const highRow = mainSrc.indexOf('id="btn-high-ankle-case"')
const achillesRow = mainSrc.indexOf('id="btn-achilles-case"')
assert(ankleAt > 0 && thighAt > ankleAt, 'Ankle & foot is still listed before Thigh')
assert(highRow > ankleAt && highRow < thighAt, 'the high-ankle row stays in Ankle & foot')
assert(achillesRow > highRow && achillesRow < thighAt, 'the Achilles row sits after the high-ankle row, still in Ankle & foot')
assert(mainSrc.includes('>Achilles tendinopathy<'), 'menu title is Achilles tendinopathy')
assert(mainSrc.includes('leisure basketball · running and jumping'), 'menu subtitle names leisure basketball and running and jumping')
assert(mainSrc.includes('id="btn-achilles-case-learn"') && mainSrc.includes('id="btn-achilles-case-quiz"'), 'Achilles has Learn and Quiz')
assert(mainSrc.includes("openCase('achilles', 'learn')") && mainSrc.includes("openCase('achilles', 'quiz')"), 'Learn and Quiz open the new case kind')
assert(mainSrc.includes('data-revision="achilles-learn"') && mainSrc.includes('data-revision="achilles-quiz"'), 'revision marks use the new ids')
assert(mainSrc.includes("state.caseKind = 'achilles'"), 'Achilles is its own case kind')
assert(mainSrc.includes('enterAchillesCase') && mainSrc.includes('showAchilles'), 'the case has an enter path and a QA hook')
assert(!mainSrc.includes('btn-lisfranc') && !mainSrc.includes('btn-pcl'), 'this change does not start Lisfranc or a PCL row')

const ankleSrc = readFileSync(new URL('../src/data/ankleSprain.ts', import.meta.url), 'utf8')
const highSrc = readFileSync(new URL('../src/data/highAnkleSprain.ts', import.meta.url), 'utf8')
assert(!ankleSrc.includes('achillesTendinopathy') && !highSrc.includes('achillesTendinopathy'), 'the existing ankle cases stay untouched')

assert(ACHILLES_LEARN.length === 8, `learn has eight cards, got ${ACHILLES_LEARN.length}`)
assert(ACHILLES_LEARN.every((card) => card.motion === false), 'every card stays static')
assert(ACHILLES_LEARN[0]?.id === 'scenario' && ACHILLES_LEARN[0].title === 'Tendinopathy, or a tear', 'the case opens on the injury')
assert(ACHILLES_LEARN[0]?.kicker === 'Rehab · Achilles', 'the opening kicker is Rehab · Achilles')
assert(!ACHILLES_LEARN.some((card) => card.id === 'totaps'), 'no general TOTAPS card was added')
const learnIds = ACHILLES_LEARN.map((card) => card.id).join(',')
assert(
  learnIds === 'scenario,anatomy,overuse,rupture,palpation,thompson,pathway-early,pathway-late',
  `learn order follows the brief, got ${learnIds}`,
)

const joined = ACHILLES_LEARN.map((card) => `${card.title} ${card.paragraphs.join(' ')}`).join(' ')
assert(joined.includes('tendinitis, tendon rupture, and tendinosis'), 'the opening figure names the three injured states')
assert(joined.includes('sudden overload and short-term overuse'), 'tendinitis keeps the lecture labels')
assert(joined.includes('chronic degeneration, no inflammation, and long-term repetitive strain'), 'tendinosis keeps the lecture notes')
assert(joined.includes('Tiny tears.'), 'the tendinosis inset stays labelled Tiny tears')
assert(joined.includes('calcaneus via Achilles'), 'anatomy keeps the muscle-table insertion')
assert(joined.includes('Region 1, distal, 2 cm') && joined.includes('Region 2, mid-substance, 4 cm') && joined.includes('12 ± 3 cm'), 'the region map stays in the text')
assert(joined.includes('does not include labelled region bands or a torn gap'), 'the model does not claim painted regions or a torn gap')
assert(joined.includes('cumulative microtrauma resulting from repetitive stress'), 'overuse uses the lecture sentence')
assert(joined.includes('sudden, complete or partial tear of the tendon caused by a forceful, traumatic event'), 'rupture uses the lecture definition')
assert(joined.includes('popping or snapping sensation'), 'rupture keeps the lecture symptoms')
assert(joined.includes('hip extension, knee extension, and foot dorsiflexion'), 'the rupture figure is described, not animated')
assert(joined.includes('not a protocol for a complete tear'), 'the rehab timeline is not applied to a complete tear')
assert(joined.includes("Thompson's test") || joined.includes('Thompson’s test'), 'Thompson’s test is named')
assert(joined.includes('a calf squeeze does not move the foot'), 'the ruptured Thompson finding uses the lecture figure')
assert(joined.includes('a calf squeeze moves the foot'), 'the not-fully-ruptured finding stays on the card')
assert(joined.includes('squeeze the calf — no plantarflexion means rupture'), 'the summary alias stays in the lesson')
assert(joined.includes('Thompson’s test is for rupture'), 'the test is kept for rupture')
assert(joined.includes('Silbernagel et al., JAT 2020'), 'the rehab figure keeps its printed credit')
assert(joined.includes('quick-rebouncing heel rises'), 'the lecture spelling quick-rebouncing stays')
assert(joined.includes('about week 1 to 2') && joined.includes('about week 2 to 5') && joined.includes('about week 3 to 12') && joined.includes('about month 3 to 6'), 'the overlapping ranges stay as written')
assert(joined.includes('not a date you are cleared'), 'return criteria stay teaching criteria')
assert(!joined.toLowerCase().includes('fibre'), 'the lesson does not mention fibres')
assert(!/sarah|sideline|simmonds|matles|royal london|prone|supine|lisfranc|\bpcl\b/i.test(joined), 'the lesson does not invent a story, a position, or another case')
assert(!joined.toLowerCase().includes('most often'), 'the lesson does not name a most-often region')
assert(!joined.toLowerCase().includes('these meshes are not rigged'), 'a static card does not add a motion caveat')

assert(ACHILLES_QUIZ.length === 9, `quiz is Q1–Q9, got ${ACHILLES_QUIZ.length}`)
assert(ACHILLES_QUIZ.filter((step) => step.kind === 'tap').length === 1, 'one tap question')
assert(ACHILLES_QUIZ.every((step) => (step.kind === 'type' ? step.official.length <= 52 : true)), 'official blanks stay mid-length')
assert(
  ACHILLES_QUIZ.every((step) => step.kind !== 'type' || !/^(PF|RTS|3x10|3×10)$/i.test(step.official)),
  'official blanks are not abbreviations',
)
assert(
  ACHILLES_QUIZ.every((step) => step.kind !== 'type' || !step.official.includes('heel rises')),
  'official blanks are not an exercise list',
)

const OFFICIAL: Record<string, string> = {
  'type-injury': 'Achilles tendinopathy',
  'type-tendon': 'Achilles tendon',
  'type-overuse': 'cumulative microtrauma from running and jumping',
  'type-rupture': 'sudden complete or partial tear',
  'type-thompson': 'calf squeeze does not move the foot',
  'type-tendinosis': 'chronic degeneration, no inflammation',
  'type-phase': 'symptom-management',
  'type-return': 'minimal symptoms, and not daily morning stiffness',
}
for (const step of ACHILLES_QUIZ) {
  if (step.kind !== 'type') continue
  assert(step.official === OFFICIAL[step.id], `${step.id} blanks use the normal name, got ${step.official}`)
  assert(step.aliases.includes(step.official), `${step.id} official is accepted`)
  assert(achillesTypeMatch(step, step.official), `${step.id} live-matches its official`)
}

const injury = typeStep('type-injury')
assert(achillesTypeMatch(injury, 'Achilles tendinosis'), 'Achilles tendinosis live-matches')
assert(achillesTypeMatch(injury, 'calcaneal tendinopathy'), 'calcaneal tendinopathy live-matches')
assert(achillesTypeMatch(injury, 'Achilles tendon tendinopathy'), 'Achilles tendon tendinopathy live-matches')
assert(!achillesTypeMatch(injury, 'tendinitis', 'confirm'), 'tendinitis is not accepted as the condition')
assert(!achillesTypeMatch(injury, 'rupture', 'confirm'), 'rupture is not accepted as the overuse condition')
assert(achillesTypeReject(injury, 'tendinitis')?.includes('sudden overload'), 'tendinitis reveals the lecture distinction')
assert(achillesTypeReject(injury, 'Achilles tendinitis')?.includes('tendinopathy pathway'), 'Achilles tendinitis reveals the pathway')
assert(achillesTypeReject(injury, 'rupture')?.includes('different problem'), 'typing rupture reveals the contrast')
assert(achillesTypeReject(injury, 'sudden complete or partial tear')?.includes('Achilles tendinopathy'), 'a complete-tear phrase reveals the contrast')
assert(achillesTypeReject(injury, 'Achilles tendinopathy') === null, 'the official name is not a reject')
assert(injury.hint === 'The lecture also labels this as tendinosis: chronic degeneration, not a sudden tear.', 'injury hint stays notes-locked')
assert(injury.reveal.includes('chronic degeneration, no inflammation') && injury.reveal.includes('different problem'), 'injury reveal stays notes-locked')

const tendon = typeStep('type-tendon')
assert(achillesTypeMatch(tendon, 'calcaneal tendon'), 'calcaneal tendon live-matches')
assert(achillesTypeMatch(tendon, 'tendo calcaneus'), 'tendo calcaneus live-matches')
assert(achillesTypeMatch(tendon, 'heel tendon'), 'heel tendon live-matches')
assert(achillesTypeMatch(tendon, 'tendo Achilles'), 'tendo Achilles live-matches')
assert(achillesTypeMatch(tendon, 'Achilles', 'confirm'), 'Achilles confirms')
assert(!achillesTypeMatch(tendon, 'Achilles'), 'Achilles alone waits, because it prefixes Achilles tendon')
assert(tendon.reveal === 'The Achilles tendon, or calcaneal tendon, attaches gastrocnemius and soleus to the calcaneus.', 'tendon reveal stays notes-locked')

const overuse = typeStep('type-overuse')
assert(
  achillesTypeMatch(
    overuse,
    'cumulative microtrauma resulting from repetitive stress on the tendon from activities like running and jumping without sufficient recovery time',
  ),
  'the lecture overuse sentence live-matches',
)
assert(achillesTypeMatch(overuse, 'cumulative microtrauma', 'confirm'), 'the short microtrauma phrase confirms')
assert(!achillesTypeMatch(overuse, 'cumulative microtrauma'), 'the short microtrauma phrase waits for Enter')
assert(!achillesTypeMatch(overuse, 'inversion and plantarflexion', 'confirm'), 'the lateral mechanism is not this overuse')
assert(achillesTypeReject(overuse, 'inversion and plantarflexion')?.includes('common lateral'), 'the lateral mechanism reveals the contrast')
assert(
  achillesTypeReject(overuse, 'dorsiflexion, eversion, and tibial internal rotation')?.includes('high-ankle'),
  'the high-ankle mechanism reveals the contrast',
)
assert(achillesTypeReject(overuse, 'DF + eversion + tibial IR')?.includes('high-ankle'), 'the short high-ankle mechanism reveals the contrast')

const rupture = typeStep('type-rupture')
assert(achillesTypeMatch(rupture, 'a sudden, complete or partial tear of the tendon'), 'the lecture rupture sentence live-matches')
assert(achillesTypeMatch(rupture, 'forceful traumatic event'), 'the traumatic-event alias live-matches')
assert(!achillesTypeMatch(rupture, 'cumulative microtrauma', 'confirm'), 'overuse wording is not a rupture')
assert(achillesTypeReject(rupture, 'cumulative microtrauma')?.includes('sudden, complete or partial tear'), 'overuse wording reveals the rupture contrast')
assert(achillesTypeReject(rupture, 'running and jumping without sufficient recovery')?.includes('overuse'), 'the recovery phrase reveals the contrast')

const thompson = typeStep('type-thompson')
assert(achillesTypeMatch(thompson, 'a calf squeeze does not move the foot'), 'the longer figure wording live-matches')
assert(achillesTypeMatch(thompson, 'squeeze calf, no plantarflexion'), 'the summary phrasing live-matches')
assert(achillesTypeMatch(thompson, 'no plantarflexion'), 'no plantarflexion live-matches')
assert(achillesTypeMatch(thompson, 'squeeze the calf — no PF'), 'the short PF alias live-matches')
assert(achillesTypeMatch(thompson, 'calf squeeze does not plantarflex the foot'), 'the plantarflexion wording live-matches')
assert(!achillesTypeMatch(thompson, 'calf squeeze moves the foot', 'confirm'), 'the healthy finding is not the ruptured finding')
assert(achillesTypeReject(thompson, 'calf squeeze moves the foot')?.includes('not fully ruptured'), 'the moving-foot finding reveals the caveat')
assert(thompson.reveal.includes('Thompson’s test is for rupture, not for tendinopathy'), 'Thompson reveal keeps the tendinopathy limit')
assert(thompson.span === 'calf', 'Thompson uses the calf frame')

const tendinosis = typeStep('type-tendinosis')
assert(achillesTypeMatch(tendinosis, 'long-term repetitive strain'), 'long-term repetitive strain live-matches')
assert(achillesTypeMatch(tendinosis, 'tiny tears'), 'tiny tears live-matches')
assert(achillesTypeMatch(tendinosis, 'no inflammation'), 'no inflammation live-matches')
assert(achillesTypeMatch(tendinosis, 'chronic degeneration', 'confirm'), 'chronic degeneration confirms')
assert(!achillesTypeMatch(tendinosis, 'chronic degeneration'), 'chronic degeneration waits, because the official continues')
assert(!achillesTypeMatch(tendinosis, 'sudden overload', 'confirm'), 'sudden overload is not the tendinosis note')
assert(!achillesTypeMatch(tendinosis, 'short-term overuse', 'confirm'), 'short-term overuse is not the tendinosis note')
assert(achillesTypeReject(tendinosis, 'sudden overload')?.includes('tendinitis'), 'sudden overload reveals the tendinitis contrast')
assert(achillesTypeReject(tendinosis, 'short term overuse')?.includes('chronic degeneration'), 'short-term overuse reveals the contrast')

const phase = typeStep('type-phase')
assert(achillesTypeMatch(phase, 'symptom management', 'confirm'), 'the unhyphenated phase name confirms')
assert(achillesTypeMatch(phase, 'symptom-management phase'), 'the longer phase name live-matches')
assert(!achillesTypeMatch(phase, '3x10', 'confirm') && !achillesTypeMatch(phase, '3×10', 'confirm'), 'the dose is not the phase name')
assert(phase.reveal.includes('3×10 once a day'), 'the phase reveal keeps the lecture dose')

const back = typeStep('type-return')
assert(achillesTypeMatch(back, 'minimal symptoms, some but not daily morning stiffness', 'confirm'), 'the lecture status confirms')
assert(
  !achillesTypeMatch(back, 'minimal symptoms, some but not daily morning stiffness'),
  'the lecture status waits, because the longer status continues',
)
assert(
  achillesTypeMatch(back, 'minimal symptoms, some but not daily morning stiffness, can participate in sports without difficulty'),
  'the full return status live-matches',
)
assert(achillesTypeMatch(back, 'can participate in sports without difficulty'), 'the participation line live-matches')
assert(achillesTypeMatch(back, 'some but not daily morning stiffness'), 'the stiffness caveat live-matches')
assert(!achillesTypeMatch(back, 'minimal symptoms', 'confirm'), 'minimal symptoms alone is not enough')
assert(!achillesTypeMatch(back, 'RTS', 'confirm'), 'RTS is not the return status')
assert(back.reveal.includes('not a date you are cleared'), 'the return reveal keeps the teaching limit')
assert(back.official.length > 28, 'the long return blank is marked long enough for the keyboard lift')

const tap = tapStep('tap-tendon')
assert(gradeAchillesTap(tap, 'tendon').ok, 'tapping the tendon is correct')
assert(gradeAchillesTap(tap, 'tendon').message.includes('calcaneal tendon'), 'the correct tap names the calcaneal tendon')
for (const hit of ['gastrocnemius', 'soleus', 'calcaneus', 'atfl', 'cfl', 'ptfl', 'deltoid', 'aitfl', 'pitfl', 'trans_tibfib', 'other-ankle', 'other'] as const) {
  const graded = gradeAchillesTap(tap, hit)
  assert(!graded.ok, `${hit} is not the tendon tap`)
  assert(graded.message.length > 12, `${hit} has wrong-tap copy`)
}
assert(gradeAchillesTap(tap, 'gastrocnemius').message.includes('calf muscle'), 'gastrocnemius tap copy says it is a calf muscle')
assert(gradeAchillesTap(tap, 'soleus').message.includes('Achilles tendon'), 'soleus tap copy points back to the tendon')
assert(gradeAchillesTap(tap, 'calcaneus').message.includes('heel bone'), 'calcaneus tap copy says heel bone')
assert(gradeAchillesTap(tap, 'atfl').message === 'That is a ligament, not the Achilles tendon.', 'a ligament tap uses the locked line')
assert(gradeAchillesTap(tap, 'aitfl').message === gradeAchillesTap(tap, 'atfl').message, 'a high-ankle band uses the same ligament line')
assert(gradeAchillesTap(tap, 'other-ankle').message === 'That is the other ankle. This case is the right ankle.', 'the other ankle is named as the right ankle')
assert(gradeAchillesTap(tap, 'other').message === 'Tap the Achilles tendon on the right ankle.', 'a miss asks for the right Achilles tendon')
assert(gradeAchillesTap(tap, null).message === gradeAchillesTap(tap, 'other').message, 'a miss uses the other-tap line')
assert(tap.prompt === 'Tap the Achilles tendon.', 'the tap prompt stays notes-locked')

assert(classifyAchillesMesh('calcaneal_r') === 'tendon', 'right calcaneal tendon classifies as the tendon')
assert(classifyAchillesMesh('gastroc_med_r') === 'gastrocnemius', 'medial gastrocnemius classifies')
assert(classifyAchillesMesh('gastroc_lat_r') === 'gastrocnemius', 'lateral gastrocnemius classifies')
assert(classifyAchillesMesh('soleus_r') === 'soleus', 'soleus classifies')
assert(classifyAchillesMesh('calcaneus_r') === 'calcaneus', 'calcaneus classifies')
assert(classifyAchillesMesh('atfl_r') === 'atfl', 'ATFL stays a contrast target')
assert(classifyAchillesMesh('aitfl_r') === 'aitfl', 'AITFL stays a contrast target')
assert(classifyAchillesMesh('calcaneal_l') === 'other-ankle', 'the left tendon is the other ankle')
assert(classifyAchillesMesh('soleus_l') === 'other-ankle', 'the left soleus is the other ankle')
assert(classifyAchillesMesh('talus_r') === 'other', 'the talus is not a scored tendon')

assert(ACHILLES_TENDON_MESHES.join(',') === 'calcaneal_r,calcaneal_l', 'the case uses the packed calcaneal tendon only')
assert(ACHILLES_RIGHT_CALF.join(',') === 'gastroc_lat_r,gastroc_med_r,soleus_r', 'the calf set is the existing right muscles')
assert(ACHILLES_FRAME_MESHES.includes('calcaneal_r') && ACHILLES_FRAME_MESHES.includes('calcaneus_r'), 'the frame includes the tendon and the heel')
assert(!ACHILLES_FRAME_MESHES.includes('tibia_r') && !ACHILLES_FRAME_MESHES.includes('gastroc_med_r'), 'the frame list does not take the whole shin or the whole calf')
assert(ACHILLES_CALF_FRACTION.heel < ACHILLES_CALF_FRACTION.calf && ACHILLES_CALF_FRACTION.calf <= 0.62, 'the calf frame stays on the distal calf')
assert(achillesHotMeshes('tendon').join(',') === 'calcaneal_r', 'the tendon light is the tendon only')
assert(
  achillesHotMeshes('anatomy').includes('calcaneal_r') &&
    achillesHotMeshes('anatomy').includes('gastroc_med_r') &&
    achillesHotMeshes('anatomy').includes('soleus_r'),
  'anatomy lights the tendon and the right calf',
)
assert(ACHILLES_CALF_MESHES.includes('gastroc_med_l') && ACHILLES_CALF_MESHES.includes('soleus_l'), 'left calf meshes stay available for a wrong-side tap')

const manifest = readFileSync(new URL('../public/models/extra/tendons/manifest.json', import.meta.url), 'utf8')
assert(manifest.includes('calcaneal_r.glb') && manifest.includes('calcaneal_l.glb'), 'the packed tendon files stay the ones already shipped')
assert(!manifest.includes('achilles_'), 'no replacement tendon was packed')

const sceneSrc = readFileSync(new URL('../src/scene/ThoraxScene.ts', import.meta.url), 'utf8')
assert(sceneSrc.includes('enterAchillesCase'), 'the scene can enter the Achilles stage')
assert(sceneSrc.includes("frameLockedBox(box, 'posterior')"), 'the heel is framed from behind')
assert(sceneSrc.includes('meanGapMm'), 'the scene reports the packed tendon seat')
assert(sceneSrc.includes('distalVertexBox'), 'the calf frame uses the distal part of the muscle')
assert(!sceneSrc.includes('calcaneal_replacement') && !/tendon.*scale\.set/.test(sceneSrc), 'the tendon is not replaced or scaled')

let revision: RevisionState = { done: [], resume: null }
const learnId = revisionId('achilles', 'learn')
const quizId = revisionId('achilles', 'quiz')
revision = noteRevision(revision, learnId, 2, ACHILLES_LEARN.length, 'learn')
assert(activityFace(revision, learnId).label === 'Continue', 'an unfinished Achilles Learn offers Continue')
revision = noteRevision(revision, learnId, ACHILLES_LEARN.length - 1, ACHILLES_LEARN.length, 'learn')
assert(activityFace(revision, learnId).done, 'the last Learn card marks the case finished')
revision = noteRevision(revision, quizId, ACHILLES_QUIZ.length, ACHILLES_QUIZ.length, 'quiz')
assert(activityFace(revision, quizId).done, 'finishing the quiz marks it done')

console.log(`${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
