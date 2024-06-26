---
title: "提高安全性的最佳 Nginx 配置"
description: "由于安全问题一直是重中之重，这里整理下 `nginx` 的安全配置。文章大部分参考了 Best nginx configuration for improved security(and performance)"
pubDate: "2018-04-08 10:16:19"
category: "nginx"
banner: "/images/banners/_1553621487_p9sQHrWtHr.jpg"
tags: ["nginx"]
oldViewCount: 4454
oldKeywords: ["null"]
---

> 由于安全问题一直是重中之重，这里整理下 `nginx` 的安全配置。文章大部分参考了 [Best nginx configuration for improved security(and performance).](https://gist.github.com/plentz/6737338) 及 [Jerry Qu](http://imququ.com)，更多关于 `HTTP` 安全及性能可前往 [Jerry Qu](http://imququ.com) 查看。


### server_tokens

该响应头用于禁止 `nginx` 在响应中报文中包含版本信息。因为具体的版本可能会存在未知 `bug`。

```shell
server_tokens off;
```

### X-Frame-Options

> 该响应头用于是否允许浏览器加载 `frame`、 `iframe`、 `object` 等属性。可以使用该功能来避免 [点击劫持](https://zh.wikipedia.org/wiki/%E7%82%B9%E5%87%BB%E5%8A%AB%E6%8C%81)

```shell
add_header X-Frame-Options SAMEORIGIN;
```

该指令用三个可用的配置

 - X-Frame-Options: DENY
 - X-Frame-Options: SAMEORIGIN
 - X-Frame-Options: ALLOW-FROM https://example.com/

当设置为 `DENY` 时，站点禁止任何页面被嵌入。

当设置为 `SAMEORIGIN` 时，只允许加载同源的 `fram/iframe/object`。

当设置为 `ALLOW-FROM` 时，只允许加载指定的源。

### X-Content-Type-Options

在我们通常的请求响应中，浏览器会根据 `HTTP` 响应的 `Content-Type` 来分辨响应的类型。如 `text/html` 代表 `html` 文档。 但当响应类型未指定或错误指定时，浏览会尝试启用 `MIME-sniffing` 来猜测资源的响应类型。

> 如通过精心制作一个图像文件，并在其中嵌入可以被浏览器所展示和执行的 `HTML` 和 `JavaScript` 代码。由于未关闭资源的类型猜测，浏览器将直接执行嵌入的 `JavaScript` 代码，而不是显示图片。

```shell
add_header X-Content-Type-Options nosniff;
```
> 用来指定浏览器对未指定或错误指定 `Content-Type` 资源真正类型的猜测行为，`nosniff` 表示不允许任何猜测。（Jerry Qu）

这个响应头的值只能是 `nosniff`，可用于 `IE8+` 和 `Chrome`。

### X-XSS-Protection

```shell
add_header X-XSS-Protection "1; mode=block";
```

该响应头是用于防范及过滤 `XSS` 的。可用的几个指令如下：

 - X-XSS-Protection: 0
 - X-XSS-Protection: 1
 - X-XSS-Protection: 1; mode=block
 - X-XSS-Protection: 1; report=<reporting-uri>

说明

 - `0`，禁用 `XSS` 过滤
 - `1`，开启 `XSS` 过滤
 - `1; mode=block`，开启 `XSS` 过滤，并且若检查到 `XSS` 攻击，停止渲染页面。
 - `X-XSS-Protection: 1; report=<reporting-uri>`，开启 `XSS` 过滤，并且若检查到 `XSS` 攻击，将使用指导的 url 来发送报告。


### Content-Security-Policy

该响应头主要用于规定页面可以加载那些资源（`css/js/img` 等）。看一个简单的配置

```shell
# 定义所有资源文件的默认加载规则为self，表示允许
# 相同来源的内容（相同的协议、域名和端口）
add_header Content-Security-Policy: default-src 'self';
```

更多 `Content-Security-Policy` 的指令及规则及介绍可参考 [Jerry Qu](https://imququ.com) 的 [Content Security Policy 介绍](https://imququ.com/post/content-security-policy-reference.html)。


### Strict-Transport-Security

[Strict-Transport-Security](http://tools.ietf.org/html/rfc6797)，简称 `HSTS`。该响应头用于标识浏览器用 `HTTPS` 替代 `HTTP` 的方式去访问目标站点。

> 我们知道 `HTTPS` 相对于 `HTTP` 有更好的安全性，而很多 `HTTPS` 网站，也可以通过 `HTTP` 来访问。开发人员的失误或者用户主动输入地址，都有可能导致用户以 `HTTP` 访问网站，降低了安全性。一般，我们会通过 `Web Server` 发送 `301/302` 重定向来解决这个问题。 （Jerry Qu）

我们可以使用下面方式启用 `HSTH`。

```shell
add_header strict-transport-security: max-age=16070400; includeSubDomains;
```

当用户第一次访问后，将返回一个包含了 `strict-transport-security` 响应头的字段。他将告诉浏览器，在接下来的 `16070400` 秒内，当前网站的所有请求都强制使用 `HTTPS` 的方式访问。即使用户手动输入 `http://`，浏览器也会强制使用 `HTTPS` 方式访问。

参数 `includeSubDomains` 是可选的，当指定了该参数，所有子域名将采用同样的 `HSTS` 规则。

> 可以看到 `HSTS` 可以很好的解决 `HTTPS` 降级攻击，但是对于 `HSTS` 生效前的首次 `HTTP` 请求，依然无法避免被劫持。浏览器厂商们为了解决这个问题，提出了 `HSTS Preload List` 方案：内置一份可以定期更新的列表，对于列表中的域名，即使用户之前没有访问过，也会使用 `HTTPS` 协议。 （Jerry Qu）

如果你想把自己的域名加入这个列表，可通过 [hstspreloa.org](https://hstspreload.org/)  查看是否满足申请条件。更多关于 `HSTS` 的配置，可查看 [关于启用 HTTPS 的一些经验分享](https://imququ.com/post/sth-about-switch-to-https.html)。

目前 [godruoyi.com](https://godruoyi.com) 已成功加入 `Preload List`。
