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
  filterCommonBones,
  shuffle,
  type AxialBone,
  type BonePart,
  type BoneRegion,
  type FilterPreset,
} from './data/axialBones'
import { type AnswerMatchMode } from './data/answerMatch'
import {
  MUSCLES,
  MUSCLE_REGIONS,
  filterCommonMuscles,
  filterMuscles,
  muscleAnswersMatch,
  muscleVisibleAtLayer,
  type Muscle,
  type MuscleRegion,
  type MuscleLayerFilter,
} from './data/muscles'
import { viewForBoneId, viewForMuscleId, type AnatomicalView } from './data/anatomicalViews'
import { CARTILAGE, type CartilageRegion } from './data/cartilage'
import { ThoraxScene, type FramingReport, type MaterialLook, type ViewSubjectFilter } from './scene/ThoraxScene'
import { ANKLE_INJURY_U } from './scene/anklePose'
import {
  ANKLE_LEARN,
  ANKLE_QUIZ,
  ankleTypeMatch,
  gradeAnkleTap,
  type AnkleQuizStep,
  type AnkleTypeStep,
} from './data/ankleSprain'
import {
  ACTION_LEARN,
  ACTION_QUIZ,
  actionTypeMatch,
  gradeActionTap,
  type ActionLearnCard,
  type ActionQuizStep,
  type ActionTypeStep,
  type StudyFocus,
} from './data/muscleActions'
import {
  HAMSTRING_LEARN,
  HAMSTRING_QUIZ,
  gradeHamstringTap,
  hamstringTypeMatch,
  type HamLearnCard,
  type HamQuizStep,
  type HamTypeStep,
} from './data/hamstringStrain'
import { insetsChanged, type FramingInsets } from './scene/framing'
import { playCorrectChime, playKeyTap, playWrongTick, unlockAudio } from './audio/chime'
import { getBoneView, getCartilageView, getMuscleView, type ViewAttachmentSite, type ViewSide } from './data/viewInfo'
import {
  armKeyboardSession,
  initialKeyboardSession,
  probeTouchQuiz,
  resolveKeyboardInset,
  sanitizeTypedInput,
  shouldUseNativeSoftKeyboard,
  type KeyboardSession,
  type KeyboardViewport,
} from './input/quizKeyboard'
import { tapCueFor, untypedLetterClass, wrongMarkHtml } from './ui/wordMarks'
import {
  isModeDimmed,
  isModeSelected,
  playableCount,
  progressRatio,
  quizContextLabel,
  startButtonLabel,
  startDisabledReason,
  type QuizActivity,
  type QuizSubject,
} from './ui/quizHud'

/** Bonetype three-level model (+ Combined runs all back-to-back). */
type Level = 'see' | 'hint' | 'memory'
type PlayMode = 'combined' | Level

const LEVEL_ORDER: Level[] = ['see', 'hint', 'memory']
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
  forearm_hand: 'FOREARM & HAND',
  hip_thigh: 'HIP & THIGH',
  lower_leg: 'LEG & FOOT',
}

const CARTILAGE_REGION_LABEL: Record<CartilageRegion, string> = {
  thorax: 'RIBS',
  spine: 'SPINE',
  nose: 'NOSE',
  larynx: 'LARYNX',
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
  match: (typed: string, mode?: AnswerMatchMode) => boolean
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
      <button type="button" class="pill pill--btn" id="btn-menu-top" title="Menu" aria-label="Menu" aria-expanded="false" aria-controls="menu-sheet">≡ <span class="menu-word">menu</span></button>
      <div class="menu-sheet panel" id="menu-sheet" hidden>
        <button type="button" class="menu-sheet-btn" id="menu-restart">Restart</button>
        <button type="button" class="menu-sheet-btn" id="menu-change">Change set</button>
      </div>
    </div>
    <div class="chrome-context panel" id="chrome-context">
      <span class="quiz-context" id="quiz-context">Bones · memory</span>
      <span class="quiz-meter" id="quiz-meter">
        <span class="quiz-progress" id="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" aria-label="Progress"><span class="quiz-progress-fill" id="quiz-progress-fill"></span></span>
        <span class="quiz-count" id="pill-round">0 / 0</span>
        <span class="quiz-round" id="quiz-round" hidden>round 1/3</span>
      </span>
    </div>
    <div class="chrome-center">
      <span><strong id="stat-acc">100%</strong> accuracy</span>
    </div>
    <div class="view-filter-group quiz-look" id="quiz-look" role="radiogroup" aria-label="Model look">
      <button type="button" class="view-filter-btn" data-look="xray">X-ray</button>
      <button type="button" class="view-filter-btn view-filter-btn--on" data-look="solid">Solid</button>
    </div>
  </div>

  <div class="view-filters" id="view-filters" hidden>
    <div class="view-filter-group" role="radiogroup" aria-label="Show bones or muscles">
      <button type="button" class="view-filter-btn view-filter-btn--on" data-view-subject="both">Both</button>
      <button type="button" class="view-filter-btn" data-view-subject="bones">Bones</button>
      <button type="button" class="view-filter-btn" data-view-subject="muscles">Muscles</button>
    </div>
    <div class="view-filter-group" id="view-layer-group" role="radiogroup" aria-label="Muscle layers">
      <button type="button" class="view-filter-btn view-filter-btn--on" data-view-layer="all">All</button>
      <button type="button" class="view-filter-btn" data-view-layer="mid">Mid</button>
      <button type="button" class="view-filter-btn" data-view-layer="deep">Deep</button>
    </div>
    <div class="view-filter-group" role="group" aria-label="Cartilage">
      <button type="button" class="view-filter-btn view-filter-btn--on" id="btn-view-cartilage" aria-pressed="true">Cartilage</button>
    </div>
    <div class="view-filter-group" id="look-group" role="radiogroup" aria-label="Model look">
      <button type="button" class="view-filter-btn" data-look="xray">X-ray</button>
      <button type="button" class="view-filter-btn view-filter-btn--on" data-look="solid">Solid</button>
    </div>
  </div>

  <div class="status" id="status">Loading skeleton…</div>

  <!-- Start menu (bonetype-style glass panel) -->
  <div class="menu-overlay" id="menu-overlay">
    <div class="menu-panel" id="menu-panel">
      <div class="menu-scroll" id="menu-scroll">
      <header class="menu-header">
        <h1>anatomy 3d</h1>
        <p class="menu-tag">Learn anatomy by seeing it, then typing it.</p>
      </header>

      <section class="menu-section">
        <h2>Explore</h2>
        <button type="button" class="mode-card mode-card--wide" id="btn-view">
          <span class="mode-key">V</span>
          <div>
            <span class="mode-title">View</span>
            <span class="mode-sub">solid model · search or tap a bone, muscle, or cartilage for a short description</span>
          </div>
        </button>
      </section>

      <section class="menu-section">
        <h2>Sport</h2>
        <div class="module-row" id="btn-muscle-actions">
          <div class="module-copy">
            <span class="mode-title">Muscle actions</span>
            <span class="mode-sub">lit muscle · joint motion with the muscle on the limb</span>
          </div>
          <div class="module-actions">
            <button type="button" class="module-btn" id="btn-muscle-actions-learn">Learn</button>
            <button type="button" class="module-btn module-btn--quiet" id="btn-muscle-actions-quiz">Quiz</button>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <h2>Rehab</h2>
        <div class="module-row" id="btn-ankle-case">
          <div class="module-copy">
            <span class="mode-title">Lateral ankle sprain</span>
            <span class="mode-sub">soccer cut · inversion and plantarflexion</span>
          </div>
          <div class="module-actions">
            <button type="button" class="module-btn" id="btn-ankle-case-learn">Learn</button>
            <button type="button" class="module-btn module-btn--quiet" id="btn-ankle-case-quiz">Quiz</button>
          </div>
        </div>
        <div class="module-row" id="btn-hamstring-case">
          <div class="module-copy">
            <span class="mode-title">Grade II hamstring strain</span>
            <span class="mode-sub">sprint · eccentric overload</span>
          </div>
          <div class="module-actions">
            <button type="button" class="module-btn" id="btn-hamstring-case-learn">Learn</button>
            <button type="button" class="module-btn module-btn--quiet" id="btn-hamstring-case-quiz">Quiz</button>
          </div>
        </div>
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
        <button type="button" class="mode-card mode-card--wide mode-card--dim" data-mode="combined" id="mode-combined" aria-pressed="false">
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
          <button type="button" class="mode-card mode-card--on" data-mode="memory" id="mode-memory" aria-pressed="true">
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
      </div>
      <div class="menu-start">
        <p class="start-reason" id="start-reason" hidden></p>
        <button type="button" class="start-btn" id="start-btn">Start</button>
      </div>
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
      <div class="view-finder">
        <label class="view-search-label" for="view-search">Find a structure</label>
        <input
          id="view-search"
          class="view-search"
          type="search"
          placeholder="Search bones, muscles, cartilage"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          enterkeyhint="search"
        />
        <div class="view-list" id="view-list" role="listbox" aria-label="Bones, muscles, and cartilage"></div>
      </div>
      <p class="view-empty" id="view-empty">Search the list or tap a bone, muscle, or cartilage to see its name, attachments, and a short description. Tap again near the same spot to cycle through what is underneath, or pick from the also-here list. Drag to rotate, two-finger or right-drag to pan, scroll to zoom. Use Both / Bones / Muscles, All / Mid / Deep, and the Cartilage chip to peel layers. Tap empty space to clear.</p>
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

  <aside class="case-panel" id="case-panel" hidden>
    <p class="case-kicker" id="case-kicker"></p>
    <h2 id="case-title"></h2>
    <div class="case-body" id="case-body"></div>
    <div class="case-actions">
      <button type="button" class="case-btn case-btn--ghost" id="case-back">Back</button>
      <button type="button" class="case-btn case-btn--ghost" id="case-replay" hidden>Replay the roll</button>
      <button type="button" class="case-btn" id="case-next">Next</button>
      <button type="button" class="case-btn case-btn--ghost" id="case-quiz-jump" hidden>Quiz</button>
    </div>
  </aside>

  <!-- In-play typing HUD -->
  <div class="hud" id="play-hud" hidden>
    <div class="prompt-block" id="prompt-block">
      <div class="type-label" id="type-label">TYPE IT · SPINE</div>
      <div class="type-field" id="type-field">
        <div class="target-word" id="target-word"></div>
        <input
          id="answer"
          name="anatomy-answer"
          class="hidden-input"
          type="text"
          inputmode="text"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          enterkeyhint="go"
          aria-label="Answer"
        />
      </div>
      <div class="gloss-line" id="gloss-line"></div>
      <p class="tap-hint" id="tap-hint">Tap to type</p>
      <div class="answer-actions">
        <button type="button" class="skip-btn" id="skip-btn">Skip · show answer</button>
        <button type="button" class="check-btn" id="check-btn">Check</button>
      </div>
    </div>
  </div>

  <div class="footer-cluster">
    <div class="footer-bar">
      <span class="footer-tips" id="footer-tips">SKIP / TAB REVEAL · ESC MENU · DRAG ROTATE · SCROLL ZOOM</span>
      <span class="footer-meta" id="footer-meta">MODELS: PROCEDURAL · BODY PARTS 3D</span>
    </div>
    <div class="footer-attr">
      <span>BodyParts3D, © The Database Center for Life Science / CC BY 4.0</span>
      <span class="footer-attr-sep"> · </span>
      <span>Some trunk muscles from Z-Anatomy / Écorché, CC BY-SA 4.0</span>
      <span class="footer-attr-sep"> · </span>
      <span>Ankle ligaments from Z-Anatomy, CC BY-SA 4.0</span>
    </div>
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
const skipBtn = document.querySelector<HTMLButtonElement>('#skip-btn')!
const tapHint = document.querySelector<HTMLParagraphElement>('#tap-hint')!
const hiddenInput = document.querySelector<HTMLInputElement>('#answer')!
const statAcc = document.querySelector<HTMLElement>('#stat-acc')!
const quizContext = document.querySelector<HTMLElement>('#quiz-context')!
const quizMeter = document.querySelector<HTMLElement>('#quiz-meter')!
const quizProgress = document.querySelector<HTMLElement>('#quiz-progress')!
const quizProgressFill = document.querySelector<HTMLElement>('#quiz-progress-fill')!
const pillRound = document.querySelector<HTMLElement>('#pill-round')!
const quizRound = document.querySelector<HTMLElement>('#quiz-round')!
const menuSheet = document.querySelector<HTMLElement>('#menu-sheet')!
const btnMenuTop = document.querySelector<HTMLButtonElement>('#btn-menu-top')!
const startReason = document.querySelector<HTMLElement>('#start-reason')!
const checkBtn = document.querySelector<HTMLButtonElement>('#check-btn')!
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
const btnView = document.querySelector<HTMLButtonElement>('#btn-view')!
const btnAnkleCase = document.querySelector<HTMLElement>('#btn-ankle-case')!
const btnMuscleActions = document.querySelector<HTMLElement>('#btn-muscle-actions')!
const btnHamstringCase = document.querySelector<HTMLElement>('#btn-hamstring-case')!
const btnAnkleLearn = document.querySelector<HTMLButtonElement>('#btn-ankle-case-learn')!
const btnAnkleQuiz = document.querySelector<HTMLButtonElement>('#btn-ankle-case-quiz')!
const btnMuscleLearn = document.querySelector<HTMLButtonElement>('#btn-muscle-actions-learn')!
const btnMuscleQuiz = document.querySelector<HTMLButtonElement>('#btn-muscle-actions-quiz')!
const btnHamstringLearn = document.querySelector<HTMLButtonElement>('#btn-hamstring-case-learn')!
const btnHamstringQuiz = document.querySelector<HTMLButtonElement>('#btn-hamstring-case-quiz')!
const casePanel = document.querySelector<HTMLElement>('#case-panel')!
const caseKicker = document.querySelector<HTMLElement>('#case-kicker')!
const caseTitle = document.querySelector<HTMLElement>('#case-title')!
const caseBody = document.querySelector<HTMLElement>('#case-body')!
const caseBack = document.querySelector<HTMLButtonElement>('#case-back')!
const caseReplay = document.querySelector<HTMLButtonElement>('#case-replay')!
const caseNext = document.querySelector<HTMLButtonElement>('#case-next')!
const caseQuizJump = document.querySelector<HTMLButtonElement>('#case-quiz-jump')!
const viewPanel = document.querySelector<HTMLElement>('#view-panel')!
const viewPanelToggle = document.querySelector<HTMLButtonElement>('#view-panel-toggle')!
const viewPanelHandleLabel = document.querySelector<HTMLElement>('#view-panel-handle-label')!
const viewEmpty = document.querySelector<HTMLParagraphElement>('#view-empty')!
const viewSearch = document.querySelector<HTMLInputElement>('#view-search')!
const viewList = document.querySelector<HTMLDivElement>('#view-list')!
const btnViewCartilage = document.querySelector<HTMLButtonElement>('#btn-view-cartilage')!
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
const viewFilters = document.querySelector<HTMLDivElement>('#view-filters')!
const viewLayerGroup = document.querySelector<HTMLDivElement>('#view-layer-group')!

/**
 * iPhone, iPad (including desktop-mode iPad), and other touch-primary devices
 * use the native OS keyboard. A physical keyboard still works on desktop,
 * and on iPad when the page itself receives keydown (external keyboards that
 * deliver keys without a focused field).
 */
const forceTouchFraming = new URLSearchParams(location.search).get('touch') === '1'
const touchQuiz = forceTouchFraming || shouldUseNativeSoftKeyboard(probeTouchQuiz(window, navigator))
if (touchQuiz) document.documentElement.classList.add('touch-quiz')

function isNarrowLayout(): boolean {
  return window.matchMedia('(max-width: 900px)').matches
}

const LOOK_KEY = 'anatomy-3d-material'

function loadLook(): MaterialLook {
  try {
    const v = localStorage.getItem(LOOK_KEY)
    if (v === 'xray' || v === 'solid') return v
  } catch {
    /* private mode */
  }
  return 'solid'
}

let currentLook: MaterialLook = loadLook()

function syncLookButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-look]').forEach((btn) => {
    const on = btn.dataset.look === currentLook
    if (btn.classList.contains('view-filter-btn')) btn.classList.toggle('view-filter-btn--on', on)
    if (btn.classList.contains('filter-chip')) btn.classList.toggle('filter-chip--on', on)
  })
}

