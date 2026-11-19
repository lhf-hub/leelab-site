import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * Scroll is used for three things only: the header state, section reveals, and
 * the hero → portrait handoff. Nothing scrubs a layout property.
 */
export function initScroll({ enabled, onProgress }) {
  if (!enabled) return () => {}

  const cleanups = []
  const header = document.querySelector('[data-header]')

  const headerTrigger = ScrollTrigger.create({
    start: 12,
    end: 'max',
    onToggle: (self) => header?.classList.toggle('is-scrolled', self.isActive),
  })
  cleanups.push(() => headerTrigger.kill())

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      },
    )
    cleanups.push(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  })

  const hero = document.querySelector('.hero')
  if (hero) {
    const heroTrigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => onProgress?.(self.progress),
    })
    cleanups.push(() => heroTrigger.kill())
  }

  // The product windows drift a little slower than the page: depth without cost.
  document.querySelectorAll('.window').forEach((win) => {
    const tween = gsap.fromTo(
      win,
      { yPercent: 3.2 },
      {
        yPercent: -3.2,
        ease: 'none',
        scrollTrigger: {
          trigger: win.closest('.work-card') || win,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    )
    cleanups.push(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  })

  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh, { once: true })
  cleanups.push(() => window.removeEventListener('load', refresh))

  return () => {
    cleanups.forEach((fn) => {
      try {
        fn()
      } catch (error) {
        /* keep tearing down */
      }
    })
  }
}
