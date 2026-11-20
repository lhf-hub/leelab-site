import gsap from 'gsap'

/*
 * The hero intro starts when the boot curtain begins to lift, so the first
 * thing anyone sees is type rising out of its masks.
 */
export function initIntro({ enabled }) {
  const root = document.documentElement
  const lines = Array.from(document.querySelectorAll('.hero__title .line > span'))
  const topline = document.querySelector('.hero__topline')
  const foot = document.querySelector('.hero__foot')

  if (!enabled) {
    root.classList.add('intro-done')
    return { start() {}, destroy() {} }
  }

  let tl = null
  let started = false
  let killed = false

  const start = () => {
    if (started || killed) return
    started = true

    const run = () => {
      if (killed) return
      tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => root.classList.add('intro-done'),
      })

      tl.to(lines, { y: 0, duration: 1.05, stagger: 0.075 }, 0)
      if (topline) tl.to(topline, { opacity: 1, duration: 0.7 }, 0.15)
      if (foot) tl.to(foot, { opacity: 1, duration: 0.8 }, 0.45)
    }

    // Waiting for the display face avoids a reflow mid-animation.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run).catch(run)
    } else {
      run()
    }
  }

  return {
    start,
    destroy() {
      killed = true
      tl?.kill()
    },
  }
}
