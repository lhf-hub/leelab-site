import { demo } from '../data/site.js'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/*
 * The salary readout is the product's one live number. It ticks while it is on
 * screen, stops when the tab is hidden, and never pretends to be real pay.
 */
export function initTicker({ reduced }) {
  const el = document.querySelector('[data-ticker-amount]')
  if (!el) return () => {}

  let value = demo.monthly
  const render = () => {
    el.textContent = `¥${formatter.format(value)}`
  }

  if (reduced) {
    render()
    return () => {}
  }

  let raf = 0
  let last = 0
  let onScreen = true

  const step = (now) => {
    if (!last) last = now
    const dt = Math.min((now - last) / 1000, 0.2)
    last = now
    value += demo.perSecond * dt
    render()
    raf = requestAnimationFrame(step)
  }

  const stop = () => {
    cancelAnimationFrame(raf)
    raf = 0
    last = 0
  }

  const sync = () => {
    if (onScreen && !document.hidden && !raf) {
      raf = requestAnimationFrame(step)
    } else if ((!onScreen || document.hidden) && raf) {
      stop()
    }
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    },
    { threshold: 0 },
  )
  io.observe(el)

  const onVisibility = () => sync()
  document.addEventListener('visibilitychange', onVisibility)
  sync()

  return () => {
    stop()
    io.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
