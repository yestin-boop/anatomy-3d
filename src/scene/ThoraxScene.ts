import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { assetUrl } from '../assetUrl'
import { forEachGlb, glbConcurrency, releaseGlbSessionCache } from './glbLoad'
import type { ViewAttachmentSite, ViewPrefer } from '../data/viewInfo'
import { directionFor, sideFromBox, type AnatomicalView } from '../data/anatomicalViews'
import { muscleVisibleAtLayer, type MuscleLayerFilter } from '../data/muscles'
import {
  boxViewExtents,
  fitDistanceToExtents,
  insetsChanged,
  viewOffsetForBand,
  visibleBand,
  type FramingInsets,
  type ViewExtents,
} from './framing'
import { anklePoseAt, type AnklePose } from './anklePose'
import {
  ANKLE_FRAME_FILL,
  LIGAMENT_BASE,
  LIGAMENT_DIM,
  LIGAMENT_INFLATE_MM,
  LIGAMENT_LOOK,
  applyLigamentDisplayTreatment,
  ligamentLabel,
  ligamentRole,
  ankleLigamentLabelsVisible,
} from './ligamentLook'
import {
  shouldResumeIdleSpinAfterControlsEnd,
  shouldResumeIdleSpinOnMenuOrExitView,
} from './idleSpin'
import {
  ANKLE_CONTEXT_BONES,
  ANKLE_FRAME_MESHES,
  ANKLE_LIGAMENT_MESHES,
  RIGHT_FOOT_BONES,
  classifyAnkleMesh,
  type AnkleEmphasis,
  type AnkleHit,
} from '../data/ankleSprain'

const _segV = new THREE.Vector3()
const _segW = new THREE.Vector3()
const _segOnRay = new THREE.Vector3()
const _segOnEdge = new THREE.Vector3()

/** Closest gap between a ray and a segment. `along` is negative when that point is behind the camera. */
function raySegmentGap(ray: THREE.Ray, p: THREE.Vector3, q: THREE.Vector3): { radial: number; along: number } {
  const dir = ray.direction
  const edge = _segV.subVectors(q, p)
  const w0 = _segW.subVectors(ray.origin, p)
  const b = dir.dot(edge)
  const c = edge.dot(edge)
  const d = dir.dot(w0)
  const e = edge.dot(w0)
  const denom = c - b * b
  let along: number
  let t: number
  if (denom < 1e-8) {
    along = 0
    t = c > 1e-8 ? e / c : 0
  } else {
    along = (b * e - c * d) / denom
    t = (e - b * d) / denom
    if (along < 0) {
      along = 0
      t = c > 1e-8 ? e / c : 0
    }
  }
  if (t < 0) {
    t = 0
    along = -d
  } else if (t > 1) {
    t = 1
    along = b - d
  }
  _segOnRay.copy(ray.origin).addScaledVector(dir, Math.max(along, 0))
  _segOnEdge.copy(p).addScaledVector(edge, t)
  return { radial: _segOnRay.distanceTo(_segOnEdge), along }
}

export type ViewSubjectFilter = 'both' | 'bones' | 'muscles'
export type MaterialLook = 'xray' | 'solid'

const GHOST = {
  color: 0xc8ddf5,
  emissive: 0x5b8ec4,
  emissiveIntensity: 0.45,
  opacity: 0.34,
  metalness: 0.08,
  roughness: 0.42,
}

/** Translucent context so the quiz target bone stays clear. */
const BONE_CONTEXT_FADE = {
  color: 0xe9dcc8,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 0.16,
  metalness: 0.04,
  roughness: 0.62,
}

const BONE_CONTEXT_FADE_XRAY = {
  color: 0xc8ddf5,
  emissive: 0x5b8ec4,
  emissiveIntensity: 0.2,
  opacity: 0.12,
  metalness: 0.08,
  roughness: 0.42,
}

const TARGET = {
  color: 0xffffff,
  emissive: 0xe8f0ff,
  emissiveIntensity: 0.55,
  opacity: 1,
  metalness: 0.1,
  roughness: 0.35,
}

const CARTILAGE = {
  color: 0x9ec4e8,
  emissive: 0x3a6088,
  emissiveIntensity: 0.2,
  opacity: 0.18,
  metalness: 0.0,
  roughness: 0.6,
}

const MUSCLE_GHOST = {
  color: 0xb04e54,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 1,
  metalness: 0.02,
  roughness: 0.72,
}

/** Translucent context so the quiz target muscle stays clear. */
const MUSCLE_CONTEXT_FADE = {
  color: 0x8a3a40,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 0.14,
  metalness: 0.02,
  roughness: 0.78,
}

const MUSCLE_XRAY = {
  color: 0xd08088,
  emissive: 0x5a2030,
  emissiveIntensity: 0.12,
  opacity: 0.4,
  metalness: 0.04,
  roughness: 0.58,
}

const MUSCLE_TARGET = {
  color: 0xf3b4b8,
  emissive: 0x5a181c,
  emissiveIntensity: 0.2,
  opacity: 1,
  metalness: 0.03,
  roughness: 0.55,
}

/** Warm bone underlay in muscle quiz — not the cyan ghost used in bone quiz. */
const BONE_UNDER_MUSCLE = {
  color: 0xe9dcc8,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 1,
  metalness: 0.04,
  roughness: 0.62,
}

const BONE_UNDER_MUSCLE_FADE = {
  color: 0xe9dcc8,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 0.2,
  metalness: 0.04,
  roughness: 0.62,
}

/** Opaque study-model look for View mode (not the quiz X-ray / ghost palette). */
const VIEW_BONE = {
  color: 0xe9dcc8,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 1,
  roughness: 0.62,
  metalness: 0.04,
}
const VIEW_BONE_SELECTED = {
  color: 0xfff1e0,
  emissive: 0x5a3a18,
  emissiveIntensity: 0.16,
  opacity: 1,
  roughness: 0.52,
  metalness: 0.05,
}
const VIEW_MUSCLE = {
  color: 0xa34448,
  emissive: 0x000000,
  emissiveIntensity: 0,
  opacity: 1,
  roughness: 0.72,
  metalness: 0.02,
}
const VIEW_MUSCLE_SELECTED = {
  color: 0xc45a5e,
  emissive: 0x4a1014,
  emissiveIntensity: 0.18,
  opacity: 1,
  roughness: 0.62,
  metalness: 0.03,
}
const VIEW_CARTILAGE = {
  color: 0xb7d0dc,
  emissive: 0x1a3040,
  emissiveIntensity: 0.05,
  roughness: 0.48,
  metalness: 0.03,
  opacity: 0.78,
}
const VIEW_CARTILAGE_SELECTED = {
  color: 0xcde6f0,
  emissive: 0x2a5068,
  emissiveIntensity: 0.18,
  roughness: 0.42,
  metalness: 0.04,
  opacity: 0.92,
}
const VIEW_DIM_OPACITY_BONE = 0.13
const VIEW_DIM_OPACITY_MUSCLE = 0.1
/** Non-target muscles that sit in front of the quiz target. Low enough that a solid target still reads. */
const OCCLUDER_OPACITY = 0.03

/** Ignore contralateral hits and stop once the ray has gone this far past the first hit. */
const PICK_MAX_DEPTH = 0.5
/** Floor for tight framing of small parts (hand bones, cervical vertebrae). */
const VIEW_MIN_DISTANCE = 0.28
const DEFAULT_MIN_DISTANCE = 0.8
/**
 * View selection samples a disc around the target. A thin curved muscle's
 * box diagonal is a poor radius for that disc (the samples miss the belly),
 * so the disc uses half the longest side, and at least this span.
 */
const VIEW_PICK_MIN_SPAN = 0.4

/** BodyParts3D pack is Z-up (cranial +Z). This Euler maps cranial → +Y, anterior → +Z. */
export const UPRIGHT_EULER = { x: -Math.PI / 2, y: 0, z: 0 }

const ZERO_INSETS: FramingInsets = { top: 0, right: 0, bottom: 0, left: 0 }

export type FramingReport = {
  viewId: string
  distance: number
  offsetX: number
  offsetY: number
  occluderCount: number
  spinning: boolean
  yaw: number
  framingEnabled: boolean
  camera: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  insets: FramingInsets
  /** Projected box vs the visible band, on the tighter axis. About 62 is the aim. */
  fillPct: number
}

export type ThoraxSceneOptions = {
  mainCanvas: HTMLCanvasElement
  sideCanvases?: HTMLCanvasElement[]
}

export type MeshKind = 'bone' | 'muscle' | 'cartilage' | 'ligament'

export type ViewPickHit = {
  meshName: string
  kind: MeshKind
  distance: number
}

/** Left / right from the mesh filename; vertebrae and unpaired bones are midline. */
async function fetchManifest(manifestPath: string): Promise<string[]> {
  try {
    const res = await fetch(assetUrl(manifestPath))
    if (!res.ok) return []
    const urls = (await res.json()) as unknown
    if (!Array.isArray(urls)) return []
    return urls.filter((u): u is string => typeof u === 'string').map((u) => assetUrl(u))
  } catch {
    return []
  }
}

function meshPickSide(name: string): 'l' | 'r' | null {
  if (name.startsWith('vertebra_')) return null
  if (/_l\d+$/.test(name) || name.endsWith('_l')) return 'l'
  if (/_r\d+$/.test(name) || name.endsWith('_r')) return 'r'
  return null
}

export class ThoraxScene {
  readonly mainCanvas: HTMLCanvasElement
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  /** Spins around world +Y only */
  private spin = new THREE.Group()
  /** Holds meshes; carries deterministic upright Euler + centering */
  private body = new THREE.Group()
  private meshByName = new Map<string, THREE.Mesh>()
  private materials = new Map<string, THREE.MeshStandardMaterial>()
  /** 'bone' | 'muscle' | 'cartilage' | 'ligament' per mesh name */
  private kindByName = new Map<string, MeshKind>()
  private ankleCase = false
  private anklePivot: THREE.Group | null = null
  private ankleHomes: Array<{ mesh: THREE.Mesh; parent: THREE.Object3D }> = []
  private ankleMotion: { t: number; duration: number; playing: boolean } | null = null
  private ankleEmphasis: AnkleEmphasis = 'none'
  private ankleLigamentsVisible = true
  private ligamentsLoaded = false
  private ligamentsLoading: Promise<void> | null = null
  private ligamentsInflated = false
  private ankleLabelsWanted = false
  private ankleLabelGroup = new THREE.Group()
  private targetIds = new Set<string>()
  private subject: 'bones' | 'muscles' = 'bones'
  private spinning = true
  private look: MaterialLook = 'solid'
  private disposed = false
  private sideViews: Array<{
    canvas: HTMLCanvasElement
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
  }> = []
  private clock = new THREE.Clock()
  private fitRadius = 1
  private focusTarget = new THREE.Vector3()
  private focusDist = 6
  /** Last applied upright rotation (for reporting) */
  lastUprightEuler = { ...UPRIGHT_EULER }
  lastBboxSize = new THREE.Vector3()

