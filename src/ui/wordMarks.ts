/** Copy and letter roles for the type-it / tap-it answer word. */

export type TapCueKind = 'type' | 'tap'

/** Type-it keeps "Tap to type". Tap and palpation use the model cue. */
export function tapCueFor(kind: TapCueKind): string {
  return kind === 'tap' ? 'Tap the model' : 'Tap to type'
}

export type PromptLevel = 'see' | 'hint' | 'memory'

/**
 * Class for a letter the learner has not typed yet.
 * Hint letters use the highlight role. See-it letters and blanks stay
 * on the text scale — never a low-alpha ghost.
 */
export function untypedLetterClass(
  level: PromptLevel,
  letterIndex: number,
): 'tw-hint' | 'tw-dim' | 'tw-blank' {
  if (level === 'hint' && letterIndex === 0) return 'tw-hint'
  if (level === 'see') return 'tw-dim'
  return 'tw-blank'
}

/** Icon plus a text name so a wrong answer is never colour alone. */
export function wrongMarkHtml(): string {
  return '<span class="tw-wrong-icon" role="img" aria-label="Wrong">✕</span>'
}
