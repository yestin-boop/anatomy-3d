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
