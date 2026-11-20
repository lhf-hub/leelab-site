/*
 * Cursor: a signal dot that tracks exactly, a ring that lags, and a label that
 * takes over on cards and links that ask for it with data-cursor="…".
 */
export function initCursor({ enabled }) {
  if (!enabled) return () => {}

  const dot = document.createElement('div')
  const ring = document.createElement('div')
  const label = document.createElement('div')
  dot.className = 'cursor-dot'
  ring.className = 'cursor-ring'
  label.className = 'cursor-label'

  ;[dot, ring, label].forEach((node) => {
    node.setAttribute('aria-hidden', 'true')
    document.body.appendChild(node)
  })
  document.documentElement.classList.add('has-custom-cursor')

  let x = window.innerWidth / 2
  let y = window.innerHeight / 2
  let rx = x
  let ry = y
  let raf = 0

  const show = (visible) => {
    dot.style.opacity = visible ? '1' : '0'
    ring.style.opacity = visible ? '1' : '0'
    if (!visible) label.classList.remove('is-on')
  }
  show(false)

  const onMove = (event) => {
    x = event.clientX
    y = event.clientY
    if (dot.style.opacity !== '1') show(true)
  }

  const onOver = (event) => {
    const target = event.target.closest('[data-cursor], a, button, [data-card]')
    const withLabel = event.target.closest('[data-cursor]')

    if (withLabel) {
      label.textContent = withLabel.getAttribute('data-cursor')
      label.classList.add('is-on')
      ring.classList.add('is-quiet')
      return
    }

    label.classList.remove('is-on')
    ring.classList.remove('is-quiet')
    ring.classList.toggle('is-active', Boolean(target))
  }

  const onLeave = () => show(false)

  const loop = () => {
    rx += (x - rx) * 0.16
    ry += (y - ry) * 0.16
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
    label.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerover', onOver, { passive: true })
  document.addEventListener('pointerleave', onLeave)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerover', onOver)
    document.removeEventListener('pointerleave', onLeave)
    document.documentElement.classList.remove('has-custom-cursor')
    dot.remove()
    ring.remove()
    label.remove()
  }
}
