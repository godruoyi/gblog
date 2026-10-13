---
title: "为什么选择 Laravel？"
description: "Laravel 是一个语法清晰、优雅的 Web 应用框架，为应用开发提供完整的基础结构，让你专注于实现业务。"
pubDate: "2020-05-10 10:01:53"
category: "php"
banner: "@images/banners/laravel-2.jpg"
banner2: "@images/banners/laravel-3.jpg"
tags: ["Laravel"]
selected: true
commentTitle: "Why Laravel? | yongjian-peng博客记录"
---

> 本文根据原有英文内容翻译，保留原发布日期。文中的 SQLite 默认配置、Herd 和 Sail 等说明属于较新的文档语境，资料链接对应 Laravel 11.x，使用时请结合实际版本。

<span id="meet-laravel" class="legacy-anchor" aria-hidden="true"></span>

## 认识 Laravel

Laravel 是一个语法清晰、优雅的 Web 应用框架。Web 框架为应用提供基础结构和开发起点，处理通用细节，让你能够专注于创造有价值的功能。

Laravel 希望在提供强大功能的同时，带来出色的开发体验。它具备完善的依赖注入、表达力丰富的数据库抽象层、队列与定时任务，以及单元测试和集成测试等能力。

无论你刚开始接触 PHP Web 框架，还是已经积累了多年经验，Laravel 都能够伴随你成长。它既能帮助你迈出 Web 开发的第一步，也能支持你进一步提升专业能力。

