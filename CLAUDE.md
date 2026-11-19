# leelab-site

**Lee** 的个人网站。暖色、纸张感、克制的单页主页；放 **SalaryTicker** + **JobPilot** 两个项目，以及博客 / GitHub / 邮箱入口。已本地完成，**尚未部署**。

## 第一件事

读 `README.md` 和 `HANDOFF_PROMPT.md`。`HANDOFF_PROMPT.md` 是原始需求，但以下已由用户确认，优先于文档里的旧边界，**不要重新问**：

- 身份 / 展示名 **Lee**；不用「Less」，也不用「Lee 老师」。早期「Less」是误读。
- 域名 `leelab.com.cn`；canonical / OG 已按 `https://leelab.com.cn/` 预留。
- 邮箱 `leemail208@163.com`，明文 + `mailto:`。
- 项目：SalaryTicker（Windows 工资计算器）+ JobPilot（Web 智能求职助手，`http://47.106.222.233:8000/`，域名待定）。
- 外链：博客 `https://blog.csdn.net/lhf__`、GitHub `https://github.com/lhf-hub?tab=repositories`。
- 两张项目卡「错落」排：SalaryTicker 大卡，JobPilot 右侧偏移的小卡。
- 个人标记：四色八芒星 + Lee 字标；header / footer / favicon / OG 不再使用 SalaryTicker 的图标。
- 不加 X / Bilibili 等其他社交；没有人像；没有更多项目；没有 analytics。
- 首版不部署；部署前确认域名、服务器、Nginx、HTTPS 归属。

## 技术栈

- Vite 8 + vanilla JavaScript（不引入 React / Vue / Tailwind）
- GSAP 3 + ScrollTrigger
- Lenis 1.3
- Three.js（仅 `src/motion/shader.js`，由 `main.js` 在首次交互时动态 import；CSS 极光负责首屏，不要改回首屏同步 import）

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 目录

```text
index.html              静态语义内容（Hero / 两个项目卡 / About / Footer）
src/main.js             入口与模块初始化/清理
src/data/site.js        链接、projects、demo 金额
src/styles/             tokens / base / layout / card / motion
src/motion/             lenis / shader / intro / scroll / tilt / cursor / ticker / ui
public/assets/          个人标记 / OG / 两个项目截图 / 字体 / OFL 许可证
PRODUCT.md              产品事实
DESIGN.md               设计系统
HANDOFF_PROMPT.md       原始需求
README.md               运行、结构、验证、待办
```

## 规则

- **不改** `D:\Data\Coding\demo\SalaryTicker`；这是独立项目。
- 身份统一用 Lee；不要出现 Less / Lee 老师。
- SalaryTicker 的金额、截图与迷你窗标「演示数据」；JobPilot 的截图来自在线预览页，不能编造截图或指标。
- JobPilot 暂无域名，保持「域名待定 / 在线预览」；拿到域名和 HTTPS 后再更新链接。
- 外链必须 `target="_blank"` + `rel="noopener noreferrer"`；邮件用 `mailto:`。
- 中文与英文、数字之间加空格；不用「最」「第一」「保证」等绝对化表述。
- 视觉沿用 Warm 色板；珊瑚 `#E07A5F` 不做小字，小字用 `#B4533C` / 墨色。
- 支持 `prefers-reduced-motion`；触屏不启用 3D tilt / 自定义光标。
- 动效优先 60fps；只动 transform / opacity；页面隐藏时暂停 ticker、CSS 动画和 WebGL。
- 不把任何密钥、服务器地址、token 写进仓库；部署配置本地 gitignore。
- 文案静态写在 `index.html`，数据 / 链接在 `src/data/site.js`；改内容时两处一起检查。
- 每张项目卡整张是单个 `<a>`，不要在里面嵌套交互元素。

## 当前状态

v2 已完成并通过本地验收：

- 两个项目卡、项目索引、博客 / GitHub / 邮箱入口、个人标记 / favicon / OG 海报已接好。
- `npm run build` / `npm run preview` / `npm run dev` 均无控制台错误。
- Lighthouse（本地 headless Chrome）：Desktop 100 / 100 / 100 / 100；Mobile 96 / 100 / 100 / 100（Performance / Accessibility / Best Practices / SEO，2026-11-19）。
- 360 / 390 / 768 / 1440 无横向滚动；触屏与 reduced-motion 已降级；键盘可走完导航、项目索引、两张卡、About 链接、页脚链接。
- 未做 HANDOFF 标注为可选的 Hero 短 pin；用标题视差 / 卡片视差替代。
- 部署、JobPilot 域名 / HTTPS、其他社交、人像、额外项目、统计脚本都未做，需要用户确认后再加。