  private hemiLight: THREE.HemisphereLight
  private keyLight: THREE.DirectionalLight
  private fillLight: THREE.DirectionalLight
  private rimLight: THREE.DirectionalLight
  private bounceLight: THREE.DirectionalLight
  private quizFog: THREE.Fog
  private labelRenderer: CSS2DRenderer
  private markerGroup = new THREE.Group()
  private viewMode = false
  private viewSelected = new Set<string>()
  private viewSubjectFilter: ViewSubjectFilter = 'both'
  private muscleLayerFilter: MuscleLayerFilter = 'all'
  private cartilageVisible = true
  private raycaster = new THREE.Raycaster()
  private pointerNdc = new THREE.Vector2()
  private _scratchA = new THREE.Vector3()
  private _scratchB = new THREE.Vector3()
  private viewFrame: {
    startTarget: THREE.Vector3
    endTarget: THREE.Vector3
    startPos: THREE.Vector3
    endPos: THREE.Vector3
    elapsed: number
    duration: number
  } | null = null
  /** CSS-pixel canvas size. View offset and fit distance are in this space. */
  private viewWidth = 1
  private viewHeight = 1
  private framingEnabled = false
  private framingTarget: FramingInsets = { top: 0, right: 0, bottom: 0, left: 0 }
  private framingCurrent: FramingInsets = { top: 0, right: 0, bottom: 0, left: 0 }
  /** World AABB of that part. Null when the camera is on the whole body. */
  private framedBox: THREE.Box3 | null = null
  private framedExtents: ViewExtents | null = null
  private occluderIds = new Set<string>()
  private lastViewId = 'anterior'
  /** Catalog face for the current target. Distance refits do not change it. */
  private catalogView: AnatomicalView = 'anterior'
  /** A newer target cancels a framing retry that is still waiting on matrices. */
  private frameToken = 0
  private framePending = false
  private userOrbiting = false
  private holdUserOrbit = false
  private pendingRefit = false

