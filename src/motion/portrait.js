import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { portrait } from '../data/site.js'

/*
 * The hero portrait: a lit 3D bust that reacts to the pointer and to scroll.
 * Loaded lazily, after the first paint. If the model is missing, a procedural
 * stand-in keeps the composition intact instead of leaving a hole.
 */

const noop = { setScroll() {}, destroy() {} }

const CAMERA_FOV = 30
const CAMERA_Z = 5.4

export function initPortrait({ mount, reduced }) {
  if (!mount) return noop
  // Phones get the type poster, not a WebGL scene: it is the same idea for a
  // fraction of the battery, and nothing overlaps the headline.
  if (window.matchMedia('(max-width: 1023px)').matches) return noop

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
  } catch (error) {
    return { destroy() {} }
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearAlpha(0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.06
  mount.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 40)
  camera.position.set(0, 0, CAMERA_Z)

  // Studio light: warm key from the right, data-green rim from behind-left.
  const key = new THREE.DirectionalLight(0xff7a52, 3.1)
  key.position.set(3.2, 2.4, 2.8)
  scene.add(key)

  const rim = new THREE.DirectionalLight(0x5cf0a8, 2.0)
  rim.position.set(-2.8, 1.2, -2.4)
  scene.add(rim)

  const fill = new THREE.DirectionalLight(0xa8c4ff, 0.7)
  fill.position.set(-3, -1.2, 2)
  scene.add(fill)

  scene.add(new THREE.HemisphereLight(0x2a1c16, 0x050403, 0.9))

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.06)
  scene.environment = envRT.texture
  scene.environmentIntensity = 0.32

  const pivot = new THREE.Group()
  scene.add(pivot)

  // Soft halo behind the model so it never floats on pure black.
  const halo = makeHalo()
  halo.position.set(0, 0.15, -1.2)
  scene.add(halo)

  let model = null
  let disposed = false
  let raf = 0
  let lastTime = performance.now()
  let startTime = lastTime

  const state = {
    pointerX: 0,
    pointerY: 0,
    targetX: 0,
    targetY: 0,
    scroll: 0,
    auto: 0,
  }

  function makeHalo() {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255, 110, 70, 0.55)')
    g.addColorStop(0.45, 'rgba(255, 90, 54, 0.16)')
    g.addColorStop(1, 'rgba(255, 90, 54, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const sprite = new THREE.Sprite(material)
    sprite.scale.setScalar(4.6)
    return sprite
  }

  function standIn() {
    const group = new THREE.Group()

    // A faceted metal object with an orbiting ring: a stand-in that reads as a
    // deliberate 3D piece until the portrait .glb is dropped in.
    const head = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 0x201914,
        metalness: 0.94,
        roughness: 0.24,
        flatShading: true,
        envMapIntensity: 1.5,
      }),
    )
    group.add(head)

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(head.geometry),
      new THREE.LineBasicMaterial({
        color: 0xff5a36,
        transparent: true,
        opacity: 0.45,
      }),
    )
    wire.scale.setScalar(1.004)
    group.add(wire)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.58, 0.005, 8, 160),
      new THREE.MeshBasicMaterial({
        color: 0x5cf0a8,
        transparent: true,
        opacity: 0.28,
      }),
    )
    ring.rotation.set(1.42, 0.2, 0.35)
    group.add(ring)

    return group
  }

  function fit(object) {
    const box = new THREE.Box3().setFromObject(object)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    object.position.sub(center)

    const target = 1.9 * (portrait.height / 0.78)
    const scale = target / Math.max(size.y, 0.0001)
    object.scale.setScalar(scale)

    const holder = new THREE.Group()
    holder.add(object)
    return holder
  }

  function renderOnce() {
    if (reduced) renderer.render(scene, camera)
  }

  function place() {
    if (!model) return
    const width = renderer.domElement.clientWidth || 1
    const height = renderer.domElement.clientHeight || 1
    const aspect = width / height
    const narrow = width < 860

    // Push the bust right of centre on wide screens, centre it on narrow ones.
    const x = narrow ? 0 : portrait.x
    const y = narrow ? -0.4 : -0.22
    pivot.position.set(x, y, 0)

    // Keep the head roughly the same share of the screen at any aspect.
    const fitScale = Math.min(1, Math.max(0.62, aspect / 1.6))
    pivot.scale.setScalar(narrow ? 0.92 : fitScale)
  }

  function resize() {
    const width = mount.clientWidth
    const height = mount.clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    place()
  }

  function loop() {
    if (disposed) return
    raf = requestAnimationFrame(loop)

    const now = performance.now()
    const dt = Math.min((now - lastTime) / 1000, 0.05)
    lastTime = now
    const elapsed = (now - startTime) / 1000
    state.auto += dt * 0.16

    state.targetX += (state.pointerX - state.targetX) * 0.045
    state.targetY += (state.pointerY - state.targetY) * 0.045

    const idle = Math.sin(elapsed * 0.5) * 0.022
    pivot.rotation.y = state.auto * 0.1 + state.targetX * 0.38 + state.scroll * 0.7
    pivot.rotation.x = -state.targetY * 0.18 + idle
    pivot.position.y = (mount.clientHeight < 860 ? -0.4 : -0.22) - state.scroll * 0.5

    renderer.render(scene, camera)
  }

  function onPointer(event) {
    const rect = mount.getBoundingClientRect()
    state.pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1
    state.pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1
  }

  function onVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
    } else if (!reduced && !raf) {
      loop()
    }
  }

  const loader = new GLTFLoader()
  loader.load(
    portrait.src,
    (gltf) => {
      if (disposed) return
      const scene3d = gltf.scene
      scene3d.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false
          child.receiveShadow = false
          if (child.material) {
            child.material.envMapIntensity = 0.55
          }
        }
      })
      model = fit(scene3d)
      pivot.add(model)
      place()
      renderOnce()
      mount.classList.add('is-ready')
    },
    undefined,
    () => {
      if (disposed) return
      model = fit(standIn())
      pivot.add(model)
      place()
      renderOnce()
      mount.classList.add('is-ready')
      mount.classList.add('is-standin')
    },
  )

  resize()
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('pointermove', onPointer, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)

  if (reduced) {
    // One static frame: no loop, no pointer response.
    place()
    renderer.render(scene, camera)
  } else {
    loop()
  }

  return {
    setScroll(progress) {
      state.scroll = progress
      if (reduced) renderer.render(scene, camera)
    },
    destroy() {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      if (model) {
        model.traverse?.((child) => {
          if (child.isMesh) {
            child.geometry?.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose())
            } else {
              child.material?.dispose()
            }
          }
        })
      }
      envRT.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
