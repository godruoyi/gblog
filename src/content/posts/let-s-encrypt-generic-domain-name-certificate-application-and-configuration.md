---
title: "Let's Encrypt 泛域名证书申请及配置"
description: "Let's Encrypt 在今年 3 月份就已经推出泛域名证书支持了，以前我一直是使用的单域名证书，加上站点开启了 `HSTS` 支持，当新增网站应用时不得不为其单独申请证书，十分不便。  目前比较常用的为 `Let's Encrypt..."
pubDate: "2018-06-21 15:26:19"
category: "nginx"
banner: "/images/banners/_1553621543_3ivCUwq5C7.jpg"
tags: ["nginx"]
oldViewCount: 4189
oldKeywords: ["null"]
---

> Let's Encrypt 在今年 `3` 月份就已经推出泛域名证书支持了，以前我一直是使用的单域名证书，加上站点开启了 `HSTS` 支持，当新增网站应用时不得不为其单独申请证书，十分不便。

目前比较常用的为 `Let's Encrypt` 生成证书的工具比较多，如

* [acme-tiny](https://github.com/diafygi/acme-tiny)
* [certbot](https://github.com/certbot/certbot)
* [acme.sh](https://github.com/Neilpang/acme.sh)

这里我们将使用 [acme.sh](https://github.com/Neilpang/acme.sh) 这个工具来安装 `Let's Encrypt` 证书。`acme.sh` 是一个非常优秀的证书生成工具，其 [官网](https://github.com/Neilpang/acme.sh) 更是有详细的中文文档支持 。

## 安装

你可以通过下面的脚本来安装 `acme.sh`

```bash
curl  https://get.acme.sh | sh
```

> 该操作需要服务器支持 `socat` 及 `curl` 模块。（apt install socat curl）

安装成功后，会在当前文件夹下生成 `.acme.sh` 文件夹。

### 生成证书

> `acme.sh` 实现了 `acme` 协议支持的所有验证协议，一般有两种方式验证: `http` 和 `dns` 验证。由于泛域名证书的解析目前仅支持 `DNS` 方式验证，下面我们将通过 `DNS` 方式来验证你的域名所有权。

```bash
acme.sh  --issue  --dns  -d godruoyi.com -d '*.godruoyi.com' --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

这种方式会将相应的解析记录显示出来，然后你需要在你的域名管理面板中添加这条 `txt` 记录。并等待解析完成之后，重新用下面命令生成证书：

```bash
acme.sh  --renew   -d mydomain.com
```

> 注意第二次这里用的是 `--renew`，当然我们并不想这么麻烦，`dns` 方式的真正强大之处在于可以使用域名解析商提供的 `api` 自动添加 `txt` 记录完成验证。

根据你的域名服务商类型，选择对应的 [DNS API](https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md)。如

1、腾讯云

在 [这里申请 API Token](https://www.dnspod.cn/console/user/security)，获取到 `ID` 及 `Token` 后执行：

![file](https://images.godruoyi.com/posts/201806/21/1_1529590937_4rCg5hX0qu.png)

```bash
export DP_Id="id"
export DP_Key="token"
```

2、阿里云

在 [这里申请阿里云 Accesskey](https://ak-console.aliyun.com/#/accesskey)

![file](https://images.godruoyi.com/posts/201806/21/1_1529591195_ryE5GiaXNP.png)

获取到 `KEY` 及 `Secret` 后执行下面命令：

```bash
export Ali_Key="sdfsdfsdfljlbjkljlkjsdfoiwje"
export Ali_Secret="jlsdflanljkljlfdsaklkjflsa"
```

3、生成证书

在配置好上述设置后，就可通过

```bash
.acme.sh/acme.sh --issue --dns dns_dp -d godruoyi.com -d *.godruoyi.com
```

来生成证书，注意这里第一个域名为顶级域名，后面个为泛域名。

> 这种方式将自动为你的域名添加一条 `txt` 解析，验证成功后，这条解析记录会被删除，所以对你来说是无感的，就是要等 `120秒`。

证书生成成功后，默认保存在 `.acme.sh/你的顶级域名` 中。

PS：如果你卡在  Getting domain auth token for each domain 这一步不动了，别担心，升级下你的 acme.sh 就好了。

```bash
.acme.sh/acme.sh --upgrade
```

## 配置 Nginx

下面我们来为 `Nginx` 配置 `SSL` 证书支持。

1、移动下列证书到 `/etc/nginx/ssl` 文件夹，若无该文件夹，自行创建。

```bash
cp ~/.acme.sh/godruoyi.com/fullchain.cer /etc/nginx/ssl/fullchain.cer
cp ~/.acme.sh/godruoyi.com/godruoyi.com.key /etc/nginx/ssl/godruoyi.key
```

2、新建 `ssl-params.conf` 并把它放到 Nginx 的 `snippets` 目录中。

> 下面的这些配置来自 [提高安全性的最佳 Nginx 配置](https://godruoyi.com/posts/best-nginx-configuration-for-improved-security)，建议参考。

```vim
# /etc/nginx/snippets/ssl-params.conf

server_tokens   off;

ssl_session_cache        shared:SSL:10m;
ssl_session_timeout      60m;

ssl_session_tickets      on;

ssl_stapling             on;
ssl_stapling_verify      on;

resolver                 8.8.4.4 8.8.8.8  valid=300s;
resolver_timeout         10s;
ssl_prefer_server_ciphers on;

# 证书路径 绝对地址
ssl_certificate          /etc/nginx/ssl/fullchain.cer;
ssl_certificate_key      /etc/nginx/ssl/godruoyi.key;

ssl_protocols            TLSv1 TLSv1.1 TLSv1.2;

ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:ECDHE-RSA-AES128-GCM-SHA256:AES256+EECDH:DHE-RSA-AES128-GCM-SHA256:AES256+EDH:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4";

add_header Strict-Transport-Security "max-age=31536000;includeSubDomains;preload";
add_header  X-Frame-Options  deny;
add_header  X-Content-Type-Options  nosniff;
add_header x-xss-protection "1; mode=block";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:; connect-src 'self' https:; img-src 'self' data: https: blob:; style-src 'unsafe-inline' https:; font-src https:";
```

3、接下来在 Nginx 主配置文件中开启 `SSL` 支持

```
# /etc/nginx/nginx.conf

http {
    ....
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
}
```

完整的 `Nginx` 配置文件请参考 [我的 Nginx 配置](https://github.com/godruoyi/gblog/blob/master/resources/nginx/)

4、配置虚拟主机

```vim
# /etc/nginx/sites-available/godruoyi.com

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name godruoyi.com www.godruoyi.com;
    return 301 https://$server_name$request_uri;
}

server {
    # 注意我们设置该站点为默认站点，并移除了 nginx 默认的 default 配置
    listen 443 ssl http2 fastopen=3 reuseport default_server;
    listen [::]:443 ssl http2 fastopen=3 reuseport default_server;

    server_name www.godruoyi.com godruoyi.com;

    # 引入 SSL 及 PHP 配置
    include snippets/fastcgi-php.conf;
    include snippets/ssl-params.conf;

    root /home/godruoyi/websites/godruoyi.com/public;

    access_log /home/godruoyi/websites/godruoyi.com/storage/logs/nginx-access.log;
    error_log  /home/godruoyi/websites/godruoyi.com/storage/logs/nginx-error.log error;

    index index.php;

    # 当访问域名是不  godruoyi.com 强制跳转到 https://godruoyi.com
    if ($host != 'godruoyi.com' ) {
        rewrite ^/(.*)$ https://godruoyi.com/$1 permanent;
    }
}
```

再来看一个 `admin.godruoyi.com` 的配置

```vim
# /etc/nginx/sites-available/admin.godruoyi.com

server {
    listen 80;
    listen [::]:80;

    server_name admin.godruoyi.com;
    return 301 https://$server_name$request_uri;
}
server {
    # 如果多个域名配置在同一主机，这里只需要监听到 433 就可以了，
    # 不需要再添加 ssl http2 fastopen=3 reuseport default_server 之类的了
    listen 443;      
    listen [::]:443;

    root /home/godruoyi/websites/admin.godruoyi.com/public-admin;

    access_log /home/godruoyi/websites/admin.godruoyi.com/storage/logs/nginx-access.log;
    error_log  /home/godruoyi/websites/admin.godruoyi.com/storage/logs/nginx-error.log error;

    server_name admin.godruoyi.com;

    index index.php;

    client_max_body_size 20M;

    include snippets/fastcgi-php.conf;
    include snippets/ssl-params.conf;

    if ($host != 'admin.godruoyi.com' ) {
        rewrite ^/(.*)$ https://admin.godruoyi.com/$1 permanent;
    }
}

```

4、虚拟主机配置完成，接下来为其配置软连接测试成功后就可以重启 Nginx 啦。

```bash
sudo ln -s /etc/nginx/sites-available/godruoyi.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/admin.godruoyi.com /etc/nginx/sites-enabled/

# 测试配置是否成功
sudo nginx -t

sudo service nginx restart
```

以上所有配置你都可以在 [这里](https://github.com/godruoyi/gblog/blob/master/resources/nginx/) 找到。

-----------
参考链接

* [腾讯云DNSPod API申请Let’s Encrypt泛域名证书](https://cloud.tencent.com/developer/article/1064471)