function applyLook(look: MaterialLook): void {
  currentLook = look
  try {
    localStorage.setItem(LOOK_KEY, look)
  } catch {
    /* private mode */
  }
  scene.setLook(look)
  syncLookButtons()
}

const scene = new ThoraxScene({
  mainCanvas,
  sideCanvases: [sideLeft, sideRight],
})
;(window as unknown as { __anatomyScene: typeof scene }).__anatomyScene = scene

type CaseKind = 'ankle' | 'actions' | 'hamstring'

type QuizState = {
  playing: boolean
  viewing: boolean
  caseActive: boolean
  caseKind: CaseKind
  casePhase: 'learn' | 'quiz'
  caseLearnIndex: number
  caseQuizIndex: number
  caseTyping: boolean
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
/** Muscle Quick filters. Default All. Common ignores region chips until the user leaves it. */
let commonMusclesOnly = false
/** Bone Quick filters. Same Common-to-region behaviour as muscles. */
let commonBonesOnly = false
let activePreset: FilterPreset | 'custom' = 'all'
let moreFiltersOpen = false

/** Last learn card or quiz step whose 3D focus was applied. Keystrokes must not reframe. */
let appliedFocusId = ''

const state: QuizState = {
  playing: false,
  viewing: false,
  caseActive: false,
  caseKind: 'ankle',
  casePhase: 'learn',
  caseLearnIndex: 0,
  caseQuizIndex: 0,
  caseTyping: false,
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

function syncFooterTips(): void {
  const narrow = isNarrowLayout()
  if (state.viewing) {
    footerTips.textContent = narrow
      ? 'TAP TO SELECT · DRAG ROTATE · PINCH ZOOM'
      : 'SEARCH OR TAP TO SELECT · TAP AGAIN TO CYCLE · DRAG ROTATE · TWO-FINGER / RIGHT-DRAG PAN · SCROLL ZOOM · ESC MENU'
  } else {
    footerTips.textContent = narrow
      ? 'DRAG ROTATE · PINCH ZOOM · ESC MENU'
      : 'SKIP / TAB REVEAL · ESC MENU · DRAG ROTATE · SCROLL ZOOM'
  }
}

syncFooterTips()

function filteredBones(): AxialBone[] {
  if (commonBonesOnly) return filterCommonBones()
  if (activePreset !== 'custom') {
    return applyPreset(activePreset).bones
  }
  return filterBones(selectedRegions, selectedParts)
}

function filteredMuscles(): Muscle[] {
  if (commonMusclesOnly) return filterCommonMuscles()
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
    match: (typed, mode = 'live') => answersMatch(typed, b, mode),
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
    match: (typed, mode = 'live') => muscleAnswersMatch(typed, m, mode),
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
  let sawWrong = false

  for (const ch of chars) {
    if (/\s/.test(ch)) {
      html += `<span class="tw-space">&nbsp;</span>`
      continue
    }
    if (letterIdx < compactTyped.length) {
      const tch = compactTyped[letterIdx]!
      const wrong = wrongAt >= 0 && letterIdx >= wrongAt
      if (wrong) sawWrong = true
      html += `<span class="${wrong ? 'tw-wrong' : 'tw-on'}">${escapeHtml(tch)}</span>`
    } else {
      const cls = untypedLetterClass(level, letterIdx)
      const inner = cls === 'tw-blank' ? '_' : escapeHtml(ch.toLowerCase())
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
    sawWrong = true
    html += [...compactTyped.slice(letterIdx)]
      .map((ch) => `<span class="tw-wrong">${escapeHtml(ch)}</span>`)
      .join('')
  }
  if (!caretPlaced) html += `<span class="tw-cursor"></span>`
  targetWord.innerHTML = (sawWrong ? wrongMarkHtml() : '') + html
}

function updateGloss(bone: QuizEntry | null): void {
  const level = currentLevel()
  if (!bone || state.finished) {
    glossLine.textContent = ''
    glossLine.classList.remove('show', 'is-wrong')
    return
  }
  glossLine.classList.remove('is-wrong')
  if (state.revealing || level === 'see' || level === 'hint') {
    glossLine.textContent = bone.hint
    glossLine.classList.add('show')
  } else {
    glossLine.textContent = ''
    glossLine.classList.remove('show')
  }
}

function quizActivity(): QuizActivity {
  if (state.viewing && !state.caseActive && !state.playing) return 'view'
  if (state.caseActive) {
    if (state.finished) return 'complete'
    if (state.casePhase === 'learn') return 'learn'
    return currentCaseStep()?.kind === 'tap' ? 'tap' : 'type'
  }
  if (state.finished) return 'complete'
  if (state.mode === 'combined') return 'learn'
  return currentLevel()
}

function quizSubject(): QuizSubject {
  if (state.caseActive && state.caseKind === 'actions') return 'sport'
  if (state.caseActive) return 'rehab'
  return state.subject
}

function isStudyCase(): boolean {
  return state.caseKind === 'actions' || state.caseKind === 'hamstring'
}

function caseLearnTotal(): number {
  if (state.caseKind === 'actions') return ACTION_LEARN.length
  if (state.caseKind === 'hamstring') return HAMSTRING_LEARN.length
  return ANKLE_LEARN.length
}

function caseQuizTotal(): number {
  if (state.caseKind === 'actions') return ACTION_QUIZ.length
  if (state.caseKind === 'hamstring') return HAMSTRING_QUIZ.length
  return ANKLE_QUIZ.length
}

/** One context label, a thin bar, and the round count. Not two pills. */
function syncChromeContext(): void {
  const viewing = state.viewing && !state.playing && !state.caseActive
  quizContext.textContent = quizContextLabel({
    viewing,
    subject: viewing ? 'bones' : quizSubject(),
    activity: quizActivity(),
  })

  let shown = 0
  let total = 0
  let roundLabel = ''
  if (state.caseActive) {
    if (state.casePhase === 'learn') {
      total = caseLearnTotal()
      shown = Math.min(state.caseLearnIndex + 1, total)
    } else {
      total = caseQuizTotal()
      shown = state.finished ? total : Math.min(state.caseQuizIndex + 1, total)
    }
  } else if (!viewing) {
    total = state.queue.length
    shown = state.finished ? total : Math.min(state.index + (total > 0 ? 1 : 0), total)
    if (state.playing && state.mode === 'combined' && state.levels.length > 0) {
      roundLabel = `round ${state.levelIndex + 1}/${state.levels.length}`
    }
  }

  const ratio = progressRatio(shown, total)
  quizProgressFill.style.width = `${Math.round(ratio * 1000) / 10}%`
  quizProgress.setAttribute('aria-valuemax', String(total))
  quizProgress.setAttribute('aria-valuenow', String(shown))
  pillRound.textContent = `${shown} / ${total}`
  quizRound.hidden = roundLabel.length === 0
  quizRound.textContent = roundLabel
  quizMeter.hidden = viewing
  document.documentElement.classList.toggle(
    'case-learn',
    state.caseActive && state.casePhase === 'learn',
  )
}

function updateHud(): void {
  if (state.caseActive) {
    renderCaseHud()
    return
  }
  const bone = current()
  const acc =
    state.attempts === 0 ? 100 : Math.round((state.correct / state.attempts) * 100)
  statAcc.textContent = `${acc}%`
  syncChromeContext()

  if (bone && !state.finished) {
    typeLabel.textContent = `TYPE IT · ${bone.regionLabel}`
  } else if (state.finished) {
    typeLabel.textContent = 'COMPLETE · TAP OR ESC FOR MENU'
  }

  updateGloss(bone)
  renderTargetWord(bone)
  syncSkipButton()

  if (!state.revealing && document.activeElement === hiddenInput) {
    if (hiddenInput.value !== state.typed) hiddenInput.value = state.typed
  }
  syncTapHint()
  scheduleFramingSync()
}

function catalogViewFor(kind: 'bone' | 'muscle' | 'cartilage', id: string): AnatomicalView {
  if (kind === 'muscle') return viewForMuscleId(id)
  if (kind === 'bone') return viewForBoneId(id)
  return 'anterior'
}

function applyTarget(): void {
  const bone = current()
  if (!bone) return
  syncFramingInsetsNow()
  const kind = state.subject === 'muscles' ? 'muscle' : 'bone'
  scene.setTarget(bone.meshNames, catalogViewFor(kind, bone.id))
}

function quizInputShouldFocus(): boolean {
  if (state.caseActive) return state.caseTyping && !state.finished && !playHud.hidden
  return state.playing && !state.finished && !playHud.hidden
}

function focusInputNow(): void {
  if (!quizInputShouldFocus()) return
  if (document.activeElement === hiddenInput) return
  try {
    hiddenInput.focus({ preventScroll: true })
  } catch {
    hiddenInput.focus()
  }
}

function focusInput(): void {
  if (!quizInputShouldFocus()) return
  // Touch needs a synchronous focus when we still have a user gesture
  // (Start, tap-to-type). A timeout here would drop that gesture on iOS
  // and the keyboard would never rise. Desktop keeps the tick so the HUD
  // can paint first, matching the previous physical-keyboard path.
  if (touchQuiz) {
    focusInputNow()
    return
  }
  window.setTimeout(() => focusInputNow(), 0)
}

/** Show the tap cue on touch only when the system keyboard is not up. */
function syncTapHint(): void {
  const step = state.caseActive && state.casePhase === 'quiz' ? currentCaseStep() : null
  tapHint.textContent = tapCueFor(step?.kind === 'tap' ? 'tap' : 'type')
  const show =
    touchQuiz &&
    state.playing &&
    !playHud.hidden &&
    !state.finished &&
    !state.revealing &&
    document.activeElement !== hiddenInput
  tapHint.classList.toggle('is-visible', show)
}

function blurQuizInput(): void {
  hiddenInput.blur()
  syncTapHint()
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

function showMenu(): void {
  if (state.caseActive || scene.isAnkleCase() || scene.isStudyCase()) {
    scene.exitAnkleCase()
    scene.exitStudyCase()
    state.caseActive = false
    state.caseTyping = false
    state.caseKind = 'ankle'
    appliedFocusId = ''
    document.documentElement.classList.remove('ankle-case', 'study-quiet', 'case-learn')
    caseReplay.textContent = 'Replay the roll'
    targetWord.classList.remove('is-long')
  }
  if (state.viewing) {
    scene.exitView()
    state.viewing = false
  }
  state.playing = false
  state.revealing = false
  casePanel.hidden = true
  menuOverlay.hidden = false
  playHud.hidden = true
  viewPanel.hidden = true
  viewPanel.classList.remove('is-expanded')
  clearPickStack()
  chromeTop.hidden = true
  chromeTop.classList.remove('is-view', 'is-sheet')
  chromeTop.setAttribute('hidden', '')
  setMenuSheet(false)
  viewFilters.hidden = true
  viewFilters.classList.remove('is-quiz')
  sideViews.hidden = true
  hiddenInput.value = ''
  blurQuizInput()
  statusEl.style.display = 'none'
  syncFooterTips()
  syncSkipButton()
  scene.clearTarget()
  scene.setSubject(state.subject)
  scene.showMenuView()
  renderMenuFilters()
  updatePoolCount()
  syncFramingInsetsNow()
}


type StructureKind = 'bone' | 'muscle' | 'cartilage'

type PickEntry = {
  kind: StructureKind
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
  for (const c of CARTILAGE) {
    add({
      kind: 'cartilage',
      id: c.id,
      displayName: c.displayName,
      regionLabel: CARTILAGE_REGION_LABEL[c.region],
      meshNames: c.meshNames,
    })
  }
  return map
}

const pickIndex = buildPickIndex()

type ListEntry = PickEntry & { aliases: string[]; hay: string }

function normalizeSearch(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function buildListEntries(): ListEntry[] {
  const out: ListEntry[] = []
  const add = (entry: PickEntry, aliases: string[]) => {
    out.push({
      ...entry,
      aliases,
      hay: normalizeSearch([entry.displayName, entry.id, entry.regionLabel, ...aliases].join(' ')),
    })
  }
  for (const b of AXIAL_BONES) {
    add(
      {
        kind: 'bone',
        id: b.id,
        displayName: b.displayName,
        regionLabel: REGION_LABEL[b.region],
        meshNames: b.meshNames,
      },
      b.aliases,
    )
  }
  for (const m of MUSCLES) {
    add(
      {
        kind: 'muscle',
        id: m.id,
        displayName: m.displayName,
        regionLabel: MUSCLE_REGION_LABEL[m.region],
        meshNames: m.meshNames,
      },
      m.aliases,
    )
  }
  for (const c of CARTILAGE) {
    add(
      {
        kind: 'cartilage',
        id: c.id,
        displayName: c.displayName,
        regionLabel: CARTILAGE_REGION_LABEL[c.region],
        meshNames: c.meshNames,
      },
      c.aliases,
    )
  }
  return out
}

const listEntries = buildListEntries()
const listEntryByKey = new Map(listEntries.map((e) => [`${e.kind}:${e.id}`, e]))

const LIST_GROUPS: { kind: StructureKind; label: string }[] = [
  { kind: 'bone', label: 'Bones' },
  { kind: 'muscle', label: 'Muscles' },
  { kind: 'cartilage', label: 'Cartilage' },
]

let viewSearchQuery = ''
let listSelectionKey = ''

function entryMatches(entry: ListEntry, q: string): boolean {
  if (!q) return true
  return entry.hay.includes(q)
}

function renderViewList(): void {
  const q = normalizeSearch(viewSearchQuery)
  const groups = LIST_GROUPS.map((g) => ({
    ...g,
    items: listEntries.filter((e) => e.kind === g.kind && entryMatches(e, q)),
  })).filter((g) => g.items.length > 0)

  if (groups.length === 0) {
    viewList.innerHTML = '<p class="view-list-empty">No matches</p>'
    return
  }

  viewList.innerHTML = groups
    .map((g) => {
      const rows = g.items
        .map((e) => {
          const key = `${e.kind}:${e.id}`
          const on = key === listSelectionKey
          return `<button type="button" class="view-list-row${on ? ' view-list-row--on' : ''}" role="option" aria-selected="${on}" data-list-kind="${e.kind}" data-list-id="${escapeHtml(e.id)}">${escapeHtml(e.displayName)}</button>`
        })
        .join('')
      return `<section class="view-list-group"><h3 class="view-list-heading">${g.label} <span>${g.items.length}</span></h3><div class="view-list-rows">${rows}</div></section>`
    })
    .join('')
}

function highlightViewList(sel: ViewSelection | null): void {
  listSelectionKey = sel ? `${sel.kind}:${sel.id}` : ''
  renderViewList()
}

function revealStructureFromList(entry: ListEntry): void {
  let filtersChanged = false
  if (entry.kind === 'muscle' && viewSubjectFilter === 'bones') {
    viewSubjectFilter = 'both'
    filtersChanged = true
  }
  if (entry.kind === 'bone' && viewSubjectFilter === 'muscles') {
    viewSubjectFilter = 'both'
    filtersChanged = true
  }
  if (entry.kind === 'cartilage' && !viewCartilageVisible) {
    viewCartilageVisible = true
    filtersChanged = true
  }
  if (entry.kind === 'muscle' && muscleLayerFilter !== 'all') {
    const hidden = entry.meshNames.some((n) => !muscleVisibleAtLayer(n, muscleLayerFilter))
    if (hidden) {
      muscleLayerFilter = 'all'
      filtersChanged = true
    }
  }
  if (filtersChanged) {
    scene.setViewDisplay({
      subjectFilter: viewSubjectFilter,
      muscleLayer: muscleLayerFilter,
      cartilageVisible: viewCartilageVisible,
    })
    syncViewFilterButtons()
  }
  const sel: ViewSelection = {
    kind: entry.kind,
    id: entry.id,
    displayName: entry.displayName,
    regionLabel: entry.regionLabel,
    meshNames: entry.meshNames,
    side: null,
    clickedMesh: entry.meshNames[0] ?? entry.id,
  }
  commitViewSelection([sel], 0)
}

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
    highlightViewList(null)
    return
  }
  viewEmpty.hidden = true
  viewCard.hidden = false
  viewPanel.classList.add('has-selection')
  viewKind.textContent = sel.kind === 'muscle' ? 'Muscle' : sel.kind === 'cartilage' ? 'Cartilage' : 'Bone'
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
  } else if (sel.kind === 'cartilage') {
    const info = getCartilageView(sel.id)
    viewDesc.textContent = info?.description ?? sel.displayName
    const parts: string[] = []
    if (info?.articulations) parts.push(factRow('Articulations', info.articulations))
    if (info?.features) parts.push(factRow('Notable features', info.features))
    viewFacts.innerHTML = parts.join('')
    viewNote.hidden = true
  } else {
    const info = getBoneView(sel.id)
    viewDesc.textContent = info?.description ?? sel.displayName
    const parts: string[] = []
    if (info?.articulations) parts.push(factRow('Articulations', info.articulations))
    if (info?.features) parts.push(factRow('Notable features', info.features))
    viewFacts.innerHTML = parts.join('')
    viewNote.hidden = true
  }
  highlightViewList(sel)
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
  scene.setViewSelection(meshesToFrame(sel), attachmentsFor(sel))
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
let viewSubjectFilter: ViewSubjectFilter = 'both'
let muscleLayerFilter: MuscleLayerFilter = 'all'
let viewCartilageVisible = true

function syncViewFilterButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-view-subject]').forEach((btn) => {
    btn.classList.toggle('view-filter-btn--on', btn.dataset.viewSubject === viewSubjectFilter)
  })
  document.querySelectorAll<HTMLButtonElement>('[data-view-layer]').forEach((btn) => {
    btn.classList.toggle('view-filter-btn--on', btn.dataset.viewLayer === muscleLayerFilter)
  })
  const musclesOn = viewSubjectFilter !== 'bones'
  viewLayerGroup.classList.toggle('is-disabled', !musclesOn)
  viewLayerGroup.setAttribute('aria-disabled', musclesOn ? 'false' : 'true')
  btnViewCartilage.classList.toggle('view-filter-btn--on', viewCartilageVisible)
  btnViewCartilage.setAttribute('aria-pressed', viewCartilageVisible ? 'true' : 'false')
}

