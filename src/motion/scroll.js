import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

export function initScroll({ enabled = true, aurora } = {}) {
  if (!enabled) return () => {}

  const mm = gsap.matchMedia()

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 768px)',
    },
    (context) => {
      const { motion, desktop } = context.conditions
      if (!motion) return

      if (desktop) {
        gsap.to('.hero__title', {
          y: -48,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom 30%',
            scrub: 0.6,
          },
        })
      }

      gsap.utils.toArray('[data-card]').forEach((card) => {
        const shot = card.querySelector('.shot__parallax')
        const mini = card.querySelector('.mini')
        const shotImage = card.querySelector('.shot__parallax img')

        const cardTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: card,
            start: 'top 98%',
            once: true,
          },
        })

        cardTl.from(card, {
          y: 56,
          scale: 0.965,
          rotateX: desktop ? 6 : 0,
          opacity: 0,
          duration: 1.05,
        })

        if (shot) {
          cardTl.fromTo(
            shot,
            { clipPath: 'inset(9% 7% 9% 7% round 12px)' },
            {
              clipPath: 'inset(0% 0% 0% 0% round 12px)',
              duration: 1.15,
            },
            0.15,
          )
        }

        if (mini) {
          cardTl.from(mini, { opacity: 0, duration: 0.8 }, 0.55)
        }

        if (shotImage) {
          gsap.fromTo(
            shotImage,
            { y: desktop ? 14 : 8, scale: 1.04 },
            {
              y: desktop ? -14 : -8,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }
      })

      const reveals = [
        '.projects__rail .section-label',
        '.projects__title',
        '.projects__index',
        '.projects__more',
        '.about__rail .section-label',
        '.about__lead',
        '.about__quote',
        '.about__contact',
      ]

      reveals.forEach((selector) => {
        gsap.utils.toArray(selector).forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          })
        })
      })

      // The footer row sits in the last 10% of the page, so it needs the
      // footer itself as the trigger rather than its own top edge.
      gsap.from('.footer__brand, .footer__email, .footer__link', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 92%',
          once: true,
        },
      })

      const auroraTrigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => aurora?.setScroll(self.progress),
      })

      return () => {
        auroraTrigger.kill()
      }
    },
  )

  const refresh = () => {
    if (!ac.signal.aborted) ScrollTrigger.refresh()
  }
  const ac = new AbortController()

  window.addEventListener('load', refresh, { once: true, signal: ac.signal })

  if (document.readyState === 'complete') refresh()

  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {})
  }

  document.querySelectorAll('.shot img').forEach((shot) => {
    if (!shot.complete) {
      shot.addEventListener('load', refresh, { once: true, signal: ac.signal })
    }
  })

  return () => {
    ac.abort()
    mm.revert()
  }
}
