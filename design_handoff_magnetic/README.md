# 交接：个人简历单页 · "磁场 (Magnetic Field)" 方向

> Handoff package for a single-page personal résumé site — visual direction **"Magnetic Field"**.
> 本文档为中英混排，开发者无需阅读原始对话即可独立实现。

---

## 1. 概述 Overview

这是一个**个人简历单页网站**（one-page résumé），面向一位"有创意的开发者"。设计主打**物理感交互**：标题文字会被鼠标弹开、可一键"开启重力"让标题塌落弹跳、技能标签与按钮有磁性吸附、成果卡片随鼠标 3D 倾斜。

核心特性：
- **中英双语**即时切换（默认中文），偏好记忆
- **日 / 夜双主题**（默认浅色"白天"），偏好记忆，无闪烁
- **成果 Before/After 对比滑块**（可拖拽 / 键盘 / 按钮），承载"项目导向"的前后成果叙事
- 全部内容当前为**占位文本**，等待替换为真实简历数据
- 完整的 `prefers-reduced-motion` 无障碍降级

---

## 2. 关于设计文件 About the Design Files

本包内的 HTML/JS 文件是**用 HTML 制作的设计参考稿（design references）**——它们是展示**预期外观与交互行为**的高保真原型，不是要逐行照搬的生产代码。

你的任务是：**在目标代码库的现有环境中重建这套设计**（React / Vue / Svelte / 原生等），沿用该项目既有的组件模式、样式方案与工具库。如果项目尚无前端环境，请为其选择最合适的框架再实现。

> 这套原型是纯静态前端，无后端、无构建步骤、无 npm 依赖。所有动效是手写的原生 JS + CSS。字体走 Google Fonts CDN。把它当作"该长什么样、该怎么动"的权威说明书。

---

## 3. 保真度 Fidelity

**高保真 (Hi-Fi)。** 颜色、字号、间距、动效参数均为最终值，请像素级还原。下文第 9 节给出完整 design tokens；交互时序见第 6 节。唯一"低保真"的部分是**内容**——全是占位符，需替换为真实文案与图片（见第 8 节）。

---

## 4. 技术栈与依赖 Stack & Dependencies

| 项 | 说明 |
|---|---|
| 结构 | 单个 `direction-h.html` |
| 依赖脚本 | `site.js`（双语）、`theme.js`（主题）、`compare.js`（对比滑块）—— 三个均为独立 IIFE，无框架 |
| 页面内脚本 | `direction-h.html` 底部 `<script>` 内含：字符物理、重力彩蛋、磁性吸附、3D 倾斜、滚动入场 |
| 字体 | Google Fonts：`Space Grotesk`（拉丁展示体）、`Noto Sans SC`（中文）、`JetBrains Mono`（标签/数字） |
| 防闪烁 | `<head>` 内一段内联脚本在首帧前读取 `localStorage` 设置 `data-theme`，**必须保留同等机制** |
| 存储 | `localStorage`：键 `resume-lang`（`zh`/`en`）、`resume-theme`（`light`/`dark`） |

> **重建建议**：在 React 里，把双语做成 i18n context / `useTranslation`；主题做成 `data-theme` + context 或 CSS class；对比滑块、字符物理各做成独立组件 / hook。下文逻辑可直接移植。

---

## 5. 页面结构 Screens / Sections

单页纵向滚动。固定顶栏 + 5 个区块。设计宽度响应式，断点 `820px`。

### 5.0 顶栏 Topbar（`position: fixed`）
- 左：Logo `◉ BO SONG`（`◉` 为品红强调色，`Space Grotesk` 700/16px）
- 右：锚点导航（成果 / 能力 / 联系）+ 主题切换按钮（圆形，☀/☾）+ 语言切换按钮（圆角胶囊，`中/EN`）
- padding：`16px var(--pad)`；`--pad = clamp(20px, 5vw, 76px)`