function applyViewDisplay(): void {
  scene.setViewDisplay({
    subjectFilter: viewSubjectFilter,
    muscleLayer: muscleLayerFilter,
    cartilageVisible: viewCartilageVisible,
  })
  syncViewFilterButtons()
  if (state.viewing && !scene.viewSelectionVisible()) {
    applyViewSelection(null)
    clearPickStack()
  }
}

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
  if (!viewPanel.classList.contains('is-expanded')) {
    // Auto-open the sheet on a new selection so the copy is readable.
    viewPanel.classList.add('is-expanded')
    viewPanelToggle.setAttribute('aria-expanded', 'true')
  }
  syncFramingInsetsNow()
  scene.frameViewSelection(meshesToFrame(sel), catalogViewFor(sel.kind, sel.id))
  renderPickStack(stack, index)
  scheduleFramingSync()
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
  if (state.caseActive || scene.isAnkleCase() || scene.isStudyCase()) {
    scene.exitAnkleCase()
    scene.exitStudyCase()
    state.caseActive = false
    state.caseTyping = false
    appliedFocusId = ''
    document.documentElement.classList.remove('ankle-case', 'study-quiet', 'case-learn')
    casePanel.hidden = true
  }
  statusEl.style.display = ''
  statusEl.classList.remove('error')
  statusEl.textContent = 'Loading study model…'
  state.playing = false
  state.revealing = false
  state.viewing = true
  hiddenInput.value = ''
  blurQuizInput()
  menuOverlay.hidden = true
  playHud.hidden = true
  sideViews.hidden = true
  chromeTop.hidden = false
  chromeTop.removeAttribute('hidden')
  chromeTop.classList.add('is-view')
  setMenuSheet(false)
  syncChromeContext()
  syncFooterTips()
  viewFilters.hidden = false
  viewFilters.classList.remove('is-quiz')
  syncViewFilterButtons()
  syncLookButtons()
  viewPanel.hidden = false
  viewPanel.classList.remove('is-expanded')
  viewPanelToggle.setAttribute('aria-expanded', 'false')
  clearPickStack()
  applyViewSelection(null)
  try {
    await scene.enterView()
    scene.setViewDisplay({
    subjectFilter: viewSubjectFilter,
    muscleLayer: muscleLayerFilter,
    cartilageVisible: viewCartilageVisible,
  })
  } catch (err) {
    console.error(err)
    statusEl.classList.add('error')
    statusEl.textContent = 'Failed to load study model'
    return
  }
  if (!state.viewing) return
  statusEl.style.display = 'none'
  syncFramingInsetsNow()
}

function levelsForMode(mode: PlayMode): Level[] {
  if (mode === 'combined') return [...LEVEL_ORDER]
  return [mode]
}

async function startSession(): Promise<void> {
  const pool = filteredPool()
  if (pool.length === 0) return
  void unlockAudio()

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
  chromeTop.classList.remove('is-view')
  setMenuSheet(false)
  viewFilters.hidden = true
  viewFilters.classList.remove('is-quiz')
  syncLookButtons()
  sideViews.hidden = false
  updateHud()
  // Raise the native keyboard in this user gesture, before any model-load
  // await, which would drop iOS's permission to show it.
  focusInput()

  if (state.subject === 'muscles') {
    statusEl.style.display = ''
    statusEl.textContent = 'Loading muscles…'
    await scene.setSubjectAsync('muscles')
    statusEl.style.display = 'none'
  } else {
    scene.setSubject('bones')
    statusEl.style.display = 'none'
  }

  if (!state.playing) return
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
    blurQuizInput()
    updateHud()
    return
  }
  applyTarget()
  updateHud()
  focusInput()
}

