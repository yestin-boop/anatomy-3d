/**
 * Touch-device detection and type-it input helpers.
 * Pure functions so they can be unit-tested without a browser.
 */

export type TouchQuizProbe = {
  userAgent: string
  platform: string
  maxTouchPoints: number
  hasTouchStart: boolean
  pointerCoarse: boolean
  hoverNone: boolean
  narrowWidth: boolean
}

/**
 * iPhone, iPad (including desktop-mode iPad), and other touch-primary devices
 * should use the native OS keyboard. Desktop (mouse + physical keyboard)
 * stays on keydown / the hidden field, with no on-screen keyboard.
 */
export function shouldUseNativeSoftKeyboard(p: TouchQuizProbe): boolean {
  const iOS =
    /iPhone|iPad|iPod/i.test(p.userAgent) ||
    (/Mac/i.test(p.platform || p.userAgent) && p.maxTouchPoints > 1)
  if (iOS) return true
  const hasTouch = p.maxTouchPoints > 0 || p.hasTouchStart
  if (!hasTouch) return false
  if (p.pointerCoarse || p.hoverNone) return true
  return p.narrowWidth
}

export function probeTouchQuiz(win: Window, nav: Navigator): TouchQuizProbe {
  return {
    userAgent: nav.userAgent || '',
    platform: nav.platform || '',
    maxTouchPoints: nav.maxTouchPoints || 0,
    hasTouchStart: 'ontouchstart' in win,
    pointerCoarse: win.matchMedia('(pointer: coarse)').matches,
    hoverNone: win.matchMedia('(hover: none)').matches,
    narrowWidth: win.matchMedia('(max-width: 820px)').matches,
  }
}

/** Letters, spaces, hyphens, and numbers (C3, T1) — drop the rest. */
export function sanitizeTypedInput(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9 \-]/g, '')
}

/**
 * Below this, a viewport delta is the Safari chrome (the stuck ~24px
 * offset after dismiss), not the software keyboard.
 */
export const KEYBOARD_OPEN_PX = 40

/** Don't let a bad reading shove the prompt off the top of the phone. */
const KEYBOARD_CAP_RATIO = 0.62

export type KeyboardViewport = {
  innerHeight: number
  visualHeight: number
  offsetTop: number
  /** Layout scroll read before pinning the page back to the top. */
  scrollY: number
}

export type KeyboardSession = {
  /** Last keyboard height that actually opened, in px. */
  rememberedInset: number
  /** Layout height last seen with the software keyboard closed. */
  restingInnerHeight: number
  /** The inset currently applied to the typing bar. */
  appliedInset: number
  /** A tap or focus asked for the keyboard and it has not since closed. */
  liftArmed: boolean
  /**
   * This cycle's keyboard was visible to the viewport: the visual viewport
   * shrank, or the layout viewport shrank (interactive-widget=resizes-content).
   * A pan alone is not honest — iOS reports offsetTop without moving our bar.
   */
  honestOpen: boolean
  /** An honest keyboard closed. Ignore memory until the next tap arms a new cycle. */
  suppressFallback: boolean
}

export type KeyboardInsetOptions = {
  focused: boolean
  /** Native soft keyboard. Desktop hardware keys must not lift the bar. */
  touch: boolean
  /** QA pin. Null measures the viewport. */
  forcedInset: number | null
  /**
   * The viewport just dropped an honest keyboard to zero. False holds the
   * previous lift for one beat so a single stale frame cannot hide the bar.
   */
  confirmClose: boolean
}

export type KeyboardInsetDecision = {
  inset: number
  /** Honest metrics fell to zero and the lift is only being held. */
  pendingClose: boolean
  session: KeyboardSession
}

export function initialKeyboardSession(innerHeight: number): KeyboardSession {
  return {
    rememberedInset: 0,
    restingInnerHeight: innerHeight > 0 ? innerHeight : 0,
    appliedInset: 0,
    liftArmed: false,
    honestOpen: false,
    suppressFallback: false,
  }
}

/** A new tap or focus starts a cycle. A pending close from the previous one must not win. */
export function armKeyboardSession(session: KeyboardSession): KeyboardSession {
  return {
    ...session,
    liftArmed: true,
    suppressFallback: false,
    honestOpen: false,
  }
}

function capInset(px: number, innerHeight: number): number {
  const cap = Math.max(0, innerHeight) * KEYBOARD_CAP_RATIO
  return Math.round(Math.min(Math.max(0, px), cap))
}

