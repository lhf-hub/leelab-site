---
name: leelab-site
description: Dark, motion-first personal site for Lee / leelab
colors:
  ground: "#080706"
  ground-raised: "#100E0C"
  ground-sink: "#050403"
  ink: "#F4EFE7"
  ink-dim: "rgba(244, 239, 231, 0.62)"
  ink-faint: "rgba(244, 239, 231, 0.34)"
  line: "rgba(244, 239, 231, 0.13)"
  line-strong: "rgba(244, 239, 231, 0.28)"
  signal: "#FF5A36"
  signal-soft: "rgba(255, 90, 54, 0.16)"
  data: "#5CF0A8"
  warn: "#FFB45F"
typography:
  display:
    fontFamily: '"anton", "Impact", "Arial Narrow Bold", sans-serif'
    fontSize: "clamp(3.7rem, 10.6vw, 12.5rem)"
    lineHeight: 0.82
    letterSpacing: "-0.015em"
  mega:
    fontFamily: '"anton", "Impact", sans-serif'
    fontSize: "clamp(2.6rem, 7.2vw, 7.5rem)"
    lineHeight: 0.86
  body:
    fontFamily: '"inter", "Noto Sans SC", "Microsoft YaHei UI", "PingFang SC", sans-serif'
    fontSize: "clamp(1rem, 1.1vw, 1.125rem)"
    lineHeight: 1.62
  mono:
    fontFamily: '"plexmono", "SF Mono", "Cascadia Mono", monospace'
    fontSize: "0.6875rem"
    letterSpacing: "0.22em"
rounded:
  sm: "10px"
  md: "18px"
  lg: "26px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "1px solid {colors.line-strong}"
  work-card:
    backgroundColor: "linear-gradient(165deg, #12100D, #080706)"
    rounded: "{rounded.lg}"
    padding: "clamp(20px, 2.4vw, 38px)"
  readout:
    backgroundColor: "rgba(92, 240, 168, 0.03)"
    border: "1px solid rgba(92, 240, 168, 0.22)"
    rounded: "{rounded.md}"
---

# Design System: leelab-site (v3)

## Overview

**Creative North Star: "Full-volume poster on a dark stage."**

The page is a dark studio with one object lit in it: a 3D portrait on the right, poster-scale type on the left, and a single signal colour cutting through both. Type is the subject — Anton at poster size, with Inter carrying the reading copy and IBM Plex Mono carrying every measurement, state and number.

Two reference behaviours define it:

- **Mainframe / 3D Character Studio**: full-bleed dark hero, small mono labels, a character that occupies half the screen, typewriter line, pill CTAs.
- **3D Jack Portfolio**: an enormous name statement with the 3D head layered in front of the type.

Everything else stays quiet: grain, one soft coral glow, hairlines, and a marquee that behaves like a printed strip.

**Key characteristics**

- Warm black ground (`#080706`), never blue-black, never pure `#000`.
- One signal colour (coral `#FF5A36`) used for punctuation, rules, states and the arrow fills.
- Data green (`#5CF0A8`) is reserved for money and only money.
- Anton for statements; Inter for reading; Plex Mono for anything measured.
- 1px hairlines instead of shadows; depth comes from the 3D object and the glow.
- Every motion has a reduced-motion result; nothing is required for comprehension.

## Colour rules

- **Signal is punctuation, not paint.** Coral marks a period, an eyebrow index, a status dot, an arrow, a card's pointer light. It never fills a text block.
- **Green is money.** `#5CF0A8` appears on the monthly readout, the per-second rate and the demo badge's neighbours. Nothing else.
- **Amber is only the "not shipped yet" state** (JobPilot demo / pending).
- **No gradients on text, no glass except the scrolled header.** Blur is a legibility device over moving content only.

## Typography

- **Display** — Anton, uppercase, `line-height: 0.82`, `letter-spacing: -0.015em`. The hero statement is four short lines so each line can grow to `10.6vw` without wrapping. Section statements are two lines, the second line in coral.
- **Body** — Inter 400/500; Chinese falls back to Noto Sans SC / Microsoft YaHei. English leads; Chinese follows as a smaller companion line (`.hero__cn`, `.work-card__cn`, `.section-head__cn`).
- **Mono** — IBM Plex Mono for labels, specs, breadcrumbs, the money figure and footer meta. Labels are `11px / 0.22em / uppercase`.
- **Numbers are tabular.** The salary readout uses `font-variant-numeric: tabular-nums` so a ticking value never reflows.

## Layout

