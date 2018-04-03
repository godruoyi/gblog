<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['as' => 'admin.', 'domain' => config('app.admin_domain')], function () {
    Route::view('login', 'admin.login')->name('login');
    Route::post('login', 'Auth\LoginController@login')->name('login.submit');
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');

    Route::group(['middleware' => 'auth.admin'], function () {
        Route::view('/', 'admin.index')->name('index');

        Route::resource('users', 'Admin\UserController');
        Route::resource('categories', 'Admin\CategoryController');
        Route::resource('posts', 'Admin\PostController');

        Route::name('upload.sieditor')->post('sieditor/imageupload', 'Admin\PostController@sieditorUpload');
        Route::name('upload.slim')->post('slim/imageupload', 'Admin\PostController@slimFileUpload');
    });
});

Route::view('testb', 'test');

Route::view('/{name?}/{name2?}/{name3?}', 'index')->name('home')->domain(config('app.home_domain'));
