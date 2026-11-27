/**
 * Headless framing screenshots. Drives the app through the QA hook
 * (no canvas clicks). Chrome is the system binary; no Playwright.
 *
 *   node scripts/qa-frame.mjs
 */
import { spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'

const CHROME = '/usr/bin/google-chrome-stable'
const PORT = 9333
const OUT = '/opt/cursor/artifacts'
const BASE = process.env.QA_URL ?? 'http://127.0.0.1:5173'

const shots = []
const only = new Set(
  (process.env.QA_ONLY ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
)
const want = (name) => only.size === 0 || only.has(name)

function launchChrome() {
  return spawn(
    CHROME,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      `--remote-debugging-port=${PORT}`,
      '--user-data-dir=/tmp/chrome-qa-frame',
      '--window-size=1440,900',
      'about:blank',
    ],
    { stdio: 'ignore' },
  )
}

async function waitForChrome() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (res.ok) return
    } catch {
      /* retry */
    }
    await delay(200)
  }
  throw new Error('Chrome did not open a debugging port')
}

class Cdp {
  constructor(ws) {
    this.ws = ws
    this.next = 1
    this.pending = new Map()
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        if (msg.error) reject(new Error(JSON.stringify(msg.error)))
        else resolve(msg.result)
      }
    })
  }

  send(method, params = {}) {
    const id = this.next++
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async evaluate(expression, awaitPromise = false) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise,
      returnByValue: true,
      timeout: 180000,
    })
    if (result.exceptionDetails) {
      const desc = result.exceptionDetails.exception?.description ?? JSON.stringify(result.exceptionDetails)
      throw new Error(desc)
    }
    return result.result?.value
  }
}

async function connectPage() {
  let created = null
  for (const method of ['PUT', 'GET']) {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method })
    if (res.ok) {
      created = await res.json()
      break
    }
  }
  if (!created?.webSocketDebuggerUrl) {
    const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json())
    created = list.find((t) => t.type === 'page') ?? list[0]
  }
  const ws = new WebSocket(created.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve)
    ws.addEventListener('error', () => reject(new Error('debugger socket failed')))
  })
  const cdp = new Cdp(ws)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  return { cdp, ws }
}

async function setViewport(cdp, width, height, mobile) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  })
  if (mobile) {
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })
  } else {
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false })
  }
}

async function openApp(cdp, touch) {
  const url = `${BASE}/?qa=shot${touch ? '&touch=1' : ''}`
  await cdp.send('Page.navigate', { url })
  const deadline = Date.now() + 180000
  while (Date.now() < deadline) {
    const ready = await cdp.evaluate(`Boolean(window.__anatomyQA)`)
    if (ready) return
    await delay(400)
  }
  const text = await cdp.evaluate(`document.body ? document.body.innerText.slice(0, 400) : 'no body'`)
  throw new Error(`app did not become ready: ${text}`)
}

async function shot(cdp, name, width, height, mobile, run) {
  if (!want(name)) return
  await setViewport(cdp, width, height, mobile)
  await delay(350)
  const report = await run()
  await delay(200)
  const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
  const file = `${OUT}/${name}.png`
  await writeFile(file, Buffer.from(png.data, 'base64'))
  shots.push({ name, width, height, mobile, file, report })
  console.log(name, JSON.stringify(report))
}

function assertStudyLayout(report, label, expect, kind) {
  const fail = (msg) => {
    throw new Error(`${label}: ${msg}\n${JSON.stringify(report)}`)
  }
  if (expect === 'menu') {
    if (report.sportTitle !== 'Muscle actions') fail(`sport title ${report.sportTitle}`)
    if (report.hamTitle !== 'Grade II hamstring strain') fail(`ham title ${report.hamTitle}`)
    if (kind === 'actions' && !report.sportVisible) fail('Muscle actions card is off screen')
    if (kind === 'hamstring' && !report.hamVisible) fail('hamstring card is off screen')
    console.log(`ok ${label} menu`)
    return
  }
  if (!report.active) fail('study module is not active')
  if (report.spinning) fail('study module is auto-spinning')
  if (Math.abs(report.yaw || 0) > 0.02) fail(`yaw drifted ${report.yaw}`)
  if (report.contextRight > report.innerWidth + 1 || report.contextLeft < -1) {
    fail(`context clipped ${report.contextLeft}–${report.contextRight} of ${report.innerWidth}`)
  }
  if (report.chromeRight > report.innerWidth + 1 || report.chromeLeft < -1) {
    fail(`chrome clipped ${report.chromeLeft}–${report.chromeRight}`)
  }
  if (!report.contextText) fail('missing quiz context')
  const highlighted = report.highlighted || []
  if (highlighted.length === 0) fail('no muscle highlighted')
  if (expect === 'learn' || expect === 'peak' || expect === 'rest') {
    if (report.panelHidden) fail('learn copy is hidden')
    if (!report.title) fail('missing learn title')
    if (report.panelTop < report.chromeBottom - 2) {
      fail(`lesson covers the top HUD, panel ${report.panelTop} chrome ${report.chromeBottom}`)
    }
    if (report.licenceDisplay === 'none') fail('licence hidden on the learn screen')
    if (!(report.licenceSize > 0 && report.licenceSize <= 13)) fail(`licence size ${report.licenceSize}`)
    if (!(report.licenceOpacity <= 0.55)) fail(`licence opacity ${report.licenceOpacity}`)
    if (!/BodyParts3D/i.test(report.licenceText || '')) fail('BodyParts3D attribution missing')
    const overlaps =
      report.licenceTop < report.panelBottom - 4 &&
      report.licenceBottom > report.panelTop + 4 &&
      report.licenceRight > report.panelLeft + 8 &&
      report.licenceLeft < report.panelRight - 8
    if (overlaps) {
      fail(
        `licence covers the lesson, licence ${report.licenceTop}–${report.licenceBottom} panel ${report.panelTop}–${report.panelBottom}`,
      )
    }
  }
  if (expect === 'type' || expect === 'tap') {
    if (report.promptRaised) fail(`prompt is a raised panel bg ${report.promptBg} shadow ${report.promptShadow}`)
    if (!report.prompt) fail('missing prompt')
    if (report.promptTop < report.chromeBottom - 2) fail(`prompt covers the top HUD ${report.promptTop}`)
  }
  if (expect === 'type' && report.keyboard > 0) {
    const limit = report.innerHeight - report.keyboard + 8
    if (report.promptBottom > limit) fail(`prompt under the keyboard ${report.promptBottom} > ${limit}`)
    if (!report.skipHidden && report.skipBottom > limit) fail(`Skip under the keyboard ${report.skipBottom}`)
  }
  if (expect === 'peak') {
    if (!report.pose || Math.abs(report.pose.primary) < 0.15) fail(`bone cue did not pose ${JSON.stringify(report.pose)}`)
  }
  if (expect === 'rest') {
    if (report.pose && (Math.abs(report.pose.primary) > 0.02 || Math.abs(report.pose.knee) > 0.02)) {
      fail(`rest pose is not neutral ${JSON.stringify(report.pose)}`)
    }
  }
  if (expect === 'tap' || expect === 'type' || expect === 'peak') {
    const picks = report.picks || {}
    const hits = Object.values(picks).filter((hit) => hit && hit !== 'bone' && hit !== 'other' && hit !== 'other-side')
    if (hits.length === 0) fail(`highlight center was not the lit muscle ${JSON.stringify(picks)}`)
  }
  console.log(`ok ${label} ${report.contextText || ''} ${report.title || report.label || ''}`)
}

function poseDelta(a, b) {
  return Math.abs((a.pose?.primary ?? 0) - (b.pose?.primary ?? 0)) + Math.abs((a.pose?.knee ?? 0) - (b.pose?.knee ?? 0))
}

function pointGap(a, b) {
  if (!a || !b) return Infinity
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}

function assertYawStill(report, label) {
  if (report.spinning) throw new Error(`${label} is auto-spinning`)
  if (Math.abs(report.yaw || 0) > 0.02) throw new Error(`${label} yaw drifted ${report.yaw}`)
}

function assertOnScreen(report, name, label, learn) {
  const s = report.screen?.[name]
  if (!s) throw new Error(`${label} has no screen point for ${name}`)
  if (!s.inFrame) throw new Error(`${label} ${name} left the frame ${JSON.stringify(s)}`)
  if (s.y < report.chromeBottom - 1) {
    throw new Error(`${label} ${name} is under the top HUD y=${s.y} chrome ${report.chromeBottom}`)
  }
  if (learn && !report.panelHidden && s.y > report.panelTop + 2) {
    throw new Error(`${label} ${name} is under the lesson y=${s.y} panel ${report.panelTop}`)
  }
}

