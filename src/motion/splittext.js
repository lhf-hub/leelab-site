/*
 * Word-level split for display headings. Whitespace between words is kept as a
 * text node so inline-block masks still lay out with real spaces; inline
 * elements such as <em> are wrapped as a single masked unit.
 *
 * Only used when motion is allowed — the untouched heading is the fallback.
 */

function makeWord(text) {
  const outer = document.createElement('span')
  outer.className = 'sw'
  const inner = document.createElement('span')
  inner.className = 'swi'
  inner.textContent = text
  outer.appendChild(inner)
  return outer
}

function wrapNode(node, frag) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent
    if (!text) return
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part))
      } else {
        frag.appendChild(makeWord(part))
      }
    })
    return
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return

  if (node.tagName === 'BR') {
    frag.appendChild(document.createElement('br'))
    return
  }

  const outer = document.createElement('span')
  outer.className = 'sw'
  const inner = document.createElement('span')
  inner.className = 'swi'
  inner.appendChild(node.cloneNode(true))
  outer.appendChild(inner)
  frag.appendChild(outer)
}

export function initSplit(selector = '[data-split]') {
  const targets = []

  document.querySelectorAll(selector).forEach((el) => {
    if (el.dataset.splitDone === 'true') return
    if (el.querySelector('.sw')) return

    const frag = document.createDocumentFragment()
    Array.from(el.childNodes).forEach((child) => wrapNode(child, frag))
    el.replaceChildren(frag)
    el.dataset.splitDone = 'true'
    el.classList.add('is-split')
    targets.push(el)
  })

  return targets
}
