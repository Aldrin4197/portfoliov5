<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// @ts-expect-error — no shipped types for the default export
import initOcct from 'occt-import-js'
import occtWasmUrl from 'occt-import-js/dist/occt-import-js.wasm?url'

interface OcctAttr { array: number[] }
interface OcctMesh {
  name: string
  color: number[] | null
  index: { array: number[] } | null
  attributes: { position: OcctAttr; normal?: OcctAttr }
}
interface OcctResult { success: boolean; meshes: OcctMesh[] }

interface Keyframe {
  /** Elevation: 0 = top-down, PI/2 = side-on */
  phi: number
  /** Horizontal orbit angle in radians: 0 = front, PI/2 = right-side, PI = back */
  theta: number
  /** Distance multiplier on baseOrbitRadius. < 1 zooms in. */
  zoom: number
  /** Screen-space pan fraction of baseOrbitRadius. Negative = model appears on screen-right. */
  pan: number
  rimHex: string
}

// One keyframe per section. Progress 0→1 across scroll height maps linearly through these.
const DEG = Math.PI / 180

const KEYFRAMES: Keyframe[] = [
  { phi: 0.45, theta: -60 * DEG, zoom: 0.88, pan: -0.36, rimHex: '#6a84ff' },
  { phi: 0.50, theta: -20 * DEG, zoom: 0.84, pan:  0.34, rimHex: '#ff84d0' },
  { phi: 0.58, theta:  20 * DEG, zoom: 0.66, pan: -0.34, rimHex: '#7effc8' },
  { phi: 0.68, theta:  60 * DEG, zoom: 0.70, pan:  0.32, rimHex: '#ffdd84' },
  { phi: 0.78, theta: 100 * DEG, zoom: 0.68, pan: -0.32, rimHex: '#c084fc' },
  { phi: 0.82, theta: 140 * DEG, zoom: 0.74, pan:  0.12, rimHex: '#ff9ad8' },
  { phi: 0.78, theta: 180 * DEG, zoom: 0.78, pan: -0.12, rimHex: '#7ef7c8' },
  { phi: 0.72, theta: 220 * DEG, zoom: 0.82, pan:  0.32, rimHex: '#ffd97d' },
  { phi: 0.64, theta: 260 * DEG, zoom: 0.86, pan: -0.32, rimHex: '#9eb1ff' },
  { phi: 0.55, theta: 300 * DEG, zoom: 0.84, pan:  0.00, rimHex: '#ffdd84' },
]

const kfLerp = (a: number, b: number, t: number) => a + (b - a) * t

type Props = {
  modelUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelUrl: '/models/Arduino.stp',
})

const viewportRef = ref<HTMLDivElement | null>(null)
const status = ref('Loading model…')

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let rimLight: THREE.DirectionalLight | null = null
let modelGroup: THREE.Group | null = null
let fallbackMesh: THREE.Mesh | null = null
let animationHandle = 0

// Spherical orbit state
let baseOrbitRadius = 5    // set by fitToObject; never mutated after that
let orbitRadius = 5        // = baseOrbitRadius * lerpZoom each frame
let orbitTheta = 0
const orbitCenter = new THREE.Vector3()

// Scroll-driven targets (updated on every scroll event)
let scrollTargetPhi   = KEYFRAMES[0].phi
let scrollTargetTheta = KEYFRAMES[0].theta
let scrollTargetZoom  = KEYFRAMES[0].zoom
let scrollTargetPan   = KEYFRAMES[0].pan
const scrollTargetRim = new THREE.Color(KEYFRAMES[0].rimHex)

// Actual lerped camera values
let lerpPhi   = KEYFRAMES[0].phi
let lerpPanX  = 0
let lerpZoom  = KEYFRAMES[0].zoom
const lerpRim = new THREE.Color(KEYFRAMES[0].rimHex)

