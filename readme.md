<p align="center">
    <a href="https://godruoyi.com/">
        <img src="https://godruoyi.com/vendor/images/logo.png" alt="Powered By godruoyi">
    </a>
</p>

<p align="center">gblog is an easy blog, built with Laravel and Vue.js. <a href="https://godruoyi.com">https://godruoyi.com</a></p>

## About

gblog is easy blog build with `laravel5.5` and `vue2.*`, The `front-end` styles from [laravel-news](http://laravel-news.com), `Back-end` styles from [voyager](https://github.com/the-control-group/voyager).

## Basic Features

- Beautiful dashboard (Voyager, The Missing Laravel Admin)
- Categorize manage
- Manage users and articles
- Multi-language switching
- Markdown Editor

## Server Requirements

- PHP >= 7.0.0
- Node >= 6.x
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- XML PHP Extension

## Preview

go to [https://godruoyi.com](https://godruoyi.com)

## Install

### 1. Clone project from github

```bash
git clone https://github.com/godruoyi/gblog

or

git clone https://github.com/godruoyi/gblog.git
```

### 2. Install package dependency

Install `laravel` framework dependent

```bash
composer install
```

### 3. Set the basic config

```bash
cp .env.example .env
```

Edit the `.env` file and set the `database` or `api` config. By default, we use `ADMIN_DOMAIN` to  represent the management domain name, use `HOME_DOMAIN` to represent the home domain name.

### 4. Run gblog install command.

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

You can login management background to $ADMIN_DOMAIN/login.

### 5. Install front-end environment dependent

Install the front-end environment dependent.

```bash
npm install
```

Or

```bash
yarn install
```

change `/resources/assets/js/config.js` setting:

```javascript
export const ApibaseURI = (process.env.NODE_ENV === 'production'
        ? 'https://api.godruoyi.com/'
        : 'http://api.godruoyi.test/')

export const AcceptHerader = 'application/vnd.godruoyi.v1+json'
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

- [godruoyi](https://github.com/godruoyi)

## Thanks

- [Laravel-news](https://laravel-news.com)
- [Laravel-china](laravel-china.org)
- [Jcc blog](https://github.com/jcc/blog)

## License

The project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
