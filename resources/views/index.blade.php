<!DOCTYPE html>
<html lang="en">
<head>
    <title>home</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <!-- Favicon -->
    {{-- <link rel="shortcut icon" id="shortcut-icon" href="" type="image/x-icon"> --}}

    <!-- App CSS -->
    {{-- <link rel="stylesheet" href="{{ mix('css/app.css') }}"> --}}
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
</body>
</html>
