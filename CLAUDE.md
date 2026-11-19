# leelab-site

Lee 的个人网站。**当前 v3：全站暗色、动效优先、英文为主中文为辅**的单页主页；3D 肖像 + 超大字号 + SalaryTicker / JobPilot 两个项目，以及博客 / GitHub / 邮箱入口。已本地完成，**尚未部署**。

## 第一件事

读 `README.md` 和 `DESIGN.md`。`HANDOFF_PROMPT.md` 是 v1 的原始需求，**已过时**（暖纸/四色/克制的边界已被 v3 推翻），只在需要历史背景时看。

已确认、不要重新问：

- 身份 / 展示名 **Lee**；品牌 **leelab**；域名 `leelab.com.cn`。
- 邮箱 `leemail208@163.com`，明文 + `mailto:`。
- 项目：SalaryTicker（Windows 工资计算器，`https://salaryticker.leelab.com.cn/`）+ JobPilot（Web 智能求职助手，`http://47.106.222.233:8000/`，域名待定）。
- 外链：博客 `https://blog.csdn.net/lhf__`、GitHub `https://github.com/lhf-hub?tab=repositories`。
- 不做：X / Bilibili 等其他社交；没有 analytics；不加更多项目。
- 首版不部署；部署前确认域名、服务器、Nginx、HTTPS 归属。

## 技术栈

- Vite 8 + vanilla JavaScript（不引入 React / Vue / Tailwind）
- GSAP 3 + ScrollTrigger、Lenis 1.3（动态 import）
- Three.js 0.187，仅 `src/motion/portrait.js`，空闲时动态 import，独立 chunk；≤1023px 不加载
- 字体自托管：Anton / Inter / IBM Plex Mono（`public/assets/fonts/`）

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 分支

- `main`：当前主线，即 v3 暗色版（`b45a804`）。
- `v3`：重构分支，与 `main` 同一提交。
- v2 暖纸版留在历史里：`0229d3c`。需要回滚时 `git checkout -b v2 0229d3c`。

## 规则

- **不改** `D:\Data\Coding\demo\SalaryTicker`；那是独立项目。
- 身份统一用 Lee；不要出现 Less / Lee 老师。
- **视觉沿用 v3 暗色系统**：黑底 `#080706`、珊瑚信号色 `#FF5A36`、金额绿 `#5CF0A8`、Anton 大字 + Inter 正文 + Plex Mono 数据。不要退回暖纸 / 四色细条 / 模糊极光。
- 英文为主、中文为辅：英文承担主标题与信息，中文做下一级的对照行；中英文之间加空格。
- SalaryTicker 的金额、截图与读数标「Demo data / 演示数据」；JobPilot 的截图来自在线预览页，不编造截图或指标。
- JobPilot 暂无域名：保持 `Domain / Pending`、`Open preview`；拿到域名和 HTTPS 后再改链接。
- 外链必须 `target="_blank"` + `rel="noopener noreferrer"`；邮件用 `mailto:`。
- 不用「最」「第一」「保证」等绝对化表述。
- 支持 `prefers-reduced-motion`；触屏不启用自定义光标；≤1023px 不加载 3D。
- 动效 60fps：只动 transform / opacity；页面隐藏时暂停 ticker 与 WebGL。
- 3D 肖像：`public/assets/portrait.glb` 存在即自动替换程序化替身，参数在 `src/data/site.js` 的 `portrait`。
- 不把密钥、服务器地址、token 写进仓库；部署配置本地 gitignore。
- 文案静态写在 `index.html`，数据 / 链接在 `src/data/site.js`；改内容时两处一起检查。
- 每张项目卡整张是单个 `<a>`，不要在里面嵌套交互元素。

## Git 身份（重要）

本仓库用**私人账号**身份，不要用公司身份提交：

```bash
git config user.name "lhf-hub"
git config user.email "lhf-hub@users.noreply.github.com"
```

远端：`https://github.com/lhf-hub/leelab-site.git`。公司仓库/公司身份一概不涉及本项目。

## 当前状态

v3 已完成并通过本地检查：

- 1440 / 1280 / 768 / 390 逐屏检查，无横向滚动；生产构建无控制台错误。
- 3D 走懒加载；字体本地；reduced-motion 与触屏已降级。
- 待办：接入用户提供的 `portrait.glb`；Lighthouse 复测；部署。
