/**
 * Lisfranc injury. Menu row, notes-locked copy, aliases, rejected contrasts, taps.
 * Run: npm test
 */
import { readFileSync } from 'node:fs'
import {
  LISFRANC_DORSAL_MESHES,
  LISFRANC_INTEROSSEOUS_MESHES,
  LISFRANC_LEARN,
  LISFRANC_PLANTAR_MESHES,
  LISFRANC_QUIZ,
  LISFRANC_SOURCE_LEAD,
  LISFRANC_SOURCE_LINKS,
  LISFRANC_SOURCE_TAIL,
  classifyLisfrancMesh,
  gradeLisfrancTap,
  lisfrancTypeMatch,
  lisfrancTypeReject,
  type LisfrancTapStep,
  type LisfrancTypeStep,
} from '../src/data/lisfrancInjury.ts'
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

function typeStep(id: string): LisfrancTypeStep {
  const step = LISFRANC_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'type') throw new Error(`missing type step ${id}`)
  return step
}

function tapStep(id: string): LisfrancTapStep {
  const step = LISFRANC_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'tap') throw new Error(`missing tap step ${id}`)
  return step
}

const mainSrc = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
const ankleAt = mainSrc.indexOf('data-region="ankle-foot"')
const thighAt = mainSrc.indexOf('data-region="thigh"')
const highRow = mainSrc.indexOf('id="btn-high-ankle-case"')
const lisfrancRow = mainSrc.indexOf('id="btn-lisfranc-case"')
const achillesRow = mainSrc.indexOf('id="btn-achilles-case"')
assert(ankleAt > 0 && thighAt > ankleAt, 'Ankle & foot is still listed before Thigh')
assert(highRow > ankleAt && lisfrancRow > highRow && achillesRow > lisfrancRow && achillesRow < thighAt, 'Lisfranc sits after high ankle and before Achilles')
assert(mainSrc.includes('>Lisfranc injury<'), 'menu title is Lisfranc injury')
assert(mainSrc.includes('rugby game · axial load on a plantarflexed foot'), 'menu subtitle names the rugby game and the mechanism')
assert(mainSrc.includes('id="btn-lisfranc-case-learn"') && mainSrc.includes('id="btn-lisfranc-case-quiz"'), 'Lisfranc has Learn and Quiz')
assert(mainSrc.includes("openCase('lisfranc', 'learn')") && mainSrc.includes("openCase('lisfranc', 'quiz')"), 'Learn and Quiz open the new case kind')
assert(mainSrc.includes('data-revision="lisfranc-learn"') && mainSrc.includes('data-revision="lisfranc-quiz"'), 'revision marks use the new ids')
assert(mainSrc.includes("state.caseKind = 'lisfranc'"), 'Lisfranc is its own case kind')
assert(mainSrc.includes('enterLisfrancCase') && mainSrc.includes('showLisfranc'), 'the case has an enter path and a QA hook')
assert(!mainSrc.includes('btn-pcl'), 'this change does not start a PCL row')
assert(mainSrc.includes("p.id = 'case-sources'"), 'Learn can show a sources line')

const ankleSrc = readFileSync(new URL('../src/data/ankleSprain.ts', import.meta.url), 'utf8')
const highSrc = readFileSync(new URL('../src/data/highAnkleSprain.ts', import.meta.url), 'utf8')
const achillesSrc = readFileSync(new URL('../src/data/achillesTendinopathy.ts', import.meta.url), 'utf8')
assert(!ankleSrc.includes('lisfrancInjury') && !highSrc.includes('lisfrancInjury') && !achillesSrc.includes('lisfrancInjury'), 'the existing ankle cases stay untouched')