async function assertCueMotion(cdp) {
  let touchPage = null
  const prepare = async (width, height, mobile) => {
    await setViewport(cdp, width, height, mobile)
    await delay(240)
    if (touchPage !== mobile) {
      await openApp(cdp, mobile)
      touchPage = mobile
    }
  }
  const play = (kind, phase, which) =>
    cdp.evaluate(
      `window.__anatomyQA.playStudy(${JSON.stringify(kind)}, ${JSON.stringify(phase)}, ${JSON.stringify(which)})`,
      true,
    )
  const sample = () => cdp.evaluate(`window.__anatomyQA.studySample()`)
  const replay = () => cdp.evaluate(`window.__anatomyQA.replayStudy()`, true)
  // Headless Chrome can pause requestAnimationFrame between CDP calls.
  // Wait on the page so the limb cue keeps ticking.
  const playFor = (ms) =>
    cdp.evaluate(
      `new Promise((resolve) => {
        const start = performance.now()
        const step = () => {
          if (performance.now() - start >= ${ms}) resolve(window.__anatomyQA.studySample())
          else requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      })`,
      true,
    )

  async function clip(label, kind, phase, which, learn) {
    await play(kind, phase, which)
    const start = await replay()
    assertYawStill(start, `${label} start`)
    const mid = await playFor(900)
    assertYawStill(mid, `${label} mid`)
    if (poseDelta(start, mid) < 0.06) {
      throw new Error(
        `${label} did not move ${JSON.stringify(start.pose)} -> ${JSON.stringify(mid.pose)} playing ${start.playing}->${mid.playing} u ${start.motionU}->${mid.motionU}`,
      )
    }
    const end = await playFor(2200)
    assertYawStill(end, `${label} end`)
    if (end.playing && (end.motionU ?? 0) < 0.98) {
      throw new Error(`${label} did not finish playing u=${end.motionU}`)
    }
    if (learn) {
      const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
      await writeFile(`${OUT}/motion-${label}.png`, Buffer.from(png.data, 'base64'))
    }
    const again = await replay()
    assertYawStill(again, `${label} replay`)
    if (poseDelta(end, again) < 0.08) {
      throw new Error(`${label} replay did not restart ${JSON.stringify(end.pose)} -> ${JSON.stringify(again.pose)}`)
    }
    return { start, end, again, learn }
  }

  const shots = [
    ['iphone-knee', 'actions', 'learn', 2, 390, 844, true],
    ['iphone-elbow', 'actions', 'learn', 0, 390, 844, true],
    ['iphone-hip', 'actions', 'learn', 1, 390, 844, true],
    ['iphone-ankle', 'actions', 'learn', 3, 390, 844, true],
    ['iphone-arm', 'actions', 'learn', 4, 390, 844, true],
    ['iphone-swing', 'hamstring', 'learn', 1, 390, 844, true],
    ['desk-knee', 'actions', 'learn', 2, 1440, 900, false],
    ['mac-elbow', 'actions', 'learn', 0, 1728, 1117, false],
    ['mac-knee', 'actions', 'learn', 2, 1728, 1117, false],
  ]

  for (const [label, kind, phase, which, width, height, mobile] of shots) {
    await prepare(width, height, mobile)
    const learn = phase === 'learn'
    const run = await clip(label, kind, phase, which, learn)
    const { start, end } = run
    if (label.endsWith('knee')) {
      if (!(end.pose.primary < -0.55 && end.pose.knee < 0.08)) {
        throw new Error(`${label} kick did not reach the raised straight leg ${JSON.stringify(end.pose)}`)
      }
      if (!(start.pose.knee > 0.6 && Math.abs(start.pose.primary) < 0.08)) {
        throw new Error(`${label} kick did not restart bent ${JSON.stringify(start.pose)}`)
      }
      const boneMove = pointGap(start.points?.femur_r, end.points?.femur_r)
      const muscleMove = pointGap(start.points?.rectus_fem_r, end.points?.rectus_fem_r)
      if (boneMove < 0.08) throw new Error(`${label} femur only moved ${boneMove}`)
      if (muscleMove < boneMove * 0.45) {
        throw new Error(`${label} rectus stayed behind the femur muscle ${muscleMove} bone ${boneMove}`)
      }
      const g0 = pointGap(start.points?.rectus_fem_r, start.points?.femur_r)
      const g1 = pointGap(end.points?.rectus_fem_r, end.points?.femur_r)
      if (Math.abs(g1 - g0) > 0.1) throw new Error(`${label} rectus left the femur ${g0} -> ${g1}`)
      for (const name of ['rectus_fem_r', 'femur_r', 'talus_r']) assertOnScreen(end, name, label, learn)
    }
    if (label.endsWith('elbow')) {
      if (!(end.pose.primary < -0.95)) throw new Error(`${label} elbow did not flex ${JSON.stringify(end.pose)}`)
      const radiusMove = pointGap(start.points?.radius_r, end.points?.radius_r)
      if (radiusMove < 0.1) throw new Error(`${label} radius only moved ${radiusMove}`)
      const handName = end.points?.phal_hand_dist_middle_r ? 'phal_hand_dist_middle_r' : 'metacarpal3_r'
      const handMove = pointGap(start.points?.[handName], end.points?.[handName])
      if (handMove < 0.08) throw new Error(`${label} hand only moved ${handMove}`)
      for (const name of ['biceps_long_r', 'radius_r', handName]) assertOnScreen(end, name, label, learn)
      const g0 = pointGap(start.points?.biceps_long_r, start.points?.humerus_r)
      const g1 = pointGap(end.points?.biceps_long_r, end.points?.humerus_r)
      if (Math.abs(g1 - g0) > 0.1) throw new Error(`${label} biceps left the arm ${g0} -> ${g1}`)
    }
    if (label.endsWith('hip')) {
      if (!(end.pose.primary < -0.4)) throw new Error(`${label} hip did not abduct ${JSON.stringify(end.pose)}`)
      const boneMove = pointGap(start.points?.femur_r, end.points?.femur_r)
      const muscleMove = pointGap(start.points?.glut_med_r, end.points?.glut_med_r)
      if (boneMove < 0.06) throw new Error(`${label} femur only moved ${boneMove}`)
      if (muscleMove < 0.02) throw new Error(`${label} glute med did not move ${muscleMove}`)
      for (const name of ['glut_med_r', 'femur_r', 'talus_r']) assertOnScreen(end, name, label, learn)
    }
    if (label.endsWith('ankle')) {
      if (!(end.pose.primary > 0.5)) throw new Error(`${label} foot did not plantarflex ${JSON.stringify(end.pose)}`)
      const heelMove = pointGap(start.points?.calcaneus_r, end.points?.calcaneus_r)
      const toeName = end.points?.phal_foot_dist_1_r ? 'phal_foot_dist_1_r' : 'metatarsal1_r'
      const toeMove = pointGap(start.points?.[toeName], end.points?.[toeName])
      if (heelMove < 0.02) throw new Error(`${label} heel only moved ${heelMove}`)
      if (toeMove < 0.03) throw new Error(`${label} forefoot only moved ${toeMove}`)
      const toeY0 = start.points?.[toeName]?.y
      const toeY1 = end.points?.[toeName]?.y
      if (!(toeY1 < toeY0 - 0.01)) throw new Error(`${label} forefoot did not drop ${toeY0} -> ${toeY1}`)
      const g0 = pointGap(start.points?.gastroc_lat_r, start.points?.calcaneus_r)
      const g1 = pointGap(end.points?.gastroc_lat_r, end.points?.calcaneus_r)
      if (g1 > g0 + 0.12) throw new Error(`${label} gastroc left the heel ${g0} -> ${g1}`)
      for (const name of ['gastroc_lat_r', 'calcaneus_r', toeName]) assertOnScreen(end, name, label, learn)
    }
    if (label.endsWith('arm')) {
      if (!(end.pose.primary < -0.6)) throw new Error(`${label} arm did not abduct ${JSON.stringify(end.pose)}`)
      const boneMove = pointGap(start.points?.humerus_r, end.points?.humerus_r)
      const muscleMove = pointGap(start.points?.delt_acro_r, end.points?.delt_acro_r)
      if (boneMove < 0.06) throw new Error(`${label} humerus only moved ${boneMove}`)
      if (muscleMove < boneMove * 0.3) throw new Error(`${label} deltoid left the arm ${muscleMove} vs ${boneMove}`)
      const handName = end.points?.phal_hand_dist_middle_r ? 'phal_hand_dist_middle_r' : 'metacarpal3_r'
      for (const name of ['delt_acro_r', 'humerus_r', handName]) assertOnScreen(end, name, label, learn)
    }
    if (label.endsWith('swing')) {
      if (!(end.pose.primary < -0.5 && end.pose.knee > 0.1)) {
        throw new Error(`${label} late swing did not lengthen ${JSON.stringify(end.pose)}`)
      }
      const z0 = start.points?.tibia_r?.z
      const z1 = end.points?.tibia_r?.z
      if (!(z1 > z0 + 0.02)) throw new Error(`${label} tibia did not swing forward ${z0} -> ${z1}`)
      const muscleMove = pointGap(start.points?.bf_long_r, end.points?.bf_long_r)
      if (muscleMove < 0.03) throw new Error(`${label} biceps femoris did not move ${muscleMove}`)
      for (const name of ['bf_long_r', 'femur_r', 'tibia_r']) assertOnScreen(end, name, label, learn)
    }
    console.log(
      `ok motion ${label} pose ${JSON.stringify(end.pose)} seated ${JSON.stringify(end.seated)} yaw ${end.yaw}`,
    )
  }

  await prepare(390, 844, true)
  const quizzes = [
    ['quiz-rectus', 'actions', 'type-rectus', (start, end) => {
      if (!(end.pose.primary < -0.55 && end.pose.knee < 0.08)) {
        throw new Error(`quiz-rectus did not kick ${JSON.stringify(end.pose)}`)
      }
      const muscleMove = pointGap(start.points?.rectus_fem_r, end.points?.rectus_fem_r)
      if (muscleMove < 0.05) throw new Error(`quiz-rectus muscle did not move ${muscleMove}`)
    }],
    ['quiz-vastus', 'actions', 'tap-vastus-lat', (start, end) => {
      if (Math.abs(end.pose.primary) > 0.08) throw new Error(`quiz-vastus did not finish extended ${JSON.stringify(end.pose)}`)
      if (!(start.pose.primary > 0.5)) throw new Error(`quiz-vastus did not start bent ${JSON.stringify(start.pose)}`)
      const shin = pointGap(start.points?.tibia_r, end.points?.tibia_r)
      if (shin < 0.06) throw new Error(`quiz-vastus tibia only moved ${shin}`)
      const g0 = pointGap(start.points?.vastus_lat_r, start.points?.femur_r)
      const g1 = pointGap(end.points?.vastus_lat_r, end.points?.femur_r)
      if (Math.abs(g1 - g0) > 0.1) throw new Error(`quiz-vastus left the femur ${g0} -> ${g1}`)
    }],
    ['quiz-biceps-fem', 'actions', 'type-biceps-fem', (start, end) => {
      if (!(end.pose.primary > 0.8)) throw new Error(`quiz-biceps-fem did not flex the knee ${JSON.stringify(end.pose)}`)
      const shin = pointGap(start.points?.tibia_r, end.points?.tibia_r)
      if (shin < 0.06) throw new Error(`quiz-biceps-fem tibia only moved ${shin}`)
      const muscleMove = pointGap(start.points?.bf_long_r, end.points?.bf_long_r)
      if (muscleMove < 0.015) throw new Error(`quiz-biceps-fem muscle did not move ${muscleMove}`)
    }],
    ['quiz-triceps', 'actions', 'type-triceps', (start, end) => {
      if (Math.abs(end.pose.primary) > 0.08) throw new Error(`quiz-triceps did not finish extended ${JSON.stringify(end.pose)}`)
      if (!(start.pose.primary < -0.5)) throw new Error(`quiz-triceps did not start bent ${JSON.stringify(start.pose)}`)
      const radius = pointGap(start.points?.radius_r, end.points?.radius_r)
      if (radius < 0.08) throw new Error(`quiz-triceps radius only moved ${radius}`)
    }],
    ['quiz-gastroc', 'actions', 'type-gastroc', (start, end) => {
      if (!(end.pose.primary > 0.5)) throw new Error(`quiz-gastroc did not plantarflex ${JSON.stringify(end.pose)}`)
      const foot = pointGap(start.points?.calcaneus_r, end.points?.calcaneus_r)
      if (foot < 0.02) throw new Error(`quiz-gastroc heel only moved ${foot}`)
    }],
    ['quiz-biceps', 'actions', 'type-biceps', (start, end) => {
      if (!(end.pose.primary < -0.95)) throw new Error(`quiz-biceps did not flex the elbow ${JSON.stringify(end.pose)}`)
      const radius = pointGap(start.points?.radius_r, end.points?.radius_r)
      if (radius < 0.08) throw new Error(`quiz-biceps radius only moved ${radius}`)
      const handName = end.points?.phal_hand_dist_middle_r ? 'phal_hand_dist_middle_r' : 'metacarpal3_r'
      assertOnScreen(end, handName, 'quiz-biceps', false)
    }],
    ['quiz-tib-ant', 'actions', 'type-tib-ant', (start, end) => {
      if (!(end.pose.primary < -0.35)) throw new Error(`quiz-tib-ant did not dorsiflex ${JSON.stringify(end.pose)}`)
      const toeName = end.points?.phal_foot_dist_1_r ? 'phal_foot_dist_1_r' : 'calcaneus_r'
      const foot = pointGap(start.points?.[toeName], end.points?.[toeName])
      if (foot < 0.02) throw new Error(`quiz-tib-ant foot only moved ${foot}`)
      const y0 = start.points?.[toeName]?.y
      const y1 = end.points?.[toeName]?.y
      if (toeName.startsWith('phal') && !(y1 > y0 + 0.008)) {
        throw new Error(`quiz-tib-ant forefoot did not lift ${y0} -> ${y1}`)
      }
    }],
    ['quiz-deltoid', 'actions', 'tap-deltoid', (start, end) => {
      if (!(end.pose.primary < -0.6)) throw new Error(`quiz-deltoid did not abduct ${JSON.stringify(end.pose)}`)
      const muscleMove = pointGap(start.points?.delt_acro_r, end.points?.delt_acro_r)
      if (muscleMove < 0.03) throw new Error(`quiz-deltoid muscle did not move ${muscleMove}`)
    }],
    ['quiz-ham-swing', 'hamstring', 'type-mechanism', (start, end) => {
      if (!(end.pose.primary < -0.5)) throw new Error(`quiz-ham-swing did not swing ${JSON.stringify(end.pose)}`)
      const z0 = start.points?.tibia_r?.z
      const z1 = end.points?.tibia_r?.z
      if (!(z1 > z0 + 0.02)) throw new Error(`quiz-ham-swing tibia z ${z0} -> ${z1}`)
    }],
  ]
  for (const [label, kind, id, check] of quizzes) {
    const run = await clip(label, kind, 'quiz', id, false)
    check(run.start, run.end)
    assertYawStill(run.end, label)
    console.log(`ok motion ${label} pose ${JSON.stringify(run.end.pose)}`)
  }

  await prepare(390, 844, true)
  await play('actions', 'learn', 2)
  const orbited = await cdp.evaluate(`window.__anatomyQA.orbitStudy()`, true)
  assertYawStill(orbited, 'orbit')
  await cdp.evaluate(`window.__anatomyQA.simulateControlsEnd()`, true)
  const afterOrbit = await playFor(2200)
  assertYawStill(afterOrbit, 'after orbit')
  console.log(`ok motion orbit yaw ${afterOrbit.yaw} spinning ${afterOrbit.spinning}`)
}

async function assertStudyScene(cdp) {
  let touchPage = null
  const show = async (kind, mode, keyboard, width, height, mobile) => {
    await setViewport(cdp, width, height, mobile)
    await delay(280)
    if (touchPage !== mobile) {
      await openApp(cdp, mobile)
      touchPage = mobile
    }
    return cdp.evaluate(
      `window.__anatomyQA.showStudyCase(${JSON.stringify(kind)}, ${JSON.stringify(mode)}, ${keyboard})`,
      true,
    )
  }
  const layouts = [
    ['iphone-menu-sport', 'actions', 'menu', 0, 390, 844, true],
    ['iphone-menu-ham', 'hamstring', 'menu', 0, 390, 844, true],
    ['iphone-actions-learn', 'actions', 'learn', 0, 390, 844, true],
    ['iphone-actions-type', 'actions', 'type', 0, 390, 844, true],
    ['iphone-actions-type-kb', 'actions', 'type', 300, 390, 844, true],
    ['iphone-actions-tap', 'actions', 'tap', 0, 390, 844, true],
    ['iphone-actions-rest', 'actions', 'rest', 0, 390, 844, true],
    ['iphone-actions-peak', 'actions', 'peak', 0, 390, 844, true],
    ['iphone-ham-learn', 'hamstring', 'learn', 0, 390, 844, true],
    ['iphone-ham-tap', 'hamstring', 'tap', 0, 390, 844, true],
    ['iphone-ham-type', 'hamstring', 'type', 0, 390, 844, true],
    ['iphone-ham-rest', 'hamstring', 'rest', 0, 390, 844, true],
    ['iphone-ham-peak', 'hamstring', 'peak', 0, 390, 844, true],
    ['laptop-actions-learn', 'actions', 'learn', 0, 1024, 768, false],
    ['laptop-ham-type', 'hamstring', 'type', 0, 1024, 768, false],
    ['desk-actions-learn', 'actions', 'learn', 0, 1440, 900, false],
    ['desk-actions-type', 'actions', 'type', 0, 1440, 900, false],
    ['wide-actions-tap', 'actions', 'tap', 0, 1680, 1050, false],
    ['wide-ham-learn', 'hamstring', 'learn', 0, 1680, 1050, false],
    ['large-actions-type', 'actions', 'type', 0, 1920, 1080, false],
    ['large-ham-learn', 'hamstring', 'learn', 0, 1920, 1080, false],
    ['large-ham-tap', 'hamstring', 'tap', 0, 1920, 1080, false],
  ]
  const saved = {}
  for (const [label, kind, mode, keyboard, width, height, mobile] of layouts) {
    const report = await show(kind, mode, keyboard, width, height, mobile)
    report.keyboard = keyboard
    assertStudyLayout(report, label, mode === 'menu' ? 'menu' : mode, kind)
    saved[label] = report
    const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
    await writeFile(`${OUT}/sport-${label}.png`, Buffer.from(png.data, 'base64'))
  }
  const armRest = saved['iphone-actions-rest']
  const armPeak = saved['iphone-actions-peak']
  const restRadius = armRest.points?.radius_r
  const peakRadius = armPeak.points?.radius_r
  if (!restRadius || !peakRadius) throw new Error('missing radius point for the elbow cue')
  const armMove = Math.hypot(peakRadius.x - restRadius.x, peakRadius.y - restRadius.y, peakRadius.z - restRadius.z)
  if (armMove < 0.04) throw new Error(`elbow cue did not move the radius, delta ${armMove}`)
  const swingRest = saved['iphone-ham-rest']
  const swingPeak = saved['iphone-ham-peak']
  const restTibia = swingRest.points?.tibia_r
  const peakTibia = swingPeak.points?.tibia_r
  if (!restTibia || !peakTibia) throw new Error('missing tibia point for late swing')
  const swingMove = Math.hypot(peakTibia.x - restTibia.x, peakTibia.y - restTibia.y, peakTibia.z - restTibia.z)
  if (swingMove < 0.03) throw new Error(`late swing did not move the tibia, delta ${swingMove}`)
  if (!(peakTibia.z > restTibia.z + 0.01)) {
    throw new Error(`late swing should carry the leg forward, z ${restTibia.z} -> ${peakTibia.z}`)
  }
  console.log(`ok motion radius ${armMove.toFixed(3)} tibia ${swingMove.toFixed(3)} z ${restTibia.z} -> ${peakTibia.z}`)
  await assertCueMotion(cdp)
}

