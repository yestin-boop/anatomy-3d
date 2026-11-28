import { normalizeAnswerText } from './answerMatch'

/** Shown when a tapped choice is wrong and is not a known reject phrase. */
export const TYPE_CHOICE_WRONG = 'That is not the answer.'

/**
 * Stable order for one item. The official wording is not left in front,
 * and the same item keeps the same order between visits.
 */
export function orderTypeChoices(id: string, choices: readonly string[], official: string): string[] {
  const list = [...choices]
  if (list.length < 2) return list
  let seed = 2166136261
  for (let i = 0; i < id.length; i++) {
    seed ^= id.charCodeAt(i)
    seed = Math.imul(seed, 16777619)
  }
  const next = () => {
    seed ^= seed >>> 16
    seed = Math.imul(seed, 2246822507)
    seed ^= seed >>> 13
    seed = Math.imul(seed, 3266489909)
    seed ^= seed >>> 16
    return seed >>> 0
  }
  for (let i = list.length - 1; i > 0; i--) {
    const j = next() % (i + 1)
    const swap = list[i]!
    list[i] = list[j]!
    list[j] = swap
  }
  const officialKey = normalizeAnswerText(official)
  if (officialKey && normalizeAnswerText(list[0] ?? '') === officialKey) {
    list.push(list.shift()!)
  }
  return list
}

export function gradeTypeChoice(
  choice: string,
  official: string,
  rejectMessage: string | null,
): { ok: true; fill: string } | { ok: false; message: string } {
  const picked = normalizeAnswerText(choice)
  const name = normalizeAnswerText(official)
  if (picked && name && picked === name) return { ok: true, fill: official }
  const message = rejectMessage?.trim()
  return { ok: false, message: message || TYPE_CHOICE_WRONG }
}
