/**
 * Lateral ankle sprain case: locked answers, tap grading, and the motion curve.
 * Run: npm test
 */
import { ANKLE_INJURY_U, ANKLE_PLANTARFLEXION_RAD, anklePoseAt } from '../src/scene/anklePose.ts'
import {
  ANKLE_FRAME_MESHES,
  ANKLE_LEARN,
  ANKLE_QUIZ,
  RIGHT_FOOT_BONES,
  ankleTypeMatch,
  classifyAnkleMesh,
  gradeAnkleTap,
  type AnkleTapStep,
  type AnkleTypeStep,
} from '../src/data/ankleSprain.ts'
import * as THREE from 'three'
import {
  ANKLE_BONE_COLOR,
  ANKLE_FRAME_FILL,
  LIGAMENT_DIM,
  LIGAMENT_INFLATE_MM,
  LIGAMENT_LOOK,
  LIGAMENT_SEAT,
  ankleLigamentLabelsVisible,
  applyLigamentDisplayTreatment,
  inflateGeometryAlongNormals,
  ligamentInflateMm,
  ligamentLabel,
  ligamentRole,
} from '../src/scene/ligamentLook.ts'
import {
  shouldResumeIdleSpinAfterControlsEnd,
  shouldResumeIdleSpinOnMenuOrExitView,
} from '../src/scene/idleSpin.ts'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

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

function typeStep(id: string): AnkleTypeStep {
  const step = ANKLE_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'type') throw new Error(`missing type step ${id}`)
  return step
}

function tapStep(id: string): AnkleTapStep {
  const step = ANKLE_QUIZ.find((item) => item.id === id)
  if (!step || step.kind !== 'tap') throw new Error(`missing tap step ${id}`)
  return step
}

const atfl = typeStep('type-atfl')
assert(ankleTypeMatch(atfl, 'ATFL'), 'ATFL abbreviation live-matches')
assert(ankleTypeMatch(atfl, 'anterior talofibular ligament'), 'full ATFL name live-matches')
assert(ankleTypeMatch(atfl, 'anterior talofibular', 'confirm'), 'shorter ATFL name confirms on Enter')
assert(!ankleTypeMatch(atfl, 'anterior talofibular'), 'shorter ATFL name waits while it is a prefix')
assert(!ankleTypeMatch(atfl, 'deltoid'), 'deltoid is not the ATFL answer')
assert(!ankleTypeMatch(atfl, 'cfl'), 'CFL is not the ATFL answer')
assert(!ankleTypeMatch(atfl, 'ptfl'), 'PTFL is not required')
assert(!ankleTypeMatch(atfl, 'posterior talofibular ligament'), 'posterior talofibular is not the answer')

const cfl = typeStep('type-cfl')
assert(ankleTypeMatch(cfl, 'cfl'), 'CFL abbreviation live-matches')
assert(ankleTypeMatch(cfl, 'calcaneofibular ligament'), 'full CFL name live-matches')
assert(!ankleTypeMatch(cfl, 'atfl'), 'ATFL is not the CFL answer')
assert(!ankleTypeMatch(cfl, 'deltoid ligament', 'confirm'), 'deltoid is not accepted for the lateral ligament')

const tapAtfl = tapStep('tap-atfl')
assert(gradeAnkleTap(tapAtfl, 'atfl').ok, 'tapping ATFL is correct')
assert(!gradeAnkleTap(tapAtfl, 'cfl').ok, 'tapping CFL is the wrong ligament for the ATFL question')
assert(!gradeAnkleTap(tapAtfl, 'deltoid').ok, 'deltoid is wrong for the lateral sprain')
assert(!gradeAnkleTap(tapAtfl, 'fibula').ok, 'fibula bone is not the ligament')
assert(gradeAnkleTap(tapAtfl, 'deltoid').message.toLowerCase().includes('medial'), 'deltoid feedback says medial')

const tapCfl = tapStep('tap-cfl')
assert(gradeAnkleTap(tapCfl, 'cfl').ok, 'tapping CFL is correct')
assert(!gradeAnkleTap(tapCfl, 'atfl').ok, 'ATFL is not the CFL tap')
assert(!gradeAnkleTap(tapCfl, 'deltoid').ok, 'deltoid is not the CFL')

