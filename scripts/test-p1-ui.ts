/**
 * P1 UI refinement: tokens, type floor, selected state, primary fill,
 * lesson-card clearance, and the tap cue.
 * Run: npm test
 */
import { readFileSync } from 'node:fs'
import { tapCueFor, untypedLetterClass, wrongMarkHtml } from '../src/ui/wordMarks.ts'

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

const tokens = readFileSync(new URL('../src/tokens.css', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const main = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
const cssBare = css.replace(/\/\*[\s\S]*?\*\//g, '')

function decl(name: string): string | null {
  const match = tokens.match(new RegExp(`${name}:\\s*([^;]+);`))
  return match ? match[1].trim() : null
}

function block(selector: string): string {
  const re = /([^{}]+)\{([^{}]*)\}/g
  const exact: string[] = []
  const suffix: string[] = []
  for (const match of cssBare.matchAll(re)) {
    const selectors = match[1].split(',').map((item) => item.trim())
    if (selectors.includes(selector)) exact.push(match[2])
    else if (selectors.some((item) => item.endsWith(` ${selector}`))) suffix.push(match[2])
  }
  return (exact.length ? exact : suffix).join('\n')
}

const REQUIRED: Record<string, string> = {
  '--surface-base': '#0B0D12',
  '--surface-raised': 'rgba(21, 25, 34, 0.78)',
  '--surface-overlay': '#151922',
  '--border-subtle': 'rgba(255, 255, 255, 0.10)',
  '--text-primary': '#F2F4F8',
  '--text-secondary': '#B4BAC6',
  '--text-tertiary': '#8B93A1',
  '--accent': '#7CC4FF',
  '--text-on-accent': '#0B0D12',
  '--correct': '#4ADE9B',
  '--wrong': '#FF8A7A',
  '--highlight': '#FFD166',
  '--radius-sm': '10px',
  '--radius-md': '14px',
  '--radius-pill': '999px',
  '--space-1': '4px',
  '--space-2': '8px',
  '--space-3': '12px',
  '--space-4': '16px',
  '--space-5': '24px',
  '--space-6': '32px',
  '--type-caption': '13px',
  '--type-quiet': '11px',
  '--type-label': '14px',
  '--type-body': '17px',
  '--type-title': '22px',
  '--type-prompt-min': '28px',
  '--type-prompt-max': '34px',
  '--type-prompt-landscape': '24px',
  '--type-input': '16px',
  '--target-min': '44px',
  '--motion-fast': '150ms',
  '--motion-base': '250ms',
  '--ease-out': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
}

for (const [name, value] of Object.entries(REQUIRED)) {
  assert(decl(name)?.toLowerCase() === value.toLowerCase(), `${name} is ${value}`)
}

assert(decl('--pin-origin') !== null, 'origin pin token exists')
assert(decl('--pin-insertion') !== null, 'insertion pin token exists')
assert(decl('--bg') === 'var(--surface-base)', 'old --bg is only an alias')
assert(decl('--hud-dim') === 'var(--text-secondary)', 'old --hud-dim aliases a passing text colour')
assert(!cssBare.includes('--hud-dim'), 'style.css no longer uses --hud-dim')
assert(!cssBare.includes('--card-on'), 'style.css no longer uses the invert-white --card-on fill')
assert(!/#[0-9a-fA-F]{3,8}\b/.test(cssBare), 'no hex colours outside tokens.css')
assert(!/\brgba?\(/.test(cssBare), 'no rgb/rgba colours outside tokens.css')
assert(!/\bhsla?\(/.test(cssBare), 'no hsl/hsla colours outside tokens.css')

function checkLengths(value: string, where: string): void {
  const bare = value.replace(/var\(--[^)]+\)/g, '')
  for (const match of bare.matchAll(/(\d*\.?\d+)rem/g)) {
    const px = parseFloat(match[1]) * 16
    assert(px >= 13, `${where} rem ${match[1]} is at least 13px (got ${px})`)
  }
  for (const match of bare.matchAll(/(\d*\.?\d+)px/g)) {
    const px = parseFloat(match[1])
    assert(px >= 13, `${where} ${px}px is at least 13px`)
  }
}

for (const match of cssBare.matchAll(/font-size:\s*([^;]+);/g)) {
  checkLengths(match[1], 'font-size')
}
for (const match of cssBare.matchAll(/(?:^|[^\w-])font:\s*([^;]+);/g)) {
  checkLengths(match[1].split('/')[0] ?? '', 'font shorthand')
}

assert(
  block('html.touch-quiz .target-word').includes('var(--type-prompt-min)') &&
    block('html.touch-quiz .target-word').includes('var(--type-prompt-max)'),
  'touch answer word uses the 28–34px prompt clamp',
)
assert(
  block('html.touch-quiz.phone-landscape .target-word').includes('var(--type-prompt-landscape)'),
  'landscape answer word uses the 24px floor',
)
assert(block('.hidden-input').includes('font-size: var(--type-input)'), 'answer input stays at least 16px')
assert(block('.view-search').includes('font: 500 var(--type-input)'), 'search input stays at least 16px')
assert(block('.case-panel h2').includes('font-size: var(--type-title)'), 'lesson title is 22px')
assert(block('.case-body p').includes('font-size: var(--type-body)'), 'lesson body is 17px')
assert(block('.case-kicker').includes('font-size: var(--type-caption)'), 'lesson eyebrow is 13px')
assert(
  block('.footer-attr').includes('font-size: var(--type-caption)') &&
    block('.footer-attr').includes('color: var(--text-tertiary)'),
  'attribution is 13px tertiary',
)
assert(block('.tw-hint').includes('color: var(--highlight)'), 'hint letters use --highlight')
assert(block('.tw-dim').includes('color: var(--text-secondary)'), 'see-it letters use secondary text')
assert(block('.tw-blank').includes('color: var(--text-tertiary)'), 'blank letters use tertiary text')
assert(block('.tw-wrong').includes('color: var(--wrong)'), 'wrong letters use --wrong')
assert(block('.gloss-line.is-wrong::before').includes('content: "✕"'), 'wrong gloss has an icon')

const TARGETS = [
  '.skip-btn',
  '.filter-chip',
  '.session-chip',
  '.view-filter-btn',
  '.pill',
  '.case-btn',
  '.start-btn',
  '.mode-card',
  '.view-list-row',
  '.view-pick-chip',
  '.more-filters-toggle',
  '.view-panel-handle',
]
for (const selector of TARGETS) {
  assert(
    block(selector).includes('min-height: var(--target-min)'),
    `${selector} is at least 44px`,
  )
}
assert(!/min-height:\s*(?:[1-9]|[1-3][0-9]|4[0-3])px/.test(cssBare), 'no min-height under 44px')

const SELECTED = [
  '.mode-card--on',
  '.filter-chip--on',
  '.session-chip--on',
  '.view-filter-btn--on',
  '.view-list-row--on',
  '.view-pick-chip--on',
]
for (const selector of SELECTED) {
  const own = block(selector)
  const mark = block(`${selector}::before`) + block(`${selector}::after`)
  assert(own.includes('var(--accent)'), `${selector} uses the accent border`)
  assert(/content:\s*"✓"/.test(mark), `${selector} shows a check`)
  assert(!/background:\s*(?:#fff\b|#ffffff\b|white\b|var\(--card-on\))/.test(own), `${selector} is not invert-white`)
  assert(!/background:\s*var\(--accent\)/.test(own), `${selector} is not a solid accent fill`)
}

assert(block('.start-btn').includes('background: var(--accent)'), 'Start is filled with --accent')
assert(block('.start-btn').includes('color: var(--text-on-accent)'), 'Start text is the accent ink')
assert(block('.case-btn').includes('background: var(--accent)'), 'Next / Start quiz is filled with --accent')
assert(block('.case-btn').includes('color: var(--text-on-accent)'), 'primary lesson action uses accent ink')
assert(block('.case-btn--ghost').includes('background: transparent'), 'Back and Replay stay unfilled')
assert(
  !/background:\s*var\(--accent\)/.test(block('.case-btn--ghost')),
  'ghost lesson actions are not the primary fill',
)

assert(
  block('.case-body').includes('padding-bottom: calc(var(--target-min) + var(--space-4))'),
  'lesson body padding clears the action row',
)
assert(block('.case-body').includes('overflow-y: auto'), 'long lesson cards scroll')
assert(block('.case-body').includes('min-height: 0'), 'lesson body can shrink above the actions')

assert(cssBare.includes('var(--motion-fast)'), 'motion uses --motion-fast')
assert(cssBare.includes('var(--motion-base)'), 'motion uses --motion-base')
assert(css.includes('prefers-reduced-motion'), 'motion respects prefers-reduced-motion')
assert(css.includes('prefers-reduced-transparency'), 'glass falls back to an opaque surface')

assert(tapCueFor('type') === 'Tap to type', 'type-it cue stays Tap to type')
assert(tapCueFor('tap') === 'Tap the model', 'tap-it cue is Tap the model')
assert(tapCueFor('tap') !== tapCueFor('type'), 'tap and type cues differ')
assert(main.includes('tapCueFor(step?.kind === \'tap\' ? \'tap\' : \'type\')'), 'the HUD switches the cue per step')
assert(main.includes('>Tap to type<'), 'the type-it markup still starts as Tap to type')
assert(block('.tap-hint').includes('text-transform: uppercase'), 'the cue renders as TAP TO TYPE / TAP THE MODEL')

assert(untypedLetterClass('hint', 0) === 'tw-hint', 'first hint letter is the highlight class')
assert(untypedLetterClass('hint', 1) === 'tw-blank', 'later hint letters stay blanks')
assert(untypedLetterClass('see', 3) === 'tw-dim', 'see-it letters are shown, not blanks')
assert(untypedLetterClass('memory', 0) === 'tw-blank', 'memory shows no hint letter')
const mark = wrongMarkHtml()
assert(mark.includes('✕'), 'wrong mark includes an icon')
assert(mark.includes('aria-label="Wrong"'), 'wrong mark includes text')
assert(main.includes('wrongMarkHtml()'), 'the answer word renders the wrong mark')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} p1 ui tests failed`)
}
console.log(`${passed} passed`)
