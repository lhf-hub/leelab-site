import gsap from 'gsap'

/*
 * The hero is the first thing anyone sees, so the intro is short and decisive:
 * the four display lines rise out of their masks, then the lower register fades.
 */
export function initIntro({ enabled }) {
  const root = document.documentElement
  const lines = Array.from(document.querySelectorAll('.hero__title .line > span'))
  const topline = document.querySelector('.hero__topline')
  const foot = document.querySelector('.hero__foot')

  if (!enabled) {
    root.classList.add('intro-done')
    return () => {}
  }

  let tl = null
  let killed = false
  const start = () => {
    if (killed || !lines.length) return
    tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => root.classList.add('intro-done'),
    })

    tl.to(lines, { y: 0, duration: 1.05, stagger: 0.075 }, 0)

    if (topline) {
      tl.to(topline, { opacity: 1, duration: 0.7 }, 0.2)
    }
    if (foot) {
      tl.to(foot, { opacity: 1, duration: 0.8 }, 0.55)
    }
  }

  // Waiting for the display face avoids a reflow mid-animation.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(start).catch(start)
  } else {
    start()
  }

  return () => {
    killed = true
    tl?.kill()
  }
}