### 5.1 Hero · 磁场首屏（`#hero`）
- **布局**：`min-height:100vh`，flex 纵向居中，`padding: 110px var(--pad) 60px`，`overflow:hidden`
- **Kicker 行**（顶部小字，`JetBrains Mono` 12.5px，字距 0.1em，muted 色）：三段，含品红圆点 `●` + "磁场已激活 / MAGNETIC FIELD ACTIVE"、"把鼠标划过名字试试"、"2026 · 上海"
- **主标题 `#field`**（核心）：`Noto Sans SC` 900，`font-size: clamp(56px, 13vw, 210px)`，`line-height:1.02`，`letter-spacing:-0.01em`。结构为**逐字符 span**：
  - 每个 `.ch` 是 `display:inline-block`、`will-change:transform`、`cursor:default`
  - 按"词"分组：`<span class="word">` 内含若干 `.ch`；`.word` 之间 `margin-right:0.35em`，`white-space:nowrap`（保证词内不断行）
  - 文本："宋柏" / "BO"（拉丁，`.ch.latin` 用 Space Grotesk 700） / "SONG"（拉丁） / 换行 / "创意"（`.ch.accent` 品红色）+ "开发者"
  - 整个 `<h1>` 带 `aria-label="宋柏 BO SONG 创意开发者"` 供屏幕阅读器
- **副文案**：`max-width:620px`，`clamp(15.5px,1.8vw,21px)`，`line-height:1.75`，soft 色
- **操作区**：
  - `.gravity-btn`（"开启重力 ↓"）：品红底白字，2px 黑描边，圆角胶囊，`box-shadow: 4px 4px 0 var(--fg)`（硬投影 neo-brutalist 风）；hover 位移 `-2,-2` 且投影变 `6px`；active 位移 `2,2` 投影变 `1px`
  - 旁边一句 mono 提示 `#gravityHint`："警告：标题会塌下来"

### 5.2 成果对比 Results（`#work`）
- **区块头** `.sec-head`：序号 `01`（品红 mono）+ 大标题 `<h2>`（`clamp(32px,5.4vw,76px)` 900）+ 右侧 aside 提示
- **网格** `.hgrid`：`grid-template-columns: repeat(2,1fr)`，`gap: clamp(24px,3.4vw,44px)`，`perspective:1100px`（开启 3D）。820px 以下变单列
- **卡片** `.hcard`：`transform-style:preserve-3d`，鼠标移入做 `rotateX/Y` 倾斜（≤5°），移出归零。**注意：拖拽对比滑块时（`e.buttons` 为真）不触发倾斜**
- **对比组件** `.compare`：见第 7 节。卡片偶数项投影方向镜像（`-5px 5px 0` vs `5px 5px 0`）
- **卡片说明** `.hcap`：标题（900，`clamp(19px,2.2vw,28px)`）+ 描述（muted 14px）+ 右侧年份（品红 mono 700）

### 5.3 能力 Skills · 磁性标签（`#skills`）
- 区块头序号 `02`，标题"能力磁极 / Force Field"
- `.chips`：flex 自动换行，`gap:14px`，`max-width:900px`
- 每个 `.chip`：`Noto Sans SC` 700，`clamp(15px,1.8vw,21px)`，2px 黑描边，圆角胶囊，`padding:12px 24px`，带 `data-mag` 触发磁性吸附（见 6.3）
- hover 配色按 `nth-child` 轮换：第 1/4/7 个品红底、2/5/8 蓝底、3/6/9 反色（黑底白字）
- 标签文本：JavaScript / TypeScript / React / Node.js / 视觉设计 / CSS 动效 / WebGL / 品牌系统 / 原型设计

### 5.4 经历 Experience · 轨道（`#`，第三区块）
- 区块头序号 `03`，标题"轨道经历 / Orbits"
- 每行 `.orbit-row`：grid `64px 1fr auto`，`padding:22px 0`，上下 1.5px 分隔线；hover 时 `padding-left:16px`（左滑入效果）
- 左侧 `.sat`：34px 圆环，`::after` 是一个绕轨道公转的小卫星圆点（`@keyframes orbit` 旋转，三行公转周期不同 3.4/4.6/5.8s）
- 中间：职位（900，`clamp(18px,2.2vw,27px)`）+ 公司（muted 14px）；右侧年份（muted mono）

### 5.5 联系 Contact · 磁性邮件（`#contact`）
- 居中布局，`padding: clamp(80px,12vw,170px) var(--pad)`
- 顶部 mono 小字"这颗按钮也有磁性 / THE BUTTON IS MAGNETIC TOO"
- `.magnet-mail`（核心 CTA）：`Space Grotesk` 700，`clamp(30px,6.6vw,92px)`，品红底白字，3px 黑描边，**全圆角**（`border-radius:999px`），硬投影 `6px 6px 0`；整页范围内磁性吸附（见 6.3）
- `.socials`：四个胶囊链接（GitHub / Dribbble / X / 微信），各带 `data-mag` 磁性；hover 反色

