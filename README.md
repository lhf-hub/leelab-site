# leelab-site

Lee 的个人网站。**全站暗色、动效优先、英文为主中文为辅**的单页主页：3D 肖像 + 超大字号 + 两个项目（SalaryTicker / JobPilot）+ 博客 / GitHub / 邮箱入口。

- 本地已完成 v3，**尚未部署**。
- 域名已确认：`https://leelab.com.cn/`（canonical / OG 已按此预留；DNS、服务器、Nginx 尚未配置）。
- 身份：**Lee**。品牌：**leelab**。邮箱：`leemail208@163.com`（明文 + `mailto:`）。
- 早期「Less」是误读；也不使用「Lee 老师」。
- 设计方向参考 MotionSites 上的 agency / portfolio 类站点：暗色、满屏 Hero、3D 人物、打字机、超大字号。

## 分支

- `main`：当前主线，v3 暗色版。
- `v3`：重构分支，与 `main` 同一提交。
- v2 暖纸版保留在历史中（提交 `0229d3c`），需要回滚时 `git checkout -b v2 0229d3c`。

## 已确认的项目与链接

| 项目 | 说明 |
| --- | --- |
| SalaryTicker | Windows 实时工资计算器，1.2.0，免安装、免费；官网 `https://salaryticker.leelab.com.cn/` |
| JobPilot | 智能求职助手；当前在线预览 `http://47.106.222.233:8000/`，域名待定 |
| 博客 | `https://blog.csdn.net/lhf__` |
| GitHub | `https://github.com/lhf-hub?tab=repositories` |
| 邮箱 | `leemail208@163.com` |

## 技术栈

- Vite 8 + vanilla JavaScript（无 React / Vue / Tailwind）
- GSAP 3 + ScrollTrigger（首屏时间线、滚动 reveal、窗口视差）
- Lenis 1.3（平滑滚动，动态 import）
- Three.js 0.187（3D 肖像，空闲时动态 import，独立 chunk）
- 字体全部自托管：Anton（展示）、Inter（正文）、IBM Plex Mono（数据/标签）

## 常用命令

```bash
npm install
npm run dev       # 本地开发
npm run build     # 产物在 dist/
npm run preview   # 预览构建产物
```

## 目录

```text
index.html                  语义内容（Hero / Work / About / Contact / Footer）
public/
  robots.txt
  assets/
    fonts/                  自托管字体子集（anton / inter / plexmono）
    leelab-mark.svg         个人标记（favicon）
    leelab-mark-256.png     apple-touch-icon
    og-lee.jpg              个人 OG 海报，1200×630（暗色版）
    app-shot*.{webp,png}    SalaryTicker 主截图（1455×1051 + 响应式派生）
    jobpilot-shot*.{webp,png} JobPilot 在线预览截图（1200×750 + 派生）
    mini-shot.* / app-icon*.png / favicon.ico / noto-serif-sc-display.woff2
                            v2 遗留素材，v3 页面未引用（保留备查）
src/
  main.js                   入口：初始化顺序、空闲时加载 3D、清理
  data/site.js              链接、3D 肖像配置、打字机文案、演示金额
  styles/
    tokens.css              暗色令牌（色板、字号、间距、圆角、缓动）
    base.css                字体、重置、颗粒/辉光氛围层、3D 舞台、工具类
    layout.css              Header / Hero / 章节头 / Work / About / Contact / Footer
    card.css                项目卡、金额读数、规格表、产品窗口
    motion.css              入场初始态、自定义光标、reduced-motion 降级
  motion/
    portrait.js             Three.js 肖像（GLB + 程序化替身）
    intro.js                首屏标题遮罩时间线
    scroll.js               header 状态、reveal、Hero→肖像滚动交接、窗口视差
    typewriter.js           打字机
    ticker.js               实时金额（视口外/页面隐藏暂停）
    cursor.js               自定义光标
    ui.js                   UTC+8 时钟、磁吸按钮、卡片指针光
    lenis.js                平滑滚动
DESIGN.md                   设计系统（暗色 v3）
CLAUDE.md                   给后续会话的短规则
PRODUCT.md                  产品事实
```

## 3D 肖像（重要）

Hero 的 3D 舞台已经做好，**现在跑的是程序化替身**（金属二十面体 + 轨道环），不是人像。

接真人像只要一步：

1. 把导出的模型放到 `public/assets/portrait.glb`（.glb / .gltf + 贴图，建议 ≤ 3 MB，单位米、朝 +Z）。
2. 不用改代码：`src/motion/portrait.js` 会优先加载它，失败才回落到替身。
3. 需要微调时改 `src/data/site.js` 里的 `portrait`：`height`（占屏高比例）、`x`（水平偏移）。