function failRevision(label, msg, extra) {
  throw new Error(`${label}: ${msg}${extra ? `\n${JSON.stringify(extra)}` : ''}`)
}

async function saveShot(cdp, name) {
  const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
  await writeFile(`${OUT}/${name}.png`, Buffer.from(png.data, 'base64'))
}

async function assertRevision(cdp) {
  const table = []
  const note = (surface, check, ok, detail) => {
    table.push({ surface, check, ok, detail })
    console.log(`${ok ? 'ok' : 'FAIL'}  ${surface}  ${check}  ${detail}`)
    if (!ok) failRevision(surface, `${check}: ${detail}`)
  }

  const readMenu = () => cdp.evaluate(`window.__anatomyQA.menuSnapshot()`)
  const scrollTo = (selector) =>
    cdp.evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)})
      if (el) el.scrollIntoView({ block: 'start' })
      const panel = document.querySelector('#menu-panel').getBoundingClientRect()
      const rows = ['#btn-muscle-actions', '#btn-ankle-case', '#btn-hamstring-case'].map((sel) => {
        const box = document.querySelector(sel).getBoundingClientRect()
        return {
          sel,
          top: Math.round(box.top),
          bottom: Math.round(box.bottom),
          inPanel: box.top >= panel.top - 4 && box.bottom <= panel.bottom + 4,
        }
      })
      return { panelTop: Math.round(panel.top), panelBottom: Math.round(panel.bottom), rows }
    })()`)

  async function checkMenu(label, width, height, mobile) {
    await setViewport(cdp, width, height, mobile)
    await openApp(cdp, mobile)
    await cdp.evaluate(`window.__anatomyQA.setRevision(null)`)
    const fresh = await readMenu()
    const headings = (fresh.headings || []).join('|')
    note(label, 'sections', headings === 'Explore|Sport|Rehab|Subject|Mode|Quick filters|Per session', headings)
    note(label, 'regions', (fresh.regions || []).join('|') === 'Ankle & foot|Thigh', (fresh.regions || []).join('|'))
    note(label, 'sport has no group label', fresh.sportRegions === 0 && fresh.sportRows === 1, `labels ${fresh.sportRegions} rows ${fresh.sportRows}`)
    note(label, 'no rehab search', fresh.searchInRehab === false, String(fresh.searchInRehab))
    const byTitle = Object.fromEntries((fresh.rows || []).map((row) => [row.title, row]))
    const ankle = byTitle['Lateral ankle sprain']
    const ham = byTitle['Grade II hamstring strain']
    const sport = byTitle['Muscle actions']
    note(label, 'three module rows', Boolean(ankle && ham && sport), (fresh.rows || []).map((row) => row.title).join(', '))
    note(label, 'ankle subtitle', ankle?.sub === 'soccer cut · inversion and plantarflexion', ankle?.sub || '')
    note(label, 'hamstring subtitle', ham?.sub === 'sprint · eccentric overload', ham?.sub || '')
    note(label, 'fresh Learn and Quiz', [sport, ankle, ham].every((row) => row.learn === 'Learn' && row.quiz === 'Quiz' && !row.learnDone && !row.quizDone), JSON.stringify({ sport, ankle, ham }))
    note(label, 'cases stay shown', [sport, ankle, ham].every((row) => row.visible && row.height > 8), JSON.stringify(fresh.rows))
    await scrollTo('#sport-section')
    await saveShot(cdp, `${label}-menu-sport`)
    const rehabPlace = await scrollTo('#rehab-section')
    note(
      label,
      'both rehab cases on screen',
      rehabPlace.rows.filter((row) => row.sel !== '#btn-muscle-actions').every((row) => row.inPanel),
      JSON.stringify(rehabPlace),
    )
    await saveShot(cdp, `${label}-menu-rehab`)

    const marked = await cdp.evaluate(`window.__anatomyQA.setRevision({
      done: ['ankle-learn', 'actions-quiz'],
      resume: { id: 'hamstring-learn', index: 2 }
    })`)
    await scrollTo('#rehab-section')
    const markedBy = Object.fromEntries((marked.rows || []).map((row) => [row.title, row]))
    const continues = (marked.rows || []).filter((row) => row.learn === 'Continue' || row.quiz === 'Continue')
    note(label, 'ankle Learn finished', markedBy['Lateral ankle sprain']?.learn === 'Learn' && markedBy['Lateral ankle sprain']?.learnDone === true, JSON.stringify(markedBy['Lateral ankle sprain']))
    note(label, 'ankle Quiz unchanged', markedBy['Lateral ankle sprain']?.quiz === 'Quiz' && markedBy['Lateral ankle sprain']?.quizDone === false, JSON.stringify(markedBy['Lateral ankle sprain']))
    note(label, 'Continue on the unfinished card', continues.length === 1 && markedBy['Grade II hamstring strain']?.learn === 'Continue', JSON.stringify(continues))
    note(label, 'Sport Quiz finished', markedBy['Muscle actions']?.quiz === 'Quiz' && markedBy['Muscle actions']?.quizDone === true, JSON.stringify(markedBy['Muscle actions']))
    note(label, 'no second Continue', markedBy['Muscle actions']?.learn === 'Learn' && markedBy['Grade II hamstring strain']?.quiz === 'Quiz', 'one continue')
    await saveShot(cdp, `${label}-menu-continue`)
  }

  await checkMenu('phone', 390, 844, true)
  await checkMenu('desktop', 1440, 900, false)

  await setViewport(cdp, 390, 844, true)
  await openApp(cdp, true)
  const phone = await cdp.evaluate(`window.__anatomyQA.showActionStep('type-rectus', 0)`, true)
  note('phone sport type-it', 'rectus prompt', phone.prompt === 'Type what this muscle does at the knee and the hip.', phone.prompt)
  note('phone sport type-it', 'context', phone.context === 'Sport · type it', phone.context)
  note('phone sport type-it', 'Skip is compact', phone.skipHeight >= 30 && phone.skipHeight <= 36, `height ${phone.skipHeight}`)
  note('phone sport type-it', 'cue sits under the prompt', phone.gapPromptToHint >= 0 && phone.gapPromptToHint <= 12, `gap ${phone.gapPromptToHint}`)
  note('phone sport type-it', 'Skip sits under the cue', phone.gapHintToSkip >= 0 && phone.gapHintToSkip <= 14, `gap ${phone.gapHintToSkip}`)
  note('phone sport type-it', 'TAP TO TYPE', phone.tapVisible === true && phone.tapText === 'Tap to type', `${phone.tapText} visible ${phone.tapVisible}`)
  note('phone sport type-it', 'answer word is not a field', phone.promptDisplay !== 'flex' && !phone.promptPanel, `${phone.promptDisplay} panel ${phone.promptPanel}`)
  await saveShot(cdp, 'phone-sport-type-rectus')

  const phoneKb = await cdp.evaluate(`window.__anatomyQA.showActionStep('type-rectus', 300)`, true)
  const limit = phoneKb.innerHeight - 300 + 8
  note('phone sport keyboard', 'prompt above the keyboard', phoneKb.promptBottom <= limit, `bottom ${phoneKb.promptBottom} limit ${limit}`)
  note('phone sport keyboard', 'Skip above the keyboard', phoneKb.skipBottom <= limit, `bottom ${phoneKb.skipBottom} limit ${limit}`)
  note('phone sport keyboard', 'Skip stays compact', phoneKb.skipHeight >= 30 && phoneKb.skipHeight <= 36, `height ${phoneKb.skipHeight}`)
  await saveShot(cdp, 'phone-sport-type-keyboard')

  const adduct = await cdp.evaluate(`window.__anatomyQA.showActionStep('type-glut-med', 0).then(() => window.__anatomyQA.answer('adduction'))`, true)
  note('phone sport answer', 'adduction is not abduction', adduct.revealing === false && adduct.id === 'type-glut-med', JSON.stringify(adduct))
  const abduct = await cdp.evaluate(`window.__anatomyQA.showActionStep('type-glut-med', 0).then(() => window.__anatomyQA.answer('abduction'))`, true)
  note('phone sport answer', 'abduction is enough', abduct.revealing === true && abduct.id === 'type-glut-med', JSON.stringify(abduct))

  await setViewport(cdp, 1440, 900, false)
  await openApp(cdp, false)
  const desk = await cdp.evaluate(`window.__anatomyQA.showActionStep('type-rectus', 0)`, true)
  note('desktop sport type-it', 'rectus prompt', desk.prompt === 'Type what this muscle does at the knee and the hip.', desk.prompt)
  note('desktop sport type-it', 'Skip stays 44px', desk.skipHeight >= 44, `height ${desk.skipHeight}`)
  note('desktop sport type-it', 'no TAP TO TYPE', desk.tapVisible === false, `visible ${desk.tapVisible} display ${desk.hintDisplay}`)
  note('desktop sport type-it', 'prompt is not a landscape row', desk.promptDisplay !== 'flex' && !desk.promptPanel, desk.promptDisplay)
  note('desktop sport type-it', 'answer word stays the display', (desk.wordText || '').includes('_') || (desk.wordText || '').length > 10, desk.wordText)
  await saveShot(cdp, 'desktop-sport-type-rectus')

  const field = await cdp.evaluate(`(() => {
    const input = document.querySelector('#answer')
    return {
      autocomplete: input.getAttribute('autocomplete'),
      autocorrect: input.getAttribute('autocorrect'),
      spellcheck: input.getAttribute('spellcheck'),
      autocapitalize: input.getAttribute('autocapitalize'),
    }
  })()`)
  note(
    'type-it field',
    'autocomplete stays off',
    field.autocomplete === 'off' && field.autocorrect === 'off' && field.spellcheck === 'false' && field.autocapitalize === 'none',
    JSON.stringify(field),
  )

  console.log('\nQA table')
  console.log(['surface', 'check', 'result'].join('\t'))
  for (const row of table) console.log([row.surface, row.check, row.ok ? 'pass' : 'fail'].join('\t'))
  console.log(`${table.length} checks passed`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const chrome = launchChrome()
  try {
    await waitForChrome()
    const { cdp } = await connectPage()

    await setViewport(cdp, 390, 844, true)
    await openApp(cdp, true)
    const field = await cdp.evaluate(`(() => {
      const input = document.querySelector('#answer')
      const meta = document.querySelector('meta[name=viewport]')
      return {
        id: input && input.id,
        name: input && input.getAttribute('name'),
        label: input && input.getAttribute('aria-label'),
        autocomplete: input && input.getAttribute('autocomplete'),
        autocorrect: input && input.getAttribute('autocorrect'),
        autocapitalize: input && input.getAttribute('autocapitalize'),
        spellcheck: input && input.getAttribute('spellcheck'),
        inputmode: input && input.getAttribute('inputmode'),
        enterkeyhint: input && input.getAttribute('enterkeyhint'),
        inForm: !!(input && input.closest('form')),
        viewport: meta && meta.getAttribute('content'),
      }
    })()`)
    console.log('field', JSON.stringify(field))
    shots.push({ name: 'answer-field', report: field })

    const quiz = (subject, id, keyboard) =>
      cdp.evaluate(
        `window.__anatomyQA.showQuiz(${JSON.stringify(subject)}, ${JSON.stringify(id)}, ${keyboard})`,
        true,
      )

    if (process.env.QA_ASSERT_DELTOID === '1') {
      await assertDeltoidScene(cdp, quiz)
      return
    }

    if (process.env.QA_ASSERT_ANKLE === '1') {
      await assertAnkleScene(cdp)
      return
    }

    if (process.env.QA_ASSERT_HIGH_ANKLE === '1') {
      await assertHighAnkleScene(cdp)
      return
    }

    if (process.env.QA_ASSERT_SPORT === '1') {
      await assertStudyScene(cdp)
      return
    }

    if (process.env.QA_ASSERT_MOTION === '1') {
      await setViewport(cdp, 390, 844, true)
      await openApp(cdp, true)
      await assertCueMotion(cdp)
      return
    }

    if (process.env.QA_ASSERT_TYPEIT === '1') {
      await assertTypeItReopen(cdp)
      return
    }

    if (process.env.QA_ASSERT_P2 === '1') {
      await assertP2(cdp)
      return
    }

    if (process.env.QA_ASSERT_LAYOUT === '1') {
      await assertDesktopLayout(cdp)
      return
    }

    if (process.env.QA_ASSERT_REVISION === '1') {
      await assertRevision(cdp)
      return
    }

    if (process.env.QA_ASSERT_VIEWS === '1') {
      const viewShow = (subject, id) =>
        cdp.evaluate(
          `window.__anatomyQA.showView(${JSON.stringify(subject)}, ${JSON.stringify(id)})`,
          true,
        )
      await assertCatalogViews(cdp, quiz, viewShow)
      return
    }

    const targets = [
      ['muscles', 'vastus_medialis', 'vastus-medialis'],
      ['muscles', 'adductor_longus', 'adductor-longus'],
      ['muscles', 'gluteus_maximus', 'gluteus-maximus'],
      ['muscles', 'longissimus', 'erector-spinae'],
      ['muscles', 'flexor_carpi_radialis', 'flexor-carpi-radialis'],
      ['muscles', 'deltoid', 'deltoid'],
      ['bones', 'scaphoid', 'scaphoid'],
      ['bones', 'femur', 'femur'],
      ['bones', 'rib11', 'rib11'],
    ]
    const phoneLayouts = [
      ['iphone-kb', 390, 844, 300],
      ['iphone', 390, 844, 0],
      ['land-kb', 844, 390, 300],
      ['land', 844, 390, 0],
      ['ipad', 820, 1180, 0],
    ]
    for (const [prefix, width, height, keyboard] of phoneLayouts) {
      for (const [subject, id, slug] of targets) {
        await shot(cdp, `${prefix}-${slug}`, width, height, true, () => quiz(subject, id, keyboard))
      }
    }

    const sequence = [
      ['muscles', 'deltoid', 'seq-1-deltoid'],
      ['muscles', 'flexor_carpi_radialis', 'seq-2-flexor'],
      ['muscles', 'deltoid', 'seq-3-deltoid'],
      ['bones', 'femur', 'seq-4-femur'],
      ['muscles', 'deltoid', 'seq-5-deltoid'],
    ]
    if (sequence.some(([, , name]) => want(name))) {
      for (const [subject, id, name] of sequence) {
        await shot(cdp, name, 390, 844, true, () => quiz(subject, id, 0))
      }
    }
    if (want('iphone-view-glute')) {
      await shot(cdp, 'iphone-view-glute', 390, 844, true, async () => {
        await cdp.evaluate(`window.__anatomyQA.showView('muscles', 'vastus_medialis')`, true)
        return cdp.evaluate(`window.__anatomyQA.showView('muscles', 'gluteus_maximus')`, true)
      })
    }

    const desktopWanted = targets.some(([, , slug]) => want(`desktop-${slug}`))
    if (desktopWanted) {
      await setViewport(cdp, 1440, 900, false)
      await openApp(cdp, false)
    }
    for (const [subject, id, slug] of targets) {
      await shot(cdp, `desktop-${slug}`, 1440, 900, false, () => quiz(subject, id, 0))
    }

    let records = shots
    if (only.size > 0) {
      try {
        const prev = JSON.parse(await readFile(`${OUT}/framing-reports.json`, 'utf8'))
        const byName = new Map(prev.map((row) => [row.name, row]))
        for (const row of shots) byName.set(row.name, row)
        records = [...byName.values()]
      } catch {
        records = shots
      }
    }
    await writeFile(`${OUT}/framing-reports.json`, JSON.stringify(records, null, 2))
    console.log('wrote', records.length, 'records')
    const ranked = records.filter((row) => row.report && typeof row.report.fillPct === 'number')
    ranked.sort((a, b) => a.name.localeCompare(b.name))
    for (const row of ranked) {
      const view = row.report.viewId ? ` ${row.report.viewId}` : ''
      const cam = row.report.camera ? ` camx ${row.report.camera.x}` : ''
      console.log(`${String(row.report.fillPct).padStart(3)}%  ${row.name}${view}${cam}`)
    }
  } finally {
    chrome.kill('SIGKILL')
  }
}

async function assertHighAnkleScene(cdp) {
  const table = []
  const note = (surface, check, ok, detail) => {
    table.push({ surface, check, ok, detail: String(detail) })
    console.log(`${ok ? 'ok' : 'FAIL'}  ${surface}  ${check}  ${detail}`)
    if (!ok) throw new Error(`${surface}: ${check}: ${detail}`)
  }
  let touchPage = null
  const show = async (mode, width, height, mobile) => {
    await setViewport(cdp, width, height, mobile)
    await delay(250)
    if (touchPage !== mobile) {
      await openApp(cdp, mobile)
      touchPage = mobile
    }
    return cdp.evaluate(`window.__anatomyQA.showHighAnkle(${JSON.stringify(mode)}, 0)`, true)
  }
  const shot = async (name) => {
    const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
    await writeFile(`${OUT}/high-ankle-${name}.png`, Buffer.from(png.data, 'base64'))
  }
  const layouts = [
    ['phone', 390, 844, true],
    ['desktop', 1440, 900, false],
  ]
  for (const [label, width, height, mobile] of layouts) {
    const menu = await show('menu', width, height, mobile)
    note(label, 'menu title', menu.title === 'High ankle sprain', menu.title)
    note(
      label,
      'menu subtitle',
      menu.sub === 'soccer training · dorsiflexion, eversion, and tibial internal rotation',
      menu.sub,
    )
    note(label, 'menu region', menu.region === 'ankle-foot' && menu.regionLabel === 'Ankle & foot', `${menu.region} ${menu.regionLabel}`)
    note(label, 'menu row visible', menu.visible === true && menu.hudHidden === true && menu.panelHidden === true, JSON.stringify({ visible: menu.visible, hud: menu.hudHidden }))
    await shot(`${label}-menu`)

    const learn = await show('learn', width, height, mobile)
    note(label, 'learn title', learn.title === 'A sprain above the usual site', learn.title)
    note(label, 'learn kicker', learn.kicker === 'Rehab · high ankle', learn.kicker)
    note(label, 'study quiet', learn.studyQuiet === true && learn.ankleClass === false, `quiet ${learn.studyQuiet} ankle-class ${learn.ankleClass}`)
    note(label, 'no type-it in study', learn.hudHidden === true && learn.panelHidden === false && learn.replayHidden === true, `hud ${learn.hudHidden} panel ${learn.panelHidden} replay ${learn.replayHidden}`)
    note(label, 'high profile', learn.profile === 'high' && learn.active === true && learn.span === 'mortise', `${learn.profile} ${learn.span}`)
    note(label, 'resting and still', learn.spinning === false && learn.pose && Math.abs(learn.pose.plantar) < 0.02 && Math.abs(learn.pose.invert) < 0.02, JSON.stringify(learn.pose))
    note(label, 'lateral mortise', learn.viewId === 'lateral', learn.viewId)
    const cam = learn.camera
    const tgt = learn.target
    note(label, 'camera on the right side', cam && tgt && cam.x < tgt.x, `cam ${cam?.x} target ${cam && tgt ? tgt.x : ''}`)
    const aitfl = learn.points?.aitfl_r
    const talus = learn.points?.talus_r
    note(label, 'AITFL loaded', Boolean(aitfl && learn.points?.pitfl_r && learn.points?.trans_tibfib_r), aitfl ? 'yes' : 'missing')
    note(label, 'frame above the talus', Boolean(learn.framed && talus && learn.framed.centerY > talus.y), `frame ${learn.framed?.centerY} talus ${talus?.y}`)
    const tibia = learn.tibia
    const shaft = tibia ? tibia.maxY - tibia.minY : 0
    const belowKnee = Boolean(learn.framed && tibia && learn.framed.maxY < tibia.minY + shaft * 0.55)
    note(label, 'frame stops short of the knee', belowKnee, `frameMax ${learn.framed?.maxY} tibia ${tibia?.minY}–${tibia?.maxY}`)
    note(label, 'AITFL on screen', learn.screen?.aitfl_r?.inFrame === true, JSON.stringify(learn.screen?.aitfl_r))
    note(label, 'ATFL still visible', learn.screen?.atfl_r?.inFrame === true, JSON.stringify(learn.screen?.atfl_r))
    await shot(`${label}-learn`)

    const anatomy = await show('anatomy', width, height, mobile)
    note(label, 'anatomy title', anatomy.title === 'Inferior tibiofibular joint', anatomy.title)
    note(label, 'anatomy lights the three bands', anatomy.span === 'mortise' && anatomy.profile === 'high', anatomy.span)
    note(label, 'AITFL PITFL and transverse on screen', anatomy.screen?.aitfl_r?.inFrame === true && anatomy.screen?.pitfl_r?.inFrame === true && anatomy.screen?.trans_tibfib_r?.inFrame === true, JSON.stringify({
      aitfl: anatomy.screen?.aitfl_r,
      pitfl: anatomy.screen?.pitfl_r,
      trans: anatomy.screen?.trans_tibfib_r,
    }))
    await shot(`${label}-anatomy`)

    const typed = await show('type', width, height, mobile)
    note(label, 'type prompt', typed.prompt === 'Type the name of this sprain.', typed.prompt)
    note(label, 'type label', typed.label === 'TYPE IT · NAME IT', typed.label)
    note(label, 'type context', typed.context === 'Rehab · type it', typed.context)
    note(label, 'type hud', typed.hudHidden === false && typed.panelHidden === true && typed.studyQuiet === true, `hud ${typed.hudHidden}`)
    note(label, 'type still mortise', typed.span === 'mortise' && typed.profile === 'high', typed.span)
    await shot(`${label}-type`)

    const tap = await show('tap', width, height, mobile)
    note(label, 'tap prompt', tap.prompt === 'Tap the anterior inferior tibiofibular ligament.', tap.prompt)
    note(label, 'tap label', tap.label === 'TAP IT · TAP THE LIGAMENT', tap.label)
    note(label, 'tap context', tap.context === 'Rehab · tap it', tap.context)
    note(label, 'tap AITFL', tap.picks?.aitfl_r === 'aitfl', tap.picks?.aitfl_r)
    note(label, 'tap ATFL contrast', tap.picks?.atfl_r === 'atfl', tap.picks?.atfl_r)
    note(
      label,
      'posterior bands loaded',
      Boolean(tap.points?.pitfl_r && tap.points?.trans_tibfib_r),
      `pitfl pick ${tap.picks?.pitfl_r} transverse pick ${tap.picks?.trans_tibfib_r}`,
    )
    note(label, 'tap stays still', tap.spinning === false && tap.pose && Math.abs(tap.pose.plantar) < 0.02, JSON.stringify(tap.pose))
    await shot(`${label}-tap`)
  }
  console.log('HIGH ANKLE QA')
  console.log('surface | check | ok | detail')
  for (const row of table) {
    console.log(`${row.surface} | ${row.check} | ${row.ok ? 'pass' : 'fail'} | ${row.detail}`)
  }
}

function assertAnkle(report, label, expect) {
  const fail = (msg) => {
    throw new Error(`${label}: ${msg}\n${JSON.stringify(report)}`)
  }
  if (expect === 'menu') {
    if (!report.visible) fail('Rehab menu card is not on screen')
    if (report.title !== 'Lateral ankle sprain') fail(`menu title ${report.title}`)
    console.log(`ok ${label} menu "${report.title}"`)
    return
  }
  if (!report.active) fail('ankle case is not active')
  if (!report.ligaments) fail('ligament meshes did not load')
  const cam = report.camera
  const tgt = report.target
  if (!(cam.x < tgt.x)) fail(`camera should sit lateral of the right ankle, camera.x ${cam.x} target.x ${tgt.x}`)
  const pts = report.points
  for (const name of ['atfl_r', 'cfl_r', 'deltoid_r', 'talus_r', 'fibula_r', 'metatarsal5_r']) {
    if (!pts[name]) fail(`missing point ${name}`)
  }
  if (!(pts.deltoid_r.x > pts.atfl_r.x && pts.deltoid_r.x > pts.talus_r.x)) {
    fail(`deltoid should sit medial of the ATFL and the talus, deltoid.x ${pts.deltoid_r.x} atfl.x ${pts.atfl_r.x} talus.x ${pts.talus_r.x}`)
  }
  if (!(pts.atfl_r.x < pts.talus_r.x && pts.cfl_r.x < pts.talus_r.x)) {
    fail(`ATFL and CFL should sit lateral of the talus, atfl.x ${pts.atfl_r.x} cfl.x ${pts.cfl_r.x} talus.x ${pts.talus_r.x}`)
  }
  if (!(pts.atfl_r.z > pts.cfl_r.z)) {
    fail(`ATFL should sit anterior of the CFL, atfl.z ${pts.atfl_r.z} cfl.z ${pts.cfl_r.z}`)
  }
  if (expect === 'type') {
    const limit = report.innerHeight - report.keyboard + 8
    if (report.keyboard > 0 && report.promptBottom > limit) {
      fail(`prompt sits under the keyboard, bottom ${report.promptBottom} limit ${limit}`)
    }
    if (report.keyboard > 0 && report.skipBottom > limit) {
      fail(`Skip sits under the keyboard, bottom ${report.skipBottom} limit ${limit}`)
    }
    if (report.skipHidden) fail('Skip is hidden on a type step')
    if (!String(report.prompt || '').toLowerCase().includes('ligament')) fail(`type prompt missing: ${report.prompt}`)
  }
  if (expect === 'injury') {
    if (!report.pose || report.pose.plantar < 0.5) fail(`injury pose did not plantarflex, got ${JSON.stringify(report.pose)}`)
    if (!report.pose || report.pose.invert < 0.2) fail(`injury pose did not invert, got ${JSON.stringify(report.pose)}`)
  }
  if ((expect === 'neutral' || expect === 'type') && report.picks) {
    if (report.picks.atfl_r !== 'atfl') fail(`tap on the ATFL center returned ${report.picks.atfl_r}`)
    if (report.picks.cfl_r !== 'cfl') fail(`tap on the CFL center returned ${report.picks.cfl_r}`)
    if (report.picks.fibula_r !== 'fibula') fail(`tap on the fibular shaft returned ${report.picks.fibula_r}`)
  }
  if (expect === 'neutral') {
    if (!report.pose || Math.abs(report.pose.plantar) > 0.02 || Math.abs(report.pose.invert) > 0.02) {
      fail(`expected a resting foot, got ${JSON.stringify(report.pose)}`)
    }
  }
  console.log(
    `ok ${label} view ${report.viewId} cam (${cam.x}, ${cam.y}, ${cam.z}) pose ${JSON.stringify(report.pose)} roll ${JSON.stringify(report.roll)}`,
  )
}

async function assertAnkleScene(cdp) {
  let touchPage = null
  const show = async (mode, keyboard, width, height, mobile) => {
    await setViewport(cdp, width, height, mobile)
    await delay(250)
    if (touchPage !== mobile) {
      await openApp(cdp, mobile)
      touchPage = mobile
    }
    return cdp.evaluate(
      `window.__anatomyQA.showAnkle(${JSON.stringify(mode)}, ${keyboard})`,
      true,
    )
  }
  const layouts = [
    ['iphone-menu', 'menu', 0, 390, 844, true],
    ['iphone-learn', 'learn', 0, 390, 844, true],
    ['iphone-injury', 'injury', 0, 390, 844, true],
    ['iphone-type', 'type', 0, 390, 844, true],
    ['iphone-type-kb', 'type', 300, 390, 844, true],
    ['iphone-tap', 'tap', 0, 390, 844, true],
    ['iphone-palpation', 'palpation', 0, 390, 844, true],
    ['ipad-learn', 'learn', 0, 820, 1180, true],
    ['land-learn', 'learn', 0, 844, 390, true],
    ['land-type-kb', 'type', 300, 844, 390, true],
    ['desktop-learn', 'learn', 0, 1440, 900, false],
    ['desktop-type', 'type', 0, 1440, 900, false],
    ['desktop-injury', 'injury', 0, 1440, 900, false],
  ]
  const saved = {}
  for (const [label, mode, keyboard, width, height, mobile] of layouts) {
    const report = await show(mode, keyboard, width, height, mobile)
    const expect =
      mode === 'menu' ? 'menu' : mode === 'injury' ? 'injury' : mode === 'type' ? 'type' : 'neutral'
    assertAnkle(report, label, expect)
    saved[label] = report
    const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
    await writeFile(`${OUT}/ankle-${label}.png`, Buffer.from(png.data, 'base64'))
  }
  const rest = saved['iphone-learn']
  const hurt = saved['iphone-injury']
  const restToe = rest.points.phal_foot_dist_1_r
  const hurtToe = hurt.points.phal_foot_dist_1_r
  if (!restToe || !hurtToe) throw new Error('missing hallux point')
  if (!(hurtToe.y < restToe.y - 0.04)) {
    throw new Error(`plantarflexion should drop the hallux, rest ${JSON.stringify(restToe)} injury ${JSON.stringify(hurtToe)}`)
  }
  if (!(typeof hurt.lateralAxisY === 'number' && hurt.lateralAxisY < -0.05)) {
    throw new Error(`inversion should point the lateral side downward, lateralAxisY ${hurt.lateralAxisY}`)
  }
  if (!rest.roll || !hurt.roll) throw new Error('missing calcaneus roll')
  const restRoll = rest.roll.lateralY - rest.roll.medialY
  const hurtRoll = hurt.roll.lateralY - hurt.roll.medialY
  if (!(hurtRoll < restRoll - 0.008)) {
    throw new Error(`inversion should lower the lateral calcaneus more than the medial, rest ${restRoll} injury ${hurtRoll}`)
  }
  console.log(
    `ok motion hallux y ${restToe.y} -> ${hurtToe.y}, lateral axis ${hurt.lateralAxisY}, roll ${restRoll.toFixed(4)} -> ${hurtRoll.toFixed(4)}`,
  )
}

function assertDeltoid(report, label) {
  const view = report.viewId
  const cam = report.camera?.x
  const tgt = report.target?.x
  const okView = view === 'posterior-lateral' || view === 'lateral'
  const sameSide = typeof cam === 'number' && typeof tgt === 'number' && cam * tgt > 0
  if (!okView || !sameSide) {
    throw new Error(
      `${label}: expected posterior-lateral or lateral from the muscle's own side, got ${view} camera.x ${cam} target.x ${tgt}`,
    )
  }
  console.log(
    `ok ${label} ${view} camera (${report.camera.x}, ${report.camera.y}, ${report.camera.z}) target (${report.target.x}, ${report.target.y}, ${report.target.z})`,
  )
}

