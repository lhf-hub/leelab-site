import gsap from 'gsap'

/*
 * The opening curtain. It is deliberately short: a counter to 100 while fonts
 * resolve, then the sheet lifts and the hero intro starts underneath it.
 */
export function initBoot({ enabled }) {
  if (!enabled) {
    return { done: Promise.resolve(), destroy() {} }
  }

  const el = document.createElement('div')
  el.className = 'boot'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = `
    <div class="boot__top">
      <span class="boot__brand">Lee<sup>®</sup></span>
      <span class="boot__meta">leelab.com.cn</span>
    </div>
    <div class="boot__mid">
      <span class="boot__count" data-boot-count>000</span>
      <span class="boot__label">Loading portrait</span>
    </div>
    <div class="boot__bar"><span data-boot-bar></span></div>
  `
  document.body.appendChild(el)
  document.documentElement.classList.add('is-booting')

  const count = el.querySelector('[data-boot-count]')
  const bar = el.querySelector('[data-boot-bar]')
  const state = { v: 0 }

  let resolveDone
  const done = new Promise((resolve) => {
    resolveDone = resolve
  })

  const finish = () => {
    el.remove()
    document.documentElement.classList.remove('is-booting')
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: finish,
  })

  tl.to(
    state,
    {
      v: 100,
      duration: 0.8,
      onUpdate: () => {
        count.textContent = String(Math.round(state.v)).padStart(3, '0')
      },
    },
    0,
  )
    .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 0)
    .call(() => resolveDone(), undefined, 0.84)
    .to(el, { yPercent: -100, duration: 0.72, ease: 'power4.inOut' }, 0.84)

  return {
    done,
    destroy() {
      tl.kill()
      finish()
      resolveDone?.()
    },
  }
}
