/**
 * Unit coverage for native-keyboard detection, typed-input cleanup,
 * and the iPhone type-it reopen cycle (dismiss, then open again).
 * Run: npm test
 */
import {
  armKeyboardSession,
  initialKeyboardSession,
  resolveKeyboardInset,
  sanitizeTypedInput,
  shouldUseNativeSoftKeyboard,
  type KeyboardSession,
  type KeyboardViewport,
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

const IPHONE = 844
const KEYBOARD = 336

function viewport(
  visualHeight: number,
  offsetTop = 0,
  scrollY = 0,
  innerHeight = IPHONE,
): KeyboardViewport {
  return { innerHeight, visualHeight, offsetTop, scrollY }
}

function openTouch(session: KeyboardSession, view: KeyboardViewport, focused = true) {
  return resolveKeyboardInset(view, session, {
    focused,
    touch: true,
    forcedInset: null,
    confirmClose: false,
  })
}

// First open: the visual viewport shrinks and nothing pans. The bar lifts
// by the keyboard, and that height is remembered for the next focus.
let session = armKeyboardSession(initialKeyboardSession(IPHONE))
let step = openTouch(session, viewport(IPHONE - KEYBOARD))
session = step.session
assert(step.inset === KEYBOARD, `first open lifts by the ${KEYBOARD}px keyboard, got ${step.inset}`)
assert(step.pendingClose === false, 'first open is not a close')
assert(session.rememberedInset === KEYBOARD, 'first open remembers the keyboard height')

// Dismiss blurs the field. The inset drops even if Safari leaves a 24px offset.
step = openTouch(session, viewport(IPHONE, 24), false)
session = step.session
assert(step.inset === 0, `dismiss returns the inset to 0, got ${step.inset}`)
assert(session.liftArmed === false, 'dismiss disarms the lift')

// Second open, the bug: the keyboard is on screen but Safari reports the
// same viewport as when it was closed. The remembered height lifts the bar.
session = armKeyboardSession(session)
step = openTouch(session, viewport(IPHONE))
session = step.session
assert(
  step.inset === KEYBOARD,
  `second open with a blind viewport still lifts ${KEYBOARD}px, got ${step.inset}`,
)
assert(step.inset === KEYBOARD, 'reopen cycle: blind second open matches the first lift')

// Same cycle when the second open pans instead of shrinking. The old
// overlap (innerHeight - offsetTop - visualHeight) is 0 here; the pan is
// the keyboard, and pinning scroll to 0 means the bar was not revealed.
session = armKeyboardSession(initialKeyboardSession(IPHONE))
const firstPan = openTouch(session, viewport(IPHONE - KEYBOARD))
session = firstPan.session
const dismissed = openTouch(session, viewport(IPHONE), false)
session = armKeyboardSession(dismissed.session)
const secondPan = openTouch(session, viewport(IPHONE - KEYBOARD, KEYBOARD))
assert(firstPan.inset === KEYBOARD, 'pan cycle first open lifts')
assert(dismissed.inset === 0, 'pan cycle dismiss drops the lift')
assert(
  secondPan.inset === KEYBOARD,
  `second open whose offsetTop cancels the shrink still lifts, got ${secondPan.inset}`,
)
assert(
  secondPan.inset === firstPan.inset,
  'reopen cycle: a panned second open lifts by the same amount as the first',
)

// scrollY is the same pan, read before the page is pinned back to the top.
session = armKeyboardSession(initialKeyboardSession(IPHONE))
step = openTouch(session, viewport(IPHONE, 0, KEYBOARD))
assert(step.inset === KEYBOARD, `scroll-only pan counts as the keyboard, got ${step.inset}`)

// Shrink plus an equal pan is one keyboard, not two.
session = armKeyboardSession(initialKeyboardSession(IPHONE))
step = openTouch(session, viewport(IPHONE - KEYBOARD, KEYBOARD, KEYBOARD))
assert(step.inset === KEYBOARD, `shrink and pan do not add, got ${step.inset}`)

// interactive-widget=resizes-content shortens the layout viewport. Padding
// that same amount would shove the bar up twice. Remember the height anyway
// so a later blind open can still lift.
session = armKeyboardSession(initialKeyboardSession(IPHONE))
step = openTouch(session, viewport(IPHONE - KEYBOARD, 0, 0, IPHONE - KEYBOARD))
session = step.session
assert(step.inset === 0, `a layout shrink is not padded again, got ${step.inset}`)
assert(session.rememberedInset === KEYBOARD, 'a layout shrink still remembers the keyboard')
step = openTouch(session, viewport(IPHONE), false)
session = armKeyboardSession(step.session)
step = openTouch(session, viewport(IPHONE))
assert(step.inset === KEYBOARD, `blind open after a layout-resize open still lifts, got ${step.inset}`)

// An honest keyboard that drops to 0 while the field is still focused holds
// for one frame, then commits the close. A stale 0 cannot hide the bar, and
// a real close does not keep the lift up.
session = armKeyboardSession(initialKeyboardSession(IPHONE))
step = openTouch(session, viewport(IPHONE - KEYBOARD))
session = step.session
const held = resolveKeyboardInset(viewport(IPHONE), session, {
  focused: true,
  touch: true,
  forcedInset: null,
  confirmClose: false,
})
assert(held.pendingClose, 'a sudden 0px reading is a pending close')
assert(held.inset === KEYBOARD, `the pending close keeps the bar up, got ${held.inset}`)
const committed = resolveKeyboardInset(viewport(IPHONE), held.session, {
  focused: true,
  touch: true,
  forcedInset: null,
  confirmClose: true,
})
session = committed.session
assert(committed.inset === 0, `committing the close drops the lift, got ${committed.inset}`)
const stillDown = openTouch(session, viewport(IPHONE))
assert(stillDown.inset === 0, `a closed keyboard stays down until the next tap, got ${stillDown.inset}`)
session = armKeyboardSession(committed.session)
step = openTouch(session, viewport(IPHONE))
assert(step.inset === KEYBOARD, `the tap after a committed close lifts again, got ${step.inset}`)

// Desktop: a hardware keyboard can blur and focus again without a soft keyboard.
// Same layout height, so this is the blind reopen — and it must not lift.
session = armKeyboardSession(initialKeyboardSession(900))
session = { ...session, rememberedInset: KEYBOARD }
step = resolveKeyboardInset(viewport(900, 0, 0, 900), session, {
  focused: true,
  touch: false,
  forcedInset: null,
  confirmClose: false,
})
assert(step.inset === 0, `desktop focus does not reuse a phone keyboard inset, got ${step.inset}`)
step = resolveKeyboardInset(viewport(900, 0, 0, 900), step.session, {
  focused: false,
  touch: false,
  forcedInset: null,
  confirmClose: false,
})
session = armKeyboardSession(step.session)
session = { ...session, rememberedInset: KEYBOARD }
step = resolveKeyboardInset(viewport(900, 0, 0, 900), session, {
  focused: true,
  touch: false,
  forcedInset: null,
  confirmClose: false,
})
assert(step.inset === 0, `desktop reopen stays unlifted, got ${step.inset}`)

// Rotating while the keyboard is closed adopts the new height. It must
// not be stored as a keyboard the next focus would lift by.
session = initialKeyboardSession(IPHONE)
step = openTouch(session, viewport(700, 0, 0, 700), false)
assert(step.inset === 0, `a shorter window with no keyboard does not lift, got ${step.inset}`)
assert(step.session.restingInnerHeight === 700, 'a closed keyboard adopts the rotated layout height')
assert(step.session.rememberedInset === 0, 'rotation is not remembered as a keyboard')
session = armKeyboardSession(step.session)
step = openTouch(session, viewport(700, 0, 0, 700))
assert(step.inset === 0, `focus after rotation stays unlifted without a keyboard, got ${step.inset}`)

const forced = resolveKeyboardInset(viewport(IPHONE), initialKeyboardSession(IPHONE), {
  focused: false,
  touch: true,
  forcedInset: 300,
  confirmClose: false,
})
assert(forced.inset === 300, `a QA pin of 300px is applied, got ${forced.inset}`)

const huge = openTouch(armKeyboardSession(initialKeyboardSession(IPHONE)), viewport(0))
assert(huge.inset === Math.round(IPHONE * 0.62), `a full-height reading is capped, got ${huge.inset}`)
assert(huge.inset < IPHONE, 'the cap stays under the screen height')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} quiz-keyboard tests failed`)
}
console.log(`${passed} passed`)