async function assertDeltoidScene(cdp, quiz) {
  const layouts = [
    ['390x844', 390, 844, true, 0],
    ['390x544-keyboard', 390, 844, true, 300],
    ['390x544', 390, 544, true, 0],
    ['844x390', 844, 390, true, 0],
    ['844x390-kb200', 844, 390, true, 200],
    ['844x390-kb290', 844, 390, true, 290],
    ['820x1180', 820, 1180, true, 0],
    ['1440x900', 1440, 900, false, 0],
  ]
  for (const [label, width, height, mobile, keyboard] of layouts) {
    await setViewport(cdp, width, height, mobile)
    await delay(300)
    const report = await quiz('muscles', 'deltoid', keyboard)
    assertDeltoid(report, label)
    const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
    await writeFile(`${OUT}/deltoid-${label}.png`, Buffer.from(png.data, 'base64'))
  }

  await setViewport(cdp, 390, 844, true)
  await delay(200)
  const order = [
    ['muscles', 'deltoid'],
    ['muscles', 'flexor_carpi_radialis'],
    ['muscles', 'deltoid'],
    ['bones', 'femur'],
    ['muscles', 'deltoid'],
  ]
  const poses = []
  for (const [subject, id] of order) {
    const report = await quiz(subject, id, 0)
    if (id === 'deltoid') {
      assertDeltoid(report, `order-${poses.length}`)
      poses.push(report)
    }
  }
  const view = poses[0].viewId
  if (!poses.every((row) => row.viewId === view)) {
    throw new Error(`deltoid view changed across the run order: ${poses.map((row) => row.viewId).join(', ')}`)
  }
  const cam0 = poses[0].camera.x
  if (!poses.every((row) => Math.abs(row.camera.x - cam0) < 0.05)) {
    throw new Error(`deltoid camera moved across the run order: ${poses.map((row) => row.camera.x).join(', ')}`)
  }

  const expect = [
    ['muscles', 'vastus_medialis', ['anterior-medial']],
    ['muscles', 'adductor_longus', ['anterior-medial']],
    ['muscles', 'gluteus_maximus', ['posterior', 'posterior-lateral']],
    ['muscles', 'longissimus', ['posterior', 'posterior-lateral']],
    ['muscles', 'flexor_carpi_radialis', ['anterior-lateral', 'anterior']],
    ['bones', 'femur', ['anterior-medial']],
    ['bones', 'scaphoid', ['anterior-lateral', 'anterior', 'lateral']],
    ['bones', 'rib11', ['anterior-medial', 'anterior', 'lateral', 'posterior']],
  ]
  for (const [subject, id, views] of expect) {
    const report = await quiz(subject, id, 0)
    if (!views.includes(report.viewId)) {
      throw new Error(`${id} view changed to ${report.viewId} (camera.x ${report.camera.x})`)
    }
    if (id === 'flexor_carpi_radialis' && !(report.camera.z > 0 && report.camera.z > Math.abs(report.camera.x) * 0.4)) {
      throw new Error(
        `flexor carpi radialis is still a side-on sliver: camera (${report.camera.x}, ${report.camera.z})`,
      )
    }
    console.log(`ok ${id} ${report.viewId} camera.x ${report.camera.x} camera.z ${report.camera.z}`)
  }
}

