<!DOCTYPE html>
<html lang="zh">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>登录</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="stylesheet" href="/vendor/css/login.css">
</head>
<body class="EntrySign-body">
    <div id="root">
        <div>
            <main role="main" class="App-main">
                <div class="SignFlowHomepage" style="background-image:url(/vendor/images/login-bg.png);">
                    <!-- react-empty: 41 -->
                    <div class="SignFlowHomepage-content">
                        <div class="Card SignContainer-content">
                            <div class="SignFlowHeader">
                                {{-- <img src="/vendor/images/large-logo-icon.png" style="width: 60px;"> --}}
                                {{-- <div class="SignFlowHeader-slogen">
                                    登录管理后台
                                </div> --}}
                            </div>
                            <div class="SignContainer-inner">
                                <div class="Login-content">
                                    <form action="{{ route('admin.login.submit') }}" class="SignFlow" method="post">
                                        {{ csrf_field() }}
                                        <div class="SignFlow-account">
                                            <div class="SignFlow-supportedCountriesSelectContainer"></div>
                                            <div class="SignFlowInput SignFlow-accountInputContainer">
                                                <div class="SignFlow-accountInput Input-wrapper">
                                                    <input type="text" value="" name="email" class="Input" placeholder="手机号或邮箱">
                                                </div>
                                                {{-- <div class="SignFlowInput-errorMask undefined SignFlowInput-requiredErrorMask">请输入手机号或邮箱</div> --}}
                                            </div>
                                        </div>
                                        <div class="SignFlow-password">
                                            <div class="SignFlowInput">
                                                <div class="Input-wrapper">
                                                    <input type="password" value="" name="password" class="Input" placeholder="密码">
                                                </div>
                                                {{-- <div class="SignFlowInput-errorMask SignFlow-requiredPasswordErrorMask SignFlow-passwordErrorMask SignFlowInput-requiredErrorMask">请输入密码</div> --}}
                                            </div>
                                        </div>
                                        <button class="Button SignFlow-submitButton Button--primary Button--blue" type="submit">
                                            登录
                                        </button>
                                    </form>
                                </div>
                                {{-- <div class="SignContainer-switch">
                                    <a href="">返回首页</a>
                                </div> --}}
                            </div>
                        </div>
                    </div>
                    {{-- <footer class="SignFlowHomepage-footer">
                        <div class="ZhihuIntegrity">
                            <div>
                                <img src="/vendor/images/large-logo-icon.png" style="width: 26px;">
                                <a href="">godruoyi.com</a>
                            </div>
                        </div>
                    </footer> --}}
                </div>
            </main>
        </div>
    </div>
</body>
</html>