const fitToObject = (object: THREE.Object3D) => {
  if (!camera) return
  const bounds = new THREE.Box3().setFromObject(object)
  const size = bounds.getSize(new THREE.Vector3())
  bounds.getCenter(orbitCenter)
  const maxDim = Math.max(size.x, size.y, size.z)
  const fov = (camera.fov * Math.PI) / 180
  baseOrbitRadius = (maxDim / (2 * Math.tan(fov / 2))) * 1.6
  orbitRadius = baseOrbitRadius
  camera.near = Math.max(baseOrbitRadius / 500, 0.01)
  camera.far = baseOrbitRadius * 80
  camera.updateProjectionMatrix()
}

const handleResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const addFallbackMesh = () => {
  if (!scene) return
  const geo = new THREE.TorusKnotGeometry(0.65, 0.22, 160, 24)
  const mat = new THREE.MeshStandardMaterial({ color: '#8c9dff', metalness: 0.5, roughness: 0.22 })
  fallbackMesh = new THREE.Mesh(geo, mat)
  modelGroup = new THREE.Group()
  modelGroup.add(fallbackMesh)
  scene.add(modelGroup)
  fitToObject(modelGroup)
  modelGroup.rotation.y = -(60 * Math.PI / 180)
}

const setupScene = () => {
  if (!viewportRef.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  viewportRef.value.appendChild(renderer.domElement)

  scene.add(new THREE.HemisphereLight('#c8d8ff', '#0a0f20', 1.0))

  const key = new THREE.DirectionalLight('#ffffff', 1.4)
  key.position.set(4, 5, 3)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  scene.add(key)

  rimLight = new THREE.DirectionalLight(KEYFRAMES[0].rimHex, 1.1)
  rimLight.position.set(-3, 2, -5)
  scene.add(rimLight)

  window.addEventListener('resize', handleResize)
}

const loadStepModel = async () => {
  const occt = await initOcct({ locateFile: () => occtWasmUrl })
  const res = await fetch(props.modelUrl!)
  if (!res.ok) throw new Error(`Fetch ${res.status}`)
  const buffer = new Uint8Array(await res.arrayBuffer())
  const result: OcctResult = occt.ReadStepFile(buffer, null)
  if (!result.success) throw new Error('STEP parse failed')

  const palette = ['#8c9dff', '#ff9ad8', '#7ef7c8', '#ffd97d', '#c084fc']
  modelGroup = new THREE.Group()

  result.meshes.forEach((mesh, i) => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mesh.attributes.position.array), 3))
    if (mesh.attributes.normal)
      geo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(mesh.attributes.normal.array), 3))
    if (mesh.index)
      geo.setIndex(new THREE.BufferAttribute(new Uint32Array(mesh.index.array), 1))
    if (!mesh.attributes.normal) geo.computeVertexNormals()

    const rawColor = mesh.color
    const color = rawColor
      ? new THREE.Color(rawColor[0] / 255, rawColor[1] / 255, rawColor[2] / 255)
      : new THREE.Color(palette[i % palette.length])

    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, metalness: 0.35, roughness: 0.45 }))
    m.castShadow = true
    m.receiveShadow = true
    modelGroup!.add(m)
  })

  scene!.add(modelGroup)
  fitToObject(modelGroup)
  modelGroup.rotation.y = -(70 * Math.PI / 180)
  status.value = `Arduino UNO R3 · ${result.meshes.length} parts · STEP via WASM`
}

const loadModel = async () => {
  if (!props.modelUrl) { addFallbackMesh(); status.value = 'No model URL.'; return }
  const ext = props.modelUrl.split('.').pop()?.toLowerCase()
  const isStep = ext === 'stp' || ext === 'step' || ext === 'iges'
  try {
    if (isStep) {
      status.value = 'Parsing STEP via WebAssembly…'
      await loadStepModel()
    } else {
      const gltf = await new GLTFLoader().loadAsync(props.modelUrl)
      modelGroup = new THREE.Group()
      gltf.scene.traverse((n: THREE.Object3D) => {
        if (n instanceof THREE.Mesh) { n.castShadow = true; n.receiveShadow = true }
      })
      modelGroup.add(gltf.scene)
      scene!.add(modelGroup)
      fitToObject(modelGroup)
      modelGroup.rotation.y = -(75 * Math.PI / 180)
      status.value = 'Model loaded.'
    }
  } catch (err) {
    status.value = `Error: ${err instanceof Error ? err.message : String(err)}`
    addFallbackMesh()
  }
}

