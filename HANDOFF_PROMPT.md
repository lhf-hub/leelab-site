# leelab-site 转接提示词

> **用法**：在 Claude Code 中打开 `D:\Data\Coding\demo\leelab-site`，新会话先说：
>
> > 读 HANDOFF_PROMPT.md 和 CLAUDE.md，按里面的要求开发我的个人网站。
> > 先确认个人站域名和最终个人简介，再开始；不要改 SalaryTicker 仓库。
>
> 下面是完整需求。不要跳读；先理解，再动手。

---

## 0. 一句话

做一个**暖色、纸张感、会呼吸**的个人主页；首版只有一张 **SalaryTicker** 项目卡片，但把它做成一件会动的展品。

---

## 1. 目标与边界

### 目标

- 在 `D:\Data\Coding\demo\leelab-site` 建一个全新的个人网站项目。
- 首版是单页：Hero + 一个项目卡片（SalaryTicker）+ About + Footer。
- 卡片整张可点，打开 `https://salaryticker.leelab.com.cn/`。
- 视觉、排版、动效都要做到“个人作品”的水准，不是模板站。
- 架构要为后续增加项目卡片留好位置。

### 边界

- **不要修改** `D:\Data\Coding\demo\SalaryTicker`；这是一个独立项目。
- 本次不部署；先本地 `npm run dev` / `npm run preview`。部署前必须确认个人站域名和服务器归属。
- 不编造个人经历、公司、职位、学历、社交账号、下载量、用户数。
- 不复制 SalaryTicker 仓库里的 `tools/deploy.config.json`、`tools/github.config.json` 或任何密钥。
- 首版只做中文（可以有英文小标签），不做多语言路由。

---

## 2. 已知事实（直接用，不要重新猜）

### 个人身份

- 展示名：**Lee 老师**
- 品牌：**leelab**
- 邮箱：**leemail208@163.com**
- 品牌语：**谋生有度，生活有光。**
- 定位：独立开发者，做 Windows 小工具。

### SalaryTicker

- 产品名：`SalaryTicker`，展示名「实时计算器」。
- 一句话：**把月薪拆成看得见的每一秒。**
- 官网：`https://salaryticker.leelab.com.cn/`
- 当前版本：`1.2.0`（Windows 10/11，免安装，免费）。
- 定位补充：工资实时计算器，内置深圳参数，其他城市可在设置里调整；数据只存本地，不上传。
- 可用金句：**不是又一个工资计算器，是屏幕角落一直在涨的那个数字。**
- 结果口径：仅供参考，以实际工资条为准。
- 不要自称「深圳专用」。

### 现有素材（已复制到本项目 `assets/`）

| 文件 | 尺寸 | 用途 |
|---|---|---|
| `assets/app-shot.webp` | 1455×1051，72 KB | 主窗截图，优先使用 |
| `assets/app-shot.png` | 1455×1051，273 KB | WebP 回退 |
| `assets/mini-shot.webp` | 302×120，5.6 KB | 迷你窗，优先使用 |
| `assets/mini-shot.png` | 302×120，18 KB | WebP 回退 |
| `assets/app-icon.png` | 256×256 | 品牌图标 / 卡片图标 |
| `assets/favicon.ico` | 多尺寸 | favicon |
| `assets/noto-serif-sc-display.woff2` | 257 KB | 标题衬线字体子集 |
| `assets/OFL-NotoSerifSC.txt` | 4.4 KB | 字体许可证，必须保留 |

截图是**演示数据**（税前 20,000、税后 15,764、18 个计薪日、每秒 ¥0.0304），不是真实工资条。

### 现有官网的视觉参考

- 线上：`https://salaryticker.leelab.com.cn/`
- 源码：`D:\Data\Coding\demo\SalaryTicker\server\index.html`
- 现有站是单文件原生 HTML/CSS/JS，无 GSAP/Lenis/Three；新站可以明显更进一步。
- 现有 Warm 色板、四色品牌线、衬线标题、等宽数字都可以沿用。
- 现有首屏产品窗的鼠标倾斜是 `rotateX 2.4° / rotateY 2.8°`；新卡片可以更大胆，但要有质感。

