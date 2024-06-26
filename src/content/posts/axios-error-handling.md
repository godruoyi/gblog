---
title: "axios 的错误处理"
description: "Axios 是目前使用最为广泛的 http 请求工具包，在进行错误处理时，基于框架提供的拦截器，我们可以快速的实现错误处理。"
pubDate: "2021-01-21 08:06:17"
category: "php"
banner: "/images/banners/iE3M7eJ6cg0DAitTpBjxQtnD5ORk9RBTBeUQJ2AL.jpeg"
tags: ["php"]
oldViewCount: 9115
oldKeywords: ["axios,axios error,axios interceptors response,interceptors,拦截器,axios错误处理"]
---

Axios 是目前使用最为广泛的 http 请求工具包，在进行错误处理时，基于框架提供的拦截器，我们可以快速的实现错误处理。

## axios interceptor

```javascript
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 如4xx/5xx等基本错误的处理
    alert('全局错误处理')

    return Promise.reject(error); 
});
```

但 axios 提供的 response 拦截器是全局的，若我们想对某个具体请求进行错误处理时，情况就稍微有点复杂了。

如有一个投票接口，由于后端限制了投票次数，当投票超限时我们需要单独处理；返回的响应如下：

```http
HTTP/1.0 429 Too Many Requests

{"error_code":4291011,"message":"今日投票次数超限"}
```

可能对于部分前端同学来说，处理方式是直接在 response 拦截器加上相应的条件判断就好了：

```javascript
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status == 429) {
        if (error.response.data.error_code == 4291011) {
            // 单独处理投票错误
        } else if (error.response.data.error_code == 4291011) {
				    // 作品票数异常，需先通过滑动验证码
				}
    }

    // 处理其他 如4xx/5xx等基本错误的处理
    return Promise.reject(error); 
});
```

但是这样做却存在很多问题

* 随着各种错误码的增多，拦截器需要处理的情况越来越多，最终充满着大量的 if-else
* 具体的错误码应该和具体发起请求的代码放在一起，一来方便查看，二来好扩展及定位

所以我们可以把错误处理逻辑移到调用代码处，如下：

```javascript
axios.post('/vote/1').then(function (response) {
    // success
}).catch(function (error) {
    let code = error.response.data.error_code
    if (code == 4291011) {
        alert('投票超限')
    } elseif (code == 4030001) {
        alert('作品票数异常，需先通过滑动验证码')
    }
});
```

但这样又存在一个问题，由于 axios 拦截器的代码会比 catch 先执行，所以当执行到 catch 时，实际上 response 拦截器的代码已全部执行完成，所以会先后弹出「全局错误处理」-> 「投票超限」。

这显然不是我们想要的，我们希望当我们单独处理错误后，先执行具体的业务错误处理，最后在执行全局的错误处理。

如下：

* 针对这种没有 catch 的情况，当请求错误后，我们希望由全局错误进行处理。

```javascript
axios.post('/vote/1').then(function (response) {
    // success
})
```

> 这默认是可行的，不需要做额外的准备工作。

* 当我们使用 catch 后，我们希望应该先处理自定义的错误，最后在处理全局错误。

```javascript
axios.post('/vote/1').then(function (response) {
    // success
}).catch(error => {
    // custom error 
})
```

然而目前这样是行不通的，看了 [axios request](https://github.com/axios/axios/blob/fe52a611efe756328a93709bbf5265756275d70d/lib/core/Axios.js#L27) 方法源码后得知，框架在发起请求时，并没有给我提供相应的钩子；所以在 Promise 执行到 catch 时，拦截器里的代码一定已经执行过了。

## axios config

我们只能依赖 axios 提供的 config 来完成这个特性，如下所示：

```javascript
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    error.globalErrorProcess = function () {
        switch (this.response.status) {
            case 401: // 处理基本 401 错误
                break;
            case 404: // 处理基本 404 错误
                break;
            case 403: // 处理基本 403 错误
                break;
                      // 处理其他4xx/5xx等基本错误的处理
        }

        return Promise.reject(this);
    };

    if(error.config.hasOwnProperty('catch') && error.config.catch == true) {
        return Promise.reject(error);
    }

    return error.globalErrorProcess()
});
```

我们定义一个全局的错误处理器，并把他赋给 error 对象的 globalErrorProcess 方法。接着判断当前请求 config 是否启用 catch，若启用，默认不进行任何错误处理，交由调用方自行负责；否则用全局错误处理。

在使用时，若需要自定义捕获错误，可显示传递一个 config，相应请求方法的 API 如下：

* axios.request(config)
* axios.get(url[, config])
* axios.delete(url[, config])
* axios.head(url[, config])
* axios.options(url[, config])
* axios.post(url[, data[, config]])
* axios.put(url[, data[, config]])
* axios.patch(url[, data[, config]])

```javascript
axios.post('https://api.github.com/xxx', null, {catch: true}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    let code = error.response.data.error_code

    if (code == 4291011) {
        // 今日投票次数太多，显示关注公众号二维码
    } else if (code == 4031011) {
        // 不允许的投票时间段，
    } else if (code == 4291012) {
        // 作品票数异常，需先通过滑动验证码
    }

    return error.globalErrorProcesser()
});
```

最后别忘了显示的调用全局错误处理，否则是不会懒觉到其他异常处理的。

如果你有更好的方案，欢迎留言一起探讨。

## 参考 & 讨论
* [Global error handling using axios interceptor · GitHub](https://gist.github.com/saqueib/a495af17d7c0e2fd5c2316b0822ebac3)
* [javascript - How to manage axios errors globally or from one point - Stack Overflow](https://stackoverflow.com/questions/48990632/how-to-manage-axios-errors-globally-or-from-one-point)
* [一种 Laravel 异常上下文解决方案 | Laravel China 社区](https://learnku.com/articles/53763)
