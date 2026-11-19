import gsap from 'gsap'

/**
 * One authored opening: header, eyebrow, the two title lines, the drawn
 * underline, then the supporting copy. The card gets its own entrance when
 * it comes into view, so it never animates unseen below the fold.
 */
export function initIntro({ enabled = true } = {}) {
  if (!enabled) return () => {}

  const root = document.documentElement
  const lines = gsap.utils.toArray('.hero__title .line__inner')
  lines.forEach((line) => {
    line.style.willChange = 'transform'
  })

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        root.classList.add('intro-done')
        root.classList.remove('motion-fallback')
        lines.forEach((line) => {
          line.style.willChange = ''
        })
      },
    })

    tl.to('.site-header', { y: 0, opacity: 1, duration: 0.8 }, 0)
      .to(
        '.hero__eyebrow',
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power2.inOut',
        },
        0.15,
      )
      .to(lines, { y: 0, duration: 1.05, stagger: 0.09 }, 0.2)
      .to(
        '.title-underline path',
        {
          strokeDashoffset: 0,
          duration: 1.05,
          ease: 'power2.inOut',
        },
        0.85,
      )
      .to('.hero__clock', { y: 0, opacity: 1, duration: 0.8 }, 0.55)
      .to('.hero__intro', { y: 0, opacity: 1, duration: 0.8 }, 0.68)
      .to('.hero__actions', { y: 0, opacity: 1, duration: 0.8 }, 0.76)
      .to(
        '.hero__aside .hero__meta-line',
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
        0.8,
      )
      .to('.hero__meta', { y: 0, opacity: 1, duration: 0.8 }, 0.86)
      .to('.hero__links', { y: 0, opacity: 1, duration: 0.8 }, 0.95)
      .to(
        '.hero__divider .quad-line',
        { scaleX: 1, duration: 1.1, ease: 'power3.inOut' },
        0.55,
      )
  }, root)

  return () => {
    ctx.revert()
    lines.forEach((line) => {
      line.style.willChange = ''
    })
  }
}
