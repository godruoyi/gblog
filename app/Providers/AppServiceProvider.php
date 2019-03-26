<?php

namespace App\Providers;

use App\Support\ElasticsearchEngine;
use Illuminate\Support\ServiceProvider;
use Laravel\Scout\EngineManager;
use Elasticsearch\ClientBuilder as ElasticBuilder;

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

        resolve(EngineManager::class)->extend('elasticsearch', function ($app) {
            return new ElasticsearchEngine(
                ElasticBuilder::create()
                ->setHosts(config('scout.elasticsearch.hosts'))
                ->build(),
                config('scout.elasticsearch.index')
            );
        });

        \Tinify\setKey(config('app.tinify_key'));

        if ($proxy = config('app.tinify_proxy')) {
            \Tinify\setProxy($proxy);
        }
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
    }
}
