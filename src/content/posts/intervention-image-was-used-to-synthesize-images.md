---
title: "利用 Intervention Image 合成图片"
description: "在我们实际应用中，经常遇到图片合成的需求（比如合成一整用户信息 + 二维码图片，便于传播分享等），传统的做法是采用 `GD` 或 `Imagick ` 库内置函数来完成。但估计你和我一样，对这些函数都不会很上心。  > 下面..."
pubDate: "2018-06-06 02:02:11"
category: "laravel"
banner: "/images/banners/_1553621520_6d34Z1x7UB.jpg"
tags: ["laravel"]
oldViewCount: 6366
oldKeywords: ["null"]
---

在我们实际应用中，经常遇到图片合成的需求（比如合成一整用户信息 + 二维码图片，便于传播分享等），传统的做法是采用 `GD` 或 `Imagick ` 库内置函数来完成。但估计你和我一样，对这些函数都不会很上心。

> 下面将采用目前功能全面的 `intervention/image` 库来完成这一操作。

## 使用

[intervention](http://image.intervention.io/getting_started/installation) 的安装这里不再论述，请移至 [官网](http://image.intervention.io/getting_started/installation)。

## 初始化

你可以直接在原始 `PHP` 通过下述方式获取 `ImageManager` 管理对象：

```php
require 'vendor/autoload.php';

use Intervention\Image\ImageManager;

$manager = new ImageManager(array('driver' => 'imagick'));
```

如果是在 `Laravel` 中，可直接通过 `app('image')` 或使用 `Intervention\Image\Facades\Image` 门面类。

```php

use Intervention\Image\Facades\Image;

//或
$manager = app('image');
```

## 合成

```php

// $image = $manager->make($bg);
// $image = Image::make($bg);

$image = app('image')->make($bg);

// 二维码图片
$qrcodeImage = app('image')->make($qrcodeurl)->resize(200, 200);
// 重置 头像 大小
$avatarImage  = app('image')->make($httpClient->request('GET', $avatarurl)->getBody())->resize(200, 200);

$image->text('Nickname', 376, 320, function ($font) {
    $font->file(public_path('fonts/SimHei.ttf'));
    $font->size(40);
    $font->color('#000000');
    $font->align('center');
    $font->valign('top');
});

$image->insert($qrcodeImage, 'bottom', 0, 360);
$image->insert($avatarImage, 'top', 0, 105);
```

上面的代码逻辑为：

* 初始化背景图片，后续的文字图片合成都基于该背景模板
* 插入 `Nickname` 文本到背景图，文本位置相对于背景图 `X轴` 376 偏移量、`Y轴` 320 偏移量。并设置字体文件位置、字体大小、字体颜色、字体水平对齐方式（left，center，right 默认 left）、字体垂直对齐方式（top，bottom，middle 默认 bottom）等。
* 插入一张二维码图片，并设置图片的插入位置为 `bottom` （下方，[其他可用位置](http://image.intervention.io/api/insert)），图片位置相对应背景图 `X轴` 0 偏移量、`Y轴` 105 偏移量。

需要注意的是，在设置字体大小时，如果不指定字体文件位置，则设置的字体大小恒为默认值 `12`。并且中文可能会存在乱码情况，建议采用 `Sim` 字体。[下载链接](https://github.com/StellarCN/scp_zh/tree/master/fonts)
