/**
 * When the idle Y-spin may restart. Manual orbit stays enabled either way.
 * The ankle case must stay still so the student can study the ligaments.
 */

export type IdleSpinState = {
  disposed: boolean
  viewMode: boolean
  ankleCase: boolean
  targetCount: number
}

/**
 * OrbitControls `end` waits 1.8s, then may restart the menu idle spin.
 * Never resume while the lateral ankle case is open, even though that case
 * clears `targetIds`.
 */
export function shouldResumeIdleSpinAfterControlsEnd(state: IdleSpinState): boolean {
  return !state.disposed && !state.viewMode && !state.ankleCase && state.targetCount === 0
}

/** `showMenuView` and `exitView` may resume idle spin only outside the ankle case. */
export function shouldResumeIdleSpinOnMenuOrExitView(state: Pick<IdleSpinState, 'ankleCase'>): boolean {
  return !state.ankleCase
}
