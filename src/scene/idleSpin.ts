/**
 * When the idle Y-spin may restart. Manual orbit stays enabled either way.
 * The ankle case stays still so the student can study the ligaments.
 * Sport and hamstring study modules stay still for the same reason.
 */

export type IdleSpinState = {
  disposed: boolean
  viewMode: boolean
  ankleCase: boolean
  /** Muscle-action and hamstring modules. Omitted means not in one. */
  studyCase?: boolean
  targetCount: number
}

/**
 * OrbitControls `end` waits 1.8s, then may restart the menu idle spin.
 * Never resume while the lateral ankle case or a study module is open,
 * even though those modes clear `targetIds`.
 */
export function shouldResumeIdleSpinAfterControlsEnd(state: IdleSpinState): boolean {
  return !state.disposed && !state.viewMode && !state.ankleCase && !state.studyCase && state.targetCount === 0
}

/** `showMenuView` and `exitView` may resume idle spin only outside a held case. */
export function shouldResumeIdleSpinOnMenuOrExitView(
  state: Pick<IdleSpinState, 'ankleCase' | 'studyCase'>,
): boolean {
  return !state.ankleCase && !state.studyCase
}
