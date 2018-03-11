<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <link rel="stylesheet" href="{{ asset('vendor/css/app.css') }}">

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
                    <div class="voyager-notifications"></div>
                    @yield('content')
                </div>
            </div>
        </div>
    </div>

    @include('admin.layouts.footer')
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    @yield('javascript')
</body>
</html>
