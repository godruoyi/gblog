<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', '首页') | 后台管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <link rel="stylesheet" href="/vendor/css/app.css">

    <style type="text/css"> .voyager .alert {margin: 10px auto;} .voyager .alert.alert-success {border-radius: 0px; padding: 20px; margin-bottom: 20px; line-height: 26px; border: none; background-color: #E5F9E7; color: #1EBC30; box-shadow: 0 0 0 1px #1EBC30 inset, 0 0 0 0 transparent; } .voyager .alert.alert-danger {background-color: #f2dede; color: #a94442; } .alert .close {right: -5px;top: -5px;padding: 8px;}</style>
    @yield('styles')
</head>
<body class="voyager">
    @include('admin.layouts.loader')

    <div class="app-container expanded no-animation">
        <div class="fadetoblack visible-xs"></div>
        <div class="row content-container">
            @include('admin.layouts.header')
            @include('admin.layouts.sidebar')

            <div class="container-fluid">
                <div class="side-body padding-top">
                    <div class="col-md-12">
                        @include('flash::message')
                    </div>
                    @yield('content')
                </div>
            </div>
        </div>
    </div>

    @include('admin.layouts.footer')
    <script type="text/javascript" src="{{ mix('js/admin.js') }}"></script>
    @yield('javascript')
</body>
</html>
