import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { assetUrl } from '../assetUrl'
import type { ViewAttachmentSite, ViewPrefer } from '../data/viewInfo'
import { muscleVisibleAtLayer, type MuscleLayerFilter } from '../data/muscles'

export type ViewSubjectFilter = 'both' | 'bones' | 'muscles'

const GHOST = {
  color: 0xc8ddf5,
  emissive: 0x5b8ec4,
  emissiveIntensity: 0.45,
  opacity: 0.34,
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
  color: 0xe8899a,
  emissive: 0xa83a52,
  emissiveIntensity: 0.38,
  opacity: 0.28,
  metalness: 0.05,
  roughness: 0.55,
}

const MUSCLE_TARGET = {
  color: 0xffd0d8,
  emissive: 0xff8a9a,
  emissiveIntensity: 0.72,
  opacity: 0.95,
  metalness: 0.08,
  roughness: 0.4,
}

const BONE_UNDER_MUSCLE = {
  color: 0xb8c8dc,
  emissive: 0x3a5070,
  emissiveIntensity: 0.12,
  opacity: 0.12,
}

/** Opaque study-model look for View mode (not the quiz X-ray / ghost palette). */
const VIEW_BONE = {
  color: 0xe9dcc8,
  emissive: 0x000000,
  emissiveIntensity: 0,
  roughness: 0.62,
  metalness: 0.04,
}
const VIEW_BONE_SELECTED = {
  color: 0xfff1e0,
  emissive: 0x5a3a18,
  emissiveIntensity: 0.16,
  roughness: 0.52,
  metalness: 0.05,
}
const VIEW_MUSCLE = {
  color: 0xa34448,
  emissive: 0x000000,
  emissiveIntensity: 0,
  roughness: 0.72,
  metalness: 0.02,
}
const VIEW_MUSCLE_SELECTED = {
  color: 0xc45a5e,
  emissive: 0x4a1014,
  emissiveIntensity: 0.18,
  roughness: 0.62,
  metalness: 0.03,
}
const VIEW_CARTILAGE = {
  color: 0xd8cbb6,
  emissive: 0x000000,
  emissiveIntensity: 0,
  roughness: 0.55,
  metalness: 0.02,
  opacity: 0.92,
}
const VIEW_DIM_OPACITY_BONE = 0.13
const VIEW_DIM_OPACITY_MUSCLE = 0.1

/** Ignore contralateral hits and stop once the ray has gone this far past the first hit. */
const PICK_MAX_DEPTH = 0.5
/** Floor for View framing of small parts (cervical vertebrae). Quiz minDistance stays 0.8. */
const VIEW_MIN_DISTANCE = 0.28
const DEFAULT_MIN_DISTANCE = 0.8

/** BodyParts3D pack is Z-up (cranial +Z). This Euler maps cranial → +Y, anterior → +Z. */
export const UPRIGHT_EULER = { x: -Math.PI / 2, y: 0, z: 0 }

export type ThoraxSceneOptions = {
  mainCanvas: HTMLCanvasElement
  sideCanvases?: HTMLCanvasElement[]
}

export type ViewPickHit = {
  meshName: string
  kind: 'bone' | 'muscle'
  distance: number
}

