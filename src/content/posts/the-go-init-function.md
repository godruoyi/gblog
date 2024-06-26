---
title: "Go 语言中的 init 函数（译）"
description: "有时候，在创建 golang 应用程序的时候，我们经常需要在程序初始化的时候执行某些操作。如初始化数据库的连接、载入本地配置文件等。"
pubDate: "2020-10-30 09:42:11"
category: "golang"
banner: "/images/banners/gsjg5h5pRyfRBreK7ED4eO8lls2AlWq9V2oEdBKx.png"
tags: ["golang"]
oldViewCount: 2955
oldKeywords: ["go初始化,init函数,初始化,go,init"]
---

> 本文译自 [The Go init Function](https://tutorialedge.net/golang/the-go-init-function/)
> 

有时候，在创建 golang 应用程序的时候，我们经常需要在程序初始化的时候执行某些操作。如初始化数据库的连接、载入本地配置文件等。

而在 Go 语言中，这些操作都是通过  `init()` 函数来完成的。在本篇教程中，我们将探讨如何更优雅（fame and glory）的使用 `init()` 函数，或许能帮助你构建你的下一个 go 项目。

## Go 中的初始化函数

在 Go 语言中，`init()` 函数的功能非常强大，并且比其他语言更容易使用。`init()` 函数可以在 package 的 block 中使用，并且无论该包被导入多少次，`init()` 函数将始终仅被调用一次。

现在，请看下面的列子，`init`  函数定义的内容只被执行了一次。这种特性能使用我们有效的建立数据库连接、注册各种各样的服务，或执行您只想执行一次的其他任务。

```go
package main

func init() {
  fmt.Println("This will get called on main initialization")
}

func main() {
  fmt.Println("My Wonderful Go Program")
}
```

请注意，在上面的示例中，我们并没有显示的调用 `init()` 函数，Go 语言会隐式地为我们处理执行，因此上述程序应提供如下所示的输出：

```bash
$ go run test.go
This will get called on main initialization
My Wonderful Go Program
```

利用这个特性，我们可以做一些很棒的事情，例如变量初始化。

```go
package main

import "fmt"

var name string

func init() {
    fmt.Println("This will get called on main initialization")
    name = "Elliot"
}

func main() {
    fmt.Println("My Wonderful Go Program")
    fmt.Printf("Name: %s\n", name)
}
```

在上述示例中，与必须显示的调用定义的函数相比，`init()` 函数会更受欢迎。当运行上述程序时，变量名 name 的值已经被初始化。

```bash
$ go run test.go
This will get called on main initialization
My Wonderful Go Program
Name: Elliot
```

## Multiple Packages
让我们来看看一个更复杂的场景，它更接近于生产环境。想象一下，我们的应用程序中有 3 个不同的 Go 包，分别是 main、broker、database。

在每一个包中，我们都可以指定一个 init() 函数，比如用于设置 Kafka 或 MySQL 的连接池。当我们调用 database 包中的函数时，它将自动调用 init 函数并初始化连接池。

> 🐜：你不能依赖多个 init() 函数的执行顺序。与其如此，还不如把精力花费在其他逻辑的编写上。  

## Init 的初始化顺序

对于更复杂的系统，你的每个包中可能包含多个文件。每一个文件都可能有自己的 init 函数。那么 Go 是如何初始化这些包的顺序的呢？

当涉及到初始化顺序时，需要考虑一些事项。 Go 通常按照声明的顺序进行初始化，但如果声明的变量依赖另外包中的变量或方法，那将
但是会在它们可能依赖的任何变量之后显式初始化。 这意味着，假设您在同一软件包中有两个文件 a.go 和 b.go，若 a.go 中任何内容的初始化都取决于 b.go 中的内容，则 a.go 将首先被初始化。

> 🐜：可以在官方文档中找到有关Go中初始化顺序的更深入概述：[The Go Programming Language Specification - The Go Programming Language](https://golang.org/ref/spec#Package_initialization)  

来看下面的列子：

```go
// source: https://stackoverflow.com/questions/24790175/when-is-the-init-function-run
var WhatIsThe = AnswerToLife()

func AnswerToLife() int {
    return 42
}

func init() {
    WhatIsThe = 0
}

func main() {
    if WhatIsThe == 0 {
        fmt.Println("It's all a lie.") // 输出这行
    }
}
```

在这种情况下，您会看到 AnswerToLife 函数将在 init 函数之前运行，因为 WhatIsThe 变量是在调用我们的 init 函数之前声明的。

## 同一文件，多个 init 函数

如果我们在同一个 Go 文件里定义多个 init() 函数会怎样？一开始我认为这是不可能的，但 Go 确实支持在一个文件中拥有 2 个独立的 init() 函数。

这些 init() 函数按声明顺序依次调用。

> 目前同一个 go 文件中是支持多个 init 函数的，不止 2 个。  

```go
package main

import "fmt"

var initCounter int

func init() {
    initCounter ++
}
func init() {
    initCounter ++
}
func init() {
    initCounter ++
}
func init() {
    initCounter ++
}

func init() {
    initCounter ++
}

func main() {
    fmt.Println(initCounter) //5
}
```

但我们为什么要将 init 拆分为多个呢？这样做有什么好处？其实对于复杂的系统，这使得我们可以将复杂的初始化过程分解为多个易于理解的 init 函数。从本质上讲，它使我们可以避免在单个 init 函数中包含一大推代码。需要注意的是，同一文件中的多个 init 函数是按声明时的顺序初始化的，这点在拆分时要特别小心。

## 结论

至此，关于 init() 函数的基本介绍就结束了。一旦你掌握了包初始化的使用，你可能会发现它对掌握基于 Go 项目的结构化艺术很有用。

原文地址 [[[The Go init Function | TutorialEdge.net](https://tutorialedge.net/golang/the-go-init-function/#conclusion)]]
