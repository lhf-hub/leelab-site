/**
 * A small dot and a lagging ring. Enabled only for fine pointers without
 * reduced-motion; disabled before first paint on every other device.
 */
export function initCursor({ enabled = true } = {}) {
  if (!enabled) return () => {}

  const dot = document.createElement('div')
  dot.className = 'cursor-dot'
  dot.setAttribute('aria-hidden', 'true')

  const ring = document.createElement('div')
  ring.className = 'cursor-ring'
  ring.setAttribute('aria-hidden', 'true')

  document.body.append(dot, ring)
  document.documentElement.classList.add('has-custom-cursor')

  const ac = new AbortController()
  const { signal } = ac

  let targetX = -120
  let targetY = -120
  let dotX = targetX
  let dotY = targetY
  let ringX = targetX
  let ringY = targetY
  let raf = 0
  let visible = false

  function frame() {
    raf = 0

    dotX += (targetX - dotX) * 0.55
    dotY += (targetY - dotY) * 0.55
    ringX += (targetX - ringX) * 0.16
    ringY += (targetY - ringY) * 0.16

    dot.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(
      2,
    )}px, 0) translate(-50%, -50%)`
    ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(
      2,
    )}px, 0) translate(-50%, -50%)`

    const settled =
      Math.abs(targetX - dotX) < 0.1 &&
      Math.abs(targetY - dotY) < 0.1 &&
      Math.abs(targetX - ringX) < 0.1 &&
      Math.abs(targetY - ringY) < 0.1

    if (!settled) raf = requestAnimationFrame(frame)
  }

  function start() {
    if (!raf) raf = requestAnimationFrame(frame)
  }

  function onMove(event) {
    targetX = event.clientX
    targetY = event.clientY

    if (!visible) {
      visible = true
      dot.classList.add('is-visible')
      ring.classList.add('is-visible')
    }

    start()
  }

  function hide() {
    visible = false
    dot.classList.remove('is-visible')
    ring.classList.remove('is-visible')
  }

  function onOver(event) {
    const target = event.target
    if (!(target instanceof Element)) return

    const card = target.closest('[data-card]')
    ring.classList.toggle('is-card', Boolean(card))
    ring.classList.toggle(
      'is-link',
      !card && Boolean(target.closest('a, button, [role="button"]')),
    )
  }

  function onDown() {
    ring.classList.add('is-down')
  }

  function onUp() {
    ring.classList.remove('is-down')
  }

  document.addEventListener('pointermove', onMove, { passive: true, signal })
  document.addEventListener('pointerover', onOver, { passive: true, signal })
  document.addEventListener('pointerdown', onDown, { passive: true, signal })
  document.addEventListener('pointerup', onUp, { passive: true, signal })
  document.documentElement.addEventListener('pointerleave', hide, { signal })
  window.addEventListener('blur', hide, { signal })
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) hide()
    },
    { signal },
  )

  return () => {
    ac.abort()
    if (raf) cancelAnimationFrame(raf)
    document.documentElement.classList.remove('has-custom-cursor')
    dot.remove()
    ring.remove()
  }
}
