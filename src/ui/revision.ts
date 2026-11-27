/**
 * Quiet exam marks for Sport and Rehab Learn / Quiz.
 * One finished activity keeps a check. The last activity left mid-way
 * shows Continue. No streaks, scores, or extra bars.
 */

export type RevisionId =
  | 'actions-learn'
  | 'actions-quiz'
  | 'ankle-learn'
  | 'ankle-quiz'
  | 'hamstring-learn'
  | 'hamstring-quiz'

export type RevisionState = {
  done: RevisionId[]
  /** The latest activity that has not been finished. */
  resume: { id: RevisionId; index: number } | null
}

export const EMPTY_REVISION: RevisionState = { done: [], resume: null }

const IDS: readonly RevisionId[] = [
  'actions-learn',
  'actions-quiz',
  'ankle-learn',
  'ankle-quiz',
  'hamstring-learn',
  'hamstring-quiz',
]

export function isRevisionId(value: unknown): value is RevisionId {
  return typeof value === 'string' && (IDS as readonly string[]).includes(value)
}

export function revisionId(kind: 'actions' | 'ankle' | 'hamstring', phase: 'learn' | 'quiz'): RevisionId {
  return `${kind}-${phase}` as RevisionId
}

export function parseRevision(raw: string | null): RevisionState {
  if (!raw) return { done: [], resume: null }
  try {
    const data = JSON.parse(raw) as { done?: unknown; resume?: { id?: unknown; index?: unknown } }
    const done = Array.isArray(data.done) ? data.done.filter(isRevisionId) : []
    const resumeId = data.resume?.id
    const resumeIndex = data.resume?.index
    const resume =
      isRevisionId(resumeId) && typeof resumeIndex === 'number' && Number.isInteger(resumeIndex) && resumeIndex >= 0
        ? { id: resumeId, index: resumeIndex }
        : null
    if (resume && done.includes(resume.id)) return { done, resume: null }
    return { done, resume }
  } catch {
    return { done: [], resume: null }
  }
}

/**
 * Learn is finished on the last card. Quiz is finished after the last question
 * (`index >= total`). A finished activity stays finished if it is opened again.
 */
export function noteRevision(
  state: RevisionState,
  id: RevisionId,
  index: number,
  total: number,
  phase: 'learn' | 'quiz',
): RevisionState {
  const done = new Set(state.done)
  const finished = phase === 'learn' ? total > 0 && index >= total - 1 : index >= total
  if (finished) {
    done.add(id)
    return {
      done: [...done],
      resume: state.resume?.id === id ? null : state.resume,
    }
  }
  if (done.has(id)) {
    return {
      done: [...done],
      resume: state.resume?.id === id ? null : state.resume,
    }
  }
  const at = Number.isFinite(index) ? Math.max(0, Math.floor(index)) : 0
  return { done: [...done], resume: { id, index: at } }
}

export function activityFace(
  state: RevisionState,
  id: RevisionId,
): { label: 'Learn' | 'Quiz' | 'Continue'; done: boolean } {
  const done = state.done.includes(id)
  const base = id.endsWith('-quiz') ? 'Quiz' : 'Learn'
  if (!done && state.resume?.id === id) return { label: 'Continue', done: false }
  return { label: base, done }
}
