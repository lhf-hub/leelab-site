/*
 * Small interface behaviours: the UTC+8 clock, magnetic buttons, and the
 * pointer light inside the work cards.
 */
export function initUI({ finePointer }) {
  const cleanups = []

  /* clock — always UTC+8, whatever the visitor's zone */
  const clock = document.querySelector('[data-clock]')
  if (clock) {
    const render = () => {
      const now = new Date()
      const utc8 = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 8 * 3600000)
      const hh = String(utc8.getHours()).padStart(2, '0')
      const mm = String(utc8.getMinutes()).padStart(2, '0')
      clock.textContent = `${hh}:${mm}`
    }
    render()
    const id = window.setInterval(render, 15000)
    cleanups.push(() => window.clearInterval(id))
  }

  /* magnetic buttons: at most 8px of pull */
  if (finePointer) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const onMove = (event) => {
        const rect = el.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        const dist = Math.hypot(dx, dy)
        if (dist > 120) {
          el.style.transform = ''
          return
        }
        const pull = 1 - dist / 120
        el.style.transform = `translate(${(dx / 120) * 8 * pull}px, ${(dy / 120) * 8 * pull}px)`
      }
      const reset = () => {
        el.style.transform = ''
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', reset)
      cleanups.push(() => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', reset)
        el.style.transform = ''
      })
    })
  }

  /* pointer light in the work cards */
  document.querySelectorAll('[data-card]').forEach((card) => {
    const onMove = (event) => {
      const rect = card.getBoundingClientRect()
      const mx = ((event.clientX - rect.left) / rect.width) * 100
      const my = ((event.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mx', `${mx}%`)
      card.style.setProperty('--my', `${my}%`)
      card.classList.add('is-hot')
    }
    const onLeave = () => card.classList.remove('is-hot')

    card.addEventListener('pointermove', onMove, { passive: true })
    card.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      card.removeEventListener('pointermove', onMove)
      card.removeEventListener('pointerleave', onLeave)
      card.classList.remove('is-hot')
    })
  })

  return () => cleanups.forEach((fn) => fn())
}
