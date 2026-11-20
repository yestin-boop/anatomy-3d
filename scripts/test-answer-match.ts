/**
 * Unit coverage for type-it live vs Enter/Done matching.
 * Run: npm test
 */
import { matchAliases, normalizeAnswerText } from '../src/data/answerMatch.ts'
import {
  AXIAL_BONES,
  COMMON_BONE_IDS,
  filterCommonBones,
} from '../src/data/axialBones.ts'
import {
  COMMON_MUSCLE_IDS,
  MUSCLES,
  filterCommonMuscles,
  muscleAnswersMatch,
  type Muscle,
} from '../src/data/muscles.ts'

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

function muscle(id: string): Muscle {
  const m = MUSCLES.find((item) => item.id === id)
  if (!m) throw new Error(`missing muscle ${id}`)
  return m
}

function boneMatch(
  typed: string,
  displayName: string,
  aliases: string[],
  mode: 'live' | 'confirm',
): boolean {
  return matchAliases(typed, aliases, mode, displayName, normalizeAnswerText)
}

// ——— muscles: short alias is a prefix of a longer official name ———
const pecMajor = muscle('pectoralis_major')
assert(!muscleAnswersMatch('pectoralis', pecMajor, 'live'), 'pectoralis live should wait')
assert(muscleAnswersMatch('pectoralis', pecMajor, 'confirm'), 'pectoralis Enter/Done should succeed')
assert(!muscleAnswersMatch('pectoral', pecMajor, 'live'), 'pectoral live should wait')
assert(muscleAnswersMatch('pectoral', pecMajor, 'confirm'), 'pectoral Enter/Done should succeed')
assert(muscleAnswersMatch('pectoralis major', pecMajor, 'live'), 'pectoralis major official live')
assert(muscleAnswersMatch('Pectoralis Major', pecMajor, 'live'), 'pectoralis major case/space folding live')
assert(muscleAnswersMatch('pectoralismajor', pecMajor, 'live'), 'pectoralis major compact live')
assert(!muscleAnswersMatch('pectorali', pecMajor, 'live'), 'incomplete pectorali live fail')
assert(!muscleAnswersMatch('pectorali', pecMajor, 'confirm'), 'incomplete pectorali confirm fail')

const biceps = muscle('biceps_brachii')
assert(!muscleAnswersMatch('biceps', biceps, 'live'), 'biceps live should wait')
assert(muscleAnswersMatch('biceps', biceps, 'confirm'), 'biceps Enter/Done should succeed')
assert(muscleAnswersMatch('biceps brachii', biceps, 'live'), 'biceps brachii official live')
assert(muscleAnswersMatch('biceps of arm', biceps, 'live'), 'complete non-prefix alias biceps of arm live')

const gastroc = muscle('gastrocnemius')
assert(!muscleAnswersMatch('gastroc', gastroc, 'live'), 'gastroc live should wait')
assert(muscleAnswersMatch('gastroc', gastroc, 'confirm'), 'gastroc Enter/Done should succeed')
assert(muscleAnswersMatch('gastrocnemius', gastroc, 'live'), 'gastrocnemius official live')

const pecMinor = muscle('pectoralis_minor')
assert(muscleAnswersMatch('pectoralis minor', pecMinor, 'live'), 'pectoralis minor official live despite "muscle" alias')
assert(!muscleAnswersMatch('pectoralis', pecMinor, 'live'), 'bare pectoralis is not an alias of pec minor')
assert(!muscleAnswersMatch('pectoralis', pecMinor, 'confirm'), 'bare pectoralis confirm also fails for pec minor')

const traps = muscle('trapezius')
assert(muscleAnswersMatch('trapezius', traps, 'live'), 'trapezius official live despite "trapezius muscle" alias')
assert(muscleAnswersMatch('traps', traps, 'live'), 'traps is a complete non-prefix alias')

// Combined group names must not be accepted for a single muscle.
for (const m of MUSCLES) {
  assert(
    !muscleAnswersMatch('erector spinae', m, 'confirm') &&
      !muscleAnswersMatch('rotator cuff', m, 'confirm') &&
      !muscleAnswersMatch('quadriceps', m, 'confirm') &&
      !muscleAnswersMatch('hamstrings', m, 'confirm'),
    `group name must not match ${m.id}`,
  )
}

