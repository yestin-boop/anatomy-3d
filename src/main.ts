import './style.css'
import { assetUrl } from './assetUrl'
import {
  AXIAL_BONES,
  BONE_PARTS,
  BONE_REGIONS,
  FILTER_PRESETS,
  answersMatch,
  applyPreset,
  filterBones,
  shuffle,
  type AxialBone,
  type BonePart,
  type BoneRegion,
  type FilterPreset,
} from './data/axialBones'
import {
  MUSCLES,
  MUSCLE_REGIONS,
  filterMuscles,
  muscleAnswersMatch,
  type Muscle,
  type MuscleRegion,
} from './data/muscles'
import { ThoraxScene } from './scene/ThoraxScene'
import { playCorrectChime, playKeyTap, playWrongTick, unlockAudio } from './audio/chime'
import { getBoneView, getMuscleView, type ViewAttachmentSite, type ViewSide } from './data/viewInfo'

/** Bonetype three-level model (+ Combined runs all back-to-back). */
type Level = 'see' | 'hint' | 'memory'
type PlayMode = 'combined' | Level

const LEVEL_ORDER: Level[] = ['see', 'hint', 'memory']
const LEVEL_LABEL: Record<Level, string> = {
  see: 'See it',
  hint: 'Hint',
  memory: 'Memory',
}
const REGION_LABEL: Record<BoneRegion, string> = {
  skull: 'SKULL',
  spine: 'SPINE',
  thorax: 'THORAX',
  upper: 'UPPER LIMB',
  lower: 'LOWER LIMB',
  pelvis: 'PELVIS',
}

const MUSCLE_REGION_LABEL: Record<MuscleRegion, string> = {
  neck_back: 'NECK & BACK',
  chest_abdomen: 'CHEST & ABDOMEN',
  shoulder_arm: 'SHOULDER & ARM',
  hip_thigh: 'HIP & THIGH',
  lower_leg: 'LOWER LEG',
}

type Subject = 'bones' | 'muscles'

/** Unified quiz entry so HUD / match / highlight share one path. */
type QuizEntry = {
  id: string
  displayName: string
  hint: string
  meshNames: string[]
  regionLabel: string
  aliases: string[]
  match: (typed: string) => boolean
}

const SESSION_COUNTS = [8, 12, 20, 0] as const // 0 = All

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <div class="stage"><canvas id="main-canvas"></canvas></div>
  <div class="side-views" id="side-views" hidden>
    <div class="side-view side-view--left"><canvas id="side-left"></canvas></div>
    <div class="side-view side-view--right"><canvas id="side-right"></canvas></div>
  </div>

  <div class="chrome chrome--top" id="chrome-top" hidden>
    <div class="chrome-left">
      <span class="pill pill--solid" id="pill-subject">Bones</span>
      <span class="pill" id="pill-mode">Learn</span>
    </div>
    <div class="chrome-center">
      <span><strong id="stat-acc">100%</strong> accuracy</span>
      <span><strong id="stat-progress">0 / 0</strong></span>
    </div>
    <div class="chrome-right">
      <button type="button" class="pill pill--btn" id="btn-menu-top" title="Menu">≡ menu</button>
      <span class="pill" id="pill-round">round 1/3</span>
    </div>
  </div>

  <div class="status" id="status">Loading skeleton…</div>

  <!-- Start menu (bonetype-style glass panel) -->
  <div class="menu-overlay" id="menu-overlay">
    <div class="menu-panel" id="menu-panel">
      <header class="menu-header">
        <h1>anatomy 3d</h1>
        <p class="menu-tag">learn the skeleton by typing it</p>
      </header>

      <section class="menu-section">
        <h2>Explore</h2>
        <button type="button" class="mode-card mode-card--wide" id="btn-view">
          <span class="mode-key">V</span>
          <div>
            <span class="mode-title">View</span>
            <span class="mode-sub">solid model · tap a bone or muscle for origin, insertion, and a short description</span>
          </div>
        </button>
      </section>

      <section class="menu-section">
        <h2>Subject</h2>
        <div class="mode-grid mode-grid--subjects">
          <button type="button" class="mode-card mode-card--on" data-subject="bones" id="subject-bones">
            <span class="mode-key">B</span>
            <span class="mode-title">Bones</span>
            <span class="mode-sub" id="subject-count">0 · 6 regions</span>
          </button>
          <button type="button" class="mode-card" data-subject="muscles" id="subject-muscles">
            <span class="mode-key">M</span>
            <span class="mode-title">Muscles</span>
            <span class="mode-sub" id="muscle-count">0 · 5 regions</span>
          </button>
        </div>
      </section>

      <section class="menu-section">
        <h2>Mode</h2>
        <button type="button" class="mode-card mode-card--wide" data-mode="combined" id="mode-combined">
          <span class="mode-key">L</span>
          <div>
            <span class="mode-title">Combined / Learn</span>
            <span class="mode-sub">all three levels back to back: see it → hint → memory</span>
          </div>
        </button>
        <div class="mode-grid mode-grid--levels">
          <button type="button" class="mode-card" data-mode="see">
            <span class="mode-title">Level 1: See it</span>
            <span class="mode-sub">full name shown</span>
          </button>
          <button type="button" class="mode-card" data-mode="hint">
            <span class="mode-title">Level 2: Hint</span>
            <span class="mode-sub">first letter + meaning</span>
          </button>
          <button type="button" class="mode-card mode-card--on" data-mode="memory" id="mode-memory">
            <span class="mode-title">Level 3: Memory</span>
            <span class="mode-sub">no hints</span>
          </button>
        </div>
      </section>

      <section class="menu-section">
        <div class="menu-section-head">
          <h2>Quick filters</h2>
          <span class="menu-count" id="pool-count">0 of 0 bones</span>
        </div>
        <div class="filter-bar filter-bar--presets" id="menu-presets"></div>
        <div class="filter-bar" id="menu-muscle-regions" hidden></div>
        <button type="button" class="more-filters-toggle" id="more-filters-toggle">More filters</button>
        <div class="more-filters" id="more-filters" hidden>
          <div class="filter-bar" id="menu-regions"></div>
          <div class="filter-bar filter-bar--parts" id="menu-parts"></div>
        </div>
      </section>

      <section class="menu-section">
        <h2>Per session</h2>
        <div class="session-row" id="session-counts"></div>
      </section>

      <button type="button" class="start-btn" id="start-btn">Start <kbd>↵</kbd></button>
    </div>
  </div>

  <!-- View-mode study panel -->
  <aside class="view-panel" id="view-panel" hidden>
    <div class="view-pick-stack" id="view-pick-stack" hidden>
      <div class="view-pick-stack-label" id="view-pick-stack-label">Also here</div>
      <div class="view-pick-chips" id="view-pick-chips" role="list"></div>
    </div>
    <button type="button" class="view-panel-handle" id="view-panel-toggle" aria-expanded="false">
      <span class="view-panel-handle-bar"></span>
      <span id="view-panel-handle-label">Tap a structure</span>
    </button>
    <div class="view-panel-body" id="view-panel-body">
      <p class="view-empty" id="view-empty">Tap a bone or muscle to see its name, attachments, and a short description. Tap again near the same spot to cycle through what is underneath, or pick from the also-here list. Drag to rotate, scroll to zoom. Tap empty space to clear.</p>
      <div class="view-card" id="view-card" hidden>
        <div class="view-kicker">
          <span id="view-kind"></span>
          <span class="view-dot">·</span>
          <span id="view-region"></span>
          <span id="view-side" class="view-side" hidden></span>
        </div>
        <h2 id="view-name"></h2>
        <p class="view-desc" id="view-desc"></p>
        <dl class="view-facts" id="view-facts"></dl>
        <p class="view-note" id="view-note" hidden>
          Labels mark the closest points between these BodyParts3D meshes at each named attachment — a close approximation, not a clinical landmark atlas.
        </p>
      </div>
    </div>
  </aside>

  <!-- In-play typing HUD -->
  <div class="hud" id="play-hud" hidden>
    <div class="prompt-block" id="prompt-block">
      <div class="type-label" id="type-label">TYPE IT · SPINE</div>
      <div class="target-word" id="target-word"></div>
      <div class="gloss-line" id="gloss-line"></div>
      <p class="tap-hint" id="tap-hint">Tap to type</p>
    </div>
  </div>

  <input
    id="hidden-input"
    class="hidden-input"
    type="text"
    autocomplete="off"
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    enterkeyhint="done"
    aria-label="Type the bone name"
  />

  <div class="footer-bar">
    <span class="footer-tips" id="footer-tips">TAB REVEAL · ESC MENU · DRAG ROTATE · SCROLL ZOOM</span>
    <span class="footer-meta" id="footer-meta">MODELS: PROCEDURAL · BODY PARTS 3D</span>
  </div>
  <div class="footer-attr">
    BodyParts3D, © The Database Center for Life Science / CC BY 4.0
  </div>
