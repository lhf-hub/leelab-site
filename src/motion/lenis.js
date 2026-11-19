export function initSmoothScroll({ enabled }) {
  if (!enabled) {
    return { lenis: null, destroy() {} }
  }

  let lenis = null
  let destroyed = false

  /*
   * Lenis is only needed for smooth wheel/touch scrolling. Importing it lazily
   * keeps the entry bundle honest for reduced-motion visitors.
   */
  import('lenis')
    .then(({ default: Lenis }) => {
      if (destroyed) return
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      })

      let raf = 0
      const loop = (time) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      lenis._raf = raf
    })
    .catch(() => {
      /* Native scrolling is still fine. */
    })

  return {
    get lenis() {
      return lenis
    },
    destroy() {
      destroyed = true
      if (lenis) {
        cancelAnimationFrame(lenis._raf)
        lenis.destroy()
        lenis = null
      }
    },
  }
}