### 5.6 页脚 Footer
- grid 三列：版权 / 方向名 / 返回顶部；mono 12px，muted 色

---

## 6. 交互与行为 Interactions & Behavior

> 全部动效在 `prefers-reduced-motion: reduce` 时关闭（脚本开头 `if (reduced) return;`，CSS 兜底把 `.ch` transform 归零、停掉所有 `animation`）。请在重建时保留这一降级。

### 6.1 字符物理：鼠标弹开 + 弹簧归位（核心 "哇" 点）
作用对象：`#field .ch` 全部字符。每个字符维护状态 `{x, y, vx, vy, r, vr}`（位移、速度、旋转、角速度），在一个 `requestAnimationFrame` 循环里积分：
- **斥力**：取字符中心与鼠标距离，若在半径 `170px` 内，施加沿连线方向、强度 `(1 - d/rad) * 4.2` 的力到 `vx/vy`
- **弹簧归位**：`vx += -x * 0.055`（朝原点拉回），角度同理 `vr += -r * 0.06`
- **阻尼**：每帧 `vx,vy *= 0.86`，`vr *= 0.85`
- 写回 `el.style.transform = translate(x,y) rotate(r)`
- 鼠标移入 `#hero` 时更新鼠标坐标，`mouseleave` 时把坐标移到远处（`-9999`）让字符自然归位

### 6.2 重力彩蛋（`.gravity-btn` 点击）
切换布尔 `gravity`：
- **开启**：给每个字符一个随机初速度与角速度，进入"下落"模式——每帧 `vy += 0.9`（重力加速度），字符积分下落；当字符底边触及 hero 容器底部上方 30px 的"地面"时，`vy *= -0.42`（弹跳衰减）、`vx *= 0.92`、`vr *= 0.8`，速度足够小时停住。整体效果是标题文字"塌下来砸到地面再弹几下"
- 按钮文案切换为"恢复秩序 ↺"，提示变"（点击恢复）"
- **再次点击**：回到 6.1 的鼠标斥力 + 弹簧模式，字符弹回原位
- 文案随当前语言（`data-lang`）切换中/英

### 6.3 磁性吸附（`[data-mag]`：技能标签、社交链接、邮件按钮）
- 普通元素：`mousemove` 时按光标相对元素中心的偏移，平移元素 `translate(dx*0.22, dy*0.3)`；`mouseleave` 加一段 `.45s` 缓动过渡归位
- 大邮件按钮 `#magnetMail`：监听**全窗口** `mousemove`，在 `max(元素宽, 280px)` 的吸引半径内按 `pull = 1 - d/reach` 比例平移，范围外归零——形成"靠近就被吸过去"的强磁感

### 6.4 成果卡片 3D 倾斜（`[data-tilt]`）
`mousemove` 取光标在卡片内的归一化坐标，做 `rotateY(px*5deg) rotateX(-py*5deg)`；移出归零。拖拽对比滑块时（`e.buttons`）跳过，避免与滑块冲突。

### 6.5 对比滑块（见第 7 节）

### 6.6 滚动入场
`[data-reveal]` 元素用 `IntersectionObserver`（阈值 0.15）加 `.in` 类：从 `opacity:0; translateY(24px)` 过渡到可见，缓动 `cubic-bezier(.16,1,.3,1)`，时长 0.8s。

### 6.7 双语切换（`site.js`）
点击 `[data-lang-toggle]` 在 `zh`/`en` 间切换：遍历所有 `[data-en]` 元素，按当前语言取 `data-zh` 或 `data-en` 写入 `textContent`；同时设 `<html lang>` 与 `data-lang`，并把按钮 `data-current` 同步用于高亮。写入 `localStorage['resume-lang']`。

### 6.8 主题切换（`theme.js`）
点击 `[data-theme-toggle]` 在 `light`/`dark` 间切换 `<html data-theme>`，写 `localStorage['resume-theme']`。`<head>` 内联脚本在首帧应用，防止深色用户看到白色闪屏。

---

## 7. 对比滑块组件 `compare.js`（Before/After）

承载简历的"项目前后成果"叙事，是项目导向简历的关键控件。

