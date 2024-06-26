---
title: "Laravel 响应宏原理"
description: "在使用 Laravel 来写 API 时，经常需要返回一个 JSON 字符串或 JsonResponse，通常的做法可能有两种。  1、在 BaseController 中定义一个返回 JSON 响应的方法，然后继承该 BaseController。"
pubDate: "2018-04-04 05:09:16"
category: "laravel"
banner: "/images/banners/_1553621438_lPB7Pmr00g.png"
tags: ["laravel"]
oldViewCount: 2370
oldKeywords: ["Laravel,response macro,响应宏"]
---

> 我们在使用 `Laravel` 来写 API 时，经常需要返回一个 JSON 字符串或 JsonResponse 对象，通常的做法可能有：

* 在 `BaseController` 中定义一个返回 JSON 响应的方法，然后其他 class 继承该 `BaseController`，如：

```php
// BaseController.php

public function json($data = null, $status = 200, $headers = [], $options = 0)
{
    return new JsonResponse($data, $status, $headers, $options);
}

// YourController.php
class YourController extends BaseController
{
    public function users(UserRepository $userRepository)
    {
        return $this->json($userRepository->allUser());
    }
}
```

这种写法确实方便快捷，大部分项目估计也是这样做的；然而当你要在其他地方也需要输出 JSON 响应时（如中间件验证失败），你根本无法复用该方法；针对这种情况：你或许可以直接返回一个错误的 JSON 响应：

```php
public func handle($next, $request) {
    if ($request->user()->role_id != 1) {
		    return [
				    "code" => -1,
						"message" => "some error"
				];
		}
}
```

但这样写当前端小伙伴固定了返回格式或后续需要调整返回格式时，你不得不修改所有有可能要改的地方。

## Response 宏

`Laravel` 提供了一个非常方便的 `响应宏` 来处理这一情况；

首先，我们需要先注册一个响应宏；在任意一个 `ServiceProvider` 的 `boot` 方法里，使用 `Response Facade` 注册：

```php

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
		Response::macro('success', function ($data = [], $message = 'success') {
				return new JsonResponse([
						'code' => 0,
						'data' => $data,
						'message' => $message
				], 200);
		});
}
```

接下来， 你可以再**任何地方**使用它；

```php
//UserController.php

public function users(UserRepository $userRepository)
{
    return response()->success($userRepository->all(), 'success');
}
```

## 原理

在 `ServiceProvider` 里，作者是使用 `Response Facade` 来注册的 `success` 宏，先看看 `Response` 这个 `Facade` 的正真类是什么。

```php
// Illuminate\Support\Facades.php

protected static function getFacadeAccessor()
{
    return 'Illuminate\Contracts\Routing\ResponseFactory';
}
```

该`Facade`返回了一个`ResponseFactory`接口，那该接口的具体实列对象时什么呢。

```php
//Illuminate\Routing\RoutingServiceProvider.php

/**
 * Register the response factory implementation.
 *
 * @return void
 */
protected function registerResponseFactory()
{
    $this->app->singleton('Illuminate\Contracts\Routing\ResponseFactory', function ($app) {
        return new ResponseFactory($app['Illuminate\Contracts\View\Factory'], $app['redirect']);
    });
}
```

可以看到，该`RoutingServiceProvider`注册了一个`Illuminate\Routing\ResponseFactory`的实列给`Response Facade`。

我们在`Illuminate\Routing\ResponseFactory`的源码中可以看到，它引用了一个`Illuminate\Support\Traits\Macroable  trait`。

```php
namespace Illuminate\Routing;

use Illuminate\Support\Traits\Macroable;

class ResponseFactory implements FactoryContract
{
    use Macroable;
}
```
该`Trait`源码如下，看完源码就知道为什么调用`response()`就能正常访问`success`方法了。

```php
trait Macroable
{
    protected static $macros = [];

    public static function macro($name, callable $macro)
    {
        static::$macros[$name] = $macro;
    }

    public static function hasMacro($name)
    {
        return isset(static::$macros[$name]);
    }

    public static function __callStatic($method, $parameters)
    {
        if (! static::hasMacro($method)) {
            throw new BadMethodCallException("Method {$method} does not exist.");
        }
        if (static::$macros[$method] instanceof Closure) {
            return call_user_func_array(Closure::bind(static::$macros[$method], null, static::class), $parameters);
        }
        return call_user_func_array(static::$macros[$method], $parameters);
    }

    public function __call($method, $parameters)
    {
        if (! static::hasMacro($method)) {
            throw new BadMethodCallException("Method {$method} does not exist.");
        }
        if (static::$macros[$method] instanceof Closure) {
            return call_user_func_array(static::$macros[$method]->bindTo($this, static::class), $parameters);
        }
        return call_user_func_array(static::$macros[$method], $parameters);
    }
}
```

> 其实该 `trait Illuminate\Support\Traits\Macroable` 在很多地方都有使用，包括 `FileSystem`、`Database-Builder`。

[Response-macros文档---Laravel-China](http://d.laravel-china.org/docs/5.4/responses#response-macros)
