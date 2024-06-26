---
title: "为你的 Laravel Faker 指定中文支持"
description: "在 Laravel 中使用 Faker 构造假数据时，默认的输出为英文格式，你可通过简单的配置，让其支持中文输出"
pubDate: "2018-07-27 09:13:30"
category: "laravel"
banner: "/images/banners/_1567223790_ADv0UbdWE5.png"
tags: ["laravel"]
oldViewCount: 3765
oldKeywords: ["laravel-faker,laravel中文支持"]
---

## Laravel Faker

> 在 `Laravel` 中使用 `Faker` 构造假数据时，默认的输出为英文格式，如下

![file](https://images.godruoyi.com/posts/201908/31/_1567223760_pdSKfVH2DK.png)

可通过在 `config/app.php` 增加如下配置使其支持中文。

```php
'faker_locale' => 'zh_CN',
```

修改后再次执行效果如下：

![file](https://images.godruoyi.com/posts/201908/31/_1567223770_zCV5eHOy9L.png)

> 今天在使用 `Faker` 构造数据时，纳闷为什么不能是中文，查看 [官方扩展包](https://github.com/fzaninotto/Faker) 原来早就支持了啊。（是我孤陋寡闻了呀，赶紧分享给没发现的同学）
> 
> 目前 `Laravel >= 5.7` 已经在 `config\app.php` 中默认添加了 `faker_locale` 配置。


## Laravel DatabaseServiceProvider

`Laravel` 源码中是在 `DatabaseServiceProvider` 中注册的国际化支持。

```php
// vendor/laravel/framework/src/Illuminate/Database/DatabaseServiceProvider.php

protected function registerEloquentFactory()
{
    $this->app->singleton(FakerGenerator::class, function ($app) {
        return FakerFactory::create($app['config']->get('app.faker_locale', 'en_US'));
    });

    $this->app->singleton(EloquentFactory::class, function ($app) {
        return EloquentFactory::construct(
            $app->make(FakerGenerator::class), $this->app->databasePath('factories')
        );
    });
}
```