**标记结构**：
```html
<div class="compare" data-start="52">
  <div class="cmp-pane cmp-after"><!-- 改造后：真实成果图 --></div>
  <div class="cmp-pane cmp-before"><!-- 改造前：原状图 --></div>
  <div class="cmp-line"></div>
  <button class="cmp-handle" aria-label="拖动对比"><span class="cmp-chev l"></span><span class="cmp-chev r"></span></button>
  <span class="cmp-tag cmp-tag-before" data-en="BEFORE" data-zh="改造前">改造前</span>
  <span class="cmp-tag cmp-tag-after" data-en="AFTER" data-zh="改造后">改造后</span>
  <div class="cmp-ctrl"><button data-go="100">前</button><button data-go="0">后</button></div>
</div>
```
**机制**：用 CSS 变量 `--p`（百分比）控制 `.cmp-before` 的 `clip-path: inset(0 calc(100% - var(--p)) 0 0)`，露出左侧"改造前"。`data-start` 设初始分割位置。
**输入方式**：① 指针拖拽（鼠标 + 触摸，pointer 事件 + setPointerCapture）；② 键盘（handle 为 `role="slider"`，方向键 ±4、Shift ±10、Home/End 到 0/100）；③ 前/后按钮跳到 100/0，带 `.cmp-anim` 过渡类。
**贴心细节**：滚动进入视口时做一次"轻推"动画（±16%）暗示可交互；`prefers-reduced-motion` 下不推。支持一页多个实例。

---

## 8. 待替换的占位内容 Placeholder Content

实现时**所有下列内容都要换成真实简历数据**，并**保留 `data-zh` / `data-en` 双语属性结构**（两种语言都要给）：

| 位置 | 占位内容 | 替换为 |
|---|---|---|
| Hero 标题 | 宋柏 / BO SONG / 创意开发者 | 真实姓名 + 英文名 + 一句话定位 |
| Hero 副文案 | "一个让界面有手感的创意开发者…" | 真实自我介绍 |
| 成果卡 ×2 | "项目一/二 · 成果"、灰色条纹占位块 | 真实项目名 + 描述 + **真实 before/after 截图**（替换 `.cmp-ph` 占位为 `<img>`） |
| 技能标签 ×9 | JavaScript…原型设计 | 真实技能（可增减数量，hover 配色按 nth-child 自动轮换） |
| 经历 ×3 | "职位/头衔"、"公司/工作室"、年份 | 真实经历 |
| 联系 | hello@example.com、四个社交链接 | 真实邮箱与社交主页 |

> **替换成果图**：把 `<div class="cmp-ph cmp-ph-after"><span>…</span></div>` 整块换成 `<img src="…" alt="…" style="width:100%;height:100%;object-fit:cover">`，before 同理。其余对比结构不动。

---

## 9. 设计令牌 Design Tokens

CSS 自定义属性，定义在 `:root`（浅色）与 `html[data-theme="dark"]`（深色）。

### 颜色 Colors
| Token | 浅色 Light | 深色 Dark | 用途 |
|---|---|---|---|
| `--bg` | `#f4f0e8` | `#0e0b10` | 页面背景 |
| `--fg` | `#181410` | `#f3efe7` | 主文字 / 描边 / 硬投影 |
| `--muted` | `#71695d` | `#8d8579` | 次要文字 |
| `--soft` | `#4e463b` | `#c8c0b2` | 正文段落 |
| `--line` | `rgba(24,20,16,.16)` | `rgba(243,239,231,.16)` | 分隔线 / 边框 |
| `--pink` | `#f4478f` | `#f4478f` | 品红强调（按钮底、滑块手柄） |
| `--pink-deep` | `#d6307e` | `#ff7ab8` | 品红文字 / 序号 / accent 字符 |
| `--blue` | `#4d5bff` | — | 标签 hover 第二色 |
| `--pho1/2` | `#fcd9e9 / #f9c6de` | `#3c1126 / #4b1730` | "改造后"占位条纹 |
| `--ph1/2` | `#e6e1d5 / #ede9de` | `#181420 / #1f1a29` | "改造前"占位条纹 |

> 强调色为**品红/玫红 (`#f4478f`)**。这是用户在设计阶段从"高饱和点缀"系列中选定的方向（注：本简历的姊妹方向使用橙 `#ff5436` / 蓝 `#4d5bff` / 绿 `#1fb86b`，如需统一品牌色可替换 `--pink`）。

