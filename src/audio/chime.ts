/** Web Audio only — crispy key thock + subtle success. No asset files. */

let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export async function unlockAudio(): Promise<void> {
  const c = getCtx()
  if (c.state === 'suspended') await c.resume()
}

function noiseBuffer(c: AudioContext, seconds: number): AudioBuffer {
  const n = Math.max(1, Math.floor(c.sampleRate * seconds))
  const buf = c.createBuffer(1, n, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1
  return buf
}

/** Louder mechanical thock with a tiny high crispy click. */
export function playKeyTap(): void {
  const c = getCtx()
  if (c.state === 'suspended') void c.resume()
  const now = c.currentTime

  const master = c.createGain()
  master.gain.setValueAtTime(1, now)
  master.connect(c.destination)

  // Low body — short sine thump that drops
  const body = c.createOscillator()
  const bodyG = c.createGain()
  body.type = 'sine'
  body.frequency.setValueAtTime(180, now)
  body.frequency.exponentialRampToValueAtTime(70, now + 0.045)
  bodyG.gain.setValueAtTime(0.0001, now)
  bodyG.gain.exponentialRampToValueAtTime(0.38, now + 0.004)
  bodyG.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)
  body.connect(bodyG)
  bodyG.connect(master)
  body.start(now)
  body.stop(now + 0.07)

  // Mid “thock” — triangle punch
  const mid = c.createOscillator()
  const midG = c.createGain()
  mid.type = 'triangle'
  mid.frequency.setValueAtTime(420, now)
  mid.frequency.exponentialRampToValueAtTime(140, now + 0.03)
  midG.gain.setValueAtTime(0.0001, now)
  midG.gain.exponentialRampToValueAtTime(0.22, now + 0.003)
  midG.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)
  mid.connect(midG)
  midG.connect(master)
  mid.start(now)
  mid.stop(now + 0.05)

  // Crispy high click — band-passed noise burst (少少脆)
  const src = c.createBufferSource()
  src.buffer = noiseBuffer(c, 0.04)
  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.setValueAtTime(3800, now)
  bp.Q.setValueAtTime(4.5, now)
  const hp = c.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.setValueAtTime(2200, now)
  const clickG = c.createGain()
  clickG.gain.setValueAtTime(0.0001, now)
  clickG.gain.exponentialRampToValueAtTime(0.28, now + 0.0015)
  clickG.gain.exponentialRampToValueAtTime(0.0001, now + 0.022)
  src.connect(hp)
  hp.connect(bp)
  bp.connect(clickG)
  clickG.connect(master)
  src.start(now)
  src.stop(now + 0.03)
}

/** Soft, short confirm — no long arpeggio parade. */
export function playCorrectChime(): void {
  const c = getCtx()
  if (c.state === 'suspended') void c.resume()
  const now = c.currentTime

  const master = c.createGain()
  master.gain.setValueAtTime(0.55, now)
  master.connect(c.destination)

  // Two gentle sine tones, brief
  const freqs = [523.25, 659.25] // C5 E5
  freqs.forEach((freq, i) => {
    const t0 = now + i * 0.045
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, t0)
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22)
    osc.connect(g)
    g.connect(master)
    osc.start(t0)
    osc.stop(t0 + 0.28)
  })
}

/** Short low tick when a typed letter does not match. */
export function playWrongTick(): void {
  const c = getCtx()
  if (c.state === 'suspended') void c.resume()
  const now = c.currentTime

  const master = c.createGain()
  master.gain.setValueAtTime(0.7, now)
  master.connect(c.destination)

  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(220, now)
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.08)
  g.gain.setValueAtTime(0.0001, now)
  g.gain.exponentialRampToValueAtTime(0.14, now + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
  osc.connect(g)
  g.connect(master)
  osc.start(now)
  osc.stop(now + 0.14)
}
