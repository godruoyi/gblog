---
title: "Nginx 配置二级目录支持"
description: "用最简单优雅的方式，配置你的二级目录支持"
pubDate: "2019-06-03 03:25:20"
category: "nginx"
banner: "/images/banners/_1559532299_jGQT68JVuD.jpg"
tags: ["nginx"]
oldViewCount: 7361
oldKeywords: ["null"]
---

> Nginx 配置二级目录并不像 apache 那么简单，但二级目录的配置在实际工作中又经常用到，现整理如下。

1. 在 `/etc/nginx` 目录下创建文件夹  sublocations，用于存放所有二级目录的配置：

```bash
sudo mkdir -p /etc/nginx/sublocations
```

2. 在该目录下配置二级目录配置文件（如你想配置的二级目录为 example.com/bbs）：

```nginx
# /etc/nginx/sublocations/bbs.conf

location ^~ /bbs {
    alias "/your/bbs/project/path";
    index index.php;

    try_files $uri $uri/ @bbs;

    # 引入解析配置
    include snippets/php_parse_for_sublocation.conf;
}

location @bbs {
    rewrite /bbs/(.*)$ /bbs/index.php?/$1 last;
}
```

3. 配置针对二级目录的解析文件，不同的语言可配置不同的 CGI 解析，下面是 PHP 的解析配置：

```nginx
# /etc/nginx/snippets/php_parse_for_sublocation.conf

# pass PHP scripts to FastCGI server
location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    fastcgi_index index.php;
    include fastcgi_params;

    # 注意这里的 SCRIPT_FILENAME
    fastcgi_param SCRIPT_FILENAME $request_filename;

    fastcgi_intercept_errors off;
    fastcgi_buffer_size 16k;
    fastcgi_buffers 4 16k;
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
}
```

4. 最后在域名配置中引入二级目录配置即可

```nginx
server {
    # ....

    server_name example.com;
	
    location / {
        try_files $uri $uri/ 404;
    }

    # 引入二级目录配置
    include sublocations/tianyou.conf;

    # ....
}
```

测试配置成功并重启服务后，就能通过二级目录 example.com/bbs 访问到对应的服务了。

```bash
sudo nginx -t         # 测试配置是否成功
sudo nginx -s reload  # 重启服务
```

更多 Nginx 的配置请参考：

* [提高安全性的最佳 Nginx 配置](https://godruoyi.com/posts/best-nginx-configuration-for-improved-security)
* [Let’s Encrypt 泛域名证书申请及配置](https://godruoyi.com/posts/let-s-encrypt-generic-domain-name-certificate-application-and-configuration)
* [Nginx 配置跨越支持](https://godruoyi.com/posts/nginx-configuration-across-support)