function onChar(ch: string): void {
  void unlockAudio()
  if (state.caseActive) {
    onCaseChar(ch)
    return
  }
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

function onConfirmAnswer(): void {
  void unlockAudio()
  if (state.caseActive) {
    onCaseConfirm()
    return
  }
  if (!state.playing) return
  if (state.finished) {
    showMenu()
    return
  }
  if (state.revealing) return
  const bone = current()
  if (!bone) return
  if (bone.match(state.typed, 'confirm')) void onCorrect()
}

function onBackspace(): void {
  if (state.caseActive) {
    if (!state.caseTyping || state.revealing || state.finished) return
    state.typed = state.typed.slice(0, -1)
    updateHud()
    return
  }
  if (!state.playing || state.revealing || state.finished) return
  state.typed = state.typed.slice(0, -1)
  updateHud()
}

/** Hide Skip while the menu is up, the answer is showing, or the session is over. */
function syncSkipButton(): void {
  const show =
    state.playing &&
    !playHud.hidden &&
    !state.revealing &&
    !state.finished &&
    !(state.caseActive && state.casePhase === 'learn')
  skipBtn.hidden = !show
  skipBtn.disabled = !show
  // Phone Check is the keyboard Go key. Desktop shows the button, except on a tap step.
  const tapStep = state.caseActive && state.casePhase === 'quiz' && currentCaseStep()?.kind === 'tap'
  checkBtn.hidden = !show || tapStep
  checkBtn.disabled = checkBtn.hidden
}

function revealAnswer(): void {
  if (state.caseActive) {
    revealCaseAnswer()
    return
  }
  if (!state.playing || state.revealing || state.finished) return
  const bone = current()
  if (!bone) return
  state.attempts += 1
  state.revealing = true
  state.typed = ''
  hiddenInput.value = ''
  updateHud()
  // Skip is a user gesture: re-assert focus now so the keyboard stays up
  // through the reveal and onto the next item.
  focusInputNow()
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
      blurQuizInput()
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
  footerMeta.textContent = isNarrowLayout()
    ? `BODY PARTS 3D · ${names.length} MESHES`
    : `MODELS: BODY PARTS 3D · ${names.length} MESHES · ${ribN} RIBS · ${MUSCLES.length} MUSCLES`
  void musN
  const deal = playableCount(filteredPool().length, state.sessionCount)
  startBtn.textContent = startButtonLabel(deal)
  startBtn.disabled = deal <= 0
  const reason = startDisabledReason(deal)
  startReason.hidden = reason.length === 0
  startReason.textContent = reason
  if (reason) startBtn.setAttribute('aria-describedby', 'start-reason')
  else startBtn.removeAttribute('aria-describedby')
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
      const on = !commonBonesOnly && activePreset === id
      btn.className = 'filter-chip filter-chip--preset' + (on ? ' filter-chip--on' : '')
      const n = applyPreset(id).bones.length
      btn.innerHTML = `<span>${label}</span><em>${n}</em>`
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        void unlockAudio()
        commonBonesOnly = false
        setPreset(id)
        renderMenuFilters()
        updatePoolCount()
      })
      menuPresets.appendChild(btn)
      if (id === 'all') {
        const commonBtn = document.createElement('button')
        commonBtn.type = 'button'
        const commonN = filterCommonBones().length
        commonBtn.className =
          'filter-chip filter-chip--preset' + (commonBonesOnly ? ' filter-chip--on' : '')
        commonBtn.innerHTML = `<span>Common</span><em>${commonN}</em>`
        commonBtn.addEventListener('pointerdown', (e) => {
          e.preventDefault()
          void unlockAudio()
          commonBonesOnly = true
          renderMenuFilters()
          updatePoolCount()
        })
        menuPresets.appendChild(commonBtn)
      }
    }
  }

  // Muscle regions
  menuMuscleRegions.innerHTML = ''
  if (!isBones) {
    const allBtn = document.createElement('button')
    allBtn.type = 'button'
    const allOn = !commonMusclesOnly && selectedMuscleRegions.size === MUSCLE_REGIONS.length
    allBtn.className = 'filter-chip' + (allOn ? ' filter-chip--on' : '')
    allBtn.innerHTML = `<span>All</span><em>${MUSCLES.length}</em>`
    allBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      void unlockAudio()
      commonMusclesOnly = false
      for (const r of MUSCLE_REGIONS) selectedMuscleRegions.add(r.id)
      renderMenuFilters()
      updatePoolCount()
    })
    menuMuscleRegions.appendChild(allBtn)

    const commonBtn = document.createElement('button')
    commonBtn.type = 'button'
    const commonN = filterCommonMuscles().length
    commonBtn.className =
      'filter-chip filter-chip--preset' + (commonMusclesOnly ? ' filter-chip--on' : '')
    commonBtn.innerHTML = `<span>Common</span><em>${commonN}</em>`
    commonBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      void unlockAudio()
      commonMusclesOnly = true
      renderMenuFilters()
      updatePoolCount()
    })
    menuMuscleRegions.appendChild(commonBtn)

    for (const { id, label } of MUSCLE_REGIONS) {
      const btn = document.createElement('button')
      btn.type = 'button'
      const n = MUSCLES.filter((m) => m.region === id).length
      const regionOn = !commonMusclesOnly && selectedMuscleRegions.has(id)
      btn.className = 'filter-chip' + (regionOn ? ' filter-chip--on' : '')
      btn.innerHTML = `<span>${label}</span><em>${n}</em>`
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault()
        void unlockAudio()
        if (commonMusclesOnly) {
          commonMusclesOnly = false
          selectedMuscleRegions.clear()
          selectedMuscleRegions.add(id)
          renderMenuFilters()
          updatePoolCount()
          return
        }
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
    btn.className = 'filter-chip' + (!commonBonesOnly && selectedRegions.has(id) ? ' filter-chip--on' : '')
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
      'filter-chip filter-chip--part' + (!commonBonesOnly && selectedParts.has(id) ? ' filter-chip--on' : '')
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

  const levelGrid = document.querySelector<HTMLElement>('.mode-grid--levels')
  levelGrid?.classList.toggle('is-dimmed', state.mode === 'combined')
  document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach((btn) => {
    const card = btn.dataset.mode as PlayMode
    const on = isModeSelected(state.mode, card)
    btn.classList.toggle('mode-card--on', on)
    btn.classList.toggle('mode-card--dim', isModeDimmed(state.mode, card))
    btn.setAttribute('aria-pressed', on ? 'true' : 'false')
  })
}

function toggleRegion(id: BoneRegion): void {
  if (commonBonesOnly) {
    commonBonesOnly = false
    activePreset = 'custom'
    selectedRegions.clear()
    selectedParts.clear()
    for (const p of BONE_PARTS) selectedParts.add(p.id)
    selectedRegions.add(id)
    renderMenuFilters()
    updatePoolCount()
    return
  }
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
  if (commonBonesOnly) commonBonesOnly = false
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
  if (startBtn.disabled) return
  void startSession()
})

btnAnkleLearn.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startAnkleCase('learn')
})
btnAnkleQuiz.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startAnkleCase('quiz')
})

btnMuscleLearn.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startStudyCase('actions', 'learn')
})
btnMuscleQuiz.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startStudyCase('actions', 'quiz')
})

btnHamstringLearn.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startStudyCase('hamstring', 'learn')
})
btnHamstringQuiz.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startStudyCase('hamstring', 'quiz')
})

btnView.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  void startView()
})

document.querySelectorAll<HTMLButtonElement>('[data-view-subject]').forEach((btn) => {
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = btn.dataset.viewSubject as ViewSubjectFilter | undefined
    if (!next || next === viewSubjectFilter) return
    viewSubjectFilter = next
    applyViewDisplay()
  })
})

document.querySelectorAll<HTMLButtonElement>('[data-view-layer]').forEach((btn) => {
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (viewSubjectFilter === 'bones') return
    const next = btn.dataset.viewLayer as MuscleLayerFilter | undefined
    if (!next || next === muscleLayerFilter) return
    muscleLayerFilter = next
    applyViewDisplay()
  })
})

btnViewCartilage.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  e.stopPropagation()
  viewCartilageVisible = !viewCartilageVisible
  applyViewDisplay()
})

document.querySelectorAll<HTMLButtonElement>('[data-look]').forEach((btn) => {
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const next = btn.dataset.look as MaterialLook | undefined
    if (!next || next === currentLook) return
    applyLook(next)
  })
})

const viewFinder = document.querySelector<HTMLElement>('.view-finder')!

function syncViewSearchState(): void {
  viewFinder.classList.toggle('is-searching', viewSearchQuery.length > 0)
}

viewSearch.addEventListener('input', () => {
  viewSearchQuery = viewSearch.value
  syncViewSearchState()
  renderViewList()
})
viewSearch.addEventListener('keydown', (e) => {
  e.stopPropagation()
  if (e.key === 'Escape') {
    if (viewSearch.value) {
      viewSearch.value = ''
      viewSearchQuery = ''
      syncViewSearchState()
      renderViewList()
      e.preventDefault()
    }
  }
})
viewSearch.addEventListener('pointerdown', (e) => {
  e.stopPropagation()
})

viewList.addEventListener('pointerdown', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-list-id]')
  if (!btn) return
  e.preventDefault()
  e.stopPropagation()
  const kind = btn.dataset.listKind as StructureKind | undefined
  const id = btn.dataset.listId
  if (!kind || !id) return
  const entry = listEntryByKey.get(`${kind}:${id}`)
  if (!entry) return
  revealStructureFromList(entry)
})

renderViewList()

viewPanelToggle.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  const open = !viewPanel.classList.contains('is-expanded')
  viewPanel.classList.toggle('is-expanded', open)
  viewPanelToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  scheduleFramingSync()
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

function setMenuSheet(open: boolean): void {
  menuSheet.hidden = !open
  btnMenuTop.setAttribute('aria-expanded', open ? 'true' : 'false')
  chromeTop.classList.toggle('is-sheet', open)
}

function restartCurrent(): void {
  setMenuSheet(false)
  if (state.caseActive) {
    if (state.casePhase === 'learn') {
      state.caseLearnIndex = 0
      state.finished = false
      appliedFocusId = ''
      renderLearnCard()
      syncChromeContext()
      return
    }
    if (isStudyCase()) startStudyQuiz()
    else startAnkleQuiz()
    return
  }
  if (!state.playing || state.queue.length === 0) {
    showMenu()
    return
  }
  state.levelIndex = 0
  state.index = 0
  state.typed = ''
  state.revealing = false
  state.correct = 0
  state.attempts = 0
  state.finished = false
  hiddenInput.value = ''
  applyTarget()
  updateHud()
  focusInput()
}

btnMenuTop.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  if (state.viewing && !state.playing) {
    showMenu()
    return
  }
  if (!state.playing && !state.caseActive) {
    showMenu()
    return
  }
  setMenuSheet(menuSheet.hidden)
})

document.querySelector('#menu-restart')!.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  e.stopPropagation()
  restartCurrent()
})

document.querySelector('#menu-change')!.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  e.stopPropagation()
  setMenuSheet(false)
  showMenu()
})

window.addEventListener('pointerdown', (e) => {
  if (menuSheet.hidden) return
  const target = e.target as Node | null
  if (target && (menuSheet.contains(target) || btnMenuTop.contains(target))) return
  setMenuSheet(false)
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
  if (!state.playing && !state.viewing && (e.key === 'r' || e.key === 'R') && document.activeElement !== hiddenInput) {
    e.preventDefault()
    void startAnkleCase('learn')
    return
  }
  if (!state.playing && !state.viewing && (e.key === 's' || e.key === 'S') && document.activeElement !== hiddenInput) {
    e.preventDefault()
    void startStudyCase('actions', 'learn')
    return
  }
  if (!state.playing && !state.viewing && (e.key === 'h' || e.key === 'H') && document.activeElement !== hiddenInput) {
    e.preventDefault()
    void startStudyCase('hamstring', 'learn')
    return
  }
  if (e.key === 'Tab' && state.playing) {
    e.preventDefault()
    revealAnswer()
    return
  }
  if (state.caseActive && state.finished) {
    if (e.key === 'Enter' || e.key.length === 1) {
      e.preventDefault()
      showMenu()
    }
    return
  }
  if (state.caseActive && state.casePhase === 'learn') {
    if (e.key === 'Enter') {
      e.preventDefault()
      advanceCaseLearn()
    }
    return
  }
  if (state.caseActive && !state.caseTyping) return
  if (!state.playing) {
    if (state.viewing) return
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!startBtn.disabled) void startSession()
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
  if (e.key === 'Enter') {
    e.preventDefault()
    onConfirmAnswer()
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

// If iOS blurs the field because the user grabbed the model, restore focus
// in the same gesture so the keyboard stays up. Do not call focus() on every
// rotate while already focused — that is what used to fight the keyboard.
let retainSoftKeyboard = false

function beginCanvasKeyboardRetain(): void {
  if (touchQuiz && quizInputShouldFocus() && document.activeElement === hiddenInput) {
    retainSoftKeyboard = true
  }
}

function endCanvasKeyboardRetain(): void {
  window.setTimeout(() => {
    retainSoftKeyboard = false
  }, 0)
}

hiddenInput.addEventListener('focus', () => {
  armKeyboardLift()
  syncTapHint()
  scheduleKeyboardResync()
})

hiddenInput.addEventListener('blur', () => {
  if (retainSoftKeyboard && quizInputShouldFocus()) {
    focusInputNow()
    return
  }
  disarmKeyboardLift()
  syncTapHint()
  scheduleKeyboardResync()
})

hiddenInput.addEventListener('input', () => {
  void unlockAudio()
  if (state.caseActive) {
    onCaseFieldInput()
    return
  }
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
  const cleaned = sanitizeTypedInput(raw)
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
  if (e.key === 'Enter') {
    e.preventDefault()
    onConfirmAnswer()
  }
})

promptBlock.addEventListener('pointerdown', (e) => {
  if ((e.target as HTMLElement | null)?.closest('#skip-btn, #check-btn')) return
  // Let a direct tap on the field focus it natively. preventDefault on that
  // path can cancel the focus and drop the iOS keyboard.
  if ((e.target as HTMLElement | null)?.closest('#answer')) {
    void unlockAudio()
    if (state.finished) {
      showMenu()
      return
    }
    // The word is the field. A second tap can reopen the iOS keyboard
    // without a focus event when the field never blurred. Arm anyway.
    armKeyboardLift()
    scheduleKeyboardResync()
    return
  }
  e.preventDefault()
  void unlockAudio()
  if (state.finished) {
    showMenu()
    return
  }
  armKeyboardLift()
  focusInput()
  scheduleKeyboardResync()
})

skipBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  e.stopPropagation()
  void unlockAudio()
  revealAnswer()
})

checkBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (checkBtn.hidden || checkBtn.disabled) return
  void unlockAudio()
  onConfirmAnswer()
})

