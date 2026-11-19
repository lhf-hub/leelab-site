import { site } from '../data/site.js'

/**
 * The number accrues only while the card is on screen and the tab is
 * visible, so returning to the page continues instead of jumping. The
 * markup already carries the base value for no-JS and reduced-motion.
 */
export function initTicker({ reduced = false } = {}) {
  const el = document.querySelector('[data-ticker-amount]')
  if (!el) return () => {}

  const { base, perSecond } = site.salaryTicker
  const format = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const value = () => `¥${format.format(base + perSecond * elapsed)}`
  let elapsed = 0
  let lastText = ''

  function paint() {
    const next = value()
    if (next !== lastText) {
      el.textContent = next
      lastText = next
    }
  }

  if (reduced) {
    paint()
    return () => {}
  }

  const card = document.querySelector('[data-card]')
  let visible = true
  let last = performance.now()
  let timer = 0
  let observer = null

  function step() {
    const now = performance.now()
    const delta = Math.min(now - last, 1000)
    last = now

    if (!document.hidden && visible) {
      elapsed += delta / 1000
    }

    paint()
  }

  function start() {
    last = performance.now()
    if (!timer) timer = window.setInterval(step, 200)
  }

  function stop() {
    if (timer) {
      window.clearInterval(timer)
      timer = 0
    }
  }

  function onVisibility() {
    if (document.hidden) {
      stop()
    } else {
      last = performance.now()
      start()
    }
  }

  if ('IntersectionObserver' in window && card) {
    observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0.05 },
    )
    observer.observe(card)
  }

  document.addEventListener('visibilitychange', onVisibility)
  start()

  return () => {
    stop()
    observer?.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
