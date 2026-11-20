/**
 * Framing math: visible-band offset, fit distance, and view-direction priors.
 * Run: npm test
 */
import * as THREE from 'three'
import {
  anatomicalViewCandidates,
  boxViewExtents,
  fitDistance,
  fitDistanceToExtents,
  insetsChanged,
  meshSide,
  namesForOneSide,
  preferredViewId,
  viewOffsetForBand,
  visibleBand,
} from '../src/scene/framing.ts'

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

function approx(a: number, b: number, eps: number): boolean {
  return Math.abs(a - b) <= eps
}

const iphone = { w: 390, h: 844 }
const noInset = { top: 0, right: 0, bottom: 0, left: 0 }

const clear = visibleBand(iphone.w, iphone.h, noInset)
assert(clear.x === 0 && clear.y === 0, 'no insets: band origin')
assert(clear.width === 390 && clear.height === 844, 'no insets: full canvas')
const clearOff = viewOffsetForBand(iphone.w, iphone.h, clear)
assert(approx(clearOff.offsetX, 0, 0.01) && approx(clearOff.offsetY, 0, 0.01), 'no insets: zero view offset')

// Keyboard + HUD cover the bottom; chips cover the top. Subject must move up.
const keyboard = visibleBand(iphone.w, iphone.h, { top: 88, right: 0, bottom: 430, left: 0 })
assert(keyboard.y === 88, 'keyboard band starts below the chips')
assert(keyboard.height === 844 - 88 - 430, 'keyboard band is the gap above the HUD')
const keyOff = viewOffsetForBand(iphone.w, iphone.h, keyboard)
assert(keyOff.offsetY > 40, 'keyboard offset moves the subject up')
assert(approx(keyOff.offsetX, 0, 0.01), 'keyboard offset does not shift sideways')

const focusY = keyboard.y + keyboard.height / 2
assert(
  approx(iphone.h / 2 - keyOff.offsetY, focusY, 0.01),
  'offset places the look-at on the band centre',
)

// Three.js projection agrees: the orbit target lands on that screen y.
{
  const cam = new THREE.PerspectiveCamera(38, iphone.w / iphone.h, 0.05, 200)
  cam.position.set(0, 0, 6)
  cam.lookAt(0, 0, 0)
  cam.updateMatrixWorld()
  cam.setViewOffset(keyOff.fullWidth, keyOff.fullHeight, keyOff.offsetX, keyOff.offsetY, keyOff.width, keyOff.height)
  const ndc = new THREE.Vector3(0, 0, 0).project(cam)
  const screenY = ((1 - ndc.y) / 2) * iphone.h
  assert(approx(screenY, focusY, 1.5), `projected look-at y ${screenY.toFixed(1)} is the visible centre ${focusY.toFixed(1)}`)
}

// Landscape: a short screen with a bottom HUD still shifts up, and stays finite.
const land = visibleBand(844, 390, { top: 52, right: 0, bottom: 120, left: 0 })
const landOff = viewOffsetForBand(844, 390, land)
assert(landOff.offsetY > 0, 'landscape HUD moves the subject up')
assert(land.height > 100, 'landscape still has a usable band')

// iPad portrait, side-less, modest HUD.
const ipad = visibleBand(820, 1180, { top: 96, right: 0, bottom: 220, left: 0 })
const ipadOff = viewOffsetForBand(820, 1180, ipad)
assert(ipadOff.offsetY > 0, 'iPad portrait HUD moves the subject up')

// Desktop study panel on the right: subject moves left, into the free area.
const desk = visibleBand(1440, 900, { top: 72, right: 380, bottom: 48, left: 0 })
const deskOff = viewOffsetForBand(1440, 900, desk)
assert(deskOff.offsetX > 0, 'right-hand panel moves the subject left')
const focusX = desk.x + desk.width / 2
assert(approx(1440 / 2 - deskOff.offsetX, focusX, 0.01), 'horizontal offset centres on the free band')

assert(!insetsChanged(noInset, { top: 4, right: 0, bottom: 3, left: 0 }, 8), 'sub-pixel inset noise is ignored')
assert(insetsChanged(noInset, { top: 0, right: 0, bottom: 300, left: 0 }, 8), 'keyboard inset is a real change')

