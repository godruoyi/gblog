<p align="center">GBlog is an open source blog built with Laravel and Vue.js. <a href="https://godruoyi.com">https://godruoyi.com</a></p>

## About

dddddddddddddddddddddddd

## Basic Features

- Manage users, articles, discussions and media
- Statistical tables
- Categorize articles
- Label classification
- Content moderation
- Own comments system
- Multi-language switching
- Markdown Editor
- and more...

## Server Requirements

- PHP >= 7.0.0
- Node >= 6.x
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- XML PHP Extension

## Preview

![New Blog](https://pigjian.com/uploads/post_img/2016-12-27/newblog1.jpeg)

![New Blog](https://pigjian.com/uploads/post_img/2016-12-27/newblog2.jpeg)

## Install

### 1. Clone project from github

```bash
git clone https://github.com/godruoyi/gblog
```

### 2. Set the basic config

```bash
cp .env.example .env
```

Edit the `.env` file and set the `database` and `api` config. By default, we use `ADMIN_DOMAIN` to  represent the management domain name, use `HOME_DOMAIN` to represent the home domain name.

### 3. Run gblog install command.

```bash

php artisan gblog:install

```

> The command will run the `migrate` command, if you whant generate test data, you can append `--test` option on command end.

```bash
php artisan gblog:install --test
```

You can run the following command to generate an administrator account, he will prompt you to complete step by step.

```bash
php artisan gblog:adduser
```

### 3. Install the extended package dependency

Install `laravel` framework dependent

```bash
composer install
```

Install the front-end environment dependent.

```bash
npm install
```

Or

```bash
yarn install
```

Next, you can start compiling `js` file.

```bash
npm run dev

//or

npm run watch-poll

//or

npm run prod
```

## Contributors

- [Lianbo Xu](https://github.com/godruoyi)


## Thanks

- [Laravel-news](https://laravel-news.com)
- [Laravel-china](laravel-china.org)
- [Jcc blog](https://github.com/jcc/blog)

## License

The project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
