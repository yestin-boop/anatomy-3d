/**
 * Pure camera-framing math for quiz and View.
 * The look-at point stays on the orbit target. setViewOffset shifts that
 * point into the band not covered by the top chips, the bottom HUD, the
 * keyboard, or the study panel. Distance is then fitted to that band.
 */

export type FramingInsets = {
  top: number
  right: number
  bottom: number
  left: number
}

export type PixelBand = {
  x: number
  y: number
  width: number
  height: number
}

export type ViewOffset = {
  fullWidth: number
  fullHeight: number
  offsetX: number
  offsetY: number
  width: number
  height: number
}

export type Vec3 = { x: number; y: number; z: number }

export type ViewCandidate = {
  id: string
  /** Unit vector from the target toward the camera. */
  dir: Vec3
  prior: number
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function norm(x: number, y: number, z: number): Vec3 {
  const len = Math.hypot(x, y, z) || 1
  return { x: x / len, y: y / len, z: z / len }
}

/** Unoccluded rectangle inside the canvas, in CSS pixels from the top-left. */
export function visibleBand(
  canvasWidth: number,
  canvasHeight: number,
  insets: FramingInsets,
): PixelBand {
  const w = Math.max(canvasWidth, 1)
  const h = Math.max(canvasHeight, 1)
  const left = clamp(insets.left, 0, w - 1)
  const top = clamp(insets.top, 0, h - 1)
  const right = clamp(insets.right, 0, Math.max(0, w - left - 1))
  const bottom = clamp(insets.bottom, 0, Math.max(0, h - top - 1))
  return {
    x: left,
    y: top,
    width: Math.max(1, w - left - right),
    height: Math.max(1, h - top - bottom),
  }
}

/**
 * Offset that places the camera look-at at the centre of `band`.
 * Positive offsetY moves the subject up; positive offsetX moves it left.
 * Matches PerspectiveCamera.setViewOffset in three r170.
 */
export function viewOffsetForBand(
  canvasWidth: number,
  canvasHeight: number,
  band: PixelBand,
): ViewOffset {
  const focusX = band.x + band.width / 2
  const focusY = band.y + band.height / 2
  return {
    fullWidth: canvasWidth,
    fullHeight: canvasHeight,
    offsetX: canvasWidth / 2 - focusX,
    offsetY: canvasHeight / 2 - focusY,
    width: canvasWidth,
    height: canvasHeight,
  }
}

export function insetsChanged(a: FramingInsets, b: FramingInsets, epsilon = 8): boolean {
  return (
    Math.abs(a.top - b.top) >= epsilon ||
    Math.abs(a.right - b.right) >= epsilon ||
    Math.abs(a.bottom - b.bottom) >= epsilon ||
    Math.abs(a.left - b.left) >= epsilon
  )
}

/**
 * Camera distance so a sphere of `radius` fills `fill` of the visible band
 * (the tighter of the band's width and height). A shorter band — keyboard
 * open — pulls the camera back so the whole target stays in that band.
 */
export function fitDistance(opts: {
  radius: number
  fovDeg: number
  canvasWidth: number
  canvasHeight: number
  bandWidth: number
  bandHeight: number
  fill?: number
  minDistance: number
}): number {
  const fill = clamp(opts.fill ?? 0.7, 0.2, 0.95)
  const radius = Math.max(opts.radius, 1e-4)
  const canvasW = Math.max(opts.canvasWidth, 1)
  const canvasH = Math.max(opts.canvasHeight, 1)
  const vFov = (opts.fovDeg * Math.PI) / 180
  const aspect = canvasW / canvasH
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
  const vFrac = clamp(opts.bandHeight / canvasH, 0.08, 1)
  const hFrac = clamp(opts.bandWidth / canvasW, 0.08, 1)
  const vAngle = 2 * Math.atan(Math.tan(vFov / 2) * vFrac)
  const hAngle = 2 * Math.atan(Math.tan(hFov / 2) * hFrac)
  const distV = radius / Math.max(Math.tan((fill * vAngle) / 2), 1e-4)
  const distH = radius / Math.max(Math.tan((fill * hAngle) / 2), 1e-4)
  return Math.max(distV, distH, opts.minDistance)
}

/**
 * Candidate camera directions in the upright body frame
 * (cranial +Y, anterior +Z, the body's right +X).
 * Priors favour an anterior-medial view for a medial limb muscle, a
 * posterior view for a posterior muscle, and an outside view for a
 * far-lateral part. Occlusion scoring adds to these priors.
 */
export function anatomicalViewCandidates(center: Vec3, bodyHalfWidth: number): ViewCandidate[] {
  const half = Math.max(bodyHalfWidth, 0.2)
  const ax = center.x
  const az = center.z
  const lateralSign = Math.abs(ax) < half * 0.12 ? 0 : Math.sign(ax)
  const medial = -lateralSign
  const lateralness = clamp(Math.abs(ax) / half, 0, 1)
  // A centre near the coronal plane is not "posterior". Vastus medialis and
  // the adductors sit close to z = 0. A centre behind about z = -0.1
  // (gluteus maximus, hamstrings, erector spinae) is dorsal.
  const anteriorness = clamp((az + 0.02) / 0.28, 0, 1)
  const posteriorness = clamp((-az - 0.1) / 0.16, 0, 1)
  const front = 1 - posteriorness
  const sided = lateralSign !== 0
  const medialWeight = sided ? clamp(1 - lateralness / 0.55, 0, 1) : 0
  const lateralWeight = sided ? clamp((lateralness - 0.35) / 0.45, 0, 1) : 0

  const out: ViewCandidate[] = []
  const push = (id: string, x: number, y: number, z: number, prior: number) => {
    out.push({ id, dir: norm(x, y, z), prior })
  }

  push('anterior', lateralSign * 0.16, 0.18, 1, (0.08 + anteriorness * 0.34) * front)
  push('posterior', lateralSign * 0.16, 0.2, -1, 0.16 + posteriorness * 0.62)

  if (sided) {
    push(
      'anterior-medial',
      medial * 0.92,
      0.2,
      0.78,
      (0.2 + medialWeight * (0.48 + anteriorness * 0.2)) * front,
    )
    push(
      'anterior-lateral',
      lateralSign * 0.9,
      0.22,
      0.62,
      (0.1 + anteriorness * 0.16 + lateralWeight * 0.46) * front,
    )
    push(
      'posterior-lateral',
      lateralSign * 0.72,
      0.24,
      -0.82,
      0.12 + posteriorness * (0.4 + lateralWeight * 0.22),
    )
    push(
      'posterior-medial',
      medial * 0.55,
      0.2,
      -0.88,
      0.05 + posteriorness * 0.2 + medialWeight * 0.06,
    )
    push(
      'lateral',
      lateralSign,
      0.18,
      az >= 0 ? 0.12 : -0.12,
      0.08 + lateralWeight * 0.28,
    )
  }

  if (Math.hypot(ax, az) > 0.05) {
    push('outward', ax, Math.abs(ax) + Math.abs(az) > 0 ? 0.28 : 0.2, az, 0.14)
  }

  return out
}

export function preferredViewId(center: Vec3, bodyHalfWidth: number): string {
  const candidates = anatomicalViewCandidates(center, bodyHalfWidth)
  let best = candidates[0]
  if (!best) return 'anterior'
  for (const c of candidates) {
    if (c.prior > best.prior) best = c
  }
  return best.id
}

/** Frame one side of a bilateral target so that side fills the view. */
export function namesForOneSide(names: string[]): string[] {
  const left: string[] = []
  const right: string[] = []
  const mid: string[] = []
  for (const name of names) {
    const side = meshSide(name)
    if (side === 'l') left.push(name)
    else if (side === 'r') right.push(name)
    else mid.push(name)
  }
  if (left.length > 0 && right.length > 0) return [...left, ...mid]
  return [...names]
}

export function meshSide(name: string): 'l' | 'r' | null {
  if (name.startsWith('vertebra_')) return null
  if (/_l\d+$/.test(name) || name.endsWith('_l')) return 'l'
  if (/_r\d+$/.test(name) || name.endsWith('_r')) return 'r'
  return null
}
