---
title: "Go 语言的词法分析和语法分析(2)—Import声明的解析"
description: "Go 语言编译原理，import 声明的解析。上篇文章 Go 语言的词法分析和语法分析(1)作者阐述了渐渐式词法分析的过程；通过这一步，源文件已被转化为 Syntax.File 结构体，其属性情况如下"
pubDate: "2021-03-25 07:21:21"
category: "golang"
banner: "/images/banners/I7H10I0eO4RgdzKxVQx9SfkEUkngcUNbRtZOW78y.jpeg"
tags: ["golang"]
oldViewCount: 3551
oldKeywords: ["Go编译原理,词法分析,语法分析,importdecl"]
---

上篇文章 [Go 语言的词法分析和语法分析(1)](https://godruoyi.com/posts/golang-lexer-and-parser-1) 作者阐述了渐渐式词法分析的过程；通过这一步，源文件已被转化为 Syntax.File 结构体，其属性情况如下：

![Syntax.File结构体](https://images.godruoyi.com/posts/202103/25/2L6DRYf2lNnwVD56raqPKuxhmQQSbNQcAG2pxV5Z.png)
图 2.0 Syntax.File 结构体

File 结构体中的 PkgName 属性已被初始化为 `syntax.Name{Value: “main”}`。Go 语言扫描器 Scanner 再处理完包名 PkgName 后，下一次解析将扫描出 import token；此时 *scanner 的 b, r, e 属性如下图所示：

![import token](https://images.godruoyi.com/posts/202103/25/ng8JzjoPKR3nwKPJNGm1om0tbJDVneoF0YKTDap7.png)
图 2.1 import token

同样，通过 `buf[b:r]` 计算出当前扫描的 token 为 import 字符串，对比 Go 关键字列表后将 tok 设置为内置 _Import，此时 *scanner 内部各属性如下图所示：

![scanner](https://images.godruoyi.com/posts/202103/25/NiW0twBvLRF33mamaWisA5gTqDlDPNg7xOF0AieP.png)
图 2.2 scanner content

## ImportDecl 解析

然后扫描器将开始**循环**解析源文件的 import 声明，直至扫描到的 token 不等于 _Import，并把 import 的 path 部分（如 net/http, main）等保存到扫描器的 DeclList 数组（slice） 中。

```go
for p.got(_Import) {
    f.DeclList = p.appendGroup(f.DeclList, p.importDecl)
}

func (p *parser) got(tok token) bool {
    if p.tok == tok {
        p.next()
        return true
    }
    return false
}
```

Import 有多种不同格式的声明，常见文法有：

```go
import . path/package
import alias path/package
import path/package
import _ path/package

// by group
import (
    . path/package
    alias path/package
    path/package
    _ path/package
)
```

Go 语言内部用 ImportDecl 结构体来描述 import 声明，其结构如下：

```go
ImportDecl struct {
    Group *Group       // 分组，同一括号下的为同一组
    LocalPkgName *Name // 别名
    Path *BasicLit     // 路径，如 net/http
}
```

在进行 import 词法解析时， Go 语言会尝试初始化 ImportDecl 结构体并为其各属性赋值；下面作者针对不同情况来查看赋值后的 ImportDecl 结构体内容。

* 假设申明语句为 `import "net/http"`，解析完该语句后结构体内容如下：

![常见的 Import 声明](https://images.godruoyi.com/posts/202103/25/CyBYhPqOD869kZdRrtOjTzPI27jXg6yZFVdwQcYM.png)
图 2.3 常见的 Import 声明

结构体中的 PkgName 属性（包别名）被设置为 `syntax.Name{Value: ""}`，Group 被设置为 nil，Path 部分被设置为 `syntax.BasicLit{Value: "net/http"}`。

* 假设申明语句为 `import alias "net/http"`，解析完该语句后结构体内容如下：

![别名类型的 import 声明](https://images.godruoyi.com/posts/202103/25/LSbM30j1EG4nXkM088bc95eUmidja8pmc5n8TTCi.png)
图 2.4 别名类型的 import 声明

* 假设申明语句为 `import . "net/http"`，解析完该语句后结构体内容如下：

![2.5 Dot 格式的 import 声明](https://images.godruoyi.com/posts/202103/25/tXHDTQgVjY3v2qxlCBaIGGEHfC4KtmZJIdNPzPza.png)
图 2.5 Dot 格式的 import 声明

* 假设申明语句为下面分组

```go
import (
    "fmt"
    "net/http"
)
```

解析完该语句后结构体内容如下（多个 *ImportDecl 指向同一 Group）：

![Import Group](https://images.godruoyi.com/posts/202103/25/kp1L9KvydguJVSozmYru3wRJtG1ajcxpkYBdmEK3.png)
图 2.6 Import Group

至此，Import 语法申明已基本解析完毕，接下来 Go 语言将解析 `const, val, func, type` 等 *TopLevelDecl* 级别的声明；毕竟 Go 语言的顶级申明就只有这六个关键字，全部解析完毕后，Go 语言的词法语法分析就完成了。

```go
package
import
const
var
type
func
```

针对上篇文章 [Go 语言的词法分析和语法分析(1)](https://godruoyi.com/posts/golang-lexer-and-parser-1) 中的 main.go 文件，进过这一步解析后，syntax.File 结构体信息如下：

![import声明解析后的结构体信息](https://images.godruoyi.com/posts/202103/25/CdljsZGp8Pt7tO9Y2MtsKqs7TNynhl5nBit8fGnd.png)
图 2.7 import声明解析后的结构体信息

## TopLevelDecl

下面是 Go 语言处理完 import 声明后开始处理其他 TopLevelDecl 的函数代码，代码所在位置 [src/cmd/compile/internal/syntax/parser.go:399](https://github.com/golang/go/blob/master/src/cmd/compile/internal/syntax/parser.go#L399)。

```go
// { ImportDecl ";" }
for p.got(_Import) {
    f.DeclList = p.appendGroup(f.DeclList, p.importDecl)
}

// { TopLevelDecl ";" }
for p.tok != _EOF {
    switch p.tok {
    case _Const:
        // 处理常量
    case _Type:
        // 处理类型定义
    case _Var:
        // 处理变量
    case _Func:
        // 处理函数
    default:
        p.syntaxError("non-declaration statement outside function body")
    }
}
```

从这里也能看出，import 声明只能放在 package 声明后面，其他顶级声明前面；因为在 import 声明解析完成后，扫描器将进入下一个 for 循环继续解析其他 TopLevelDecl，若这时再遇到 _Import token，程序将走到 switch 的 default 分支，从而发生编译错误。

```
./prog.go:11:1: syntax error: non-declaration statement outside function body
```

## 接下来阅读

下篇文章将探讨 Go 语言对常量的解析，这部分作者将在后面的文章中继续输出。

* [Go 语言的词法分析和语法分析(1)](https://godruoyi.com/posts/golang-lexer-and-parser-1)
* 当前 [Go 语言的词法分析和语法分析(2)-Import申明的解析](https://godruoyi.com/posts/go-lexical-analysis-and-syntax-analysis-2-parsing-of-import-declarations)