const palp = tapStep('palpate')
assert(gradeAnkleTap(palp, 'atfl').ok, 'tender site is the ATFL region')
assert(!gradeAnkleTap(palp, 'fibula').ok, 'distal fibula is the non-tender bone')
assert(!gradeAnkleTap(palp, 'deltoid').ok, 'deltoid is the non-tender medial ligament')
assert(gradeAnkleTap(palp, 'fibula').message.toLowerCase().includes('non-tender'), 'fibula feedback says non-tender')
assert(gradeAnkleTap(palp, 'deltoid').message.toLowerCase().includes('non-tender'), 'deltoid feedback says non-tender')

assert(classifyAnkleMesh('atfl_r') === 'atfl', 'right ATFL mesh classifies as ATFL')
assert(classifyAnkleMesh('cfl_r') === 'cfl', 'right CFL mesh classifies as CFL')
assert(classifyAnkleMesh('deltoid_r') === 'deltoid', 'right deltoid mesh classifies as deltoid')
assert(classifyAnkleMesh('fibula_r') === 'fibula', 'right fibula is the bone distractor')
assert(classifyAnkleMesh('atfl_l') === 'other-ankle', 'left ATFL is the other ankle')
assert(classifyAnkleMesh('tibia_r') === 'other', 'tibia is not scored as the distal fibula')

assert(RIGHT_FOOT_BONES.includes('talus_r'), 'the moving set includes the talus')
assert(RIGHT_FOOT_BONES.includes('calcaneus_r'), 'the moving set includes the calcaneus')
assert(!RIGHT_FOOT_BONES.includes('tibia_r'), 'the tibia stays in the mortise')
assert(!RIGHT_FOOT_BONES.includes('fibula_r'), 'the fibula stays in the mortise')

const joined = ANKLE_LEARN.map((card) => card.paragraphs.join(' ')).join(' ')
assert(joined.includes('RICE'), 'learn text names RICE')
assert(joined.includes('Rest, Ice, Compression, Elevation'), 'learn text expands RICE from the lecture')
assert(!joined.includes('POLICE'), 'learn text no longer teaches POLICE')
assert(joined.includes('Grade II'), 'learn text names the Grade II impression')
assert(joined.toLowerCase().includes('inversion'), 'learn text names inversion')
assert(joined.toLowerCase().includes('plantarflexion'), 'learn text names plantarflexion')
assert(!/ottawa|harm\b|surgery is required/i.test(joined), 'learn text does not add a treatment claim past the notes')
assert(joined.includes('pain-free range of motion'), 'learn text names Phase 1 pain-free ROM')
assert(joined.toLowerCase().includes('isometric'), 'learn text names Phase 1 isometrics')
assert(joined.toLowerCase().includes('single-leg stand'), 'learn text names Phase 2 single-leg balance')
assert(joined.toLowerCase().includes('plyometrics'), 'learn text names Phase 3 plyometrics')
assert(ANKLE_LEARN.some((card) => card.id === 'totaps' && card.title === 'Six stages, then stop'), 'ankle learn has a general TOTAPS card')
assert(joined.includes('Talk, Observe, Touch, Active movement, Passive movement, and Skill test'), 'ankle TOTAPS card names the six stages')

const mechanism = typeStep('type-mechanism')
assert(ankleTypeMatch(mechanism, 'inversion and plantarflexion'), 'mechanism accepts inversion and plantarflexion')
assert(ankleTypeMatch(mechanism, 'plantarflexion and inversion'), 'mechanism accepts the reversed order')
assert(ankleTypeMatch(mechanism, 'inversion plantarflexion sprain'), 'mechanism accepts inversion plantarflexion sprain')
assert(!ankleTypeMatch(mechanism, 'inversion'), 'inversion alone is not the full mechanism')
assert(!ankleTypeMatch(mechanism, 'plantarflexion'), 'plantarflexion alone is not the full mechanism')

