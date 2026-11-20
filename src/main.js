import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/card.css'
import './styles/motion.css'

import { initSmoothScroll } from './motion/lenis.js'
import { initUI } from './motion/ui.js'
import { initTicker } from './motion/ticker.js'
import { initTypewriter } from './motion/typewriter.js'
import { initIntro } from './motion/intro.js'
import { initBoot } from './motion/boot.js'
import { initScroll } from './motion/scroll.js'
import { initMarquee } from './motion/marquee.js'
import { initScramble } from './motion/scramble.js'
import { initCursor } from './motion/cursor.js'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

const motion = !reduceMotion.matches
const fine = finePointer.matches

if (!motion) {
  document.documentElement.classList.remove('motion-ok')
}

const smooth = initSmoothScroll({ enabled: motion })

/*
 * The 3D portrait is a progressive layer: the page is complete without it, so
 * it is fetched once the curtain is up and the browser is idle.
 */
let portrait = null
let portraitDestroyed = false
let portraitScroll = 0
const stage = document.querySelector('[data-stage]')

function loadPortrait() {
  if (portraitDestroyed || !stage) return
  if (navigator.connection && navigator.connection.saveData) return

  import('./motion/portrait.js')
    .then(({ initPortrait }) => {
      if (portraitDestroyed) return
      portrait = initPortrait({ mount: stage, reduced: !motion })
      portrait.setScroll?.(portraitScroll)
    })
    .catch(() => {
      /* No WebGL: the page is still a poster. */
    })
}

const idle =
  'requestIdleCallback' in window
    ? (fn) => window.requestIdleCallback(fn, { timeout: 1600 })
    : (fn) => window.setTimeout(fn, 900)

/* ── opening sequence ────────────────────────────────────────────────────── */

const boot = initBoot({ enabled: motion })
const intro = initIntro({ enabled: motion })

boot.done.then(() => {
  intro.start()
  idle(loadPortrait)
})

/* ── everything else ─────────────────────────────────────────────────────── */

const ui = initUI({ finePointer: fine })
const ticker = initTicker({ reduced: !motion })
const type = initTypewriter({ reduced: !motion, startWhen: motion ? boot.done : null })
const marquee = initMarquee({ enabled: motion })
const scramble = initScramble({ enabled: motion && fine })
const scroll = initScroll({
  enabled: motion,
  onProgress: (progress) => {
    portraitScroll = progress
    portrait?.setScroll?.(progress)
    if (stage) {
      stage.style.opacity = progress > 0.55 ? String(Math.max(0, 1 - progress * 1.8)) : ''
    }
  },
})
const cursor = initCursor({ enabled: motion && fine })

/* Reduced motion never runs the scroll layer, so fade the stage out with a
   plain scroll listener instead. */
const heroSection = document.querySelector('.hero')
let stageFade = null
if (stage && heroSection && !motion) {
  const fade = () => {
    const height = heroSection.offsetHeight || 1
    const progress = Math.min(1, Math.max(0, window.scrollY / height))
    stage.style.opacity = String(Math.max(0, 1 - progress * 1.8))
  }
  fade()
  window.addEventListener('scroll', fade, { passive: true })
  stageFade = () => window.removeEventListener('scroll', fade)
}

const cleanups = [
  smooth.destroy,
  ui,
  ticker,
  type,
  marquee,
  scramble,
  intro.destroy,
  scroll,
  cursor,
  boot.destroy,
  () => stageFade?.(),
]

function cleanup() {
  portraitDestroyed = true
  portrait?.destroy?.()
  portrait = null
  while (cleanups.length) {
    const dispose = cleanups.pop()
    try {
      dispose?.()
    } catch (error) {
      /* One failing module must not strand the rest during HMR. */
    }
  }
}

if (import.meta.hot) {
  import.meta.hot.dispose(cleanup)
}