const onScroll = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const progress = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0

  const numSegments = KEYFRAMES.length - 1
  const scaled = progress * numSegments
  const idx = Math.min(Math.floor(scaled), numSegments - 1)
  const t = scaled - idx

  const a = KEYFRAMES[idx]
  const b = KEYFRAMES[idx + 1]

  scrollTargetPhi   = kfLerp(a.phi,   b.phi,   t)
  scrollTargetTheta = kfLerp(a.theta, b.theta, t)
  scrollTargetZoom  = kfLerp(a.zoom,  b.zoom,  t)
  scrollTargetPan   = kfLerp(a.pan,   b.pan,   t)
  scrollTargetRim.set(a.rimHex).lerp(new THREE.Color(b.rimHex), t)
}

const setupScrollListener = () => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // seed initial state
}

const startRenderLoop = () => {
  const tick = () => {
    animationHandle = requestAnimationFrame(tick)

    // All camera values chase the scroll-driven targets.
    // easing of 0.09 keeps it smooth but responsive — rewinds naturally on scroll-up.
    const easing = 0.09
    lerpPhi    += (scrollTargetPhi              - lerpPhi)    * easing
    orbitTheta += (scrollTargetTheta            - orbitTheta) * easing
    lerpZoom   += (scrollTargetZoom             - lerpZoom)   * easing
    lerpPanX   += (scrollTargetPan * baseOrbitRadius - lerpPanX) * easing
    orbitRadius = baseOrbitRadius * lerpZoom

    // Rim light color
    lerpRim.lerp(scrollTargetRim, easing)
    if (rimLight) rimLight.color.copy(lerpRim)

    // Position camera on sphere around model center
    if (camera) {
      camera.position.set(
        orbitCenter.x + orbitRadius * Math.sin(lerpPhi) * Math.cos(orbitTheta),
        orbitCenter.y + orbitRadius * Math.cos(lerpPhi),
        orbitCenter.z + orbitRadius * Math.sin(lerpPhi) * Math.sin(orbitTheta),
      )

      // Pan in screen-space: camera-right in the horizontal plane is (sin(theta), 0, -cos(theta)).
      // Negative pan shifts lookAt LEFT from camera → model appears RIGHT on screen.
      const screenRightX =  Math.sin(orbitTheta)
      const screenRightZ = -Math.cos(orbitTheta)
      const shiftedLookAt = new THREE.Vector3(
        orbitCenter.x + lerpPanX * screenRightX,
        orbitCenter.y - baseOrbitRadius * 0.30,
        orbitCenter.z + lerpPanX * screenRightZ,
      )
      camera.lookAt(shiftedLookAt)
    }



    renderer?.render(scene as THREE.Scene, camera as THREE.PerspectiveCamera)
  }
  tick()
}

const cleanup = () => {
  cancelAnimationFrame(animationHandle)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', onScroll)

  scene?.traverse((node: THREE.Object3D) => {
    if (!(node instanceof THREE.Mesh)) {
      return
    }

    node.geometry.dispose()
    if (Array.isArray(node.material)) {
      node.material.forEach((material: THREE.Material) => material.dispose())
      return
    }
    node.material.dispose()
  })

  renderer?.dispose()
  renderer?.domElement.remove()
}

onMounted(async () => {
  setupScene()
  await loadModel()
  setupScrollListener()
  startRenderLoop()
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<template>
  <div class="cad-bg" ref="viewportRef" aria-hidden="true">
    <p class="cad-status">{{ status }}</p>
  </div>
</template>

<style scoped>
.cad-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.cad-bg :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.cad-status {
  position: absolute;
  bottom: 20px;
  right: 24px;
  margin: 0;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(7, 14, 26, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(236, 238, 244, 0.08);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-size: 0.7rem;
  color: rgba(236, 238, 244, 0.5);
  white-space: nowrap;
}
</style>