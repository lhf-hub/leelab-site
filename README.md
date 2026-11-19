# leelab-site

Lee 的个人网站。暖色、纸张感、克制的单页主页；首版放 **SalaryTicker** + **JobPilot** 两个项目，以及博客和 GitHub 入口。

- 本地已完成，**尚未部署**。
- 域名已确认：`https://leelab.com.cn/`（canonical / OG 已按此预留；DNS、服务器、Nginx 尚未配置）。
- 身份：**Lee**。品牌：**leelab**。邮箱：`leemail208@163.com`（明文 + `mailto:`）。
- 早期「Less」是误读，已全站移除；也不使用「Lee 老师」。

## 已确认的项目与链接

| 项目 | 说明 |
| --- | --- |
| SalaryTicker | Windows 实时工资计算器，1.2.0，免安装、免费；官网 `https://salaryticker.leelab.com.cn/` |
| JobPilot | 智能求职助手；当前在线预览 `http://47.106.222.233:8000/`，域名待定 |
| 博客 | `https://blog.csdn.net/lhf__` |
| GitHub | `https://github.com/lhf-hub?tab=repositories` |
| 邮箱 | `leemail208@163.com` |

- JobPilot 还没有独立域名，卡片上标「域名待定 / 在线预览」；拿到域名和 HTTPS 后，更新卡片和 footer 的链接即可。
- 两个项目用「错落」排法：SalaryTicker 是完整的大展品卡，JobPilot 是右侧偏移的横向小卡。
- 个人标记：四色八芒星 + Lee 字标；favicon、apple-touch-icon、OG 图都是个人站版本，不再使用 SalaryTicker 的图标。

## 技术栈

- Vite 8 + vanilla JavaScript（无 React / Vue / Tailwind）
- GSAP 3 + ScrollTrigger
- Lenis 1.3
- Three.js 0.187（约 131 KB gzip，**首次交互时才加载**；CSS 极光负责首屏，不参与首屏阻塞）

## 常用命令

```bash
npm install
npm run dev       # 本地开发
npm run build     # 产物在 dist/
npm run preview   # 预览构建产物
```

## 目录

```text
index.html                 静态语义内容（Hero / Projects / About / Footer）
package.json
vite.config.js
public/
  robots.txt
  assets/
    leelab-mark.svg       个人标记（header / footer / favicon）
    leelab-mark-256.png   apple-touch-icon
    og-lee.jpg            个人 OG 海报，1200×630
    app-shot.webp         原始主截图 1455×1051
    app-shot-800.webp     响应式派生，800×578
    app-shot-1200.webp    响应式派生，1200×867
    app-shot.png          主截图 PNG 回退
    mini-shot.webp / .png 迷你窗
    jobpilot-shot.webp    JobPilot 在线首页截图，1200×750
    jobpilot-shot-800.webp
    jobpilot-shot.png
    app-icon.png          256×256 SalaryTicker 原始图标（素材；页面只使用 96px 版）
    app-icon-96.png       卡片内 96×96 派生
    favicon.ico           旧产品 favicon（页面已改用 leelab-mark.svg）
    noto-serif-sc-display.woff2
    OFL-NotoSerifSC.txt   字体许可证，必须保留
src/
  main.js                  入口、动态加载 WebGL、按顺序初始化/清理
  data/site.js             身份、链接、projects、demo 金额
  styles/
    tokens.css             色板、字号、间距、圆角、阴影、缓动
    base.css               字体、重置、焦点、纸张噪点、极光兜底
    layout.css             Header / Hero / Projects / About / Footer
    card.css               项目卡、JobPilot 伴随卡、3D 分层
    motion.css             入场初始态、keyframes、自定义光标、降级
  motion/
    lenis.js               Lenis + ScrollTrigger 接法
    shader.js              Three.js 极光（动态 import）
    intro.js               首屏时间线
    scroll.js              两张卡的入场 / 视差 / reveal
    tilt.js                两张卡的 3D tilt、柔光、扫光、迷你窗视差
    cursor.js              自定义光标
    ticker.js              SalaryTicker 实时金额（视口外/页面隐藏暂停）
    ui.js                  header 状态、UTC+8 时钟、锚点、marquee、磁吸
PRODUCT.md                 产品上下文（Impeccable 记录）
DESIGN.md                  设计系统（tokens + 规则 + 组件）
```

## 页面与交互

- **Header**：个人标记 + Lee / leelab；项目 / 关于 / 博客 ↗ / GitHub ↗ / 写封邮件；顶部 3px 四色线；滚动后收缩并加暖色玻璃背景。
- **Hero**：`LEELAB · 个人站` eyebrow、UTC+8 时钟、两行衬线大标题「谋生有度，生活有光。」、手绘四色下划线、介绍、主 CTA、邮件链接、右侧「独立开发 · Windows 工具与 Web」+ 博客 / GitHub 小链接。
- **Projects**：左侧 sticky 标签、「先做有用的东西。」、两项目索引；右侧 SalaryTicker 大卡 + 右偏移的 JobPilot 卡。
- **SalaryTicker 卡**：整张 `<a>`，新标签打开官网；图标、名称、版本、tagline、实时金额（演示数据）、主截图、迷你窗、四项能力 chips、平台信息、访问官网。
- **JobPilot 卡**：整张 `<a>`，新标签打开预览地址；名称、智能求职助手、Web / 域名待定、tagline、真实首页截图、四项能力 chips、在线预览说明、访问 JobPilot。
- **About**：Lee 的个人介绍、「谋生有度，生活有光。」引用、博客 / GitHub / 邮箱链接。
- **Footer**：深墨色收尾；可暂停的四色 marquee（个人站语气）、Lee / leelab、博客 / GitHub / 邮箱。
- 首屏在 1440 显示个人 Hero 与 Projects 的进入；360 / 390 首屏以个人身份为主，卡片在下方展开。

