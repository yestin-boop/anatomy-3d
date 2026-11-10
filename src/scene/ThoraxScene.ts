import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { assetUrl } from '../assetUrl'

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

/** BodyParts3D pack is Z-up (cranial +Z). This Euler maps cranial → +Y, anterior → +Z. */
export const UPRIGHT_EULER = { x: -Math.PI / 2, y: 0, z: 0 }

export type ThoraxSceneOptions = {
  mainCanvas: HTMLCanvasElement
  sideCanvases?: HTMLCanvasElement[]
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

  constructor(opts: ThoraxSceneOptions) {
    this.mainCanvas = opts.mainCanvas
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0b1220)
    this.scene.fog = new THREE.Fog(0x0b1220, 10, 36)

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
    this.controls.minDistance = 0.8
    this.controls.maxDistance = 24
    // Keep orbit pole = world up
    this.controls.minPolarAngle = 0.15
    this.controls.maxPolarAngle = Math.PI - 0.15
    this.controls.addEventListener('start', () => {
      this.spinning = false
    })
    this.controls.addEventListener('end', () => {
      window.setTimeout(() => {
        if (!this.disposed) this.spinning = true
      }, 1800)
    })

    const hemi = new THREE.HemisphereLight(0xcfe4ff, 0x1a2030, 1.1)
    this.scene.add(hemi)
    const key = new THREE.DirectionalLight(0xffffff, 1.25)
    key.position.set(3, 8, 5)
    this.scene.add(key)
    const fill = new THREE.DirectionalLight(0x88aacc, 0.5)
    fill.position.set(-5, 2, -3)
    this.scene.add(fill)
    const rim = new THREE.DirectionalLight(0xaaccff, 0.35)
    rim.position.set(0, 2, -8)
    this.scene.add(rim)

    this.spin.name = 'spinY'
    this.body.name = 'bodyUpright'
    this.spin.add(this.body)
    this.scene.add(this.spin)

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
        // Keep muscles hidden until subject is muscles
        item.traverse((o) => {
          if (o instanceof THREE.Mesh) o.visible = this.subject === 'muscles'
        })
      }
    }
    // Re-center once so muscle extents don't shift upright frame mid-session
    // (muscles sit on same BP3D frame; bbox already dominated by skeleton height)
    this.musclesLoaded = true
    this.applySubjectVisibility()
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
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
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

  dispose(): void {
    this.disposed = true
    window.removeEventListener('resize', this.resize)
    this.controls.dispose()
    this.renderer.dispose()
    for (const side of this.sideViews) side.renderer.dispose()
  }
}
