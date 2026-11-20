import { demo } from '../data/site.js'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

/*
 * The salary readout is the product's one live number: it counts up the first
 * time it is seen, then ticks in real time. It stops off-screen or hidden.
 */
export function initTicker({ reduced }) {
  const el = document.querySelector('[data-ticker-amount]')
  if (!el) return () => {}

  let value = 0
  const render = () => {
    el.textContent = `¥${formatter.format(value)}`
  }

  if (reduced) {
    value = demo.monthly
    render()
    return () => {}
  }

  let raf = 0
  let last = 0
  let onScreen = false
  let counted = false
  let countStart = 0

  const COUNT_MS = 1500

  const step = (now) => {
    if (!countStart) countStart = now

    if (!counted) {
      const progress = Math.min(1, (now - countStart) / COUNT_MS)
      value = demo.monthly * easeOut(progress)
      if (progress >= 1) {
        counted = true
        value = demo.monthly
        last = now
      }
    } else {
      const dt = Math.min((now - last) / 1000, 0.2)
      last = now
      value += demo.perSecond * dt
    }

    render()
    raf = requestAnimationFrame(step)
  }

  const stop = () => {
    cancelAnimationFrame(raf)
    raf = 0
    last = 0
  }

  const sync = () => {
    const visible = onScreen && !document.hidden
    if (visible && !raf) {
      raf = requestAnimationFrame(step)
    } else if (!visible && raf) {
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

  render()

  return () => {
    stop()
    io.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
