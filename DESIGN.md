---
name: leelab-site
description: Warm paper personal homepage for Lee / leelab
colors:
  paper-cream: "#FAF7F2"
  paper-sand: "#F5EEE4"
  warm-white: "#FFFCF7"
  ink: "#2D2A26"
  ink-strong: "#1F1B17"
  ink-muted: "#665C52"
  border-warm: "#E6DDD0"
  border-strong: "#D6C9B8"
  coral-line: "#E07A5F"
  coral-deep: "#B4533C"
  coral-wash: "#FBEDE6"
  money-green: "#047857"
  money-green-deep: "#17694F"
  money-wash: "#E7F6F0"
  amber: "#F4A261"
  amber-deep: "#A45A0B"
  amber-wash: "#FDF1E4"
  mist-blue: "#5B8DB8"
  mist-blue-deep: "#3B6E8F"
  mist-blue-wash: "#EAF2F8"
  footer-ink: "#1F1B17"
  footer-cream: "#FAF7F2"
  footer-muted: "#B8ADA0"
typography:
  display:
    fontFamily: '"Salary Display", "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif'
    fontSize: "clamp(3.25rem, 8.5vw, 7.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Salary Display", "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif'
    fontSize: "clamp(1.6rem, 2.2vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"Noto Sans SC", "Microsoft YaHei UI", "PingFang SC", "Segoe UI", sans-serif'
    fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: '"Noto Sans SC", "Microsoft YaHei UI", "PingFang SC", "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: '"SF Mono", "Cascadia Mono", Consolas, "Liberation Mono", monospace'
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.18em"
rounded:
  sm: "12px"
  md: "20px"
  lg: "28px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
  5xl: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-cream}"
    rounded: "{rounded.pill}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.coral-deep}"
  nav-mail:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 15px"
  chip:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 11px"
  project-card:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "clamp(20px, 3.2vw, 38px)"
  project-card-companion:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "clamp(20px, 3.2vw, 38px)"
  amount-panel:
    backgroundColor: "{colors.money-wash}"
    textColor: "{colors.money-green}"
    rounded: "{rounded.md}"
    padding: "clamp(16px, 2.2vw, 24px)"
---

# Design System: leelab-site

## Overview

**Creative North Star: "The Warm Press Sheet"**

The page is printed matter left in warm afternoon light: cream paper, two mounted specimens, a four-color registration bar, and enough air around the objects that they read as exhibits rather than a listing. The interface is editorial and quiet; the SalaryTicker card is the loudest thing on the page, with JobPilot as a smaller companion exhibit. Warmth comes from paper, light, and ink, never from a pastel gradient pasted over a template.

The page is built around one typographic gesture: a very large Song-style headline with a drawn coral underline, then two project cards that rise into view. The personal four-color mark sits in the header and footer; the product icon belongs only to the SalaryTicker card. Four colors — coral, amber, green, blue — recur as hairlines, dots, stripe segments, and the eight-ray mark. Nothing is glossy; surfaces are warm white with 1px warm borders and shadows that look like paper lifted off a desk.

Motion is deliberate and low-frequency: a line-mask reveal, a card that tilts under the pointer, a slow aurora, a ticker that behaves like a clock. If the visitor has asked for reduced motion, the page becomes a still print sheet.

**Key Characteristics:**

- Warm paper ground with a subtle aurora and 5% grain, never a flat white canvas.
- One oversized serif gesture per screen; the rest is quiet system type.
- Four-color registration details used structurally, not as decoration.
- Warm white surfaces, 1px warm borders, deep paper shadows.
- Mono for measurements, labels, and the live amount; tabular numerals always.
- Every motion has a state and a reduced-motion equivalent.

## Colors

The palette is a warm print palette: cream paper, ink, and four muted process colors. It is committed, but the saturated colors are kept to graphics, labels, and the money figure; large fields stay paper.

### Primary

- **Coral Registration** (`#E07A5F` / `{colors.coral-line}`): The four-color bar, the drawn underline, the eight-ray mark, the period, and the cursor dot. A graphic color; not a small-text color.
- **Deep Coral Ink** (`#B4533C` / `{colors.coral-deep}`): Small coral text, link hover states, focus rings, and the primary button hover. This is the readable member of the coral family.
- **Money Green** (`#047857` / `{colors.money-green}`): The live amount and the “每秒 +¥0.0304” line only. Money is the one thing allowed to be green.
- **Deep Money Green** (`#17694F` / `{colors.money-green-deep}`): Small green labels and the rate line on the green wash.