### 字体 Typography
| Token | 字体栈 |
|---|---|
| `--display` | `"Space Grotesk", "Noto Sans SC", sans-serif` — 拉丁展示/数字 |
| `--cjk` | `"Noto Sans SC", "Space Grotesk", sans-serif` — 中文与正文，标题用 900 |
| `--mono` | `"JetBrains Mono", monospace` — 标签、kicker、年份、提示 |

字号一律用 `clamp()` 流式缩放（已在第 5 节逐处标注）。中文标题 weight 900，拉丁展示 700。

### 间距与形状 Spacing & Shape
| Token / 值 | 用途 |
|---|---|
| `--pad: clamp(20px, 5vw, 76px)` | 全局左右安全边距 |
| 区块纵向 `clamp(70px, 10vw, 140px)` | section 上下 padding |
| `border-radius: 999px` | 按钮 / 标签 / 邮件全圆角 |
| `border-radius: 10px` | 成果卡片 / 对比框 |
| 描边 `2px` / `2.5px` / `3px solid var(--fg)` | neo-brutalist 黑边 |
| 硬投影 `4px 4px 0 var(--fg)`（按钮）/ `6px 6px 0`（邮件）/ `5px 5px 0 var(--pink)`（成果卡） | 实心位移投影，**无模糊** |

### 关键动效参数 Motion
| 参数 | 值 |
|---|---|
| 字符斥力半径 / 强度 | `170px` / `(1-d/rad)*4.2` |
| 字符弹簧 / 阻尼 | 位移 `0.055`、角度 `0.06` / `*0.86`（线）、`*0.85`（角） |
| 重力加速度 / 弹跳衰减 | `vy += 0.9` / `*-0.42` |
| 磁性吸附比例 | 普通 `x*0.22, y*0.3`；邮件按钮 `pull*0.3` |
| 卡片倾斜角上限 | `±5deg` |
| 入场过渡 | `0.8s cubic-bezier(.16,1,.3,1)`，位移 24px |
| 通用缓动 | `cubic-bezier(.16,1,.3,1)`（入场/归位）、`cubic-bezier(.4,0,.2,1)`（对比过渡） |
| 断点 | `820px`（成果单列、隐藏经历年份列） |

---

## 10. 资源 Assets

- **无位图 / 图标资源**：所有图形（Logo `◉`、音符以外的标记、卫星圆点、雪佛龙箭头、占位条纹）均为纯 CSS / Unicode 字符，无需下载。
- **字体**：Google Fonts CDN（`Space Grotesk` / `Noto Sans SC` / `JetBrains Mono`）。生产环境建议自托管 woff2 以提速并避免第三方依赖。
- **唯一需要的真实素材**：每个项目的 **before/after 成果截图**（替换对比滑块里的条纹占位）。

---

## 11. 文件清单 Files

| 文件 | 内容 |
|---|---|
| `direction-h.html` | 主文件：完整结构 + 全部 CSS（`<style>`）+ 字符物理/重力/磁性/倾斜脚本 |
| `site.js` | 双语切换（`window.ResumeI18N`） |
| `theme.js` | 日/夜主题切换（`window.ResumeTheme`） |
| `compare.js` | Before/After 对比滑块（自动初始化所有 `.compare`） |

直接在浏览器打开 `direction-h.html` 即可预览（需联网加载字体；首次需点页面任意处以激活部分浏览器的指针事件）。

---

## 12. 验收清单 Acceptance Checklist

- [ ] 浅色为默认；切到深色后刷新不闪白；偏好被记住
- [ ] 中/英切换覆盖所有可见文案；刷新后保持
- [ ] 鼠标划过 Hero 标题，字符被弹开并平滑弹回
- [ ] "开启重力"使标题塌落弹跳；"恢复秩序"复位；按钮文案随语言变
- [ ] 技能标签、社交链接、邮件按钮有磁性吸附
- [ ] 成果卡片随鼠标 3D 倾斜；拖拽滑块时不倾斜
- [ ] 对比滑块支持拖拽 / 键盘 / 前后按钮；一页两个实例独立工作
- [ ] `prefers-reduced-motion` 开启时所有动效静止，内容完整可读
- [ ] 820px 以下：成果单列、布局不溢出
- [ ] 占位内容已全部替换为真实数据，成果图为真实截图
