# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + vanilla JS + GSAP/ScrollTrigger + Lenis + Three.js (per HANDOFF_PROMPT.md). No React/Vue/Tailwind.

## Users

- People who meet Lee through SalaryTicker, JobPilot, the CSDN blog, or GitHub.
- Windows desktop workers evaluating SalaryTicker; job seekers evaluating JobPilot.
- Peers and potential collaborators checking the craft of an independent developer's work.

## Product Purpose

A single-page personal homepage for Lee, an independent developer. It introduces Lee, presents two shipped/active tools — SalaryTicker (Windows) and JobPilot (Web) — and gives direct entry to the blog, GitHub, and email. Success: a visitor understands who Lee is, sees both tools in a clear hierarchy, and can open a project, read the blog, inspect the GitHub, or write an email without friction.

## Positioning

A solo developer's homepage that treats small tools as finished exhibits rather than a portfolio list. The page does not claim scale, users, credentials, or commercial results; the products, their real screenshots, and Lee's own words are the proof.

## Operating Context

- First release is a local-only static site; not deployed yet. Deployment requires a separate decision on domain, server, and Nginx ownership.
- The project lives at `D:\Data\Coding\demo\leelab-site`; the SalaryTicker repository is a separate project and must not be modified.
- Domain confirmed for metadata: `leelab.com.cn` (www to redirect later).
- JobPilot currently has no domain; its live preview is `http://47.106.222.233:8000/`. Keep the HTTP preview link and label it 域名待定 until a domain/HTTPS exists.
- External links confirmed: blog `https://blog.csdn.net/lhf__`, GitHub `https://github.com/lhf-hub?tab=repositories`.
- Only Chinese copy; small English/mono labels are allowed. No multilingual routes.
- No analytics, tracking scripts, external font CDN, or keys/secrets in the repository.

## Capabilities and Constraints

- Single page: header, hero, projects, about, footer.
- Exactly two project cards:
  - **SalaryTicker**: Windows 10/11 salary ticker, v1.2.0, portable, free; official site `https://salaryticker.leelab.com.cn/`; demo amount ticker; main screenshot, mini window, capability chips.
  - **JobPilot**: Web intelligent job-search assistant at `http://47.106.222.233:8000/`; landing features 简历优化 / 面试模拟 / 岗位推荐 / 数据管理; real landing screenshot; domain pending.
- Projects use a staggered layout: SalaryTicker is the full-width featured card; JobPilot is a smaller card offset to the right on desktop.
- A small project index links to both cards; no second screen or route.
- Header, hero, About, and footer expose blog / GitHub / email.
- All SalaryTicker figures are demo data and must be labeled 演示数据; no real payslip.
- The JobPilot screenshot is captured from its public landing page; do not invent UI, metrics, user counts, or commercial claims.
- Display name is **Lee**. "Less" and "Lee 老师" must not appear on this site. Brand remains **leelab**. Email remains `leemail208@163.com`.
- Email is shown as plaintext plus `mailto:` (no copy button).
- No X/Bilibili/other social links were provided. No portrait photo. No additional projects may be invented.
- WebGL (Three.js) is accepted for the ambient background, with a CSS fallback and performance/reduced-motion guards.
- Motion system: GSAP + ScrollTrigger + Lenis, full entrance/scroll/pointer motion, but every effect must serve hierarchy and hold 60 fps.

## Brand Commitments

- Name: Lee. Brand: leelab. Brand line: 谋生有度，生活有光。
- Tagline for SalaryTicker: 把月薪拆成看得见的每一秒。
- Tagline for JobPilot: 为你的下一份工作，做好准备。
- Voice: restrained, warm, plain-spoken; no superlatives (最、第一、保证、100%), no invented experience or social proof.
- The binding visual/motion brief is `HANDOFF_PROMPT.md`: Warm palette, cream paper, serif display, mono labels, four-color brand line. It overrides aesthetic defaults. The 2026-11-19 scope adds two projects, blog/GitHub links, and the personal mark.

## Evidence on Hand

- `public/assets/leelab-mark.svg` / `leelab-mark-256.png`: the personal four-color mark; used in header, footer, favicon, apple-touch-icon.
- `public/assets/og-lee.jpg`: personal 1200×630 OG poster generated from the site's own type and palette.
- `public/assets/app-shot.webp` / `.png`: SalaryTicker main window, 1455×1051; demo values (tax-before 20,000, after-tax 15,764, 18 pay days, ¥0.0304/s).
- `public/assets/mini-shot.webp` / `.png`: mini window, 302×120.
- `public/assets/jobpilot-shot.webp` / `.png`: JobPilot landing screenshot captured 2026-11-19 from the public preview URL; current features and the "1,592 个真实岗位" state are in the screenshot only, not asserted as a metric in the card copy.
- `public/assets/app-icon.png` / `app-icon-96.png`: SalaryTicker icon, used only on its card.
- `public/assets/noto-serif-sc-display.woff2` with `OFL-NotoSerifSC.txt`; license file must be preserved.
- Facts: SalaryTicker 1.2.0, Windows 10/11, portable, free; data stored locally; Shenzhen defaults adjustable in settings; results are for reference only. JobPilot is a Web app with local IndexedDB record storage and browser-held AI keys, per its landing page.
- Absences that must not be filled by invention: no user counts, download counts, press, testimonials, employer, school, city, or social handles beyond the confirmed blog/GitHub.

## Product Principles

1. The person first, the tools second; the site is Lee's, not a product microsite.
2. The products are the proof; show them working rather than describing them.
3. Two well-made things beat a padded portfolio.
4. Warmth without sweetness: editorial restraint, not SaaS gloss.
5. Motion earns attention once, then gets out of the way.
6. Every number is honest; demo data says so on its face.

## Accessibility & Inclusion

- Keyboard-operable navigation, project index, CTAs, cards, About links, and footer links; visible `:focus-visible` rings; skip link.
- Full `prefers-reduced-motion` fallback: no Lenis, pin, tilt, custom cursor, shader animation, marquee, or sheen; all content visible and static.
- Touch devices get no 3D tilt or custom cursor; press states remain.
- Body text contrast ≥ 4.5:1; no small text in light coral; ticker is not announced continuously.
- No horizontal scroll at 360 / 390 / 768 / 1024 / 1440.