### Secondary

- **Sun Amber** (`#F4A261` / `{colors.amber}`): The warm sun glow, the second four-color segment, and the amber chip dot.
- **Deep Amber** (`#A45A0B` / `{colors.amber-deep}`): The 演示数据 badge text on the amber wash; the only small amber text.

### Tertiary

- **Mist Blue** (`#5B8DB8` / `{colors.mist-blue}`): The fourth four-color segment and the blue chip dot. A cool counterweight to the warm field.
- **Deep Mist Blue** (`#3B6E8F` / `{colors.mist-blue-deep}`): Reserved for small blue labels if a future state needs one.

### Neutral

- **Warm Paper** (`#FAF7F2` / `{colors.paper-cream}`): Page ground, card mat, the space between sections.
- **Sand Paper** (`#F5EEE4` / `{colors.paper-sand}`): The About band, the quieter second material.
- **Warm White** (`#FFFCF7` / `{colors.warm-white}`): The project card and chips. Not pure white; pure white is reserved for the app screenshot and raised surfaces.
- **Ink** (`#2D2A26` / `{colors.ink}`): Body copy, primary buttons, the footer ground.
- **Ink Strong** (`#1F1B17` / `{colors.ink-strong}`): Headlines, the display type, the footer.
- **Ink Muted** (`#665C52` / `{colors.ink-muted}`): Labels, metadata, secondary copy. Use this instead of a gray.
- **Warm Border** (`#E6DDD0` / `{colors.border-warm}`): 1px card and chip borders.
- **Strong Warm Border** (`#D6C9B8` / `{colors.border-strong}`): The outer edge of the screenshot mat, dashed section rules, and the underline rule.

**The Coral Is Ink-Free Rule.** Coral `#E07A5F` never sets text below 32px. Small coral text uses `#B4533C`; cream text never sits on light coral.

**The Money Is Green Rule.** The amount is always `{colors.money-green}` with `font-variant-numeric: tabular-nums`. Demo data carries the amber 演示数据 badge on the same panel; never present a number as real pay.

## Typography

**Display Font:** Salary Display (self-hosted Noto Serif SC display subset; fallback Noto Serif SC / Songti SC / SimSun).

**Body Font:** Noto Sans SC with Microsoft YaHei UI / PingFang SC / Segoe UI fallbacks.

**Label/Mono Font:** SF Mono with Cascadia Mono / Consolas / Liberation Mono fallbacks.

**Character:** A high-contrast Song-style serif gives the page its voice; the sans and mono stay nearly invisible so the headline and the two project cards carry the composition. The pairing is editorial, not corporate: a newspaper masthead next to a tool’s readout.

### Hierarchy

- **Display** (600, `clamp(3.25rem, 8.5vw, 7.5rem)`, 1.04): The single H1 in the hero; two lines, the second indented, with a drawn underline under 生活有光.
- **Headline** (600, `clamp(1.6rem, 2.2vw, 2rem)`, 1.35): The projects statement and the About quote.
- **Title** (700, `clamp(1.0625rem, 1.5vw, 1.25rem)`, 1.2): The product name in the card; sans, because it is a product name rather than editorial copy.
- **Body** (400, 1rem, 1.8): Intro, About, and metadata. Measure stays around 26–38em.
- **Label** (500, 0.6875rem, 0.18em, uppercase): Section labels, eyebrow, amount label, chips’ mono variants.

**The Serif Carries the Voice Rule.** Display type is for the headline, the tagline, the About quote, and the poetry of the page. Buttons, labels, amounts, and controls never use the display face.

**The Number Is Tabular Rule.** Money, time, progress, and version numbers use tabular numerals so a changing value never reflows.

## Layout

A 1200px container with `clamp(20px, 5vw, 48px)` inline gutters. The page is a single vertical editorial sequence: header, hero, projects, about, footer. Section spacing is `clamp(80px, 12vw, 160px)`.