### 环境

- Node `v22.23.2`，npm `10.9.8` 已可用。
- 个人站域名尚未配置；`leelab.com.cn` / `www.leelab.com.cn` 都可能，**先问用户**，不要写死 canonical。
- 当前目录不是 Git 仓库；新项目可以独立 `git init`。

---

## 3. 视觉方向

### 关键词

**暖色纸张、编辑部、工具感、会呼吸、克制但大胆。**

不是：通用 SaaS 渐变、玻璃拟态、霓虹、模板作品集、满屏无意义粒子。

### 色板（Warm）

```css
--bg: #FAF7F2;            /* 奶油纸底 */
--bg-soft: #F5EEE4;
--surface: #FFFCF7;       /* 暖白卡片 */
--surface-raised: #FFFFFF;
--ink: #2D2A26;           /* 主墨色 */
--ink-strong: #1F1B17;
--muted: #665C52;
--subtle: #8A8074;
--border: #E6DDD0;
--border-strong: #D6C9B8;
--coral: #E07A5F;         /* 只做图形/色块，不做小字 */
--coral-strong: #B4533C;  /* 小字可用 */
--coral-soft: #FBEDE6;
--green: #047857;         /* 金额主色 */
--green-strong: #17694F;
--green-soft: #E7F6F0;
--amber: #F4A261;
--amber-strong: #A45A0B;
--amber-soft: #FDF1E4;
--blue: #5B8DB8;
--blue-strong: #3B6E8F;
--blue-soft: #EAF2F8;
--teal: #2A9D8F;
--teal-soft: #E6F3F1;
```

规则：小于 32px 的文字只用 ink / muted / green / amber-strong / blue-strong；珊瑚色只做线条、图标、色块。白字不要放在 `#E07A5F` 上。

### 字体

```css
--font-display: "Salary Display", "Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", serif;
--font-body: "Noto Sans SC", "Microsoft YaHei UI", "PingFang SC", "Segoe UI", sans-serif;
--font-mono: "SF Mono", "Cascadia Mono", Consolas, "Liberation Mono", monospace;
```

```css
@font-face {
  font-family: "Salary Display";
  src: url("/assets/noto-serif-sc-display.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
}
```

标题用衬线，正文用无衬线，数字/标签用等宽。中文与英文、数字之间加空格。

### 质感

- 奶油底 + 暖白卡 + 1px 暖色描边 + 很轻的暖阴影。
- 背景不是纯色：极光/柔光、纸张噪点（`feTurbulence` 或 CSS 噪点，透明度 3%–5%）、细网格可选。
- 四色品牌线（珊瑚 / 琥珀 / 薄荷 / 雾蓝）作为贯穿元素。
- 圆角 18–28px；不要过度圆角的“气泡感”。
- 留白要大；页面宽度 1120–1280px；移动端边距 20–24px。
- 图标用内联 SVG 细线，不用 emoji 做 UI。

### 版面

- Hero 是一张“海报”：超大衬线标题，旁边/下方是项目卡。
- Projects 是一条安静的横向带，卡片是唯一主角。
- About 用两栏：左边小标签，右边一段话 + 邮箱。
- Footer 可以有一条会动的文字 marquee，像印刷厂的滚轴。

---

## 4. 页面结构

### 4.1 Header

- 左：`app-icon` 小图标 + `leelab` 字标，或 `Lee 老师`。
- 右：`项目` / `关于` / `联系` 锚点；最后一个可以是 `写封邮件`。
- 一条细的四色线或底部 border。
- 滚动后轻微收缩/加背景模糊，不要做成大导航。

### 4.2 Hero

- Eyebrow：`LEELAB · 个人站`（mono，小号，字距大）。
- H1：**谋生有度，生活有光。**（两行；`生活有光` 可以做珊瑚/绿色强调，但保持克制）。
- 介绍：**我是 Lee 老师，写代码，也做点让上班没那么难熬的小工具。**
- Meta：`独立开发 · Windows 工具`（不要写城市/公司/职位）。
- CTA：
  - 主：`看看我在做什么 ↓`（滚动到 Projects）
  - 次：`写封邮件`（`mailto:leemail208@163.com`）