- Container `min(100%, 1440px)` with `--edge` gutters (`clamp(20px, 4.4vw, 68px)`).
- Hero is `min-height: 100svh`, content bottom-aligned on desktop, vertically centred at ≤1024px where the 3D stage is off.
- Work section: full-width section head (label / two-line statement / Chinese line / right-side index), then stacked cards. Each card is a two-column grid: copy left, product window right; the window drops above the copy at ≤980px.
- About: 5fr / 7fr split (copy / spec table), collapsing to one column at ≤1024px.
- Contact: statement, then the email as the largest interactive element on the page.

## Components

### Hero

- Topline: `Independent developer / 独立开发者` left, `UTC+8 HH:MM` right with a live green dot.
- Statement: four Anton lines; final period in coral.
- Foot: typewriter line (mono, uppercase, 4 rotating sentences), Chinese companion line, two pill CTAs (solid ink + ghost), and a right-aligned meta column (`Open for small projects`, `Two products shipped`, `Scroll`).
- The 3D canvas is fixed above the type (`z-index: 1`), so the object can overlap the statement; it fades out as the hero leaves.

### Work card

- One `<a>` per card, `aria-describedby` carries the new-tab / demo note.
- Kicker row: index (coral), platform, status (`Shipped` green dot / `Private beta` amber dot).
- Title: Anton, `clamp(2.4rem, 5.4vw, 5.4rem)`, uppercase.
- `SalaryTicker` only: a green readout panel (`Month to date`, demo badge, live figure, per-second rate, today) — the product's soul, and the card's only saturated colour.
- Spec table: 2×2 mono `dt` + Inter `dd`.
- Product window: 8px frame, 18px radius, faux title bar with a coral close dot, screenshot inside; lifts 6px on hover.
- Pointer light follows the cursor (`--mx/--my`); hover also turns the arrow coral and the title white.

### Marquee (footer)

- Anton, `rgba(244,239,231,0.2)`, 42s linear loop, star separators; static (wrapped, dimmer) under reduced motion.

### Buttons / links

- Solid pill: ink ground, ground text; hover flips to coral.
- Ghost pill: hairline border; hover tints coral-soft.
- Text links: mono uppercase with a 1px underline that draws in from the left.

## Motion

**Opening.** A 1.5s curtain: mono counter 000→100, coral progress hairline, then the sheet wipes up. The hero intro starts as the wipe begins, under the curtain.

**First paint.** Hero lines rise out of overflow masks (1.05s, 75ms stagger) once the display face resolves; topline and foot fade in behind them.

**Scroll.**

- Header collapses to 62px with dark glass; a 2px coral progress line tracks the document.
- Section headings are split per word and rise out of masks on entry (`data-split`), with `<em>` phrases masked as single units.
- The work cards form a stack: card 1 pins under the header, card 2 slides over it while card 1 scales to 0.945 and fades to 45%.
- Product windows wipe in with `clip-path` and then drift ±3.4% against the page.
- The hero statement drifts apart line by line as the portrait leaves; the 3D camera dollies in and the stage fades.
- About facts cascade in 55ms apart.

**Loops.** Typewriter (26–46ms/char), salary count-up then live ticking, 3D auto-rotation with floating dust, marquee at 64px/s, and a stock-ticker band under the hero at 34s per loop.

**Pointer.** Magnetic CTAs (≤8px), custom cursor (dot + lagging ring), a coral label that replaces the ring over cards (`data-cursor="Visit"`), a coral glow that trails the pointer through the atmosphere layer, and a 16-frame letter scramble on project names (`data-scramble`).

**Velocity.** Fast scrolling tilts the display type (`skewY` up to ±4.5°, settled back within 130ms) and accelerates the footer marquee (`±900px/s`), which reverses when scrolling back up.

**Reduced motion.** No curtain, no splits, no sticky stack, no velocity, no cursor. Typewriter prints line one, money is fixed, the 3D renders one frame. Every element is visible without any animation.

## Do / Don't

**Do**

- Keep Anton for statements and never for body copy.
- Keep one coral accent per viewport-scale element; use the muted ink scale for everything else.
- Put English first, Chinese second, and keep the Chinese line shorter than the English one.
- Keep the money readout labelled `Demo data` and tabular.
- Keep the 3D object optional: the page must read completely without WebGL.

**Don't**

- Don't reintroduce the warm paper palette, soft-blur aurora or four-colour rainbow rules from v2.
- Don't add a second accent colour, gradient text, or neon glows.
- Don't let the type and the portrait overlap on narrow screens — below 1024px the stage is off.
- Don't invent JobPilot metrics, a domain, or a third project.
- Don't animate layout properties; transform and opacity only.
