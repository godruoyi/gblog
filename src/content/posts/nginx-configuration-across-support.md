---
title: "Nginx 配置跨越支持"
description: "用你最美的姿态，去「跨域」那座山"
pubDate: "2019-05-27 07:24:26"
category: "nginx"
banner: "/images/banners/_1566034633_MLDcvVC5wX.jpg"
tags: ["nginx"]
oldViewCount: 4044
oldKeywords: ["null"]
---

> 用你最美的姿态，去「跨域」那座山。

在日常的开放中，我们经常遇到跨域的问题，常用的处理方式都是在代码层添加 cors 支持，但若你有 Nginx 配置权限，在 Nginx 上处理跨域将使得程序异常简单和高效。

## 代理
假设我们的前端域名为 `example.com`，API 服务架设在 `api.example.com` 域名下，那我们可以通过代理的形式来配置跨越请求，具体的配置为：

* 在  Nginx 的 example.com 虚拟主机文件中配置如下的代理
* 配置成功重启后，前端即可用 example.com/api 的方式和 API 交互

```
# /etc/nginx/sites-enabled/example.com.conf

location /api/ {
    proxy_pass http://api.example.com/;    
}
```

这种方式的原理是将 API 提供的服务，代理到前端域名的二级目录下，从而避免跨域。

## Response Header
当然由于很多情况下我们不想将服务代理到前端域名二级目下，那可以通过在 Http Response 中添加 Header 来解决跨越，具体配置如下：

```nginx
# /etc/nginx/snippets/cors.conf;

if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Content-Disposition' always;
    add_header 'Access-Control-Max-Age' 1728000 always;

    add_header 'Content-Length' 0;
    add_header 'Content-Type' 'text/plain; charset=utf-8';

    return 204;
}

if ($request_method ~* "(GET|POST|DELETE|PUT)") {
    add_header 'Access-Control-Allow-Origin' '*' always;
}
```

> 关于何时会发起 OPTIONS 请求及 OPTIONS 请求的内容，可参考阮老师的这篇文章—— [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

然后在 API 服务域名下添加 CORS 支持即可

```nginx
# /etc/nginx/sites-enabled/api.example.com.conf

location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    // 引入 cors 配置
    include snippets/cors.conf;

    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    ...
    ...
}
```

> 注意 `include snippets/cors.conf` 这段代码的位置，若直接放在 location 中，是不起作用的，如下所示：

```nginx
location / {
    include snippets/cors.conf;

    try_files $uri $uri/ /index.php?$query_string;
}
```

这是因为下面的 `try_files` 将请求 Forward 到了 `location ~ \.php$`  这个 block 下，在此之前添加的 `add_header` 命令是无效的。

enjoy ～_～