- 可选：一个很小的本地时间/“正在写代码”状态点。不要伪造在线状态；时间用客户端本地时间或 `UTC+8`，并标明。
- 视觉：标题大字 + 背景极光 + 右侧/下方的 SalaryTicker 卡片。卡片可以在首屏就出现，成为 Hero 的主视觉。

### 4.3 Projects

- 小标签：`项目 / PROJECTS`（mono）。
- 一句：**先做有用的东西。**
- 一张 SalaryTicker 卡片（见第 5 节）。
- 卡片下方：`更多项目还在路上。`（真实、克制，不要编造第二个项目）。

### 4.4 About

- 小标签：`关于 / ABOUT`。
- 一段真实介绍，默认文案：

  > 我是 Lee 老师，独立开发者。SalaryTicker 从设计、开发到测试，都是我一个人完成的。它会在节假日强制休息——谋生有度，生活有光。

- 引用：**谋生有度，生活有光。**
- 联系：`leemail208@163.com`（mailto + 可复制）。
- 不要写“前某公司”“某大学毕业”“服务过多少用户”等未提供的信息。

### 4.5 Footer

- `© 2026 Lee 老师 · leelab`
- `leemail208@163.com`
- `SalaryTicker 官网 ↗`
- 一条 marquee：`谋生有度 · 生活有光 · 把月薪拆成看得见的每一秒 · SalaryTicker`（慢速、可暂停、reduced-motion 静态）。

---

## 5. SalaryTicker 卡片规格

### 5.1 行为

- 整张卡是一个 `<a>`，`href="https://salaryticker.leelab.com.cn/"`，`target="_blank"`，`rel="noopener"`。
- 键盘可聚焦，焦点环清晰；不要嵌套第二个 `<a>`。
- 可访问名称包含 `SalaryTicker`；可以用 `aria-labelledby` 指向卡片标题，不要用空 `aria-label` 把内容全盖掉。
- 视觉 CTA：`访问官网 ↗`；它可以是 `<span>`，点击由整张卡接管。
- 鼠标悬停：卡片轻微抬起、3D 倾斜、柔光跟随、扫光、CTA 箭头位移。
- 触屏：无 tilt；用按压态/轻微 scale。
- reduced-motion：无 tilt/扫光/浮动；ticker 静态或很慢。

### 5.2 内容（从上到下）

- 顶行：`app-icon` + `SalaryTicker` + `实时计算器` + `Windows` 小 chip。
- Tagline：**把月薪拆成看得见的每一秒。**
- 实时数字：
  - `本月已赚` + `¥8,720.86`（demo）
  - `每秒 +¥0.0304`
  - 小字：`今日 ¥838.86 · 当前小时 ¥17.82`
  - 角标：`演示数据`
- 截图：`app-shot.webp/png`，放在一个会倾斜的“窗口”里；`width/height` 写好，`alt` 描述主界面。
- 迷你窗：`mini-shot.webp/png`，浮在截图右下角/右上角，轻微浮动；移动端缩小或隐藏。
- 能力 chips（最多 4 个）：`五险一金` / `个税` / `班制补班` / `摸鱼计时`（或 `迷你窗`）。
- 底部：`Windows 10/11 · 免安装 · 免费` + `访问官网 ↗`。
- 背景：暖白卡 + 四色细线 + 柔和光晕；不要整片高饱和色。

### 5.3 3D 分层

- 卡片容器：`transform-style: preserve-3d`；`perspective: 1200px`。
- 截图：`translateZ(18–24px)`。
- 迷你窗：`translateZ(40–60px)`。
- chips/CTA：`translateZ(10–16px)`。
- 倾斜：`rotateX(-py * 9deg)`、`rotateY(px * 10deg)`，范围约 ±9–10°；用 rAF + lerp（0.08–0.12）平滑。
- 柔光：CSS 变量 `--mx/--my` 跟随指针，径向渐变高光，透明度低。
- 扫光：一条斜向高光带，hover 时 0.9s 扫过，不要循环。