assert(LISFRANC_LEARN.length === 9, `learn has eight cards plus TOTAPS, got ${LISFRANC_LEARN.length}`)
assert(LISFRANC_LEARN.every((card) => card.motion === false), 'every card stays static')
assert(LISFRANC_LEARN[0]?.id === 'scenario' && LISFRANC_LEARN[0].title === 'A midfoot injury, not only a fracture', 'the case opens on the injury')
assert(LISFRANC_LEARN[0]?.kicker === 'Rehab · Lisfranc', 'the opening kicker is Rehab · Lisfranc')
assert(LISFRANC_LEARN[1]?.span === 'plantar', 'the anatomy card uses the plantar camera')
assert(LISFRANC_LEARN.at(-1)?.id === 'totaps' && LISFRANC_LEARN.at(-1)?.title === 'Six stages, then stop', 'TOTAPS stays general and last')
const learnIds = LISFRANC_LEARN.map((card) => card.id).join(',')
assert(
  learnIds === 'scenario,anatomy,mechanism,palpation,piano-key,compression,imaging,pathway,totaps',
  `learn order follows the brief, got ${learnIds}`,
)

const joined = LISFRANC_LEARN.map((card) => `${card.title} ${card.paragraphs.join(' ')}`).join(' ')
assert(joined.includes('tarsometatarsal joint complex'), 'the injury names the joint complex')
assert(joined.includes('Lisfranc Fracture from Rugby Game'), 'the assignment title is acknowledged')
assert(joined.includes('not a simple sprain to walk off'), 'a subtle injury is not walked off')
assert(joined.includes('set of short bands in the intervals, not a single labelled ligament'), 'the interosseous pack is a set of bands')
assert(joined.includes('medial cuneiform to the base of the second metatarsal'), 'the singled-out ligament is named in text')
assert(joined.includes('no transverse ligament between the first and second metatarsals'), 'the missing transverse ligament stays')
assert(joined.includes('axial load on a plantarflexed foot'), 'the mechanism uses the notes')
assert(joined.includes('low energy (athletes, ligamentous) versus high energy (car accidents)'), 'the two energy patterns stay')
assert(joined.includes('not a rule that every athletic injury is ligament-only'), 'energy stays a pattern, not a rule')
assert(joined.includes('not the inversion and plantarflexion'), 'the lateral mechanism is contrasted')
assert(joined.includes('Piano key test') && joined.includes('Compression test'), 'both named tests are taught')
assert(joined.includes('do not all describe it the same way'), 'the Piano key disagreement stays')
assert(joined.includes('compression across the width of the foot'), 'the compression description stays')
assert(joined.includes('does not list a compression test by that name'), 'the AAOS twist test stays separate')
assert(joined.includes('non-weight-bearing until that review'), 'the first step stays non-weight-bearing')
assert(joined.includes('Sourced conservative timelines do not agree'), 'timelines are not tidied')
assert(joined.includes('The preferred operation is controversial'), 'no operation is picked')
assert(joined.includes('Talk, Observe, Touch, Active movement, Passive movement, and Skill test'), 'TOTAPS stages stay general')
assert(!joined.toLowerCase().includes('fibre'), 'the lesson does not mention fibres')
assert(!/sarah|hardcastle|myerson|nunley|ottawa|hallmark|c1–m2|c1-m2/i.test(joined), 'the lesson does not invent a story, a grade, or a mesh label')
assert(!joined.toLowerCase().includes('most common'), 'the lesson does not name a most-common mechanism')
assert(!/acute → sub-acute|symptom-management/i.test(joined), 'other pathways are not reused as this one')
assert(!joined.toLowerCase().includes('these meshes are not rigged'), 'a static card does not add a motion caveat')

