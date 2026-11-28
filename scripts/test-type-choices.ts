/**
 * Choices on long type-it items, and Sport live vs Enter for prefix aliases.
 * Run: npm test
 */
import { ACHILLES_QUIZ, achillesTypeMatch, achillesTypeReject, type AchillesTypeStep } from '../src/data/achillesTendinopathy.ts'
import { ANKLE_QUIZ, ankleTypeMatch, type AnkleTypeStep } from '../src/data/ankleSprain.ts'
import { type AnswerMatchMode } from '../src/data/answerMatch.ts'
import { HAMSTRING_QUIZ, hamstringTypeMatch, type HamTypeStep } from '../src/data/hamstringStrain.ts'
import { HIGH_ANKLE_QUIZ, highAnkleTypeMatch, highAnkleTypeReject, type HighAnkleTypeStep } from '../src/data/highAnkleSprain.ts'
import { LISFRANC_QUIZ, lisfrancTypeMatch, lisfrancTypeReject, type LisfrancTypeStep } from '../src/data/lisfrancInjury.ts'
import { ACTION_QUIZ, actionTypeMatch, type ActionTypeStep } from '../src/data/muscleActions.ts'
import { TYPE_CHOICE_WRONG, gradeTypeChoice, orderTypeChoices } from '../src/data/typeChoices.ts'

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

type TypeStep = AchillesTypeStep | AnkleTypeStep | HamTypeStep | HighAnkleTypeStep | LisfrancTypeStep | ActionTypeStep

type CaseName = 'achilles' | 'ankle' | 'hamstring' | 'high-ankle' | 'lisfranc' | 'sport'

const TYPE_ONLY = new Set([
  'achilles:type-injury',
  'achilles:type-tendon',
  'achilles:type-phase',
  'ankle:type-atfl',
  'ankle:type-cfl',
  'hamstring:type-semitend',
  'hamstring:type-grade',
  'hamstring:type-nordic',
  'hamstring:type-totaps-stop',
  'high-ankle:type-injury',
  'high-ankle:type-joint',
  'high-ankle:type-palpate',
  'high-ankle:type-squeeze',
  'lisfranc:type-injury',
  'lisfranc:type-joint',
  'lisfranc:type-palpate',
  'sport:type-glut-med',
  'sport:type-glut-max',
  'sport:type-iliopsoas',
  'sport:type-gastroc',
  'sport:type-tib-ant',
  'sport:type-biceps-fem',
  'sport:type-biceps',
  'sport:type-triceps',
  'sport:type-supra',
  'sport:type-brachialis',
])

const WITH_CHOICES = new Set([
  'achilles:type-overuse',
  'achilles:type-rupture',
  'achilles:type-thompson',
  'achilles:type-tendinosis',
  'achilles:type-return',
  'ankle:type-mechanism',
  'ankle:type-pathway',
  'hamstring:type-mechanism',
  'hamstring:type-palpate',
  'hamstring:type-totaps-stages',
  'high-ankle:type-mechanism',
  'high-ankle:type-squeeze-positive',
  'high-ankle:type-external-rotation',
  'high-ankle:type-phase-1',
  'high-ankle:type-phase-4',
  'lisfranc:type-mechanism',
  'lisfranc:type-energy',
  'lisfranc:type-tests',
  'lisfranc:type-piano',
  'lisfranc:type-compression',
  'lisfranc:type-nwb',
  'sport:type-rectus',
  'sport:type-lats',
  'sport:type-pec-major',
  'sport:type-serratus',
])

function rejectMessage(name: CaseName, step: TypeStep, typed: string): string | null {
  if (name === 'achilles') return achillesTypeReject(step as AchillesTypeStep, typed)
  if (name === 'high-ankle') return highAnkleTypeReject(step as HighAnkleTypeStep, typed)
  if (name === 'lisfranc') return lisfrancTypeReject(step as LisfrancTypeStep, typed, 'confirm')
  return null
}

function matches(name: CaseName, step: TypeStep, typed: string, mode: AnswerMatchMode): boolean {
  if (name === 'achilles') return achillesTypeMatch(step as AchillesTypeStep, typed, mode)
  if (name === 'ankle') return ankleTypeMatch(step as AnkleTypeStep, typed, mode)
  if (name === 'hamstring') return hamstringTypeMatch(step as HamTypeStep, typed, mode)
  if (name === 'high-ankle') return highAnkleTypeMatch(step as HighAnkleTypeStep, typed, mode)
  if (name === 'lisfranc') return lisfrancTypeMatch(step as LisfrancTypeStep, typed, mode)
  return actionTypeMatch(step as ActionTypeStep, typed, mode)
}

const groups: { name: CaseName; steps: readonly { kind: string; id: string }[] }[] = [
  { name: 'achilles', steps: ACHILLES_QUIZ },
  { name: 'ankle', steps: ANKLE_QUIZ },
  { name: 'hamstring', steps: HAMSTRING_QUIZ },
  { name: 'high-ankle', steps: HIGH_ANKLE_QUIZ },
  { name: 'lisfranc', steps: LISFRANC_QUIZ },
  { name: 'sport', steps: ACTION_QUIZ },
]

const seen = new Set<string>()
const officialSlots = new Set<number>()

