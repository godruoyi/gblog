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

mix.js('resources/assets/js/admin.js', 'public/js/admin.js')
    .js('resources/assets/js/frontend.js', 'public/js/app.js')
    .js('resources/assets/js/utils/simeditormd.js', 'public/js/admin-sieditor.js')

if (mix.inProduction()) {
    mix.version();
}

// mix.disableNotifications();

mix.webpackConfig({
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': 'assets/js/',
            'plugins': 'assets/js/plugins/',
            'utils': 'assets/js/utils/',
            'frontend': 'assets/js/frontend/',
            'vendor': 'assets/js/vendor/',
        },
        modules: [
            'node_modules',
            path.resolve(__dirname, "resources")
        ]
    }
});
