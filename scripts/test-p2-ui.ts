/**
 * P2 UI refinement: Look in the quiz bar, exclusive Combined vs level,
 * tagline, sticky Start, one context label, prompt panel, Skip and Check.
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

assert(hud.includes('class="prompt-block panel"'), 'the prompt sits on a panel')
assert(block('.panel').includes('background: var(--surface-raised)'), 'panels use the raised surface')
assert(block('.panel').includes('backdrop-filter: blur(20px) saturate(140%)'), 'panels are raised glass')
assert(hud.includes('Skip · show answer'), 'Skip says show answer')
assert(!hud.includes("don't know"), 'the old Skip cue is gone')
assert(hud.includes('id="check-btn"'), 'desktop has a Check button')
assert(hud.includes('>Tap to type<'), 'type-it still starts as Tap to type')
assert(block('.check-btn').includes('background: var(--accent)'), 'Check is filled with the accent')
assert(block('.check-btn').includes('color: var(--text-on-accent)'), 'Check uses accent ink')
assert(block('.check-btn').includes('min-height: var(--target-min)'), 'Check is at least 44px')
assert(block('.menu-sheet-btn').includes('min-height: var(--target-min)'), 'menu sheet actions are at least 44px')
assert(cssBare.includes('html.touch-quiz .check-btn { display: none !important; }'), 'iPhone has no extra Check button')
assert(main.includes('enterkeyhint="go"'), 'phone Go / Enter still checks')
assert(main.includes("closest('#skip-btn, #check-btn')"), 'Check does not steal the type-it tap')

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
