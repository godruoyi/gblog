---
title: "我的 Sublime text 插件配置"
description: "只从沾上了 sublime 这款编辑器，我对其他所有的都没爱了。"
pubDate: "2018-04-04 07:29:58"
category: "tool"
banner: "/images/banners/_1564749562_U4OySY6DaY.jpg"
tags: ["tool"]
oldViewCount: 2367
oldKeywords: ["null"]
---

首先，我应该正确安装了 [Package Control](https://packagecontrol.io/installation#st3)。

## Material Theme

外观是最重要的，一个好的主题会让你爱上完美。这里推荐 [Material Theme](http://equinsuocha.io/material-theme/)

![file](https://images.godruoyi.com/posts/201909/24/_1569340531_wzgl3oXMKl.png)

## Operator

是不是感觉字体不好看，咳不出来又咽不下去，试试这款吧 [Operator](https://www.typography.com/fonts/operator/styles/)，号称贵到灵魂出窍的等宽编程字体(@JokerLinly)，一套只需 `$599.0`。:smile: 我还是用我的默认字体吧！

![file](https://images.godruoyi.com/posts/201909/24/_1569340566_wQolvwi4WT.png)

## Alignment

定义了一大堆变量，想让他们快速对齐怎么办！（强迫症患者福利）

> 安装完成后进入 `preferences->Package settings->Alignment->Key Bindings-User` 设置快捷键（我的是 `ctrl+alt+0`）

```json
{ "keys": ["ctrl+alt+0"], "command": "alignment" }
```

![file](https://images.godruoyi.com/posts/201909/24/_1569340586_2SOJxMa275.gif)

## AdvancedNewFile

你还在用鼠标创建和移动文件吗，看这里。

> 默认情况下安装成功后快捷键不是很好用且只有一个创建文件的快捷键(`ctrl+alt+n`)，建议你覆盖默认快捷键配置。

```json
{ "keys": ["ctrl+n"], "command": "advanced_new_file_new" }, //快速新建文件
{ "keys": ["alt+m"], "command": "advanced_new_file_move" }, //移动文件
{ "keys": ["alt+delete"], "command": "advanced_new_file_delete" , "args": {"current": true}}, //删除当前文件
{ "keys": ["alt+."], "command": "advanced_new_file_copy" }  //复制当前文件的内容到一个新文件
```

![file](https://images.godruoyi.com/posts/201909/24/_1569340614_IbQrHDZsH3.gif)

## EditorConfig

当项目涉及到多人开发时，定义一套 `简单` 的编码规范是必须的。

> 安装成功后在项目根目录下创建一个 `.editorconfig` 的配置文件，我的默认配置如下，[查看更多配置细节](http://editorconfig.org/)

```json
root = true

[*]
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{js,py,css,vue}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false

```

## SublimeLinter-php

该插件是一个自动检查 `PHP` 语法错误的插件，安装前先要安装 [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)，默认安装成功后，`ctrl+s` 保存时将自动提示语法错误。

> 若你没有把 `php` 及 `python` 加入环境变量，你可能要在 `SublimeLinter` 的配置文件中指定 `python` 及 `php` 的执行路径。

![file](https://images.godruoyi.com/posts/201909/24/_1569340682_DMJlNwtfia.gif)

## Phpcs

关于 PHPCS的介绍及安装请 [戳这里](https://learnku.com/articles/5646/php-series-code-sniffer-for-code-specification)

![file](https://images.godruoyi.com/posts/201909/24/_1569340734_Q5ZoetnMcZ.gif)

## 其他

* All Autocomplete
* ConvertToUTF8
* DocBlockr
* Emmet
* Git
* GitGutter
* Laravel 5 Artisan
* SideBarEnhancements
