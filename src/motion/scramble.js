const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#+_'

/*
 * Hovering a heading makes its letters churn for a moment before they settle.
 * Text only — these elements hold no child markup.
 */
export function initScramble({ enabled }) {
  if (!enabled) return () => {}

  const cleanups = []

  document.querySelectorAll('[data-scramble]').forEach((el) => {
    const original = el.textContent
    const chars = Array.from(original)
    let raf = 0

    const run = () => {
      cancelAnimationFrame(raf)
      let frame = 0
      const total = 16

      const tick = () => {
        frame += 1
        const settled = Math.floor((frame / total) * chars.length)
        el.textContent = chars
          .map((char, index) => {
            if (index < settled || char === ' ') return char
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')

        if (frame < total) {
          raf = requestAnimationFrame(tick)
        } else {
          el.textContent = original
        }
      }

      raf = requestAnimationFrame(tick)
    }

    el.addEventListener('pointerenter', run)
    cleanups.push(() => {
      el.removeEventListener('pointerenter', run)
      cancelAnimationFrame(raf)
      el.textContent = original
    })
  })

  return () => cleanups.forEach((fn) => fn())
}
