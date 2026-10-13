---
title: "为什么选择 Astro？"
description: "Astro 是面向博客、营销页面和电商等内容型网站的 Web 框架。了解它的特性与设计原则，为下一个网站选择合适的工具。"
pubDate: "2024-05-15 14:18:53"
category: "astro"
banner: "@images/banners/why-astro-2.webp"
banner2: "@images/banners/why-astro.jpg"
tags: ["Astro"]
selected: true
commentTitle: "Why Astro? | yongjian-peng博客记录"
---

**Astro** 是一个用于构建**内容型网站**的 Web 框架，适合博客、营销页面和电商网站。它以开创[孤岛架构](https://docs.astro.build/zh-cn/concepts/islands/)而闻名，与其他框架相比，可以降低 JavaScript 的运行开销和开发复杂度。如果你需要一个加载快速、对搜索引擎友好的网站，Astro 值得考虑。

> 本文保留原文发表时的技术语境与性能案例，具体能力和参数请结合所用版本的文档确认。

<span id="features" class="legacy-anchor" aria-hidden="true"></span>

## 功能特性

**Astro 是一个功能完整的 Web 框架。** 构建网站所需的基础能力都已内置。你还可以通过数百种[集成](https://astro.build/integrations/)和[集成 API 钩子](https://docs.astro.build/zh-cn/reference/integrations-reference/)进一步定制项目，满足自己的使用场景。

主要特性包括：

- **[孤岛架构](https://docs.astro.build/zh-cn/concepts/islands/)：** 基于组件、针对内容型网站优化的 Web 架构。
- **[不限定 UI 框架](https://docs.astro.build/zh-cn/guides/framework-components/)：** 支持 React、Preact、Svelte、Vue、Solid、Lit、HTMX、Web Components 等。
- **[服务端优先](https://v4.docs.astro.build/zh-cn/basics/rendering-modes/)：** 将开销较大的渲染工作移出访客设备。
- **[默认不发送 JavaScript](https://docs.astro.build/zh-cn/basics/astro-components/)：** 减少会拖慢网站的客户端脚本。
- **[内容集合](https://docs.astro.build/zh-cn/guides/content-collections/)：** 组织和校验 Markdown 内容，并提供 TypeScript 类型安全。
- **[灵活定制](https://docs.astro.build/zh-cn/guides/integrations-guide/)：** 可以选择 Tailwind、MDX 等丰富的集成。

<span id="design-principles" class="legacy-anchor" aria-hidden="true"></span>

## 设计原则

下面五项核心原则，解释了 Astro 的设计初衷、它希望解决的问题，以及它为什么可能适合你的项目或团队。

Astro 的设计强调：

1. **[以内容为中心](#以内容为中心)：** 为展示内容而设计。
2. **[服务端优先](#服务端优先)：** 在服务端渲染 HTML，让网站运行得更快。
3. **[默认追求速度](#默认追求速度)：** 尽可能避免构建出加载缓慢的网站。
4. **[易于使用](#易于使用)：** 不必成为专家，也能用 Astro 构建网站。
5. **[关注开发者体验](#关注开发者体验)：** 提供完成项目所需的工具与支持。

<span id="content-driven" class="legacy-anchor" aria-hidden="true"></span>

### 以内容为中心

**Astro 专为内容丰富的网站而设计。** 这包括营销网站、出版平台、文档站、博客、作品集、落地页、社区网站和电商网站。需要展示的内容，应当尽快呈现在读者面前。

相比之下，许多现代 Web 框架主要面向 *Web 应用*。它们擅长在浏览器中实现更复杂的应用体验，例如需要登录的管理后台、收件箱、社交网络、待办清单，以及类似原生应用的 [Figma](https://figma.com/) 和 [Ping](https://ping.gg/)。但这种复杂度也可能使它们在交付内容时难以保持良好性能。

Astro 从静态站点生成器起步，始终关注内容，因此能够在尊重内容和受众需求的前提下，逐步扩展为高性能、功能强大的动态 Web 应用。围绕内容做出的取舍，让 Astro 可以实现一些不适合应用型框架的性能优化。

<span id="server-first" class="legacy-anchor" aria-hidden="true"></span>

### 服务端优先

**Astro 尽可能采用[服务端渲染](https://v4.docs.astro.build/zh-cn/basics/rendering-modes/)，而不是在浏览器里进行客户端渲染。** PHP、WordPress、Laravel、Ruby on Rails 等传统服务端框架，几十年来一直使用这种方式。不过，你不必再学习一门服务端语言：在 Astro 中，依然可以使用 HTML、CSS 和 JavaScript，也可以选择 TypeScript。

原文将这一方式与 Next.js、SvelteKit、Nuxt、Remix 等现代 JavaScript 框架作比较：这些框架重视整个网站的客户端体验，并结合服务端渲染改善性能。这类模式通常称为**单页应用（SPA）**，而 Astro 更强调**多页应用（MPA）**。

SPA 模式有自己的优势，但也会增加复杂度，并带来性能上的取舍。这些取舍可能影响[可交互时间（TTI）](https://web.dev/interactive/)等重要指标。对于重视首次加载速度的内容型网站，这样的成本未必值得。

采用服务端优先的方式后，你只需要在确实有必要时启用客户端渲染。可以加入在客户端运行的 UI 框架组件，也可以使用视图过渡路由器，更细致地控制页面切换与动画。无论采用预渲染还是按需渲染，Astro 都先提供性能良好的默认行为，再由你逐步增强。

<span id="fast-by-default" class="legacy-anchor" aria-hidden="true"></span>

### 默认追求速度

性能始终重要，对依赖内容展示取得成功的网站尤其如此。原文引用了以下案例，说明加载速度可能影响参与度、转化率和收入：

- 每快 100 毫秒，转化率提高 1%（[Mobify](https://web.dev/why-speed-matters/)，年收入增加 38 万美元）。
- 加载速度提高 50%，销售额增加 12%（[AutoAnything](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/)）。
- 加载速度提高 20%，转化率增加 10%（[Furniture Village](https://www.thinkwithgoogle.com/intl/en-gb/marketing-strategies/app-and-mobile/furniture-village-and-greenlight-slash-page-load-times-boosting-user-experience/)）。
- 加载速度提高 40%，注册量增加 15%（[Pinterest](https://medium.com/pinterest-engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7)）。
- 每快 850 毫秒，转化率提高 7%（[COOK](https://web.dev/why-speed-matters/)）。
- 每慢 1 秒，用户流失约 10%（[BBC](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale)）。

使用很多 Web 框架时，开发环境里的网站看起来很流畅，部署后却可能加载缓慢。JavaScript 往往是原因之一，因为手机和低性能设备的处理速度，通常无法与开发者的电脑相比。

Astro 将以内容为中心和服务端优先这两项原则结合起来，做出其他框架不一定适合做的取舍，从而提供开箱即用的性能优势。它的目标是：**让使用 Astro 构建一个缓慢的网站变得非常困难。**

原文还引用了一项对比：与使用流行 React 框架实现的同类站点相比，Astro 站点可以[快 40%，并减少 90% 的 JavaScript](https://twitter.com/t3dotgg/status/1437195415439360003)。也可以观看 [Solid.js 和 Marko 创建者 Ryan Carniato 的体验视频](https://youtu.be/2ZEMb_H-LYE?t=8163)。这些是原文案例，不代表所有项目都会获得相同结果。

<span id="easy-to-use" class="legacy-anchor" aria-hidden="true"></span>

### 易于使用

**Astro 希望让每一位 Web 开发者都能轻松上手。** 无论已有经验多少，它都尽量提供熟悉、易理解的开发方式。

`.astro` 模板语言是 HTML 的超集：有效的 HTML 也是有效的 Astro 模板语法。会写 HTML，就能开始编写 Astro 组件。同时，它还吸收了其他组件语言的特性，例如 JSX 表达式，以及类似 Svelte 和 Vue 的默认 CSS 作用域。这种与 HTML 接近的设计，也便于使用渐进增强和常见的无障碍模式。

你还可以继续使用熟悉的 UI 组件语言，复用已有组件。Astro 支持 React、Preact、Svelte、Vue、Solid、Lit，以及 Web Components。

Astro 的目标是降低 UI 框架带来的复杂度。一个重要原因是，它主要在服务端渲染。这样，很多情况下你就不必处理钩子函数、过期闭包、引用、可观察对象、状态原子、选择器、响应和派生状态等问题。服务端没有这类响应式状态需求，相关复杂度也随之减少。

Astro 常用的一句话是：**按需引入复杂度。** 它努力减少开发过程中必须承担的复杂性，尤其是初次上手时。仅用 HTML 和 CSS，就能创建一个最简单的示例网站；等到需要更强大的能力时，再逐步加入新的特性和 API。

<span id="developer-focused" class="legacy-anchor" aria-hidden="true"></span>

### 关注开发者体验

Astro 团队认为，只有开发者喜欢使用它，框架才算成功。因此，它希望在构建网站的整个过程中提供所需支持。

Astro 持续投入开发工具：从终端使用体验，到提供语法高亮的官方 VS Code 扩展，再到 TypeScript、智能补全，以及由社区维护的多语言文档。原文发表时，文档已有 14 种语言。

Discord 社区欢迎不同背景的开发者，提供帮助、鼓励和交流空间。你可以在 `#support` 频道寻求项目帮助，也可以在 `#showcase` 频道分享站点、博客文章、视频和进行中的作品，获得建设性反馈。社区还会举办每周交流、文档协作和 API 问题排查等活动。

作为开源项目，Astro 欢迎各种经验水平的参与者贡献不同规模的工作。你可以参与路线图讨论，也可以为核心代码、编译器、文档、语言工具、网站和其他项目提交修复与新功能。
