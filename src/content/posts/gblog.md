---
title: "Gblog：基于 Astro 的简洁博客模板"
description: "Gblog 是一款基于 Astro 的博客模板，让你专注于内容，也能轻松搭建简洁、美观的个人博客。"
pubDate: "2024-05-15 13:00:00"
category: "astro"
banner: "@images/banners/gblog-2.jpg"
banner2: "@images/banners/gblog.jpg"
tags: ["Gblog", "Astro", "Godruoyi"]
selected: true
commentTitle: "Gblog, a beautiful blog built with Astro | yongjian-peng博客记录"
---

Gblog 是一款面向不熟悉前端开发，或希望把精力放在内容创作上的用户的博客模板。你可以找到喜欢的 Tailwind CSS 模板，将对应代码放入 Gblog，即可使用。即使不编写 JavaScript，也能定制自己的博客。

**[查看原版在线演示](https://godruoyi.com)**

<span id="features" class="legacy-anchor" aria-hidden="true"></span>

## 功能特性

- 🐈 简洁、美观的页面设计
- 🖥️ 响应式布局与浅色、深色主题
- 🐛 站点地图与 RSS 订阅支持
- 🐝 文章分类与时间线
- 🍋 Google Analytics 与 Google 结构化数据
- 🐜 搜索引擎优化与多端适配
- 🪲 Markdown 与 MDX 内容支持
- 🏂 页面压缩与图片优化

<span id="make-your-own" class="legacy-anchor" aria-hidden="true"></span>

## 搭建自己的博客

1. 克隆仓库的 `astro` 分支：`git clone -b astro git@github.com:godruoyi/gblog.git`。
2. 执行 `pnpm install` 安装依赖。
3. 修改 `src/config.ts`，填写自己的站点信息。
4. 执行 `pnpm run dev`，启动支持热更新的本地开发服务器。

<span id="deployment" class="legacy-anchor" aria-hidden="true"></span>

### 部署

可以通过 [Vercel 一键部署模板](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgodruoyi%2Fgblog&project-name=my-blog&repository-name=my-blog)创建自己的站点。

更多部署方式请参阅 [Astro 部署指南](https://docs.astro.build/zh-cn/guides/deploy/)。

> 本文介绍的是 Gblog 原版模板。本站基于该模板进行了中文化与样式定制，当前已关闭 RSS 入口。

<span id="thanks" class="legacy-anchor" aria-hidden="true"></span>

## 致谢

感谢 [ScrewFast](https://github.com/mearashadowfax/ScrewFast)，本项目的大部分初始代码来自该项目，也感谢 Gblog 原作者 Godruoyi 的开源工作。

<span id="license" class="legacy-anchor" aria-hidden="true"></span>

## 许可证

Gblog 原项目采用 MIT 许可证。详细条款请阅读原仓库中的 [LICENSE 文件](https://github.com/godruoyi/gblog/blob/astro/LICENSE)。
