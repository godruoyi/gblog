<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerObserves();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app['Dingo\Api\Transformer\Factory']->setAdapter(function ($app) {
             return new \App\Support\Fractal(
                 (new \League\Fractal\Manager)->setSerializer(new \League\Fractal\Serializer\ArraySerializer)
             );
        });

        app('Dingo\Api\Exception\Handler')->register(function (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException('404 Not Found!');
        });

        app('Dingo\Api\Exception\Handler')->register(function (\Illuminate\Validation\ValidationException $e) {
            throw new \Symfony\Component\HttpKernel\Exception\BadRequestHttpException($e->validator->errors()->first());
        });
    }

    /**
     * Register observer
     *
     * @return void
     */
    protected function registerObserves(): void
    {
        \App\Models\Post::observe(\App\Observers\Postbserver::class);
        \App\Models\Category::observe(\App\Observers\Categorybserver::class);
    }
}
