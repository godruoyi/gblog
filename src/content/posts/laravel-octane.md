---
title: "Laravel Octane 初体验"
description: "Laravel 框架一直很优秀，但是他在性能方面却一直为人诟病。框架的 boot 时间可能比业务处理时间还长；而 Laravel Octane 则通过启动 Application 一次，常驻内存的方式来加速我们的应用。"
pubDate: "2021-04-29 09:51:32"
category: "laravel"
banner: "/images/banners/xVs1eZ8ja9nLX6XO9EUolY7Zl0MbUTPTyH6FqQLl.png"
tags: ["laravel"]
oldViewCount: 8073
oldKeywords: ["laravel,laravel-octane,swoole,roadrunner"]
---

Laravel Octane 已经发布好几周了，虽说目前还处于 beta 状态，也挡不住开发者对他的热爱，一个月不到，其在 GitHub 的 star 数量已超过 2K；部分[开发者](https://twitter.com/freekmurze/status/1384929538367492098)已将他们的项目运行在 Laravel Octane 之上。

如果你还在观望，也可等等~~一两周后的稳定版~~ [I've tagged Laravel Octane 1.0 - Taylor Otwell](https://twitter.com/taylorotwell/status/1392186038395756556)。

> We will likely go ahead and tag Octane 1.0 as stable next week [@Taylor Otwell on Twitter](https://twitter.com/taylorotwell/status/1387388409380057089).

为了体验一把加速的魔力，作者已拿一个简单的 H5 项目在生产环境下试了试水，除了一些乱七八糟的问题，其他的都令作者激动不已，客户还表示我们的平台好快啊，下次还找你。

## Laravel Octane 的组成
Laravel Octane 内置了两个高性能的应用服务：[Swoole](https://swoole.co.uk/) 和 [RoadRunner](https://roadrunner.dev/)，正如官方文档介绍的：

> Octane boots your application once, keeps it in memory, and then feeds it requests at supersonic speeds.

我们知道，Laravel 框架一直很优秀，但是他在性能方面却一直为人诟病。框架的 boot 时间可能比业务处理时间还长，并且随着项目第三方 service provider 的增多，其启动速度越来越不受控。而 Laravel Octane 则通过启动 Application 一次，常驻内存的方式来加速我们的应用。

Laravel Octane 需要 PHP8.0 支持，如果你是在 macOS 下工作，你可以参考这篇文章来更新你的 PHP 版本 [Upgrade to PHP 8 with Homebrew on Mac](https://stitcher.io/blog/php-8-upgrade-mac)。

## Octane 简单示列
虽说官方文档已经描述的很详细，不过作者这里还是通过一个简单的示列项目来演示。

### Create Laravel Application

```
➜ laravel new laravel-octane-test

 _                               _
| |                             | |
| |     __ _ _ __ __ ___   _____| |
| |    / _` | '__/ _` \ \ / / _ \ |
| |___| (_| | | | (_| |\ V /  __/ |
|______\__,_|_|  \__,_| \_/ \___|_|

Creating a "laravel/laravel" project at "./laravel-octane-test"
Installing laravel/laravel (v8.5.16)
...
Application ready! Build something amazing.
```

### Install Laravel Octane

```
$ composer require laravel/octane
```

安装成功后，读者可以直接执行 `artisan octane:install` 来安装依赖；Octane 将提示你想使用的 server 类型。

```
➜ php artisan octane:install

 Which application server you would like to use?:
  [0] roadrunner
  [1] swoole
 >
```

如果你选择的是 RoadRunner，程序将会自动帮你安装 RoadRunner 所需的依赖；而如果你选择的是 Swoole，你只需要确保你已经手动安装了 PHP swoole 扩展。

## 使用 RoadRunner Server

RoadRunner 的使用过程不尽人意，作者在安装过程中总会出现一些官方文档忽视的错误。

### 下载 rr 可执行文件失败

在执行 `octane:install` 安装 RoadRunner 依赖时，作者本机根本无法通过 GitHub 下载 rr 可执行文件，提示的错误如下：

```
In CommonResponseTrait.php line 178:

HTTP/2 403  returned for "https://api.github.com/repos/spiral/roadrunner-binary/releases?page=1".
```

如果你也遇到了这样的错误，建议直接去 [RoadRunner 官网](https://github.com/spiral/roadrunner-binary/releases) 下载对应平台的 rr 可执行文件及 .rr.yaml 配置文件并放到项目根目录。如 macOS 平台的可执行文件及配置文件地址：

* https://github.com/spiral/roadrunner-binary/releases/download/v2.1.0/roadrunner-2.1.0-darwin-amd64.zip
* https://github.com/spiral/roadrunner-binary/blob/v2.1.0/.rr.yaml

最后记得修改 rr 的可执行权限及 RoadRunner 的 Worker starting command。

```
chmod +x ./rr
```

```yaml
server:
  # Worker starting command, with any required arguments.
  #
  # This option is required.
  command: "php artisan octane:start --server=roadrunner --host=127.0.0.1 --port=8000"
```

### ssl_valid: key file '/ssl/server.key' does not exists

RoadRunner 的配置文件中，默认开启了 ssl 配置， 若你不需要启用 https 访问，可注释 http.ssl 配置。

### Error while dialing dial tcp 127.0.0.1:7233

RoadRunner 默认开启 temporal 特性，其 listen 端口为 7233，若你不想启用该特性，可注释 temporal 配置。

```yaml
# Drop this section for temporal feature disabling.
temporal:
```

> 关于 temporal 的信息可查看官网 [temporalio/sdk-php: Temporal PHP SDK](https://github.com/temporalio/sdk-php)

### Executable file not found in $PATH

这种情况一般是配置文件中未制定程序执行路径，请检查以下配置。

1. Server.command

修改为 RoadRunner worker 的启动命令，如：

```
php artisan octane:start —server=roadrunner —host=127.0.0.1 —port=8000
```

2. Service.some_service_*.comment

如果你不想使用该特性，注释该配置。至此，作者的 RoadRunner **终于**启动起来了。

![Laravel Octane RoadRunner](https://images.godruoyi.com/posts/202104/29/XgEntLO1b4ouj3TG9Hv3T7H63GNQibLQBwNzH7sx.png)

### AB Test For RoadRunner

作者用自己的笔记本(2018-13inch/2.3GHz/16GB)做了一个简单的 AB Test，框架代码未做任何改动，为 Laravel 默认的 welcome 页面。

经过改变不同的并发参数和请求数，得到的结果都如下图所示上下轻微波动，其 QPS 基本维持在 230/s 左右。

```
➜  ~ ab -n 2000 -c 8 http://127.0.0.1:8000/
Server Software:
Server Hostname:        127.0.0.1
Server Port:            8000

Document Path:          /
Document Length:        17490 bytes

Concurrency Level:      8
Time taken for tests:   8.418 seconds
Complete requests:      2000
Failed requests:        0
Total transferred:      37042000 bytes
HTML transferred:       34980000 bytes
Requests per second:    237.59 [#/sec] (mean)
Time per request:       33.671 [ms] (mean)
Time per request:       4.209 [ms] (mean, across all concurrent requests)
Transfer rate:          4297.28 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        3   11   4.6     11      29
Processing:     3   20  34.8     15     270
Waiting:        3   18  34.8     12     270
Total:          7   31  35.2     25     284
```

默认情况下，Laravel 的 welcome 页面会先经过 web 中间件，最后在渲染 blade 页面；而 web 中间件包含大量 Cookie 和 Session 操作：

```php
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
];
```

所以作者重新定义了一个测试路由，该路由不包含任何中间件（全局除外），并只输出一个 Hello World。

```php
// RouteServiceProvider.php
public function boot()
{
    require base_path('routes/test.php');
}

// test.php
Route::get('/_test', function () {
    return 'Hello World';
});
```

再次测试后如下，可以看到其 QPS 已经达到官方宣传标准 2300/s（难道官方测试也是这样 Remove All Middleware?）。

```
$ ab -n 2000 -c 8 http://127.0.0.1:8000/_test

Server Software:
Server Hostname:        127.0.0.1
Server Port:            8000

Document Path:          /_test
Document Length:        11 bytes

Concurrency Level:      8
Time taken for tests:   0.867 seconds
Complete requests:      2000
Failed requests:        0
Total transferred:      374000 bytes
HTML transferred:       22000 bytes
Requests per second:    2307.81 [#/sec] (mean)
Time per request:       3.466 [ms] (mean)
Time per request:       0.433 [ms] (mean, across all concurrent requests)
Transfer rate:          421.45 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       3
Processing:     1    3   8.8      2     143
Waiting:        1    3   8.8      2     142
Total:          1    3   8.8      2     143
```

上述测试过程中，作者本机的资源限制如下。

```
~ ulimit -n
256
```

## 使用 Swoole Server

Swoole server 的使用就要顺畅多了；通过 pecl 安装好 PHP swoole 扩展后，无需任何配置就能启动。

![Laravel Swoole](https://images.godruoyi.com/posts/202104/29/4fZ6XuboeSdtVIjCYrG6Pk9tXE9tc20oywd0Z5kA.png)

### AB Test For Swoole Server

作者用同样的配置对 swoole server 进行 AB Test，结果如下，其 QPS 也基本维持在 230/s 左右。

```
$ ab -n 2000 -c 8 http://127.0.0.1:8000/_test

Server Software:        swoole-http-server
Server Hostname:        127.0.0.1
Server Port:            8000

Document Path:          /
Document Length:        17503 bytes

Concurrency Level:      8
Time taken for tests:   8.398 seconds
Complete requests:      2000
Failed requests:        0
Total transferred:      37130000 bytes
HTML transferred:       35006000 bytes
Requests per second:    238.15 [#/sec] (mean)
Time per request:       33.592 [ms] (mean)
Time per request:       4.199 [ms] (mean, across all concurrent requests)
Transfer rate:          4317.61 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        3   11   6.6     10     102
Processing:     4   20  50.3     12     442
Waiting:        2   18  50.3     11     441
Total:          7   30  50.9     23     450
```

无中间件路由测试结果如下，可以看到其 QPS 已达到了 1650/s。

```
$ ab -n 2000 -c 8 http://127.0.0.1:8000/_test

Server Software:        swoole-http-server
Server Hostname:        127.0.0.1
Server Port:            8000

Document Path:          /_test
Document Length:        21 bytes

Concurrency Level:      8
Time taken for tests:   1.212 seconds
Complete requests:      2000
Failed requests:        0
Total transferred:      528000 bytes
HTML transferred:       42000 bytes
Requests per second:    1650.63 [#/sec] (mean)
Time per request:       4.847 [ms] (mean)
Time per request:       0.606 [ms] (mean, across all concurrent requests)
Transfer rate:          425.55 [Kbytes/sec] received
```

从 AB Test 结果来看，两种 Server 的性能基本持平；但由于是在本地开发环境测试，未考虑到的因素较多，测试结果仅供参考。

## 部署上线
Laravel Octane 虽然提供了 start 命令用于启动 Server，但该命令只能在前台运行（不支持 -d）；在部署到生产环境时，常见的办法还是利用 [Supervisor](http://supervisord.org/) 来进行进程管理。读者可以参考 [Laravel Sail](https://github.com/laravel/sail/blob/1.x/runtimes/8.0/supervisord.conf) 的 Supervisor 配置。

```
[program:php]
command=/usr/bin/php -d variables_order=EGPCS /var/www/html/artisan serve --host=127.0.0.1 --port=80
user=sail
environment=LARAVEL_SAIL="1"
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
```

后续持续交付时，可通过 Jenkins 连接到服务节点，使用 `octane:reload` 命令重新加载服务。

```
stage("部署 ${ip}") {
    withCredentials([sshUserPrivateKey(credentialsId: env.HOST_CRED, keyFileVariable: 'identity')]) {
        remote.user = "${env.HOST_USER}"
        remote.identityFile = identity
        sshCommand remote: remote, command: "php artisan config:cache && php artisan route:cache && php artisan octane:reload"
    }
}
```

不过这里需要注意的是，当你更新了 Composer 依赖，如新增了一个第三方包时，你最好在生产环境重启下 Laravel Octane。

```
sudo supervisorctl -c /etx/supervisorctl.conf restart program:php
```

否则可能会出现如 Class "Godruoyi\Snowflake\Snowflake" not found 的错误。

## Laravel Octane 是线程安全的吗？
在回答这个问题之前，我们先来看看 Laravel Octane 的请求处理流程。

![Laravel Octane](https://images.godruoyi.com/posts/202104/29/GUz7CA0H2G9SR2GXbiWHvvkQfkuyeUr5lXsMTE2b.png)

随着 Server 的启动，程序会创建指定数量的 Worker 进程。当请求到来时，会从可用的 Worker 列表中选取一个并交由他处理。每个 Worker 同一时刻只能处理一个请求，在请求处理过程中，对资源（变量/静态变量/文件句柄/链接）的修改并不会存在竞争关系，所以 Laravel Octane 时线程(进程)安全的。

这其实和 FPM 模型是一致的，不同的地方在于 FPM 模型在处理完一个请求后，会销毁该请求申请的所有内存；后续请求到来时，依然要执行完整的 PHP 初始化操作（参考 [PHP-FPM 启动分析](https://tadimy.gitbooks.io/php-internals/content/php-fpm-start-up.html)）。而 Laravel Octane 的初始化操作是随着 Worker Boot 进行的，在整个 Worker 的生命周期内，只会进行一次初始操作（程序启动的时候）。后续请求将直接复用原来的资源。如上图，Worker Boot 完成后，将会初始化 Laravel Application Container，而后续的所有请求，都将复用该 App 实例。

## Laravel Octane 工作原理
Octane 只是一个壳，真正处理请求都是由外部的 Server 处理的。不过 Octane 的设计还是值得一说的。

从源码也可以看出，随着 Worker 的 Boot 完成，Laravel Application 已被成功初始化。

```php
// vendor/laravel/octane/src/Worker.php
public function boot(array $initialInstances = []): void
{
    $this->app = $app = $this->appFactory->createApplication(
        array_merge(
            $initialInstances,
            [Client::class => $this->client],
        )
    );

    $this->dispatchEvent($app, new WorkerStarting($app));
}
```

在处理后续到来的请求时，Octane 通过 `clone $this->app` 获取一个沙箱容器。后续的所有操作都是基于这个沙箱容器来进行的，不会影响到原有的 Container。在请求结束后，Octane 会清空沙箱容器并 unset 不再使用的对象。

```php
public function handle(Request $request, RequestContext $context): void
{
    CurrentApplication::set($sandbox = clone $this->app);

    try {
        $response = $sandbox->make(Kernel::class)->handle($request); 

    } catch (Throwable $e) {
        $this->handleWorkerError($e, $sandbox, $request, $context, $responded);
    } finally {
        $sandbox->flush();

        unset($gateway, $sandbox, $request, $response, $octaneResponse, $output);

        CurrentApplication::set($this->app);
    }
}
```

> 再次注意，由于同一个 Worker 进程同一时刻只能处理一个请求，故这里是不存在竞争的，即使是对 static 变量的修改，也是安全的。

## 注意事项 & 第三方包适配
由于同一个 Worker 的多个请求会共享同一个容器实例，所以在向容器中注册单例对象时，应该特别小心。如下面的例子：

```php
public function register()
{
    $this->app->singleton(Service::class, function ($app) {
        return new Service($app['request']);
    });
}
```

例子中采用 singleton 注册一个单例对象 Service，当该对象在某个 Provider 的 Boot 方法被初始化时，应用容器中将始终保持着唯一的 Service 对象；后续 Worker 在处理的其他请求时，从 Service 中获取的 request 对象将是相同的。

解决方法是你可以换一种绑定方式，或者使用闭包。最值得推荐的办法是只传入你需要的请求信息。

```php
use App\Service;

$this->app->bind(Service::class, function ($app) {
    return new Service($app['request']);
});

$this->app->singleton(Service::class, function ($app) {
    return new Service(fn () => $app['request']);
});

// Or...

$service->method($request->input('name'));
```

强烈推荐读者阅读官方提出的[注意事项](https://github.com/laravel/octane#container-injection)。

## 参考
* Upgrade to PHP 8 with Homebrew on Mac https://stitcher.io/blog/php-8-upgrade-mac
* Laravel Octane https://github.com/laravel/octane
* Laravel Sail https://github.com/laravel/sail
* FastCgi 与 PHP-fpm 之间的关系 https://godruoyi.com/posts/the-relationship-between-fastcgi-and-php-fpm
* PHP-FPM vs Swoole https://developpaper.com/php-fpm-vs-swoole/
* Swoole 编程须知 https://wiki.swoole.com/#/getting_started/notice
