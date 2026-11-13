/** Shared type-it matching for bones and muscles. */

export type AnswerMatchMode = 'live' | 'confirm'

/** Case/space/punctuation folding used by bone and muscle answers. */
export function normalizeAnswerText(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function compactAnswer(normalized: string): string {
  return normalized.replace(/\s+/g, '')
}

/**
 * Exact alias match with two timings:
 * - `confirm` (Enter / keyboard Done): any accepted alias, including short
 *   names that are a proper prefix of a longer accepted name.
 * - `live` (character-by-character): only aliases that are not a proper
 *   prefix of a longer accepted name for this item, plus the official
 *   display name so a complete official name still auto-succeeds when a
 *   longer alias such as "X muscle" or "manubrium of sternum" also exists.
 */
export function matchAliases(
  typed: string,
  aliases: readonly string[],
  mode: AnswerMatchMode,
  officialName: string,
  normalize: (raw: string) => string = normalizeAnswerText,
): boolean {
  const n = normalize(typed)
  if (!n) return false
  const compact = compactAnswer(n)
  const accepted = aliases
    .map((a) => {
      const na = normalize(a)
      return { spaced: na, compact: compactAnswer(na) }
    })
    .filter((a) => a.compact)

  const exact = accepted.some((a) => a.spaced === n || a.compact === compact)
  if (!exact) return false
  if (mode === 'confirm') return true

  const official = compactAnswer(normalize(officialName))
  if (official && compact === official) return true

  const prefixesLonger = accepted.some(
    (a) => a.compact !== compact && a.compact.startsWith(compact),
  )
  return !prefixesLonger
}
