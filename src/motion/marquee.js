import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * The footer marquee runs on its own clock and takes a hit from scroll
 * velocity: fast scrolling speeds it up, scrolling back up reverses it.
 */
export function initMarquee({ enabled }) {
  const track = document.querySelector('.marquee__track')
  if (!track) return () => {}

  const group = track.querySelector('.marquee__group')
  if (!group) return () => {}

  let width = group.getBoundingClientRect().width
  let x = 0
  let boost = 0
  let raf = 0
  let last = performance.now()

  const setX = gsap.quickSetter(track, 'x', 'px')

  if (!enabled) {
    // Reduced motion: the CSS fallback already turns this into a static block.
    return () => {}
  }

  track.style.animation = 'none'

  const measure = () => {
    width = group.getBoundingClientRect().width
  }

  const ro = new ResizeObserver(measure)
  ro.observe(group)

  const tick = () => {
    const now = performance.now()
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now

    boost *= 0.93
    x -= (64 + boost) * dt
    if (width > 0) {
      if (x <= -width) x += width
      if (x > 0) x -= width
    }
    setX(x)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  const trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      boost = gsap.utils.clamp(-900, 900, self.getVelocity() * 0.32)
    },
  })

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    trigger.kill()
    track.style.animation = ''
  }
}