## 动效与降级

- 入场：header → eyebrow → 标题行 → 下划线 → 介绍/CTA → 链接 → 四色线；每张卡在进入视口时独立入场。
- 滚动：标题轻微上移淡出、两张卡各自的截图视差、段落 reveal、极光随滚动偏移。
- 指针（仅 fine pointer）：两张卡的 tilt ±10°、柔光跟随、单次扫光、磁吸 CTA、自定义光标（6px 点 + 34px 环，链接/卡片放大）。
- 持续：SalaryTicker 金额 ticker、迷你窗浮动、背景极光、页脚 marquee、状态点低频脉冲。
- **reduced-motion**：不加载 Lenis / Three / 自定义光标；marquee 静态换行、隐藏分隔符；ticker 固定为基准值；所有内容可见。
- **触屏**：无 tilt / 自定义光标；保留 reveal、ticker、marquee；卡片保留按压态。
- 页面隐藏时暂停 ticker、CSS 动画和 WebGL 渲染。
- 未做 HANDOFF 标注为可选的 Hero 短 pin；用标题视差和卡片视差代替。

## 内容与合规

- SalaryTicker 的金额、截图与迷你窗全部是**演示数据**，卡片上有「演示数据」角标；不是真实工资条。
- JobPilot 卡片的截图来自当前在线预览页；文案来自该页面的公开介绍。没有编造用户数、下载量或商业成绩。
- JobPilot 的「域名待定」是事实；拿到域名和 HTTPS 后再更新。
- 不编造经历、公司、职位、学历、社交账号。
- 不写「最」「第一」「保证」「100%」等绝对化表述。
- 中文与英文/数字之间加空格。
- 无 analytics、外部字体 CDN、密钥或服务器地址。
- 部署配置（host / user / key / path）不要提交；`.gitignore` 已忽略常见本地配置与 `.impeccable/review/`。

## 素材来源

- `app-shot.webp` / `app-shot.png`、`mini-shot.*`、`app-icon.png`: 来自 HANDOFF_PROMPT.md 指定的 SalaryTicker 演示素材。
- `app-shot-800.webp` / `app-shot-1200.webp`：由 `app-shot.webp` 等比缩放（WebP quality 82），用于响应式 srcset。
- `app-icon-96.png`：由 `app-icon.png` 缩放到 96×96，仅用于卡片内 44px 显示。
- `jobpilot-shot.webp` / `jobpilot-shot-800.webp` / `jobpilot-shot.png`：2026-11-19 从 `http://47.106.222.233:8000/` 的公开首页截取并缩放；如果 JobPilot 首页改版，需要重新截取。
- `leelab-mark.svg` / `leelab-mark-256.png`：为个人站绘制的四色八芒星标记。
- `og-lee.jpg`：用站点自己的字体、颜色和标题生成的 1200×630 个人海报，不是产品截图。
- `noto-serif-sc-display.woff2`：Noto Serif SC 显示子集，许可证见 `public/assets/OFL-NotoSerifSC.txt`，必须随项目保留。
- 不修改 SalaryTicker 仓库。

## 验证（2026-11-19，本地）

- `npm run build` 成功；`npm run preview` 正常；`npm run dev` 无控制台错误或警告。
- Lighthouse（headless Chrome，本地 preview，SwiftShader）：
  - Desktop：Performance **100** / Accessibility **100** / Best Practices **100** / SEO **100**
  - Mobile：Performance **96** / Accessibility **100** / Best Practices **100** / SEO **100**
  - Mobile LCP 约 1.7 s，CLS 0；数值会随机器与动画状态波动。
- 360 / 390 / 768 / 1440 宽均无横向滚动。
- 触屏模拟：无自定义光标、无 tilt。
- `prefers-reduced-motion: reduce`：无 Lenis、无 WebGL、无 marquee 动画，两张卡与链接完整可见。
- 键盘：Tab 可到 skip link、导航（含博客 / GitHub）、两个项目索引、两张卡、About 链接和页脚链接；焦点环可见。
- 两个卡片链接均为 `target="_blank"` + `rel="noopener noreferrer"`；JobPilot 为 HTTP 预览地址。

## 尚未完成 / 待确认

- **部署**：域名已确认，但服务器归属、Nginx server block、HTTPS、DNS 解析都还没做。构建产物是纯静态 `dist/`，部署前请确认这些边界。
- **JobPilot 域名**：目前只有 HTTP IP 预览；分配域名 / HTTPS 后更新卡片 href、About 链接和 README。
- **JobPilot 截图**：当前使用 2026-11-19 的公开首页截图；产品改版后建议重截。
- **其他社交链接**：目前只放了博客和 GitHub；X / Bilibili / 小红书等没有已确认 URL。
- **人像 / 更多项目**：没有素材或真实项目，暂不添加、不编造。
- **统计 / 追踪**：首版没有，需要时先确认。

## 相关文档

- `HANDOFF_PROMPT.md`：原始完整需求、视觉、动效与验收（首版单卡边界已被 2026-11-19 的多项目 / 外链方向扩展）。
- `CLAUDE.md`：给后续 Claude Code 会话的短规则与当前状态。
- `PRODUCT.md`：产品事实与已确认决定。
- `DESIGN.md`：设计 tokens、组件与使用规则。