### 5.4 数字 ticker

```js
const BASE = 8720.86;
const PER_SEC = 0.0304;
const amount = BASE + PER_SEC * elapsedSeconds;
```

- 保留 2 位小数，千分位；等宽数字，避免字宽跳动。
- 页面隐藏/卡片不在视口时暂停；回到页面继续。
- 角标 `演示数据`；不要暗示真实工资。

---

## 6. 动效系统（拉到最满，但每一下都有用）

### 6.1 库与基础

- GSAP 3 + ScrollTrigger。
- Lenis 平滑滚动。
- Three.js 可选，只在能稳定 60fps 时用；CSS 极光作为兜底。
- 统一在 `gsap.matchMedia()` 里管理 `(prefers-reduced-motion: no-preference)` 和 `(min-width: 768px)`。

Lenis + ScrollTrigger 的标准接法：

```js
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 6.2 入场（0–2s）

- 背景极光：从 0.9 scale / 低透明度展开到 1，1.2s `power3.out`。
- Header：fade + y 12px。
- Eyebrow：clip-path 从左到右揭示。
- H1：按行（或按字）clip 揭示 + y 40px；0.8s，stagger 0.06–0.1。
- 介绍/CTA：0.6s stagger。
- 卡片：从 `y 60px / rotateX 6deg / scale .96` 进入；截图 mask 展开；迷你窗延迟 0.15s 浮入。
- 四色线：`scaleX 0 → 1`，1s。
- 不要所有元素同时动；先标题，再卡片，再细节。

### 6.3 滚动

- 桌面端（≥ 1024px，reduced-motion off）：Hero 可以短 pin（约 70–90vh），scrub 时标题上移/淡出、卡片放大到 1.05–1.08、轻微 rotateX，然后 Projects 进入。pin 不要太长，不能让人以为滚不动。
- 移动端：取消 pin，只做 reveal + 轻微 parallax。
- Projects 卡片：进入视口时 `y 40px → 0`、`opacity 0 → 1`，0.9s；截图和迷你窗有不同速度的 parallax。
- About/Footer：文字分行 reveal；marquee 在进入视口时启动。
- 背景极光随滚动缓慢位移（0–8%），不要跟得太快。

### 6.4 指针

- 卡片 tilt：见 5.3；只 `(pointer:fine)` 且 reduced-motion off。
- 自定义光标：6px 点 + 32px 环，lerp 跟随；在链接/卡片上放大；`cursor: none` 只在 fine pointer + hover 时启用；触屏/键盘保持原生。不要挡住点击。
- 磁吸 CTA：指针进入 80–120px 半径时，CTA 最多位移 8px，离开回弹。
- 卡片柔光/扫光：见 5.3。
- 迷你窗：指针移动时做 4–8px 的反向 parallax。

### 6.5 持续动效

- 金额 ticker（见 5.4）。
- 迷你窗：`y ±4px`、`rotate ±0.4deg`，6–8s 循环；reduced-motion 静态。
- 背景极光：20–30s 慢漂移；页面隐藏时暂停。
- Footer marquee：30–40s 线性循环；hover 暂停；reduced-motion 静态。
- 四色线/状态点：低频脉冲，不要闪。

### 6.6 降级

- `prefers-reduced-motion: reduce`：禁用 Lenis、pin、tilt、自定义光标、shader、marquee、扫光；显示所有最终状态；ticker 静态（或只显示一个值）。
- 触屏：无 tilt/自定义光标；保留 reveal、ticker、marquee（marquee 可暂停）。
- WebGL 不可用/掉帧：回退到 CSS 极光；不要在低端设备上强上 Three。
- 页面隐藏：暂停 ticker、极光、shader、marquee。

### 6.7 性能

- 只动 `transform` / `opacity`；不要动画 width/height/top/left。
- `will-change` 只给真正动的元素，动画结束移除。
- 图片用 WebP，PNG 回退；首屏截图 `fetchpriority="high"`；其余 lazy。
- 字体预加载；`font-display: swap`。
- Three.js DPR 上限 2（低端 1.5）；shader 分辨率降采样；页面隐藏暂停。
- 60fps 优先于“效果数量”；如果某个效果让帧率掉到 45fps，删掉它。

---

## 7. 技术栈与工程

### 7.1 脚手架

Node 22 / npm 10 已安装。

```powershell
cd D:\Data\Coding\demo\leelab-site
npm create vite@latest . -- --template vanilla
npm install
npm install gsap lenis
# 可选
npm install three
```

目录里已有 `assets/`、`CLAUDE.md`、`HANDOFF_PROMPT.md`、`README.md`、`.gitignore`。如果 Vite 因为目录非空而拒绝：

```powershell
npm create vite@latest _vite -- --template vanilla
# 把 _vite 下的 package.json / index.html / src / public 等合并到当前目录
# 保留 assets/、CLAUDE.md、HANDOFF_PROMPT.md、README.md、.gitignore
# 合并后删除 _vite
```

不要为了脚手架删掉 `HANDOFF_PROMPT.md` / `assets/` / 字体许可证。

### 7.2 目录建议

```
index.html
package.json
vite.config.js
public/
  assets/            # 把根目录 assets/ 里的文件移到这里，保留文件名