/** QA can pin a keyboard height. Null measures the visual viewport. */
let forcedKeyboardInset: number | null = null
/**
 * QA feeds the viewport numbers Safari would report, including the second
 * open where every number still looks like the keyboard is closed.
 */
let keyboardProbe: KeyboardViewport | null = null
let keyboardProbeFocused: boolean | null = null
let keyboardSession: KeyboardSession = initialKeyboardSession(window.innerHeight)
let keyboardResyncTimers: number[] = []
let keyboardCloseTimer = 0
const ZERO_FRAME_INSETS: FramingInsets = { top: 0, right: 0, bottom: 0, left: 0 }
let appliedInsets: FramingInsets = { top: -1, right: -1, bottom: -1, left: -1 }
let appliedFraming = false
let framingSyncTimer = 0

function currentKeyboardInset(): number {
  if (forcedKeyboardInset != null) return forcedKeyboardInset
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--keyboard-inset')
  const n = Number.parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}

function syncHudChrome(): void {
  const land = touchQuiz && window.innerWidth > window.innerHeight && window.innerHeight <= 520
  document.documentElement.classList.toggle('phone-landscape', land)
  document.documentElement.classList.toggle('keyboard-open', currentKeyboardInset() > 40)
  if (!chromeTop.hidden) {
    const menu = btnMenuTop.getBoundingClientRect()
    if (menu.width > 8) {
      document.documentElement.style.setProperty(
        '--chrome-menu-clearance',
        `${Math.round(menu.right + 12)}px`,
      )
    }
  }
}

function armKeyboardLift(): void {
  keyboardSession = armKeyboardSession(keyboardSession)
  if (keyboardCloseTimer) {
    window.clearTimeout(keyboardCloseTimer)
    keyboardCloseTimer = 0
  }
}

function disarmKeyboardLift(): void {
  keyboardProbeFocused = null
  if (keyboardCloseTimer) {
    window.clearTimeout(keyboardCloseTimer)
    keyboardCloseTimer = 0
  }
}

function readKeyboardViewport(): KeyboardViewport {
  if (keyboardProbe) return keyboardProbe
  const vv = window.visualViewport
  return {
    innerHeight: window.innerHeight,
    visualHeight: vv?.height ?? window.innerHeight,
    offsetTop: vv?.offsetTop ?? 0,
    scrollY: window.scrollY || document.documentElement.scrollTop || 0,
  }
}

function keyboardFieldFocused(): boolean {
  if (keyboardProbeFocused != null) return keyboardProbeFocused
  return document.activeElement === hiddenInput
}

function syncKeyboardInset(confirmClose = false): void {
  // Read the pan before pinning. iOS scrolls a bottom field into view; we
  // undo that scroll so the top chrome stays, and the inset has to replace it.
  const viewport = readKeyboardViewport()
  if (!keyboardProbe && touchQuiz && (window.scrollX || window.scrollY)) window.scrollTo(0, 0)

  let inset: number
  if (forcedKeyboardInset != null) {
    inset = Math.round(forcedKeyboardInset)
  } else {
    const decision = resolveKeyboardInset(viewport, keyboardSession, {
      focused: keyboardFieldFocused(),
      touch: touchQuiz,
      forcedInset: null,
      confirmClose,
    })
    keyboardSession = decision.session
    inset = decision.inset
    if (decision.pendingClose && !confirmClose) {
      if (!keyboardCloseTimer) {
        keyboardCloseTimer = window.setTimeout(() => {
          keyboardCloseTimer = 0
          syncKeyboardInset(true)
        }, 220)
      }
    } else if (keyboardCloseTimer) {
      window.clearTimeout(keyboardCloseTimer)
      keyboardCloseTimer = 0
    }
  }
  document.documentElement.style.setProperty('--keyboard-inset', `${inset}px`)
  syncHudChrome()
  scheduleFramingSync()
}

/** Focus and viewport events both arrive before Safari's numbers settle. */
function scheduleKeyboardResync(): void {
  for (const id of keyboardResyncTimers) window.clearTimeout(id)
  keyboardResyncTimers = [0, 50, 150, 350, 700].map((ms) =>
    window.setTimeout(() => syncKeyboardInset(), ms),
  )
}

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => syncKeyboardInset())
  window.visualViewport.addEventListener('scroll', () => syncKeyboardInset())
  syncKeyboardInset()
}

function framingActive(): boolean {
  if (state.caseActive) return true
  if (state.viewing && !viewPanel.hidden) return true
  return touchQuiz && state.playing && !playHud.hidden
}

/** Pixels of canvas covered by chrome, the prompt, the keyboard, or the study panel. */
function measureOcclusionInsets(): FramingInsets {
  const canvas = mainCanvas.getBoundingClientRect()
  const width = Math.max(canvas.width, 1)
  const height = Math.max(canvas.height, 1)
  let top = 0
  let right = 0
  let bottom = 0
  let left = 0
  const gap = 10

  const takeTop = (el: HTMLElement) => {
    if (el.hidden) return
    const rect = el.getBoundingClientRect()
    if (rect.width < 8 || rect.height < 8) return
    if (rect.bottom < canvas.top || rect.top > canvas.top + height * 0.45) return
    top = Math.max(top, rect.bottom - canvas.top)
  }

  if (!chromeTop.hidden) takeTop(chromeTop)
  if (!viewFilters.hidden) {
    const rect = viewFilters.getBoundingClientRect()
    if (rect.top < canvas.top + height * 0.4) takeTop(viewFilters)
    else if (rect.height > 8 && rect.top > canvas.top + height * 0.35) {
      bottom = Math.max(bottom, canvas.bottom - rect.top)
    }
  }

  if (state.playing && !playHud.hidden) {
    // The prompt text is translucent, so fitting above it made the target a
    // small slice of the area the user can actually see. Reserve the keyboard
    // and the solid Skip control; let the label overlay surrounding anatomy.
    const keyboard = Math.max(0, currentKeyboardInset())
    let control = 0
    if (!skipBtn.hidden) {
      const skip = skipBtn.getBoundingClientRect()
      if (skip.height > 8 && skip.top > canvas.top + height * 0.35) {
        control = Math.min(skip.height + 16, 72)
      }
    }
    bottom = Math.max(bottom, keyboard + control)
  }

  if (state.caseActive && !casePanel.hidden) {
    const rect = casePanel.getBoundingClientRect()
    const overlapW = Math.min(rect.right, canvas.right) - Math.max(rect.left, canvas.left)
    const overlapH = Math.min(rect.bottom, canvas.bottom) - Math.max(rect.top, canvas.top)
    if (overlapW > 8 && overlapH > 8) {
      const bottomSheet = rect.top > canvas.top + height * 0.28
      if (bottomSheet) bottom = Math.max(bottom, canvas.bottom - rect.top)
      else if (rect.left > canvas.left + width * 0.45) right = Math.max(right, canvas.right - rect.left)
      else left = Math.max(left, rect.right - canvas.left)
    }
  }

  if (state.viewing && !viewPanel.hidden) {
    const rect = viewPanel.getBoundingClientRect()
    const overlapW = Math.min(rect.right, canvas.right) - Math.max(rect.left, canvas.left)
    const overlapH = Math.min(rect.bottom, canvas.bottom) - Math.max(rect.top, canvas.top)
    if (overlapW > 8 && overlapH > 8) {
      const bottomSheet = rect.width > width * 0.65 && rect.top > canvas.top + height * 0.28
      if (bottomSheet) bottom = Math.max(bottom, canvas.bottom - rect.top)
      else if (rect.left > canvas.left + width * 0.45) right = Math.max(right, canvas.right - rect.left)
      else if (rect.right < canvas.left + width * 0.55) left = Math.max(left, rect.right - canvas.left)
    }
  }

  let topOut = top > 0 ? top + gap : 0
  let rightOut = right > 0 ? right + gap : 0
  let bottomOut = bottom > 0 ? bottom + gap : 0
  let leftOut = left > 0 ? left + gap : 0

  // Phone landscape plus a keyboard can leave a sliver. Drop the prompt so the
  // target keeps the strip above the keyboard; the fit then refuses to treat
  // a band under 120px as the whole frame.
  if (
    document.documentElement.classList.contains('phone-landscape') &&
    height - topOut - bottomOut < 120
  ) {
    const keyboard = Math.min(Math.max(0, currentKeyboardInset()), height * 0.85)
    bottomOut = keyboard
    if (keyboard > 40) topOut = Math.min(topOut, 46)
  }

  return { top: topOut, right: rightOut, bottom: bottomOut, left: leftOut }
}

function syncFramingInsetsNow(): void {
  syncHudChrome()
  const insets = framingActive() ? measureOcclusionInsets() : ZERO_FRAME_INSETS
  const enabled = framingActive()
  if (appliedFraming === enabled && !insetsChanged(appliedInsets, insets, 6)) return
  appliedInsets = insets
  appliedFraming = enabled
  scene.setFramingInsets(insets, enabled)
}

function scheduleFramingSync(): void {
  window.clearTimeout(framingSyncTimer)
  framingSyncTimer = window.setTimeout(syncFramingInsetsNow, 90)
}

window.addEventListener('resize', () => {
  syncKeyboardInset()
})
syncHudChrome()
viewPanel.addEventListener('transitionend', scheduleFramingSync)

window.matchMedia('(max-width: 900px)').addEventListener('change', () => {
  syncFooterTips()
  updatePoolCount()
  scheduleFramingSync()
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
  if (touchQuiz) {
    beginCanvasKeyboardRetain()
    return
  }
  // Desktop: keep the (already open) hidden field focused after a click
  // on the canvas. Do not do this on touch — refocusing on every rotate
  // dismisses or fights the iOS keyboard.
  if (state.playing) focusInput()
})
window.addEventListener('pointerup', endCanvasKeyboardRetain)
window.addEventListener('pointercancel', endCanvasKeyboardRetain)

mainCanvas.addEventListener('pointermove', (e) => {
  if (!pointerIsPick) return
  const dx = e.clientX - pointerStartX
  const dy = e.clientY - pointerStartY
  if (dx * dx + dy * dy > PICK_MOVE_PX * PICK_MOVE_PX) pointerIsPick = false
})

mainCanvas.addEventListener('pointerup', (e) => {
  const wasPick = pointerIsPick
  pointerIsPick = false
  if (!wasPick) return
  const dx = e.clientX - pointerStartX
  const dy = e.clientY - pointerStartY
  if (dx * dx + dy * dy > PICK_MOVE_PX * PICK_MOVE_PX) return
  if (state.caseActive && state.casePhase === 'quiz') {
    onCaseTap(e.clientX, e.clientY)
    return
  }
  if (!state.viewing) return
  onViewPick(e.clientX, e.clientY)
})

mainCanvas.addEventListener('pointercancel', () => {
  pointerIsPick = false
})

function currentCaseStep(): AnkleQuizStep | ActionQuizStep | HamQuizStep | null {
  if (state.caseKind === 'actions') return ACTION_QUIZ[state.caseQuizIndex] ?? null
  if (state.caseKind === 'hamstring') return HAMSTRING_QUIZ[state.caseQuizIndex] ?? null
  return ANKLE_QUIZ[state.caseQuizIndex] ?? null
}

function caseTypeStep(): AnkleTypeStep | ActionTypeStep | HamTypeStep | null {
  const step = currentCaseStep()
  return step && step.kind === 'type' ? step : null
}

function caseTypeMatches(typed: string, mode: AnswerMatchMode = 'live'): boolean {
  if (state.caseKind === 'actions') {
    const step = ACTION_QUIZ[state.caseQuizIndex]
    return !!step && step.kind === 'type' && actionTypeMatch(step, typed, mode)
  }
  if (state.caseKind === 'hamstring') {
    const step = HAMSTRING_QUIZ[state.caseQuizIndex]
    return !!step && step.kind === 'type' && hamstringTypeMatch(step, typed, mode)
  }
  const step = ANKLE_QUIZ[state.caseQuizIndex]
  return !!step && step.kind === 'type' && ankleTypeMatch(step, typed, mode)
}

function studyQuizStep(): ActionQuizStep | HamQuizStep | null {
  if (state.caseKind === 'actions') return ACTION_QUIZ[state.caseQuizIndex] ?? null
  if (state.caseKind === 'hamstring') return HAMSTRING_QUIZ[state.caseQuizIndex] ?? null
  return null
}

function studyLearnCard(): ActionLearnCard | HamLearnCard | null {
  if (state.caseKind === 'actions') return ACTION_LEARN[state.caseLearnIndex] ?? null
  if (state.caseKind === 'hamstring') return HAMSTRING_LEARN[state.caseLearnIndex] ?? null
  return null
}

/** Apply a muscle highlight once per card. Typing must not rebuild the pose. */
function applyStudyStepFocus(id: string, focus: StudyFocus, play: boolean): void {
  if (appliedFocusId === id) return
  appliedFocusId = id
  scene.setStudyFocus(focus)
  if (play) scene.replayStudyCue()
  else scene.holdStudyCue(focus.cue === 'none' ? 0 : 1)
}

