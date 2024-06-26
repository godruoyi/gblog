---
title: "Ocr 2.0 Release（拖延症）"
description: "三年前在 Github 发布了一个图片识别的 PHP 扩展包 godruoyi/ocr，主要功能是整合几大厂商的图片识别接口，方便统一调用。"
pubDate: "2020-11-20 08:53:41"
category: "php"
banner: "/images/banners/ZUZkJL1ik3SrCe2b1rf8obtmXlNnpEi7loouJ6mv.jpeg"
tags: ["php"]
oldViewCount: 2906
oldKeywords: ["生活,ocr,php-ocr,tencent-ocr,aliyun-ocr,baidu-ocr"]
---

三年前在 Github 发布了一个图片识别的 PHP 扩展包 godruoyi/ocr，主要功能是整合几大厂商的图片识别接口，方便统一调用。

当初设计都比较简单，基本是能用就行；

~~一年后觉得自己技术牛逼了，知识过硬了~~ ，打算重新发布个版本，已更新下那难看的 last commit，随便慰藉自己当初开源的初衷 ~~吗~~ 。

![file](https://images.godruoyi.com/posts/202011/20/XxGFVtWBpE1oZrXOKMilhvyEAC37wY5Rz54ICxE8.png)

然后大刀阔斧的开整，结果婚结完了，朋友朋友的婚都结完了、两年过去了，我才重构了 20%。

![file](https://images.godruoyi.com/posts/202011/20/0sOuuR4nm7niUNczcpwxX0akfS03wOeWWRzM45gs.png)

趁着现在大家都去旅游去了而我还在公司上班的打工命，噼里啪啦完成了 2.0 的改造，算是完成了今年的一番壮举吧。

其实当初还规划了在 2.0 添加响应过滤的功能，原型都写好了：

```php
use Godruoyi\OCR\Support\Response;

$application->aliyun->filters(function (Response $response) {
    $body = $response->toArray();
    return $body['Response']['IdNum'] ?? null;
})->idcard('...'); // will return string|null
```

然鹅没想到完美的错误处理方式，那还不如不做，交给开发者自己来魔改吧。阿宝就经跟常我说：「你的拖延症啥时候改改啊」。

就连这篇文章都是几天前写的，然后写了一半，还得现在来补齐。啥时候能一鼓作气，再而兴，三而旺呢。
