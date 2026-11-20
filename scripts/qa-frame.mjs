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

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
