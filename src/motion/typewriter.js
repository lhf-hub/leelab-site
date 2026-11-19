import { typewriter } from '../data/site.js'

/*
 * A single line typed and erased in place. Reduced motion gets the first line,
 * printed, no caret and no timers.
 */
export function initTypewriter({ reduced }) {
  const el = document.querySelector('[data-typewriter]')
  if (!el) return () => {}

  if (reduced) {
    el.textContent = typewriter[0]
    return () => {}
  }

  let line = 0
  let char = 0
  let deleting = false
  let timer = 0
  let killed = false

  const schedule = (delay) => {
    timer = window.setTimeout(step, delay)
  }

  const step = () => {
    if (killed) return
    const text = typewriter[line] || ''

    if (!deleting) {
      char += 1
      el.textContent = text.slice(0, char)
      if (char >= text.length) {
        deleting = true
        schedule(2200)
        return
      }
      schedule(26 + Math.random() * 20)
      return
    }

    char -= 1
    el.textContent = text.slice(0, Math.max(0, char))
    if (char <= 0) {
      deleting = false
      line = (line + 1) % typewriter.length
      schedule(320)
      return
    }
    schedule(16)
  }

  schedule(420)

  return () => {
    killed = true
    window.clearTimeout(timer)
    el.textContent = ''
  }
}
