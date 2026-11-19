import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

const VERTEX = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform vec3 uBg;
  uniform vec3 uCoral;
  uniform vec3 uAmber;
  uniform vec3 uGreen;
  uniform vec3 uBlue;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p = rot * p;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    vec2 p = uv * 1.1;
    p.y -= uScroll * 0.3;

    float t = uTime * 0.018;
    vec2 q = vec2(
      fbm(p + vec2(0.0, t)),
      fbm(p + vec2(5.2, 1.3) - t)
    );
    vec2 r = vec2(
      fbm(p + q * 1.4 + vec2(1.7, 9.2) + t * 0.5),
      fbm(p + q * 1.4 + vec2(8.3, 2.8) - t * 0.35)
    );

    float n1 = fbm(p + r * 1.5 + vec2(t * 0.4, -t * 0.2));
    float n2 = fbm(p * 1.6 + q * 1.2 - vec2(t * 0.3, t * 0.2) + 4.0);
    float n3 = fbm(p * 2.0 + r * 1.0 + vec2(0.0, t * 0.3) + 8.0);

    vec3 col = uBg;
    col = mix(col, uCoral, smoothstep(0.4, 0.88, n1) * 0.28);
    col = mix(col, uAmber, smoothstep(0.44, 0.95, n2) * 0.22);
    col = mix(col, uGreen, smoothstep(0.5, 1.0, n3) * 0.14);
    col = mix(col, uBlue, smoothstep(0.48, 0.95, 1.0 - n1) * 0.12);

    vec2 sunUv = vec2(0.72 * aspect, 0.72);
    float sun = smoothstep(0.65, 0.0, distance(uv, sunUv));
    col = mix(col, uAmber, sun * 0.17);

    float vig = smoothstep(1.25, 0.3, length(vUv - 0.5));
    col = mix(uBg, col, 0.22 + 0.78 * vig);

    col += (hash(gl_FragCoord.xy * 0.7) - 0.5) * 0.006;

    gl_FragColor = vec4(col, 1.0);
  }
`

const COLORS = {
  bg: [250 / 255, 247 / 255, 242 / 255],
  coral: [224 / 255, 122 / 255, 95 / 255],
  amber: [244 / 255, 162 / 255, 97 / 255],
  green: [4 / 255, 120 / 255, 87 / 255],
  blue: [91 / 255, 141 / 255, 184 / 255],
}

export function initAurora({ reduced = false } = {}) {
  const canvas = document.getElementById('aurora')
  if (!canvas) return { setScroll() {} }

  const noop = { setScroll() {} }
  const connection = navigator.connection
  const lowPower =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 2)

  if (reduced || connection?.saveData || lowPower) {
    return noop
  }

  let renderer

  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
  } catch (error) {
    return noop
  }

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uResolution: { value: new Vector2(1, 1) },
    uBg: { value: new Vector3(...COLORS.bg) },
    uCoral: { value: new Vector3(...COLORS.coral) },
    uAmber: { value: new Vector3(...COLORS.amber) },
    uGreen: { value: new Vector3(...COLORS.green) },
    uBlue: { value: new Vector3(...COLORS.blue) },
  }

  const material = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
    depthTest: false,
    depthWrite: false,
  })

  const geometry = new PlaneGeometry(2, 2)
  const mesh = new Mesh(geometry, material)
  mesh.frustumCulled = false
  scene.add(mesh)

  const root = document.documentElement
  const ac = new AbortController()
  const { signal } = ac

  let raf = 0
  let last = 0
  let elapsed = 0
  let ready = false
  let resizeTimer = 0

  function size() {
    const width = Math.min(window.innerWidth, 1600)
    const height = Math.max(
      1,
      Math.round(width * (window.innerHeight / window.innerWidth)),
    )

    const ratio = Math.min(1, Math.min(window.devicePixelRatio || 1, 1.5) * 0.65)

    renderer.setPixelRatio(ratio)
    renderer.setSize(width, height, false)
    uniforms.uResolution.value.set(width, height)
  }

  function draw() {
    renderer.render(scene, camera)
    if (!ready) {
      ready = true
      root.classList.add('webgl-ready')
    }
  }

  function frame(now) {
    raf = requestAnimationFrame(frame)

    const delta = now - last
    if (delta < 33) return
    last = now

    elapsed += Math.min(delta, 100) / 1000
    uniforms.uTime.value = elapsed
    draw()
  }

  function start() {
    if (raf || document.hidden) return
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }

  function stop() {
    if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  function onResize() {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      size()
      draw()
    }, 120)
  }

  function onVisibility() {
    if (document.hidden) stop()
    else start()
  }

  function onContextLost(event) {
    event.preventDefault()
    stop()
    root.classList.remove('webgl-ready')
  }

  size()
  draw()
  start()

  window.addEventListener('resize', onResize, { passive: true, signal })
  document.addEventListener('visibilitychange', onVisibility, { signal })
  canvas.addEventListener('webglcontextlost', onContextLost, false)

  return {
    setScroll(progress) {
      uniforms.uScroll.value = progress
    },
    destroy() {
      stop()
      ac.abort()
      window.clearTimeout(resizeTimer)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      root.classList.remove('webgl-ready')
    },
  }
}