  constructor(opts: ThoraxSceneOptions) {
    this.mainCanvas = opts.mainCanvas
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0b1220)
    this.quizFog = new THREE.Fog(0x0b1220, 10, 36)
    this.scene.fog = this.quizFog

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.05, 200)
    this.camera.up.set(0, 1, 0)
    this.camera.position.set(0, 1, 8)

    this.renderer = new THREE.WebGLRenderer({
      canvas: opts.mainCanvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.15

    this.controls = new OrbitControls(this.camera, this.mainCanvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.enablePan = false
    this.controls.screenSpacePanning = true
    this.controls.minDistance = DEFAULT_MIN_DISTANCE
    this.controls.maxDistance = 24
    // Keep orbit pole = world up
    this.controls.minPolarAngle = 0.15
    this.controls.maxPolarAngle = Math.PI - 0.15
    this.controls.addEventListener('start', () => {
      this.spinning = false
      this.userOrbiting = true
      this.holdUserOrbit = true
      this.cancelViewFrame()
    })
    this.controls.addEventListener('end', () => {
      this.userOrbiting = false
      if (this.pendingRefit) {
        this.pendingRefit = false
        this.refitFramedDistance()
      }
      window.setTimeout(() => {
        this.resumeIdleSpinAfterControlsEnd()
      }, 1800)
    })

    this.hemiLight = new THREE.HemisphereLight(0xcfe4ff, 0x1a2030, 1.1)
    this.scene.add(this.hemiLight)
    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.25)
    this.keyLight.position.set(3, 8, 5)
    this.scene.add(this.keyLight)
    this.fillLight = new THREE.DirectionalLight(0x88aacc, 0.5)
    this.fillLight.position.set(-5, 2, -3)
    this.scene.add(this.fillLight)
    this.rimLight = new THREE.DirectionalLight(0xaaccff, 0.35)
    this.rimLight.position.set(0, 2, -8)
    this.scene.add(this.rimLight)
    this.bounceLight = new THREE.DirectionalLight(0xf0e0c8, 0)
    this.bounceLight.position.set(0, -6, 2)
    this.scene.add(this.bounceLight)

    this.spin.name = 'spinY'
    this.body.name = 'bodyUpright'
    this.spin.add(this.body)
    this.scene.add(this.spin)
    this.markerGroup.name = 'viewMarkers'
    this.scene.add(this.markerGroup)
    this.ankleLabelGroup.name = 'ankleLigamentLabels'
    this.scene.add(this.ankleLabelGroup)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.domElement.className = 'label-layer'
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    this.mainCanvas.parentElement?.appendChild(this.labelRenderer.domElement)

    if (opts.sideCanvases) {
      for (const canvas of opts.sideCanvases) {
        const r = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        })
        r.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        r.setClearColor(0x000000, 0)
        r.outputColorSpace = THREE.SRGBColorSpace
        const cam = new THREE.PerspectiveCamera(32, 1, 0.05, 200)
        cam.up.set(0, 1, 0)
        this.sideViews.push({ canvas, renderer: r, camera: cam })
      }
    }

    this.resize()
    window.addEventListener('resize', this.resize)
    this.animate()
  }

  /**
   * Load unified BodyParts3D extras (same Z-up frame) from /models/extra/manifest.json,
   * then apply UPRIGHT_EULER (−π/2 X). Includes full rib cage (ribs 1–12 L/R) sourced
   * from isa_BP3D_4.0_obj_99 OBJs. AngiView thorax.glb is NOT composited — Y-up/recentered.
   */
  private musclesLoaded = false
  private musclesLoading: Promise<void> | null = null
  private muscleUrls: string[] = []
  private cartilageUrls: string[] = []

  async load(_ignoredThoraxUrl?: string): Promise<void> {
    const loader = new GLTFLoader()
    this.body.clear()
    this.meshByName.clear()
    this.materials.clear()
    this.kindByName.clear()
    this.musclesLoaded = false

    // thorax.glb and spine-360.glb are not in these manifests and are not fetched.
    const [boneUrls, muscleUrls, cartilageUrls] = await Promise.all([
      fetchManifest('models/extra/manifest.json'),
      fetchManifest('models/extra/muscles/manifest.json'),
      fetchManifest('models/extra/cartilage/manifest.json'),
    ])
    this.muscleUrls = muscleUrls
    this.cartilageUrls = cartilageUrls

    if (boneUrls.length === 0) {
      throw new Error('No skeleton meshes in /models/extra/manifest.json')
    }

    await this.loadGroup(loader, boneUrls, 'bone', 'bones', 'bones')
    if (this.cartilageUrls.length > 0) {
      await this.loadGroup(loader, this.cartilageUrls, 'cartilage', 'cartilage', 'bones')
    }

    this.applyDeterministicUpright()
    this.setSubject('bones')
    this.frameFullBody()
    this.updateSideCameras()

    console.info(
      '[skeleton] bones ready',
      this.meshByName.size,
      'upright deg',
      {
        x: (this.lastUprightEuler.x * 180) / Math.PI,
        y: (this.lastUprightEuler.y * 180) / Math.PI,
        z: (this.lastUprightEuler.z * 180) / Math.PI,
      },
      'bbox',
      this.lastBboxSize.toArray().map((v) => +v.toFixed(3)),
    )

    // Warm muscles in background (non-blocking)
    void this.ensureMusclesLoaded()
  }

  /**
   * Parse one original GLB buffer (from a pack slice or its own file).
   * Names come from the filename, same as before. Geometry is not rewritten.
   */
  private async ingestGlb(
    loader: GLTFLoader,
    url: string,
    data: ArrayBuffer,
    kind: MeshKind,
  ): Promise<void> {
    const base = url.split('/').pop()?.replace(/\.glb$/i, '') || ''
    const gltf = await loader.parseAsync(data, '')
    gltf.scene.traverse((o) => {
      if (o instanceof THREE.Mesh && base) {
        o.name = base
        ;(o.userData as { kind?: string }).kind = kind
      }
    })
    this.ingestModel(gltf.scene, kind)
    this.body.add(gltf.scene)
    if (kind === 'muscle') {
      gltf.scene.traverse((o) => {
        if (o instanceof THREE.Mesh) o.visible = this.viewMode || this.subject === 'muscles'
      })
    }
  }

  private async loadGroup(
    loader: GLTFLoader,
    urls: readonly string[],
    kind: MeshKind,
    packName: string,
    role: 'bones' | 'muscles',
  ): Promise<void> {
    try {
      await forEachGlb(urls, {
        packName,
        concurrency: glbConcurrency(role),
        onFile: (url, data) => this.ingestGlb(loader, url, data, kind),
      })
    } finally {
      releaseGlbSessionCache()
    }
  }

  /** Lazy-load muscle meshes (called on subject switch or in background). */
  async ensureMusclesLoaded(): Promise<void> {
    if (this.musclesLoaded) return
    if (this.musclesLoading) return this.musclesLoading
    if (this.muscleUrls.length === 0) {
      this.musclesLoaded = true
      return
    }
    this.musclesLoading = this.loadMusclesInternal()
    await this.musclesLoading
  }

  private async loadMusclesInternal(): Promise<void> {
    const loader = new GLTFLoader()
    await this.loadGroup(loader, this.muscleUrls, 'muscle', 'muscles', 'muscles')
    // Re-center once so muscle extents don't shift upright frame mid-session
    // (muscles sit on same BP3D frame; bbox already dominated by skeleton height)
    this.musclesLoaded = true
    if (this.viewMode) this.applyViewPresentation()
    else this.applySubjectVisibility()
    console.info('[skeleton] muscles ready', [...this.kindByName.values()].filter((k) => k === 'muscle').length)
  }

  private ingestModel(model: THREE.Object3D, kind: MeshKind = 'bone'): void {
    model.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const name = obj.name || obj.parent?.name || ''
      if (!name) return
      obj.geometry.computeVertexNormals()

      const isDiaphragm = name === 'diaphragm'
      const tagged = (obj.userData as { kind?: MeshKind }).kind
      const meshKind: MeshKind =
        kind === 'muscle' || kind === 'cartilage' || kind === 'ligament'
          ? kind
          : tagged === 'muscle' || tagged === 'cartilage' || tagged === 'ligament'
            ? tagged
            : 'bone'
      const base =
        meshKind === 'muscle'
          ? MUSCLE_GHOST
          : meshKind === 'ligament'
            ? LIGAMENT_BASE
            : meshKind === 'cartilage' || isDiaphragm
              ? CARTILAGE
              : GHOST
      const muscleOpaque = meshKind === 'muscle' || meshKind === 'ligament'
      const mat = new THREE.MeshStandardMaterial({
        color: base.color,
        emissive: base.emissive,
        emissiveIntensity: base.emissiveIntensity,
        transparent: !muscleOpaque,
        opacity: base.opacity,
        metalness: base.metalness,
        roughness: base.roughness,
        side: THREE.DoubleSide,
        depthWrite: muscleOpaque,
      })
      obj.material = mat
      obj.renderOrder = meshKind === 'muscle' ? 2 : isDiaphragm ? 0 : 1
      if (isDiaphragm) {
        mat.opacity = 0.08
        mat.emissiveIntensity = 0.05
      }
      if (!this.meshByName.has(name)) {
        this.meshByName.set(name, obj)
        this.materials.set(name, mat)
        this.kindByName.set(name, meshKind)
        if (meshKind === 'ligament') {
          obj.visible = false
          mat.polygonOffset = true
          mat.polygonOffsetFactor = -2
          mat.polygonOffsetUnits = -2
        }
      }
    })
  }

  /** Deterministic: BP3D Z-up → Y-up via rotateX(-90°). Verified: Y ≫ X,Z and headY > feetY. */
  private applyDeterministicUpright(): void {
    this.spin.rotation.set(0, 0, 0)
    this.body.position.set(0, 0, 0)
    this.body.scale.set(1, 1, 1)
    this.body.rotation.set(UPRIGHT_EULER.x, UPRIGHT_EULER.y, UPRIGHT_EULER.z)
    this.lastUprightEuler = { ...UPRIGHT_EULER }
    this.body.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(this.body)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    this.lastBboxSize.copy(size)

    // Scale so height ~ 4.2 units, then center at origin
    const targetHeight = 4.2
    const s = targetHeight / Math.max(size.y, 1e-6)
    this.body.scale.setScalar(s)
    this.body.position.set(-center.x * s, -center.y * s, -center.z * s)
    this.body.updateMatrixWorld(true)

    const box2 = new THREE.Box3().setFromObject(this.body)
    this.lastBboxSize.copy(box2.getSize(new THREE.Vector3()))
    this.fitRadius = Math.max(this.lastBboxSize.y * 0.5, 1)

    // Sanity: height must dominate
    if (
      this.lastBboxSize.y < this.lastBboxSize.x * 1.2 ||
      this.lastBboxSize.y < this.lastBboxSize.z * 1.2
    ) {
      console.warn(
        '[skeleton] upright sanity failed — Y not dominant',
        this.lastBboxSize.toArray(),
      )
    }
  }

  private frameFullBody(): void {
    this.cancelViewFrame()
    this.framedBox = null
    this.framedExtents = null
    this.focusTarget.set(0, 0, 0)
    this.focusDist = this.fitRadius / Math.tan((this.camera.fov * Math.PI) / 360) * 1.55
    this.camera.up.set(0, 1, 0)
    this.camera.position.set(this.focusDist * 0.35, this.fitRadius * 0.15, this.focusDist)
    this.camera.near = 0.05
    this.camera.far = 200
    this.camera.updateProjectionMatrix()
    this.controls.target.copy(this.focusTarget)
    this.controls.update()
  }

  setSubject(subject: 'bones' | 'muscles'): void {
    this.subject = subject
    if (subject === 'muscles') {
      void this.ensureMusclesLoaded().then(() => this.applySubjectVisibility())
    }
    this.applySubjectVisibility()
  }

  async setSubjectAsync(subject: 'bones' | 'muscles'): Promise<void> {
    this.subject = subject
    if (subject === 'muscles') await this.ensureMusclesLoaded()
    this.applySubjectVisibility()
  }

  private applyPalette(
    mat: THREE.MeshStandardMaterial,
    pal: {
      color: number
      emissive: number
      emissiveIntensity: number
      opacity: number
      metalness: number
      roughness: number
    },
    opts: { transparent: boolean; depthWrite: boolean },
  ): void {
    mat.color.setHex(pal.color)
    mat.emissive.setHex(pal.emissive)
    mat.emissiveIntensity = pal.emissiveIntensity
    mat.opacity = pal.opacity
    mat.metalness = pal.metalness
    mat.roughness = pal.roughness
    mat.transparent = opts.transparent
    mat.depthWrite = opts.depthWrite
    mat.side = THREE.DoubleSide
    mat.needsUpdate = true
  }

  private applySubjectVisibility(): void {
    if (this.ankleCase) {
      this.applyAnkleLook()
      return
    }
    if (this.viewMode) {
      this.applyViewPresentation()
      return
    }
    const hasTarget = this.targetIds.size > 0
    const solid = this.look === 'solid'
    for (const [name, mat] of this.materials) {
      const kind = this.kindByName.get(name) ?? 'bone'
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      if (kind === 'ligament') {
        mesh.visible = false
        continue
      }
      if (this.subject === 'bones') {
        // Hide muscles entirely in bone mode; keep cartilage as faint rib/disc context
        mesh.visible = kind === 'bone' || kind === 'cartilage'
        if (!mesh.visible) continue
        if (kind === 'cartilage') {
          const pal = solid ? VIEW_CARTILAGE : CARTILAGE
          this.applyPalette(mat, pal, { transparent: true, depthWrite: false })
          if (hasTarget) mat.opacity = Math.min(mat.opacity, 0.08)
          mesh.renderOrder = 1
        } else if (hasTarget && this.targetIds.has(name)) {
          this.applyPalette(mat, TARGET, { transparent: false, depthWrite: true })
          mesh.renderOrder = 10
        } else if (hasTarget) {
          this.applyPalette(mat, solid ? BONE_CONTEXT_FADE : BONE_CONTEXT_FADE_XRAY, {
            transparent: true,
            depthWrite: false,
          })
          if (this.occluderIds.has(name)) mat.opacity = OCCLUDER_OPACITY
          mesh.renderOrder = 1
        } else if (solid) {
          this.applyPalette(mat, VIEW_BONE, { transparent: false, depthWrite: true })
          mesh.renderOrder = 1
        } else {
          this.applyPalette(mat, GHOST, { transparent: true, depthWrite: false })
          mesh.renderOrder = 1
        }
      } else {
        // Muscle quiz / menu: cartilage stays off here (it's a View filter). Hide the diaphragm.
        if (kind === 'cartilage' || name === 'diaphragm') {
          mesh.visible = false
          continue
        }
        if (kind === 'bone') {
          mesh.visible = true
          const pal = hasTarget ? BONE_UNDER_MUSCLE_FADE : (solid ? BONE_UNDER_MUSCLE : GHOST)
          const fade = hasTarget || !solid
          this.applyPalette(mat, pal, { transparent: fade, depthWrite: !fade })
          mesh.renderOrder = 0
          continue
        }
        mesh.visible = true
        if (hasTarget && this.targetIds.has(name)) {
          this.applyPalette(mat, MUSCLE_TARGET, { transparent: false, depthWrite: true })
          mesh.renderOrder = 10
        } else if (hasTarget) {
          this.applyPalette(mat, MUSCLE_CONTEXT_FADE, { transparent: true, depthWrite: false })
          if (this.occluderIds.has(name)) mat.opacity = OCCLUDER_OPACITY
          mesh.renderOrder = 2
        } else if (solid) {
          this.applyPalette(mat, MUSCLE_GHOST, { transparent: false, depthWrite: true })
          mesh.renderOrder = 2
        } else {
          this.applyPalette(mat, MUSCLE_XRAY, { transparent: true, depthWrite: true })
          mesh.renderOrder = 2
        }
      }
    }
  }

  setTarget(meshNames: string[], view: AnatomicalView = 'anterior'): void {
    // Hold yaw at 0 so the catalog direction stays anatomical.
    // Spin stays off for the question so it cannot walk off that angle.
    this.catalogView = view
    this.targetIds = new Set(meshNames)
    this.spinning = false
    this.spin.rotation.y = 0
    this.holdUserOrbit = false
    this.controls.minDistance = VIEW_MIN_DISTANCE
    const token = ++this.frameToken
    this.framePending = true
    this.frameWhenReady(meshNames, view, token, 0, 'quiz')
  }

  /** Drop the quiz highlight without changing the camera. */
  clearTarget(): void {
    this.targetIds = new Set()
    if (!this.viewMode) this.applySubjectVisibility()
  }

  /**
   * Frame only after every named mesh has a world box in body scale.
   * An early box is still in millimetres, or is missing a part, and would
   * aim the camera at the wrong place. The face itself comes from `view`.
   */
  private frameWhenReady(
    meshNames: string[],
    view: AnatomicalView,
    token: number,
    attempt: number,
    mode: 'quiz' | 'view',
  ): void {
    if (token !== this.frameToken || this.disposed) return
    if (mode === 'view' && !this.viewMode) {
      this.framePending = false
      return
    }
    this.spin.rotation.y = 0
    this.body.updateMatrixWorld(true)
    const placed = this.placedMeshes(meshNames)
    const missing = meshNames.length - placed.length
    const unscaled = placed.some((row) => !row.sane)
    if ((missing > 0 || unscaled || placed.length === 0) && attempt < 24) {
      requestAnimationFrame(() => this.frameWhenReady(meshNames, view, token, attempt + 1, mode))
      return
    }
    const usable = placed.filter((row) => row.sane)
    const names = this.oneSideNames(usable.length > 0 ? usable : placed)
    this.frameOnto(names, view, mode, token)
  }

  private placedMeshes(names: string[]): Array<{ name: string; outer: number; sane: boolean }> {
    const out: Array<{ name: string; outer: number; sane: boolean }> = []
    for (const name of names) {
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      mesh.updateWorldMatrix(true, false)
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
      const local = mesh.geometry.boundingBox
      if (!local) continue
      const world = local.clone().applyMatrix4(mesh.matrixWorld)
      const size = world.getSize(this._scratchA)
      const span = size.length()
      const sane = span > 1e-5 && span < 12 && size.x < 8 && size.y < 8 && size.z < 8
      const outer = Math.abs(world.max.x) >= Math.abs(world.min.x) ? world.max.x : world.min.x
      out.push({ name, outer, sane })
    }
    return out
  }

  /**
   * When both sides of a bilateral muscle are loaded, frame the positive-x
   * side plus anything on the midline. The sign comes from the world box,
   * not from the mesh name.
   */
  private oneSideNames(placed: Array<{ name: string; outer: number }>): string[] {
    const positive = placed.filter((row) => row.outer > 0.05)
    const negative = placed.filter((row) => row.outer < -0.05)
    if (positive.length > 0 && negative.length > 0) {
      const mid = placed.filter((row) => Math.abs(row.outer) <= 0.05)
      return [...positive, ...mid].map((row) => row.name)
    }
    return placed.map((row) => row.name)
  }

  private frameOnto(
    meshNames: string[],
    view: AnatomicalView,
    mode: 'quiz' | 'view',
    token: number,
    confirmsLeft = 2,
  ): void {
    this.catalogView = view
    this.body.updateMatrixWorld(true)
    const box = new THREE.Box3()
    const present: string[] = []
    for (const name of meshNames) {
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      mesh.updateWorldMatrix(true, false)
      box.expandByObject(mesh)
      present.push(name)
    }
    if (present.length === 0 || box.isEmpty()) {
      this.framedBox = null
      this.framedExtents = null
      this.occluderIds = new Set()
      this.lastViewId = view
      this.framePending = false
      if (mode === 'quiz') {
        if (!this.ankleCase) this.targetIds = new Set(meshNames)
        this.frameFullBody()
        this.updateSideCameras()
        this.applySubjectVisibility()
      }
      return
    }
    if (mode === 'quiz' && !this.ankleCase) this.targetIds = new Set(present)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const side = sideFromBox(box.min.x, box.max.x)
    const toward = directionFor(view, side)
    const dir = new THREE.Vector3(toward.x, toward.y, toward.z)
    const viewRadius = Math.max(size.x, size.y, size.z, VIEW_PICK_MIN_SPAN) * 0.5
    const scored = this.scoreDirection(center, viewRadius, dir, present)
    this.occluderIds = new Set(scored.occluders)
    this.lastViewId = view
    const dist = this.distanceForBox(box, dir)
    const endPos = center.clone().addScaledVector(dir, dist)
    this.focusTarget.copy(center)
    this.focusDist = dist
    this.framedBox = box.clone()
    this.camera.up.set(0, 1, 0)
    this.controls.minDistance = VIEW_MIN_DISTANCE
    this.startViewPose(center, endPos, mode === 'view' ? 0.5 : 0.46)
    if (mode === 'quiz') this.updateSideCamerasAround(center, dist)
    this.framePending = false
    if (mode === 'quiz') this.applySubjectVisibility()
    else this.applyViewPresentation()
    if (confirmsLeft > 0) this.confirmBox(present, view, mode, token, box, confirmsLeft)
  }

  /** If the world box moves on the next frame, the first one was not final. */
  private confirmBox(
    meshNames: string[],
    view: AnatomicalView,
    mode: 'quiz' | 'view',
    token: number,
    snapshot: THREE.Box3,
    confirmsLeft: number,
  ): void {
    const before = snapshot.clone()
    requestAnimationFrame(() => {
      if (token !== this.frameToken || this.disposed) return
      if (mode === 'view' && !this.viewMode) return
      this.body.updateMatrixWorld(true)
      const again = new THREE.Box3()
      let count = 0
      for (const name of meshNames) {
        const mesh = this.meshByName.get(name)
        if (!mesh) continue
        mesh.updateWorldMatrix(true, false)
        again.expandByObject(mesh)
        count += 1
      }
      if (count === 0 || again.isEmpty()) return
      const a = before.getCenter(new THREE.Vector3())
      const b = again.getCenter(new THREE.Vector3())
      const as = before.getSize(new THREE.Vector3())
      const bs = again.getSize(new THREE.Vector3())
      const moved = a.distanceTo(b) > 0.02 || as.distanceTo(bs) > 0.02
      if (!moved) return
      this.frameOnto(meshNames, view, mode, token, confirmsLeft - 1)
    })
  }

  private updateSideCameras(): void {
    this.updateSideCamerasAround(this.focusTarget, Math.max(this.fitRadius * 2.2, 3))
  }

  private updateSideCamerasAround(center: THREE.Vector3, dist: number): void {
    if (this.sideViews.length === 0) return
    if (this.sideViews[0]) {
      this.sideViews[0].camera.up.set(0, 1, 0)
      this.sideViews[0].camera.position.set(center.x, center.y, center.z + dist)
      this.sideViews[0].camera.lookAt(center)
      this.sideViews[0].camera.updateProjectionMatrix()
    }
    if (this.sideViews[1]) {
      this.sideViews[1].camera.up.set(0, 1, 0)
      this.sideViews[1].camera.position.set(center.x - dist, center.y, center.z)
      this.sideViews[1].camera.lookAt(center)
      this.sideViews[1].camera.updateProjectionMatrix()
    }
  }

  private resize = (): void => {
    const parent = this.mainCanvas.parentElement
    const w = parent?.clientWidth || window.innerWidth
    const h = parent?.clientHeight || window.innerHeight
    this.viewWidth = w
    this.viewHeight = h
    this.camera.aspect = w / Math.max(h, 1)
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
    this.labelRenderer.setSize(w, h)
    this.applyFramingOffset()

    for (const side of this.sideViews) {
      const pw = side.canvas.parentElement?.clientWidth || 120
      const ph = side.canvas.parentElement?.clientHeight || 180
      side.camera.aspect = pw / Math.max(ph, 1)
      side.camera.updateProjectionMatrix()
      side.renderer.setSize(pw, ph, false)
    }
  }

  private animate = (): void => {
    if (this.disposed) return
    requestAnimationFrame(this.animate)
    const dt = this.clock.getDelta()
    if (this.spinning) {
      // World Y only — body upright Euler stays on `body`
      this.spin.rotation.y += dt * 0.22
    }
    this.lerpFramingInsets(dt)
    this.tickViewFrame(dt)
    this.tickAnkleMotion(dt)
    this.controls.update()
    this.applyFramingOffset()
    this.renderer.render(this.scene, this.camera)
    this.labelRenderer.render(this.scene, this.camera)
    for (const side of this.sideViews) {
      side.renderer.render(this.scene, side.camera)
    }
  }

  /** QA helper: stop spin, yaw=0, camera on +Z looking at upright body */
  freezeUprightProof(): void {
    this.spinning = false
    this.spin.rotation.y = 0
    this.frameFullBody()
    this.camera.up.set(0, 1, 0)
    this.camera.position.set(0, this.fitRadius * 0.05, this.focusDist * 1.05)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
    this.updateSideCamerasAround(new THREE.Vector3(0, 0, 0), this.focusDist * 0.9)
  }

  /** Menu / idle: show full upright body and resume slow spin. */
  showMenuView(): void {
    this.controls.minDistance = DEFAULT_MIN_DISTANCE
    this.frameFullBody()
    this.spinning = shouldResumeIdleSpinOnMenuOrExitView({ ankleCase: this.ankleCase })
  }

  listMeshNames(): string[] {
    return [...this.meshByName.keys()].sort()
  }


  isViewMode(): boolean {
    return this.viewMode
  }

  async enterView(): Promise<void> {
    this.viewMode = true
    this.spinning = false
    this.spin.rotation.y = 0
    this.controls.minDistance = VIEW_MIN_DISTANCE
    this.viewSelected.clear()
    this.clearViewMarkers()
    this.controls.enablePan = true
    this.controls.screenSpacePanning = true
    this.applyViewLighting(this.look === 'solid')
    await this.ensureMusclesLoaded()
    if (!this.viewMode || this.disposed) return
    this.applyViewPresentation()
    this.frameFullBody()
  }

  exitView(): void {
    if (!this.viewMode) return
    this.viewMode = false
    this.framedBox = null
    this.framedExtents = null
    this.cancelViewFrame()
    this.controls.enablePan = false
    this.controls.minDistance = DEFAULT_MIN_DISTANCE
    this.viewSelected.clear()
    this.clearViewMarkers()
    this.applyViewLighting(this.look === 'solid')
    this.spinning = shouldResumeIdleSpinOnMenuOrExitView({ ankleCase: this.ankleCase })
    this.applySubjectVisibility()
  }

  clearViewSelection(): void {
    this.setViewSelection(null)
  }

  /**
   * Highlight the given meshes in View mode. Pass null (or []) to clear.
   * For a muscle, also pass authored attachment sites so origin/insertion
   * pins can be placed at nearest points on the relevant meshes.
   */
  setViewSelection(meshNames: string[] | null, attachments?: ViewAttachmentSite[]): void {
    this.viewSelected = new Set(meshNames ?? [])
    this.clearViewMarkers()
    if (!this.viewMode) return
    this.applyViewPresentation()
    if (this.viewSelected.size > 0 && attachments && attachments.length > 0) {
      this.placeAttachmentMarkers(attachments)
    }
  }

  /**
   * Frontmost pickable structure under the pointer. Prefer {@link pickAllAt}
   * in View so the caller can cycle through a depth stack.
   */
  pickAt(clientX: number, clientY: number): ViewPickHit | null {
    return this.pickAllAt(clientX, clientY)[0] ?? null
  }

  /**
   * Unique pickable structures along the ray, front to back.
   * Skips markers and the diaphragm. Cartilage is pickable. Includes dim /
   * ghosted meshes after isolation so a covered muscle can be cycled to — the old
   * peek-through bone preference is intentionally gone.
   * Contralateral meshes are skipped so a chest or flank tap does not grab
   * the far wall, but ipsilateral and midline hits continue through an
   * empty cavity (psoas behind the abdominal wall, spine behind the chest).
   */
  pickAllAt(clientX: number, clientY: number): ViewPickHit[] {
    const rect = this.mainCanvas.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return []
    this.pointerNdc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(this.pointerNdc, this.camera)
    const targets: THREE.Object3D[] = []
    for (const mesh of this.meshByName.values()) {
      if (mesh.visible) targets.push(mesh)
    }
    const hits = this.raycaster.intersectObjects(targets, false)
    const unique: ViewPickHit[] = []
    const seen = new Set<string>()
    for (const hit of hits) {
      const obj = hit.object
      if (!(obj instanceof THREE.Mesh)) continue
      if ((obj.userData as { isViewMarker?: boolean }).isViewMarker) continue
      const name = obj.name
      if (!name || seen.has(name)) continue
      if (name === 'diaphragm') continue
      const kind = this.kindByName.get(name)
      if (kind !== 'bone' && kind !== 'muscle' && kind !== 'cartilage') continue
      seen.add(name)
      unique.push({ meshName: name, kind, distance: hit.distance })
    }
    if (unique.length === 0) return []
    const first = unique[0]!
    const side = meshPickSide(first.meshName)
    const stack: ViewPickHit[] = [first]
    for (let i = 1; i < unique.length; i++) {
      const next = unique[i]!
      if (next.distance - first.distance > PICK_MAX_DEPTH) break
      const nextSide = meshPickSide(next.meshName)
      if (side && nextSide && nextSide !== side) continue
      stack.push(next)
    }
    return stack
  }

  /**
   * Ease onto the selected meshes in View, from the catalog face.
   * Distance fits the band above or beside the study panel.
   */
  frameViewSelection(meshNames: string[], view: AnatomicalView = 'anterior'): void {
    if (!this.viewMode || meshNames.length === 0) return
    this.catalogView = view
    this.holdUserOrbit = false
    const token = ++this.frameToken
    this.framePending = true
    this.frameWhenReady(meshNames, view, token, 0, 'view')
  }

  private cancelViewFrame(): void {
    this.viewFrame = null
  }

  private tickViewFrame(dt: number): void {
    const frame = this.viewFrame
    if (!frame) return
    frame.elapsed += dt
    const u = Math.min(1, frame.elapsed / frame.duration)
    const e = u * u * (3 - 2 * u)
    this.controls.target.lerpVectors(frame.startTarget, frame.endTarget, e)
    this.camera.position.lerpVectors(frame.startPos, frame.endPos, e)
    this.camera.up.set(0, 1, 0)
    if (u >= 1) this.viewFrame = null
  }

  private applyViewLighting(on: boolean): void {
    if (on) {
      this.scene.background = new THREE.Color(0x10141c)
      this.scene.fog = null
      this.hemiLight.color.setHex(0xf2ece4)
      this.hemiLight.groundColor.setHex(0x2a241c)
      this.hemiLight.intensity = 0.95
      this.keyLight.color.setHex(0xfff6ea)
      this.keyLight.intensity = 1.45
      this.keyLight.position.set(4.2, 7.2, 5.5)
      this.fillLight.color.setHex(0xb8c4d4)
      this.fillLight.intensity = 0.62
      this.fillLight.position.set(-5.5, 3, -2)
      this.rimLight.color.setHex(0xd8e4f4)
      this.rimLight.intensity = 0.48
      this.rimLight.position.set(-1, 3.5, -8)
      this.bounceLight.intensity = 0.28
      this.renderer.toneMappingExposure = 1.05
    } else {
      this.scene.background = new THREE.Color(0x0b1220)
      this.scene.fog = this.quizFog
      this.hemiLight.color.setHex(0xcfe4ff)
      this.hemiLight.groundColor.setHex(0x1a2030)
      this.hemiLight.intensity = 1.1
      this.keyLight.color.setHex(0xffffff)
      this.keyLight.intensity = 1.25
      this.keyLight.position.set(3, 8, 5)
      this.fillLight.color.setHex(0x88aacc)
      this.fillLight.intensity = 0.5
      this.fillLight.position.set(-5, 2, -3)
      this.rimLight.color.setHex(0xaaccff)
      this.rimLight.intensity = 0.35
      this.rimLight.position.set(0, 2, -8)
      this.bounceLight.intensity = 0
      this.renderer.toneMappingExposure = 1.15
    }
  }

  setViewDisplay(opts: {
    subjectFilter?: ViewSubjectFilter
    muscleLayer?: MuscleLayerFilter
    cartilageVisible?: boolean
  }): void {
    if (opts.subjectFilter) this.viewSubjectFilter = opts.subjectFilter
    if (opts.muscleLayer) this.muscleLayerFilter = opts.muscleLayer
    if (opts.cartilageVisible !== undefined) this.cartilageVisible = opts.cartilageVisible
    if (this.viewMode) this.applyViewPresentation()
  }

  setLook(look: MaterialLook): void {
    this.look = look
    this.applyViewLighting(look === 'solid')
    if (this.viewMode) this.applyViewPresentation()
    else this.applySubjectVisibility()
  }

  getLook(): MaterialLook {
    return this.look
  }

  isCartilageVisible(): boolean {
    return this.cartilageVisible
  }

  getViewSubjectFilter(): ViewSubjectFilter {
    return this.viewSubjectFilter
  }

  getMuscleLayerFilter(): MuscleLayerFilter {
    return this.muscleLayerFilter
  }

  /** True if at least one currently selected mesh is still visible. */
  viewSelectionVisible(): boolean {
    if (this.viewSelected.size === 0) return true
    for (const name of this.viewSelected) {
      const mesh = this.meshByName.get(name)
      if (mesh?.visible) return true
    }
    return false
  }

  private meshShownInView(name: string, kind: MeshKind): boolean {
    if (kind === 'cartilage') return this.cartilageVisible
    if (kind === 'bone') return this.viewSubjectFilter !== 'muscles'
    if (this.viewSubjectFilter === 'bones') return false
    return muscleVisibleAtLayer(name, this.muscleLayerFilter)
  }

  private applyViewPresentation(): void {
    if (this.ankleCase) {
      this.applyAnkleLook()
      return
    }
    const hasSel = this.viewSelected.size > 0
    for (const [name, mat] of this.materials) {
      const kind = this.kindByName.get(name) ?? 'bone'
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      const isCartilage = kind === 'cartilage'
      const isDiaphragm = name === 'diaphragm'
      const selected = hasSel && this.viewSelected.has(name)

      if (kind === 'ligament') {
        mesh.visible = false
        continue
      }

      if (isDiaphragm) {
        const shown = this.viewSubjectFilter !== 'muscles'
        mesh.visible = shown
        mat.color.setHex(0x8a6a6a)
        mat.emissive.setHex(0x000000)
        mat.emissiveIntensity = 0
        mat.transparent = true
        mat.opacity = hasSel ? 0.04 : 0.14
        mat.depthWrite = false
        mat.roughness = 0.8
        mat.metalness = 0
        mesh.renderOrder = 0
        mat.needsUpdate = true
        continue
      }

      const shown = this.meshShownInView(name, kind)
      mesh.visible = shown
      if (!shown) {
        mat.needsUpdate = true
        continue
      }
      const dim = hasSel && !selected

      if (this.look === 'xray') {
        if (kind === 'muscle') {
          this.applyPalette(mat, selected ? MUSCLE_TARGET : MUSCLE_XRAY, {
            transparent: !selected,
            depthWrite: selected,
          })
          if (dim) {
            mat.opacity = this.fadedOpacity(name, VIEW_DIM_OPACITY_MUSCLE)
            mat.transparent = true
            mat.depthWrite = false
          }
          mesh.renderOrder = selected ? 10 : 2
        } else if (isCartilage) {
          this.applyPalette(mat, selected ? VIEW_CARTILAGE_SELECTED : CARTILAGE, {
            transparent: true,
            depthWrite: selected,
          })
          if (dim) mat.opacity = this.fadedOpacity(name, 0.06)
          mesh.renderOrder = selected ? 10 : 1
        } else {
          this.applyPalette(mat, selected ? TARGET : GHOST, {
            transparent: !selected,
            depthWrite: selected,
          })
          if (dim) {
            mat.opacity = this.fadedOpacity(name, VIEW_DIM_OPACITY_BONE)
            mat.transparent = true
            mat.depthWrite = false
          }
          mesh.renderOrder = selected ? 10 : 1
        }
        mat.needsUpdate = true
        continue
      }

      if (kind === 'muscle') {
        const pal = selected ? VIEW_MUSCLE_SELECTED : VIEW_MUSCLE
        mat.color.setHex(pal.color)
        mat.emissive.setHex(pal.emissive)
        mat.emissiveIntensity = pal.emissiveIntensity
        mat.roughness = pal.roughness
        mat.metalness = pal.metalness
        mat.transparent = dim
        mat.opacity = dim ? this.fadedOpacity(name, VIEW_DIM_OPACITY_MUSCLE) : 1
        mat.depthWrite = !dim
        mesh.renderOrder = selected ? 10 : 2
      } else if (isCartilage) {
        const pal = selected ? VIEW_CARTILAGE_SELECTED : VIEW_CARTILAGE
        mat.color.setHex(pal.color)
        mat.emissive.setHex(pal.emissive)
        mat.emissiveIntensity = pal.emissiveIntensity
        mat.roughness = pal.roughness
        mat.metalness = pal.metalness
        mat.transparent = true
        mat.opacity = dim ? this.fadedOpacity(name, 0.06) : pal.opacity
        mat.depthWrite = selected || !dim
        mesh.renderOrder = selected ? 10 : 1
      } else {
        const pal = selected ? VIEW_BONE_SELECTED : VIEW_BONE
        mat.color.setHex(pal.color)
        mat.emissive.setHex(pal.emissive)
        mat.emissiveIntensity = pal.emissiveIntensity
        mat.roughness = pal.roughness
        mat.metalness = pal.metalness
        mat.transparent = dim
        mat.opacity = dim ? this.fadedOpacity(name, VIEW_DIM_OPACITY_BONE) : 1
        mat.depthWrite = !dim
        mesh.renderOrder = selected ? 10 : 1
      }
      mat.needsUpdate = true
    }
  }

  private clearViewMarkers(): void {
    const remove: CSS2DObject[] = []
    this.markerGroup.traverse((o) => {
      if (o instanceof CSS2DObject) remove.push(o)
    })
    for (const o of remove) {
      o.parent?.remove(o)
      o.element.remove()
    }
    while (this.markerGroup.children.length > 0) {
      const child = this.markerGroup.children[0]!
      this.markerGroup.remove(child)
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        const mat = child.material
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else mat.dispose()
      }
    }
  }

  private placeAttachmentMarkers(sites: ViewAttachmentSite[]): void {
    this.body.updateMatrixWorld(true)
    const placed: {
      point: THREE.Vector3
      outward: THREE.Vector3
      kind: 'origin' | 'insertion'
      label: string
    }[] = []
    for (const site of sites) {
      const hit = this.nearestAttachmentPoint(site.muscleMeshes, site.boneMeshes, site.prefer)
      if (!hit) {
        console.warn('[view] no attachment point for', site.label, site.muscleMeshes, site.boneMeshes)
        continue
      }
      placed.push({ point: hit.point, outward: hit.outward, kind: site.kind, label: site.label })
    }
    // Origin and insertion often land on nearly the same screen point
    // (gluteus maximus: sacrum over femur). Shift the origin up and toward
    // the midline, and the insertion down and outward, so the pills clear.
    const nudged = new Set<number>()
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        const a = placed[i]!
        const b = placed[j]!
        if (a.kind === b.kind || nudged.has(i) || nudged.has(j)) continue
        if (a.point.distanceTo(b.point) > 0.35) continue
        const origin = a.kind === 'origin' ? a : b
        const insertion = a.kind === 'insertion' ? a : b
        const side = Math.sign(origin.point.x || insertion.point.x) || 1
        origin.point.y += 0.08
        origin.point.x -= side * 0.06
        insertion.point.y -= 0.12
        insertion.point.x += side * 0.1
        nudged.add(i)
        nudged.add(j)
      }
    }
    for (const pin of placed) this.addMarker(pin.point, pin.outward, pin.kind, pin.label)
  }

  /**
   * Sample vertices on the named muscle and bone meshes and return the
   * closest pair. The pin sits on the bone surface, nudged slightly toward
   * the muscle so it is not buried. This is a nearest-point approximation
   * on these BodyParts3D meshes, not a clinical landmark coordinate.
   */
  private nearestAttachmentPoint(
    muscleNames: string[],
    boneNames: string[],
    prefer?: ViewPrefer,
  ): { point: THREE.Vector3; outward: THREE.Vector3 } | null {
    const musclePts = this.sampleMeshes(muscleNames, 2200)
    const bonePts = this.sampleMeshes(boneNames, 2200)
    if (musclePts.length === 0 && bonePts.length === 0) return null

    // Prefer the closest muscle–bone pair. If only one set exists, fall
    // back to that set's centroid (should almost never happen if names are right).
    if (musclePts.length > 0 && bonePts.length > 0) {
      let bestD = Infinity
      const muscleOf: THREE.Vector3[] = new Array(bonePts.length)
      const distOf = new Float64Array(bonePts.length)
      distOf.fill(Infinity)
      for (const m of musclePts) {
        for (let i = 0; i < bonePts.length; i++) {
          const d = m.distanceToSquared(bonePts[i]!)
          if (d < distOf[i]!) {
            distOf[i] = d
            muscleOf[i] = m
          }
          if (d < bestD) bestD = d
        }
      }
      // Among bone vertices nearly as close as the nearest pair, honour an
      // authored anatomical direction (e.g. cranial end of the patella).
      // Threshold is in world units (body height ≈ 4.2 ≈ 1.7 m).
      const margin = Math.max(bestD, 0.018 * 0.018) // ≥ ~18 mm in model scale, or the nearest gap
      const thresh = bestD + margin
      let bestB = bonePts[0]!
      let bestM = muscleOf[0] ?? musclePts[0]!
      let bestScore = -Infinity
      for (let i = 0; i < bonePts.length; i++) {
        if (distOf[i]! > thresh) continue
        const b = bonePts[i]!
        const score = prefer ? this.preferScore(b, prefer) : -distOf[i]!
        if (score > bestScore) {
          bestScore = score
          bestB = b
          bestM = muscleOf[i] ?? bestM
        }
      }
      const outward = this._scratchA.copy(bestM).sub(bestB)
      if (outward.lengthSq() < 1e-8) outward.set(0, 1, 0)
      else outward.normalize()
      const point = bestB.clone().addScaledVector(outward, 0.028)
      return { point, outward: outward.clone() }
    }

    const pts = musclePts.length > 0 ? musclePts : bonePts
    const acc = this._scratchA.set(0, 0, 0)
    for (const q of pts) acc.add(q)
    acc.divideScalar(pts.length)
    // Use the vertex farthest from the centroid in a direction away from
    // the body centre as a last-resort surface point — not a landmark.
    let best = pts[0]!
    let bestD = -1
    for (const q of pts) {
      const d = q.distanceToSquared(acc)
      if (d > bestD) {
        bestD = d
        best = q
      }
    }
    const outward = this._scratchB.copy(best).sub(acc)
    if (outward.lengthSq() < 1e-8) outward.set(0, 1, 0)
    else outward.normalize()
    return { point: best.clone().addScaledVector(outward, 0.028), outward: outward.clone() }
  }

  /** World axes after UPRIGHT_EULER: cranial +Y, anterior +Z, +X toward the model's left. */
  private preferScore(p: THREE.Vector3, prefer: ViewPrefer): number {
    switch (prefer) {
      case 'cranial':
        return p.y
      case 'caudal':
        return -p.y
      case 'anterior':
        return p.z
      case 'posterior':
        return -p.z
      case 'lateral':
        return Math.abs(p.x)
      case 'medial':
        return -Math.abs(p.x)
    }
  }

  private sampleMeshes(names: string[], maxPoints: number): THREE.Vector3[] {
    const meshes: THREE.Mesh[] = []
    for (const n of names) {
      const m = this.meshByName.get(n)
      if (m) meshes.push(m)
    }
    if (meshes.length === 0) return []
    const per = Math.max(80, Math.floor(maxPoints / meshes.length))
    const out: THREE.Vector3[] = []
    for (const mesh of meshes) {
      const pos = mesh.geometry.getAttribute('position')
      if (!pos) continue
      mesh.updateWorldMatrix(true, false)
      const count = pos.count
      const stride = Math.max(1, Math.ceil(count / per))
      for (let i = 0; i < count; i += stride) {
        const v = new THREE.Vector3().fromBufferAttribute(pos, i)
        mesh.localToWorld(v)
        out.push(v)
      }
    }
    return out
  }

  private addMarker(
    worldPoint: THREE.Vector3,
    outward: THREE.Vector3,
    kind: 'origin' | 'insertion',
    label: string,
  ): void {
    // Labels only — no 3D spheres or stems, which hide the attachment.
    const group = new THREE.Group()
    group.position.copy(worldPoint)

    const el = document.createElement('div')
    el.className = `view-pin view-pin--${kind}`
    el.textContent = label
    el.style.pointerEvents = 'none'
    const tag = new CSS2DObject(el)
    // Sit the word just off the surface so it marks the site without covering it.
    tag.position.copy(outward).multiplyScalar(0.05)
    group.add(tag)

    this.markerGroup.add(group)
  }

  /**
   * Screen-space occlusion of the 3D view, in CSS pixels.
   * Touch quiz and View pass the chips, HUD, keyboard, and study panel.
   * Desktop quiz passes enabled=false and keeps a full-frame camera.
   */
  setFramingInsets(insets: FramingInsets, enabled: boolean): void {
    const next: FramingInsets = {
      top: Math.max(0, insets.top),
      right: Math.max(0, insets.right),
      bottom: Math.max(0, insets.bottom),
      left: Math.max(0, insets.left),
    }
    const changed = this.framingEnabled !== enabled || insetsChanged(this.framingTarget, enabled ? next : ZERO_INSETS, 6)
    this.framingEnabled = enabled
    this.framingTarget = enabled ? next : { ...ZERO_INSETS }
    // The view offset and the fit distance read different copies. Keep them
    // on the same band; the camera pose still eases into the new distance.
    this.framingCurrent.top = this.framingTarget.top
    this.framingCurrent.right = this.framingTarget.right
    this.framingCurrent.bottom = this.framingTarget.bottom
    this.framingCurrent.left = this.framingTarget.left
    if (!changed) return
    if (this.userOrbiting) {
      this.pendingRefit = true
      return
    }
    this.refitFramedDistance()
  }

  whenPoseSettled(): Promise<void> {
    return new Promise((resolve) => {
      const start = performance.now()
      const tick = () => {
        if (this.disposed) {
          resolve()
          return
        }
        const c = this.framingCurrent
        const t = this.framingTarget
        const insetsDone =
          Math.abs(c.top - t.top) < 0.6 &&
          Math.abs(c.bottom - t.bottom) < 0.6 &&
          Math.abs(c.left - t.left) < 0.6 &&
          Math.abs(c.right - t.right) < 0.6
        if ((!this.framePending && !this.viewFrame && insetsDone) || performance.now() - start > 3500) {
          resolve()
          return
        }
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
  }

  getFramingReport(): FramingReport {
    const view = this.camera.view
    const offset = this.camera.position.clone().sub(this.controls.target)
    const round = (v: THREE.Vector3) => ({
      x: Number(v.x.toFixed(3)),
      y: Number(v.y.toFixed(3)),
      z: Number(v.z.toFixed(3)),
    })
    return {
      viewId: this.catalogView || this.lastViewId,
      distance: Number(offset.length().toFixed(3)),
      offsetX: view?.enabled ? Math.round(view.offsetX) : 0,
      offsetY: view?.enabled ? Math.round(view.offsetY) : 0,
      occluderCount: this.occluderIds.size,
      spinning: this.spinning,
      yaw: Number(this.spin.rotation.y.toFixed(3)),
      framingEnabled: this.framingEnabled,
      camera: round(this.camera.position),
      target: round(this.controls.target),
      insets: {
        top: Math.round(this.framingCurrent.top),
        right: Math.round(this.framingCurrent.right),
        bottom: Math.round(this.framingCurrent.bottom),
        left: Math.round(this.framingCurrent.left),
      },
      fillPct: this.currentFillPct(),
    }
  }

  /** How much of the visible band the projected box occupies, on the tighter axis. */
  private currentFillPct(): number {
    const ext = this.framedExtents
    if (!ext) return 0
    const w = Math.max(this.viewWidth, 1)
    const h = Math.max(this.viewHeight, 1)
    const insets = this.framingEnabled ? this.framingCurrent : ZERO_INSETS
    const band = visibleBand(w, h, insets)
    const dist = Math.max(this.camera.position.distanceTo(this.controls.target) - ext.depth, 0.05)
    const vFov = (this.camera.fov * Math.PI) / 180
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * (w / h))
    const worldH = 2 * dist * Math.tan(vFov / 2) * (band.height / h)
    const worldW = 2 * dist * Math.tan(hFov / 2) * (band.width / w)
    const fillH = (ext.halfHeight * 2) / Math.max(worldH, 1e-4)
    const fillW = (ext.halfWidth * 2) / Math.max(worldW, 1e-4)
    return Math.round(Math.max(fillH, fillW) * 100)
  }

  private fadedOpacity(name: string, opacity: number): number {
    return this.occluderIds.has(name) ? Math.min(opacity, OCCLUDER_OPACITY) : opacity
  }

  /** Layout viewport changes (keyboard, rotation) do not always emit window resize. */
  private readViewSize(): boolean {
    const parent = this.mainCanvas.parentElement
    const w = parent?.clientWidth || window.innerWidth
    const h = parent?.clientHeight || window.innerHeight
    if (Math.abs(w - this.viewWidth) < 4 && Math.abs(h - this.viewHeight) < 4) return false
    this.viewWidth = w
    this.viewHeight = h
    this.camera.aspect = w / Math.max(h, 1)
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
    this.labelRenderer.setSize(w, h)
    return true
  }

  /** Fit the part's real projected box into the visible band. */
  private distanceForBox(box: THREE.Box3, dir: THREE.Vector3): number {
    this.readViewSize()
    const w = Math.max(this.viewWidth, 1)
    const h = Math.max(this.viewHeight, 1)
    const insets = this.framingEnabled ? this.framingTarget : ZERO_INSETS
    const band = visibleBand(w, h, insets)
    const size = box.getSize(this._scratchA)
    const ext = boxViewExtents(
      { x: size.x * 0.5, y: size.y * 0.5, z: size.z * 0.5 },
      { x: dir.x, y: dir.y, z: dir.z },
    )
    this.framedExtents = ext
    const limiting = Math.min(band.width, band.height)
    // A strip under ~90px (phone landscape with a tall keyboard) cannot hold
    // an oversized target. Fit the whole box into that strip, even if the
    // part is then small. A slightly taller short band can still use 120px
    // so the part stays readable.
    const minBandPx = limiting < 90 ? 0 : limiting < 120 ? 120 : 0
    return fitDistanceToExtents({
      halfWidth: ext.halfWidth,
      halfHeight: ext.halfHeight,
      depth: ext.depth,
      fovDeg: this.camera.fov,
      canvasWidth: w,
      canvasHeight: h,
      bandWidth: band.width,
      bandHeight: band.height,
      fill: this.ankleCase ? ANKLE_FRAME_FILL : 0.66,
      marginPx: 12,
      minBandPx,
      // A carpal-sized part stays far enough to keep the neighbouring bones in frame.
      contextHalf: 0.11,
      minDistance: VIEW_MIN_DISTANCE + 0.05,
      // A ~50px strip needs a much longer pull-back before a thigh or the
      // erector spinae fits inside it. Taller bands keep the usual cap.
      maxDistance: limiting < 90 ? 48 : 14,
    })
  }

  private refitFramedDistance(): void {
    const posing = this.viewFrame
    const box = this.framedBox
    if (!box || box.isEmpty()) return
    const from = posing
      ? posing.endPos.clone().sub(posing.endTarget)
      : this.camera.position.clone().sub(this.controls.target)
    if (from.lengthSq() < 1e-8) from.set(0, 0.12, 1)
    const dist = this.distanceForBox(box, from.clone().normalize())
    const pivot = posing ? posing.endTarget : this.controls.target
    from.setLength(dist)
    const endPos = pivot.clone().add(from)
    this.focusDist = dist
    if (posing) {
      posing.endPos.copy(endPos)
      return
    }
    if (endPos.distanceTo(this.camera.position) < Math.max(0.04, dist * 0.015)) return
    this.startViewPose(pivot.clone(), endPos, 0.34)
  }

  private startViewPose(endTarget: THREE.Vector3, endPos: THREE.Vector3, duration: number): void {
    this.viewFrame = {
      startTarget: this.controls.target.clone(),
      endTarget: endTarget.clone(),
      startPos: this.camera.position.clone(),
      endPos: endPos.clone(),
      elapsed: 0,
      duration,
    }
  }

  private lerpFramingInsets(dt: number): void {
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 9)
    const target = this.framingTarget
    const current = this.framingCurrent
    for (const key of ['top', 'right', 'bottom', 'left'] as const) {
      const delta = target[key] - current[key]
      if (Math.abs(delta) < 0.4) current[key] = target[key]
      else current[key] += delta * k
    }
  }

  private applyFramingOffset(): void {
    this.readViewSize()
    // A pointerdown without a pointerup (focus changes, headless taps) leaves
    // the orbit flag set and freezes the camera on a stale band.
    const pointers = (this.controls as unknown as { _pointers?: unknown[] })._pointers
    if (this.userOrbiting && (!pointers || pointers.length === 0)) {
      this.userOrbiting = false
      this.holdUserOrbit = false
      if (this.pendingRefit) this.pendingRefit = false
    }
    // Insets and the layout viewport can change after the first fit. Keep the
    // distance on the current band until the user is actually dragging.
    if (!this.userOrbiting && !this.holdUserOrbit) this.refitFramedDistance()
    const w = this.viewWidth
    const h = this.viewHeight
    if (w < 2 || h < 2) return
    const c = this.framingCurrent
    const idle =
      !this.framingEnabled && c.top < 0.5 && c.right < 0.5 && c.bottom < 0.5 && c.left < 0.5
    if (idle) {
      if (this.camera.view?.enabled) this.camera.clearViewOffset()
      return
    }
    const band = visibleBand(w, h, c)
    const off = viewOffsetForBand(w, h, band)
    this.camera.setViewOffset(off.fullWidth, off.fullHeight, off.offsetX, off.offsetY, off.width, off.height)
  }

  private scoreDirection(
    center: THREE.Vector3,
    radius: number,
    dir: THREE.Vector3,
    names: string[],
  ): { ratio: number; occluded: number; occluders: string[] } {
    const target = new Set(names)
    const kind = this.kindByName.get(names[0] ?? '') ?? 'bone'
    const up = Math.abs(dir.y) > 0.85 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
    const tangent = new THREE.Vector3().crossVectors(dir, up).normalize()
    const bitangent = new THREE.Vector3().crossVectors(dir, tangent).normalize()
    const reach = Math.max(radius * 3.2, 0.9)
    const samples: Array<{ at: THREE.Vector3; w: number }> = [
      { at: center.clone(), w: 2 },
      { at: center.clone().addScaledVector(tangent, radius * 0.42), w: 1 },
      { at: center.clone().addScaledVector(tangent, radius * -0.42), w: 1 },
      { at: center.clone().addScaledVector(bitangent, radius * 0.42), w: 1 },
      { at: center.clone().addScaledVector(bitangent, radius * -0.42), w: 1 },
    ]
    const meshes: THREE.Object3D[] = []
    const reachLimit = reach + radius * 1.4
    const scale = new THREE.Vector3()
    const worldCenter = new THREE.Vector3()
    const ordered = [...this.meshByName.values()].sort((a, b) => a.name.localeCompare(b.name))
    for (const mesh of ordered) {
      // Visibility and the previous question's fade are not part of the angle.
      if (mesh.name === 'diaphragm') continue
      const meshKind = this.kindByName.get(mesh.name) ?? 'bone'
      if (meshKind !== kind && !target.has(mesh.name)) continue
      if (!mesh.geometry.boundingSphere) mesh.geometry.computeBoundingSphere()
      const sphere = mesh.geometry.boundingSphere
      if (!sphere) continue
      worldCenter.copy(sphere.center).applyMatrix4(mesh.matrixWorld)
      mesh.getWorldScale(scale)
      const worldR = sphere.radius * Math.max(scale.x, scale.y, scale.z)
      if (worldCenter.distanceTo(center) > reachLimit + worldR) continue
      meshes.push(mesh)
    }
    let weight = 0
    let visible = 0
    let occluded = 0
    const blocked = new Map<string, number>()
    const savedFar = this.raycaster.far
    for (const sample of samples) {
      const origin = sample.at.clone().addScaledVector(dir, reach)
      this.raycaster.set(origin, sample.at.clone().sub(origin).normalize())
      this.raycaster.far = reach + radius * 0.35
      const hits = this.raycaster.intersectObjects(meshes, false)
      weight += sample.w
      let sawBlocker = false
      for (const hit of hits) {
        const hitName = hit.object.name
        if (!hitName) continue
        if (target.has(hitName)) {
          visible += sample.w
          if (sawBlocker) occluded += sample.w
          break
        }
        if ((this.kindByName.get(hitName) ?? 'bone') === kind) {
          blocked.set(hitName, (blocked.get(hitName) ?? 0) + sample.w)
          sawBlocker = true
        }
      }
    }
    this.raycaster.far = savedFar
    return {
      ratio: weight > 0 ? visible / weight : 0,
      occluded: weight > 0 ? occluded / weight : 0,
      occluders: [...blocked.keys()].sort(),
    }
  }

  async enterAnkleCase(): Promise<void> {
    await this.ensureLigamentsLoaded()
    if (this.disposed) return
    this.ankleCase = true
    this.spinning = false
    this.spin.rotation.y = 0
    this.viewMode = false
    this.targetIds = new Set()
    this.controls.enablePan = false
    this.controls.minDistance = VIEW_MIN_DISTANCE
    this.buildAnklePivot()
    this.ankleEmphasis = 'both'
    this.ankleLigamentsVisible = true
    this.applyAnklePose(anklePoseAt(0))
    this.frameAnkle()
  }

  exitAnkleCase(): void {
    if (!this.ankleCase && !this.anklePivot) return
    this.ankleMotion = null
    if (this.anklePivot) this.anklePivot.rotation.set(0, 0, 0)
    this.anklePivot?.updateMatrixWorld(true)
    for (const home of this.ankleHomes) {
      home.parent.attach(home.mesh)
    }
    this.ankleHomes = []
    if (this.anklePivot) {
      this.anklePivot.removeFromParent()
      this.anklePivot = null
    }
    this.ankleCase = false
    this.ankleEmphasis = 'none'
    this.ankleLabelsWanted = false
    this.clearAnkleLabels()
    this.targetIds = new Set()
    this.framedBox = null
    this.framedExtents = null
    this.cancelViewFrame()
    this.applySubjectVisibility()
  }

  isAnkleCase(): boolean {
    return this.ankleCase
  }

  setAnkleEmphasis(emphasis: AnkleEmphasis): void {
    this.ankleEmphasis = emphasis
    if (this.ankleCase) this.applyAnkleLook()
  }

  /** Short ATFL / CFL tags on the Learn ligaments step. Hidden with the unrigged meshes. */
  setAnkleLigamentLabels(visible: boolean): void {
    this.ankleLabelsWanted = visible
    if (this.ankleCase) this.syncAnkleLabels()
    else this.clearAnkleLabels()
  }

  /** Play the inversion + plantarflexion motion once, from neutral back to neutral. */
  replayAnkleMotion(): void {
    if (!this.ankleCase) return
    this.ankleMotion = { t: 0, duration: 5.2, playing: true }
    this.applyAnklePose(anklePoseAt(0))
  }

  /** Hold a pose without playing. `u` is 0–1 on the same curve as replay. */
  holdAnklePose(u: number): void {
    if (!this.ankleCase) return
    this.ankleMotion = null
    this.applyAnklePose(anklePoseAt(u))
  }

  pickAnkle(clientX: number, clientY: number): { hit: AnkleHit; meshName: string } | null {
    if (!this.ankleCase) return null
    const rect = this.mainCanvas.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return null
    this.pointerNdc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.raycaster.setFromCamera(this.pointerNdc, this.camera)
    const targets: THREE.Object3D[] = []
    for (const mesh of this.meshByName.values()) {
      if (mesh.visible) targets.push(mesh)
    }
    const hits = this.raycaster.intersectObjects(targets, false)
    let first: { hit: AnkleHit; meshName: string; distance: number } | null = null
    for (const hit of hits) {
      const obj = hit.object
      if (!(obj instanceof THREE.Mesh) || !obj.name) continue
      const kind = this.kindByName.get(obj.name)
      if (kind !== 'ligament' && kind !== 'bone') continue
      first = { hit: classifyAnkleMesh(obj.name), meshName: obj.name, distance: hit.distance }
      break
    }
    // The licensed ribbons are only a few millimetres thick. A ray through the
    // middle of one often misses every vertex and hits the fibula behind it.
    // Measure distance to the triangles, and prefer that ligament when the ray
    // is on the ribbon. The fibular shaft stays far enough away to read as bone.
    const near = this.nearestRightLigament(0.014)
    if (near && (first == null || near.distance <= first.distance + 0.03)) {
      return { hit: classifyAnkleMesh(near.name), meshName: near.name }
    }
    return first ? { hit: first.hit, meshName: first.meshName } : null
  }

  /** Closest right-ankle ligament surface to the current ray, in world units. */
  private nearestRightLigament(maxRadial: number): { name: string; distance: number } | null {
    const ray = this.raycaster.ray
    const a = new THREE.Vector3()
    const b = new THREE.Vector3()
    const c = new THREE.Vector3()
    const hit = new THREE.Vector3()
    let bestName = ''
    let bestRadial = Infinity
    let bestAlong = 0
    const consider = (name: string, radial: number, along: number) => {
      if (along < 0 || radial > maxRadial || radial >= bestRadial) return
      bestName = name
      bestRadial = radial
      bestAlong = along
    }
    for (const name of ['atfl_r', 'cfl_r', 'deltoid_r']) {
      const mesh = this.meshByName.get(name)
      if (!mesh?.visible) continue
      const pos = mesh.geometry.getAttribute('position')
      const index = mesh.geometry.getIndex()
      if (!pos) continue
      mesh.updateWorldMatrix(true, false)
      const triCount = index ? index.count / 3 : Math.floor(pos.count / 3)
      for (let t = 0; t < triCount; t++) {
        const ia = index ? index.getX(t * 3) : t * 3
        const ib = index ? index.getX(t * 3 + 1) : t * 3 + 1
        const ic = index ? index.getX(t * 3 + 2) : t * 3 + 2
        a.fromBufferAttribute(pos as THREE.BufferAttribute, ia).applyMatrix4(mesh.matrixWorld)
        b.fromBufferAttribute(pos as THREE.BufferAttribute, ib).applyMatrix4(mesh.matrixWorld)
        c.fromBufferAttribute(pos as THREE.BufferAttribute, ic).applyMatrix4(mesh.matrixWorld)
        if (ray.intersectTriangle(a, b, c, false, hit)) {
          consider(name, 0, hit.sub(ray.origin).dot(ray.direction))
          continue
        }
        for (const [p0, p1] of [
          [a, b],
          [b, c],
          [c, a],
        ] as const) {
          const gap = raySegmentGap(ray, p0, p1)
          consider(name, gap.radial, gap.along)
        }
      }
    }
    return bestName ? { name: bestName, distance: bestAlong } : null
  }

  getAnkleReport(): {
    active: boolean
    ligaments: boolean
    pose: { plantar: number; invert: number } | null
    camera: { x: number; y: number; z: number }
    target: { x: number; y: number; z: number }
    viewId: string
    points: Record<string, { x: number; y: number; z: number } | null>
    picks: Record<string, string | null>
    roll: { lateralY: number; medialY: number } | null
    /** World Y of the patient's lateral direction. Negative means that side points down. */
    lateralAxisY: number | null
    labels: { atfl: boolean; cfl: boolean }
    inflate: number
    spinning: boolean
  } {
    const round = (v: THREE.Vector3) => ({
      x: +v.x.toFixed(4),
      y: +v.y.toFixed(4),
      z: +v.z.toFixed(4),
    })
    const centerOf = (name: string) => {
      const mesh = this.meshByName.get(name)
      if (!mesh) return null
      mesh.updateWorldMatrix(true, false)
      const box = new THREE.Box3().setFromObject(mesh)
      if (box.isEmpty()) return null
      return round(box.getCenter(new THREE.Vector3()))
    }
    const points: Record<string, { x: number; y: number; z: number } | null> = {}
    const picks: Record<string, string | null> = {}
    for (const name of ['atfl_r', 'cfl_r', 'deltoid_r', 'talus_r', 'fibula_r', 'metatarsal5_r', 'metatarsal1_r', 'phal_foot_dist_1_r']) {
      points[name] = centerOf(name)
    }
    const canvas = this.mainCanvas.getBoundingClientRect()
    for (const name of ['atfl_r', 'cfl_r', 'fibula_r']) {
      const mesh = this.meshByName.get(name)
      if (!mesh || canvas.width <= 0) {
        picks[name] = null
        continue
      }
      mesh.updateWorldMatrix(true, false)
      const center = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3())
      center.project(this.camera)
      const sx = canvas.left + (center.x * 0.5 + 0.5) * canvas.width
      const sy = canvas.top + (-center.y * 0.5 + 0.5) * canvas.height
      picks[name] = this.pickAnkle(sx, sy)?.hit ?? null
    }
    return {
      active: this.ankleCase,
      ligaments: ANKLE_LIGAMENT_MESHES.every((name) => this.meshByName.has(name)),
      pose: this.anklePivot
        ? { plantar: this.anklePivot.rotation.x, invert: Math.abs(this.anklePivot.rotation.z) }
        : null,
      camera: round(this.camera.position),
      target: round(this.controls.target),
      viewId: this.lastViewId,
      points,
      picks,
      roll: this.calcaneusRoll(),
      lateralAxisY: this.anklePivot ? +(-this.anklePivot.matrixWorld.elements[1]).toFixed(4) : null,
      labels: this.ankleLabelState(),
      inflate: LIGAMENT_INFLATE_MM,
      spinning: this.spinning,
    }
  }

  /**
   * Apply the same resume-spin policy as the OrbitControls `end` timeout.
   * QA uses this so a hook report does not have to wait 1.8s.
   */
  simulateControlsEnd(): void {
    this.resumeIdleSpinAfterControlsEnd()
  }

  private resumeIdleSpinAfterControlsEnd(): void {
    if (
      shouldResumeIdleSpinAfterControlsEnd({
        disposed: this.disposed,
        viewMode: this.viewMode,
        ankleCase: this.ankleCase,
        targetCount: this.targetIds.size,
      })
    ) {
      this.spinning = true
    }
  }

  /**
   * Lowest point on the lateral half of the calcaneus versus the medial half.
   * Patient right is −X, so the lateral half is the smaller local X.
   */
  private calcaneusRoll(): { lateralY: number; medialY: number } | null {
    const mesh = this.meshByName.get('calcaneus_r')
    const pos = mesh?.geometry.getAttribute('position')
    if (!mesh || !pos) return null
    mesh.updateWorldMatrix(true, false)
    let minX = Infinity
    let maxX = -Infinity
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      if (x < minX) minX = x
      if (x > maxX) maxX = x
    }
    const mid = (minX + maxX) / 2
    const p = new THREE.Vector3()
    let lateralY = Infinity
    let medialY = Infinity
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos as THREE.BufferAttribute, i)
      const side = p.x < mid ? 'lateral' : 'medial'
      p.applyMatrix4(mesh.matrixWorld)
      if (side === 'lateral') lateralY = Math.min(lateralY, p.y)
      else medialY = Math.min(medialY, p.y)
    }
    if (!Number.isFinite(lateralY) || !Number.isFinite(medialY)) return null
    return { lateralY: +lateralY.toFixed(4), medialY: +medialY.toFixed(4) }
  }

  private async ensureLigamentsLoaded(): Promise<void> {
    if (this.ligamentsLoaded) return
    if (this.ligamentsLoading) return this.ligamentsLoading
    this.ligamentsLoading = this.loadLigamentsInternal()
    await this.ligamentsLoading
  }

  private async loadLigamentsInternal(): Promise<void> {
    const urls = await fetchManifest('models/extra/ligaments/manifest.json')
    if (urls.length === 0) {
      this.ligamentsLoaded = true
      return
    }
    const loader = new GLTFLoader()
    await this.loadGroup(loader, urls, 'ligament', 'ligaments', 'bones')
    this.inflateLoadedLigaments()
    this.ligamentsLoaded = true
  }

  /**
   * Fatten the licensed ligaments in place after they are parented to the
   * scaled body. The packed GLBs are not rewritten.
   */
  private inflateLoadedLigaments(): void {
    if (this.ligamentsInflated) return
    for (const name of ANKLE_LIGAMENT_MESHES) {
      const mesh = this.meshByName.get(name)
      if (!mesh || mesh.userData.ligamentInflated) continue
      applyLigamentDisplayTreatment(mesh)
    }
    this.ligamentsInflated = true
  }

  private buildAnklePivot(): void {
    if (this.anklePivot) return
    const talus = this.meshByName.get('talus_r')
    if (!talus) return
    const pivot = new THREE.Group()
    pivot.name = 'right-ankle-pivot'
    pivot.rotation.order = 'XYZ'
    this.spin.add(pivot)
    this.spin.updateMatrixWorld(true)
    talus.updateWorldMatrix(true, false)
    const center = new THREE.Box3().setFromObject(talus).getCenter(new THREE.Vector3())
    pivot.position.copy(center)
    pivot.updateMatrixWorld(true)
    for (const name of RIGHT_FOOT_BONES) {
      const mesh = this.meshByName.get(name)
      const parent = mesh?.parent
      if (!mesh || !parent) continue
      this.ankleHomes.push({ mesh, parent })
      pivot.attach(mesh)
    }
    this.anklePivot = pivot
  }

  private frameAnkle(): void {
    this.holdUserOrbit = false
    this.spinning = false
    this.spin.rotation.y = 0
    const token = ++this.frameToken
    this.framePending = true
    const names = ANKLE_FRAME_MESHES.filter((name) => this.meshByName.has(name))
    this.frameWhenReady(names, 'lateral', token, 0, 'quiz')
  }

  private applyAnklePose(pose: AnklePose): void {
    if (!this.anklePivot) return
    // +X drops the forefoot (plantarflexion). +Z rolls the right foot so the
    // lateral border goes down (inversion). Checked against the pivot axes.
    this.anklePivot.rotation.set(pose.plantarRad, 0, pose.inversionRad)
    this.ankleLigamentsVisible = pose.ligamentsVisible
    this.applyAnkleLook()
  }

  private tickAnkleMotion(dt: number): void {
    const motion = this.ankleMotion
    if (!motion?.playing || !this.ankleCase) return
    motion.t += dt
    const u = Math.min(1, motion.t / motion.duration)
    this.applyAnklePose(anklePoseAt(u))
    if (u >= 1) motion.playing = false
  }

  private applyAnkleLook(): void {
    const context = new Set<string>(ANKLE_CONTEXT_BONES)
    const emphasized = new Set<string>()
    if (this.ankleEmphasis === 'atfl' || this.ankleEmphasis === 'both') emphasized.add('atfl_r')
    if (this.ankleEmphasis === 'cfl' || this.ankleEmphasis === 'both') emphasized.add('cfl_r')
    if (this.ankleEmphasis === 'deltoid') emphasized.add('deltoid_r')
    for (const [name, mat] of this.materials) {
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      const kind = this.kindByName.get(name) ?? 'bone'
      if (kind === 'muscle' || kind === 'cartilage' || name === 'diaphragm') {
        mesh.visible = false
        continue
      }
      if (kind === 'ligament') {
        const right = name.endsWith('_r')
        mesh.visible = right && this.ankleLigamentsVisible
        const hot = emphasized.size === 0 || emphasized.has(name)
        const role = ligamentRole(name)
        const pal = role === 'other' ? LIGAMENT_LOOK.atfl : LIGAMENT_LOOK[role]
        if (hot) {
          mat.color.setHex(pal.color)
          mat.emissive.setHex(pal.emissive)
          mat.emissiveIntensity = pal.emissiveIntensity
          mat.opacity = 1
        } else {
          mat.color.setHex(LIGAMENT_DIM.color)
          mat.emissive.setHex(LIGAMENT_DIM.emissive)
          mat.emissiveIntensity = LIGAMENT_DIM.emissiveIntensity
          mat.opacity = LIGAMENT_DIM.opacity
        }
        mat.transparent = !hot
        mat.depthWrite = hot
        mat.roughness = 0.42
        mat.metalness = 0.02
        mat.side = THREE.DoubleSide
        mat.polygonOffset = true
        mat.polygonOffsetFactor = -2
        mat.polygonOffsetUnits = -2
        mesh.renderOrder = 12
        mat.needsUpdate = true
        continue
      }
      mesh.visible = true
      if (context.has(name)) {
        this.applyPalette(mat, VIEW_BONE, { transparent: false, depthWrite: true })
        mesh.renderOrder = 2
      } else {
        this.applyPalette(mat, BONE_CONTEXT_FADE, { transparent: true, depthWrite: false })
        mat.opacity = 0.07
        mesh.renderOrder = 0
      }
    }
    this.syncAnkleLabels()
  }

  private ankleLabelState(): { atfl: boolean; cfl: boolean } {
    const show = ankleLigamentLabelsVisible(this.ankleLigamentsVisible, this.ankleLabelsWanted)
    const visible = (name: string) => {
      if (!show) return false
      const el = this.ankleLabelGroup.getObjectByName(`label-${name}`)
      return !!(el && el.visible)
    }
    return { atfl: visible('atfl_r'), cfl: visible('cfl_r') }
  }

  private clearAnkleLabels(): void {
    const remove: CSS2DObject[] = []
    this.ankleLabelGroup.traverse((o) => {
      if (o instanceof CSS2DObject) remove.push(o)
    })
    for (const o of remove) {
      o.parent?.remove(o)
      o.element.remove()
    }
    while (this.ankleLabelGroup.children.length > 0) {
      this.ankleLabelGroup.remove(this.ankleLabelGroup.children[0]!)
    }
  }

  private syncAnkleLabels(): void {
    const show = this.ankleCase && ankleLigamentLabelsVisible(this.ankleLigamentsVisible, this.ankleLabelsWanted)
    if (!show) {
      this.clearAnkleLabels()
      return
    }
    if (this.ankleLabelGroup.children.length === 0) this.placeAnkleLabels()
    this.ankleLabelGroup.visible = true
    for (const child of this.ankleLabelGroup.children) child.visible = true
  }

  private placeAnkleLabels(): void {
    this.clearAnkleLabels()
    this.body.updateMatrixWorld(true)
    for (const name of ['atfl_r', 'cfl_r'] as const) {
      const mesh = this.meshByName.get(name)
      const text = ligamentLabel(name)
      if (!mesh || !text) continue
      mesh.updateWorldMatrix(true, false)
      const center = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3())
      // Sit the tag just off the band: further lateral (−X on the right ankle),
      // ATFL a little anterior/cranial, CFL a little plantar/posterior.
      if (name === 'atfl_r') center.set(center.x - 0.028, center.y + 0.018, center.z + 0.022)
      else center.set(center.x - 0.028, center.y - 0.022, center.z - 0.012)
      const el = document.createElement('div')
      el.className = `view-pin view-pin--ligament view-pin--${text.toLowerCase()}`
      el.textContent = text
      el.style.pointerEvents = 'none'
      const tag = new CSS2DObject(el)
      tag.name = `label-${name}`
      tag.position.copy(center)
      this.ankleLabelGroup.add(tag)
    }
  }

  dispose(): void {
    this.disposed = true
    this.cancelViewFrame()
    window.removeEventListener('resize', this.resize)
    this.clearViewMarkers()
    this.clearAnkleLabels()
    this.ankleLabelGroup.removeFromParent()
    this.controls.dispose()
    this.renderer.dispose()
    this.labelRenderer.domElement.remove()
    for (const side of this.sideViews) side.renderer.dispose()
  }
}
