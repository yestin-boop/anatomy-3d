/**
 * Display look for the licensed ankle ligaments.
 * Geometry stays the Z-Anatomy / BodyParts3D meshes; only a small
 * rigid seat, a runtime inflate along vertex normals, and a
 * material/label pass change how they read on screen.
 */
import * as THREE from 'three'

/** Cream bone used in the ankle case. Ligament colors must stay off this. */
export const ANKLE_BONE_COLOR = 0xe9dcc8

/**
 * Display inflate along vertex normals, in millimetres of the packed
 * geometry (the GLBs are in this pack's millimetre Z-up frame).
 * 0.008 scene units was ~3.2 mm per side and shoved the thickened
 * wedges into or off the attachments. 1.1 mm per side still reads as a
 * band once the right ATFL and CFL are seated, without sinking into bone.
 */
export const LIGAMENT_INFLATE_MM = 1.1

/**
 * Small rigid seats for the right lateral ligaments, in the packed
 * millimetre Z-up frame. Applied at runtime to the licensed meshes;
 * the packed GLBs are not rewritten. The deltoid is left where the
 * Z-Anatomy fit put it, including the documented tibionavicular gap.
 */
export type LigamentSeat = {
  position: readonly [number, number, number]
  /** Local Euler XYZ, in degrees. */
  rotationDeg?: readonly [number, number, number]
}

export const LIGAMENT_SEAT: Readonly<Record<string, LigamentSeat>> = {
  atfl_r: { position: [-1, 4.5, -2.5] },
  cfl_r: { position: [-2, -1, -3.5], rotationDeg: [-4, -4, 0] },
}

/** Translate and rotate a licensed ligament into its runtime seat. Idempotent. */
export function seatLigamentMesh(mesh: THREE.Mesh): void {
  const seat = LIGAMENT_SEAT[mesh.name]
  if (!seat || mesh.userData.ligamentSeated) return
  mesh.position.x += seat.position[0]
  mesh.position.y += seat.position[1]
  mesh.position.z += seat.position[2]
  if (seat.rotationDeg) {
    const e = new THREE.Euler(
      (seat.rotationDeg[0] * Math.PI) / 180,
      (seat.rotationDeg[1] * Math.PI) / 180,
      (seat.rotationDeg[2] * Math.PI) / 180,
      'XYZ',
    )
    mesh.quaternion.multiply(new THREE.Quaternion().setFromEuler(e))
  }
  mesh.userData.ligamentSeated = true
}

/** Runtime display treatment: seat, then inflate. Does not rewrite packed GLBs. */
export function applyLigamentDisplayTreatment(mesh: THREE.Mesh): void {
  seatLigamentMesh(mesh)
  if (mesh.userData.ligamentInflated) return
  mesh.geometry = inflateGeometryAlongNormals(mesh.geometry, LIGAMENT_INFLATE_MM)
  mesh.userData.ligamentInflated = true
}

/** Slightly tighter than the general quiz fill, ankle case only. */
export const ANKLE_FRAME_FILL = 0.8

export type LigamentRole = 'atfl' | 'cfl' | 'deltoid' | 'other'

export const LIGAMENT_LOOK = {
  atfl: {
    color: 0xc99216,
    emissive: 0x8a4e00,
    emissiveIntensity: 0.48,
  },
  cfl: {
    color: 0xa03c12,
    emissive: 0x6a1c08,
    emissiveIntensity: 0.46,
  },
  deltoid: {
    color: 0x8b3d40,
    emissive: 0x4a181c,
    emissiveIntensity: 0.36,
  },
} as const

export const LIGAMENT_DIM = {
  color: 0x5c4030,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 0.62,
} as const

export const LIGAMENT_BASE = {
  color: LIGAMENT_LOOK.atfl.color,
  emissive: LIGAMENT_LOOK.atfl.emissive,
  emissiveIntensity: 0.28,
  opacity: 1,
  metalness: 0.02,
  roughness: 0.46,
}

export function ligamentRole(name: string): LigamentRole {
  if (name.startsWith('atfl_')) return 'atfl'
  if (name.startsWith('cfl_')) return 'cfl'
  if (name.startsWith('deltoid_')) return 'deltoid'
  return 'other'
}

/** Short on-model labels. Deltoid stays unlabeled so the lateral bands stay clear. */
export function ligamentLabel(name: string): 'ATFL' | 'CFL' | null {
  if (name === 'atfl_r') return 'ATFL'
  if (name === 'cfl_r') return 'CFL'
  return null
}

export function ankleLigamentLabelsVisible(ligamentsVisible: boolean, labelsWanted: boolean): boolean {
  return ligamentsVisible && labelsWanted
}

/**
 * Move vertices along their normals by `localOffset` (same units as the
 * geometry; packed ligaments are millimetres). Returns a cloned geometry;
 * the input is left unchanged.
 */
export function inflateGeometryAlongNormals(
  geometry: THREE.BufferGeometry,
  localOffset: number,
): THREE.BufferGeometry {
  const geom = geometry.clone()
  if (!Number.isFinite(localOffset) || localOffset === 0) return geom
  geom.computeVertexNormals()
  const pos = geom.getAttribute('position')
  const nrm = geom.getAttribute('normal')
  if (!pos || !nrm) return geom
  const next = pos.clone()
  const p = new THREE.Vector3()
  const n = new THREE.Vector3()
  for (let i = 0; i < next.count; i++) {
    p.fromBufferAttribute(next as THREE.BufferAttribute, i)
    n.fromBufferAttribute(nrm as THREE.BufferAttribute, i)
    if (n.lengthSq() < 1e-12) continue
    n.normalize()
    p.addScaledVector(n, localOffset)
    next.setXYZ(i, p.x, p.y, p.z)
  }
  geom.setAttribute('position', next)
  geom.computeVertexNormals()
  geom.computeBoundingBox()
  geom.computeBoundingSphere()
  return geom
}