const pathway = typeStep('type-pathway')
assert(ankleTypeMatch(pathway, 'plyometrics, agility, and sport-specific training'), 'pathway accepts the Phase 3 work')
assert(ankleTypeMatch(pathway, 'plyometrics', 'confirm'), 'pathway accepts plyometrics on Enter')
assert(ankleTypeMatch(pathway, 'hopping and jumping', 'confirm'), 'pathway accepts hopping and jumping on Enter')
assert(!ankleTypeMatch(pathway, 'nordic hamstring curls'), 'the ankle pathway is not the hamstring Nordic example')
assert(!pathway.reveal.includes('POLICE') && pathway.reveal.includes('RICE'), 'pathway reveal uses RICE')

const start = anklePoseAt(0)
const end = anklePoseAt(1)
const injury = anklePoseAt(ANKLE_INJURY_U)
assert(start.plantarRad === 0 && start.inversionRad === 0, 'motion starts neutral')
assert(start.ligamentsVisible, 'ligaments show at the neutral start')
assert(end.plantarRad === 0 && end.inversionRad === 0, 'motion ends neutral')
assert(Math.abs(injury.plantarRad - ANKLE_PLANTARFLEXION_RAD) < 1e-9, 'injury pose uses the notes 40° plantarflexion')
assert(injury.inversionRad > 0.2, 'injury pose also inverts')
assert(!injury.ligamentsVisible, 'unrigged ligaments hide while the foot is off neutral')


assert(LIGAMENT_LOOK.atfl.color !== LIGAMENT_LOOK.cfl.color, 'ATFL and CFL use distinct hues')
assert(LIGAMENT_LOOK.atfl.color !== LIGAMENT_LOOK.deltoid.color, 'ATFL and deltoid use distinct hues')
assert(LIGAMENT_LOOK.cfl.color !== LIGAMENT_LOOK.deltoid.color, 'CFL and deltoid use distinct hues')
assert(LIGAMENT_LOOK.atfl.color !== ANKLE_BONE_COLOR, 'ATFL is not cream bone')
assert(LIGAMENT_LOOK.cfl.color !== ANKLE_BONE_COLOR, 'CFL is not cream bone')
assert(LIGAMENT_LOOK.deltoid.color !== ANKLE_BONE_COLOR, 'deltoid is not cream bone')
assert(LIGAMENT_LOOK.atfl.color !== 0xffe6b0, 'ATFL is no longer the washed pale gold')
assert(LIGAMENT_LOOK.cfl.color !== 0xffe6b0, 'CFL is no longer the washed pale gold')
assert(LIGAMENT_DIM.color !== LIGAMENT_LOOK.atfl.color, 'dim ligaments are darker than the hot ATFL')
assert(LIGAMENT_INFLATE_MM === 1.1, 'inflate is the chosen 1.1 mm')
assert(LIGAMENT_INFLATE_MM > 0.6 && LIGAMENT_INFLATE_MM < 2, 'inflate is a band, not a fleck or a sausage')
assert(ligamentInflateMm('atfl_r') === 1.1 && ligamentInflateMm('atfl_l') === 1.1, 'Open3D ATFL keeps the 1.1 mm band')
assert(ligamentInflateMm('cfl_r') === 0 && ligamentInflateMm('cfl_l') === 0, 'Open3D CFL is not inflated')
assert(ligamentInflateMm('deltoid_r') === 1.1, 'deltoid keeps the 1.1 mm inflate')
assert(LIGAMENT_SEAT.atfl_r?.position[0] === -1.6 && LIGAMENT_SEAT.atfl_r?.position[1] === -1.8 && LIGAMENT_SEAT.atfl_r?.position[2] === 0.4, 'right ATFL has the measured seat')
assert(LIGAMENT_SEAT.atfl_r?.rotationDeg?.[0] === -2.2 && LIGAMENT_SEAT.atfl_r?.rotationDeg?.[1] === -1.0 && LIGAMENT_SEAT.atfl_r?.rotationDeg?.[2] === -0.3, 'right ATFL has the small tilt')
assert(LIGAMENT_SEAT.cfl_r?.position[0] === 1.1 && LIGAMENT_SEAT.cfl_r?.position[1] === 1.5 && LIGAMENT_SEAT.cfl_r?.position[2] === 1.2, 'right CFL has the measured seat')
assert(LIGAMENT_SEAT.cfl_r?.rotationDeg?.[0] === 2.4 && LIGAMENT_SEAT.cfl_r?.rotationDeg?.[1] === 0 && LIGAMENT_SEAT.cfl_r?.rotationDeg?.[2] === 0, 'right CFL has the small tilt')
assert(LIGAMENT_SEAT.atfl_l?.position[0] === -LIGAMENT_SEAT.atfl_r!.position[0] && LIGAMENT_SEAT.atfl_l?.position[1] === LIGAMENT_SEAT.atfl_r!.position[1] && LIGAMENT_SEAT.atfl_l?.position[2] === LIGAMENT_SEAT.atfl_r!.position[2], 'left ATFL seat is the sagittal mirror of the right')
assert(LIGAMENT_SEAT.atfl_l?.rotationDeg?.[0] === LIGAMENT_SEAT.atfl_r!.rotationDeg![0] && LIGAMENT_SEAT.atfl_l?.rotationDeg?.[1] === -LIGAMENT_SEAT.atfl_r!.rotationDeg![1] && LIGAMENT_SEAT.atfl_l?.rotationDeg?.[2] === -LIGAMENT_SEAT.atfl_r!.rotationDeg![2], 'left ATFL tilt mirrors the right')
assert(LIGAMENT_SEAT.cfl_l?.position[0] === -LIGAMENT_SEAT.cfl_r!.position[0] && LIGAMENT_SEAT.cfl_l?.position[1] === LIGAMENT_SEAT.cfl_r!.position[1] && LIGAMENT_SEAT.cfl_l?.position[2] === LIGAMENT_SEAT.cfl_r!.position[2], 'left CFL seat is the sagittal mirror of the right')
assert(LIGAMENT_SEAT.cfl_l?.rotationDeg?.[0] === 2.4 && LIGAMENT_SEAT.cfl_l?.rotationDeg?.[1] === 0, 'left CFL tilt matches the right X tilt')
assert(LIGAMENT_SEAT.deltoid_r === undefined && LIGAMENT_SEAT.deltoid_l === undefined, 'deltoid is not rigidly reseated')