`

const mainCanvas = document.querySelector<HTMLCanvasElement>('#main-canvas')!
const sideLeft = document.querySelector<HTMLCanvasElement>('#side-left')!
const sideRight = document.querySelector<HTMLCanvasElement>('#side-right')!
const sideViews = document.querySelector<HTMLDivElement>('#side-views')!
const statusEl = document.querySelector<HTMLDivElement>('#status')!
const menuOverlay = document.querySelector<HTMLDivElement>('#menu-overlay')!
const playHud = document.querySelector<HTMLDivElement>('#play-hud')!
const chromeTop = document.querySelector<HTMLDivElement>('#chrome-top')!
const typeLabel = document.querySelector<HTMLDivElement>('#type-label')!
const targetWord = document.querySelector<HTMLDivElement>('#target-word')!
const glossLine = document.querySelector<HTMLDivElement>('#gloss-line')!
const promptBlock = document.querySelector<HTMLDivElement>('#prompt-block')!
const hiddenInput = document.querySelector<HTMLInputElement>('#hidden-input')!
const statAcc = document.querySelector<HTMLElement>('#stat-acc')!
const statProgress = document.querySelector<HTMLElement>('#stat-progress')!
const pillMode = document.querySelector<HTMLElement>('#pill-mode')!
const pillRound = document.querySelector<HTMLElement>('#pill-round')!
const poolCount = document.querySelector<HTMLElement>('#pool-count')!
const subjectCount = document.querySelector<HTMLElement>('#subject-count')!
const footerMeta = document.querySelector<HTMLElement>('#footer-meta')!
const menuRegions = document.querySelector<HTMLDivElement>('#menu-regions')!
const menuParts = document.querySelector<HTMLDivElement>('#menu-parts')!
const menuPresets = document.querySelector<HTMLDivElement>('#menu-presets')!
const menuMuscleRegions = document.querySelector<HTMLDivElement>('#menu-muscle-regions')!
const moreFilters = document.querySelector<HTMLDivElement>('#more-filters')!
const moreFiltersToggle = document.querySelector<HTMLButtonElement>('#more-filters-toggle')!
const muscleCountEl = document.querySelector<HTMLElement>('#muscle-count')!
const sessionCountsEl = document.querySelector<HTMLDivElement>('#session-counts')!
const startBtn = document.querySelector<HTMLButtonElement>('#start-btn')!
const pillSubject = document.querySelector<HTMLElement>('#pill-subject')!
const btnView = document.querySelector<HTMLButtonElement>('#btn-view')!
const viewPanel = document.querySelector<HTMLElement>('#view-panel')!
const viewPanelToggle = document.querySelector<HTMLButtonElement>('#view-panel-toggle')!
const viewPanelHandleLabel = document.querySelector<HTMLElement>('#view-panel-handle-label')!
const viewEmpty = document.querySelector<HTMLParagraphElement>('#view-empty')!
const viewCard = document.querySelector<HTMLDivElement>('#view-card')!
const viewKind = document.querySelector<HTMLElement>('#view-kind')!
const viewRegion = document.querySelector<HTMLElement>('#view-region')!
const viewSide = document.querySelector<HTMLElement>('#view-side')!
const viewName = document.querySelector<HTMLElement>('#view-name')!
const viewDesc = document.querySelector<HTMLParagraphElement>('#view-desc')!
const viewFacts = document.querySelector<HTMLDListElement>('#view-facts')!
const viewNote = document.querySelector<HTMLParagraphElement>('#view-note')!
const viewPickStack = document.querySelector<HTMLElement>('#view-pick-stack')!
const viewPickChips = document.querySelector<HTMLElement>('#view-pick-chips')!
const footerTips = document.querySelector<HTMLElement>('#footer-tips')!

const scene = new ThoraxScene({
  mainCanvas,
  sideCanvases: [sideLeft, sideRight],
})
;(window as unknown as { __anatomyScene: typeof scene }).__anatomyScene = scene

type QuizState = {
  playing: boolean
  viewing: boolean
  mode: PlayMode
  levels: Level[]
  levelIndex: number
  queue: QuizEntry[]
  index: number
  typed: string
  revealing: boolean
  correct: number
  attempts: number
  finished: boolean
  sessionCount: number // 0 = all
  subject: Subject
}

const selectedRegions = new Set<BoneRegion>(BONE_REGIONS.map((r) => r.id))
const selectedParts = new Set<BonePart>(BONE_PARTS.map((p) => p.id))
const selectedMuscleRegions = new Set<MuscleRegion>(MUSCLE_REGIONS.map((r) => r.id))
let activePreset: FilterPreset | 'custom' = 'all'
let moreFiltersOpen = false

const state: QuizState = {
  playing: false,
  viewing: false,
  mode: 'memory',
  levels: ['memory'],
  levelIndex: 0,
  queue: [],
  index: 0,
  typed: '',
  revealing: false,
  correct: 0,
  attempts: 0,
  finished: false,
  sessionCount: 0,
  subject: 'bones',
}

function filteredBones(): AxialBone[] {
  if (activePreset !== 'custom') {
    return applyPreset(activePreset).bones
  }
  return filterBones(selectedRegions, selectedParts)
}

function filteredMuscles(): Muscle[] {
  return filterMuscles(selectedMuscleRegions)
}

function boneToEntry(b: AxialBone): QuizEntry {
  return {
    id: b.id,
    displayName: b.displayName,
    hint: b.hint,
    meshNames: b.meshNames,
    regionLabel: REGION_LABEL[b.region],
    aliases: b.aliases,
    match: (typed) => answersMatch(typed, b),
  }
}

function muscleToEntry(m: Muscle): QuizEntry {
  return {
    id: m.id,
    displayName: m.displayName,
    hint: m.hint,
    meshNames: m.meshNames,
    regionLabel: MUSCLE_REGION_LABEL[m.region],
    aliases: m.aliases,
    match: (typed) => muscleAnswersMatch(typed, m),
  }
}

function filteredPool(): QuizEntry[] {
  if (state.subject === 'muscles') return filteredMuscles().map(muscleToEntry)
  return filteredBones().map(boneToEntry)
}

function currentLevel(): Level {
  return state.levels[state.levelIndex] ?? 'memory'
}

function current(): QuizEntry | null {
  return state.queue[state.index] ?? null
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function preferredAnswer(bone: QuizEntry): string {
  return bone.displayName
}

/** Letters only — spaces and punctuation do not move the caret. */
function compactLetters(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

/** First index in compact typed letters that is not a prefix of any accepted name, or -1. */
function firstWrongIndex(typed: string, aliases: string[]): number {
  const compact = compactLetters(typed)
  if (!compact) return -1
  const targets = aliases.map(compactLetters).filter(Boolean)
  if (targets.some((t) => t.startsWith(compact))) return -1
  let best = 0
  for (const t of targets) {
    let i = 0
    while (i < compact.length && i < t.length && compact[i] === t[i]) i++
    if (i > best) best = i
  }
  return best
}

function acceptedNames(bone: QuizEntry): string[] {
  return [bone.displayName, ...bone.aliases]
}

/** Progressive fill: typed prefix bright, wrong letters flagged, caret on the current letter. */
function renderTargetWord(bone: QuizEntry | null): void {
  if (!bone) {
    targetWord.innerHTML = `<span class="tw-done">Session complete</span>`
    targetWord.classList.add('reveal')
    return
  }
  if (state.revealing) {
    targetWord.classList.add('reveal')
    targetWord.innerHTML = `<span class="tw-done">${escapeHtml(bone.displayName)}</span>`
    return
  }
  targetWord.classList.remove('reveal')

  const answer = preferredAnswer(bone)
  const level = currentLevel()
  const compactTyped = compactLetters(state.typed)
  const wrongAt = firstWrongIndex(state.typed, acceptedNames(bone))
  const chars = [...answer]
  let html = ''
  let letterIdx = 0
  let caretPlaced = false

  for (const ch of chars) {
    if (/\s/.test(ch)) {
      html += `<span class="tw-space">&nbsp;</span>`
      continue
    }
    if (letterIdx < compactTyped.length) {
      const tch = compactTyped[letterIdx]!
      const wrong = wrongAt >= 0 && letterIdx >= wrongAt
      html += `<span class="${wrong ? 'tw-wrong' : 'tw-on'}">${escapeHtml(tch)}</span>`
    } else {
      let cls = 'tw-blank'
      let inner = '_'
      if (level === 'see' || (level === 'hint' && letterIdx === 0)) {
        cls = 'tw-dim'
        inner = escapeHtml(ch.toLowerCase())
      }
      if (!caretPlaced) {
        html += `<span class="${cls} tw-caret">${inner}</span>`
        caretPlaced = true
      } else {
        html += `<span class="${cls}">${inner}</span>`
      }
    }
    letterIdx++
  }

  if (compactTyped.length > letterIdx) {
    html += [...compactTyped.slice(letterIdx)]
      .map((ch) => `<span class="tw-wrong">${escapeHtml(ch)}</span>`)
      .join('')
  }
  if (!caretPlaced) html += `<span class="tw-cursor"></span>`
  targetWord.innerHTML = html
}

function updateGloss(bone: QuizEntry | null): void {
  const level = currentLevel()
  if (!bone || state.finished) {
    glossLine.textContent = ''
    glossLine.classList.remove('show')
    return
  }
  if (state.revealing || level === 'see' || level === 'hint') {
    glossLine.textContent = bone.hint
    glossLine.classList.add('show')
  } else {
    glossLine.textContent = ''
    glossLine.classList.remove('show')
  }
}

function updateHud(): void {
  const bone = current()
  const total = state.queue.length
  const level = currentLevel()
  const acc =
    state.attempts === 0 ? 100 : Math.round((state.correct / state.attempts) * 100)
  statAcc.textContent = `${acc}%`
  statProgress.textContent = state.finished
    ? `${total} / ${total}`
    : `${Math.min(state.index + 1, total)} / ${total}`

  const modeName =
    state.mode === 'combined' ? 'Learn' : LEVEL_LABEL[state.mode as Level]
  pillMode.textContent = modeName
  pillRound.textContent =
    state.mode === 'combined'
      ? `round ${state.levelIndex + 1}/${state.levels.length}`
      : LEVEL_LABEL[level]

  if (bone && !state.finished) {
    typeLabel.textContent = `TYPE IT · ${bone.regionLabel}`
  } else if (state.finished) {
    typeLabel.textContent = 'COMPLETE · TAP OR ESC FOR MENU'
  }
  pillSubject.textContent = state.subject === 'muscles' ? 'Muscles' : 'Bones'

  updateGloss(bone)
  renderTargetWord(bone)

  if (!state.revealing && document.activeElement === hiddenInput) {
    if (hiddenInput.value !== state.typed) hiddenInput.value = state.typed
  }
}

function applyTarget(): void {
  const bone = current()
  if (!bone) return
  scene.setTarget(bone.meshNames)
}

function focusInput(): void {
  window.setTimeout(() => {
    try {
      hiddenInput.focus({ preventScroll: true })
    } catch {
      hiddenInput.focus()
    }
  }, 0)
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

function showMenu(): void {
  if (state.viewing) {
    scene.exitView()
    state.viewing = false
  }
  state.playing = false
  state.revealing = false
  menuOverlay.hidden = false
  playHud.hidden = true
  viewPanel.hidden = true
  viewPanel.classList.remove('is-expanded')
  clearPickStack()
  chromeTop.hidden = true
  chromeTop.classList.remove('is-view')
  chromeTop.setAttribute('hidden', '')
  sideViews.hidden = true
  hiddenInput.value = ''
  statusEl.style.display = 'none'
  footerTips.textContent = 'TAB REVEAL · ESC MENU · DRAG ROTATE · SCROLL ZOOM'
  scene.setSubject(state.subject)
  scene.showMenuView()
  renderMenuFilters()
  updatePoolCount()
}


type PickEntry = {
  kind: 'bone' | 'muscle'
  id: string
  displayName: string
  regionLabel: string
  meshNames: string[]
}

function buildPickIndex(): Map<string, PickEntry> {
  const map = new Map<string, PickEntry>()
  const add = (entry: PickEntry) => {
    for (const name of entry.meshNames) {
      const prev = map.get(name)
      // Prefer the more specific entry when a mesh belongs to a group
      // (e.g. metacarpal3 over the combined "metacarpals").
      if (!prev || entry.meshNames.length < prev.meshNames.length) {
        map.set(name, entry)
      }
    }
  }
  for (const b of AXIAL_BONES) {
    add({
      kind: 'bone',
      id: b.id,
      displayName: b.displayName,
      regionLabel: REGION_LABEL[b.region],
      meshNames: b.meshNames,
    })
  }
  for (const m of MUSCLES) {
    add({
      kind: 'muscle',
      id: m.id,
      displayName: m.displayName,
      regionLabel: MUSCLE_REGION_LABEL[m.region],
      meshNames: m.meshNames,
    })
  }
  return map
}

const pickIndex = buildPickIndex()

function meshSide(name: string): ViewSide | null {
  if (name.startsWith('vertebra_')) return null
  if (/_l\d+$/.test(name) || name.endsWith('_l')) return 'l'
  if (/_r\d+$/.test(name) || name.endsWith('_r')) return 'r'
  return null
}

type ViewSelection = PickEntry & { side: ViewSide | null; clickedMesh: string }

function factRow(term: string, value: string): string {
  return `<div class="view-fact"><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(value)}</dd></div>`
}

function renderViewPanel(sel: ViewSelection | null): void {
  if (!sel) {
    viewEmpty.hidden = false
    viewCard.hidden = true
    viewNote.hidden = true
    viewPanelHandleLabel.textContent = 'Tap a structure'
    viewPanel.classList.remove('has-selection')
    return
  }
  viewEmpty.hidden = true
  viewCard.hidden = false
  viewPanel.classList.add('has-selection')
  viewKind.textContent = sel.kind === 'muscle' ? 'Muscle' : 'Bone'
  viewRegion.textContent = sel.regionLabel
  if (sel.side) {
    viewSide.hidden = false
    viewSide.textContent = sel.side === 'l' ? 'Left' : 'Right'
  } else {
    viewSide.hidden = true
    viewSide.textContent = ''
  }
  viewName.textContent = sel.displayName
  viewPanelHandleLabel.textContent = sel.displayName

  if (sel.kind === 'muscle') {
    const info = getMuscleView(sel.id)
    viewDesc.textContent = info?.description ?? sel.displayName
    const parts: string[] = []
    if (info?.origin) parts.push(factRow('Origin', info.origin))
    if (info?.insertion) parts.push(factRow('Insertion', info.insertion))
    if (info?.action) parts.push(factRow('Action', info.action))
    if (info?.innervation) parts.push(factRow('Innervation', info.innervation))
    viewFacts.innerHTML = parts.join('')
    viewNote.hidden = !info
  } else {
    const info = getBoneView(sel.id)
    viewDesc.textContent = info?.description ?? sel.displayName
    const parts: string[] = []
    if (info?.articulations) parts.push(factRow('Articulations', info.articulations))
    if (info?.features) parts.push(factRow('Notable features', info.features))
    viewFacts.innerHTML = parts.join('')
    viewNote.hidden = true
  }
}

function attachmentsFor(sel: ViewSelection): ViewAttachmentSite[] {
  if (sel.kind !== 'muscle') return []
  const info = getMuscleView(sel.id)
  if (!info) return []
  const side: ViewSide = sel.side ?? 'r'
  return info.sitesForSide(side)
}

function applyViewSelection(sel: ViewSelection | null): void {
  renderViewPanel(sel)
  if (!sel) {
    scene.clearViewSelection()
    return
  }
  scene.setViewSelection(sel.meshNames, attachmentsFor(sel))
}

function selectionKey(sel: { id: string; side: ViewSide | null }): string {
  return `${sel.id}:${sel.side ?? ''}`
}

/** Frame the clicked side only, so a bilateral muscle does not pull the camera out to both thighs. */
function meshesToFrame(sel: ViewSelection): string[] {
  if (!sel.side) return sel.meshNames
  const same = sel.meshNames.filter((n) => meshSide(n) === sel.side || meshSide(n) === null)
  return same.length > 0 ? same : [sel.clickedMesh]
}

function hitToSelection(meshName: string): ViewSelection | null {
  const entry = pickIndex.get(meshName)
  if (!entry) return null
  return { ...entry, side: meshSide(meshName), clickedMesh: meshName }
}

/** Collapse ray hits to unique catalog id + side, front to back. */
function stackFromHits(hits: { meshName: string }[]): ViewSelection[] {
  const stack: ViewSelection[] = []
  const seen = new Set<string>()
  for (const hit of hits) {
    const sel = hitToSelection(hit.meshName)
    if (!sel) continue
    const key = selectionKey(sel)
    if (seen.has(key)) continue
    seen.add(key)
    stack.push(sel)
  }
  return stack
}

const CYCLE_PX = 24
let pickStack: ViewSelection[] = []
let pickStackIndex = -1
let lastPickX = 0
let lastPickY = 0
let hasLastPick = false

function clearPickStack(): void {
  pickStack = []
  pickStackIndex = -1
  hasLastPick = false
  viewPickChips.replaceChildren()
  viewPickStack.hidden = true
}

function chipLabel(sel: ViewSelection): string {
  if (!sel.side) return sel.displayName
  return `${sel.displayName} · ${sel.side === 'l' ? 'L' : 'R'}`
}

function renderPickStack(stack: ViewSelection[], index: number): void {
  if (stack.length <= 1) {
    viewPickChips.replaceChildren()
    viewPickStack.hidden = true
    return
  }
  viewPickStack.hidden = false
  const html = stack
    .map((sel, i) => {
      const on = i === index
      return `<button type="button" class="view-pick-chip${on ? ' view-pick-chip--on' : ''}" data-stack-index="${i}" aria-pressed="${on}" role="listitem">${escapeHtml(chipLabel(sel))}</button>`
    })
    .join('')
  viewPickChips.innerHTML = html
}

function commitViewSelection(stack: ViewSelection[], index: number, clientX?: number, clientY?: number): void {
  const sel = stack[index]
  if (!sel) return
  pickStack = stack
  pickStackIndex = index
  if (clientX != null && clientY != null) {
    lastPickX = clientX
    lastPickY = clientY
    hasLastPick = true
  }
  applyViewSelection(sel)
  scene.frameViewSelection(meshesToFrame(sel))
  renderPickStack(stack, index)
  if (!viewPanel.classList.contains('is-expanded')) {
    // Auto-open the sheet on a new selection so the copy is readable.
    viewPanel.classList.add('is-expanded')
    viewPanelToggle.setAttribute('aria-expanded', 'true')
  }
}

function onViewPick(clientX: number, clientY: number): void {
  // After the camera eases to a selection, the same screen point is a
  // different ray. Cycle the saved stack instead of re-casting.
  if (hasLastPick && pickStack.length > 1 && pickStackIndex >= 0) {
    const dx = clientX - lastPickX
    const dy = clientY - lastPickY
    if (dx * dx + dy * dy <= CYCLE_PX * CYCLE_PX) {
      const next = (pickStackIndex + 1) % pickStack.length
      commitViewSelection(pickStack, next, clientX, clientY)
      return
    }
  }
  const hits = scene.pickAllAt(clientX, clientY)
  const stack = stackFromHits(hits)
  if (stack.length === 0) {
    applyViewSelection(null)
    clearPickStack()
    return
  }
  commitViewSelection(stack, 0, clientX, clientY)
}

async function startView(): Promise<void> {
  void unlockAudio()
  statusEl.style.display = ''
  statusEl.classList.remove('error')
  statusEl.textContent = 'Loading study model…'
  state.playing = false
  state.revealing = false
  state.viewing = true
  hiddenInput.value = ''
  menuOverlay.hidden = true
  playHud.hidden = true
  sideViews.hidden = true
  chromeTop.hidden = false
  chromeTop.removeAttribute('hidden')
  chromeTop.classList.add('is-view')
  pillSubject.textContent = 'Study'
  pillMode.textContent = 'View'
  footerTips.textContent = 'TAP TO SELECT · TAP AGAIN TO CYCLE · DRAG ROTATE · SCROLL ZOOM · ESC MENU'
  viewPanel.hidden = false
  viewPanel.classList.remove('is-expanded')
  viewPanelToggle.setAttribute('aria-expanded', 'false')
  clearPickStack()
  applyViewSelection(null)
  try {
    await scene.enterView()
  } catch (err) {
    console.error(err)
    statusEl.classList.add('error')
    statusEl.textContent = 'Failed to load study model'
    return
  }
  if (!state.viewing) return
  statusEl.style.display = 'none'
}

function levelsForMode(mode: PlayMode): Level[] {
  if (mode === 'combined') return [...LEVEL_ORDER]
  return [mode]
}

async function startSession(): Promise<void> {
  const pool = filteredPool()
  if (pool.length === 0) return
  void unlockAudio()

  if (state.subject === 'muscles') {
    statusEl.style.display = ''
    statusEl.textContent = 'Loading muscles…'
    await scene.setSubjectAsync('muscles')
    statusEl.style.display = 'none'
  } else {
    scene.setSubject('bones')
  }

  let queue = shuffle(pool)
  if (state.sessionCount > 0 && queue.length > state.sessionCount) {
    queue = queue.slice(0, state.sessionCount)
  }

  state.playing = true
  state.levels = levelsForMode(state.mode)
  state.levelIndex = 0
  state.queue = queue
  state.index = 0
  state.typed = ''
  state.revealing = false
  state.correct = 0
  state.attempts = 0
  state.finished = false
  hiddenInput.value = ''

  menuOverlay.hidden = true
  playHud.hidden = false
  chromeTop.hidden = false
  sideViews.hidden = false
  statusEl.style.display = 'none'

  applyTarget()
  updateHud()
  focusInput()
}

async function onCorrect(): Promise<void> {
  const bone = current()
  if (!bone || state.revealing) return
  state.revealing = true
  state.correct += 1
  state.attempts += 1
  playCorrectChime()
  hiddenInput.value = ''
  updateHud()
  await wait(900)
  state.revealing = false
  state.typed = ''
  hiddenInput.value = ''
  state.index += 1

  if (state.index >= state.queue.length) {
    if (state.levelIndex < state.levels.length - 1) {
      state.levelIndex += 1
      state.index = 0
      applyTarget()
      updateHud()
      focusInput()
      return
    }
    state.finished = true
    updateHud()
    return
  }
  applyTarget()
  updateHud()
  focusInput()
}

function onChar(ch: string): void {
  void unlockAudio()
  if (!state.playing) return
  if (state.finished) {
    showMenu()
    return
  }
  if (state.revealing) return
  const bone = current()
  if (!bone) return
  state.typed += ch
  if (firstWrongIndex(state.typed, acceptedNames(bone)) >= 0) playWrongTick()
  else playKeyTap()
  updateHud()
  if (bone.match(state.typed)) void onCorrect()
}

function onBackspace(): void {
  if (!state.playing || state.revealing || state.finished) return
  state.typed = state.typed.slice(0, -1)
  updateHud()
}

function revealAnswer(): void {
  if (!state.playing || state.revealing || state.finished) return
  const bone = current()
  if (!bone) return
  state.attempts += 1
  state.revealing = true
  state.typed = ''
  hiddenInput.value = ''
  updateHud()
  void (async () => {
    await wait(1400)
    state.revealing = false
    state.index += 1
    if (state.index >= state.queue.length) {
      if (state.levelIndex < state.levels.length - 1) {
        state.levelIndex += 1
        state.index = 0
        applyTarget()
        updateHud()
        focusInput()
        return
      }
      state.finished = true
      updateHud()
      return
    }
    applyTarget()
    updateHud()
    focusInput()
  })()
}

function updatePoolCount(): void {
  if (state.subject === 'muscles') {
    const n = filteredMuscles().length
    const total = MUSCLES.length
    poolCount.textContent = `${n} of ${total} muscles`
    muscleCountEl.textContent = `${total} · ${MUSCLE_REGIONS.length} regions`
    subjectCount.textContent = `${AXIAL_BONES.length} · ${BONE_REGIONS.length} regions`
  } else {
    const n = filteredBones().length
    const total = AXIAL_BONES.length
    poolCount.textContent = `${n} of ${total} bones`
    subjectCount.textContent = `${total} · ${BONE_REGIONS.length} regions`
    muscleCountEl.textContent = `${MUSCLES.length} · ${MUSCLE_REGIONS.length} regions`
  }
  const names = scene.listMeshNames()
  const ribN = names.filter((m) => m.startsWith('rib_')).length
  const musN = names.filter((m) =>
    m.startsWith('trap_') || m.startsWith('delt_') || m.startsWith('scm_') || m.startsWith('glut_'),
  ).length
  footerMeta.textContent = `MODELS: BODY PARTS 3D · ${names.length} MESHES · ${ribN} RIBS · ${MUSCLES.length} MUSCLES`
  void musN
}

function setPreset(preset: FilterPreset): void {
  activePreset = preset
  const { regions, parts } = applyPreset(preset)
  selectedRegions.clear()
  selectedParts.clear()
  for (const r of regions) selectedRegions.add(r)
  for (const p of parts) selectedParts.add(p)
}

function renderMenuFilters(): void {
  const isBones = state.subject === 'bones'
  menuPresets.hidden = !isBones
  menuMuscleRegions.hidden = isBones
  moreFiltersToggle.hidden = !isBones
  moreFilters.hidden = !isBones || !moreFiltersOpen
  moreFiltersToggle.textContent = moreFiltersOpen ? 'Hide filters' : 'More filters'
  moreFiltersToggle.classList.toggle('more-filters-toggle--open', moreFiltersOpen)

  // Subject cards
  document.querySelectorAll<HTMLButtonElement>('[data-subject]').forEach((btn) => {
    btn.classList.toggle('mode-card--on', btn.dataset.subject === state.subject)
  })

  // Bone presets
  menuPresets.innerHTML = ''
  if (isBones) {
    for (const { id, label } of FILTER_PRESETS) {
      const btn = document.createElement('button')
      btn.type = 'button'
      const on = activePreset === id
      btn.className = 'filter-chip filter-chip--preset' + (on ? ' filter-chip--on' : '')
      const n = applyPreset(id).bones.length
      btn.innerHTML = `<span>${label}</span><em>${n}</em>`
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        void unlockAudio()
        setPreset(id)
        renderMenuFilters()
        updatePoolCount()
      })
      menuPresets.appendChild(btn)
    }
  }

  // Muscle regions
  menuMuscleRegions.innerHTML = ''
  if (!isBones) {
    const allBtn = document.createElement('button')
    allBtn.type = 'button'
    const allOn = selectedMuscleRegions.size === MUSCLE_REGIONS.length
    allBtn.className = 'filter-chip' + (allOn ? ' filter-chip--on' : '')
    allBtn.innerHTML = `<span>All</span><em>${MUSCLES.length}</em>`
    allBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      for (const r of MUSCLE_REGIONS) selectedMuscleRegions.add(r.id)
      renderMenuFilters()
      updatePoolCount()
    })
    menuMuscleRegions.appendChild(allBtn)
    for (const { id, label } of MUSCLE_REGIONS) {
      const btn = document.createElement('button')
      btn.type = 'button'
      const n = MUSCLES.filter((m) => m.region === id).length
      btn.className = 'filter-chip' + (selectedMuscleRegions.has(id) ? ' filter-chip--on' : '')
      btn.innerHTML = `<span>${label}</span><em>${n}</em>`
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        void unlockAudio()
        if (selectedMuscleRegions.has(id)) {
          if (selectedMuscleRegions.size <= 1) return
          selectedMuscleRegions.delete(id)
        } else {
          selectedMuscleRegions.add(id)
        }
        if (filteredMuscles().length === 0) selectedMuscleRegions.add(id)
        renderMenuFilters()
        updatePoolCount()
      })
      menuMuscleRegions.appendChild(btn)
    }
  }

  // Advanced bone region/part
  const regionCounts: Record<string, number> = {}
  for (const b of AXIAL_BONES) {
    regionCounts[b.region] = (regionCounts[b.region] ?? 0) + 1
  }
  menuRegions.innerHTML = ''
  for (const { id, label } of BONE_REGIONS) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'filter-chip' + (selectedRegions.has(id) ? ' filter-chip--on' : '')
    btn.innerHTML = `<span>${label}</span><em>${regionCounts[id] ?? 0}</em>`
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      void unlockAudio()
      toggleRegion(id)
    })
    menuRegions.appendChild(btn)
  }

  menuParts.innerHTML = ''
  for (const { id, label } of BONE_PARTS) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className =
      'filter-chip filter-chip--part' + (selectedParts.has(id) ? ' filter-chip--on' : '')
    const preview = AXIAL_BONES.filter(
      (b) => selectedRegions.has(b.region) && b.part === id,
    ).length
    btn.innerHTML = `<span>${label}</span><em>${preview}</em>`
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      void unlockAudio()
      togglePart(id)
    })
    menuParts.appendChild(btn)
  }

  sessionCountsEl.innerHTML = ''
  for (const n of SESSION_COUNTS) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className =
      'session-chip' + (state.sessionCount === n ? ' session-chip--on' : '')
    btn.textContent = n === 0 ? 'All' : String(n)
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      state.sessionCount = n
      renderMenuFilters()
    })
    sessionCountsEl.appendChild(btn)
  }

  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((btn) => {
    btn.classList.toggle('mode-card--on', btn.dataset.mode === state.mode)
  })
}

function toggleRegion(id: BoneRegion): void {
  activePreset = 'custom'
  const wasOn = selectedRegions.has(id)
  if (wasOn) {
    if (selectedRegions.size <= 1) return
    selectedRegions.delete(id)
  } else {
    selectedRegions.add(id)
  }
  // Keep parts covering remaining bones so AND never empties
  const leftover = filterBones(selectedRegions, selectedParts)
  if (leftover.length === 0) {
    selectedParts.clear()
    for (const b of AXIAL_BONES) {
      if (selectedRegions.has(b.region)) selectedParts.add(b.part)
    }
  }
  if (filterBones(selectedRegions, selectedParts).length === 0) {
    if (wasOn) selectedRegions.add(id)
    else selectedRegions.delete(id)
  }
  renderMenuFilters()
  updatePoolCount()
}

function togglePart(id: BonePart): void {
  activePreset = 'custom'
  const wasOn = selectedParts.has(id)
  if (wasOn) {
    if (selectedParts.size <= 1) return
    selectedParts.delete(id)
  } else {
    selectedParts.add(id)
  }
  if (filterBones(selectedRegions, selectedParts).length === 0) {
    if (wasOn) selectedParts.add(id)
    else selectedParts.delete(id)
  }
  renderMenuFilters()
  updatePoolCount()
}

// Mode selection
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((btn) => {
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    void unlockAudio()
    state.mode = btn.dataset.mode as PlayMode
    renderMenuFilters()
  })
})

document.querySelectorAll<HTMLButtonElement>('[data-subject]').forEach((btn) => {
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    void unlockAudio()
    const next = btn.dataset.subject as Subject
    if (!next || next === state.subject) return
    state.subject = next
    void (async () => {
      if (next === 'muscles') {
        statusEl.style.display = ''
        statusEl.textContent = 'Loading muscles…'
        statusEl.classList.remove('error')
      }
      await scene.setSubjectAsync(next)
      statusEl.style.display = 'none'
      scene.showMenuView()
      renderMenuFilters()
      updatePoolCount()
    })()
  })
})

moreFiltersToggle.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  moreFiltersOpen = !moreFiltersOpen
  renderMenuFilters()
})

startBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startSession()
})

btnView.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startView()
})

viewPanelToggle.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  const open = !viewPanel.classList.contains('is-expanded')
  viewPanel.classList.toggle('is-expanded', open)
  viewPanelToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
})

viewPickChips.addEventListener('pointerdown', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-stack-index]')
  if (!btn) return
  e.preventDefault()
  e.stopPropagation()
  const index = Number(btn.dataset.stackIndex)
  if (!Number.isInteger(index) || !pickStack[index]) return
  commitViewSelection(pickStack, index)
})

document.querySelector('#btn-menu-top')!.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  showMenu()
})

window.addEventListener(
  'keydown',
  (e) => {
    if (e.key === 'Escape' && (state.playing || state.viewing)) {
      e.preventDefault()
      showMenu()
    }
  },
  true,
)

window.addEventListener('keydown', (e) => {
  void unlockAudio()
  if (e.key === 'Escape') {
    e.preventDefault()
    if (state.playing || state.viewing) showMenu()
    return
  }
  if (!state.playing && !state.viewing && (e.key === 'v' || e.key === 'V') && document.activeElement !== hiddenInput) {
    e.preventDefault()
    void startView()
    return
  }
  if (e.key === 'Tab' && state.playing) {
    e.preventDefault()
    revealAnswer()
    return
  }
  if (!state.playing) {
    if (state.viewing) return
    if (e.key === 'Enter') {
      e.preventDefault()
      void startSession()
    }
    return
  }
  if (e.metaKey || e.ctrlKey || e.altKey) return
  if (document.activeElement === hiddenInput && e.key !== 'Escape') {
    if (state.finished && e.key.length === 1) {
      e.preventDefault()
      showMenu()
    }
    return
  }
  if (state.finished) {
    e.preventDefault()
    showMenu()
    return
  }
  if (e.key === 'Backspace') {
    e.preventDefault()
    onBackspace()
    return
  }
  if (e.key.length === 1 && /[a-zA-Z0-9 \-]/.test(e.key)) {
    e.preventDefault()
    onChar(e.key.toLowerCase())
  }
})

hiddenInput.addEventListener('input', () => {
  void unlockAudio()
  if (!state.playing) {
    hiddenInput.value = ''
    return
  }
  if (state.finished) {
    hiddenInput.value = ''
    showMenu()
    return
  }
  if (state.revealing) {
    hiddenInput.value = ''
    return
  }
  const raw = hiddenInput.value
  const cleaned = raw.toLowerCase().replace(/[^a-z0-9 \-]/g, '')
  if (cleaned !== raw) hiddenInput.value = cleaned
  const bone = current()
  const prev = state.typed
  const added = compactLetters(cleaned).length > compactLetters(prev).length
  state.typed = cleaned
  if (added && bone && firstWrongIndex(state.typed, acceptedNames(bone)) >= 0) playWrongTick()
  else if (cleaned.length !== prev.length) playKeyTap()
  updateHud()
  if (bone && bone.match(state.typed)) void onCorrect()
})

hiddenInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') e.preventDefault()
})

promptBlock.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void unlockAudio()
  if (state.finished) {
    showMenu()
    return
  }
  focusInput()
})

const PICK_MOVE_PX = 12
let pointerStartX = 0
let pointerStartY = 0
let pointerIsPick = false

mainCanvas.addEventListener('pointerdown', (e) => {
  void unlockAudio()
  pointerStartX = e.clientX
  pointerStartY = e.clientY
  pointerIsPick = true
  if (state.playing) focusInput()
})

mainCanvas.addEventListener('pointermove', (e) => {
  if (!pointerIsPick) return
  const dx = e.clientX - pointerStartX
  const dy = e.clientY - pointerStartY
  if (dx * dx + dy * dy > PICK_MOVE_PX * PICK_MOVE_PX) pointerIsPick = false
})

mainCanvas.addEventListener('pointerup', (e) => {
  const wasPick = pointerIsPick
  pointerIsPick = false
  if (!wasPick || !state.viewing) return
  const dx = e.clientX - pointerStartX
  const dy = e.clientY - pointerStartY
  if (dx * dx + dy * dy > PICK_MOVE_PX * PICK_MOVE_PX) return
  onViewPick(e.clientX, e.clientY)
})

mainCanvas.addEventListener('pointercancel', () => {
  pointerIsPick = false
})

async function runQaMode(mode: string): Promise<void> {
  await wait(500)
  if (mode === 'menu' || mode === 'ribs') {
    showMenu()
    chromeTop.hidden = true
    if (mode === 'ribs') {
      menuOverlay.hidden = true
      scene.setTarget([
        'rib_l1','rib_r1','rib_l2','rib_r2','rib_l3','rib_r3','rib_l4','rib_r4',
        'rib_l5','rib_r5','rib_l6','rib_r6','rib_l7','rib_r7','rib_l8','rib_r8',
        'rib_l9','rib_r9','rib_l10','rib_r10','rib_l11','rib_r11','rib_l12','rib_r12',
        'sternum_body','sternum_manubrium','sternum_xiphoid',
      ])
      await wait(300)
      scene.freezeUprightProof()
      // Pull camera back a bit for full cage
      scene.showMenuView()
      scene.freezeUprightProof()
    } else {
      scene.freezeUprightProof()
      scene.showMenuView()
    }
    return
  }
  if (mode === 'typing') {
    state.subject = 'bones'
    state.mode = 'see'
    state.sessionCount = 8
    setPreset('spine_ribs')
    await startSession()
    const rib = state.queue.find((b) => b.id.startsWith('rib')) ?? state.queue[0]
    if (rib) {
      state.queue = [rib, ...state.queue.filter((b) => b !== rib)]
      state.index = 0
      state.typed = preferredAnswer(rib).replace(/\s+/g, '').slice(0, 3).toLowerCase()
      applyTarget()
      updateHud()
    }
    await wait(400)
  }
  if (mode === 'filters') {
    showMenu()
    chromeTop.hidden = true
    scene.freezeUprightProof()
    scene.showMenuView()
    return
  }
  if (mode === 'hand' || mode === 'bones-ul-ll') {
    state.subject = 'bones'
    setPreset(mode === 'hand' ? 'hand_wrist' : 'upper')
    state.mode = 'see'
    state.sessionCount = 6
    await startSession()
    await wait(500)
    scene.freezeUprightProof()
    return
  }
  if (mode === 'muscles' || mode === 'muscles-slice') {
    state.subject = 'muscles'
    scene.setSubject('muscles')
    for (const r of MUSCLE_REGIONS) selectedMuscleRegions.add(r.id)
    state.mode = 'see'
    state.sessionCount = 6
    await startSession()
    const deltoid = state.queue.find((b) => b.id === 'deltoid') ?? state.queue[0]
    if (deltoid) {
      state.queue = [deltoid, ...state.queue.filter((b) => b !== deltoid)]
      state.index = 0
      applyTarget()
      updateHud()
    }
    await wait(500)
    return
  }
  if (mode === 'view') {
    await startView()
    await wait(400)
    return
  }
}

void (async () => {
  try {
    await scene.load(assetUrl('models/thorax.glb'))
    statusEl.style.display = 'none'
    const names = scene.listMeshNames()
    const ribs = names.filter((k) => k.startsWith('rib_'))
    console.info('[skeleton] meshes', names.length, 'ribs', ribs.length)
    setPreset('all')
    subjectCount.textContent = `${AXIAL_BONES.length} · ${BONE_REGIONS.length} regions`
    muscleCountEl.textContent = `${MUSCLES.length} · ${MUSCLE_REGIONS.length} regions`
    showMenu()
    updatePoolCount()
    const qa = new URLSearchParams(location.search).get('qa')
    if (qa) await runQaMode(qa)
  } catch (err) {
    console.error(err)
    statusEl.classList.add('error')
    statusEl.textContent = 'Failed to load 3D model'
  }
})()