const radius = 0.35
const fullDist = fitDistance({
  radius,
  fovDeg: 38,
  canvasWidth: iphone.w,
  canvasHeight: iphone.h,
  bandWidth: iphone.w,
  bandHeight: iphone.h,
  fill: 0.7,
  minDistance: 0.33,
})
const keyDist = fitDistance({
  radius,
  fovDeg: 38,
  canvasWidth: iphone.w,
  canvasHeight: iphone.h,
  bandWidth: keyboard.width,
  bandHeight: keyboard.height,
  fill: 0.7,
  minDistance: 0.33,
})
assert(keyDist > fullDist * 1.15, 'a keyboard band pulls the camera back so the target still fits')
assert(Number.isFinite(keyDist) && keyDist < 80, 'fit distance stays finite')

const tiny = fitDistance({
  radius: 0.004,
  fovDeg: 38,
  canvasWidth: 390,
  canvasHeight: 844,
  bandWidth: 390,
  bandHeight: 844,
  minDistance: 0.33,
})
assert(tiny === 0.33, 'tiny targets respect the distance floor')

// Wide desktop band can be width-limited when a side panel eats the view.
const wide = fitDistance({
  radius: 0.4,
  fovDeg: 38,
  canvasWidth: 1440,
  canvasHeight: 900,
  bandWidth: 1440,
  bandHeight: 900,
  fill: 0.7,
  minDistance: 0.33,
})
const narrow = fitDistance({
  radius: 0.4,
  fovDeg: 38,
  canvasWidth: 1440,
  canvasHeight: 900,
  bandWidth: 420,
  bandHeight: 900,
  fill: 0.7,
  minDistance: 0.33,
})
assert(narrow > wide, 'a narrow free column pulls the camera back')

// A tall thin muscle must be fitted by its height, not as a sphere shoved through the phone's width.
const thinSphere = fitDistance({
  radius: 0.67,
  fovDeg: 38,
  canvasWidth: 390,
  canvasHeight: 844,
  bandWidth: 390,
  bandHeight: 520,
  fill: 0.62,
  minDistance: 0.33,
})
const thinBox = fitDistanceToExtents({
  halfWidth: 0.1,
  halfHeight: 0.67,
  depth: 0.06,
  fovDeg: 38,
  canvasWidth: 390,
  canvasHeight: 844,
  bandWidth: 390,
  bandHeight: 520,
  fill: 0.62,
  marginPx: 14,
  minDistance: 0.33,
})
assert(thinBox < thinSphere * 0.9, `tall thin target stays closer than a sphere fit (${thinBox.toFixed(2)} vs ${thinSphere.toFixed(2)})`)

const wideRib = fitDistanceToExtents({
  halfWidth: 0.42,
  halfHeight: 0.12,
  depth: 0.16,
  fovDeg: 38,
  canvasWidth: 1440,
  canvasHeight: 900,
  bandWidth: 1440,
  bandHeight: 900,
  fill: 0.62,
  marginPx: 14,
  minDistance: 0.33,
})
const flatRib = fitDistanceToExtents({
  halfWidth: 0.42,
  halfHeight: 0.12,
  depth: 0,
  fovDeg: 38,
  canvasWidth: 1440,
  canvasHeight: 900,
  bandWidth: 1440,
  bandHeight: 900,
  fill: 0.62,
  marginPx: 14,
  minDistance: 0.33,
})
assert(wideRib > flatRib, 'depth toward the camera pulls back so the near end stays in frame')

const carpal = fitDistanceToExtents({
  halfWidth: 0.03,
  halfHeight: 0.02,
  depth: 0.01,
  fovDeg: 38,
  canvasWidth: 390,
  canvasHeight: 844,
  bandWidth: 390,
  bandHeight: 520,
  fill: 0.62,
  contextHalf: 0.11,
  minDistance: 0.33,
})
const carpalTight = fitDistanceToExtents({
  halfWidth: 0.03,
  halfHeight: 0.02,
  depth: 0.01,
  fovDeg: 38,
  canvasWidth: 390,
  canvasHeight: 844,
  bandWidth: 390,
  bandHeight: 520,
  fill: 0.62,
  contextHalf: 0,
  minDistance: 0.33,
})
assert(carpal > carpalTight * 1.4, 'a carpal keeps enough distance to show the wrist around it')

