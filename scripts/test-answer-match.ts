/**
 * Unit coverage for type-it live vs Enter/Done matching.
 * Run: npm test
 */
import { matchAliases, normalizeAnswerText } from '../src/data/answerMatch.ts'
import {
  MUSCLES,
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

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} answer-match tests failed`)
}
console.log(`${passed} passed`)
