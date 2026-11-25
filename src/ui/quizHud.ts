/**
 * Start-menu and in-quiz HUD copy for the P2 refinement.
 * Combined and a single level are exclusive. The Start label carries the
 * live count. The quiz bar uses one context label plus a progress fraction.
 */

export type LevelId = 'see' | 'hint' | 'memory'
export type PlayModeId = 'combined' | LevelId
export type QuizSubject = 'bones' | 'muscles' | 'rehab'
export type QuizActivity =
  | 'view'
  | 'learn'
  | 'see'
  | 'hint'
  | 'memory'
  | 'type'
  | 'tap'
  | 'complete'

const LEVELS: readonly LevelId[] = ['see', 'hint', 'memory']

export function modeGroup(mode: PlayModeId): 'combined' | 'level' {
  return mode === 'combined' ? 'combined' : 'level'
}

/** Only the chosen path reads as selected. */
export function isModeSelected(selected: PlayModeId, card: PlayModeId): boolean {
  return selected === card
}

/**
 * Dim the inactive path. Combined dims every single level, and a single
 * level dims Combined. Sibling levels stay at full strength.
 */
export function isModeDimmed(selected: PlayModeId, card: PlayModeId): boolean {
  if (selected === card) return false
  return modeGroup(selected) !== modeGroup(card)
}

export function dimmedModes(selected: PlayModeId): PlayModeId[] {
  const cards: PlayModeId[] = ['combined', ...LEVELS]
  return cards.filter((card) => isModeDimmed(selected, card))
}

/** Items that Start will actually deal. sessionCount 0 means the whole pool. */
export function playableCount(pool: number, sessionCount: number): number {
  if (pool <= 0) return 0
  if (sessionCount > 0) return Math.min(pool, sessionCount)
  return pool
}

export function startButtonLabel(count: number): string {
  if (count <= 0) return 'Start'
  const noun = count === 1 ? 'item' : 'items'
  return `Start · ${count} ${noun}`
}

/** Empty string when Start can run. */
export function startDisabledReason(count: number): string {
  return count <= 0 ? 'Nothing matches these filters' : ''
}

const ACTIVITY_LABEL: Record<QuizActivity, string> = {
  view: 'view',
  learn: 'learn',
  see: 'see it',
  hint: 'hint',
  memory: 'memory',
  type: 'type it',
  tap: 'tap it',
  complete: 'complete',
}

const SUBJECT_LABEL: Record<QuizSubject, string> = {
  bones: 'Bones',
  muscles: 'Muscles',
  rehab: 'Rehab',
}

/** One context line, e.g. "Rehab · type it" or "Bones · memory". */
export function quizContextLabel(input: {
  viewing: boolean
  subject: QuizSubject
  activity: QuizActivity
}): string {
  if (input.viewing || input.activity === 'view') return 'Study · view'
  return `${SUBJECT_LABEL[input.subject]} · ${ACTIVITY_LABEL[input.activity]}`
}

/** Fraction shown beside the round count. 3 of 5 is 0.6. */
export function progressRatio(shown: number, total: number): number {
  if (total <= 0 || shown <= 0) return 0
  return Math.min(1, shown / total)
}
