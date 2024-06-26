---
title: "Laravel 队列优先级的一个坑"
description: "准确来说这不算是坑，但骚不注意就掉进去了，在使用 Laravel 队列时，有时候我们希望为他设定一个优先级，如 bash php artisan queue:work --queue=high,low 这样，当我们的任务需要优先发送时"
pubDate: "2018-04-04 07:24:36"
category: "laravel"
banner: "/images/banners/_1553621445_wdxtb6K4l3.png"
tags: ["laravel"]
oldViewCount: 2486
oldKeywords: ["null"]
---

> 准确来说这不算是坑，但骚不注意就掉进去了。

在使用`laravel`队列时，有时候我们希望为他设定一个优先级，如：

```bash
php artisan queue:work --queue=high,low
```
这样，当我们的任务需要优先发送时，就可以通过指定队列名`high`来优先发送。

```php
dispatch((new Job)->onQueue('high'));
```
但是当你后续任务没有指定队列名（`high`、`low`）时，你的队列任务永远也不会执行。（比如我们在发送消息通知时）

```php
<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class YourNotification extends Notification implements ShouldQueue
{
    use Queueable;
}
```
你发现即使你按照文档说的，`implements ShouldQueue`并且`use Queueable`，该通知还是无法加入队列。

那是因为`config\queuq.php`配置中，指定了默认的队列名为`default`，所以所有的队列任务，如果没指定队列名时，默认是`default`。

但是我们在启动队列进程时，只指定了`high`和`low`。当然不会生效。

> 解决办法：
>  1、修改config\queuq.php默认队列名为low或high
>  2、启动队列进程时添加default（--queue=high,default,low）
