let mix = require('laravel-mix');
const path = require('path');
const BabiliPlugin = require("babili-webpack-plugin");

let plugins = [];

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
    .styles(['resources/assets/css/frontend.css'], 'public/css/frontend.css');

if (process.env.NODE_ENV === 'production') {
    plugins.push(new BabiliPlugin());
    mix.version();
}

mix.options({
    uglify: false,
    // processCssUrls: false
});

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
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        }
                    }
                ]
            },
        ]
    },
    plugins
});
