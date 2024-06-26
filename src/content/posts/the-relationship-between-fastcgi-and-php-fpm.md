---
title: "FastCgi 与 PHP-fpm 之间的关系"
description: "原文分享自 segmentfault 尹川的回答，搞不清 FastCgi 与 PHP-fpm 之间是个什么样的关系"
pubDate: "2018-04-04 07:32:25"
category: "php"
banner: "/images/banners/_1567224162_PFOHIykVkd.jpg"
tags: ["php"]
oldViewCount: 3391
oldKeywords: ["null"]
---

原文分享自[segmentfault](segmentfault.com) @尹川的回答，[搞不清FastCgi与PHP-fpm之间是个什么样的关系](https://segmentfault.com/q/1010000000256516)

> 我在网上查fastcgi与php-fpm的关系，查了快一周了，基本看了个遍，真是众说纷纭，没一个权威性的定义。
> 
>-  网上有的说，fastcgi是一个协议，php-fpm实现了这个协议； 
>- 有的说，php-fpm是fastcgi进程的管理器，用来管理fastcgi进程的； 
>-  有的说，php-fpm是php内核的一个补丁; 
>-  有的说，修改了php.ini配置文件后，没办法平滑重启，所以就诞生了php-fpm； 
>-  还有的说PHP-CGI是PHP自带的FastCGI管理器，那这样的话干吗又弄个php-fpm出来？

**首先，CGI是干嘛的？**

> - CGI是为了保证web server传递过来的数据是标准格式的，方便CGI程序的编写者。
> - web server（比如说nginx）只是内容的分发者。比如，如果请求/index.html，那么web server会去文件系统中找到这个文件，发送给浏览器，这里分发的是静态数据。好了，如果现在请求的是/index.php，根据配置文件，nginx知道这个不是静态文件，需要去找PHP解析器来处理，那么他会把这个请求简单处理后交给PHP解析器。Nginx会传哪些数据给PHP解析器呢？url要有吧，查询字符串也得有吧，POST数据也要有，HTTP header不能少吧，好的，`CGI`就是规定要传哪些数据、以什么样的格式传递给后方处理这个请求的协议。
> - 当web server收到/index.php这个请求后，会启动对应的CGI程序，这里就是PHP的解析器。接下来PHP解析器会解析php.ini文件，初始化执行环境，然后处理请求，再以规定CGI规定的格式返回处理后的结果，退出进程。web server再把结果返回给浏览器。

好了，CGI是个协议，跟进程什么的没关系。

**那fastcgi又是什么呢？**

> Fastcgi是用来提高CGI程序性能的。

提高性能，那么CGI程序的性能问题在哪呢？

> "PHP解析器会解析php.ini文件，初始化执行环境"，就是这里了。标准的CGI对每个请求都会执行这些步骤（不闲累啊！启动进程很累的说！），所以处理每个时间的时间会比较长。这明显不合理嘛！那么Fastcgi是怎么做的呢？首先，Fastcgi会先启一个master，解析配置文件，初始化执行环境，然后再启动多个worker。当请求过来时，master会传递给一个worker，然后立即可以接受下一个请求。这样就避免了重复的劳动，效率自然是高。而且当worker不够用时，master可以根据配置预先启动几个worker等着；当然空闲worker太多时，也会停掉一些，这样就提高了性能，也节约了资源。这就是fastcgi的对进程的管理。

**那PHP-FPM又是什么呢？**

> - 是一个实现了Fastcgi的程序，被PHP官方收了。
> - 大家都知道，PHP的解释器是php-cgi。php-cgi只是个CGI程序，他自己本身只能解析请求，返回结果，不会进程管理（皇上，臣妾真的做不到啊！）所以就出现了一些能够调度php-cgi进程的程序，比如说由lighthttpd分离出来的spawn-fcgi。好了PHP-FPM也是这么个东东，在长时间的发展后，逐渐得到了大家的认可（要知道，前几年大家可是抱怨PHP-FPM稳定性太差的），也越来越流行。

----------

**好了，最后来回来上面的问题。**

 1. 网上有的说，fastcgi是一个协议，php-fpm实现了这个协议
> 对。

 2. 有的说，php-fpm是fastcgi进程的管理器，用来管理fastcgi进程的
> 对。php-fpm的管理对象是php-cgi。但不能说php-fpm是fastcgi进程的管理器，因为前面说了fastcgi是个协议，似乎没有这么个进程存在，就算存在php-fpm也管理不了他（至少目前是）。

 3. 有的说，php-fpm是php内核的一个补丁
> 以前是对的。因为最开始的时候php-fpm没有包含在PHP内核里面，要使用这个功能，需要找到与源码版本相同的php-fpm对内核打补丁，然后再编译。后来PHP内核集成了PHP-FPM之后就方便多了，使用--enalbe-fpm这个编译参数即可。

 4. 有的说，修改了php.ini配置文件后，没办法平滑重启，所以就诞生了php-fpm
 >是的，修改php.ini之后，php-cgi进程的确是没办法平滑重启的。php-fpm对此的处理机制是新的worker用新的配置，已经存在的worker处理完手上的活就可以歇着了，通过这种机制来平滑过度。

 5. 还有的说PHP-CGI是PHP自带的FastCGI管理器，那这样的话干吗又弄个php-fpm出来？
 > 不对。php-cgi只是解释PHP脚本的程序而已。
