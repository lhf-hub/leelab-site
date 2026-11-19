import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSmoothScroll({ enabled = true } = {}) {
  if (!enabled) {
    return { lenis: null, scrollTo: null, destroy() {} }
  }

  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    autoRaf: false,
  })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)

  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return {
    lenis,
    scrollTo(target, options = {}) {
      lenis.scrollTo(target, options)
    },
    destroy() {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
      lenis.destroy()
    },
  }
}
