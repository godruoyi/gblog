---
title: "Bus Dispatcher & Event Dispatcher"
description: "Laravel 提供的 Bus 总线组件主要为了解决什么问题？我们平时使用的 event、dispatch 等方法和他有什么关系？他和 Event 组件提供的 Dispatcher 有什么区别？"
pubDate: "2020-11-04 05:17:23"
category: "laravel"
banner: "/images/banners/35TCzBa3CNP65B3TV3oEWIRQKhSeoj0SCicxmY2z.png"
tags: ["laravel"]
oldViewCount: 2636
oldKeywords: ["bus,even,dispatcher,dispatch,laravel"]
---

> Laravel 提供的 Bus 总线组件主要为了解决什么问题？我们平时使用的 event、dispatch 等方法和他有什么关系？他和 Event 组件提供的 Dispatcher 有什么区别？

Bus 总线和 Event 的组件都提供了 Dispatcher 服务，但主要区别如下：

* Bus 总线提供的 Dispatcher 可以 dispatch 任何 command
* Event 组件提供的 Dispatcher 只能 dispatch 已经注册的 event
* 都提供了 dispatch new 和 dispatch to queue 的支持

> EventDispatcher dispatch 的 event 若事先未注册，则不会有任何反应。

## Bus Dispatcher
完整应用了 [管道流的原理](https://godruoyi.com/posts/laravel-pipeline-flow-principle)，可以将任意的 command 对象通过该总线发射出去。

```php
$busDispatcher->pipeThrough($piples)->dispatch($command);
```

如下面的例子，用户注册成功后，通过一系列的检查操作后，发送邮件。

```php
app('Illuminate\Contracts\Bus\Dispatcher')->pipeThrough([
    'Check1', 'Check2', 'Check3'
])->dispatch($user);

// need have `handler` method.
class User
{
    public function handle()
    {
        // send email.
    }
}
```

> 如果上面的 command 实现自 ShouldQueue，那么发送邮件这一步操作将会放到队列中去执行。
> 
> ⏰ 此处的 handle 方法参数可自动注入你想要的任何对象。

通常我们不会将「处理器」和 command 放在同一个类中，可以通过下面的方式指定单独的处理类（发送邮件）。

> 手动指定处理器后， handle 方法不可在自动注入参数。

```php
app('Illuminate\Contracts\Bus\Dispatcher')->pipeThrough([
    'Check1', 'Check2', 'Check3'
])->map([
    'App\User' => 'App\SendEmailHandler'
])->dispatch($user);

class SendEmailHandler
{
    public function handle(User $user)
    {
        // send emial for user.
    }
}
```

也可以直接调用 dispatchNow 来立即发送，这种发式无论 command 是否实现自 ShouldQueue，都不会经过队列；并且你还可以指定额外的处理器来覆盖默认的处理操作。

```php
app('Illuminate\Contracts\Bus\Dispatcher')->pipeThrough([
    'Check1', 'Check2', 'Check3'
])->dispatchNow($user, new \App\SendReadpackHandler);
```

Laravel 还为我们提供了一个叫做 PendingDispatch 的类，用来「延迟」具体的 dispatch 操作。其原理和 Bus Dispatcher 一样，只是利用 PHP 的 __destruct 当对象引用被销毁或程序退出时再执行真正的 dispatch 操作。

```php
public function __destruct()
{
    app(Dispatcher::class)->dispatch($this->job);
}
```

所以若你直接在命令行执行如下的代码，其实是没有任何输出的；但当你将其赋空时，程序将会正常执行。

```
✗ tinker
Psy Shell v0.9.9 (PHP 7.3.14 — cli) by Justin Hileman
>>>
>>> $dispatch = dispatch(new \App\Jobs\SendEmail('send email to lianbo'))
=> Illuminate\Foundation\Bus\PendingDispatch {#3076}
>>>
>>> $dispatch = null
Ok, received
=> null
```

## Event Dispatcher
Event 组件提供的 dispatch 只能转发已经注册到事件服务上的 event，如下所示：

```php
Event::listen($eventName, $listener);

$eventDispatcher->dispatch($eventName); // ok
$eventDispatcher->dispatch($otherName); // null
```

所以我们经常使用 `event($eventName)` 来发射事件。

总的来说，Event Dispatcher 的功能远不如 Bus 组件那么强大，Bus Dispatcher 基于 Laravel 强大的 Container，我们可以 dispatch 任何对象并自动注入我们需要的依赖。
