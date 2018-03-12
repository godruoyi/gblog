let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/admin.js', 'public/js/admin.js');
    // .scripts([
    //     'resources/assets/js/vendor/bootstrap-notify.min.js'
    // ], 'public/js/admin-vendor.js');

if (mix.inProduction()) {
    mix.version();
}

// mix.disableNotifications();
