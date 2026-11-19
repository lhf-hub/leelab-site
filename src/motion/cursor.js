/*
 * Two-part cursor: a signal dot that tracks exactly and a ring that lags.
 * Only on fine pointers; coarse pointers keep their native behaviour.
 */
export function initCursor({ enabled }) {
  if (!enabled) return () => {}

  const dot = document.createElement('div')
  const ring = document.createElement('div')
  dot.className = 'cursor-dot'
  ring.className = 'cursor-ring'
  dot.setAttribute('aria-hidden', 'true')
  ring.setAttribute('aria-hidden', 'true')
  document.body.append(dot, ring)
  document.documentElement.classList.add('has-custom-cursor')

  let x = window.innerWidth / 2
  let y = window.innerHeight / 2
  let rx = x
  let ry = y
  let raf = 0
  let visible = false

  const onMove = (event) => {
    x = event.clientX
    y = event.clientY
    if (!visible) {
      visible = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
  }

  const onOver = (event) => {
    const alive = event.target.closest('a, button, [data-card], [data-magnetic]')
    ring.classList.toggle('is-active', Boolean(alive))
  }

  const onLeave = () => {
    visible = false
    dot.style.opacity = '0'
    ring.style.opacity = '0'
  }

  dot.style.opacity = '0'
  ring.style.opacity = '0'

  const loop = () => {
    rx += (x - rx) * 0.16
    ry += (y - ry) * 0.16
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
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
  }
}