src/
  main.js
  styles/
    tokens.css
    base.css
    layout.css
    card.css
    motion.css
  motion/
    lenis.js
    intro.js
    scroll.js
    tilt.js
    cursor.js
    ticker.js
    shader.js        # 可选
  data/
    site.js          # 文案、链接、demo 数字集中在这里
```

- `public/assets` 用绝对路径 `/assets/...` 引用。
- 根目录 `assets/` 移完后可以删掉；`OFL-NotoSerifSC.txt` 必须保留。
- `src/data/site.js` 至少包含：姓名、邮箱、品牌语、介绍、官网 URL、demo 金额、卡片 chips。
- `index.html` 的 `<title>`、meta description、OG 标签；canonical 等域名确认后再加。

### 7.3 工程规则

- 不引入 React/Vue/Tailwind；用语义 HTML + 原生 CSS + 模块化 JS。
- GSAP 动画统一用 `gsap.context()` 或 `matchMedia` 管理，页面卸载/热更新时清理。
- ScrollTrigger 在图片加载、字体加载、resize 后 `refresh()`。
- 事件监听用 `AbortController` 或保存引用，避免 HMR 重复绑定。
- 不引入 analytics、追踪脚本、外部字体 CDN；首版自包含。
- 不在仓库里放 `.env`、服务器地址、token；部署配置 gitignore。
- 新项目独立 `git init`；不要初始化在 SalaryTicker 仓库里。

---

## 8. 素材使用

- 主截图：`<picture>` WebP 优先、PNG 回退；写明 `width="1455" height="1051"`，避免 CLS。
- 迷你窗：`<picture>`；`width="302" height="120"`。
- 图标：`app-icon.png` 用作卡片图标；`favicon.ico` 用作站点图标。
- 字体：`@font-face` 指向 `/assets/noto-serif-sc-display.woff2`；保留 OFL 许可证。
- 截图有透明边槽，放在奶油底/暖白卡上会自然融合；不要给它加白色实底。
- 所有数字是 demo；卡片上标「演示数据」；不要出现真实工资条、真实姓名、真实公司。
- 不要复制 SalaryTicker 的整站 HTML/CSS；只复用品牌 tokens 和素材。

---

## 9. 文案与合规

- 中文与英文、数字之间加空格：`Windows 10/11`、`18 个计薪日`、`¥0.0304 / 秒`。
- 不写「最准」「第一」「保证」「100%」等绝对化表述。
- SalaryTicker 的结果口径：仅供参考，以实际工资条为准。
- 不编造下载量、用户数、媒体报道、客户 logo。
- 个人简介只写已知事实；没有提供的内容用占位符或先问。
- 邮箱 `leemail208@163.com` 是公开信息；如果担心垃圾邮件，可以做成「点击复制」而不是明文 mailto，先问用户偏好。
- 外部链接 `target="_blank" rel="noopener"`。
- 页面标题默认：`Lee 老师 · leelab`；描述默认：`Lee 老师的个人站：写代码，也做点让上班没那么难熬的小工具。`
- 个人站域名未定前不要写 canonical/OG URL；部署前确认。

---

## 10. 响应式、可访问性、性能

### 响应式

- 断点：360 / 480 / 768 / 1024 / 1440。
- H1 用 `clamp()`；移动端 2 行以内，不要溢出。
- 卡片在移动端单列：截图全宽，迷你窗缩小或隐藏；chips 可换行。
- 触屏无 hover 依赖；所有交互有 press/focus 态。
- 页面不能横向滚动；长英文/邮箱要能断行。

### 可访问性

- 语义结构：`header/nav/main/section/footer`；H1 只有一个。
- 跳过导航链接（skip link）。
- 所有链接/按钮有 `:focus-visible` 明显焦点环。
- 卡片整张是链接时，键盘 Enter 可打开；不要嵌套交互元素。
- 图片 alt：主截图「SalaryTicker 主界面：本月已赚、今日已赚、当前小时、摸鱼按钮」；装饰图 `alt=""` / `aria-hidden`。
- ticker 用 `aria-live="off"`，避免读屏器每秒播报。
- 颜色对比：小字不用浅珊瑚；用深色变体；正文对比度 ≥ 4.5:1。
- reduced-motion 下所有内容可见、可操作；不能因为动画没跑而隐藏。

### 性能

- Lighthouse 目标：Performance ≥ 85（桌面 ≥ 90），Accessibility ≥ 95，Best Practices ≥ 95。
- LCP < 2.5s；CLS < 0.1；首屏 JS 尽量小。
- 图片总大小控制在 400KB 内（WebP 优先）；字体 257KB 预加载。
- 不在滚动事件里做布局读取；用 ScrollTrigger/rAF。
- 低端设备/移动端可以降级背景和 cursor；不要为了效果牺牲可用性。

---

## 11. 验收标准

- [ ] `npm run dev` 打开无控制台报错；`npm run build` 成功；`npm run preview` 正常。
- [ ] Hero、Projects、About、Footer 完整；只有一张 SalaryTicker 卡片。
- [ ] 卡片整张可点，打开 `https://salaryticker.leelab.com.cn/`（新标签），键盘可操作。
- [ ] 卡片显示：图标、名称、tagline、实时金额 ticker、截图、迷你窗、能力 chips、`演示数据`、`访问官网 ↗`。
- [ ] 动效：入场、滚动、3D tilt、柔光/扫光、磁吸 CTA、ticker、mini float、背景极光、footer marquee 都有，且不卡。
- [ ] 触屏无 tilt/自定义光标；`prefers-reduced-motion` 下内容完整、无 Lenis/pin/大幅动画。
- [ ] 360 / 768 / 1440 宽度无横向溢出；移动端卡片可读。
- [ ] 键盘 Tab 能走完导航、CTA、卡片、邮箱；焦点环可见。
- [ ] 无真实工资数据；卡片标「演示数据」；无编造个人信息。
- [ ] `README.md` / `CLAUDE.md` 更新了运行、构建、目录说明；没有密钥。
- [ ] SalaryTicker 仓库未被修改。