const sources = `${LISFRANC_SOURCE_LEAD} ${LISFRANC_SOURCE_LINKS.map((link) => `${link.label} ${link.href}`).join(' ')} ${LISFRANC_SOURCE_TAIL}`
assert(sources.includes('The lecture has no Lisfranc section'), 'sources say the lecture is silent')
assert(sources.includes('Sports Medicine Australia 2007') && sources.includes('Brukner & Khan'), 'the course books are named')
assert(sources.includes('https://www.racgp.org.au/afp/2017/march/lisfranc-injuries'), 'RACGP is linked')
assert(sources.includes('https://orthoinfo.aaos.org/en/diseases--conditions/lisfranc-midfoot-injury/'), 'AAOS is linked')
assert(sources.includes('https://radiopaedia.org/articles/lisfranc-injury'), 'Radiopaedia injury is linked')
assert(sources.includes('https://radiopaedia.org/articles/lisfranc-ligament'), 'Radiopaedia ligament is linked')
assert(sources.includes('https://www.bofas.org.uk/hyperbook/trauma/lisfranc-injury'), 'BOFAS is linked')
assert(sources.includes('https://www.bmj.com/content/352/bmj.i882'), 'the BMJ paper is linked')
assert(sources.includes('https://pmc.ncbi.nlm.nih.gov/articles/PMC7944543/'), 'the rugby review is linked')
assert(!sources.toLowerCase().includes('chapter '), 'sources do not paste book text')
assert(mainSrc.includes('LISFRANC_SOURCE_LINKS'), 'the sources line is wired into Learn')

assert(LISFRANC_QUIZ.length === 10, `quiz is ten steps, got ${LISFRANC_QUIZ.length}`)
assert(LISFRANC_QUIZ.filter((step) => step.kind === 'tap').length === 1, 'one tap question')
assert(LISFRANC_QUIZ.every((step) => (step.kind === 'type' ? step.official.length <= 52 : true)), 'official blanks stay mid-length')
assert(
  LISFRANC_QUIZ.every((step) => step.kind !== 'type' || !/^(TMT|LF|NWB|DF|PF)$/i.test(step.official)),
  'official blanks are not abbreviations',
)

const OFFICIAL: Record<string, string> = {
  'type-injury': 'Lisfranc injury',
  'type-joint': 'tarsometatarsal joint complex',
  'type-mechanism': 'axial load on a plantarflexed foot',
  'type-energy': 'low-energy ligamentous versus high-energy',
  'type-palpate': 'midfoot palpation',
  'type-tests': 'Piano key test and Compression test',
  'type-piano': 'move the toes or metatarsals up and down',
  'type-compression': 'compression across the width of the foot',
  'type-nwb': 'non-weight-bearing until specialist review',
}
for (const step of LISFRANC_QUIZ) {
  if (step.kind !== 'type') continue
  assert(step.official === OFFICIAL[step.id], `${step.id} blanks use the normal name, got ${step.official}`)
  assert(step.aliases.includes(step.official), `${step.id} official is accepted`)
  assert(lisfrancTypeMatch(step, step.official), `${step.id} live-matches its official`)
  assert(step.official !== 'Lisfranc fracture', `${step.id} does not display fracture as the name`)
}

const injury = typeStep('type-injury')
assert(lisfrancTypeMatch(injury, 'Lisfranc (tarsometatarsal joint complex) injury'), 'the MCQ wording live-matches')
assert(lisfrancTypeMatch(injury, 'tarsometatarsal joint complex injury'), 'the joint-complex injury alias live-matches')
assert(lisfrancTypeMatch(injury, 'Lisfranc joint injury'), 'Lisfranc joint injury live-matches')
assert(!lisfrancTypeMatch(injury, 'Lisfranc fracture', 'confirm'), 'Lisfranc fracture is not the official name')
assert(!lisfrancTypeMatch(injury, 'fracture', 'confirm'), 'fracture alone is not the name')
assert(lisfrancTypeReject(injury, 'Lisfranc fracture')?.includes('can be ligamentous, bony, or both'), 'fracture reveals the spectrum')
assert(lisfrancTypeReject(injury, 'Lisfranc Fracture from Rugby Game')?.includes('assignment'), 'the assignment title reveals the contrast')
assert(lisfrancTypeReject(injury, 'Lisfranc injury') === null, 'the official name is not a reject')