function fillCaseCopy(kicker: string, title: string, paragraphs: string[]): void {
  caseKicker.textContent = kicker
  caseTitle.textContent = title
  caseBody.replaceChildren(
    ...paragraphs.map((text) => {
      const p = document.createElement('p')
      p.textContent = text
      return p
    }),
  )
}

function renderLearnCard(): void {
  if (isStudyCase()) {
    const card = studyLearnCard()
    if (!card) return
    fillCaseCopy(card.kicker, card.title, [...card.paragraphs])
    caseReplay.hidden = !card.motion
    caseBack.hidden = state.caseLearnIndex === 0
    const last = state.caseLearnIndex === caseLearnTotal() - 1
    caseNext.textContent = 'Next'
    caseNext.hidden = last
    caseQuizJump.hidden = !last
    applyStudyStepFocus(card.id, card.focus, card.motion)
    syncChromeContext()
    return
  }
  const card = ANKLE_LEARN[state.caseLearnIndex]
  if (!card) return
  caseKicker.textContent = card.kicker
  caseTitle.textContent = card.title
  caseBody.replaceChildren(
    ...card.paragraphs.map((text) => {
      const p = document.createElement('p')
      p.textContent = text
      return p
    }),
  )
  caseReplay.hidden = !card.motion
  caseBack.hidden = state.caseLearnIndex === 0
  const last = state.caseLearnIndex === ANKLE_LEARN.length - 1
  caseNext.textContent = 'Next'
  caseNext.hidden = last
  caseQuizJump.hidden = !last
  scene.setAnkleEmphasis(card.emphasis)
  scene.setAnkleLigamentLabels(card.id === 'ligaments')
  syncChromeContext()
  if (card.motion) scene.replayAnkleMotion()
  else scene.holdAnklePose(0)
}

async function startAnkleCase(phase: 'learn' | 'quiz' = 'learn'): Promise<void> {
  void unlockAudio()
  if (scene.isStudyCase()) scene.exitStudyCase()
  if (state.viewing) {
    scene.exitView()
    state.viewing = false
  }
  state.caseKind = 'ankle'
  appliedFocusId = ''
  document.documentElement.classList.remove('study-quiet')
  caseReplay.textContent = 'Replay the roll'
  targetWord.classList.remove('is-long')
  state.caseActive = true
  state.casePhase = phase
  state.caseLearnIndex = 0
  state.caseQuizIndex = 0
  state.caseTyping = false
  state.playing = true
  state.finished = false
  state.revealing = false
  state.typed = ''
  state.correct = 0
  state.attempts = 0
  hiddenInput.value = ''
  document.documentElement.classList.add('ankle-case')
  menuOverlay.hidden = true
  playHud.hidden = phase !== 'quiz'
  viewPanel.hidden = true
  chromeTop.hidden = false
  chromeTop.classList.remove('is-view')
  viewFilters.hidden = true
  viewFilters.classList.remove('is-quiz')
  sideViews.hidden = true
  casePanel.hidden = phase !== 'learn'
  setMenuSheet(false)
  syncChromeContext()
  statusEl.style.display = ''
  statusEl.textContent = 'Loading ankle…'
  scene.setLook('solid')
  await scene.enterAnkleCase()
  if (!state.caseActive) return
  statusEl.style.display = 'none'
  if (phase === 'quiz') startAnkleQuiz()
  else renderLearnCard()
  syncFramingInsetsNow()
  scheduleFramingSync()
}

function advanceCaseLearn(): void {
  if (!state.caseActive || state.casePhase !== 'learn') return
  if (state.caseLearnIndex < caseLearnTotal() - 1) {
    state.caseLearnIndex += 1
    renderLearnCard()
    scheduleFramingSync()
  }
}

function jumpFromLearnToQuiz(): void {
  if (!state.caseActive || state.casePhase !== 'learn') return
  if (state.caseLearnIndex !== caseLearnTotal() - 1) return
  if (isStudyCase()) startStudyQuiz()
  else startAnkleQuiz()
}

async function startStudyCase(
  kind: 'actions' | 'hamstring',
  phase: 'learn' | 'quiz' = 'learn',
): Promise<void> {
  void unlockAudio()
  if (scene.isAnkleCase()) scene.exitAnkleCase()
  if (state.viewing) {
    scene.exitView()
    state.viewing = false
  }
  state.caseKind = kind
  appliedFocusId = ''
  state.caseActive = true
  state.casePhase = phase
  state.caseLearnIndex = 0
  state.caseQuizIndex = 0
  state.caseTyping = false
  state.playing = true
  state.finished = false
  state.revealing = false
  state.typed = ''
  state.correct = 0
  state.attempts = 0
  hiddenInput.value = ''
  document.documentElement.classList.remove('ankle-case')
  document.documentElement.classList.add('study-quiet')
  caseReplay.textContent = 'Replay'
  targetWord.classList.remove('is-long')
  menuOverlay.hidden = true
  playHud.hidden = phase !== 'quiz'
  viewPanel.hidden = true
  chromeTop.hidden = false
  chromeTop.classList.remove('is-view')
  viewFilters.hidden = true
  viewFilters.classList.remove('is-quiz')
  sideViews.hidden = true
  casePanel.hidden = phase !== 'learn'
  setMenuSheet(false)
  syncChromeContext()
  statusEl.style.display = ''
  statusEl.textContent = 'Loading muscles…'
  scene.setLook('solid')
  await scene.enterStudyCase()
  if (!state.caseActive || state.caseKind !== kind) return
  statusEl.style.display = 'none'
  if (phase === 'quiz') startStudyQuiz()
  else renderLearnCard()
  syncFramingInsetsNow()
  scheduleFramingSync()
}

function startStudyQuiz(): void {
  state.casePhase = 'quiz'
  state.caseQuizIndex = 0
  state.finished = false
  state.revealing = false
  state.typed = ''
  state.correct = 0
  state.attempts = 0
  hiddenInput.value = ''
  appliedFocusId = ''
  casePanel.hidden = true
  playHud.hidden = false
  renderCaseHud()
  syncFramingInsetsNow()
  if (state.caseTyping) focusInput()
}

function startAnkleQuiz(): void {
  state.casePhase = 'quiz'
  state.caseQuizIndex = 0
  state.finished = false
  state.revealing = false
  state.typed = ''
  state.correct = 0
  state.attempts = 0
  hiddenInput.value = ''
  casePanel.hidden = true
  playHud.hidden = false
  scene.holdAnklePose(0)
  scene.setAnkleEmphasis('none')
  scene.setAnkleLigamentLabels(false)
  renderCaseHud()
  syncFramingInsetsNow()
  if (state.caseTyping) focusInput()
}

function renderStudyHud(): void {
  document.documentElement.classList.remove('ankle-case')
  document.documentElement.classList.add('study-quiet')
  playHud.classList.toggle('case-quiz', state.casePhase === 'quiz')
  const acc = state.attempts === 0 ? 100 : Math.round((state.correct / state.attempts) * 100)
  statAcc.textContent = `${acc}%`
  syncChromeContext()

  if (state.casePhase === 'learn') {
    syncSkipButton()
    scheduleFramingSync()
    return
  }

  if (state.finished) {
    state.caseTyping = false
    typeLabel.textContent = 'CASE COMPLETE · TAP OR ESC FOR MENU'
    targetWord.classList.add('reveal')
    targetWord.classList.remove('is-long')
    targetWord.innerHTML = `<span class="tw-done">case complete</span>`
    glossLine.textContent =
      state.caseKind === 'hamstring'
        ? 'Grade II hamstring strain: eccentric tensile overload in a sprint. Phase 2 uses Nordic hamstring curls.'
        : 'Muscles pull on bones. You matched each movement to the muscle on the model.'
    glossLine.classList.add('show')
    glossLine.classList.remove('is-wrong')
    syncSkipButton()
    scheduleFramingSync()
    return
  }

  const step = studyQuizStep()
  if (!step) return
  state.caseTyping = step.kind === 'type' && !state.revealing
  typeLabel.textContent = `${step.kind === 'type' ? 'TYPE IT' : 'TAP IT'} · ${step.region}`
  glossLine.textContent =
    state.revealing && step.kind === 'type'
      ? step.reveal
      : state.revealing && step.kind === 'tap'
        ? step.correct
        : step.prompt
  glossLine.classList.add('show')
  glossLine.classList.remove('is-wrong')
  targetWord.classList.toggle('is-long', step.kind === 'type' && step.official.length > 28)
  if (step.kind === 'type') renderCaseTypeWord(step)
  else {
    targetWord.classList.toggle('reveal', state.revealing)
    targetWord.innerHTML = state.revealing
      ? `<span class="tw-done">${escapeHtml(step.revealName)}</span>`
      : `<span class="tw-on">tap</span>`
  }
  if ('focus' in step) applyStudyStepFocus(step.id, step.focus, step.focus.cue !== 'none')
  syncSkipButton()
  if (step.kind === 'tap') blurQuizInput()
  syncTapHint()
  scheduleFramingSync()
}

function renderCaseHud(): void {
  if (isStudyCase()) {
    renderStudyHud()
    return
  }
  targetWord.classList.remove('is-long')
  document.documentElement.classList.toggle('ankle-case', state.caseActive)
  playHud.classList.toggle('case-quiz', state.caseActive && state.casePhase === 'quiz')
  const acc = state.attempts === 0 ? 100 : Math.round((state.correct / state.attempts) * 100)
  statAcc.textContent = `${acc}%`
  syncChromeContext()

  if (state.casePhase === 'learn') {
    syncSkipButton()
    scheduleFramingSync()
    return
  }

  if (state.finished) {
    state.caseTyping = false
    typeLabel.textContent = 'CASE COMPLETE · TAP OR ESC FOR MENU'
    targetWord.classList.add('reveal')
    targetWord.innerHTML = `<span class="tw-done">case complete</span>`
    glossLine.textContent = 'Right ankle: likely ATFL, CFL also under tension in inversion. Immediate care is POLICE.'
    glossLine.classList.add('show')
    glossLine.classList.remove('is-wrong')
    syncSkipButton()
    scheduleFramingSync()
    return
  }

  const step = currentCaseStep()
  if (!step) return
  state.caseTyping = step.kind === 'type' && !state.revealing
  typeLabel.textContent = `${step.kind === 'type' ? 'TYPE IT' : 'TAP IT'} · ${step.region}`
  glossLine.textContent =
    state.revealing && step.kind === 'type'
      ? step.reveal
      : state.revealing && step.kind === 'tap'
        ? step.correct
        : step.prompt
  glossLine.classList.add('show')
  glossLine.classList.remove('is-wrong')
  if (step.kind === 'type') renderCaseTypeWord(step)
  else {
    targetWord.classList.toggle('reveal', state.revealing)
    targetWord.innerHTML = state.revealing
      ? `<span class="tw-done">${escapeHtml(step.accept[0] === 'atfl' && step.id === 'palpate' ? 'ATFL region' : step.accept[0] === 'cfl' ? 'CFL' : 'ATFL')}</span>`
      : `<span class="tw-on">tap</span>`
  }
  syncSkipButton()
  /* A tap step is not a typing field. Drop focus so the keyboard does not
     stay up from the previous type question and hide "Tap the model". */
  if (step.kind === 'tap') blurQuizInput()
  syncTapHint()
  scheduleFramingSync()
}

function renderCaseTypeWord(step: AnkleTypeStep | ActionTypeStep | HamTypeStep): void {
  if (state.revealing) {
    targetWord.classList.add('reveal')
    targetWord.innerHTML = `<span class="tw-done">${escapeHtml(step.official)}</span>`
    return
  }
  targetWord.classList.remove('reveal')
  const answer = step.official
  const compactTyped = compactLetters(state.typed)
  const names = [step.official, ...step.aliases]
  const wrongAt = firstWrongIndex(state.typed, names)
  const chars = [...answer]
  let html = ''
  let letterIdx = 0
  let caretPlaced = false
  let sawWrong = false
  for (const ch of chars) {
    if (/\s/.test(ch)) {
      html += `<span class="tw-space">&nbsp;</span>`
      continue
    }
    if (letterIdx < compactTyped.length) {
      const tch = compactTyped[letterIdx]!
      const wrong = wrongAt >= 0 && letterIdx >= wrongAt
      if (wrong) sawWrong = true
      html += `<span class="${wrong ? 'tw-wrong' : 'tw-on'}">${escapeHtml(tch)}</span>`
    } else {
      const inner = '_'
      if (!caretPlaced) {
        html += `<span class="tw-blank tw-caret">${inner}</span>`
        caretPlaced = true
      } else html += `<span class="tw-blank">${inner}</span>`
    }
    letterIdx++
  }
  if (compactTyped.length > letterIdx) {
    sawWrong = true
    html += [...compactTyped.slice(letterIdx)]
      .map((ch) => `<span class="tw-wrong">${escapeHtml(ch)}</span>`)
      .join('')
  }
  if (!caretPlaced) html += `<span class="tw-cursor"></span>`
  targetWord.innerHTML = (sawWrong ? wrongMarkHtml() : '') + html
}

