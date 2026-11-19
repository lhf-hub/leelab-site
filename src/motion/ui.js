import gsap from 'gsap'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function initUI({ lenis = null, motion = true, finePointer = false } = {}) {
  const root = document.documentElement
  const ac = new AbortController()
  const { signal } = ac

  /* Pause CSS loops when the tab is hidden. */
  const syncPageHidden = () => {
    root.classList.toggle('page-hidden', document.hidden)
  }
  syncPageHidden()
  document.addEventListener('visibilitychange', syncPageHidden, { signal })

  /* Compact header after the first scroll. */
  const header = document.querySelector('[data-header]')
  let headerPending = false
  const updateHeader = () => {
    headerPending = false
    header?.classList.toggle('is-scrolled', window.scrollY > 12)
  }
  const onScroll = () => {
    if (headerPending) return
    headerPending = true
    requestAnimationFrame(updateHeader)
  }
  updateHeader()
  window.addEventListener('scroll', onScroll, { passive: true, signal })

  /* Local time, stated as UTC+8 rather than implied. */
  const clock = document.querySelector('[data-clock]')
  let clockTimer = 0
  if (clock) {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Shanghai',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
    const tick = () => {
      const now = new Date()
      clock.textContent = format.format(now)
      clock.dateTime = now.toISOString()
    }
    tick()
    clockTimer = window.setInterval(tick, 15000)
  }

  /* Same-page anchors go through Lenis, with header clearance. Skip link stays native. */
  if (lenis && motion) {
    const onClick = (event) => {
      const targetEl = event.target
      if (!(targetEl instanceof Element)) return

      const link = targetEl.closest('a[href^="#"]')
      if (!link || link.classList.contains('skip-link')) return
      if (link.target === '_blank') return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()

      // Lenis already subtracts the document's scroll-padding-top, which is
      // what keeps anchors clear of the fixed header.
      lenis.scrollTo(target, { duration: 1.2 })

      if (hash !== window.location.hash) {
        history.pushState(null, '', hash)
      }
    }
    document.addEventListener('click', onClick, { signal })
  }

  /* Footer marquee: only runs while in view; the visitor can pause it. */
  const marquee = document.querySelector('[data-marquee]')
  const marqueeToggle = document.querySelector('[data-marquee-toggle]')
  const marqueeLabel = document.querySelector('[data-marquee-label]')
  let marqueeObserver = null

  if (marquee) {
    if ('IntersectionObserver' in window) {
      marqueeObserver = new IntersectionObserver(
        ([entry]) => {
          marquee.classList.toggle('is-active', entry.isIntersecting)
        },
        { threshold: 0.05 },
      )
      marqueeObserver.observe(marquee)
    } else {
      marquee.classList.add('is-active')
    }
  }

  if (marqueeToggle && marquee) {
    let paused = false
    marqueeToggle.addEventListener(
      'click',
      () => {
        paused = !paused
        marquee.classList.toggle('is-paused', paused)
        marqueeToggle.setAttribute('aria-pressed', String(paused))
        marqueeToggle.setAttribute(
          'aria-label',
          paused ? '继续滚动文字' : '暂停滚动文字',
        )
        if (marqueeLabel) marqueeLabel.textContent = paused ? '继续' : '暂停'
      },
      { signal },
    )
  }

  /* Magnetic CTAs: within 120px of the centre, never more than 8px. */
  const magnets = finePointer && motion ? gsap.utils.toArray('[data-magnetic]') : []
  let magnetRaf = 0
  let pointerX = 0
  let pointerY = 0

  const setters = magnets.map((el) => ({
    el,
    x: gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' }),
    y: gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' }),
  }))

  function resetMagnets() {
    setters.forEach(({ x, y }) => {
      x(0)
      y(0)
    })
  }

  function updateMagnets() {
    magnetRaf = 0
    const radius = 120
    const pull = 0.16
    const max = 8

    setters.forEach(({ el, x, y }) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = pointerX - cx
      const dy = pointerY - cy

      if (Math.hypot(dx, dy) < radius) {
        x(clamp(dx * pull, -max, max))
        y(clamp(dy * pull, -max, max))
      } else {
        x(0)
        y(0)
      }
    })
  }

  function onMagnetMove(event) {
    pointerX = event.clientX
    pointerY = event.clientY
    if (!magnetRaf) magnetRaf = requestAnimationFrame(updateMagnets)
  }

  if (setters.length) {
    window.addEventListener('pointermove', onMagnetMove, { passive: true, signal })
    window.addEventListener('blur', resetMagnets, { signal })
    document.documentElement.addEventListener('pointerleave', resetMagnets, {
      signal,
    })
  }

  return () => {
    ac.abort()
    if (clockTimer) window.clearInterval(clockTimer)
    marqueeObserver?.disconnect()

    if (magnetRaf) cancelAnimationFrame(magnetRaf)
    if (setters.length) {
      gsap.killTweensOf(magnets)
      magnets.forEach((el) => gsap.set(el, { clearProps: 'transform' }))
    }
  }
}