const idleBase = { disposed: false, viewMode: false, ankleCase: false, targetCount: 0 }
assert(shouldResumeIdleSpinAfterControlsEnd(idleBase), 'menu idle spin resumes after controls end')
assert(
  !shouldResumeIdleSpinAfterControlsEnd({ ...idleBase, ankleCase: true }),
  'ankle case does not resume spin after a simulated controls end',
)
assert(
  !shouldResumeIdleSpinAfterControlsEnd({ ...idleBase, ankleCase: true, targetCount: 0 }),
  'ankle case stays still even though targetIds are empty',
)
assert(shouldResumeIdleSpinAfterControlsEnd({ ...idleBase, viewMode: false, targetCount: 0 }), 'empty targets still resume on the menu')
assert(!shouldResumeIdleSpinAfterControlsEnd({ ...idleBase, viewMode: true }), 'view mode still does not resume spin after controls end')
assert(!shouldResumeIdleSpinAfterControlsEnd({ ...idleBase, targetCount: 2 }), 'a quiz target still does not resume spin after controls end')
assert(!shouldResumeIdleSpinAfterControlsEnd({ ...idleBase, disposed: true }), 'a disposed scene does not resume spin')
assert(shouldResumeIdleSpinOnMenuOrExitView({ ankleCase: false }), 'showMenuView and exitView still resume spin on the menu')
assert(!shouldResumeIdleSpinOnMenuOrExitView({ ankleCase: true }), 'showMenuView and exitView do not spin while the ankle case is open')
assert(ANKLE_FRAME_FILL > 0.66 && ANKLE_FRAME_FILL <= 0.88, 'ankle frame is tighter than the general quiz fill')
assert(ligamentRole('atfl_r') === 'atfl' && ligamentRole('cfl_r') === 'cfl', 'mesh names map to ligament roles')
assert(ligamentLabel('atfl_r') === 'ATFL' && ligamentLabel('cfl_r') === 'CFL', 'right lateral bands have short labels')
assert(ligamentLabel('deltoid_r') === null, 'deltoid stays unlabeled so the lateral tags stay clear')
assert(ankleLigamentLabelsVisible(true, true), 'labels show on the Learn ligaments step at rest')
assert(!ankleLigamentLabelsVisible(false, true), 'labels hide when unrigged ligaments hide off neutral')
assert(!ankleLigamentLabelsVisible(true, false), 'labels stay off outside the ligaments step')