function onCaseFieldInput(): void {
  if (!state.caseTyping || state.finished || state.revealing) {
    hiddenInput.value = ''
    return
  }
  const step = caseTypeStep()
  const raw = hiddenInput.value
  const cleaned = sanitizeTypedInput(raw)
  if (cleaned !== raw) hiddenInput.value = cleaned
  const prev = state.typed
  const added = compactLetters(cleaned).length > compactLetters(prev).length
  state.typed = cleaned
  if (step && added && firstWrongIndex(cleaned, [step.official, ...step.aliases]) >= 0) playWrongTick()
  else if (cleaned.length !== prev.length) playKeyTap()
  updateHud()
  if (step && caseTypeMatches(cleaned)) void onCaseCorrect()
}

function onCaseChar(ch: string): void {
  if (!state.caseTyping || state.finished || state.revealing) return
  const step = caseTypeStep()
  if (!step) return
  state.typed += ch
  if (firstWrongIndex(state.typed, [step.official, ...step.aliases]) >= 0) playWrongTick()
  else playKeyTap()
  updateHud()
  if (caseTypeMatches(state.typed)) void onCaseCorrect()
}

function onCaseConfirm(): void {
  if (state.finished) {
    showMenu()
    return
  }
  if (state.casePhase !== 'quiz' || state.revealing) return
  const step = caseTypeStep()
  if (!step) return
  if (caseTypeMatches(state.typed, 'confirm')) void onCaseCorrect()
}

function onCaseTap(clientX: number, clientY: number): void {
  if (state.casePhase !== 'quiz' || state.revealing || state.finished || state.caseTyping) return
  if (isStudyCase()) {
    onStudyTap(clientX, clientY)
    return
  }
  const step = ANKLE_QUIZ[state.caseQuizIndex]
  if (!step || step.kind !== 'tap') return
  const picked = scene.pickAnkle(clientX, clientY)
  const graded = gradeAnkleTap(step, picked?.hit ?? null)
  if (!graded.ok) {
    playWrongTick()
    glossLine.textContent = graded.message
    glossLine.classList.add('show', 'is-wrong')
    return
  }
  void onCaseCorrect(graded.message)
}

function onStudyTap(clientX: number, clientY: number): void {
  const picked = scene.pickStudy(clientX, clientY)
  const hit = picked?.hit ?? null
  if (state.caseKind === 'hamstring') {
    const step = HAMSTRING_QUIZ[state.caseQuizIndex]
    if (!step || step.kind !== 'tap') return
    const graded = gradeHamstringTap(step, hit)
    if (!graded.ok) {
      playWrongTick()
      glossLine.textContent = graded.message
      glossLine.classList.add('show', 'is-wrong')
      return
    }
    void onCaseCorrect(graded.message)
    return
  }
  const step = ACTION_QUIZ[state.caseQuizIndex]
  if (!step || step.kind !== 'tap') return
  const graded = gradeActionTap(step, hit)
  if (!graded.ok) {
    playWrongTick()
    glossLine.textContent = graded.message
    glossLine.classList.add('show', 'is-wrong')
    return
  }
  void onCaseCorrect(graded.message)
}

async function onCaseCorrect(message?: string): Promise<void> {
  const step = currentCaseStep()
  if (!step || state.revealing) return
  state.revealing = true
  state.correct += 1
  state.attempts += 1
  state.caseTyping = false
  playCorrectChime()
  hiddenInput.value = ''
  if (message) glossLine.textContent = message
  updateHud()
  if (step.kind === 'tap' && message) {
    glossLine.textContent = message
    glossLine.classList.add('show')
    glossLine.classList.remove('is-wrong')
  }
  await wait(1100)
  advanceCaseQuiz()
}

function revealCaseAnswer(): void {
  if (!state.caseActive || state.casePhase !== 'quiz' || state.revealing || state.finished) return
  const step = currentCaseStep()
  if (!step) return
  state.attempts += 1
  state.revealing = true
  state.caseTyping = false
  state.typed = ''
  hiddenInput.value = ''
  if (!isStudyCase() && step.kind === 'tap') {
    const ankle = ANKLE_QUIZ[state.caseQuizIndex]
    if (ankle && ankle.kind === 'tap') scene.setAnkleEmphasis(ankle.accept[0] === 'cfl' ? 'cfl' : 'atfl')
  }
  updateHud()
  if (state.caseTyping) focusInputNow()
  void (async () => {
    await wait(1400)
    if (!isStudyCase()) scene.setAnkleEmphasis('none')
    advanceCaseQuiz()
  })()
}

function advanceCaseQuiz(): void {
  if (!state.caseActive) return
  state.revealing = false
  state.typed = ''
  hiddenInput.value = ''
  state.caseQuizIndex += 1
  if (state.caseQuizIndex >= caseQuizTotal()) {
    state.finished = true
    state.caseTyping = false
    updateHud()
    return
  }
  updateHud()
  if (state.caseTyping) focusInput()
}

caseBack.addEventListener('click', () => {
  if (!state.caseActive || state.casePhase !== 'learn' || state.caseLearnIndex === 0) return
  state.caseLearnIndex -= 1
  pillRound.textContent = `${state.caseLearnIndex + 1} / ${caseLearnTotal()}`
  renderLearnCard()
  scheduleFramingSync()
})

caseNext.addEventListener('click', () => {
  advanceCaseLearn()
})

caseQuizJump.addEventListener('click', () => {
  jumpFromLearnToQuiz()
})

caseReplay.addEventListener('click', () => {
  if (isStudyCase()) scene.replayStudyCue()
  else scene.replayAnkleMotion()
})

function qaEntry(subject: 'bones' | 'muscles', id: string): ViewSelection {
  if (subject === 'muscles') {
    const muscle = MUSCLES.find((m) => m.id === id)
    if (!muscle) throw new Error(`unknown muscle ${id}`)
    const clicked = muscle.meshNames.find((n) => meshSide(n) === 'l') ?? muscle.meshNames[0]!
    return {
      kind: 'muscle',
      id,
      displayName: muscle.displayName,
      regionLabel: MUSCLE_REGION_LABEL[muscle.region],
      meshNames: muscle.meshNames,
      side: meshSide(clicked),
      clickedMesh: clicked,
    }
  }
  const bone = AXIAL_BONES.find((b) => b.id === id)
  if (!bone) throw new Error(`unknown bone ${id}`)
  const clicked = bone.meshNames.find((n) => meshSide(n) === 'l') ?? bone.meshNames[0]!
  return {
    kind: 'bone',
    id,
    displayName: bone.displayName,
    regionLabel: REGION_LABEL[bone.region],
    meshNames: bone.meshNames,
    side: meshSide(clicked),
    clickedMesh: clicked,
  }
}

function pinForcedKeyboard(px: number): void {
  forcedKeyboardInset = px
  keyboardProbe = null
  keyboardProbeFocused = null
  syncKeyboardInset()
}

async function qaShowQuiz(
  subject: 'bones' | 'muscles',
  id: string,
  keyboardPx: number,
  level: Level = 'memory',
): Promise<FramingReport> {
  pinForcedKeyboard(keyboardPx)
  if (state.viewing) {
    scene.exitView()
    state.viewing = false
  }
  state.subject = subject
  state.playing = true
  state.finished = false
  state.revealing = false
  state.viewing = false
  state.mode = level
  state.levels = [level]
  state.levelIndex = 0
  state.typed = ''
  state.correct = 0
  state.attempts = 0
  menuOverlay.hidden = true
  playHud.hidden = false
  viewPanel.hidden = true
  viewPanel.classList.remove('is-expanded')
  chromeTop.hidden = false
  chromeTop.classList.remove('is-view')
  viewFilters.hidden = true
  viewFilters.classList.remove('is-quiz')
  sideViews.hidden = true
  scene.setLook('solid')
  syncLookButtons()
  if (subject === 'muscles') await scene.setSubjectAsync('muscles')
  else scene.setSubject('bones')
  if (!state.playing) return scene.getFramingReport()
  const sel = qaEntry(subject, id)
  state.queue = [
    subject === 'muscles'
      ? muscleToEntry(MUSCLES.find((m) => m.id === id)!)
      : boneToEntry(AXIAL_BONES.find((b) => b.id === id)!),
  ]
  state.index = 0
  updateHud()
  syncFramingInsetsNow()
  scene.setTarget(sel.meshNames, catalogViewFor(sel.kind, sel.id))
  await scene.whenPoseSettled()
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  return scene.getFramingReport()
}

async function qaShowView(subject: 'bones' | 'muscles', id: string): Promise<FramingReport> {
  pinForcedKeyboard(0)
  scene.setLook('solid')
  if (!state.viewing) await startView()
  scene.setLook('solid')
  syncLookButtons()
  const sel = qaEntry(subject, id)
  viewPanel.classList.add('is-expanded')
  viewPanelToggle.setAttribute('aria-expanded', 'true')
  applyViewSelection(sel)
  syncFramingInsetsNow()
  scene.frameViewSelection(meshesToFrame(sel), catalogViewFor(sel.kind, sel.id))
  await scene.whenPoseSettled()
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  return scene.getFramingReport()
}

function qaShowCommonBones(): { count: number; total: number; label: string } {
  if (state.viewing) {
    scene.exitView()
    state.viewing = false
  }
  state.playing = false
  state.subject = 'bones'
  commonBonesOnly = true
  showMenu()
  return {
    count: filterCommonBones().length,
    total: AXIAL_BONES.length,
    label: poolCount.textContent ?? '',
  }
}

async function qaShowStudy(): Promise<Record<string, unknown>> {
  pinForcedKeyboard(0)
  if (state.caseActive || state.playing) showMenu()
  if (!state.viewing) await startView()
  applyViewSelection(null)
  viewPanel.classList.remove('is-expanded', 'has-selection')
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  const contextStyle = getComputedStyle(document.querySelector('#chrome-context')!)
  return {
    viewing: state.viewing,
    context: (quizContext.textContent ?? '').trim(),
    contextDisplay: contextStyle.display,
  }
}

async function qaShowAnkle(
  mode: 'menu' | 'learn' | 'motion' | 'injury' | 'ligaments' | 'type' | 'tap' | 'palpation',
  keyboardPx = 0,
): Promise<Record<string, unknown>> {
  pinForcedKeyboard(keyboardPx)
  if (mode === 'menu') {
    showMenu()
    const btn = btnAnkleCase
    const rect = btn.getBoundingClientRect()
    return {
      title: btn.querySelector('.mode-title')?.textContent ?? '',
      sub: btn.querySelector('.mode-sub')?.textContent ?? '',
      visible: rect.width > 8 && rect.height > 8,
    }
  }
  if (!state.caseActive || state.caseKind !== 'ankle') await startAnkleCase('learn')
  if (mode === 'learn' || mode === 'motion' || mode === 'injury' || mode === 'ligaments') {
    state.casePhase = 'learn'
    state.caseLearnIndex = mode === 'ligaments' ? 2 : 1
    casePanel.hidden = false
    playHud.hidden = true
    renderLearnCard()
    scene.holdAnklePose(mode === 'injury' ? ANKLE_INJURY_U : 0)
  } else {
    const index = mode === 'type' ? 0 : mode === 'tap' ? 2 : 4
    state.casePhase = 'quiz'
    state.caseQuizIndex = index
    state.finished = false
    state.revealing = false
    state.typed = mode === 'type' ? 'at' : ''
    casePanel.hidden = true
    playHud.hidden = false
    scene.holdAnklePose(0)
    scene.setAnkleEmphasis('none')
    scene.setAnkleLigamentLabels(false)
    renderCaseHud()
  }
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  const prompt = promptBlock.getBoundingClientRect()
  const skip = skipBtn.getBoundingClientRect()
  const panel = casePanel.getBoundingClientRect()
  return {
    ...scene.getAnkleReport(),
    mode,
    keyboard: currentKeyboardInset(),
    promptBottom: Math.round(prompt.bottom),
    skipBottom: Math.round(skip.bottom),
    skipHidden: skipBtn.hidden,
    panelHidden: casePanel.hidden,
    panelTop: Math.round(panel.top),
    title: caseTitle.textContent,
    prompt: glossLine.textContent,
    label: typeLabel.textContent,
    innerHeight: window.innerHeight,
  }
}

