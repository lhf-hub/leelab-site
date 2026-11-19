import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/card.css'
import './styles/motion.css'

import { initSmoothScroll } from './motion/lenis.js'
import { initUI } from './motion/ui.js'
import { initTicker } from './motion/ticker.js'
import { initIntro } from './motion/intro.js'
import { initScroll } from './motion/scroll.js'
import { initTilt } from './motion/tilt.js'
import { initCursor } from './motion/cursor.js'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

const motion = !reduceMotion.matches
const fine = finePointer.matches

// The head script skips this class for reduced motion, but a settings change
// between parse and module execution should never leave the poster hidden.
if (!motion) {
  document.documentElement.classList.remove('motion-ok')
}

const smooth = initSmoothScroll({ enabled: motion })

/*
 * The WebGL aurora is a progressive layer: the CSS fallback paints the first
 * viewport, and the Three chunk is fetched on the first real interaction so it
 * never competes with the initial paint. It is never loaded for reduced-motion
 * or data-saver visitors.
 */
let aurora = null
let auroraScroll = 0
let auroraAborted = false
const auroraTrigger = new AbortController()

const auroraProxy = {
  setScroll(progress) {
    auroraScroll = progress
    aurora?.setScroll(progress)
  },
  destroy() {
    auroraAborted = true
    auroraTrigger.abort()
    aurora?.destroy?.()
    aurora = null
  },
}

function loadAurora() {
  if (auroraAborted) return

  import('./motion/shader.js')
    .then(({ initAurora }) => {
      if (auroraAborted) return
      aurora = initAurora({ reduced: false })
      aurora.setScroll(auroraScroll)
    })
    .catch(() => {
      // The CSS fallback is already doing the job.
    })
}

const canLoadAurora =
  motion && !(navigator.connection && navigator.connection.saveData)

if (canLoadAurora) {
  const startAurora = () => {
    auroraTrigger.abort()
    loadAurora()
  }

  ;['pointermove', 'touchstart', 'keydown', 'scroll', 'wheel'].forEach((event) => {
    window.addEventListener(event, startAurora, {
      once: true,
      passive: true,
      signal: auroraTrigger.signal,
    })
  })
}

const ui = initUI({
  lenis: smooth.lenis,
  motion,
  finePointer: fine,
})
const ticker = initTicker({ reduced: !motion })
const intro = initIntro({ enabled: motion })
const scroll = initScroll({ enabled: motion, aurora: auroraProxy })
const tilt = initTilt({ enabled: motion && fine })
const cursor = initCursor({ enabled: motion && fine })

const cleanups = [
  smooth.destroy,
  auroraProxy.destroy,
  ui,
  ticker,
  intro,
  scroll,
  tilt,
  cursor,
]

function cleanup() {
  while (cleanups.length) {
    const dispose = cleanups.pop()
    try {
      dispose?.()
    } catch (error) {
      // One failing module must not strand the rest during HMR.
    }
  }
}

if (import.meta.hot) {
  import.meta.hot.dispose(cleanup)
}