const joint = typeStep('type-joint')
assert(lisfrancTypeMatch(joint, 'tarsometatarsal joints'), 'tarsometatarsal joints live-matches')
assert(lisfrancTypeMatch(joint, 'TMT joint complex', 'confirm'), 'TMT is an alias, confirmed')
assert(!lisfrancTypeMatch(joint, 'TMT'), 'TMT alone is not the official display')
assert(lisfrancTypeMatch(joint, 'Lisfranc joint', 'confirm'), 'Lisfranc joint confirms')
assert(!lisfrancTypeMatch(joint, 'Lisfranc joint'), 'Lisfranc joint waits, because a longer alias continues')

const mechanism = typeStep('type-mechanism')
assert(lisfrancTypeMatch(mechanism, 'axial loading on a plantarflexed foot'), 'axial loading live-matches')
assert(lisfrancTypeMatch(mechanism, 'axial force through a plantarflexed foot'), 'axial force live-matches')
assert(!lisfrancTypeMatch(mechanism, 'inversion and plantarflexion', 'confirm'), 'the lateral mechanism is not this injury')
assert(lisfrancTypeReject(mechanism, 'inversion and plantarflexion')?.includes('lateral sprain'), 'the lateral mechanism reveals the contrast')
assert(
  lisfrancTypeReject(mechanism, 'dorsiflexion, eversion, and tibial internal rotation')?.includes('high-ankle'),
  'the high-ankle mechanism reveals the contrast',
)

const energy = typeStep('type-energy')
assert(
  lisfrancTypeMatch(energy, 'low energy (athletes, ligamentous) vs high energy (car accidents)'),
  'the notes line live-matches',
)
assert(lisfrancTypeMatch(energy, 'athletes, ligamentous versus car accidents'), 'the short notes sides live-match')
assert(!lisfrancTypeMatch(energy, 'low-energy versus high-energy', 'confirm'), 'bare energy levels are not enough')
assert(lisfrancTypeReject(energy, 'low-energy versus high-energy')?.includes('ligamentous'), 'bare energy asks for the tissue side')
assert(!lisfrancTypeMatch(energy, 'low-energy', 'confirm'), 'low-energy alone is not enough')
assert(!lisfrancTypeMatch(energy, 'high-energy', 'confirm'), 'high-energy alone is not enough')
assert(lisfrancTypeReject(energy, 'axial load on a plantarflexed foot')?.includes('energy and tissue pattern'), 'the mechanism is not the energy answer')
assert(energy.reveal.includes('not a rule'), 'the energy reveal keeps the caveat')

const palpation = typeStep('type-palpate')
assert(lisfrancTypeMatch(palpation, 'palpate the midfoot'), 'palpate the midfoot live-matches')
assert(lisfrancTypeMatch(palpation, 'palpation of the dorsal tarsometatarsal joints'), 'the dorsal description live-matches')
assert(palpation.reveal.includes('dorsum of the midfoot'), 'palpation reveal stays on the dorsum')

const tests = typeStep('type-tests')
assert(lisfrancTypeMatch(tests, 'Piano key and Compression'), 'the short pair live-matches')
assert(lisfrancTypeMatch(tests, 'Compression test and Piano key test'), 'either order live-matches')
assert(lisfrancTypeMatch(tests, 'midfoot palpation, Piano key test, Compression test'), 'palpation plus both tests live-matches')
assert(!lisfrancTypeMatch(tests, 'Piano key test', 'confirm'), 'one test is not enough')
assert(!lisfrancTypeMatch(tests, 'Compression test', 'confirm'), 'the other test alone is not enough')
assert(lisfrancTypeReject(tests, 'Piano key test', 'confirm')?.includes('both'), 'Enter on one test asks for the other')
assert(lisfrancTypeReject(tests, 'Piano key test', 'live') === null, 'typing the first test does not flash wrong before the second')
assert(lisfrancTypeReject(tests, 'Compression test', 'confirm')?.includes('Piano key test'), 'Enter on compression asks for both')