如果某项没做到，明确说明，不要用“已完成”带过。

---

## 12. 部署边界

- 个人站域名待确认（`leelab.com.cn` / `www.leelab.com.cn` / 其他）。
- 首版只本地开发；部署前先问用户域名、服务器、是否复用现有 Nginx。
- 构建产物是 `dist/`，纯静态；部署时上传到个人站根目录，单独 Nginx server block，HTTPS。
- 不要复用 `salaryticker.leelab.com.cn` 的 Nginx 配置或部署脚本；这是另一个站。
- 任何部署配置（host/user/key/path）只放本地 gitignored 文件；仓库里只留占位示例。
- 不在首版加统计/追踪；需要时先问。

---

## 13. 开工顺序

1. 读 `CLAUDE.md` 和本文件；检查 `assets/` 与 Node 版本。
2. 先问用户第 14 节的 4–5 个问题；确认后再写代码。
3. 脚手架 Vite；把 `assets/` 移到 `public/assets`；建立 tokens/base。
4. **先做无动效的静态版**：Hero/Projects/Card/About/Footer，桌面 + 移动端布局，确认内容和层级。
5. 再加动效，按层：
   - Lenis + ScrollTrigger 基础
   - 入场 timeline
   - 卡片 tilt / 柔光 / 磁吸 / 扫光
   - ticker / mini float / marquee / 背景
   - 可选 Three.js
