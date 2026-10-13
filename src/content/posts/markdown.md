---
title: "Markdown 排版与代码示例"
description: "通过标题、段落、引用、列表、表格和代码示例，了解技术文章中常用的 Markdown 排版方式。"
pubDate: "2019-05-12 00:00:00"
category: "tool"
banner: "@images/banners/markdown.avif"
tags: ["Markdown", "博客", "Astro"]
commentTitle: "Markdown elements demo post | yongjian-peng博客记录"
---

<span id="headings" class="legacy-anchor" aria-hidden="true"></span>

## 标题

标题用于组织文章的结构。技术文章应让读者能够快速找到背景介绍、实现步骤和验证结果，避免仅靠字体大小区分内容。

<span id="heading-two" class="legacy-anchor" aria-hidden="true"></span>

## 二级标题

二级标题表示文章的主要章节，例如环境准备、开发流程和问题排查。

<span id="heading-three" class="legacy-anchor" aria-hidden="true"></span>

### 三级标题

三级标题用于拆分主要章节中的具体步骤，例如安装依赖或配置开发环境。

<span id="heading-four" class="legacy-anchor" aria-hidden="true"></span>

#### 四级标题

当步骤中包含独立的小节时，可以使用四级标题。结构应服务于内容，而不是为了层级而增加层级。

<span id="heading-five" class="legacy-anchor" aria-hidden="true"></span>

##### 五级标题

较深的标题层级适合补充说明。一般技术文章使用二级、三级标题即可满足大多数需求。

<span id="heading-six" class="legacy-anchor" aria-hidden="true"></span>

###### 六级标题

这是 Markdown 支持的最深标题层级，用于演示不同层级的显示效果。

<span id="paragraphs" class="legacy-anchor" aria-hidden="true"></span>

## 段落

一个段落围绕一个主题展开。例如，介绍串口通信时，可以先解释波特率和数据格式，再说明如何连接设备，最后给出验证方式。

段落之间留出适当间距，有助于阅读长篇技术内容。描述操作步骤时，尽量说明执行位置、输入内容和预期结果，让读者能够复现。

<span id="blockquotes" class="legacy-anchor" aria-hidden="true"></span>

## 引用

引用块适合放置补充说明、原文摘录和操作提醒。

> 调试前先确认问题能够稳定复现，再收集日志并缩小排查范围。记录环境和操作过程，比反复尝试更有帮助。

引用也可以包含多段内容。

> 配置修改后，应先检查文件格式和参数是否正确。
>
> 如果服务无法启动，可以结合启动日志定位原因，而不是一次修改多个不相关的选项。

嵌套引用可以表达进一步说明。

> 使用版本控制保存可工作的状态。
>
> > 每次提交聚焦一个明确改动，方便后续对比与回退。

<span id="lists" class="legacy-anchor" aria-hidden="true"></span>

## 列表

<span id="ordered-list" class="legacy-anchor" aria-hidden="true"></span>

### 有序列表

1. 确认开发环境和工具版本。
2. 安装项目依赖。
3. 修改站点配置。
   1. 设置站点名称和描述。
   2. 检查访问地址与链接。
4. 启动开发服务器并查看页面。
5. 构建静态文件，检查生成结果。

<span id="unordered-list" class="legacy-anchor" aria-hidden="true"></span>

### 无序列表

- 开发工具：编辑器、终端和版本控制。
- 调试资料：设备手册、日志和配置文件。
  - 保存原始日志，便于追踪问题。
  - 记录每次修改及其效果。
- 验证结果：构建输出、测试结果和页面截图。

<span id="horizontal" class="legacy-anchor" aria-hidden="true"></span>

## 分隔线

分隔线用于区分独立的内容块。优先用清晰的章节结构组织文章，必要时再添加视觉分隔。

---

下面是使用分隔线后的另一个段落。

<span id="table" class="legacy-anchor" aria-hidden="true"></span>

## 表格

表格适合比较工具、参数和验证结果。

| 工具 | 用途 | 常见操作 |
| --- | --- | --- |
| Git | 版本控制 | 查看改动、提交记录 |
| npm | 依赖与脚本管理 | 安装依赖、运行构建 |
| Astro | 静态站点开发 | 生成页面、组织文章 |

| 参数 | 默认值 | 说明 |
| :--- | :---: | ---: |
| 波特率 | 115200 | 双方配置应一致 |
| 数据位 | 8 | 常见串口数据格式 |
| 停止位 | 1 | 根据设备手册设置 |

<span id="code" class="legacy-anchor" aria-hidden="true"></span>

## 代码

<span id="inline-code" class="legacy-anchor" aria-hidden="true"></span>

### 行内代码

在正文中可以用 `npm run dev` 表示命令，用 `src/config.ts` 表示配置文件，用 `pubDate` 表示字段名。保留这些名称的原始拼写，便于直接查找和使用。

<span id="highlighted" class="legacy-anchor" aria-hidden="true"></span>

### 语法高亮

下面是一个使用 Go 标准库创建 HTTP 服务的示例。代码块保留原始内容，复制后可以在本地开发环境中运行。

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
```

为代码块指定语言，可以帮助阅读器正确高亮语法。讲解代码时，应解释关键行为和使用前提，而不是重复每一行语句。

<span id="inline" class="legacy-anchor" aria-hidden="true"></span>

## 行内样式与图片

使用 **加粗** 强调重要结论，使用 *斜体* 表示补充说明，也可以组合成 ***加粗斜体***。链接应使用清晰的文字，例如[返回代码示例](#代码)，让读者知道点击后的目标。

![宽幅风景图片，演示文章内图片的自适应显示](https://images.unsplash.com/photo-1710170601257-242514895755?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D)

图片应附带准确的替代文字，并根据正文宽度缩放。*补充说明可以与正文自然衔接*，例如介绍截图的环境、参数和操作步骤。

![六百乘四百像素的占位图片，演示较小图片的显示](https://placehold.co/600x400/000000/FFFFFF/png)

技术文章的排版最终是为了帮助读者理解内容。清晰的标题、适当的留白，以及可以直接使用的代码和链接，往往比复杂的装饰更有价值。
