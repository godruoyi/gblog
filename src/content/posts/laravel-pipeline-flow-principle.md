---
title: "Laravel 管道流原理"
description: "> Laravel管道流原理强烈依赖array_reduce函数，我们先来了解下array_reduce函数的使用。  ## array_reduce  > `array_reduce()` 将回调函数 `callback` 迭代地作用到 `array` 数组中的每一个单元中，从而将数组简化..."
pubDate: "2018-04-04 07:39:04"
category: "laravel"
banner: "/images/banners/_1553621473_pZwNEZykbY.jpeg"
tags: ["laravel"]
oldViewCount: 2960
oldKeywords: ["null"]
---

> Laravel管道流原理强烈依赖array_reduce函数，我们先来了解下array_reduce函数的使用。

## array_reduce

> `array_reduce()` 将回调函数 `callback` 迭代地作用到 `array` 数组中的每一个单元中，从而将数组简化为单一的值。

```php
mixed array_reduce ( array $array , callable $callback [, mixed $initial = NULL ] )
```
1. array
> 输入的 array。

2. callback
> mixed callback ( mixed $carry , mixed $item )
> `$carry`包括上次迭代的值，如果本次迭代是第一次，那么这个值是 `initial`，`item` 携带了本次迭代的值

3. initial
>如果指定了可选参数 initial，该参数将在处理开始前使用，或者当处理结束，数组为空时的最后一个结果。

从文档说明可以看出，`array_reduce`函数是把数组的每一项，都通过给定的`callback`函数，来`简化`的。

那我们就来看看是怎么简化的。

```php
$arr = ['AAAA', 'BBBB', 'CCCC'];

$res = array_reduce($arr, function($carry, $item){
    return $carry . $item;
});
```
给定的数组长度为**3**，故总迭代三次。
1. 第一次迭代时     $carry = null       $item = AAAA          返回AAAA
2. 第一次迭代时     $carry = AAAA    $item = BBBB          返回AAAABBBB
3. 第一次迭代时     $carry = AAAABBBB  $item = CCCC      返回AAAABBBBCCCC

> 这种方式将数组**简化**为一串字符串`AAAABBBBCCCC`

### 带初始值的情况

```php
$arr = ['AAAA', 'BBBB', 'CCCC'];

$res = array_reduce($arr, function($carry, $item){
    return $carry . $item;
}, 'INITIAL-');
```
1. 第一次迭代时（$carry = INITIAL-），（$item = AAAA） 返回INITIAL-AAAA
2. 第一次迭代时（$carry = INITIAL-AAAA），（$item = BBBB）， 返回INITIAL-AAAABBBB
3. 第一次迭代时（$carry = INITIAL-AAAABBBB），（$item = CCCC），返回INITIAL-AAAABBBBCCCC

> 这种方式将数组**简化**为一串字符串`INITIAL-AAAABBBBCCCC`

### 闭包
```php
$arr = ['AAAA', 'BBBB', 'CCCC'];

//没带初始值
$res = array_reduce($arr, function($carry, $item){
    return function() use ($item){//这里只use了item
        return strtolower($item) . '-';
    };
});

```
1. 第一次迭代时，$carry：null，$item = AAAA，返回一个use了$item = AAAA的闭包
2. 第二次迭代时，$carry：use了$item = AAAA的闭包，$item = BBBB，返回一个use了$item = BBBB的闭包
3. 第一次迭代时，$carry：use了$item = BBBB的闭包，$item = CCCC，返回一个use了$item = CCCC的闭包

> 这种方式将数组**简化**为一个闭包，即最后返回的`闭包`，当我们执行这个闭包时`$res()`得到返回值`CCCC-`

上面这种方式只`use ($item)`，每次迭代返回的闭包在下次迭代时，我们都没有用起来。只是又重新返回了一个`use`了当前`item`值的闭包。

### 闭包USE闭包

```php
$arr = ['AAAA'];

$res = array_reduce($arr, function($carry, $item){
    return function () use ($carry, $item) {
        if (is_null($carry)) {
            return 'Carry IS NULL' . $item;
        }
    };
});
```
> 注意，此时的数组长度为**1**，并且没有指定初始值

由于数组长度为1，故只迭代一次，返回一个闭包 `use（$carry = null, $item = 'AAAA'）`，当我们执行（`$res()`）这个闭包时，得到的结果为`Carry IS NULLAAAA`。

接下来我们重新改造下，

```php
$arr = ['AAAA', 'BBBB'];

$res = array_reduce($arr, function($carry, $item){
    return function () use ($carry, $item) {
        if (is_null($carry)) {
            return 'Carry IS NULL' . $item;
        }
        if ($carry instanceof \Closure) {
            return $carry() . $item;
        }
    };
});
```
> 我们新增了一个条件判断，若当前迭代的值是一个闭包，返回该闭包的执行结果。

第一次迭代时，`$carry`的值为`null`，`$item`的值为AAAA，返回一个闭包，

```php
//伪代码
function () use ($carry = null, $item = AAAA) {
    if (is_null($carry)) {
        return 'Carry IS NULL' . $item;
    }
    if ($carry instanceof \Closure) {
        return $carry() . $item;
    }
}
```
假设我们直接执行该闭包，将会返回`Carry IS NULLAAAA`的结果。

第二次迭代时，`$carry`的值为上述返回的闭包（`伪代码`），`$item`的值为BBBB，返回一个闭包，

> 当我们执行这个闭包时，满足`$carry instanceof \Closure`，得到结果`Carry IS NULLAAAABBBB`。