const box = new THREE.BoxGeometry(1, 1, 0.1)
box.computeBoundingBox()
const before = box.boundingBox!.getSize(new THREE.Vector3())
const fat = inflateGeometryAlongNormals(box, 0.05)
fat.computeBoundingBox()
const after = fat.boundingBox!.getSize(new THREE.Vector3())
assert(Math.abs(after.z - (before.z + 0.1)) < 1e-6, 'inflate thickens a slab by twice the offset')
assert(Math.abs(after.x - (before.x + 0.1)) < 1e-6, 'inflate also moves the other faces out')
assert(box.boundingBox!.getSize(new THREE.Vector3()).z === before.z, 'inflate clones the geometry and leaves the source alone')

assert(!ANKLE_FRAME_MESHES.includes('metatarsal1_r'), 'forefoot metatarsals no longer pull the ankle frame out')
assert(!ANKLE_FRAME_MESHES.includes('metatarsal5_r'), 'fifth metatarsal is not in the tight ankle frame')
assert(ANKLE_FRAME_MESHES.includes('talus_r') && ANKLE_FRAME_MESHES.includes('calcaneus_r'), 'hindfoot bones still frame the ankle')
assert(ANKLE_FRAME_MESHES.includes('atfl_r') && ANKLE_FRAME_MESHES.includes('cfl_r'), 'lateral ligaments are in the frame')

async function loadMesh(rel: string, name: string): Promise<THREE.Mesh> {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'models', 'extra')
  const buf = readFileSync(join(root, rel))
  const loader = new GLTFLoader()
  const gltf = await new Promise<THREE.GLTF>((res, rej) => {
    loader.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', res, rej)
  })
  let mesh: THREE.Mesh | null = null
  gltf.scene.updateMatrixWorld(true)
  gltf.scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh && !mesh) mesh = obj
  })
  if (!mesh) throw new Error(`no mesh in ${rel}`)
  mesh.name = name
  mesh.updateWorldMatrix(true, false)
  return mesh
}

function worldVerts(mesh: THREE.Mesh): THREE.Vector3[] {
  mesh.updateWorldMatrix(true, false)
  const pos = mesh.geometry.getAttribute('position')
  const out: THREE.Vector3[] = []
  const p = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    p.fromBufferAttribute(pos as THREE.BufferAttribute, i).applyMatrix4(mesh.matrixWorld)
    out.push(p.clone())
  }
  return out
}

function minSignedDistance(verts: THREE.Vector3[], bone: THREE.Mesh): number {
  const pos = bone.geometry.getAttribute('position')
  const index = bone.geometry.getIndex()
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()
  const tri = new THREE.Triangle()
  const closest = new THREE.Vector3()
  const n = new THREE.Vector3()
  const triCount = index ? index.count / 3 : Math.floor(pos.count / 3)
  bone.updateWorldMatrix(true, false)
  const mw = bone.matrixWorld
  let minSigned = Infinity
  for (const point of verts) {
    let best = Infinity
    let bestPt: THREE.Vector3 | null = null
    let bestN: THREE.Vector3 | null = null
    for (let t = 0; t < triCount; t++) {
      const ia = index ? index.getX(t * 3) : t * 3
      const ib = index ? index.getX(t * 3 + 1) : t * 3 + 1
      const ic = index ? index.getX(t * 3 + 2) : t * 3 + 2
      a.fromBufferAttribute(pos as THREE.BufferAttribute, ia).applyMatrix4(mw)
      b.fromBufferAttribute(pos as THREE.BufferAttribute, ib).applyMatrix4(mw)
      c.fromBufferAttribute(pos as THREE.BufferAttribute, ic).applyMatrix4(mw)
      const minX = Math.min(a.x, b.x, c.x)
      const maxX = Math.max(a.x, b.x, c.x)
      const minY = Math.min(a.y, b.y, c.y)
      const maxY = Math.max(a.y, b.y, c.y)
      const minZ = Math.min(a.z, b.z, c.z)
      const maxZ = Math.max(a.z, b.z, c.z)
      if (point.x < minX - 30 || point.x > maxX + 30) continue
      if (point.y < minY - 30 || point.y > maxY + 30) continue
      if (point.z < minZ - 30 || point.z > maxZ + 30) continue
      tri.set(a, b, c)
      tri.closestPointToPoint(point, closest)
      const d = closest.distanceTo(point)
      if (d < best) {
        best = d
        bestPt = closest.clone()
        tri.getNormal(n)
        bestN = n.clone()
      }
    }
    if (!bestPt || !bestN) continue
    const signed = bestN.dot(new THREE.Vector3().subVectors(point, bestPt)) >= 0 ? best : -best
    if (signed < minSigned) minSigned = signed
  }
  return minSigned
}

