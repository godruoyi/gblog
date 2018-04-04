<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <meta charset="utf-8">
    <title>gblog, a open source blog built with Laravel and Vue.js.</title>
    <link rel="canonical" href="https://godruoyi.com/" itemprop="url">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="referrer" content="always">
    <meta name="theme-color" content="#ffffff">
    <meta name="description" content="gblog, a open source blog built with Laravel and Vue.js">
    <link rel="canonical" href="https://godruoyi.com">
    <link href="https://fonts.googleapis.com/css?family=Miriam+Libre:400,700|Source+Sans+Pro:400,700,600,400italic,700italic" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{{ mix('css/frontend.css') }}">
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
</body>
</html>