> 刚接触 Laravel？可以通过 [Laravel Bootcamp](https://bootcamp.laravel.com) 的实战教程，一步步构建自己的第一个 Laravel 应用。

<span id="why-laravel" class="legacy-anchor" aria-hidden="true"></span>

### 为什么选择 Laravel？

构建 Web 应用时，有许多工具和框架可供选择。原文认为，Laravel 是构建现代全栈 Web 应用的理想选择。

<span id="a-progressive-framework" class="legacy-anchor" aria-hidden="true"></span>

#### 渐进式框架

Laravel 常被称为“渐进式”框架，意思是它能够随着你的能力与需求一起成长。刚开始学习 Web 开发时，丰富的文档、指南和[视频教程](https://laracasts.com)可以帮助你循序渐进地掌握基础，而不必一开始就面对所有复杂性。

对于经验丰富的开发者，Laravel 提供了[依赖注入](https://laravel.com/docs/11.x/container)、[单元测试](https://laravel.com/docs/11.x/testing)、[队列](https://laravel.com/docs/11.x/queues)、[实时事件](https://laravel.com/docs/11.x/broadcasting)等成熟工具。它针对专业 Web 应用进行了优化，也能支持企业级工作负载。

<span id="a-scalable-framework" class="legacy-anchor" aria-hidden="true"></span>

#### 易于扩展的框架

Laravel 具有良好的扩展能力。PHP 的运行方式便于扩展，Laravel 也内置了对 Redis 等高速分布式缓存的支持，因此横向扩展相对容易。原文提到，已有 Laravel 应用通过扩展处理了每月数亿次请求。

如果需要更大规模的扩展，[Laravel Vapor](https://vapor.laravel.com) 等平台可以帮助你在 AWS 的无服务器基础设施上运行 Laravel 应用。

<span id="a-community-framework" class="legacy-anchor" aria-hidden="true"></span>

#### 社区驱动的框架

Laravel 整合了 PHP 生态中优秀的软件包，提供成熟、对开发者友好的开发体验。来自世界各地的开发者不断[为框架贡献代码](https://github.com/laravel/framework)。也许有一天，你也会成为贡献者之一。

<span id="creating-a-laravel-project" class="legacy-anchor" aria-hidden="true"></span>

## 创建 Laravel 项目

创建第一个项目之前，请确认本机已经安装 PHP 和 [Composer](https://getcomposer.org)。在 macOS 或 Windows 上，可以通过 [Laravel Herd](https://herd.laravel.com) 安装它们。此外，原文建议[安装 Node 和 npm](https://nodejs.org)。

安装 PHP 和 Composer 后，可以使用 Composer 的 `create-project` 命令创建项目：

```nothing
composer create-project laravel/laravel example-app
```

也可以先通过 Composer 全局安装 [Laravel 安装器](https://github.com/laravel/installer)，再创建新项目：

```nothing
composer global require laravel/installer

laravel new example-app
```

项目创建完成后，使用 Laravel Artisan 的 `serve` 命令启动本地开发服务器：

```nothing
cd example-app

php artisan serve
```

启动后，可以在浏览器中访问 [http://localhost:8000](http://localhost:8000)。接下来可以[继续学习 Laravel](#后续学习)，也可以先[配置数据库](#数据库与迁移)。

> 如果希望更快地开始开发，可以使用官方[应用启动套件](https://laravel.com/docs/11.x/starter-kits)。这些套件提供前后端身份验证的基础代码。

<span id="initial-configuration" class="legacy-anchor" aria-hidden="true"></span>

## 初始配置

Laravel 的配置文件存放在 `config` 目录中。各选项都有相应说明，你可以浏览这些文件，了解可用配置。

Laravel 开箱即用，几乎不需要额外配置就可以开始开发。不过，建议检查 `config/app.php` 及其说明，按项目需求调整 `timezone`、`locale` 等选项。

<span id="environment-based-configuration" class="legacy-anchor" aria-hidden="true"></span>

### 基于环境的配置

应用在本机和生产服务器上运行时，许多配置值可能不同，因此重要配置通常通过项目根目录的 `.env` 文件设置。

不应将 `.env` 提交到版本控制中。不同开发者或服务器可能需要不同的环境配置；如果有人取得代码仓库的访问权限，文件中的敏感凭据也可能随之泄露。

> 关于 `.env` 和环境配置，详见[配置文档](https://laravel.com/docs/11.x/configuration#environment-configuration)。

<span id="databases-and-migrations" class="legacy-anchor" aria-hidden="true"></span>

### 数据库与迁移

创建应用后，你可能需要使用数据库保存数据。原文所述版本默认在 `.env` 中配置 SQLite。

创建项目时，Laravel 会生成 `database/database.sqlite` 文件，并执行建立数据库表所需的迁移。

如果更喜欢 MySQL 或 PostgreSQL，可以修改 `.env` 中对应的数据库配置。例如，使用 MySQL 时，可以这样设置 `DB_*` 变量：

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

使用 SQLite 以外的数据库时，需要先创建数据库，再执行[数据库迁移](https://laravel.com/docs/11.x/migrations)：

```shell
php artisan migrate
```

> 在 macOS 上需要本地安装 MySQL、PostgreSQL 或 Redis 时，可以考虑使用 [DBngin](https://dbngin.com/)。

<span id="directory-configuration" class="legacy-anchor" aria-hidden="true"></span>

### 目录配置

Web 服务器应将 Laravel 的 `public` 目录配置为站点根目录，避免把整个项目目录对外开放。不要尝试以项目目录作为公开目录，再通过其子目录访问应用，否则可能暴露敏感文件。

<span id="docker-installation-using-sail" class="legacy-anchor" aria-hidden="true"></span>

## 使用 Sail 通过 Docker 安装

无论使用哪种操作系统，Laravel 都希望让入门过程尽量简单。除了其他本地开发方式，它还提供了 [Sail](https://laravel.com/docs/11.x/sail)，帮助你使用 [Docker](https://www.docker.com) 运行项目。

Docker 可以在轻量的“容器”中运行应用和服务，不干扰本机已经安装的软件与配置。这样就不必在本机逐一配置 Web 服务器、数据库等复杂开发工具。入门时需要先安装 [Docker Desktop](https://www.docker.com/products/docker-desktop)。

Laravel Sail 是与默认 Docker 配置交互的轻量命令行工具。即使没有 Docker 使用经验，也可以借助它开始构建使用 PHP、MySQL 和 Redis 的 Laravel 应用。

> 熟悉 Docker？可以通过项目中的 `docker-compose.yml` 自定义 Sail 的各项配置。

<span id="sail-on-macos" class="legacy-anchor" aria-hidden="true"></span>

### 在 macOS 上使用 Sail

如果你在 Mac 上开发，并且已经安装 [Docker Desktop](https://www.docker.com/products/docker-desktop)，可以通过终端命令创建新项目。例如，创建名为 `example-app` 的应用：

```shell
curl -s "https://laravel.build/example-app" | bash
```

可以将 URL 中的 `example-app` 改成自己的应用名称，但只能使用字母、数字、连字符和下划线。项目目录会创建在执行命令的位置。

Sail 需要在本机构建容器，安装过程可能持续几分钟。

创建项目后，进入应用目录并启动 Sail。它提供了一组简单命令，用于操作 Laravel 的默认 Docker 环境：

```shell
cd example-app

./vendor/bin/sail up
```

容器启动后，执行[数据库迁移](https://laravel.com/docs/11.x/migrations)：

```shell
./vendor/bin/sail artisan migrate
```

最后，在浏览器中访问 http://localhost。

> 继续学习 Sail，请参阅[完整文档](https://laravel.com/docs/11.x/sail)。

<span id="sail-on-windows" class="legacy-anchor" aria-hidden="true"></span>

### 在 Windows 上使用 Sail

创建项目之前，先安装 [Docker Desktop](https://www.docker.com/products/docker-desktop)，并确认已安装和启用适用于 Linux 的 Windows 子系统 2（WSL2）。WSL 允许在 Windows 上运行 Linux 程序。安装方法见微软的 [WSL 文档](https://learn.microsoft.com/windows/wsl/install)。

> 启用 WSL2 后，还需要确认 Docker Desktop 已[配置为使用 WSL2 后端](https://docs.docker.com/desktop/features/wsl/)。

接下来，打开 [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?rtc=1&activetab=pivot:overviewtab)，进入 WSL2 的 Linux 会话。创建名为 `example-app` 的项目：

```shell
curl -s https://laravel.build/example-app | bash
```

可以替换 URL 中的应用名称，但只应使用字母、数字、连字符和下划线。项目目录会创建在命令执行位置。

Sail 会在本机构建应用容器，安装过程可能需要几分钟。

项目创建后，进入目录并启动 Sail：

```shell
cd example-app

./vendor/bin/sail up
```

容器启动后，执行[数据库迁移](https://laravel.com/docs/11.x/migrations)：

```shell
./vendor/bin/sail artisan migrate
```

最后，在浏览器中访问 http://localhost。

> 继续学习 Sail，请参阅[完整文档](https://laravel.com/docs/11.x/sail)。

<span id="developing-within-wsl2" class="legacy-anchor" aria-hidden="true"></span>

#### 在 WSL2 中开发

还需要能够编辑 WSL2 内创建的应用文件。原文推荐使用微软的 [Visual Studio Code](https://code.visualstudio.com)，并安装官方的[远程开发扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)。

安装后，在 Windows Terminal 的 WSL2 会话中进入项目根目录，执行 `code .` 即可打开项目。

<span id="sail-on-linux" class="legacy-anchor" aria-hidden="true"></span>

### 在 Linux 上使用 Sail

如果你在 Linux 上开发，并已安装 [Docker Compose](https://docs.docker.com/compose/install/)，可以通过终端命令创建 Laravel 项目。

如果使用的是 Linux 版 Docker Desktop，应先执行下面的命令；其他环境可以跳过此步骤：

```shell
docker context use default
```

然后创建名为 `example-app` 的应用：

```shell
curl -s https://laravel.build/example-app | bash
```

可以替换 URL 中的应用名称，但只应使用字母、数字、连字符和下划线。项目会创建在当前目录中。

Sail 需要构建本地容器，安装过程可能需要几分钟。

创建项目后，进入应用目录并启动 Sail：

```shell
cd example-app

./vendor/bin/sail up
```

容器启动后，执行[数据库迁移](https://laravel.com/docs/11.x/migrations)：

```shell
./vendor/bin/sail artisan migrate
```

最后，在浏览器中访问 http://localhost。

> 继续学习 Sail，请参阅[完整文档](https://laravel.com/docs/11.x/sail)。

<span id="choosing-your-sail-services" class="legacy-anchor" aria-hidden="true"></span>

### 选择 Sail 服务

通过 Sail 创建项目时，可以使用 URL 的 `with` 参数，指定要加入 `docker-compose.yml` 的服务。可用服务包括 `mysql`、`pgsql`、`mariadb`、`redis`、`memcached`、`meilisearch`、`typesense`、`minio`、`selenium` 和 `mailpit`：

```shell
curl -s "https://laravel.build/example-app?with=mysql,redis" | bash
```

原文所述版本未指定服务时，默认配置 `mysql`、`redis`、`meilisearch`、`mailpit` 和 `selenium`。

在 URL 中加入 `devcontainer` 参数，还可以安装默认的[开发容器配置](https://laravel.com/docs/11.x/sail#using-devcontainers)：

```shell
curl -s "https://laravel.build/example-app?with=mysql,redis&devcontainer" | bash
```

<span id="ide-support" class="legacy-anchor" aria-hidden="true"></span>

## IDE 支持

你可以使用任意代码编辑器。[PhpStorm](https://www.jetbrains.com/phpstorm/laravel/) 对 Laravel 及其生态提供了丰富支持，包括 [Laravel Pint](https://www.jetbrains.com/help/phpstorm/using-laravel-pint.html)。

社区维护的 [Laravel Idea](https://laravel-idea.com/) 插件还提供代码生成、Eloquent 语法补全、验证规则补全等功能。

<span id="next-steps" class="legacy-anchor" aria-hidden="true"></span>

## 后续学习

创建项目后，可以先阅读以下文档，了解 Laravel 的运行方式：

- [请求生命周期](https://laravel.com/docs/11.x/lifecycle)
- [配置](https://laravel.com/docs/11.x/configuration)
- [目录结构](https://laravel.com/docs/11.x/structure)
- [前端开发](https://laravel.com/docs/11.x/frontend)
- [服务容器](https://laravel.com/docs/11.x/container)
- [门面](https://laravel.com/docs/11.x/facades)

下一步学习什么，也取决于你计划如何使用 Laravel。下面介绍两种主要使用方式。

> 初次接触框架时，也可以通过 [Laravel Bootcamp](https://bootcamp.laravel.com) 实战教程构建第一个应用。

<span id="laravel-the-full-stack-framework" class="legacy-anchor" aria-hidden="true"></span>

### 将 Laravel 用作全栈框架

Laravel 可以用作全栈框架：由它处理路由，再通过 [Blade 模板](https://laravel.com/docs/11.x/blade)渲染前端，或结合 [Inertia](https://inertiajs.com) 构建融合单页应用体验的站点。这是使用 Laravel 的常见方式，原文也认为这种方式具有较高的开发效率。

如果选择这条路线，可以阅读[前端开发](https://laravel.com/docs/11.x/frontend)、[路由](https://laravel.com/docs/11.x/routing)、[视图](https://laravel.com/docs/11.x/views)和 [Eloquent ORM](https://laravel.com/docs/11.x/eloquent) 文档。也可以了解 [Livewire](https://livewire.laravel.com) 和 [Inertia](https://inertiajs.com) 等社区项目，在全栈开发中使用单页应用常见的交互能力。

还建议学习使用 [Vite](https://laravel.com/docs/11.x/vite) 编译应用的 CSS 和 JavaScript。

> 想更快开始开发，可以查看官方[应用启动套件](https://laravel.com/docs/11.x/starter-kits)。

<span id="laravel-the-api-backend" class="legacy-anchor" aria-hidden="true"></span>

### 将 Laravel 用作 API 后端

Laravel 也可以为 JavaScript 单页应用或移动应用提供 API 后端。例如，可以为 [Next.js](https://nextjs.org) 应用提供[身份验证](https://laravel.com/docs/11.x/sanctum)和数据存储、读取能力，同时使用队列、邮件、通知等服务。

如果采用这种方式，可以进一步阅读[路由](https://laravel.com/docs/11.x/routing)、[Laravel Sanctum](https://laravel.com/docs/11.x/sanctum) 和 [Eloquent ORM](https://laravel.com/docs/11.x/eloquent) 文档。

> 希望快速搭建 Laravel 后端和 Next.js 前端？原文提到 Laravel Breeze 的 [API 方案](https://laravel.com/docs/11.x/starter-kits#breeze-and-next)，以及配套的 [Next.js 前端实现](https://github.com/laravel/breeze-next)，可作为开发起点。