for (const group of groups) {
  for (const raw of group.steps) {
    if (raw.kind !== 'type') continue
    const step = raw as TypeStep
    const key = `${group.name}:${step.id}`
    seen.add(key)
    const wantsChoices = WITH_CHOICES.has(key)
    const typeOnly = TYPE_ONLY.has(key)
    assert(wantsChoices !== typeOnly, `${key} is in exactly one locked list`)
    if (typeOnly) {
      assert(!step.choices || step.choices.length === 0, `${key} has no choice list`)
      continue
    }
    const choices = step.choices ?? []
    assert(choices.length >= 3 && choices.length <= 4, `${key} has 3 or 4 choices, got ${choices.length}`)
    assert(choices.includes(step.official), `${key} choices include the official wording`)
    assert(new Set(choices).size === choices.length, `${key} choices are unique`)
    const ordered = orderTypeChoices(step.id, choices, step.official)
    assert(ordered.length === choices.length, `${key} shuffle keeps every choice`)
    assert(new Set(ordered).size === choices.length, `${key} shuffle does not duplicate`)
    assert(ordered[0] !== step.official, `${key} does not pin the official choice first`)
    officialSlots.add(ordered.indexOf(step.official))
    assert(matches(group.name, step, step.official), `${key} official still auto-succeeds while typing`)
    for (const choice of choices) {
      if (choice === step.official) {
        const graded = gradeTypeChoice(choice, step.official, null)
        assert(graded.ok && graded.ok && graded.fill === step.official, `${key} official tap fills the official wording`)
        continue
      }
      assert(!matches(group.name, step, choice, 'confirm'), `${key} does not accept the distractor “${choice}”`)
      const reject = rejectMessage(group.name, step, choice)
      const graded = gradeTypeChoice(choice, step.official, reject)
      assert(!graded.ok, `${key} distractor tap is wrong`)
      if (!graded.ok) {
        assert(graded.message === (reject ?? TYPE_CHOICE_WRONG), `${key} distractor “${choice}” uses the reject or the plain wrong line`)
      }
    }
  }
}

for (const key of TYPE_ONLY) assert(seen.has(key), `${key} still exists`)
for (const key of WITH_CHOICES) assert(seen.has(key), `${key} still exists`)
assert(seen.size === TYPE_ONLY.size + WITH_CHOICES.size, 'every type-it item is type-it only or has choices')
assert(officialSlots.size > 1, 'the official choice is not stuck in one slot')

const tendinosis = ACHILLES_QUIZ.find((step) => step.id === 'type-tendinosis') as AchillesTypeStep
assert(tendinosis.choices?.includes('sudden overload') === true, 'tendinosis offers the tendinitis overload label')
assert(tendinosis.choices?.includes('short-term overuse') === true, 'tendinosis offers the tendinitis overuse label')
assert(achillesTypeMatch(tendinosis, 'long-term repetitive strain'), 'tendinosis still accepts the lecture alias while typing')
assert(achillesTypeMatch(tendinosis, 'tiny tears'), 'tendinosis still accepts tiny tears')
assert(achillesTypeMatch(tendinosis, 'chronic degeneration', 'confirm'), 'tendinosis still confirms the short alias')
assert(!achillesTypeMatch(tendinosis, 'chronic degeneration'), 'the short tendinosis alias still waits for Enter')
const overload = gradeTypeChoice('sudden overload', tendinosis.official, achillesTypeReject(tendinosis, 'sudden overload'))
assert(!overload.ok && overload.ok === false && /tendinitis/i.test(overload.message), 'sudden overload uses the tendinitis contrast')

const tendon = ACHILLES_QUIZ.find((step) => step.id === 'type-tendon') as AchillesTypeStep
assert(!tendon.choices, 'Achilles tendon stays type-it only')

const serratus = ACTION_QUIZ.find((step) => step.id === 'type-serratus') as ActionTypeStep
assert(serratus.choices?.includes(serratus.official) === true, 'serratus choices include the official phrase')
assert(!actionTypeMatch(serratus, 'protraction'), 'live protraction does not finish serratus')
assert(actionTypeMatch(serratus, 'protraction', 'confirm'), 'Enter still accepts serratus protraction')
assert(actionTypeMatch(serratus, 'protraction and upward rotation'), 'the serratus official auto-succeeds')
assert(actionTypeMatch(serratus, 'prevents scapular winging'), 'serratus still accepts the winging alias while typing')

const lats = ACTION_QUIZ.find((step) => step.id === 'type-lats') as ActionTypeStep
assert(!actionTypeMatch(lats, 'internal rotation'), 'live internal rotation does not finish lats')
assert(actionTypeMatch(lats, 'internal rotation', 'confirm'), 'Enter still accepts lats internal rotation')
assert(actionTypeMatch(lats, lats.official), 'the lats official auto-succeeds')

const pec = ACTION_QUIZ.find((step) => step.id === 'type-pec-major') as ActionTypeStep
assert(!actionTypeMatch(pec, 'adduction'), 'live adduction does not finish pec major')
assert(actionTypeMatch(pec, 'adduction', 'confirm'), 'Enter still accepts pec major adduction')
assert(actionTypeMatch(pec, pec.official), 'the pec major official auto-succeeds')

const glutMed = ACTION_QUIZ.find((step) => step.id === 'type-glut-med') as ActionTypeStep
assert(!glutMed.choices, 'abduction stays type-it only')
assert(actionTypeMatch(glutMed, 'abduction'), 'abduction still auto-succeeds while typing')

if (failed > 0) {
  console.error(`${failed} failed, ${passed} passed`)
  process.exit(1)
}
console.log(`${passed} passed`)