const sliver = fitDistanceToExtents({
  halfWidth: 0.11,
  halfHeight: 0.5,
  depth: 0.19,
  fovDeg: 38,
  canvasWidth: 844,
  canvasHeight: 390,
  bandWidth: 844,
  bandHeight: 40,
  fill: 0.66,
  marginPx: 12,
  minDistance: 0.33,
  maxDistance: 14,
})
const readable = fitDistanceToExtents({
  halfWidth: 0.11,
  halfHeight: 0.5,
  depth: 0.19,
  fovDeg: 38,
  canvasWidth: 844,
  canvasHeight: 390,
  bandWidth: 844,
  bandHeight: 40,
  fill: 0.66,
  marginPx: 12,
  minBandPx: 120,
  minDistance: 0.33,
  maxDistance: 14,
})
assert(readable < sliver * 0.9, `a sub-120px band stays close enough to read (${readable.toFixed(2)} vs ${sliver.toFixed(2)})`)

const anterior = boxViewExtents({ x: 0.1, y: 0.5, z: 0.08 }, { x: 0, y: 0, z: 1 })
assert(anterior.halfHeight > 0.45 && anterior.halfWidth < 0.15, 'an anterior view of a tall box is tall on screen')
assert(anterior.depth < 0.1, 'an anterior view has little depth toward the camera')

const half = 0.9
assert(
  preferredViewId({ x: -0.22, y: -0.7, z: 0.2 }, half) === 'anterior-medial',
  'medial anterior thigh (vastus medialis / adductors) prefers anterior-medial',
)
assert(
  preferredViewId({ x: -0.7, y: -0.7, z: 0.16 }, half) === 'anterior-lateral',
  'lateral anterior thigh prefers anterior-lateral',
)
const posteriorId = preferredViewId({ x: -0.32, y: -0.2, z: -0.38 }, half)
assert(
  posteriorId === 'posterior' || posteriorId === 'posterior-lateral',
  `posterior muscle prefers a back view (got ${posteriorId})`,
)
assert(
  preferredViewId({ x: 0.02, y: 0.4, z: 0.22 }, half) === 'anterior',
  'midline anterior bone prefers a front view',
)
assert(
  preferredViewId({ x: -0.04, y: 0.2, z: -0.2 }, half) === 'posterior',
  'midline back muscle prefers a posterior view',
)
assert(
  preferredViewId({ x: -0.22, y: -0.7, z: -0.06 }, half) === 'anterior-medial',
  'a medial thigh muscle near the coronal plane stays anterior-medial',
)
const gluteId = preferredViewId({ x: 0.17, y: 0.04, z: -0.2 }, half)
assert(
  gluteId === 'posterior' || gluteId === 'posterior-lateral',
  `a hip muscle behind the coronal plane prefers a back view (got ${gluteId})`,
)

const medial = anatomicalViewCandidates({ x: -0.22, y: -0.7, z: 0.18 }, half).find(
  (c) => c.id === 'anterior-medial',
)
assert(medial != null && medial.dir.x > 0.3 && medial.dir.z > 0.3, 'left medial camera sits toward the midline and in front')

const back = anatomicalViewCandidates({ x: -0.3, y: -0.2, z: -0.36 }, half).find((c) => c.id === 'posterior')
assert(back != null && back.dir.z < -0.5, 'posterior camera sits behind the body')

assert(
  namesForOneSide(['vastus_med_l', 'vastus_med_r']).join() === 'vastus_med_l',
  'bilateral target frames the left side only',
)
assert(
  namesForOneSide(['vastus_med_l', 'vastus_med_r', 'patella']).join() === 'vastus_med_l,patella',
  'bilateral frame keeps a midline mesh that belongs to the same target',
)
assert(
  namesForOneSide(['vertebra_t12']).join() === 'vertebra_t12',
  'an unpaired bone frames itself',
)
assert(namesForOneSide(['rib_l1', 'rib_r1', 'sternum_body']).sort().join() === 'rib_l1,sternum_body', 'paired ribs keep the midline sternum')
assert(meshSide('scaphoid_l') === 'l' && meshSide('vertebra_c7') === null, 'side parser')

if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} framing tests failed`)
}
console.log(`${passed} passed`)