// Official name always live-succeeds; short proper-prefix aliases need confirm.
for (const m of MUSCLES) {
  assert(muscleAnswersMatch(m.displayName, m, 'live'), `official live: ${m.id}`)
  const official = normalizeAnswerText(m.displayName).replace(/\s+/g, '')
  const accepted = m.aliases
    .map((a) => normalizeAnswerText(a).replace(/\s+/g, ''))
    .filter(Boolean)
  const shorts = [...new Set(accepted)].filter(
    (c) => c !== official && accepted.some((other) => other !== c && other.startsWith(c)),
  )
  for (const short of shorts) {
    assert(!muscleAnswersMatch(short, m, 'live'), `short live fail: ${m.id} "${short}"`)
    assert(muscleAnswersMatch(short, m, 'confirm'), `short confirm: ${m.id} "${short}"`)
  }
}

// ——— bones (alias lists kept in sync with axialBones.ts) ———
const sternumBody = {
  displayName: 'body of sternum',
  aliases: [
    'body of sternum',
    'sternal body',
    'sternum body',
    'gladiolus',
    'corpus sterni',
    'sternum',
  ],
}
assert(!boneMatch('sternum', sternumBody.displayName, sternumBody.aliases, 'live'), 'sternum live should wait')
assert(boneMatch('sternum', sternumBody.displayName, sternumBody.aliases, 'confirm'), 'sternum Enter/Done should succeed')
assert(boneMatch('body of sternum', sternumBody.displayName, sternumBody.aliases, 'live'), 'body of sternum official live')
assert(boneMatch('sternum body', sternumBody.displayName, sternumBody.aliases, 'live'), 'sternum body complete alias live')

const frontal = {
  displayName: 'frontal bone',
  aliases: ['frontal', 'frontal bone', 'os frontale'],
}
assert(!boneMatch('frontal', frontal.displayName, frontal.aliases, 'live'), 'frontal live should wait')
assert(boneMatch('frontal', frontal.displayName, frontal.aliases, 'confirm'), 'frontal Enter/Done should succeed')
assert(boneMatch('frontal bone', frontal.displayName, frontal.aliases, 'live'), 'frontal bone official live')

const manubrium = {
  displayName: 'manubrium',
  aliases: ['manubrium', 'manubrium of sternum', 'sternal manubrium', 'handle of sternum'],
}
assert(
  boneMatch('manubrium', manubrium.displayName, manubrium.aliases, 'live'),
  'manubrium official live despite longer "manubrium of sternum" alias',
)
assert(boneMatch('manubrium of sternum', manubrium.displayName, manubrium.aliases, 'live'), 'manubrium of sternum live')

const xiphoid = {
  displayName: 'xiphoid process',
  aliases: ['xiphoid', 'xiphoid process', 'xiphisternum', 'ensiform process'],
}
assert(!boneMatch('xiphoid', xiphoid.displayName, xiphoid.aliases, 'live'), 'xiphoid live should wait')
assert(boneMatch('xiphoid', xiphoid.displayName, xiphoid.aliases, 'confirm'), 'xiphoid Enter/Done should succeed')
assert(boneMatch('xiphoid process', xiphoid.displayName, xiphoid.aliases, 'live'), 'xiphoid process official live')

const mandible = {
  displayName: 'mandible',
  aliases: ['mandible', 'jaw', 'jawbone', 'lower jaw', 'mandibular bone'],
}
assert(!boneMatch('jaw', mandible.displayName, mandible.aliases, 'live'), 'jaw live should wait (prefix of jawbone)')
assert(boneMatch('jaw', mandible.displayName, mandible.aliases, 'confirm'), 'jaw Enter/Done should succeed')
assert(boneMatch('mandible', mandible.displayName, mandible.aliases, 'live'), 'mandible official live')
assert(boneMatch('jawbone', mandible.displayName, mandible.aliases, 'live'), 'jawbone complete alias live')