/**
 * Pixels to pad the typing bar by.
 *
 * iPhone Safari's first focus usually shrinks `visualViewport` (or, with
 * `interactive-widget=resizes-content`, the layout viewport) and the bar
 * lifts. After the keyboard is dismissed, the next focus often does not:
 * Safari pans (`offsetTop` / `scrollY` grow by about the keyboard height)
 * so `innerHeight - offsetTop - visualHeight` is 0, or it reports no change
 * at all. The page pins scroll to 0, so that pan never actually brings the
 * bottom bar back into view — subtracting `offsetTop` hides it under the
 * keyboard. Measure the cover as the max of the shrink and the pan, and if
 * this focus reports neither, reuse the keyboard height from the open that
 * did report one.
 */
export function resolveKeyboardInset(
  viewport: KeyboardViewport,
  session: KeyboardSession,
  opts: KeyboardInsetOptions,
): KeyboardInsetDecision {
  const resting = session.restingInnerHeight > 0 ? session.restingInnerHeight : viewport.innerHeight
  if (opts.forcedInset != null) {
    const inset = capInset(opts.forcedInset, viewport.innerHeight)
    return {
      inset,
      pendingClose: false,
      session: { ...session, restingInnerHeight: resting, appliedInset: inset },
    }
  }

  const layoutShrink = Math.max(0, resting - viewport.innerHeight)
  const visualShrink = Math.max(0, viewport.innerHeight - viewport.visualHeight)
  const pan = Math.max(0, viewport.offsetTop, viewport.scrollY)
  const layoutAbsorbed = layoutShrink > KEYBOARD_OPEN_PX
  const visualOpen = visualShrink > KEYBOARD_OPEN_PX
  const panOpen = pan > KEYBOARD_OPEN_PX
  const dropped =
    opts.focused && session.honestOpen && !visualOpen && !layoutAbsorbed && !panOpen

  // One stale 0px frame fires as the keyboard animates. Hold the lift.
  // The caller commits the close only if the 0px reading stays.
  if (dropped && !opts.confirmClose) {
    return { inset: session.appliedInset, pendingClose: true, session }
  }

  let next: KeyboardSession = {
    rememberedInset: session.rememberedInset,
    restingInnerHeight: resting,
    appliedInset: session.appliedInset,
    liftArmed: opts.focused ? session.liftArmed : false,
    honestOpen: opts.focused ? session.honestOpen : false,
    suppressFallback: opts.focused ? session.suppressFallback : false,
  }

  if (opts.focused && (layoutAbsorbed || visualOpen || panOpen)) {
    const remembered = layoutAbsorbed
      ? layoutShrink + (visualOpen ? visualShrink : 0)
      : Math.max(visualShrink, pan)
    next.rememberedInset = capInset(remembered, Math.max(resting, viewport.innerHeight))
  }
  if (opts.focused && (visualOpen || layoutAbsorbed)) next.honestOpen = true

  if (dropped && opts.confirmClose) {
    next.honestOpen = false
    next.liftArmed = false
    next.suppressFallback = true
    next.appliedInset = 0
    if (pan <= KEYBOARD_OPEN_PX) next.restingInnerHeight = viewport.innerHeight
    return { inset: 0, pendingClose: false, session: next }
  }

  let inset = 0
  if (opts.focused) {
    if (layoutAbsorbed) {
      // The layout viewport already shortened, which moves a bottom-aligned
      // bar. Only pad the extra slice the visual viewport still covers.
      inset = visualOpen ? capInset(visualShrink, viewport.innerHeight) : 0
    } else if (visualOpen || panOpen) {
      // Pan and shrink describe the same keyboard. Summing them double-lifts.
      inset = capInset(Math.max(visualShrink, pan), viewport.innerHeight)
    } else if (
      opts.touch &&
      next.liftArmed &&
      !next.suppressFallback &&
      next.rememberedInset > KEYBOARD_OPEN_PX
    ) {
      // Second open: Safari drew the keyboard and left every viewport number
      // looking closed. The previous open's height is the bar's lift.
      inset = capInset(next.rememberedInset, viewport.innerHeight)
    }
  }

  // A closed keyboard means the layout height we see now is the resting
  // height. Rotation changes it; that must not be remembered as a keyboard.
  if (!opts.focused && !visualOpen && pan <= KEYBOARD_OPEN_PX) {
    next.restingInnerHeight = viewport.innerHeight
  }
  next.appliedInset = inset
  return { inset, pendingClose: false, session: next }
}