const piano = typeStep('type-piano')
assert(lisfrancTypeMatch(piano, 'move the toes up and down'), 'toes up and down live-matches')
assert(lisfrancTypeMatch(piano, 'move the metatarsals up and down'), 'metatarsals up and down live-matches')
assert(lisfrancTypeMatch(piano, 'grasp the toes and move them up and down'), 'the AAOS grip live-matches')
assert(lisfrancTypeMatch(piano, 'plantar force to the metatarsal head'), 'the earlier gesture live-matches')
assert(piano.reveal.includes('no consensus'), 'the reveal keeps the disagreement')
assert(!piano.official.toLowerCase().includes('grasp only'), 'the official blank does not pick one grip')

const compression = typeStep('type-compression')
assert(lisfrancTypeMatch(compression, 'compress across the width of the foot'), 'the compress wording live-matches')
assert(lisfrancTypeMatch(compression, 'stress the space between the first and second metatarsals'), 'the space wording live-matches')
assert(lisfrancTypeMatch(compression, 'pain or a palpable click'), 'the suggestive finding live-matches')
assert(
  lisfrancTypeMatch(compression, 'midfoot compression moving the first metatarsal head relative to the second'),
  'the related variant is accepted',
)
assert(compression.reveal.includes('does not treat those as one test'), 'the reveal keeps the variants apart')

const nwb = typeStep('type-nwb')
assert(lisfrancTypeMatch(nwb, 'NWB until specialist review', 'confirm'), 'NWB is an alias')
assert(lisfrancTypeMatch(nwb, 'non-weight bearing until specialist review'), 'the unhyphenated line live-matches')
assert(lisfrancTypeMatch(nwb, 'orthopaedic referral and non-weight-bearing'), 'referral with non-weight-bearing live-matches')
assert(!lisfrancTypeMatch(nwb, 'non-weight-bearing', 'confirm'), 'non-weight-bearing alone is not enough')
assert(!lisfrancTypeMatch(nwb, 'referral', 'confirm'), 'referral alone is not enough')
assert(!lisfrancTypeMatch(nwb, 'NWB', 'confirm'), 'NWB alone is not enough')
assert(!lisfrancTypeMatch(nwb, 'six to eight weeks', 'confirm'), 'a single duration is not the first step')
assert(lisfrancTypeReject(nwb, 'CAM boot')?.includes('timelines disagree'), 'a boot protocol reveals the disagreement')
assert(lisfrancTypeReject(nwb, 'six weeks')?.includes('non-weight-bearing until specialist review'), 'six weeks reveals the first step')
assert(nwb.official.length > 28, 'the long management blank is marked long enough for the keyboard lift')

const tap = tapStep('tap-dorsal')
assert(tap.prompt === 'Tap the dorsal tarsometatarsal ligaments.', 'the tap prompt names the dorsal ligaments')
assert(gradeLisfrancTap(tap, 'dorsal').ok, 'tapping the dorsal pack is correct')
assert(gradeLisfrancTap(tap, 'dorsal').message.includes('top of the midfoot'), 'the correct tap names the top of the midfoot')
for (const hit of ['plantar', 'interosseous', 'bone', 'tendon', 'atfl', 'cfl', 'ptfl', 'deltoid', 'aitfl', 'pitfl', 'trans_tibfib', 'other-foot', 'other'] as const) {
  const graded = gradeLisfrancTap(tap, hit)
  assert(!graded.ok, `${hit} is not the dorsal tap`)
  assert(graded.message.length > 12, `${hit} has wrong-tap copy`)
}
assert(gradeLisfrancTap(tap, 'plantar').message.includes('on the sole'), 'plantar tap copy says the sole')
assert(gradeLisfrancTap(tap, 'interosseous').message.includes('intervals'), 'interosseous tap copy says the intervals')
assert(gradeLisfrancTap(tap, 'bone').message.includes('midfoot bone'), 'a midfoot bone is named as bone')
assert(gradeLisfrancTap(tap, 'tendon').message.includes('Achilles'), 'the tendon tap names the Achilles')
assert(gradeLisfrancTap(tap, 'atfl').message === 'That is an ankle ligament, not the midfoot Lisfranc ligaments.', 'an ankle ligament uses the locked line')
assert(gradeLisfrancTap(tap, 'aitfl').message === gradeLisfrancTap(tap, 'atfl').message, 'a high-ankle band uses the same line')
assert(gradeLisfrancTap(tap, 'other-foot').message === 'That is the other foot. This case is the right midfoot.', 'the other foot is named')
assert(gradeLisfrancTap(tap, null).message === gradeLisfrancTap(tap, 'other').message, 'a miss uses the other-tap line')