6. 做 reduced-motion/触屏降级；用 DevTools 模拟 360/768/1440。
7. 跑 `npm run build` + `npm run preview`；检查控制台、Lighthouse、图片大小。
8. 更新 `README.md` / `CLAUDE.md`；报告改动、命令、截图/预览方式。
9. 只有用户明确要求时才部署。

---

## 14. 先问用户的问题

在写代码前，逐条确认：

1. **个人站域名**：`leelab.com.cn`、`www.leelab.com.cn`，还是其他？是否已备案/已解析？
2. **最终个人简介**：默认用「我是 Lee 老师，写代码，也做点让上班没那么难熬的小工具。」是否可以？About 段落是否用默认？
3. **GitHub / 社交链接**：要不要放？如果要，给准确 URL；不要猜。
4. **WebGL 背景**：接受 Three.js 极光吗？还是先 CSS 极光，保证轻量？
5. **邮箱展示**：明文 + mailto，还是「点击复制」？（公开邮箱有垃圾邮件风险。）
6. **是否还有其他项目**要预告？没有就保留「更多项目还在路上」，不要编造。
7. **人像/照片**：有没有想用的照片？没有就用排版和图标，不用 stock photo。

如果用户不回答，按默认方案继续，但在 README 里标注“待确认”。

---

## 15. 设计 tokens 速查

### 字号

```css
--text-display: clamp(3.25rem, 8.5vw, 7.5rem); /* H1 */
--text-h2: clamp(2rem, 4vw, 3.25rem);
--text-card-title: clamp(1.5rem, 2.4vw, 2rem);
--text-number: clamp(2.5rem, 5vw, 4rem);
--text-body: 1rem;      /* 16px，行高 1.8 */
--text-small: 0.8125rem;
--text-label: 0.6875rem; /* mono, uppercase, letter-spacing .18em */
```

### 间距

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`；section 上下 `clamp(80px, 12vw, 160px)`；容器 `max-width: 1200px`，左右 `clamp(20px, 5vw, 48px)`。

### 圆角 / 阴影

```css
--radius-sm: 12px;
--radius-md: 20px;
--radius-lg: 28px;
--shadow-card: 0 24px 70px rgba(90, 60, 40, .14), 0 6px 18px rgba(90, 60, 40, .07);
--shadow-soft: 0 10px 30px rgba(90, 60, 40, .08);
```

### 缓动

```css
--ease-out: cubic-bezier(.22, 1, .36, 1);
--ease-in-out: cubic-bezier(.65, 0, .35, 1);
--ease-spring: cubic-bezier(.34, 1.56, .64, 1);
```

### 四色线

```css
background: linear-gradient(90deg,
  #E07A5F 0 25%, #F4A261 25% 50%,
  #047857 50% 75%, #5B8DB8 75% 100%);
```

### 噪点

用内联 SVG `feTurbulence` 作为背景图，`opacity: .03–.05`，`pointer-events: none`，不要用大图。

---

## 16. 参考与提醒

- 官网：`https://salaryticker.leelab.com.cn/`
- 现有源码：`D:\Data\Coding\demo\SalaryTicker\server\index.html`（只参考，不要整站复制）
- 现有素材：`D:\Data\Coding\demo\SalaryTicker\server\assets\`（已复制到本项目 `assets/`）
- 现有站是原生 JS；新站用 GSAP/Lenis 是升级，不是重写官网。
- 动效的目标是“让人愿意多停 3 秒”，不是“让人晕”。每个效果都要有层级/叙事作用。
- 如果时间/性能取舍：**先保证首屏卡片好看、可点、60fps，再加背景和细节。**
- 有任何不确定的个人信息/域名/部署信息，先问，不要编。