const CATALOG_TARGETS = [
  { subject: 'muscles', id: 'deltoid', view: 'posterior-lateral', lateral: true, mode: 'quiz' },
  { subject: 'muscles', id: 'gluteus_maximus', view: 'posterior', lateral: false, mode: 'quiz' },
  { subject: 'muscles', id: 'gluteus_maximus', view: 'posterior', lateral: false, mode: 'view' },
  { subject: 'muscles', id: 'gluteus_medius', view: 'posterior-lateral', lateral: true, mode: 'quiz' },
  { subject: 'muscles', id: 'biceps_femoris', view: 'posterior', lateral: false, mode: 'quiz' },
  { subject: 'muscles', id: 'longissimus', view: 'posterior', lateral: false, mode: 'quiz' },
  { subject: 'muscles', id: 'vastus_medialis', view: 'anterior-medial', lateral: false, mode: 'quiz' },
  { subject: 'muscles', id: 'adductor_longus', view: 'anterior-medial', lateral: false, mode: 'quiz' },
  { subject: 'muscles', id: 'flexor_carpi_radialis', view: 'anterior-lateral', lateral: true, mode: 'quiz' },
  { subject: 'muscles', id: 'trapezius', view: 'posterior', lateral: false, mode: 'quiz' },
  { subject: 'muscles', id: 'latissimus_dorsi', view: 'posterior', lateral: false, mode: 'quiz' },
  { subject: 'bones', id: 'scaphoid', view: 'anterior-lateral', lateral: true, mode: 'quiz' },
  { subject: 'bones', id: 'rib11', view: 'anterior-medial', lateral: false, mode: 'quiz' },
  { subject: 'bones', id: 'femur', view: 'anterior-medial', lateral: false, mode: 'quiz' },
]

const CATALOG_VIEWPORTS = [
  ['390x844', 390, 844, true],
  ['390x544', 390, 544, true],
  ['844x390', 844, 390, true],
  ['820x1180', 820, 1180, true],
  ['1440x900', 1440, 900, false],
]

function catalogProblem(report, spec) {
  if (!report || report.viewId !== spec.view) {
    return `view ${report?.viewId ?? 'missing'} expected ${spec.view}`
  }
  const cam = report.camera
  const tgt = report.target
  if (!cam || !tgt) return 'missing camera'
  if (spec.view.startsWith('posterior') && !(cam.z < tgt.z)) {
    return `camera is not behind the target (${cam.z} vs ${tgt.z})`
  }
  if (spec.view.startsWith('anterior') && !(cam.z > tgt.z)) {
    return `camera is not in front of the target (${cam.z} vs ${tgt.z})`
  }
  if (spec.lateral && Math.abs(tgt.x) > 0.05 && (cam.x - tgt.x) * tgt.x <= 0) {
    return `camera is not on the target's side (${cam.x} vs ${tgt.x})`
  }
  return null
}

function catalogLabel(spec) {
  return spec.mode === 'view' ? `${spec.id} view` : spec.id
}

async function showCatalogTarget(quiz, viewShow, spec) {
  if (spec.mode === 'view') return viewShow(spec.subject, spec.id)
  return quiz(spec.subject, spec.id, 0)
}

async function pinOverlap(cdp) {
  return cdp.evaluate(`(() => {
    const pins = [...document.querySelectorAll('.view-pin')].map((el) => {
      const r = el.getBoundingClientRect()
      return { text: (el.textContent || '').trim(), x: r.x, y: r.y, w: r.width, h: r.height }
    })
    let overlap = false
    for (let i = 0; i < pins.length; i++) {
      for (let j = i + 1; j < pins.length; j++) {
        const a = pins[i]
        const b = pins[j]
        const hit = a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
        if (hit) overlap = true
      }
    }
    return { pins, overlap, count: pins.length }
  })()`)
}

async function assertCatalogViews(cdp, quiz, viewShow) {
  const rows = []
  const failures = []
  const shotsWanted = new Set([
    'first 390x844 deltoid',
    'first 390x844 gluteus_maximus',
    'first 390x844 gluteus_maximus view',
    'mid 390x844 gluteus_maximus view',
    'first 820x1180 flexor_carpi_radialis',
    'first 844x390 flexor_carpi_radialis',
    'first 1440x900 gluteus_maximus',
    'mid 390x844 vastus_medialis',
    'mid 390x844 scaphoid',
    'mid 390x844 rib11',
  ])

  async function record(when, viewport, spec, report) {
    const name = catalogLabel(spec)
    const problem = catalogProblem(report, spec)
    let labels = null
    if (spec.mode === 'view') {
      labels = await pinOverlap(cdp)
      if (labels.count < 2 || labels.overlap) {
        const extra = labels.count < 2 ? 'origin/insertion pins missing' : 'origin/insertion labels overlap'
        failures.push(`${when} ${viewport} ${name}: ${extra}`)
      }
    }
    if (problem) failures.push(`${when} ${viewport} ${name}: ${problem}`)
    const row = {
      when,
      viewport,
      target: name,
      view: report?.viewId ?? '',
      camera: report?.camera ?? null,
      targetPoint: report?.target ?? null,
      distance: report?.distance ?? null,
      ok: !problem && !(labels && (labels.count < 2 || labels.overlap)),
    }
    rows.push(row)
    const shotKey = `${when} ${viewport} ${name}`
    if (shotsWanted.has(shotKey) || problem) {
      const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
      const file = `${OUT}/view-${when}-${viewport}-${name.replace(/ /g, '-')}.png`
      await writeFile(file, Buffer.from(png.data, 'base64'))
    }
    console.log(
      `${row.ok ? 'ok' : 'FAIL'} ${when.padEnd(5)} ${viewport.padEnd(9)} ${name.padEnd(24)} ${row.view.padEnd(18)} cam (${report?.camera?.x}, ${report?.camera?.y}, ${report?.camera?.z}) tgt (${report?.target?.x}, ${report?.target?.y}, ${report?.target?.z})`,
    )
  }

  for (const [viewport, width, height, mobile] of CATALOG_VIEWPORTS) {
    await setViewport(cdp, width, height, mobile)
    await delay(200)
    for (const spec of CATALOG_TARGETS) {
      await openApp(cdp, mobile)
      const report = await showCatalogTarget(quiz, viewShow, spec)
      await record('first', viewport, spec, report)
    }
    await openApp(cdp, mobile)
    await showCatalogTarget(quiz, viewShow, CATALOG_TARGETS[0])
    for (const spec of CATALOG_TARGETS) {
      const report = await showCatalogTarget(quiz, viewShow, spec)
      await record('mid', viewport, spec, report)
    }
  }

  console.log('\ntarget × viewport')
  const header = ['target', 'when', ...CATALOG_VIEWPORTS.map((row) => row[0])]
  console.log(header.join('\t'))
  for (const spec of CATALOG_TARGETS) {
    for (const when of ['first', 'mid']) {
      const cells = [catalogLabel(spec), when]
      for (const [viewport] of CATALOG_VIEWPORTS) {
        const row = rows.find((item) => item.when === when && item.viewport === viewport && item.target === catalogLabel(spec))
        if (!row) cells.push('missing')
        else {
          const cam = row.camera
          const tgt = row.targetPoint
          cells.push(`${row.view} cam(${cam?.x},${cam?.y},${cam?.z}) tgt(${tgt?.x},${tgt?.y},${tgt?.z})`)
        }
      }
      console.log(cells.join('\t'))
    }
  }
  await writeFile(`${OUT}/catalog-views.json`, JSON.stringify(rows, null, 2))
  if (failures.length) {
    throw new Error(`${failures.length} catalog view failures\n${failures.join('\n')}`)
  }
}