The hero is a poster: eyebrow and UTC+8 clock at the top, the display headline across the full width, then a lower row with intro and actions on the left and the “独立开发 · Windows 工具与 Web” annotation plus 博客 / GitHub links on the right. The projects section is a 3fr / 8fr split: a sticky left rail with the label, statement, and a two-item project index; the SalaryTicker card is the featured exhibit; the JobPilot card is a smaller companion at 90% width, offset to the right. The SalaryTicker card’s top enters the first viewport at 1440×900; at 360 the hero stays personal and the cards expand below. The About section is a 3fr / 8fr split with the label in the left rail and the reading column plus 博客 / GitHub / 邮箱 links on the right.

At 900px the 3fr / 8fr splits collapse to one column; the projects rail stops being sticky; JobPilot becomes full width. At 767px the nav text links give way to the mail pill; the hero and footer links still expose 博客 / GitHub. At 640px the mini window is hidden and JobPilot’s copy/screenshot grid stacks. At 520px the card heads can wrap their badges and the card footers stack. The page holds from 360 to 1440 without horizontal scrolling.

## Elevation & Depth

Depth is paper lifted off paper, not glass. Shadows are warm and diffuse: `0 24px 70px rgba(90, 60, 40, .14), 0 6px 18px rgba(90, 60, 40, .07)` for the card, a deeper version on hover, and `0 18px 50px rgba(60, 40, 25, .16)` for the screenshot mat. The header and marquee control use a light backdrop blur only because they sit over moving content; blur is a legibility device, never a decoration.

Both cards use real 3D layering: `perspective: 1200px` on the link, `transform-style: preserve-3d` on the plate, the SalaryTicker screenshot at `translateZ(22px)`, its mini window at `translateZ(52px)`, and chips/CTA at 14px. The JobPilot screenshot sits at `translateZ(18px)` with a −1.1° rest rotation and no mini window. The pointer tilt is ±10° with a lerp on both cards, and the sheen is a single 0.9s pass, never a loop.

### Named Rules

**The Paper Not Glass Rule.** Surfaces are opaque warm paper. Blur appears only where content moves beneath a control and must stay readable.

**The Lift Then Settle Rule.** Hover states lift by 6px at most and return to rest; no perpetual bobbing except the miniature window’s 7s float and the aurora.

## Shapes

Corners are editorial rather than bubbly: 12px for small chips and icons, 20px for the amount panel, 28px for both project cards, 999px for buttons and chips. Borders are 1px warm lines. The recurring four-color line is a 2–3px gradient strip at the top of the header, the hero divider, both cards, the About quote rule, and the footer. The eight-ray mark is the personal site’s one abstract ornament: four strokes, one in each process color, used in the header/footer mark, the 40px rail ornament, the favicon, and the OG poster.

Screenshots sit on warm mats with a 9px inset and a 12px image radius; the SalaryTicker mini window is a smaller warm-white card with a 3px border, rotated −1.2°. The JobPilot screenshot uses the same mat but is rotated −1.1° and has no companion window.

## Components

### Buttons

- **Shape:** pill (`999px`).
- **Primary:** ink ground (`{colors.ink}`), cream text (`{colors.paper-cream}`), 13px × 22px padding, 14px/600 label with a 16px arrow. A magnetic pull of at most 8px within a 120px radius on fine pointers.
- **Hover / Focus:** coral-deep ground (`{colors.coral-deep}`) on hover; a 2px coral-deep focus ring with 3px offset. The button label never uses the display face.
- **Secondary:** a text link with a 1px warm border-bottom and an arrow that shifts 2px on hover; no filled secondary button.

### Chips

- **Style:** warm white, 1px warm border, ink-muted text, 6px × 11px padding, 999px radius; mono variants for `Windows` and `v1.2.0` at 10px.
- **Accent:** a 5px dot cycles coral / amber / green / blue across the four feature chips. Dots are decorative; the chip text carries the meaning.

### Cards / Containers