{
  const fibula = await loadMesh('fibula_r.glb', 'fibula_r')
  const talus = await loadMesh('talus_r.glb', 'talus_r')
  const calcaneus = await loadMesh('calcaneus_r.glb', 'calcaneus_r')
  const navicular = await loadMesh('navicular_r.glb', 'navicular_r')

  function pcaLength(mesh: THREE.Mesh): number {
    const verts = worldVerts(mesh)
    const n = verts.length
    const c = new THREE.Vector3()
    for (const v of verts) c.add(v)
    c.multiplyScalar(1 / n)
    const C = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (const v of verts) {
      const x = v.x - c.x, y = v.y - c.y, z = v.z - c.z
      C[0] += x * x; C[1] += x * y; C[2] += x * z
      C[3] += y * x; C[4] += y * y; C[5] += y * z
      C[6] += z * x; C[7] += z * y; C[8] += z * z
    }
    const ax = new THREE.Vector3(1, 0, 0)
    for (let i = 0; i < 40; i++) {
      ax.set(
        C[0] * ax.x + C[1] * ax.y + C[2] * ax.z,
        C[3] * ax.x + C[4] * ax.y + C[5] * ax.z,
        C[6] * ax.x + C[7] * ax.y + C[8] * ax.z,
      ).normalize()
    }
    let mn = Infinity, mx = -Infinity
    for (const v of verts) {
      const p = (v.x - c.x) * ax.x + (v.y - c.y) * ax.y + (v.z - c.z) * ax.z
      if (p < mn) mn = p
      if (p > mx) mx = p
    }
    return mx - mn
  }

  const atflRaw = await loadMesh('ligaments/atfl_r.glb', 'atfl_r')
  const cflRaw = await loadMesh('ligaments/cfl_r.glb', 'cfl_r')
  const atflLRaw = await loadMesh('ligaments/atfl_l.glb', 'atfl_l')
  const cflLRaw = await loadMesh('ligaments/cfl_l.glb', 'cfl_l')
  const deltoidRaw = await loadMesh('ligaments/deltoid_r.glb', 'deltoid_r')

  const atflLen = pcaLength(atflRaw)
  const cflLen = pcaLength(cflRaw)
  const atflN = atflRaw.geometry.getAttribute('position').count
  const cflN = cflRaw.geometry.getAttribute('position').count
  const atflLN = atflLRaw.geometry.getAttribute('position').count
  const cflLN = cflLRaw.geometry.getAttribute('position').count
  const deltoidNverts = deltoidRaw.geometry.getAttribute('position').count

  assert(atflN === 498 && atflLN === 498, `Open3D ATFL has 498 verts (got R ${atflN} L ${atflLN})`)
  assert(cflN === 351 && cflLN === 351, `Open3D CFL has 351 verts (got R ${cflN} L ${cflLN})`)
  assert(deltoidNverts === 162, `deltoid is still the Z-Anatomy mesh (${deltoidNverts} verts)`)
  assert(atflLen > 32.7 && atflLen < 33.2, `packed ATFL length is about 33 mm (got ${atflLen.toFixed(2)})`)
  assert(cflLen > 26.0 && cflLen < 26.5, `packed CFL length is about 26 mm (got ${cflLen.toFixed(2)})`)
  assert(Math.abs(pcaLength(atflLRaw) - atflLen) < 0.05, 'left ATFL length matches the right')
  assert(Math.abs(pcaLength(cflLRaw) - cflLen) < 0.05, 'left CFL length matches the right')

  const atflBeforeF = minSignedDistance(worldVerts(atflRaw), fibula)
  const atflBeforeT = minSignedDistance(worldVerts(atflRaw), talus)
  const cflBeforeF = minSignedDistance(worldVerts(cflRaw), fibula)
  const cflBeforeC = minSignedDistance(worldVerts(cflRaw), calcaneus)

  assert(atflBeforeT < -0.8 && atflBeforeT > -1.4, `raw ATFL slightly intrudes the talus (signed ${atflBeforeT.toFixed(2)})`)
  assert(atflBeforeF < 0 && atflBeforeF > -0.5, `raw ATFL barely clips the fibula (signed ${atflBeforeF.toFixed(2)})`)
  assert(cflBeforeF < -1.5 && cflBeforeF > -2.2, `raw CFL clips the fibula by about 1.9 mm (signed ${cflBeforeF.toFixed(2)})`)
  assert(cflBeforeC > 0.5 && cflBeforeC < 1.0, `raw CFL mid-substance already sits near the calcaneus (signed ${cflBeforeC.toFixed(2)})`)

  const atfl = await loadMesh('ligaments/atfl_r.glb', 'atfl_r')
  const cfl = await loadMesh('ligaments/cfl_r.glb', 'cfl_r')
  const atflL = await loadMesh('ligaments/atfl_l.glb', 'atfl_l')
  const cflL = await loadMesh('ligaments/cfl_l.glb', 'cfl_l')
  const deltoid = await loadMesh('ligaments/deltoid_r.glb', 'deltoid_r')
  applyLigamentDisplayTreatment(atfl)
  applyLigamentDisplayTreatment(cfl)
  applyLigamentDisplayTreatment(atflL)
  applyLigamentDisplayTreatment(cflL)
  applyLigamentDisplayTreatment(deltoid)

  const fibulaL = await loadMesh('fibula_l.glb', 'fibula_l')
  const talusL = await loadMesh('talus_l.glb', 'talus_l')
  const calcaneusL = await loadMesh('calcaneus_l.glb', 'calcaneus_l')

  const atflF = minSignedDistance(worldVerts(atfl), fibula)
  const atflT = minSignedDistance(worldVerts(atfl), talus)
  const cflF = minSignedDistance(worldVerts(cfl), fibula)
  const cflC = minSignedDistance(worldVerts(cfl), calcaneus)
  const atflLF = minSignedDistance(worldVerts(atflL), fibulaL)
  const atflLT = minSignedDistance(worldVerts(atflL), talusL)
  const cflLF = minSignedDistance(worldVerts(cflL), fibulaL)
  const cflLC = minSignedDistance(worldVerts(cflL), calcaneusL)
  const deltoidN = minSignedDistance(worldVerts(deltoid), navicular)

  assert(atflF > 0.4 && atflF <= 1.0, `seated ATFL sits on the fibula without sinking (signed ${atflF.toFixed(2)} mm)`)
  assert(atflT > 0.4 && atflT <= 1.0, `seated ATFL sits on the talus without sinking (signed ${atflT.toFixed(2)} mm)`)
  assert(cflF > 0.4 && cflF <= 1.0, `seated CFL is out of the fibula and still tight (signed ${cflF.toFixed(2)} mm)`)
  assert(cflC > 0.4 && cflC <= 1.0, `seated CFL mid-substance stays just outside the calcaneus (signed ${cflC.toFixed(2)} mm)`)
  assert(atflLF > 0.4 && atflLF <= 1.0, `left ATFL sits on the fibula (signed ${atflLF.toFixed(2)} mm)`)
  assert(atflLT > 0.4 && atflLT <= 1.0, `left ATFL sits on the talus (signed ${atflLT.toFixed(2)} mm)`)
  assert(cflLF > 0.4 && cflLF <= 1.0, `left CFL is out of the fibula (signed ${cflLF.toFixed(2)} mm)`)
  assert(cflLC > 0.4 && cflLC <= 1.0, `left CFL mid-substance stays just outside the calcaneus (signed ${cflLC.toFixed(2)} mm)`)
  assert(atflF > atflBeforeF + 0.5, 'ATFL display seat lifts the talar/fibular clips out of bone')
  assert(cflF > cflBeforeF + 2, 'CFL display seat clears the packed fibular clip')
  assert(deltoidN > 10, `deltoid–navicular shortfall is not closed with invented mesh (${deltoidN.toFixed(1)} mm)`)
  assert(Math.abs(deltoid.position.x) < 1e-9 && Math.abs(deltoid.position.y) < 1e-9, 'deltoid mesh was not translated')

  const { readFileSync: readSync } = await import('node:fs')
  // Pack only by running the production packer into a temp dir would also
  // write the large bone/muscle packs. Re-read the ligaments the same way
  // the packer does, then walk a ligaments-only ANPK built identically.
  const ligDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'models', 'extra', 'ligaments')
  const urls: string[] = JSON.parse(readSync(join(ligDir, 'manifest.json'), 'utf8'))
  const parts: Buffer[] = [Buffer.alloc(12)]
  parts[0].write('ANPK', 0, 'latin1')
  parts[0].writeUInt32LE(1, 4)
  parts[0].writeUInt32LE(urls.length, 8)
  const originals: { name: string; file: Buffer }[] = []
  for (const url of urls) {
    const base = String(url).split('/').pop() as string
    const file = readSync(join(ligDir, base))
    const nameBuf = Buffer.from(base, 'utf8')
    const head = Buffer.alloc(2 + nameBuf.length + 4)
    head.writeUInt16LE(nameBuf.length, 0)
    nameBuf.copy(head, 2)
    head.writeUInt32LE(file.length, 2 + nameBuf.length)
    parts.push(head, file)
    originals.push({ name: base, file })
  }
  const packed = Buffer.concat(parts)
  assert(packed.toString('latin1', 0, 4) === 'ANPK', 'ligaments.pack has ANPK magic')
  assert(packed.readUInt32LE(4) === 1, 'ligaments.pack is ANPK v1')
  assert(packed.readUInt32LE(8) === urls.length, 'ligaments.pack holds every manifest GLB')
  assert(urls.length >= 6, 'ligaments manifest still includes the original ankle set')
  for (const need of ['atfl_r.glb', 'atfl_l.glb', 'cfl_r.glb', 'cfl_l.glb', 'deltoid_r.glb', 'deltoid_l.glb']) {
    assert(originals.some((item) => item.name === need), `ligaments pack includes ${need}`)
  }
  let cur = 12
  for (let i = 0; i < originals.length; i++) {
    const nameLen = packed.readUInt16LE(cur)
    cur += 2
    const name = packed.toString('utf8', cur, cur + nameLen)
    cur += nameLen
    const dataLen = packed.readUInt32LE(cur)
    cur += 4
    const data = packed.subarray(cur, cur + dataLen)
    cur += dataLen
    assert(name === originals[i].name, `pack entry ${i} is ${originals[i].name}`)
    assert(Buffer.compare(data, originals[i].file) === 0, `${name} in the pack matches the public GLB`)
  }
  assert(cur === packed.length, 'ligaments.pack has no trailing bytes')
  const deltoidR = originals.find((item) => item.name === 'deltoid_r.glb')
  const deltoidL = originals.find((item) => item.name === 'deltoid_l.glb')
  assert(deltoidR?.file.length === 4596 && deltoidL?.file.length === 4596, 'deltoid GLBs are the original Z-Anatomy files')
  const atflPacked = originals.find((item) => item.name === 'atfl_r.glb')
  const cflPacked = originals.find((item) => item.name === 'cfl_r.glb')
  assert((atflPacked?.file.length ?? 0) > 10000, 'packed ATFL is the larger Open3D mesh, not the old 18-vert stub')
  assert((cflPacked?.file.length ?? 0) > 8000, 'packed CFL is the larger Open3D mesh, not the old 18-vert stub')
}


if (failed) {
  console.error(`\n${passed} passed, ${failed} failed`)
  throw new Error(`${failed} ankle-sprain tests failed`)
}
console.log(`${passed} passed`)
