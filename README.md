# Yongjian Peng 的技术博客

基于 [Gblog](https://github.com/godruoyi/gblog) 和 Astro 的静态博客，采用暖米色与橙色的技术笔记风格。

## 功能

- 中文文章、分类与时间线
- 响应式布局与浅色／深色主题
- 按标题、摘要、标签进行站内搜索
- 自动文章目录、相关推荐与上一篇／下一篇
- Markdown 代码高亮、复制和表格排版
- 中文 SEO 信息与站点地图
- 保留现有可选统计、Giscus 评论及资源上传配置

## 本地开发

安装依赖后启动开发服务器：

```shell
npm install
npm run dev
```

构建与预览：

```shell
npm run build
npm run preview
```

静态文件生成到 `dist/`，可用于 GitHub Pages 等静态托管。

## 内容与配置

- `src/config.ts`：站点名称、导航、评论与统计配置。
- `src/content/posts/`：文章；文件名决定访问地址。
- `src/content/categories/`：分类；文章的 `category` 与分类文件名对应。
- `src/content/friends/index.yml`：友链。
- `src/images/theme/`：已按语义命名的页面素材。
- `src/styles/global.css`：公共主题、响应式布局和正文样式。

文章日期、代码和技术名称按原内容保留。已翻译的原文保留相应的来源说明；当前 RSS 页面未启用。

## 检查

```shell
node --experimental-strip-types --test tests/blog.test.mjs tests/rg200u-content.test.mjs
npm run lint
npm run build
```

内置测试使用 Node.js 22.6 及以上版本的 TypeScript 类型擦除能力，无需安装额外测试框架。

## 致谢

感谢 Gblog 原作者 [Godruoyi](https://github.com/godruoyi)，以及提供原始页面基础的 [ScrewFast](https://github.com/mearashadowfax/ScrewFast)。Gblog 原项目采用 MIT 许可证，相关条款参见[原项目许可证](https://github.com/godruoyi/gblog/blob/astro/LICENSE)。
