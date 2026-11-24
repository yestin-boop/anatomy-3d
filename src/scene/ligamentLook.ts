/**
 * Display look for the licensed ankle ligaments.
 * Geometry stays the Z-Anatomy / BodyParts3D meshes; only a runtime
 * inflate along vertex normals and a material/label pass change how
 * they read on screen.
 */
import * as THREE from 'three'

/** Cream bone used in the ankle case. Ligament colors must stay off this. */
export const ANKLE_BONE_COLOR = 0xe9dcc8

/**
 * Display inflate along vertex normals, in scene units (body height ≈ 4.2).
 * The packed ATFL/CFL/deltoid ribbons are ~0.49 mm thick in BodyParts3D
 * units — about 0.0012 after the body scale, a sub-pixel edge on a
 * 390×844 frame. 0.008 (~3 mm per side) makes a ~7 mm band: obvious as
 * a band, not a sausage, and still short of the lateral malleolus or
 * talar neck.
 */
export const LIGAMENT_INFLATE_WORLD = 0.008

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
 * geometry). Callers convert a world-space inflate through the body scale.
 * Returns a cloned geometry; the input is left unchanged.
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