/** Left / right from the mesh filename; vertebrae and unpaired bones are midline. */
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
  /** 'bone' | 'muscle' per mesh name */
  private kindByName = new Map<string, 'bone' | 'muscle'>()
  private targetIds = new Set<string>()
  private subject: 'bones' | 'muscles' = 'bones'
  private spinning = true
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
      this.cancelViewFrame()
    })
    this.controls.addEventListener('end', () => {
      window.setTimeout(() => {
        if (!this.disposed && !this.viewMode) this.spinning = true
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

  async load(_ignoredThoraxUrl?: string): Promise<void> {
    const loader = new GLTFLoader()
    this.body.clear()
    this.meshByName.clear()
    this.materials.clear()
    this.kindByName.clear()
    this.musclesLoaded = false

    const boneUrls: string[] = await fetch(assetUrl('models/extra/manifest.json'))
      .then((r) => r.json())
      .then((urls: string[]) => urls.map((u) => assetUrl(u)))
      .catch(() => [] as string[])
    this.muscleUrls = await fetch(assetUrl('models/extra/muscles/manifest.json'))
      .then((r) => r.json())
      .then((urls: string[]) => urls.map((u) => assetUrl(u)))
      .catch(() => [] as string[])

    if (boneUrls.length === 0) {
      throw new Error('No skeleton meshes in /models/extra/manifest.json')
    }

    // Load bones in batches so first paint isn't blocked by 200+ parallel decodes
    const batchSize = 24
    for (let i = 0; i < boneUrls.length; i += batchSize) {
      const batch = boneUrls.slice(i, i + batchSize)
      const scenes = await Promise.all(batch.map((u) => this.loadOne(loader, u, 'bone')))
      for (const item of scenes) {
        if (!item) continue
        this.ingestModel(item, 'bone')
        this.body.add(item)
      }
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

  private async loadOne(
    loader: GLTFLoader,
    url: string,
    kind: 'bone' | 'muscle',
  ): Promise<THREE.Group | null> {
    try {
      const gltf = await loader.loadAsync(url)
      const base = url.split('/').pop()?.replace(/\.glb$/i, '') || ''
      gltf.scene.traverse((o) => {
        if (o instanceof THREE.Mesh && base) {
          o.name = base
          ;(o.userData as { kind?: string }).kind = kind
        }
      })
      return gltf.scene
    } catch (err) {
      console.warn('Failed to load', url, err)
      return null
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
    const batchSize = 12
    for (let i = 0; i < this.muscleUrls.length; i += batchSize) {
      const batch = this.muscleUrls.slice(i, i + batchSize)
      const scenes = await Promise.all(batch.map((u) => this.loadOne(loader, u, 'muscle')))
      for (const item of scenes) {
        if (!item) continue
        this.ingestModel(item, 'muscle')
        this.body.add(item)
        // Keep muscles hidden until subject is muscles (or View mode)
        item.traverse((o) => {
          if (o instanceof THREE.Mesh) o.visible = this.viewMode || this.subject === 'muscles'
        })
      }
    }
    // Re-center once so muscle extents don't shift upright frame mid-session
    // (muscles sit on same BP3D frame; bbox already dominated by skeleton height)
    this.musclesLoaded = true
    if (this.viewMode) this.applyViewPresentation()
    else this.applySubjectVisibility()
    console.info('[skeleton] muscles ready', [...this.kindByName.values()].filter((k) => k === 'muscle').length)
  }

  private ingestModel(model: THREE.Object3D, kind: 'bone' | 'muscle' = 'bone'): void {
    model.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const name = obj.name || obj.parent?.name || ''
      if (!name) return
      obj.geometry.computeVertexNormals()

      const isCartilage = name.startsWith('cartilage_')
      const isDiaphragm = name === 'diaphragm'
      const meshKind: 'bone' | 'muscle' =
        kind === 'muscle' || (obj.userData as { kind?: string }).kind === 'muscle'
          ? 'muscle'
          : 'bone'
      const base =
        meshKind === 'muscle'
          ? MUSCLE_GHOST
          : isCartilage || isDiaphragm
            ? CARTILAGE
            : GHOST
      const mat = new THREE.MeshStandardMaterial({
        color: base.color,
        emissive: base.emissive,
        emissiveIntensity: base.emissiveIntensity,
        transparent: true,
        opacity: base.opacity,
        metalness: meshKind === 'muscle' ? 0.05 : 0.15,
        roughness: meshKind === 'muscle' ? 0.55 : 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
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

  private applySubjectVisibility(): void {
    for (const [name, mat] of this.materials) {
      const kind = this.kindByName.get(name) ?? 'bone'
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      if (this.subject === 'bones') {
        // Hide muscles entirely in bone mode
        mesh.visible = kind === 'bone'
        if (kind === 'bone') {
          const isCartilage = name.startsWith('cartilage_')
          const base = isCartilage ? CARTILAGE : GHOST
          mat.color.setHex(base.color)
          mat.emissive.setHex(base.emissive)
          mat.emissiveIntensity = base.emissiveIntensity
          mat.opacity = base.opacity
          mat.depthWrite = false
          mesh.renderOrder = 1
        }
      } else {
        // Muscles on; bones as faint underlay
        mesh.visible = true
        if (kind === 'muscle') {
          mat.color.setHex(MUSCLE_GHOST.color)
          mat.emissive.setHex(MUSCLE_GHOST.emissive)
          mat.emissiveIntensity = MUSCLE_GHOST.emissiveIntensity
          mat.opacity = MUSCLE_GHOST.opacity
          mat.depthWrite = false
          mesh.renderOrder = 2
        } else {
          mat.color.setHex(BONE_UNDER_MUSCLE.color)
          mat.emissive.setHex(BONE_UNDER_MUSCLE.emissive)
          mat.emissiveIntensity = BONE_UNDER_MUSCLE.emissiveIntensity
          mat.opacity = BONE_UNDER_MUSCLE.opacity
          mat.depthWrite = false
          mesh.renderOrder = 0
        }
      }
      mat.needsUpdate = true
    }
  }

  setTarget(meshNames: string[]): void {
    this.targetIds = new Set(meshNames)
    this.applySubjectVisibility()
    for (const [name, mat] of this.materials) {
      const kind = this.kindByName.get(name) ?? 'bone'
      const mesh = this.meshByName.get(name)
      if (!mesh || !mesh.visible) continue
      const isTarget = this.targetIds.has(name)
      if (isTarget) {
        if (kind === 'muscle') {
          mat.color.setHex(MUSCLE_TARGET.color)
          mat.emissive.setHex(MUSCLE_TARGET.emissive)
          mat.emissiveIntensity = MUSCLE_TARGET.emissiveIntensity
          mat.opacity = MUSCLE_TARGET.opacity
        } else {
          mat.color.setHex(TARGET.color)
          mat.emissive.setHex(TARGET.emissive)
          mat.emissiveIntensity = TARGET.emissiveIntensity
          mat.opacity = TARGET.opacity
        }
        mat.transparent = true
        mat.depthWrite = true
        mesh.renderOrder = 10
      }
      mat.needsUpdate = true
    }
    this.frameMeshes(meshNames)
  }

  private frameMeshes(meshNames: string[]): void {
    const box = new THREE.Box3()
    let any = false
    for (const name of meshNames) {
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      box.expandByObject(mesh)
      any = true
    }
    if (!any) {
      this.frameFullBody()
      this.updateSideCameras()
      return
    }
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const radius = Math.max(size.x, size.y, size.z, 0.12) * 0.5
    const dist = Math.max(
      radius / Math.tan((this.camera.fov * Math.PI) / 360) * 2.6,
      1.4,
    )
    this.focusTarget.copy(center)
    this.focusDist = dist
    this.camera.up.set(0, 1, 0)
    this.camera.position.set(center.x + dist * 0.25, center.y + radius * 0.2, center.z + dist)
    this.controls.target.copy(center)
    this.controls.update()
    this.updateSideCamerasAround(center, dist)
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
    this.camera.aspect = w / Math.max(h, 1)
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
    this.labelRenderer.setSize(w, h)

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
    this.tickViewFrame(dt)
    this.controls.update()
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
    this.frameFullBody()
    this.spinning = true
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
    this.applyViewLighting(true)
    await this.ensureMusclesLoaded()
    if (!this.viewMode || this.disposed) return
    this.applyViewPresentation()
    this.frameFullBody()
  }

  exitView(): void {
    if (!this.viewMode) return
    this.viewMode = false
    this.cancelViewFrame()
    this.controls.enablePan = false
    this.controls.minDistance = DEFAULT_MIN_DISTANCE
    this.viewSelected.clear()
    this.clearViewMarkers()
    this.applyViewLighting(false)
    this.spinning = true
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
   * Skips markers, cartilage, and the diaphragm. Includes dim / ghosted
   * meshes after isolation so a covered muscle can be cycled to — the old
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
      if (name === 'diaphragm' || name.startsWith('cartilage_')) continue
      const kind = this.kindByName.get(name)
      if (kind !== 'bone' && kind !== 'muscle') continue
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
   * Ease the orbit target to the given meshes and set distance from their
   * bbox. View-only. Preserves the current look direction so a cycle does
   * not whip the camera around. Small parts (neck vertebrae) frame tight;
   * larger muscles get a looser pad. Quiz {@link frameMeshes} is unchanged.
   */
  frameViewSelection(meshNames: string[]): void {
    if (!this.viewMode || meshNames.length === 0) return
    this.body.updateMatrixWorld(true)
    const box = new THREE.Box3()
    let any = false
    for (const name of meshNames) {
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      box.expandByObject(mesh)
      any = true
    }
    if (!any) return

    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const radius = Math.max(size.x, size.y, size.z, 0.08) * 0.5
    const fovTan = Math.tan((this.camera.fov * Math.PI) / 360)
    const pad = THREE.MathUtils.lerp(
      2.05,
      2.7,
      THREE.MathUtils.smoothstep(radius, 0.05, 0.35),
    )
    const dist = Math.max(radius / fovTan * pad, VIEW_MIN_DISTANCE + 0.06)

    const startTarget = this.controls.target.clone()
    const startPos = this.camera.position.clone()
    const offset = startPos.clone().sub(startTarget)
    if (offset.lengthSq() < 1e-8) offset.set(0.25, 0.15, 1)
    offset.setLength(dist)
    const endPos = center.clone().add(offset)

    this.focusTarget.copy(center)
    this.focusDist = dist
    this.camera.up.set(0, 1, 0)
    this.viewFrame = {
      startTarget,
      endTarget: center,
      startPos,
      endPos,
      elapsed: 0,
      duration: 0.5,
    }
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
  }): void {
    if (opts.subjectFilter) this.viewSubjectFilter = opts.subjectFilter
    if (opts.muscleLayer) this.muscleLayerFilter = opts.muscleLayer
    if (this.viewMode) this.applyViewPresentation()
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

  private meshShownInView(name: string, kind: 'bone' | 'muscle'): boolean {
    if (kind === 'bone') return this.viewSubjectFilter !== 'muscles'
    if (this.viewSubjectFilter === 'bones') return false
    return muscleVisibleAtLayer(name, this.muscleLayerFilter)
  }

  private applyViewPresentation(): void {
    const hasSel = this.viewSelected.size > 0
    for (const [name, mat] of this.materials) {
      const kind = this.kindByName.get(name) ?? 'bone'
      const mesh = this.meshByName.get(name)
      if (!mesh) continue
      const isCartilage = name.startsWith('cartilage_')
      const isDiaphragm = name === 'diaphragm'
      const selected = hasSel && this.viewSelected.has(name)

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

      if (kind === 'muscle') {
        const pal = selected ? VIEW_MUSCLE_SELECTED : VIEW_MUSCLE
        mat.color.setHex(pal.color)
        mat.emissive.setHex(pal.emissive)
        mat.emissiveIntensity = pal.emissiveIntensity
        mat.roughness = pal.roughness
        mat.metalness = pal.metalness
        mat.transparent = dim
        mat.opacity = dim ? VIEW_DIM_OPACITY_MUSCLE : 1
        mat.depthWrite = !dim
        mesh.renderOrder = selected ? 10 : 2
      } else if (isCartilage) {
        mat.color.setHex(VIEW_CARTILAGE.color)
        mat.emissive.setHex(VIEW_CARTILAGE.emissive)
        mat.emissiveIntensity = VIEW_CARTILAGE.emissiveIntensity
        mat.roughness = VIEW_CARTILAGE.roughness
        mat.metalness = VIEW_CARTILAGE.metalness
        mat.transparent = true
        mat.opacity = dim ? 0.06 : VIEW_CARTILAGE.opacity
        mat.depthWrite = !dim
        mesh.renderOrder = 1
      } else {
        const pal = selected ? VIEW_BONE_SELECTED : VIEW_BONE
        mat.color.setHex(pal.color)
        mat.emissive.setHex(pal.emissive)
        mat.emissiveIntensity = pal.emissiveIntensity
        mat.roughness = pal.roughness
        mat.metalness = pal.metalness
        mat.transparent = dim
        mat.opacity = dim ? VIEW_DIM_OPACITY_BONE : 1
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
    for (const site of sites) {
      const placed = this.nearestAttachmentPoint(site.muscleMeshes, site.boneMeshes, site.prefer)
      if (!placed) {
        console.warn('[view] no attachment point for', site.label, site.muscleMeshes, site.boneMeshes)
        continue
      }
      this.addMarker(placed.point, placed.outward, site.kind, site.label)
    }
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

  dispose(): void {
    this.disposed = true
    this.cancelViewFrame()
    window.removeEventListener('resize', this.resize)
    this.clearViewMarkers()
    this.controls.dispose()
    this.renderer.dispose()
    this.labelRenderer.domElement.remove()
    for (const side of this.sideViews) side.renderer.dispose()
  }
}