assert(classifyLisfrancMesh('dorsal_tmt_r') === 'dorsal', 'the right dorsal pack is the target')
assert(classifyLisfrancMesh('dorsal_tmt_l') === 'other-foot', 'the left dorsal pack is the other foot')
assert(classifyLisfrancMesh('plantar_tmt_r') === 'plantar', 'the right plantar pack classifies')
assert(classifyLisfrancMesh('cuneometatarsal_io_r') === 'interosseous', 'the right interval bands classify')
assert(classifyLisfrancMesh('cuneometatarsal_io_l') === 'other-foot', 'the left interval bands are the other foot')
assert(classifyLisfrancMesh('cuneiform_med_r') === 'bone', 'the medial cuneiform is bone')
assert(classifyLisfrancMesh('metatarsal2_r') === 'bone', 'the second metatarsal is bone')
assert(classifyLisfrancMesh('cuboid_r') === 'bone', 'the cuboid is bone')
assert(classifyLisfrancMesh('calcaneal_r') === 'tendon', 'the calcaneal tendon stays a contrast')
assert(classifyLisfrancMesh('atfl_r') === 'atfl', 'ATFL stays a contrast')
assert(classifyLisfrancMesh('aitfl_r') === 'aitfl', 'AITFL stays a contrast')
assert(classifyLisfrancMesh('talus_r') === 'other', 'the talus is not scored as a midfoot bone')

assert(LISFRANC_DORSAL_MESHES.join(',') === 'dorsal_tmt_r,dorsal_tmt_l', 'the case uses the packed dorsal meshes')
assert(LISFRANC_PLANTAR_MESHES.join(',') === 'plantar_tmt_r,plantar_tmt_l', 'the case uses the packed plantar meshes')
assert(LISFRANC_INTEROSSEOUS_MESHES.join(',') === 'cuneometatarsal_io_r,cuneometatarsal_io_l', 'the case uses the packed interval meshes')

const manifest = readFileSync(new URL('../public/models/extra/ligaments/manifest.json', import.meta.url), 'utf8')
assert(manifest.includes('dorsal_tmt_r.glb') && manifest.includes('plantar_tmt_r.glb') && manifest.includes('cuneometatarsal_io_r.glb'), 'the packed ligament files stay the ones already shipped')

const sceneSrc = readFileSync(new URL('../src/scene/ThoraxScene.ts', import.meta.url), 'utf8')
assert(sceneSrc.includes('enterLisfrancCase'), 'the scene can enter the Lisfranc stage')
assert(sceneSrc.includes('frameLisfranc'), 'the midfoot has its own frame')
assert(!sceneSrc.includes('dorsal_tmt_replacement') && !/dorsal_tmt_r[\s\S]{0,80}scale\.set/.test(sceneSrc), 'the dorsal pack is not replaced or scaled')

let revision: RevisionState = { done: [], resume: null }
const learnId = revisionId('lisfranc', 'learn')
const quizId = revisionId('lisfranc', 'quiz')
revision = noteRevision(revision, learnId, 2, LISFRANC_LEARN.length, 'learn')
assert(activityFace(revision, learnId).label === 'Continue', 'an unfinished Lisfranc Learn offers Continue')
revision = noteRevision(revision, learnId, LISFRANC_LEARN.length - 1, LISFRANC_LEARN.length, 'learn')
assert(activityFace(revision, learnId).done, 'the last Learn card marks the case finished')
revision = noteRevision(revision, quizId, LISFRANC_QUIZ.length, LISFRANC_QUIZ.length, 'quiz')
assert(activityFace(revision, quizId).done, 'finishing the quiz marks it done')

console.log(`${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
