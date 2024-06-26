---
title: "NativePHP 的技术原理和实现细节"
description: "NativePHP 在这里的价值就是提供了一套相对完整的 API，通过操作这些 API 我们就能非常方便的和 Electron APP 进行交付。而且我们不需要关心项目打包的具体细节，也不需要手动对接这些 API；NativePHP 已经非常深度的把他们集成到了 Laravel 环境中，我们可以高效的在 Laravel 中使用这些魔法而不用关心具体的细节实现。"
pubDate: "2023-07-25 08:37:52"
category: "laravel"
banner: "/images/banners/GxdPb3nbyxlWC8cEekUxTvsRVcVx1Sb9riEa4NNx.png"
tags: ["laravel"]
oldViewCount: 3219
selected: true
oldKeywords: ["laravel,php,native-php"]
---

这次的 LaraconUS 发布很多很有意思的项目，比如我在[这里](https://twitter.com/godruoyi/status/1681875841603735552?s=20)提到的 Laravel Prompts/Laravel Folio/Laravel Herd/Pest 2 以及 ~[beyondcode](https://twitter.com/beyondcode)~ 这两天发布的比较重量级的产品 —— NativePHP 等。

> 需要强调的是这次发布的诸多产品中只有 Laravel Prompts/Laravel Herd 属于官方出品，其他均为社区项目。

这篇文章主要想探讨一下 NativePHP 的实现细节、使用了哪些技术、它的生命周期和工作原理等，如果文章中有任何纰漏，欢迎留言指正。

在使用 NativePHP 之前，[官方文档](https://nativephp.com/docs/1/getting-started/installation#installation)第一步就是需要在 Laravel 项目中安装 `nativephp/electron`：
```shell
$ composer require nativephp/electron

$ php artisan native:install
$ php artisan native:serve
```

安装成功后即可通过 `native:install` 安装所需的 Node 依赖并通过 `native:serve` 启动 Native APP。从 Electron 这个名字就可以大概猜出，目前的 NativePHP 生态中，主要是使用 [Electron](https://www.electronjs.org/) 来进行 APP 打包。我们先顺着 `native:serve` 看看整个 Native APP 是如何启动起来的。

## Boot NativePHP
命令 `native:serve` 是一个标准的 Laravel Command，它的核心逻辑类似于 CD 到 `resources/js` 目录并执行 `yarn run dev` 来启动 Navite APP。

![file](https://images.godruoyi.com/posts/202307/25/QsDfZUrldJsGwgarc2pNoStqHVmhMFMofOqoDDdX.png)

NativePHP Electron 这个包下面的 `resources/js` 目录是一个完整的前端工程，它主要使用 [electron-vite](https://electron-vite.org/) 来编译及调试 Electron 项目，package.json 的部分编译代码如下所示：
```
"scripts": {
  "start": "electron-vite preview",
  "dev": "electron-vite dev --watch",
  "build": "electron-vite build",
}
```

整个前端工程除了使用 electron-vite 来启动 Electron App 外，并没有做其他额外的事情。从他的入口文件 main/index.js 你可以看到它主要是调用 `nativephp-electron` 这个前端插件来启动 NativePHP APP。

![file](https://images.godruoyi.com/posts/202307/25/5Mtz5dZtBG07lIQqo2jzgb81wetJKloRxkpwwXTo.png)

NativePHP 的 Electron binding 的全部功能都是在这个前端插件 [electron-plugin](https://github.com/NativePHP/electron-plugin) 里实现的，主要的流程包括：

1. 通过 express 启动一个 API Server
2. 通过 `PHP -S 127.0.0.1` 启动 PHP Server
3. 通过 `artisan` 运行 Laravel 数据迁移
4. 通过 `artisan` 运行 Laravel WebSocket
5. 通过 `artisan` 运行 Laravel Queue
6. 启动定时任务
7. 发送 Booted 通知
8. 添加事件监听
9. 添加 Terminate 事件


### Start Express API Server

其中最核心的是通过 [expressjs](https://expressjs.com/) 框架启动一个 API Server，在这个 Server 中定义了许多和 APP 交付的 RESTful API；比如操作剪辑版、窗口管理、菜单管理等。当我们想在 Laravel 系统中操作 Electron APP 时，实际上操作的就是这些 API。


![file](https://images.godruoyi.com/posts/202307/25/fckOx54WOIfoGaFeSnAXaRtU7PlQRQPsgEfAbW4x.png)


举个例子，在 Laravel 中你可以直接通过 Window Facade 快速的设置窗口大小，这个操作本质上会发起一个对 Express Api Server 的 POST 请求；Express Server 在收到这个请求后，会通过 Electron 的 BrowserWindow 对象设置 APP 窗口大小。

```php
use Native\Laravel\Facades\Window;

// POST window/open {width: 800, height: 800}
Window::open()->width(800)->height(800);

// Electron
const window = new BrowserWindow({
    width: windowState?.width || parseInt(width),
    height: windowState?.height || parseInt(height),
})
```

## Start PHP Server

Express API Server 启动完成后，[Electron Plugin](https://github.com/NativePHP/electron-plugin)会尝试启动 PHP Server。这里非常简陋的使用了

```
php -S 127.0.0.1:$phpProt
``` 

的形式来启动 PHP 服务。因为这个项目还未正式发布 1.0 版本，所以目前的这个临时过度我认为是可以接受的。期待后期社区添加专业的 Web Server 支持。

注意这里每启动的一个 Server 如 API Server、PHP Server 都会是一个单独的进程；[Electron Plugin](https://github.com/NativePHP/electron-plugin) 会收集这些进程的 PID，待关闭 APP 时会一并把这些所有进程 KILL 掉。

还需要注意的是由于每个进程都是单独启动的，也没有使用 [Supervisor](http://supervisord.org/) 一类的进程管理工具，当某个进程意外退出时，可能会导致你打包的整个 APP 不可用。

## Add Event Listeners

[Electron Plugin](https://github.com/NativePHP/electron-plugin)  插件在主要的 API Server 及 PHP Server 都启动完成后，会注册大量的事件。这些事件主要是为了捕获 APP 端的状态变化。比如用户重新设置了窗口大小、用户打开了一个 URL 等；而这些事件全都会通过 RESTful API 发往 PHP Server。

```javascript
window.on('resized', () => {
  notifyLaravel('_native/api/events', {
    event: 'Native\\Laravel\\Events\\Windows\\WindowResized',
    payload: [id, window.getSize()[0], window.getSize()[1]]
  })
});
```

举个例子，上面的程序会监听 Electron BrowserWindow 的 `reseized` 事件，当 Electron APP 触发这个事件后，会向 PHP Server 发起一个 Post 请求，请求的路由 `_native/api/events` 被定义在 [NativePHP/laravel](https://github.com/NativePHP/laravel) 这个 composer 包当中，这个包会随着你在刚开始安装 `nativephp/electron` 一并安装。

```javascript
await axios.post(
  `http://127.0.0.1:${state.phpPort}/_native/api/events`,
  payload,
  {
    headers: {
      "X-NativePHP-Secret": state.randomSecret,
    },
  }
);
```

PHP Server 中这个更新 Events API 的功能很简单，就是将传入的 Event 初始化并触发事件；这样一来整个 Laravel 系统都会感知来自 Electron APP 的任何状态变化。

```php
// route.php
Route::group(['middleware' => PreventRegularBrowserAccess::class], function () {
    Route::post('_native/api/booted', NativeAppBootedController::class);
    Route::post('_native/api/events', DispatchEventFromAppController::class);
})->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

// DispatchEventFromAppController.php
class DispatchEventFromAppController
{
    public function __invoke(Request $request)
    {
        $event = $request->get('event');
        if (class_exists($event)) {
            $event = new $event(...$request->get('payload', []));

            event($event);
        }

        return response()->json([
            'success' => true,
        ]);
    }
}
```

所有事件注册完成后，Electron APP 就算启动完成了。不过这并**不会**打开任何窗口，我们必须得在 Laravel 中注册你想打开的窗口。随着你执行 `native:install` 已经在 NativeAppServiceProvider 中注册了根目录 `/` 为默认打开的窗口，如果你的 PHP Server 运行在 `127.0.0.1:8080` 上，那 `http://127.0.0.1/` 就会是 Election APP 默认打包的页面，至于 Election 如何将一个网页打包为 APP 不在这篇文章的讨论范围内，我们只需要知道更定一个 URL 地址，Election 就能将它整个打包为一个 APP。

我们也可以通过 Window 设置为默认打开的窗口为登陆页面，这将使用 `http://127.0.0.1/login`  路由为默认的打包窗口。
 
```php
// NativeAppServiceProvider.php
Window::open()->url(url('/login'))->width(800)->height(400);
```

![file](https://images.godruoyi.com/posts/202307/25/trxWkNC4ENAFglMnNpH15QPo7wtAbWoXeJUOvR5I.png)


## Why NativePHP

如你所想，由于 Electron APP 是运行在 JavaScript 环境的，而 Laravel 是运行在 PHP 环境的，在 PHP 环境中我们不能直接操作 Electron APP。NativePHP 在这里的价值就是提供了一套相对完整的 API，通过操作这些 API 我们就能非常方便的和 Electron APP 进行交付。而且我们不需要关心项目打包的具体细节，也不需要手动对接这些 API；NativePHP 已经非常深度的把他们集成到了 Laravel 环境中，我们可以高效的在 Laravel 中使用这些魔法而不用关心具体的细节实现。

可以理解为 NativePHP 为我们提供了一套统一的 API 去操作 Native APP，我们不需要关心 Native APP 的底层是使用的 Electron 还是 [Tauri](https://tauri.app/)，NativePHP 都会适配这些第三方的打包工具，并为他们实现一套完整的 API Server。不管是现在已经发布的 [Electron Plugin](https://github.com/NativePHP/electron-plugin) 还是即将发布的 Tauri Plugin，作为开发者我们都只需要站在更高的纬度使用 NativePHP 就好了。未来 NativePHP 会不止适配 Laravel，还会适配如 Symfony 等其他框架，这给我们使用 PHP 开发 Native APP 提供了一个很好的机会。不过就目前发布的 [Electron Plugin](https://github.com/NativePHP/electron-plugin) 插件来说，想要适配其他框架可能还很麻烦，如果后续仍然使用这个前端 Package 来同时适配多个 PHP 框架，可能还需要做比较大的重构比如单独抽离一个 Event Core、Core Server API 等等。

感激社区，PHP IS DEAD.