## Laravel中的array_reverse

大致了解了`array_reverse`函数的使用后，我们来瞅瞅`laravel`管道流里使用`array_reverse`的情况。

我在[Laravel中间件原理](https://laravel-china.org/articles/5180/laravel-middleware-principle)中有阐述，强烈建议先去看看[Laravel中间件原理](https://laravel-china.org/articles/5180/laravel-middleware-principle)再回过头来接着看。

> php内置方法array_reduce把所有要通过的中间件都通过callback方法并压缩为一个Closure。最后在执行Initial

`Laravel`中通过全局中间件的核心代码如下：
```php
//Illuminate\Foundation\Http\Kernel.php
protected function sendRequestThroughRouter($request)
{
    return (new Pipeline($this->app))
        ->send($request)
        ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
        ->then($this->dispatchToRouter());
}
protected function dispatchToRouter()
{
    return function ($request) {
        $this->app->instance('request', $request);
        return $this->router->dispatch($request);
    };
}
```
正如我前面说的,我们发送一个`$request`对象通过`middleware`中间件数组，最后在执行`dispatchToRouter`方法。

假设有两个全局中间件，我们来看看这两个中间件是如何通过管道**压缩**为一个`Closure`的。
```php
Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
App\Http\Middleware\AllowOrigin::class,//自定义中间件
```
> Illuminate\Pipeline\Pipeline为laravel的管道流核心类.

在`Illuminate\Pipeline\Pipeline`的`then`方法中，`$destination`为上述的`dispatchToRouter`闭包，`pipes`为要通过的中间件数组，`passable`为`Request`对象。

```php
public function then(Closure $destination)
{
    $pipeline = array_reduce(
        array_reverse($this->pipes), $this->carry(), $this->prepareDestination($destination)
    );
    return $pipeline($this->passable);
}
```
`array_reverse`函数将中间件数组的每一项都通过`$this->carry()`，初始值为上述`dispatchToRouter`方法返回的闭包。

```php
protected function prepareDestination(Closure $destination)
{
    return function ($passable) use ($destination) {
        return $destination($passable);
    };
}
protected function carry()
{
    return function ($stack, $pipe) {
        return function ($passable) use ($stack, $pipe) {
            if ($pipe instanceof Closure) {
                return $pipe($passable, $stack);
            } elseif (! is_object($pipe)) {
                //解析中间件参数
                list($name, $parameters) = $this->parsePipeString($pipe);
                $pipe = $this->getContainer()->make($name);
                $parameters = array_merge([$passable, $stack], $parameters);
            } else {
                $parameters = [$passable, $stack];
            }
            return $pipe->{$this->method}(...$parameters);
        };
    };
}
```

第一次迭代时，返回一个闭包，`use`了`$stack`和`$pipe`，`$stack`的值为初始值闭包，`$pipe`为中间件类名，此处是`App\Http\Middleware\AllowOrigin::class`(注意`array_reverse`函数把传进来的中间件数组倒叙了)。

假设我们直接运行该闭包，由于此时`$pipe`是一个`String`类型的中间件类名，只满足`! is_object($pipe)`这个条件，我们将直接从容器中`make`一个该中间件的实列出来，在执行该中间件实列的`handle`方法（默认`$this->method`为`handle`）。并且将`request`对象和初始值作为参数，传给这个中间件。

```php
public function handle($request, Closure $next)
{
    //......
}
```
在这个中间件的`handle`方法中，当我们直接执行`return $next($request)`时，相当于我们开始执行`array_reduce`函数的初始值闭包了，即上述的`dispatchToRouter`方法返回的闭包。

```php
protected function dispatchToRouter()
{
    return function ($request) {
        $this->app->instance('request', $request);
        return $this->router->dispatch($request);
    };
}
```
好，假设结束。在第二次迭代时，也返回一个`use`了`$stack`和`$pipe`，`$stack`的值为我们第一次迭代时返回的闭包，`$pipe`为中间件类名，此处是`Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class`。

两次迭代结束，回到`then`方法中，我们手动执行了第二次迭代返回的闭包。
```php
return $pipeline($this->passable);
```
当执行第二次迭代返回的闭包时，当前闭包`use`的`$pipe`为`Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class`，同样只满足`! is_object($pipe)`这个条件，我们将会从容器中`make`出`CheckForMaintenanceMode`中间件的实列，在执行该实列的`handle`方法，并且把第一次迭代返回的闭包作为参数传到`handle`方法中。

当我们在`CheckForMaintenanceMode`中间件的`handle`方法中执行`return $next($request)`时，此时的`$next`为我们第一次迭代返回的闭包，将回到我们刚才假设的流程那样。从容器中`make`一个`App\Http\Middleware\AllowOrigin`实列，在执行该实列的`handle`方法，并把初始值闭包作为参数传到`AllowOrigin`中间件的`handle方法中`。当我们再在`AllowOrigin`中间件中执行`return $next($request)`时，代表我们所有中间件都通过完成了，接下来开始执行`dispatchToRouter`。

1. 中间件是区分先后顺序的，从这里你应该能明白为什么要把中间件用`array_reverse`倒叙了。
2. 并不是所有中间件在运行前都已经实例化了的，用到的时候才去想容器取
3. 中间件不执行$next($request)后续所有中间件无法执行。

> 这篇文章是专们为了上一篇[Laravel中间件原理](https://laravel-china.org/articles/5180/laravel-middleware-principle)写的，因为在写Laravel中间件原理时我也不很清楚`array_reduce`在`laravel`中的运行流程。如果有什么不对的，欢迎指正。