- **Corner Style:** 28px.
- **Background:** a 160° warm-white-to-`#FBF5EC` gradient with a faint coral top-right wash and blue bottom-left wash.
- **Shadow Strategy:** the card shadow at rest, the hover shadow when the pointer lifts the plate, the window shadow for the screenshot.
- **Border:** 1px `{colors.border-warm}`; strong border on the screenshot mat.
- **Internal Padding:** `clamp(20px, 3.2vw, 38px)`.
- **Interactive behavior:** each project card is one link. A pointer tilt, a light that follows the pointer, one sheen pass, a lifted CTA arrow. Touch gets a 0.992 press scale and no tilt. The accessible name is the card’s full text; the new-tab/demo note is `aria-describedby`.

### Companion Project Card (JobPilot)

- **Placement:** 90% of the projects column, aligned right below SalaryTicker, so the pair steps rather than stacking as equal cards.
- **Layout:** a 1.05fr / 0.95fr copy-plus-screenshot grid; the screenshot sits on the same warm mat, rotated −1.1°, at `translateZ(18px)`.
- **Content:** JobPilot / 智能求职助手, Web and 域名待定 chips, the real “为你的下一份工作，做好准备。” tagline, a one-sentence feature line, four chips (简历优化 / 面试模拟 / 岗位推荐 / 本地存储), a Web · 域名待定 · 在线预览 line, and 访问 JobPilot.
- **Truth:** the screenshot is from the live preview; no invented metrics, no fake UI, no claim of a domain or HTTPS. At 900px it becomes full width; at 640px the copy and screenshot stack.

### Navigation

A fixed header with a 3px four-color top line. Brand: personal four-color mark + “Lee” in the display face + a hairline + `LEELAB` in mono. Links are 13px sans in ink-muted: 项目 / 关于 / 博客 ↗ / GitHub ↗, with a 1px underline that scales from the right on hover. The last link is a warm-white mail pill with a 15px envelope. After 12px of scroll the header shrinks to 62px and moves to a 90% cream glass; at 767px the text links give way to the mail pill, while the hero and footer links keep 博客 / GitHub reachable. Focus rings are coral-deep and never removed.

### Amount Panel

A green-wash panel inside the SalaryTicker card: 10px mono “本月已赚”, a display-scale mono amount (clamp 2.5–4rem, 600, tabular), a green rate line, a 12px muted “今日 / 当前小时” line, and the amber 演示数据 badge. The panel is `translateZ(10px)`; the number is the only element allowed to update on a timer, and it stops when the card is out of view or the tab is hidden. JobPilot has no equivalent number.

### Marquee

A dark footer band with a 38s linear cream-on-ink text loop at `rgba(250, 247, 242, .38)`: 谋生有度 / 生活有光 / 做点有用的东西 / 写点想写的东西. It pauses on hover/focus and through a visible pause button; reduced motion turns it into a static wrapped paragraph with the duplicate group removed and the four-color separator diamonds hidden.

## Do's and Don'ts

### Do:

- **Do** use warm paper fields and 1px warm borders before adding another shadow.
- **Do** keep coral for lines, dots, the period, the cursor, and graphics; use `{colors.coral-deep}` for small coral text.
- **Do** keep the four-color stripe and the eight-ray mark as recurring registration details.
- **Do** use the display serif only for the headline, the tagline, and the quote; use sans for controls and mono for data.
- **Do** label every demo amount with 演示数据 and keep the live ticker tabular.
- **Do** give every motion a reduced-motion result and every card a keyboard focus ring.
- **Do** keep each project card a single link; put the accessible new-tab/demo note in `aria-describedby`.
- **Do** keep SalaryTicker as the featured card and JobPilot as the smaller companion; the hierarchy is the portfolio.

### Don't:

- **Don't** put cream text on `#E07A5F` or use coral for small body text.
- **Don't** add glass panels, gradient text, neon, or a generic SaaS hero/three-equal-cards layout.
- **Don't** invent a third project, JobPilot metrics, additional social links, or a portrait.
- **Don't** claim JobPilot has a domain or HTTPS before it does; keep 域名待定 / 在线预览.
- **Don't** animate layout properties, run the WebGL shader when reduced motion is requested, or load Three.js in the entry bundle.
- **Don't** loop the card sheen; it is one 0.9s pass per pointer enter.
- **Don't** introduce additional kickers/eyebrows beyond the two brief-mandated labels (hero eyebrow and section labels); the editorial label is a pinned brief device, not a reusable invitation.
- **Don't** use pure white as a page field; it belongs only inside the app screenshot and raised paper.