async function assertPack() {
  const revRes = await fetch(`${BASE}/models/packs/revision.json`)
  if (!revRes.ok) throw new Error(`revision.json HTTP ${revRes.status}`)
  const rev = await revRes.json()
  if (rev.id !== '3cce4d704e476d61c1a9') {
    throw new Error(`pack revision ${rev.id}, expected 3cce4d704e476d61c1a9`)
  }
  const packRes = await fetch(`${BASE}/models/packs/ligaments.pack`)
  if (!packRes.ok) throw new Error(`ligaments.pack HTTP ${packRes.status}`)
  const buf = Buffer.from(await packRes.arrayBuffer())
  if (buf.length !== 53668) throw new Error(`ligaments.pack is ${buf.length} bytes, expected 53668`)
  if (buf.toString('latin1', 0, 4) !== 'ANPK') throw new Error('ligaments.pack is not ANPK')
  console.log(`ok ligaments.pack ${buf.length} ANPK revision ${rev.id}`)
}

function failP2(label, msg, extra) {
  throw new Error(`${label}: ${msg}${extra ? `\n${JSON.stringify(extra)}` : ''}`)
}

function accentish(color) {
  return /124,\s*196,\s*255/.test(String(color || ''))
}

async function readMenu(cdp) {
  return cdp.evaluate(`(() => {
    const menu = document.querySelector('#menu-overlay')
    const start = document.querySelector('#start-btn')
    const panel = document.querySelector('#menu-panel')
    const scroll = document.querySelector('#menu-scroll')
    const memory = document.querySelector('#mode-memory')
    const combined = document.querySelector('#mode-combined')
    const levels = document.querySelector('.mode-grid--levels')
    const sr = start.getBoundingClientRect()
    const pr = panel.getBoundingClientRect()
    const before = sr.top
    const overflow = scroll.scrollHeight > scroll.clientHeight + 2
    scroll.scrollTop = scroll.scrollHeight
    const after = start.getBoundingClientRect().top
    scroll.scrollTop = 0
    return {
      hidden: menu.hidden,
      tagline: (document.querySelector('.menu-tag')?.textContent || '').trim(),
      menuLook: !!menu.querySelector('[data-look]'),
      lookHeading: [...menu.querySelectorAll('h2')].some((el) => (el.textContent || '').trim() === 'Look'),
      memoryOn: memory.classList.contains('mode-card--on'),
      combinedOn: combined.classList.contains('mode-card--on'),
      combinedDim: combined.classList.contains('mode-card--dim'),
      levelsDimmed: levels.classList.contains('is-dimmed'),
      memoryBorder: getComputedStyle(memory).borderTopColor,
      memoryCheck: getComputedStyle(memory, '::after').content,
      combinedOpacity: getComputedStyle(combined).opacity,
      startText: (start.textContent || '').trim(),
      startDisabled: start.disabled,
      reasonHidden: document.querySelector('#start-reason').hidden,
      startInScroll: scroll.contains(start),
      startTop: Math.round(before),
      startAfterScroll: Math.round(after),
      startBottom: Math.round(start.getBoundingClientRect().bottom),
      panelBottom: Math.round(pr.bottom),
      innerHeight: window.innerHeight,
      overflow,
      pool: (document.querySelector('#pool-count')?.textContent || '').trim(),
    }
  })()`)
}

async function assertMenu(report, label) {
  if (report.hidden) failP2(label, 'start menu is hidden', report)
  if (report.tagline !== 'Learn anatomy by seeing it, then typing it.') {
    failP2(label, `tagline "${report.tagline}"`, report)
  }
  if (report.menuLook || report.lookHeading) failP2(label, 'Look is still on the start menu', report)
  if (!report.memoryOn || report.combinedOn) failP2(label, 'Memory and Combined are not exclusive', report)
  if (!report.combinedDim) failP2(label, 'Combined is not dimmed while a level is selected', report)
  if (report.levelsDimmed) failP2(label, 'single levels are dimmed while one of them is selected', report)
  if (!accentish(report.memoryBorder)) failP2(label, `selected chip border is ${report.memoryBorder}`, report)
  if (!String(report.memoryCheck || '').includes('✓')) failP2(label, 'selected chip has no check', report)
  if (!(Number(report.combinedOpacity) < 0.75)) failP2(label, `Combined opacity ${report.combinedOpacity}`, report)
  if (!/^Start · \d+ items$/.test(report.startText)) failP2(label, `Start label "${report.startText}"`, report)
  if (report.startDisabled) failP2(label, 'Start is disabled while the pool has items', report)
  if (!report.reasonHidden) failP2(label, 'empty-pool reason is showing for a live count', report)
  if (report.startInScroll) failP2(label, 'Start is inside the scrolling column', report)
  if (report.startTop < 0 || report.startBottom > report.innerHeight + 1) {
    failP2(label, 'Start is not in the viewport', report)
  }
  if (Math.abs(report.startTop - report.startAfterScroll) > 1) {
    failP2(label, 'scrolling the menu moved Start', report)
  }
  if (report.panelBottom - report.startBottom > 36) {
    failP2(label, 'Start is not pinned to the bottom of the menu column', report)
  }
  console.log(`ok ${label} "${report.tagline}" ${report.startText} pool "${report.pool}" overflow ${report.overflow}`)
}

async function assertP2(cdp) {
  await assertPack()
  const save = async (name) => {
    const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
    const file = `${OUT}/p2-${name}.png`
    await writeFile(file, Buffer.from(png.data, 'base64'))
    console.log('shot', name)
  }

  await setViewport(cdp, 390, 844, true)
  await openApp(cdp, true)
  await delay(250)
  const phoneMenu = await readMenu(cdp)
  assertMenu(phoneMenu, 'iphone menu')
  await save('iphone-menu')

  const exclusive = await cdp.evaluate(`(() => {
    document.querySelector('#mode-combined').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
    const levels = document.querySelector('.mode-grid--levels')
    const combined = document.querySelector('#mode-combined')
    const memory = document.querySelector('#mode-memory')
    const picked = {
      combinedOn: combined.classList.contains('mode-card--on'),
      memoryOn: memory.classList.contains('mode-card--on'),
      seeOn: !!document.querySelector('[data-mode="see"].mode-card--on'),
      hintOn: !!document.querySelector('[data-mode="hint"].mode-card--on'),
      levelsDimmed: levels.classList.contains('is-dimmed'),
      combinedDim: combined.classList.contains('mode-card--dim'),
    }
    document.querySelector('#mode-memory').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
    picked.restored = document.querySelector('#mode-memory').classList.contains('mode-card--on')
      && !document.querySelector('#mode-combined').classList.contains('mode-card--on')
      && document.querySelector('#mode-combined').classList.contains('mode-card--dim')
    return picked
  })()`)
  if (!exclusive.combinedOn || exclusive.memoryOn || exclusive.seeOn || exclusive.hintOn || !exclusive.levelsDimmed || exclusive.combinedDim) {
    failP2('iphone combined', 'Combined and a single level both read as selected', exclusive)
  }
  if (!exclusive.restored) failP2('iphone level', 'choosing a level did not clear Combined', exclusive)
  console.log('ok combined vs level are exclusive')
  await cdp.evaluate(`(() => {
    document.querySelector('#mode-combined').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
    document.querySelector('#mode-combined').scrollIntoView({ block: 'center' })
  })()`)
  await save('iphone-combined')
  await cdp.evaluate(`document.querySelector('#mode-memory').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))`)

  await cdp.evaluate(`window.__anatomyQA.showAnkle('learn', 0)`, true)
  const lesson = await cdp.evaluate(`(() => {
    const next = document.querySelector('#case-next')
    const titleEl = document.querySelector('#case-title')
    let guard = 0
    while ((titleEl?.textContent || '').trim() !== 'Grade II · RICE' && !next.hidden && guard < 12) {
      next.click()
      guard += 1
    }
    const body = document.querySelector('#case-body')
    body.scrollTop = body.scrollHeight
    const last = body.lastElementChild.getBoundingClientRect()
    const actions = document.querySelector('.case-actions').getBoundingClientRect()
    const bodyRect = body.getBoundingClientRect()
    return {
      title: (document.querySelector('#case-title')?.textContent || '').trim(),
      next: (next.textContent || '').trim(),
      lastText: (body.lastElementChild?.textContent || '').slice(-40),
      lastBottom: Math.round(last.bottom),
      actionsTop: Math.round(actions.top),
      bodyBottom: Math.round(bodyRect.bottom),
      scrolled: body.scrollTop > 0,
      clear: last.bottom <= actions.top + 1 && last.bottom <= bodyRect.bottom + 1,
    }
  })()`)
  if (lesson.title !== 'Grade II · RICE') failP2('iphone lesson', `expected the long RICE card, got "${lesson.title}"`, lesson)
  if (!lesson.scrolled) failP2('iphone lesson', 'the lesson body did not scroll', lesson)
  if (!lesson.clear) failP2('iphone lesson', 'the last line is not fully above Back / Quiz', lesson)
  console.log(`ok lesson "${lesson.title}" last line ${lesson.lastBottom} above actions ${lesson.actionsTop}`)
  await save('iphone-lesson')

  await cdp.evaluate(`window.__anatomyQA.showAnkle('type', 0)`, true)
  await delay(200)
  const rehab = await cdp.evaluate(`(() => {
    const look = document.querySelector('#quiz-look')
    const lookStyle = getComputedStyle(look)
    const fill = document.querySelector('#quiz-progress-fill').getBoundingClientRect()
    const track = document.querySelector('#quiz-progress').getBoundingClientRect()
    return {
      context: (document.querySelector('#quiz-context')?.textContent || '').trim(),
      progress: (document.querySelector('#pill-round')?.textContent || '').trim(),
      fill: Math.round(fill.width),
      track: Math.round(track.width),
      trackHeight: Math.round(track.height),
      lookDisplay: lookStyle.display,
      looks: [...look.querySelectorAll('[data-look]')].map((el) => el.dataset.look),
      pills: document.querySelectorAll('#pill-subject, #pill-mode').length,
      bar: window.__anatomyQA.typeBar(),
    }
  })()`)
  if (rehab.context !== 'Rehab · type it') failP2('iphone quiz', `context "${rehab.context}"`, rehab)
  if (rehab.pills !== 0) failP2('iphone quiz', 'two context pills are still in the bar', rehab)
  if (rehab.progress !== '1 / 5') failP2('iphone quiz', `count "${rehab.progress}"`, rehab)
  if (!(rehab.trackHeight > 0 && rehab.trackHeight <= 6)) failP2('iphone quiz', `progress bar is ${rehab.trackHeight}px`, rehab)
  if (!(rehab.fill > 0 && rehab.fill < rehab.track)) failP2('iphone quiz', 'progress fill does not match 1 / 5', rehab)
  if (rehab.lookDisplay === 'none' || rehab.looks.join(',') !== 'xray,solid') {
    failP2('iphone quiz', 'Look is missing from the top bar', rehab)
  }
  if (rehab.bar.promptPanel || !transparentBg(rehab.bar.promptBg)) {
    failP2('iphone quiz', 'type-it is still wrapped in a card', rehab)
  }
  if (rehab.bar.skipText !== 'Skip · show answer') failP2('iphone quiz', `Skip is "${rehab.bar.skipText}"`, rehab)
  if (!rehab.bar.checkHidden) failP2('iphone quiz', 'iPhone is showing a Check button', rehab)
  console.log(`ok quiz bar "${rehab.context}" ${rehab.progress} look ${rehab.looks.join('/')}`)
  await save('iphone-quiz')

  await cdp.evaluate(`document.querySelector('#btn-menu-top').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))`)
  const sheet = await cdp.evaluate(`(() => {
    const restart = document.querySelector('#menu-restart')
    const change = document.querySelector('#menu-change')
    const rr = restart.getBoundingClientRect()
    const cr = change.getBoundingClientRect()
    const context = document.querySelector('#quiz-context').getBoundingClientRect()
    const menu = document.querySelector('#menu-sheet').getBoundingClientRect()
    return {
      hidden: document.querySelector('#menu-sheet').hidden,
      restart: (restart.textContent || '').trim(),
      change: (change.textContent || '').trim(),
      restartH: Math.round(rr.height),
      changeH: Math.round(cr.height),
      contextBottom: Math.round(context.bottom),
      sheetTop: Math.round(menu.top),
    }
  })()`)
  if (sheet.hidden || sheet.restart !== 'Restart' || sheet.change !== 'Change set') {
    failP2('iphone menu sheet', 'Menu did not open Restart / Change set', sheet)
  }
  if (sheet.restartH < 44 || sheet.changeH < 44) failP2('iphone menu sheet', 'sheet actions are under 44px', sheet)
  if (sheet.sheetTop < sheet.contextBottom - 2) {
    failP2('iphone menu sheet', 'Restart / Change set covers the context label', sheet)
  }
  await save('iphone-menu-sheet')
  await cdp.evaluate(`document.querySelector('#menu-change').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))`)
  const back = await cdp.evaluate(`(() => ({
    menuHidden: document.querySelector('#menu-overlay').hidden,
    sheetHidden: document.querySelector('#menu-sheet').hidden,
    tagline: (document.querySelector('.menu-tag')?.textContent || '').trim(),
  }))()`)
  if (back.menuHidden || !back.sheetHidden || back.tagline !== 'Learn anatomy by seeing it, then typing it.') {
    failP2('iphone change set', 'Change set did not return to the start menu', back)
  }
  console.log('ok Menu opens Restart / Change set')

  await openApp(cdp, true)
  await cdp.evaluate(`window.__anatomyQA.showQuiz('bones', 'frontal', 300, 'see')`, true)
  await delay(200)
  const open = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  assertLifted(open, 'iphone type 300', 300)
  assertBigWord(open, 'iphone type 300')
  if (open.promptPanel || !transparentBg(open.promptBg)) {
    failType('iphone type 300', 'type-it is still wrapped in a card', open)
  }
  if (!open.tapVisible || !/tap to type/i.test(open.tapText)) {
    failType('iphone type 300', `expected TAP TO TYPE, got "${open.tapText}"`, open)
  }
  if (open.skipText !== 'Skip · show answer') failType('iphone type 300', `Skip is "${open.skipText}"`, open)
  if (!open.checkHidden) failType('iphone type 300', 'iPhone type-it is showing Check', open)
  if (open.context !== 'Bones · see it') failType('iphone type 300', `context "${open.context}"`, open)
  console.log(`ok type-it panel lifted, skip ${open.skipBottom}, word ${open.wordBottom}`)
  await save('iphone-type-kb')

  const down = await cdp.evaluate(`window.__anatomyQA.showQuiz('bones', 'frontal', 0, 'see').then(() => window.__anatomyQA.typeBar())`, true)
  if (down.inset > 40) failType('iphone dismiss', `inset still ${down.inset}`, down)
  if (!(down.skipBottom > open.skipBottom + 80)) {
    failType('iphone dismiss', `layout did not return, skip ${down.skipBottom} vs ${open.skipBottom}`, down)
  }
  const again = await cdp.evaluate(`window.__anatomyQA.showQuiz('bones', 'frontal', 300, 'see').then(() => window.__anatomyQA.typeBar())`, true)
  assertLifted(again, 'iphone reopen', 300)
  assertBigWord(again, 'iphone reopen')
  if (Math.abs(again.skipBottom - open.skipBottom) > 12) {
    failType('iphone reopen', `lift changed, skip ${again.skipBottom} vs ${open.skipBottom}`, again)
  }
  console.log('ok dismiss then reopen still lifts')
  await save('iphone-type-reopen')

  await cdp.evaluate(`window.__anatomyQA.showAnkle('tap', 0)`, true)
  const tap = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  if (!tap.tapVisible || !/tap the model/i.test(tap.tapText)) {
    failType('iphone tap', `expected TAP THE MODEL, got "${tap.tapText}" visible ${tap.tapVisible}`, tap)
  }
  if (/tap to type/i.test(tap.tapText)) failType('iphone tap', 'tap step still says TAP TO TYPE', tap)
  if (tap.context !== 'Rehab · tap it') failType('iphone tap', `context "${tap.context}"`, tap)
  console.log(`ok tap step "${tap.tapText}"`)
  await save('iphone-tap')

  await setViewport(cdp, 1440, 900, false)
  await delay(250)
  await openApp(cdp, false)
  const deskMenu = await readMenu(cdp)
  assertMenu(deskMenu, 'desktop menu')
  await save('desktop-menu')

  await cdp.evaluate(`window.__anatomyQA.showQuiz('bones', 'frontal', 0, 'memory')`, true)
  await delay(200)
  const desk = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  assertBigWord(desk, 'desktop type')
  if (desk.hudHidden || desk.skipHidden) failType('desktop type', 'typing bar missing', desk)
  if (desk.tapVisible) failType('desktop type', 'desktop is showing TAP TO TYPE', desk)
  const deskCue = await cdp.evaluate(`getComputedStyle(document.querySelector('#tap-hint')).display`)
  if (deskCue !== 'none') failType('desktop type', `TAP TO TYPE is painted (${deskCue})`, desk)
  if (!desk.checkHidden) failType('desktop type', 'desktop type-it is showing Check', desk)
  if (desk.skipText !== 'Skip · show answer') failType('desktop type', `Skip is "${desk.skipText}"`, desk)
  if (desk.promptPanel || !transparentBg(desk.promptBg)) {
    failType('desktop type', 'type-it is still wrapped in a card', desk)
  }
  if (!desk.lookVisible) failType('desktop type', 'Look is missing from the desktop quiz bar', desk)
  if (desk.context !== 'Bones · memory') failType('desktop type', `context "${desk.context}"`, desk)
  if (desk.inset > 40) failType('desktop type', `desktop lifted by ${desk.inset}`, desk)
  console.log(`ok desktop type-it context "${desk.context}"`)
  await save('desktop-type')

  console.log('ok P2')
}

