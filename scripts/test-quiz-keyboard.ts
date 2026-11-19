/**
 * Unit coverage for native-keyboard device detection and typed-input cleanup.
 * Run: npm test
 */
import {
  sanitizeTypedInput,
  shouldUseNativeSoftKeyboard,
  type TouchQuizProbe,
} from '../src/input/quizKeyboard.ts'

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

function desktop(overrides: Partial<TouchQuizProbe> = {}): TouchQuizProbe {
  return {
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    platform: 'MacIntel',
    maxTouchPoints: 0,
    hasTouchStart: false,
    pointerCoarse: false,
    hoverNone: false,
    narrowWidth: false,
    ...overrides,
  }
}

assert(!shouldUseNativeSoftKeyboard(desktop()), 'desktop Mac: physical keyboard only')
assert(
  !shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Win32',
    }),
  ),
  'desktop Windows: physical keyboard only',
)
assert(
  !shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Win32',
      maxTouchPoints: 10,
      hasTouchStart: true,
    }),
  ),
  'Windows touch laptop with hover and a fine pointer stays on the physical keyboard',
)

assert(
  shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      platform: 'iPhone',
      maxTouchPoints: 5,
      hasTouchStart: true,
      pointerCoarse: true,
      hoverNone: true,
      narrowWidth: true,
    }),
  ),
  'iPhone uses the native keyboard',
)
assert(
  shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      platform: 'iPad',
      maxTouchPoints: 5,
      hasTouchStart: true,
      pointerCoarse: true,
      hoverNone: true,
      narrowWidth: false,
    }),
  ),
  'iPad uses the native keyboard',
)
assert(
  shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      platform: 'MacIntel',
      maxTouchPoints: 5,
      hasTouchStart: true,
      pointerCoarse: true,
      hoverNone: true,
      narrowWidth: false,
    }),
  ),
  'desktop-mode iPad (Mac + maxTouchPoints > 1) uses the native keyboard',
)
assert(
  shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (iPod touch; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
      platform: 'iPod',
      maxTouchPoints: 5,
      hasTouchStart: true,
      pointerCoarse: true,
      hoverNone: true,
      narrowWidth: true,
    }),
  ),
  'iPod uses the native keyboard',
)
assert(
  !shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      platform: 'MacIntel',
      maxTouchPoints: 1,
      hasTouchStart: false,
    }),
  ),
  'a Mac with a single touch point is not treated as an iPad',
)

assert(
  shouldUseNativeSoftKeyboard(
    desktop({
      userAgent:
        'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      platform: 'Linux armv8l',
      maxTouchPoints: 5,
      hasTouchStart: true,
      pointerCoarse: true,
      hoverNone: true,
      narrowWidth: true,
    }),
  ),
  'Android phone uses the native keyboard (one touch path, no in-app keys)',
)
assert(
  shouldUseNativeSoftKeyboard(
    desktop({
      maxTouchPoints: 5,
      hasTouchStart: true,
      pointerCoarse: false,
      hoverNone: false,
      narrowWidth: true,
    }),
  ),
  'a narrow touch device without coarse/hover signals still uses the native keyboard',
)

assert(sanitizeTypedInput('C3') === 'c3', 'vertebra numbers stay (C3)')
assert(sanitizeTypedInput('T1') === 't1', 'vertebra numbers stay (T1)')
assert(sanitizeTypedInput('XIPH-OID') === 'xiph-oid', 'hyphens stay and letters lower-case')
assert(sanitizeTypedInput('rib 1') === 'rib 1', 'spaces stay')
assert(sanitizeTypedInput('deltoid!') === 'deltoid', 'punctuation is stripped')
assert(sanitizeTypedInput('Pectoralis Major') === 'pectoralis major', 'case folds')
assert(sanitizeTypedInput("atlas's") === 'atlass', 'apostrophes are stripped')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} quiz-keyboard tests failed`)
}
console.log(`${passed} passed`)