// ——— Common muscle preset (course-note subset) ———
assert(COMMON_MUSCLE_IDS.length === 40, 'common list length is 40')
assert(
  new Set(COMMON_MUSCLE_IDS).size === COMMON_MUSCLE_IDS.length,
  'common list has no duplicates',
)
const muscleIds = new Set(MUSCLES.map((m) => m.id))
for (const id of COMMON_MUSCLE_IDS) {
  assert(muscleIds.has(id), `common id exists on MUSCLES: ${id}`)
}
const commonMuscles = filterCommonMuscles()
assert(
  commonMuscles.length === COMMON_MUSCLE_IDS.length,
  'filterCommonMuscles length matches the common list',
)
const commonIds = commonMuscles.map((m) => m.id)
assert(new Set(commonIds).size === commonIds.length, 'filterCommonMuscles has no duplicates')
for (const id of COMMON_MUSCLE_IDS) {
  assert(commonIds.includes(id), `filterCommonMuscles includes ${id}`)
}
assert(commonIds.includes('deltoid'), 'common includes deltoid')
assert(commonIds.includes('gastrocnemius'), 'common includes gastrocnemius')
assert(!commonIds.includes('tibialis_anterior'), 'common excludes tibialis anterior')
assert(!commonIds.includes('teres_major'), 'common excludes teres major')
assert(!commonIds.includes('abductor_pollicis_brevis'), 'common excludes a hand intrinsic')
let lastCatalogIndex = -1
let catalogOrder = true
for (const m of commonMuscles) {
  const idx = MUSCLES.findIndex((item) => item.id === m.id)
  if (idx <= lastCatalogIndex) catalogOrder = false
  lastCatalogIndex = idx
}
assert(catalogOrder, 'filterCommonMuscles follows MUSCLES catalog order')

// ——— Common bone preset ———
// HPHS4109 Skeletal System & Joints names these; only pack ids are included.
assert(COMMON_BONE_IDS.length === 53, 'common bone list length is 53')
assert(
  new Set(COMMON_BONE_IDS).size === COMMON_BONE_IDS.length,
  'common bone list has no duplicates',
)
const boneIds = new Set(AXIAL_BONES.map((b) => b.id))
for (const id of COMMON_BONE_IDS) {
  assert(boneIds.has(id), `common bone id exists on AXIAL_BONES: ${id}`)
}
const commonBones = filterCommonBones()
assert(
  commonBones.length === COMMON_BONE_IDS.length,
  'filterCommonBones length matches the common list',
)
const commonBoneIds = commonBones.map((b) => b.id)
for (const id of COMMON_BONE_IDS) {
  assert(commonBoneIds.includes(id), `filterCommonBones includes ${id}`)
}
for (const id of [
  'frontal',
  'mandible',
  'c1',
  'c2',
  'sacrum',
  'sternum_body',
  'xiphoid',
  'rib1',
  'rib5',
  'rib12',
  'clavicle',
  'scaphoid',
  'lunate',
  'triquetrum',
  'hamate',
  'metacarpals',
  'hand_phalanges',
  'hip',
  'femur',
  'patella',
  'talus',
  'calcaneus',
  'navicular',
  'cuneiform_intermediate',
  'metatarsals',
  'foot_phalanges',
]) {
  assert(commonBoneIds.includes(id), `common bones include the named pack bone ${id}`)
}
assert(!commonBoneIds.includes('c7'), 'common bones skip an unnamed cervical vertebra')
assert(!commonBoneIds.includes('t6'), 'common bones skip an unnamed thoracic vertebra')
assert(!commonBoneIds.includes('l5'), 'common bones skip an unnamed lumbar vertebra')
assert(!commonBoneIds.includes('manubrium'), 'common bones skip the unnamed manubrium')
assert(!commonBoneIds.includes('metacarpal3'), 'common bones skip an individual metacarpal')
assert(!commonBoneIds.includes('metatarsal1'), 'common bones skip an individual metatarsal')
assert(!boneIds.has('hyoid'), 'hyoid is named in the notes and absent from the pack')
assert(!boneIds.has('coccyx'), 'coccyx is named in the notes and absent from the pack')
let lastBoneIndex = -1
let boneOrder = true
for (const bone of commonBones) {
  const idx = AXIAL_BONES.findIndex((item) => item.id === bone.id)
  if (idx <= lastBoneIndex) boneOrder = false
  lastBoneIndex = idx
}
assert(boneOrder, 'filterCommonBones follows AXIAL_BONES catalog order')
assert(commonBones.length < AXIAL_BONES.length, 'common bones are a subset of the pack')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} answer-match tests failed`)
}
console.log(`${passed} passed`)