function transparentBg(color) {
  return /transparent|rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(String(color || ''))
}

function boxesOverlap(a, b) {
  if (!a || !b || a.hidden || b.hidden) return false
  if (a.width < 2 || a.height < 2 || b.width < 2 || b.height < 2) return false
  return a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1
}

async function readLayout(cdp) {
  return cdp.evaluate(`(() => {
    const box = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const r = el.getBoundingClientRect()
      const s = getComputedStyle(el)
      return {
        hidden: el.hasAttribute('hidden') || s.display === 'none' || s.visibility === 'hidden',
        left: Math.round(r.left),
        top: Math.round(r.top),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
        width: Math.round(r.width),
        height: Math.round(r.height),
      }
    }
    const hitOf = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return 'missing'
      const r = el.getBoundingClientRect()
      if (r.width < 2 || r.height < 2) return 'empty'
      const hit = document.elementFromPoint(r.left + r.width / 2, Math.min(r.bottom - 1, r.top + r.height / 2))
      if (!hit) return 'none'
      if (el.contains(hit) || hit.contains(el)) return 'self'
      return hit.id || (typeof hit.className === 'string' ? hit.className : hit.tagName)
    }
    const chips = [...document.querySelectorAll('#view-filters .view-filter-btn')].map((el) => {
      const r = el.getBoundingClientRect()
      const label = (el.textContent || '').replace(/\\s+/g, ' ').trim()
      return {
        label,
        left: Math.round(r.left),
        top: Math.round(r.top),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
        width: Math.round(r.width),
        height: Math.round(r.height),
        hidden: getComputedStyle(el).display === 'none',
      }
    })
    const cluster = document.querySelector('.footer-cluster')
    const clusterStyle = cluster ? getComputedStyle(cluster) : null
    const attr = document.querySelector('.footer-attr')
    const attrStyle = attr ? getComputedStyle(attr) : null
    return {
      panel: box('#case-panel'),
      chrome: box('#chrome-top'),
      menu: box('#btn-menu-top'),
      context: box('#chrome-context'),
      progress: box('#quiz-progress'),
      count: box('#pill-round'),
      acc: box('#stat-acc'),
      look: box('#quiz-look'),
      filters: box('#view-filters'),
      study: box('#view-panel'),
      footer: box('.footer-cluster'),
      footerAttr: box('.footer-attr'),
      footerBar: box('.footer-bar'),
      chips,
      hits: {
        menu: hitOf('#btn-menu-top'),
        progress: hitOf('#quiz-progress'),
        count: hitOf('#pill-round'),
        acc: hitOf('#stat-acc'),
        solid: hitOf('#quiz-look [data-look="solid"]'),
        xray: hitOf('#quiz-look [data-look="xray"]'),
      },
      contextText: (document.querySelector('#quiz-context')?.textContent || '').trim(),
      title: (document.querySelector('#case-title')?.textContent || '').trim(),
      attrText: (attr?.textContent || '').replace(/\\s+/g, ' ').trim(),
      attrFont: attrStyle ? Number.parseFloat(attrStyle.fontSize) : 0,
      footerOpacity: clusterStyle ? Number.parseFloat(clusterStyle.opacity) : 1,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    }
  })()`)
}

async function assertDesktopLayout(cdp) {
  const fail = (label, msg, extra) => {
    throw new Error(`${label}: ${msg}${extra ? `\n${JSON.stringify(extra)}` : ''}`)
  }
  const shotOf = async (name) => {
    const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
    await writeFile(`${OUT}/layout-${name}.png`, Buffer.from(png.data, 'base64'))
    console.log('shot', name)
  }
  const hudIds = [
    ['menu', 'menu'],
    ['progress', 'progress'],
    ['count', 'count'],
    ['acc', 'accuracy'],
    ['look', 'Look'],
  ]

  await setViewport(cdp, 1440, 900, false)
  await openApp(cdp, false)

  const desks = [
    ['1280x800', 1280, 800],
    ['1440x900', 1440, 900],
    ['1680x1050', 1680, 1050],
    ['1920x1080', 1920, 1080],
  ]
  for (const [label, width, height] of desks) {
    await setViewport(cdp, width, height, false)
    await delay(200)
    await cdp.evaluate(`window.__anatomyQA.showAnkle('learn', 0)`, true)
    await cdp.evaluate(`document.querySelector('#case-back').click()`)
    await delay(200)
    const ankle = await cdp.evaluate(`window.__anatomyQA.ankleReport()`)
    const layout = await readLayout(cdp)
    if (layout.panel?.hidden) fail(label, 'lesson card is hidden', layout)
    if (!(layout.panel.top >= layout.chrome.bottom - 1)) {
      fail(label, `lesson card top ${layout.panel.top} covers the bar bottom ${layout.chrome.bottom}`, layout)
    }
    for (const [key, name] of hudIds) {
      const piece = layout[key]
      if (!piece || piece.hidden || piece.width < 2 || piece.height < 2) {
        fail(label, `${name} is missing from the quiz bar`, piece)
      }
      if (piece.right > width + 1 || piece.bottom > height + 1 || piece.left < -1 || piece.top < -1) {
        fail(label, `${name} is outside the window`, piece)
      }
      if (boxesOverlap(layout.panel, piece)) {
        fail(label, `lesson card covers ${name}`, { panel: layout.panel, piece })
      }
    }
    for (const [key, name] of [['menu', 'menu'], ['progress', 'progress'], ['count', 'count'], ['solid', 'Look']]) {
      if (layout.hits[key] !== 'self') fail(label, `${name} is not clickable (${layout.hits[key]})`, layout.hits)
    }
    const talus = ankle.screen?.talus_r
    const atfl = ankle.screen?.atfl_r
    if (!talus || !atfl) fail(label, 'ankle screen point missing', ankle.screen)
    if (talus.x > layout.panel.left + 8) {
      fail(label, `talus x ${talus.x} is under the lesson column left ${layout.panel.left}`, ankle.screen)
    }
    if (atfl.x > layout.panel.left + 8) {
      fail(label, `ATFL x ${atfl.x} is under the lesson column left ${layout.panel.left}`, ankle.screen)
    }
    if (talus.y < layout.chrome.bottom || talus.y > height - 8) {
      fail(label, `talus y ${talus.y} is outside the open canvas`, ankle.screen)
    }
    console.log(`ok ${label} lesson clears the bar, ankle at ${talus.x},${talus.y}`)
    await shotOf(`${label}-lesson`)
  }

  await setViewport(cdp, 1440, 900, false)
  await delay(150)
  const police = await cdp.evaluate(`(() => {
    const next = document.querySelector('#case-next')
    const titleEl = document.querySelector('#case-title')
    let guard = 0
    while ((titleEl?.textContent || '').trim() !== 'Grade II · RICE' && !next.hidden && guard < 12) {
      next.click()
      guard += 1
    }
    const body = document.querySelector('#case-body')
    body.scrollTop = body.scrollHeight
    const last = body.lastElementChild.getBoundingClientRect()
    const actions = document.querySelector('.case-actions').getBoundingClientRect()
    const bodyRect = body.getBoundingClientRect()
    return {
      title: (document.querySelector('#case-title')?.textContent || '').trim(),
      lastBottom: Math.round(last.bottom),
      actionsTop: Math.round(actions.top),
      bodyBottom: Math.round(bodyRect.bottom),
      clear: last.bottom <= actions.top + 1 && last.bottom <= bodyRect.bottom + 1,
      overflow: body.scrollHeight > body.clientHeight + 2,
    }
  })()`)
  const policeLayout = await readLayout(cdp)
  if (police.title !== 'Grade II · RICE') fail('desktop police', `title "${police.title}"`, police)
  if (!police.clear) fail('desktop police', 'last line is not reachable above the actions', police)
  if (policeLayout.panel.top < policeLayout.chrome.bottom - 1) {
    fail('desktop police', 'RICE card covers the quiz bar', policeLayout)
  }
  console.log(`ok RICE reachable overflow ${police.overflow}`)
  await shotOf('1440x900-police')

  await cdp.evaluate(`window.__anatomyQA.showAnkle('type', 0)`, true)
  await delay(150)
  const typed = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  if (typed.promptPanel || !transparentBg(typed.promptBg)) fail('desktop type', 'type-it still has a card', typed)
  if (!typed.checkHidden) fail('desktop type', 'desktop type-it is showing Check', typed)
  if (typed.skipText !== 'Skip · show answer') fail('desktop type', `Skip is "${typed.skipText}"`, typed)
  console.log('ok desktop type-it has no card')
  await shotOf('1440x900-type')

  await setViewport(cdp, 1440, 900, false)
  await openApp(cdp, false)
  await cdp.evaluate(`window.__anatomyQA.showQuiz('bones', 'frontal', 0, 'memory')`, true)
  await delay(200)
  const skull = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  if (skull.promptPanel || !transparentBg(skull.promptBg)) fail('desktop skull', 'type-it still has a card', skull)
  if (!skull.checkHidden) fail('desktop skull', 'desktop type-it is showing Check', skull)
  console.log('ok skull type-it has no card')
  await shotOf('1440x900-skull-type')

  for (const [label, width, height] of desks) {
    await setViewport(cdp, width, height, false)
    await delay(200)
    const study = await cdp.evaluate(`window.__anatomyQA.showStudy()`, true)
    await delay(200)
    const layout = await readLayout(cdp)
    if (study.contextDisplay !== 'none') fail(label + ' study', 'Study context bar is still showing', study)
    if (layout.hits.menu !== 'self') fail(label + ' study', `menu is not clickable (${layout.hits.menu})`, layout)
    const shown = layout.chips.filter((chip) => !chip.hidden && chip.width > 2)
    const want = ['Both', 'Bones', 'Muscles', 'All', 'Mid', 'Deep', 'Cartilage', 'X-ray', 'Solid']
    for (const name of want) {
      const chip = shown.find((item) => item.label.toLowerCase() === name.toLowerCase())
      if (!chip) fail(label + ' study', `missing chip ${name}`, shown.map((item) => item.label))
      if (chip.left < 0 || chip.top < 0 || chip.right > width - 1 || chip.bottom > height - 1) {
        fail(label + ' study', `${name} is outside the window`, chip)
      }
      if (boxesOverlap(chip, layout.study)) fail(label + ' study', `${name} overlaps the study list`, { chip, study: layout.study })
      if (boxesOverlap(chip, layout.menu)) fail(label + ' study', `${name} overlaps Menu`, { chip, menu: layout.menu })
    }
    if (!layout.footerAttr || layout.footerAttr.hidden || layout.footerAttr.height < 8) {
      fail(label + ' study', 'licence line is missing', layout.footerAttr)
    }
    if (!/BodyParts3D/.test(layout.attrText) || !/Z-Anatomy/.test(layout.attrText)) {
      fail(label + ' study', 'attribution text changed', layout.attrText)
    }
    if (!(layout.attrFont > 0 && layout.attrFont <= 12)) {
      fail(label + ' study', `licence is ${layout.attrFont}px`, layout)
    }
    if (!(layout.footerOpacity < 0.75)) fail(label + ' study', `credits opacity ${layout.footerOpacity}`, layout)
    if (boxesOverlap(layout.footerAttr, layout.footerBar)) {
      fail(label + ' study', 'helper words collide with the licence', layout)
    }
    if (boxesOverlap(layout.footer, layout.study)) fail(label + ' study', 'credits run under the study list', layout)
    console.log(`ok ${label} study chips clear, credits ${layout.attrFont}px @ ${layout.footerOpacity}`)
    await shotOf(`${label}-study`)
  }

  await setViewport(cdp, 390, 844, true)
  await openApp(cdp, true)
  await cdp.evaluate(`window.__anatomyQA.showAnkle('learn', 0)`, true)
  const phoneLesson = await readLayout(cdp)
  if (phoneLesson.panel?.hidden) fail('iphone lesson', 'lesson card is hidden', phoneLesson)
  if (boxesOverlap(phoneLesson.panel, phoneLesson.progress) || boxesOverlap(phoneLesson.panel, phoneLesson.look)) {
    fail('iphone lesson', 'lesson card covers the quiz bar', phoneLesson)
  }
  await shotOf('iphone-lesson')
  await cdp.evaluate(`window.__anatomyQA.showAnkle('type', 300)`, true)
  await delay(200)
  const phoneType = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  if (phoneType.promptPanel || !transparentBg(phoneType.promptBg)) {
    fail('iphone type', 'type-it is still wrapped in a card', phoneType)
  }
  if (!phoneType.checkHidden) fail('iphone type', 'iPhone is showing Check', phoneType)
  const limit = phoneType.innerHeight - 300 + 8
  if (phoneType.skipBottom > limit || phoneType.wordBottom > limit) {
    fail('iphone type', `prompt is under the keyboard, skip ${phoneType.skipBottom} word ${phoneType.wordBottom}`, phoneType)
  }
  console.log('ok iphone lesson and type-it')
  await shotOf('iphone-type')
  console.log('ok desktop layout')
}

