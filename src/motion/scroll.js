import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSplit } from './splittext.js'

gsap.registerPlugin(ScrollTrigger)

/*
 * All scroll choreography lives here: header state, progress, split-headline
 * reveals, the hero hand-off, the sticky work stack, and window wipes.
 * Nothing animates layout; only transform, opacity and clip-path.
 */
export function initScroll({ enabled, onProgress }) {
  if (!enabled) return () => {}

  const cleanups = []
  const push = (fn) => cleanups.push(fn)

  /* ── split headlines ───────────────────────────────────────────────────── */

  initSplit('[data-split]').forEach((el) => {
    const words = el.querySelectorAll('.swi')
    const tween = gsap.fromTo(
      words,
      { yPercent: 118 },
      {
        yPercent: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.035,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onComplete: () => el.classList.add('is-split-done'),
      },
    )
    push(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  })

  /* ── velocity: everything tilts a little when the page moves fast ──────── */

  const skewEls = gsap.utils.toArray('[data-skew]')
  if (skewEls.length) {
    const setters = skewEls.map((el) =>
      gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3' }),
    )
    let lastMove = 0
    let tilted = false

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const tilt = gsap.utils.clamp(-4.5, 4.5, self.getVelocity() / 420)
        setters.forEach((set) => set(tilt))
        lastMove = performance.now()
        tilted = true
      },
    })

    // ScrollTrigger stops reporting the moment scrolling does, so settle back.
    const settle = () => {
      if (!tilted) return
      if (performance.now() - lastMove > 130) {
        tilted = false
        setters.forEach((set) => set(0))
      }
    }
    gsap.ticker.add(settle)

    push(() => {
      trigger.kill()
      gsap.ticker.remove(settle)
    })
  }

  /* ── generic fades ─────────────────────────────────────────────────────── */

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    )
    push(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  })

  /* ── hero hand-off: the statement drifts apart as the portrait leaves ──── */

  const hero = document.querySelector('.hero')
  if (hero) {
    const lines = hero.querySelectorAll('.hero__title .line')
    const foot = hero.querySelector('.hero__foot')
    const topline = hero.querySelector('.hero__topline')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7,
      },
    })

    if (lines.length === 4) {
      tl.to(lines[0], { xPercent: -7, opacity: 0.25 }, 0)
        .to(lines[1], { xPercent: 4, opacity: 0.25 }, 0)
        .to(lines[2], { xPercent: -4, opacity: 0.25 }, 0)
        .to(lines[3], { xPercent: 8, opacity: 0.25 }, 0)
    } else if (lines.length) {
      tl.to(lines, { yPercent: -14, opacity: 0.2, stagger: 0.02 }, 0)
    }

    if (topline) tl.to(topline, { opacity: 0, y: -18 }, 0)
    if (foot) tl.to(foot, { opacity: 0, y: -26 }, 0.1)

    push(() => {
      tl.scrollTrigger?.kill()
      tl.kill()
    })

    const heroTrigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => onProgress?.(self.progress),
    })
    push(() => heroTrigger.kill())
  }

  /* ── the sticky work stack ─────────────────────────────────────────────── */

  const cards = gsap.utils.toArray('.work-card')
  cards.forEach((card, index) => {
    const next = cards[index + 1]
    if (!next) return

    const tween = gsap.to(card, {
      scale: 0.945,
      opacity: 0.45,
      transformOrigin: 'center top',
      ease: 'none',
      scrollTrigger: {
        trigger: next,
        start: 'top 95%',
        end: 'top 40%',
        scrub: true,
      },
    })
    push(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  })

  /* ── product windows: wipe in, then drift with the page ────────────────── */

  document.querySelectorAll('.work-card__visual').forEach((visual) => {
    const win = visual.querySelector('.window')
    if (!win) return

    const wipe = gsap.fromTo(
      win,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.15,
        ease: 'power4.out',
        scrollTrigger: { trigger: win, start: 'top 92%', once: true },
        onComplete: () => gsap.set(win, { clearProps: 'clipPath' }),
      },
    )

    const drift = gsap.fromTo(
      visual,
      { yPercent: 3.4 },
      {
        yPercent: -3.4,
        ease: 'none',
        scrollTrigger: {
          trigger: visual.closest('.work-card') || visual,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    )

    push(() => {
      wipe.scrollTrigger?.kill()
      wipe.kill()
      drift.scrollTrigger?.kill()
      drift.kill()
    })
  })

  /* ── about facts: a small cascade ──────────────────────────────────────── */

  const facts = document.querySelectorAll('.about__facts .fact')
  if (facts.length) {
    const tween = gsap.fromTo(
      facts,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.055,
        scrollTrigger: { trigger: '.about__facts', start: 'top 88%', once: true },
      },
    )
    push(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  }

  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh, { once: true })
  push(() => window.removeEventListener('load', refresh))

  return () => {
    cleanups.forEach((fn) => {
      try {
        fn()
      } catch (error) {
        /* keep tearing down */
      }
    })
  }
}
