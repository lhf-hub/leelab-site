/**
 * Pointer-driven card tilt with shallow 3D layers. Runs for every project
 * card on fine pointers without reduced-motion. All motion is rAF +
 * transform; reading the card rect on pointermove is the only layout read.
 */
const MAX_X = 10
const MAX_Y = 9
const LIFT = -6
const LERP = 0.1
const MINI_RADIUS = 5

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function setupCard(card) {
  const plate = card.querySelector('.card__plate')
  if (!plate) return () => {}

  const mini = card.querySelector('.mini__parallax')
  const sheen = card.querySelector('.card__sheen')

  let raf = 0
  let hovering = false
  let cx = 0
  let cy = 0
  let lift = 0
  let tx = 0
  let ty = 0
  let targetLift = 0
  let nx = 0
  let ny = 0

  function frame() {
    raf = 0

    cx += (tx - cx) * LERP
    cy += (ty - cy) * LERP
    lift += (targetLift - lift) * LERP

    plate.style.transform = `translate3d(0, ${lift.toFixed(3)}px, 0) rotateX(${cy.toFixed(
      3,
    )}deg) rotateY(${cx.toFixed(3)}deg)`

    if (mini) {
      mini.style.transform = `translate3d(${(-nx * MINI_RADIUS).toFixed(2)}px, ${(
        -ny * MINI_RADIUS
      ).toFixed(2)}px, 0)`
    }

    const settled =
      Math.abs(tx - cx) < 0.01 &&
      Math.abs(ty - cy) < 0.01 &&
      Math.abs(targetLift - lift) < 0.01

    if (!settled) {
      raf = requestAnimationFrame(frame)
    } else if (!hovering) {
      plate.style.transform = ''
      plate.style.willChange = ''
      if (mini) mini.style.transform = ''
    }
  }

  function start() {
    if (!raf) raf = requestAnimationFrame(frame)
  }

  function onEnter() {
    hovering = true
    targetLift = LIFT
    card.classList.add('is-hovering')
    plate.style.willChange = 'transform'

    if (sheen) {
      sheen.classList.remove('is-sheening')
      // Force a reflow so a fast leave/enter replays the sweep.
      void sheen.offsetWidth
      sheen.classList.add('is-sheening')
    }

    start()
  }

  function onMove(event) {
    const rect = card.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    nx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
    ny = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)

    tx = nx * MAX_X
    ty = -ny * MAX_Y
    targetLift = LIFT

    card.style.setProperty('--mx', `${(nx + 1) * 50}%`)
    card.style.setProperty('--my', `${(ny + 1) * 50}%`)

    start()
  }

  function onLeave() {
    hovering = false
    nx = 0
    ny = 0
    tx = 0
    ty = 0
    targetLift = 0
    card.classList.remove('is-hovering')
    start()
  }

  function onSheenEnd() {
    sheen?.classList.remove('is-sheening')
  }

  card.addEventListener('pointerenter', onEnter)
  card.addEventListener('pointermove', onMove)
  card.addEventListener('pointerleave', onLeave)
  sheen?.addEventListener('animationend', onSheenEnd)

  return () => {
    card.removeEventListener('pointerenter', onEnter)
    card.removeEventListener('pointermove', onMove)
    card.removeEventListener('pointerleave', onLeave)
    sheen?.removeEventListener('animationend', onSheenEnd)
    if (raf) cancelAnimationFrame(raf)
    plate.style.transform = ''
    plate.style.willChange = ''
    if (mini) mini.style.transform = ''
    card.classList.remove('is-hovering')
    card.style.removeProperty('--mx')
    card.style.removeProperty('--my')
    if (sheen) sheen.classList.remove('is-sheening')
  }
}

export function initTilt({ enabled = true } = {}) {
  if (!enabled) return () => {}

  const cleanups = [...document.querySelectorAll('[data-card]')].map(setupCard)
  return () => cleanups.forEach((dispose) => dispose())
}
