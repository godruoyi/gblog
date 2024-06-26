---
title: "Go 语言限流器的实现"
description: "今天在看 GitHub 趋势榜的时候看到一个小巧的 go 框架 chi，看了下他限流器中间件的实现，觉得还挺有趣的"
pubDate: "2021-01-15 09:41:08"
category: "golang"
banner: "/images/banners/yWQr5M7GVezjkDoj9tmJqBEwnATIUdmAxa4TRA1y.jpeg"
tags: ["golang"]
oldViewCount: 2932
oldKeywords: ["go throttle,go限流器,Go语言限流器的实现"]
---

今天在看 GitHub 趋势榜的时候看到一个小巧的 go 框架 [chi](https://github.com/go-chi/chi)，看了下他限流器中间件的实现，觉得还挺有趣的。

我们知道 Laravel 的 Throttle 中间件是用计数器实现的，每次请求计数器 +1，可以大概限制每一分钟允许多少个请求。所以在看源码前我就在想：

* 这个限流器是不是也用的计数器实现的？
* 他是怎么解决某一时间区间内实际请求数大于限制条件这一问题的？

> 然而看完后才醒悟，golang 中直接使用 channel 来实现即简单又可靠。 

程序启动的时候，向一个带缓冲的 chan 发送一个空结构体 `struct{}{}`，简化版如下：

```go
func main() {
    tokens := make(chan struct{}, 10)

    // 随程序启动，创建一个带缓存的 chan
    for i = 0; i < 10; i ++ {
        tokens <- struct{}{}
    }

    http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
        select {
        case <-tokens:
            rw.Write([]byte("success"))
            break
        default:
            rw.Write([]byte("Too many request"))
        }
    })

    http.ListenAndServe(":9911", nil)
}
```

程序启动完成后，针对每一个请求，通过 select 从缓冲通道 tokens 里获取数据；因为一开始缓冲通道已初始化 10 条数据，所以对于前 10 个请求，肯定能从 tokens 里获取到数据。

而对于后续的请求，由于此时通道里也没有任何数据，所以程序默认选择 default 分支执行代码，会从而返回 Too manay request。

```bash
➜  ~ curl 127.0.0.1:9911/
success
➜  ~ curl 127.0.0.1:9911/
success

...

➜  ~ curl 127.0.0.1:9911/
Too many request
```

当然这样实现的话这个限流器就只能处理前 10 个请求了，为了能真正达到同一时刻只有指定数量的请求能被处理，只需在从通道里获取到数据后，处理完具体的业务逻辑，再返还给通道即可。

```go
select {
case btok := <-tokens:
    rw.Write([]byte("success"))
    tokens <- btok // join to chan
    break
default:
    rw.Write([]byte("Too many request"))
}
```

这只是一个简单的实现，CHI 的这个中间件还添加了超时、cancel 和 backlog 的支持，具体可参考[chi/throttle.go at master · go-chi/chi · GitHub](https://github.com/go-chi/chi/blob/master/middleware/throttle.go)。
