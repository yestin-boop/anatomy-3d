/**
 * P2 UI refinement: Look in the quiz bar, exclusive Combined vs level,
 * tagline, sticky Start, one context label, prompt panel, and Skip.
 * Run: npm test
 */
import { readFileSync } from 'node:fs'
import {
  dimmedModes,
  isModeDimmed,
  isModeSelected,
  playableCount,
  progressRatio,
  quizContextLabel,
  startButtonLabel,
  startDisabledReason,
} from '../src/ui/quizHud.ts'

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

const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const main = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
const cssBare = css.replace(/\/\*[\s\S]*?\*\//g, '')

function block(selector: string): string {
  const re = /([^{}]+)\{([^{}]*)\}/g
  const exact: string[] = []
  for (const match of cssBare.matchAll(re)) {
    const selectors = match[1].split(',').map((item) => item.trim())
    if (selectors.includes(selector)) exact.push(match[2])
  }
  return exact.join('\n')
}

const menu = main.slice(main.indexOf('id="menu-overlay"'), main.indexOf('id="view-panel"'))
const chrome = main.slice(main.indexOf('id="chrome-top"'), main.indexOf('id="view-filters"'))
const hud = main.slice(main.indexOf('id="play-hud"'), main.indexOf('class="footer-bar"'))

assert(!menu.includes('data-look'), 'start menu has no Look toggle')
assert(!menu.includes('<h2>Look</h2>'), 'start menu has no Look heading')
assert(!menu.includes('>X-ray<'), 'start menu does not offer X-ray')
assert(menu.includes('Learn anatomy by seeing it, then typing it.'), 'tagline names anatomy, not only the skeleton')
assert(!menu.includes('learn the skeleton by typing it'), 'old skeleton-only tagline is gone')
assert(menu.includes('class="menu-scroll"'), 'menu sections sit in a scroll region')
assert(menu.includes('class="menu-start"'), 'Start has its own dock')
assert(menu.indexOf('class="menu-start"') > menu.indexOf('id="session-counts"'), 'Start dock follows the sections')
assert(menu.indexOf('id="start-btn"') > menu.indexOf('class="menu-start"'), 'Start button is in the dock')
assert(block('.menu-panel').includes('display: flex'), 'menu column is a flex stack')
assert(block('.menu-scroll').includes('overflow-y: auto'), 'menu sections scroll')
assert(block('.menu-scroll').includes('min-height: 0'), 'menu scroll can shrink above Start')
assert(block('.menu-start').includes('flex: 0 0 auto'), 'Start stays pinned under the scroll')
assert(main.includes('startButtonLabel('), 'Start label uses the live count')
assert(main.includes('startBtn.disabled'), 'Start disables when the count is 0')
assert(main.includes('id="start-reason"'), 'a reason is shown when Start is disabled')

assert(chrome.includes('id="quiz-look"'), 'Look sits in the in-quiz top bar')
assert(chrome.includes('data-look="xray"') && chrome.includes('data-look="solid"'), 'X-ray and Solid both remain')
assert(chrome.includes('id="quiz-context"'), 'top bar has one context label')
assert(!chrome.includes('id="pill-subject"') && !chrome.includes('id="pill-mode"'), 'the two competing pills are gone')
assert(chrome.includes('id="quiz-progress"'), 'top bar has a progress bar')
assert(chrome.includes('id="pill-round"'), 'the round count stays next to the bar')
assert(chrome.includes('id="menu-restart"') && chrome.includes('id="menu-change"'), 'Menu offers Restart and Change set')
assert(block('.quiz-progress').includes('height: 4px'), 'the progress bar is thin')
assert(block('.quiz-progress-fill').includes('background: var(--accent)'), 'progress uses the accent')

assert(hud.includes('class="prompt-block"'), 'the type-it prompt block remains')
assert(!hud.includes('prompt-block panel'), 'the type-it prompt is not wrapped in a card')
assert(block('.prompt-block').includes('background: transparent'), 'the type-it prompt has no card fill')
assert(block('.target-word').includes('text-shadow: var(--text-halo)'), 'the answer word stays readable without a card')
assert(block('.type-label').includes('text-shadow: var(--text-halo)'), 'the prompt label stays readable without a card')
assert(block('.prompt-block').includes('box-shadow: none'), 'the type-it prompt has no card shadow')
assert(!block('.prompt-block').includes('border-radius'), 'the type-it prompt is not a rounded card')
assert(block('.panel').includes('background: var(--surface-raised)'), 'menu sheets still use the raised surface')
assert(block('.panel').includes('backdrop-filter: blur(20px) saturate(140%)'), 'menu sheets stay raised glass')
assert(
  css.includes('top: calc(max(var(--space-3), env(safe-area-inset-top)) + var(--target-desktop) + var(--space-2) + var(--space-3))'),
  'desktop lesson column starts below the quiz bar',
)
assert(!cssBare.includes('top: max(var(--space-4), env(safe-area-inset-top))'), 'lesson card no longer sits on the quiz bar')
assert(css.includes('.chrome--top.is-view .chrome-context'), 'study view hides the context bar')
assert(css.includes('--study-panel'), 'the study list width is shared with the filter band')
assert(css.includes('var(--chrome-menu-clearance, 136px)'), 'study chips start after the menu button')
assert(css.includes('.footer-cluster'), 'licence and helper words share one stack')
assert(css.includes('font-size: var(--type-quiet)'), 'licence and helper words use the quiet size')
assert(css.includes('--target-compact'), 'phone View chips use a compact target')
assert(css.includes('.chrome--top.is-view .pill'), 'the View menu pill can shrink with the chips')
assert(main.includes('Open3D, CC BY-SA 4.0'), 'licence names Open3D alongside Z-Anatomy')
assert(!main.includes('Ankle ligaments from Z-Anatomy'), 'stale ankle-only Z-Anatomy credit is gone')
assert(hud.includes('Skip · show answer'), 'Skip says show answer')
assert(!hud.includes("don't know"), 'the old Skip cue is gone')
assert(!hud.includes('id="check-btn"') && !hud.includes('>Check<'), 'type-it has no Check button')
assert(!cssBare.includes('.check-btn'), 'Check button styles are gone')
assert(hud.includes('>Tap to type<'), 'type-it still starts as Tap to type')
assert(block('.menu-sheet-btn').includes('min-height: var(--target-min)'), 'menu sheet actions are at least 44px')
assert(block('.skip-btn').includes('min-height: var(--target-min)'), 'Skip is at least 44px')
assert(main.includes('enterkeyhint="go"'), 'phone Go / Enter still confirms a short alias')
assert(main.includes("e.key === 'Enter'"), 'Enter still confirms a short alias')
assert(main.includes('onConfirmAnswer()'), 'Enter still runs the confirm path')
assert(main.includes('bone.match(state.typed)'), 'live typing still auto-succeeds on a complete name')
assert(main.includes("bone.match(state.typed, 'confirm')"), 'Enter still accepts a short alias')
assert(main.includes('caseTypeMatches(cleaned)'), 'case type-it still auto-succeeds as you type')
assert(main.includes("caseTypeMatches(state.typed, 'confirm')"), 'case Enter still accepts a short alias')
assert(main.includes("closest('#skip-btn')"), 'Skip does not steal the type-it tap')
assert(!main.includes("closest('#skip-btn, #check-btn')"), 'Check is no longer in the type-it tap guard')

assert(isModeSelected('memory', 'memory'), 'the chosen level is selected')
assert(!isModeSelected('memory', 'combined'), 'Combined is clear while a level is selected')
assert(isModeDimmed('memory', 'combined'), 'Combined dims while a level is selected')
assert(!isModeDimmed('memory', 'see'), 'sibling levels are not dimmed as a second path')
assert(isModeSelected('combined', 'combined'), 'Combined is selected on its own')
assert(!isModeSelected('combined', 'hint'), 'a level clears when Combined is selected')
assert(dimmedModes('combined').join(',') === 'see,hint,memory', 'Combined dims every single level')
assert(dimmedModes('see').join(',') === 'combined', 'a level dims only Combined')
assert(main.includes('isModeDimmed(') && main.includes('isModeSelected('), 'the menu applies the exclusive mode state')
assert(block('.mode-card--dim').includes('opacity: 0.5'), 'the inactive path is dimmed')

assert(playableCount(40, 0) === 40, 'All deals the whole pool')
assert(playableCount(40, 8) === 8, 'a session cap limits the deal')
assert(playableCount(3, 8) === 3, 'a short pool is not padded')
assert(playableCount(0, 8) === 0, 'an empty pool deals nothing')
assert(startButtonLabel(12) === 'Start · 12 items', 'Start shows the live count')
assert(startButtonLabel(1) === 'Start · 1 item', 'a single item stays singular')
assert(startButtonLabel(0) === 'Start', 'an empty Start has no count')
assert(startDisabledReason(0) === 'Nothing matches these filters', 'empty Start explains why')
assert(startDisabledReason(4) === '', 'a live count needs no reason')

assert(quizContextLabel({ viewing: false, subject: 'rehab', activity: 'type' }) === 'Rehab · type it', 'rehab type-it is one label')
assert(quizContextLabel({ viewing: false, subject: 'rehab', activity: 'tap' }) === 'Rehab · tap it', 'rehab tap is one label')
assert(quizContextLabel({ viewing: false, subject: 'rehab', activity: 'learn' }) === 'Rehab · learn', 'rehab learn is one label')
assert(quizContextLabel({ viewing: false, subject: 'bones', activity: 'memory' }) === 'Bones · memory', 'a level names itself once')
assert(quizContextLabel({ viewing: false, subject: 'muscles', activity: 'learn' }) === 'Muscles · learn', 'Combined reads as learn')
assert(quizContextLabel({ viewing: true, subject: 'bones', activity: 'view' }) === 'Study · view', 'view mode is one label')
assert(progressRatio(3, 5) === 0.6, '3 / 5 fills the bar to 0.6')
assert(progressRatio(0, 5) === 0, 'an empty round leaves the bar empty')
assert(progressRatio(9, 5) === 1, 'the bar does not pass the end')

assert(main.includes('autocomplete="off"'), 'autocomplete stays off')
assert(main.includes('autocorrect="off"'), 'autocorrect stays off')
assert(main.includes('spellcheck="false"'), 'spellcheck stays off')
assert(main.includes('class="target-word"'), 'the big word is still the answer display')
assert(!hud.includes('<input') || hud.includes('class="hidden-input"'), 'the answer field stays hidden behind the word')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} p2 ui tests failed`)
}
console.log(`${passed} passed`)