function qaTypeBar(): Record<string, unknown> {
  const prompt = promptBlock.getBoundingClientRect()
  const skip = skipBtn.getBoundingClientRect()
  const word = targetWord.getBoundingClientRect()
  const check = checkBtn.getBoundingClientRect()
  const inputStyle = getComputedStyle(hiddenInput)
  const wordStyle = getComputedStyle(targetWord)
  const hintStyle = getComputedStyle(tapHint)
  const checkStyle = getComputedStyle(checkBtn)
  const promptStyle = getComputedStyle(promptBlock)
  const menuLook = document.querySelector('#menu-overlay [data-look]')
  const quizLook = document.querySelector('#quiz-look')
  const lookStyle = quizLook ? getComputedStyle(quizLook) : null
  return {
    inset: currentKeyboardInset(),
    innerHeight: window.innerHeight,
    promptBottom: Math.round(prompt.bottom),
    skipBottom: Math.round(skip.bottom),
    wordTop: Math.round(word.top),
    wordBottom: Math.round(word.bottom),
    wordHeight: Math.round(word.height),
    hudHidden: playHud.hidden,
    skipHidden: skipBtn.hidden,
    skipText: (skipBtn.textContent ?? '').replace(/\s+/g, ' ').trim(),
    checkHidden: checkBtn.hidden || checkStyle.display === 'none',
    checkText: (checkBtn.textContent ?? '').trim(),
    checkBg: checkStyle.backgroundColor,
    checkBottom: Math.round(check.bottom),
    menuHidden: menuOverlay.hidden,
    caseHidden: casePanel.hidden,
    caseTitle: caseTitle.textContent ?? '',
    tapText: (tapHint.textContent ?? '').trim(),
    tapVisible: hintStyle.display !== 'none' && tapHint.classList.contains('is-visible'),
    label: (typeLabel.textContent ?? '').trim(),
    prompt: (glossLine.textContent ?? '').trim(),
    context: (quizContext.textContent ?? '').trim(),
    progress: (pillRound.textContent ?? '').trim(),
    progressWidth: quizProgressFill.style.width,
    round: quizRound.hidden ? '' : (quizRound.textContent ?? '').trim(),
    promptPanel: promptBlock.classList.contains('panel'),
    promptBg: promptStyle.backgroundColor,
    promptShadow: promptStyle.boxShadow,
    menuLook: Boolean(menuLook),
    lookVisible: Boolean(lookStyle && lookStyle.display !== 'none' && !quizLook?.hasAttribute('hidden')),
    wordText: (targetWord.textContent ?? '').replace(/\s+/g, ' ').trim(),
    wordFont: Number.parseFloat(wordStyle.fontSize),
    inputBorder: inputStyle.borderTopWidth,
    inputColor: inputStyle.color,
    inputFill: inputStyle.getPropertyValue('-webkit-text-fill-color') || inputStyle.color,
    focused: document.activeElement === hiddenInput,
    sheetHidden: menuSheet.hidden,
  }
}

function qaSetKeyboardViewport(probe: {
  innerHeight: number
  visualHeight: number
  offsetTop: number
  scrollY: number
  focused: boolean
  arm: boolean
} | null): Record<string, unknown> {
  forcedKeyboardInset = null
  if (!probe) {
    keyboardProbe = null
    keyboardProbeFocused = null
    syncKeyboardInset()
    return qaTypeBar()
  }
  keyboardProbe = {
    innerHeight: probe.innerHeight,
    visualHeight: probe.visualHeight,
    offsetTop: probe.offsetTop,
    scrollY: probe.scrollY,
  }
  keyboardProbeFocused = probe.focused
  if (probe.arm) armKeyboardLift()
  syncKeyboardInset()
  return qaTypeBar()
}

function qaLayout(): Record<string, unknown> {
  const chrome = chromeTop.getBoundingClientRect()
  const panel = casePanel.getBoundingClientRect()
  const prompt = promptBlock.getBoundingClientRect()
  const context = quizContext.getBoundingClientRect()
  const promptStyle = getComputedStyle(promptBlock)
  const licence = document.querySelector<HTMLElement>('.footer-attr')
  const licenceStyle = licence ? getComputedStyle(licence) : null
  const bg = promptStyle.backgroundColor
  const shadow = promptStyle.boxShadow
  const transparent = bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)'
  return {
    chromeTop: Math.round(chrome.top),
    chromeBottom: Math.round(chrome.bottom),
    chromeLeft: Math.round(chrome.left),
    chromeRight: Math.round(chrome.right),
    contextLeft: Math.round(context.left),
    contextRight: Math.round(context.right),
    contextText: (quizContext.textContent ?? '').trim(),
    panelHidden: casePanel.hidden,
    panelTop: Math.round(panel.top),
    panelBottom: Math.round(panel.bottom),
    panelLeft: Math.round(panel.left),
    panelRight: Math.round(panel.right),
    title: caseTitle.textContent ?? '',
    prompt: (glossLine.textContent ?? '').trim(),
    label: (typeLabel.textContent ?? '').trim(),
    promptTop: Math.round(prompt.top),
    promptBottom: Math.round(prompt.bottom),
    promptBg: bg,
    promptShadow: shadow,
    promptRaised: !transparent || (shadow !== 'none' && shadow !== ''),
    skipBottom: Math.round(skipBtn.getBoundingClientRect().bottom),
    skipHidden: skipBtn.hidden,
    licenceText: (licence?.textContent ?? '').replace(/\s+/g, ' ').trim(),
    licenceSize: licenceStyle ? Number.parseFloat(licenceStyle.fontSize) : 0,
    licenceOpacity: licenceStyle ? Number.parseFloat(licenceStyle.opacity) : 1,
    licenceTop: licence ? Math.round(licence.getBoundingClientRect().top) : 0,
    licenceBottom: licence ? Math.round(licence.getBoundingClientRect().bottom) : 0,
    licenceLeft: licence ? Math.round(licence.getBoundingClientRect().left) : 0,
    licenceRight: licence ? Math.round(licence.getBoundingClientRect().right) : 0,
    licenceDisplay: licenceStyle?.display ?? '',
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    progress: (pillRound.textContent ?? '').trim(),
  }
}

async function qaShowStudyCase(
  kind: 'actions' | 'hamstring',
  mode: 'menu' | 'learn' | 'type' | 'tap' | 'peak' | 'rest',
  keyboardPx = 0,
): Promise<Record<string, unknown>> {
  pinForcedKeyboard(keyboardPx)
  if (mode === 'menu') {
    showMenu()
    const sport = btnMuscleActions
    const ham = btnHamstringCase
    const target = kind === 'actions' ? sport : ham
    target.scrollIntoView({ block: 'center' })
    const sportRect = sport.getBoundingClientRect()
    const hamRect = ham.getBoundingClientRect()
    return {
      sportTitle: sport.querySelector('.mode-title')?.textContent ?? '',
      hamTitle: ham.querySelector('.mode-title')?.textContent ?? '',
      sportVisible: sportRect.width > 8 && sportRect.bottom > 0 && sportRect.top < window.innerHeight,
      hamVisible: hamRect.width > 8 && hamRect.bottom > 0 && hamRect.top < window.innerHeight,
      ...qaLayout(),
    }
  }
  if (!state.caseActive || state.caseKind !== kind) await startStudyCase(kind)
  const learn = kind === 'hamstring' ? HAMSTRING_LEARN : ACTION_LEARN
  const quiz = kind === 'hamstring' ? HAMSTRING_QUIZ : ACTION_QUIZ
  if (mode === 'learn' || mode === 'peak' || mode === 'rest') {
    const motionIndex = learn.findIndex((card) => card.motion)
    const index = mode === 'learn' ? 0 : motionIndex
    state.casePhase = 'learn'
    state.caseLearnIndex = index < 0 ? 0 : index
    state.finished = false
    appliedFocusId = ''
    casePanel.hidden = false
    playHud.hidden = true
    renderLearnCard()
    const card = learn[state.caseLearnIndex]
    const holdPeak = mode === 'peak' || (mode === 'learn' && !!card && card.focus.cue !== 'none')
    if (card) scene.holdStudyCue(holdPeak ? 1 : 0)
  } else {
    const index = quiz.findIndex((step) => step.kind === (mode === 'tap' ? 'tap' : 'type'))
    state.casePhase = 'quiz'
    state.caseQuizIndex = index < 0 ? 0 : index
    state.finished = false
    state.revealing = false
    state.typed = ''
    appliedFocusId = ''
    casePanel.hidden = true
    playHud.hidden = false
    renderCaseHud()
  }
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  return { ...scene.getStudyReport(), ...qaLayout(), mode, kind }
}

/** Let a learn card or quiz step play its cue. Does not freeze the pose. */
async function qaPlayStudy(
  kind: 'actions' | 'hamstring',
  phase: 'learn' | 'quiz',
  which: number | string,
): Promise<Record<string, unknown>> {
  pinForcedKeyboard(0)
  if (!state.caseActive || state.caseKind !== kind) await startStudyCase(kind)
  appliedFocusId = ''
  if (phase === 'learn') {
    state.casePhase = 'learn'
    state.caseLearnIndex = typeof which === 'number' ? which : 0
    state.finished = false
    casePanel.hidden = false
    playHud.hidden = true
    renderLearnCard()
  } else {
    const quiz = kind === 'hamstring' ? HAMSTRING_QUIZ : ACTION_QUIZ
    const id = String(which)
    const index = quiz.findIndex((step) => step.id === id)
    state.casePhase = 'quiz'
    state.caseQuizIndex = index < 0 ? 0 : index
    state.finished = false
    state.revealing = false
    state.typed = ''
    hiddenInput.value = ''
    casePanel.hidden = true
    playHud.hidden = false
    renderCaseHud()
  }
  syncFramingInsetsNow()
  await scene.whenPoseSettled()
  return { ...scene.getStudyReport(), ...qaLayout(), phase, kind }
}

function qaStudySample(): Record<string, unknown> {
  return { ...scene.getStudyReport(), ...qaLayout() }
}

function qaReplayStudy(): Record<string, unknown> {
  scene.replayStudyCue()
  return qaStudySample()
}

/** In-page pointer drag. OrbitControls listens on the canvas; this is not an OS mouse drag. */
function qaOrbitStudy(): Record<string, unknown> {
  const rect = mainCanvas.getBoundingClientRect()
  const x = rect.left + rect.width * 0.55
  const y = rect.top + rect.height * 0.42
  const fire = (type: string, cx: number, cy: number, buttons: number) => {
    mainCanvas.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        pointerType: 'mouse',
        clientX: cx,
        clientY: cy,
        button: 0,
        buttons,
        isPrimary: true,
      }),
    )
  }
  fire('pointerdown', x, y, 1)
  fire('pointermove', x + 72, y + 28, 1)
  fire('pointerup', x + 72, y + 28, 0)
  return qaStudySample()
}

function installQaHooks(): void {
  const api = {
    showQuiz: qaShowQuiz,
    showView: qaShowView,
    showCommonBones: qaShowCommonBones,
    showAnkle: qaShowAnkle,
    showStudy: qaShowStudy,
    showStudyCase: qaShowStudyCase,
    playStudy: qaPlayStudy,
    studySample: qaStudySample,
    replayStudy: qaReplayStudy,
    orbitStudy: qaOrbitStudy,
    typeBar: qaTypeBar,
    setKeyboardViewport: qaSetKeyboardViewport,
    report: () => scene.getFramingReport(),
    ankleReport: () => scene.getAnkleReport(),
    simulateControlsEnd: () => {
      scene.simulateControlsEnd()
      return scene.getAnkleReport()
    },
  }
  ;(window as unknown as { __anatomyQA: typeof api }).__anatomyQA = api
}

async function runQaMode(mode: string): Promise<void> {
  if (mode === 'shot') return
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
      ], 'anterior-medial')
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
  if (mode === 'muscles-menu') {
    state.subject = 'muscles'
    await scene.setSubjectAsync('muscles')
    showMenu()
    scene.freezeUprightProof()
    await wait(800)
    return
  }
  if (mode === 'scaphoid') {
    state.subject = 'bones'
    setPreset('hand_wrist')
    state.mode = 'see'
    state.sessionCount = 8
    await startSession()
    const scaphoid = AXIAL_BONES.find((b) => b.id === 'scaphoid')
    if (scaphoid) {
      const entry = boneToEntry(scaphoid)
      state.queue = [entry, ...state.queue.filter((b) => b.id !== 'scaphoid')]
      state.index = 0
      applyTarget()
      updateHud()
    }
    await wait(800)
    return
  }
  if (mode === 'muscles' || mode === 'muscles-slice') {
    state.subject = 'muscles'
    scene.setSubject('muscles')
    for (const r of MUSCLE_REGIONS) selectedMuscleRegions.add(r.id)
    state.mode = 'see'
    state.sessionCount = 6
    await startSession()
    const deltoid = MUSCLES.find((b) => b.id === 'deltoid')
    if (deltoid) {
      const entry = muscleToEntry(deltoid)
      state.queue = [entry, ...state.queue.filter((b) => b.id !== 'deltoid')]
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
    const cartilage = names.filter((k) =>
      k.startsWith('costal_') ||
      k.startsWith('disc_') ||
      k.startsWith('nasal_') ||
      k.startsWith('arytenoid_') ||
      k.startsWith('corniculate_') ||
      k.startsWith('cuneiform_') ||
      k === 'thyroid_cartilage' ||
      k === 'cricoid' ||
      k === 'epiglottis',
    )
    console.info('[skeleton] meshes', names.length, 'ribs', ribs.length, 'cartilage', cartilage.length, 'catalog', CARTILAGE.length)
    setPreset('all')
    subjectCount.textContent = `${AXIAL_BONES.length} · ${BONE_REGIONS.length} regions`
    muscleCountEl.textContent = `${MUSCLES.length} · ${MUSCLE_REGIONS.length} regions`
    scene.setLook(currentLook)
    syncLookButtons()
    showMenu()
    updatePoolCount()
    const qa = new URLSearchParams(location.search).get('qa')
    if (qa) {
      installQaHooks()
      await runQaMode(qa)
    }
  } catch (err) {
    console.error(err)
    statusEl.classList.add('error')
    statusEl.textContent = 'Failed to load 3D model'
  }
})()