模型会做：自动缓慢旋转、鼠标视差、滚动驱动旋转与上移、页面隐藏暂停、reduced-motion 只渲染一帧。≤ 1023px 宽不加载 3D（性能与排版考虑）。

## 页面与交互

- **Header**：`LEE®` 字标 + `leelab`；Work / About / Blog ↗ / GitHub ↗ / Write to me；滚动后收缩并加暗色玻璃。
- **Hero**：满屏。`I make tools for the hours you sell.` 四行 Anton 大字；右侧 3D 肖像；底部打字机（轮播 4 句）、中文一行、两个 CTA、右侧状态与 scroll 提示。
- **Work**：`01 / Selected work` + `Two tools, one hand.`；两张整卡链接的项目卡 —— 编号、平台、状态、产品名、中文名、一句 pitch + 中文、SalaryTicker 的实时金额读数（演示数据）、四格规格表、产品窗口截图。
- **About**：`One person, end to end.`；两段英文 + 一段中文 + 手写感中文签名；右侧规格表（Focus / Role / Stack / Based / Email / Status）。
- **Contact**：`Got something worth making?` + 大号邮箱 + 博客 / GitHub / Email。
- **Footer**：暗色 marquee（Build small · ship often / Open for work / Made by one hand）+ 版权与回到顶部。

## 动效与降级

- 入场：标题四行遮罩上移 → topline / 底部渐显（等待字体就绪，避免跳动）。
- 滚动：header 收缩、`[data-reveal]` 渐显、Hero 滚出时肖像放大旋转并淡出、产品窗口轻微视差。
- 指针（fine pointer）：磁吸按钮（≤8px）、卡片指针光、自定义光标（信号点 + 滞后环）。
- 持续：打字机、实时金额、marquee、3D 缓慢自转、UTC+8 时钟。
- **reduced-motion**：不加载 Lenis / 光标 / 玻璃动效；首屏直接呈现；marquee 静态；金额固定；3D 只渲染一帧或跳过。
- **触屏 / ≤1023px**：不加载 3D、无自定义光标；打字机与金额保留。
- 页面隐藏时暂停金额 ticker 与 WebGL 渲染循环。

## 内容与合规

- SalaryTicker 的金额是**演示数据**，卡片上有 `Demo data` 角标；不是真实工资条。
- JobPilot 截图来自当前在线预览页；不编造用户数、下载量、商业成绩。
- JobPilot 的 `Domain / Pending` 是事实；拿到域名和 HTTPS 后再更新。
- 不编造经历、公司、职位、学历、社交账号；不写「最」「第一」「保证」「100%」。
- 中英文之间加空格；英文为主、中文为辅。
- 无 analytics、外部字体 CDN、密钥或服务器地址；`.gitignore` 已忽略部署配置与 `.impeccable/review/`。

## 素材来源

- `app-shot*`、`jobpilot-shot*`：同 v2，来自 SalaryTicker 演示素材与 JobPilot 公开首页截图。
- `og-lee.jpg`：v3 暗色海报，用站点自己的字体与标题在本地渲染。
- `leelab-mark.svg` / `leelab-mark-256.png`：v3 个人标记（黑底珊瑚 L）。
- `fonts/*.woff2`：Google Fonts 的 latin 子集（Anton / Inter / IBM Plex Mono，均为 OFL）。
- v2 的 Noto Serif SC 子集与四色标记仍在 `public/assets/`，v3 页面不再引用。

## 验证（2026-11-19，本地）

- `npm run build` 通过；`npm run preview` 正常；生产构建无控制台错误/警告。
- 1440 / 1280 / 768 / 390 均无横向滚动；1440 与 390 已逐屏检查。
- 3D chunk 为懒加载（约 158 kB gzip），不参与首屏；字体全部本地。
- 键盘：skip link、导航、两张项目卡、About / Contact 链接、回到顶部均可 Tab。
- **待复测**：Lighthouse 分数、Safari / Firefox 首次渲染、真实 GLB 接入后的加载与降级。

## 尚未完成 / 待确认

- **3D 人像**：等 `public/assets/portrait.glb`（用户提供）。
- **部署**：域名已确认；服务器、Nginx、HTTPS、DNS 未配置。
- **JobPilot 域名**：只有 HTTP IP 预览。
- **OG / favicon**：v3 已重做；如需 16px 极致清晰度可再出专用小尺寸位图。
- **统计 / 追踪**：没有，需要时先确认。
