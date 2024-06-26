---
title: "使用预加载优化 Laravel Model 查询"
description: "原文译自[eloquent-eager-loading](https://laravel-news.com/eloquent-eager-loading)，简化其前面~~构造数据~~部分。  ## 介绍  对象关系映射（`ORM`）使数据库的工作变得非常简单。 在以面向对象的方式定义数据库..."
pubDate: "2018-04-04 07:34:04"
category: "laravel"
banner: "/images/banners/_1553621467_sOfIjjZjU2.png"
tags: ["laravel"]
oldViewCount: 2088
oldKeywords: ["null"]
---

原文译自[eloquent-eager-loading](https://laravel-news.com/eloquent-eager-loading)，简化其前面~~构造数据~~部分。

## 介绍

对象关系映射（`ORM`）使数据库的工作变得非常简单。 在以面向对象的方式定义数据库关系时，可以轻松查询相关的模型数据，开发人员可能不会注意底层数据库调用。

下面将通过一些例子，进一步帮助您了解如何优化查询。

假设您从数据库收到了100个对象，并且每个记录都有1个关联模型（即belongsTo）。 默认使用ORM将产生101个查询; 如下所示：

```php
//获取已发布的100条文章
$posts = Post::limit(100)->get(); //一次查询

$authors = array_map(function($post) {
    // 对作者模型生成查询
    return $post->author->name;
}, $posts);

```

我们在查询时没有告诉`Post`模型，我们还需要所有的作者，所以每次从单个`Post`模型实例获取作者的名字时，都会发生单独的查询。

> array_maps时发生100次查询，加上先前一次查询，累计产生101次查询。


## 预加载

接下来，如果我们打算使用关联的模型数据，我们可以使用预加载将该`101`个查询总数减少到`2`个查询。 只需要告诉模型你需要什么来加载。如下：

```php
//获取已发布的100条文章  - 并预加载文章对应作者
$posts = Post::with('author')->limit(100)->get();//2次查询

$authors = array_map(function($post) {
    // 对作者模型生成查询
    return $post->author->name;//这里讲不在产生查询
}, $posts);
```

如果你开启了`sql`日志，你将看到上述预加载将只会产生两条查询：

```sql
select * from `posts`
select * from `authors` where `authors`.`id` in (?, ?, ?, ?, ?) [1,2,3,4,5]
```

如果您有多个关联模型，则可以使用数组加载它们：

```php
$posts = App\Post::with(['author', 'comments'])->get();
```

接下来我们重新定义如下关系

```php
Post -> belongsTo -> Author //每个文章只属于一个用户
Author -> hasMany -> Post   //每个用户拥有多个文章
Author -> hasOne -> Profile //每个用户只有一个简介
```

考虑下述情况：获取已发布文章所属作者的个人简介。

```php
//获取所有文章 - 并预加载文章对应作者
$posts = App\Post::with('author')->get();//两次查询

//根据每个 `作者` 获取其简介
$posts->map(function ($post) {
    //虽然我们直接通过$author = $post->author不会产生查询，
    //但当调用$author->profile时，每次都会产生一个新查询
    return $post->author->profile;
});
```

> 假设上述`App\Post::with('author')->get()`有100条记录，将会产生多少条查询呢？

通过优化预加载，我们可以避免嵌套关系中的额外查询。

```php
//获取所有文章 - 并预加载文章对应作者及每个作者对应de profile
$posts = App\Post::with('author.profile')->get();//三次查询

$posts->map(function ($post) {
    //不在产生新查询
    return $post->author->profile;
});
```

你可以打开你的`sql`日志看到对应的三条查询。

```sql
select * from `posts`  
select * from `authors` where `authors`.`id` in (?, ?, ?, ?, ?) [.....] 
select * from `profiles` where `profiles`.`author_id` in (?, ?, ?, ?, ?) [.....] 
```

## 懒惰加载

有时候您可能只需要根据条件收集相关联的模型。 在这种情况下，您可以懒惰地调用相关数据的其他查询：

```php
$posts = App\Post::all();//一次查询

$posts->load('author.profile');//两次查询
$posts->map(function ($post) {
    //不在产生新查询
    return $post->author->profile;
});
```
查看您的sql日志，总共看到三个查询，但只有调用`$posts->load()`时才会显示。

## 结论

 希望您更加了解有关加载型号的更多信息，并了解其在更深层次上的工作原理。 Laravel相关的文档已经很全面了，希望额外的实践练习可以帮助您更有信心优化关系查询。