function failType(label, msg, report) {
  throw new Error(`${label}: ${msg}\n${JSON.stringify(report)}`)
}

function assertLifted(report, label, keyboard) {
  if (report.hudHidden) failType(label, 'typing bar is hidden', report)
  if (report.skipHidden) failType(label, 'Skip is hidden', report)
  if (!report.wordText || report.wordHeight < 20) failType(label, 'big answer word is missing', report)
  const limit = report.innerHeight - keyboard + 8
  if (report.wordBottom > limit) {
    failType(label, `word sits under the keyboard, bottom ${report.wordBottom} limit ${limit}`, report)
  }
  if (report.skipBottom > limit) {
    failType(label, `Skip sits under the keyboard, bottom ${report.skipBottom} limit ${limit}`, report)
  }
  if (report.promptBottom > limit) {
    failType(label, `prompt block sits under the keyboard, bottom ${report.promptBottom} limit ${limit}`, report)
  }
  if (report.wordTop < 40) failType(label, `word was pushed off the top (${report.wordTop})`, report)
}

function assertBigWord(report, label) {
  const border = Number.parseFloat(report.inputBorder)
  if (Number.isFinite(border) && border > 0) failType(label, `answer field has a border (${report.inputBorder})`, report)
  const fill = String(report.inputFill || report.inputColor || '')
  if (!/transparent|rgba?\(0,\s*0,\s*0,\s*0\)/i.test(fill)) {
    failType(label, `answer field is drawing its own text (${fill})`, report)
  }
  if (!(report.wordFont >= 24)) failType(label, `answer word is not the big display (${report.wordFont}px)`, report)
}

async function assertTypeItReopen(cdp) {
  const rows = []
  const shotOf = async (name) => {
    const png = await cdp.send('Page.captureScreenshot', { format: 'png' })
    const file = `${OUT}/typeit-${name}.png`
    await writeFile(file, Buffer.from(png.data, 'base64'))
    return file
  }

  async function show(level, keyboard, width, height, mobile) {
    await setViewport(cdp, width, height, mobile)
    await delay(250)
    await openApp(cdp, mobile)
    await cdp.evaluate(
      `window.__anatomyQA.showQuiz('bones', 'frontal', ${keyboard}, ${JSON.stringify(level)})`,
      true,
    )
    await delay(200)
    return cdp.evaluate(`window.__anatomyQA.typeBar()`)
  }

  // iPhone Learn round: see-it shows the prompt, the big word, TAP TO TYPE, and Skip.
  const phoneOpen = await show('see', 300, 390, 844, true)
  assertLifted(phoneOpen, 'iphone first open', 300)
  assertBigWord(phoneOpen, 'iphone first open')
  if (!phoneOpen.tapVisible || !/tap to type/i.test(phoneOpen.tapText)) {
    failType('iphone first open', `expected TAP TO TYPE, got "${phoneOpen.tapText}" visible ${phoneOpen.tapVisible}`, phoneOpen)
  }
  if (!/os frontale/i.test(phoneOpen.prompt)) {
    failType('iphone first open', `prompt missing, got "${phoneOpen.prompt}"`, phoneOpen)
  }
  if (!/type it/i.test(phoneOpen.label)) failType('iphone first open', `label missing, got "${phoneOpen.label}"`, phoneOpen)
  rows.push({ surface: 'iphone first open', ...phoneOpen })
  await shotOf('iphone-first-open')

  const phoneDown = await show('see', 0, 390, 844, true)
  if (phoneDown.hudHidden) failType('iphone dismiss', 'typing bar hidden after dismiss', phoneDown)
  if (!(phoneDown.skipBottom > phoneOpen.skipBottom + 80)) {
    failType('iphone dismiss', `layout did not return, skip ${phoneDown.skipBottom} vs lifted ${phoneOpen.skipBottom}`, phoneDown)
  }
  if (phoneDown.inset > 40) failType('iphone dismiss', `inset still ${phoneDown.inset}`, phoneDown)
  rows.push({ surface: 'iphone dismiss', ...phoneDown })
  await shotOf('iphone-dismiss')

  const phoneReopen = await show('see', 300, 390, 844, true)
  assertLifted(phoneReopen, 'iphone second open', 300)
  assertBigWord(phoneReopen, 'iphone second open')
  if (Math.abs(phoneReopen.skipBottom - phoneOpen.skipBottom) > 12) {
    failType('iphone second open', `lift changed, skip ${phoneReopen.skipBottom} vs first ${phoneOpen.skipBottom}`, phoneReopen)
  }
  rows.push({ surface: 'iphone second open', ...phoneReopen })
  await shotOf('iphone-second-open')

  // The real bug geometry: first open shrinks the visual viewport, dismiss
  // restores it, the second open reports no change at all. Forced pins never
  // hit that path — drive the resolver with the numbers Safari reports.
  await setViewport(cdp, 390, 844, true)
  await delay(200)
  await openApp(cdp, true)
  await cdp.evaluate(`window.__anatomyQA.showQuiz('bones', 'frontal', 0, 'see')`, true)
  const height = (await cdp.evaluate(`window.innerHeight`)) || 844
  const keyboard = 300
  const probe = (visualHeight, focused, arm, offsetTop = 0) =>
    cdp.evaluate(
      `window.__anatomyQA.setKeyboardViewport(${JSON.stringify({
        innerHeight: height,
        visualHeight,
        offsetTop,
        scrollY: 0,
        focused,
        arm,
      })})`,
    )
  const measuredOpen = await probe(height - keyboard, true, true)
  assertLifted(measuredOpen, 'iphone measured first open', keyboard)
  assertBigWord(measuredOpen, 'iphone measured first open')
  rows.push({ surface: 'iphone measured first open', ...measuredOpen })
  await shotOf('iphone-measured-open')

  const measuredDown = await probe(height, false, false)
  if (measuredDown.inset > 40) failType('iphone measured dismiss', `inset still ${measuredDown.inset}`, measuredDown)
  if (!(measuredDown.skipBottom > measuredOpen.skipBottom + 80)) {
    failType('iphone measured dismiss', `layout did not return, skip ${measuredDown.skipBottom}`, measuredDown)
  }
  rows.push({ surface: 'iphone measured dismiss', ...measuredDown })
  await shotOf('iphone-measured-dismiss')

  const measuredBlind = await probe(height, true, true)
  assertLifted(measuredBlind, 'iphone blind second open', keyboard)
  assertBigWord(measuredBlind, 'iphone blind second open')
  if (Math.abs(measuredBlind.inset - measuredOpen.inset) > 2) {
    failType('iphone blind second open', `inset ${measuredBlind.inset} vs first ${measuredOpen.inset}`, measuredBlind)
  }
  rows.push({ surface: 'iphone blind second open', ...measuredBlind })
  await shotOf('iphone-blind-reopen')

  const measuredPan = await probe(height - keyboard, true, true, keyboard)
  assertLifted(measuredPan, 'iphone panned second open', keyboard)
  if (measuredPan.inset < keyboard - 2) {
    failType('iphone panned second open', `offsetTop canceled the lift, inset ${measuredPan.inset}`, measuredPan)
  }
  rows.push({ surface: 'iphone panned second open', ...measuredPan })
  await shotOf('iphone-panned-reopen')

  // Regressions: start menu, a lesson card, a tap step (not TAP TO TYPE).
  await openApp(cdp, true)
  const menu = await cdp.evaluate(`window.__anatomyQA.showAnkle('menu', 0)`, true)
  if (!menu.visible) failType('iphone menu', 'start menu rehab card is missing', menu)
  if (menu.title !== 'Lateral ankle sprain') failType('iphone menu', `title ${menu.title}`, menu)
  rows.push({ surface: 'iphone menu', title: menu.title })
  await shotOf('iphone-menu')

  const lesson = await cdp.evaluate(`window.__anatomyQA.showAnkle('learn', 0)`, true)
  if (lesson.panelHidden) failType('iphone lesson', 'lesson card is hidden', lesson)
  if (!lesson.title) failType('iphone lesson', 'lesson card has no title', lesson)
  rows.push({ surface: 'iphone lesson', title: lesson.title })
  await shotOf('iphone-lesson')

  const tap = await cdp.evaluate(`window.__anatomyQA.showAnkle('tap', 0)`, true)
  const tapBar = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  if (tapBar.hudHidden) failType('iphone tap step', 'quiz step is hidden', tapBar)
  if (!tapBar.tapVisible || !/tap the model/i.test(tapBar.tapText)) {
    failType('iphone tap step', `expected TAP THE MODEL, got "${tapBar.tapText}" visible ${tapBar.tapVisible}`, tapBar)
  }
  if (/tap to type/i.test(tapBar.tapText)) failType('iphone tap step', 'tap step still says TAP TO TYPE', tapBar)
  rows.push({ surface: 'iphone tap step', tapText: tapBar.tapText, prompt: tap.prompt })
  await shotOf('iphone-tap')

  // Desktop typing stays put across a blur and a second focus.
  await setViewport(cdp, 1440, 900, false)
  await delay(250)
  await openApp(cdp, false)
  await cdp.evaluate(`window.__anatomyQA.showQuiz('bones', 'frontal', 0, 'see')`, true)
  const deskOpen = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  assertBigWord(deskOpen, 'desktop open')
  if (deskOpen.hudHidden || deskOpen.skipHidden) failType('desktop open', 'typing bar missing', deskOpen)
  if (deskOpen.tapVisible) failType('desktop open', 'desktop is showing TAP TO TYPE', deskOpen)
  if (deskOpen.inset > 40) failType('desktop open', `desktop lifted by ${deskOpen.inset}`, deskOpen)
  rows.push({ surface: 'desktop open', ...deskOpen })
  await shotOf('desktop-open')

  await cdp.evaluate(`(() => { const el = document.querySelector('#answer'); el.blur(); el.focus(); })()`)
  await delay(800)
  const deskReopen = await cdp.evaluate(`window.__anatomyQA.typeBar()`)
  assertBigWord(deskReopen, 'desktop reopen')
  if (deskReopen.hudHidden || deskReopen.skipHidden) failType('desktop reopen', 'typing bar missing after refocus', deskReopen)
  if (deskReopen.inset > 40) failType('desktop reopen', `desktop lifted by ${deskReopen.inset}`, deskReopen)
  if (Math.abs(deskReopen.skipBottom - deskOpen.skipBottom) > 12) {
    failType('desktop reopen', `bar moved, skip ${deskReopen.skipBottom} vs ${deskOpen.skipBottom}`, deskReopen)
  }
  rows.push({ surface: 'desktop reopen', ...deskReopen })
  await shotOf('desktop-reopen')

  console.log('\ntype-it reopen')
  console.log(['surface', 'inset', 'wordBottom', 'skipBottom', 'prompt', 'tap'].join('\t'))
  for (const row of rows) {
    console.log(
      [row.surface, row.inset ?? '', row.wordBottom ?? '', row.skipBottom ?? '', row.prompt || row.title || '', row.tapText || '']
        .join('\t'),
    )
  }
  console.log('ok type-it reopen cycle')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
