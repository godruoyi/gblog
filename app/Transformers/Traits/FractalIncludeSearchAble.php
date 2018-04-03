<?php

namespace App\Transformers\Traits;

use League\Fractal\ParamBag;
use Illuminate\Database\Eloquent\Model ;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Builder;

trait FractalIncludeSearchAble
{
    /**
     * The default avaiable include params when include post
     *
     * @var array
     */
    private $validParams = ['limit', 'order', 'fields'];

    /**
     * @return
     */
    public function searchCollection($model, string $relation, ParamBag $params)
    {
        return $this->search(...func_get_args())->get();
    }

    /**
     */
    public function searchItem($model, string $relation, ParamBag $params)
    {
        $relation = $model->{$relation};

        if ($relation && isset($params['fields']) && ! empty($params['fields'])) {
            $relation = $relation->setRawAttributes($relation->only($params['fields']));
        }

        return $relation;
    }

    /**
     * @param  Model    $model
     * @param  string   $relation
     * @param  ParamBag $params
     *
     * @return mixed
     */
    public function search($model, string $relation, ParamBag $params)
    {
        $params = iterator_to_array($params);

        $relation = $model->{$relation}();
        $builder  = $relation->getQuery();

        if (! empty($params)) {
            foreach ($params as $key => $value) {
                $method = 'search' . ucfirst(strtolower($key));
                if (method_exists($this, $method)) {
                    $builder = $this->{$method}($builder, $params[$key]);
                }
            }
        }

        return $builder;
    }

    /**
     * search with limit
     *
     * @param  Builder $builder
     * @param  mixed   $limit
     * @return mixed
     */
    protected function searchLimit(Builder $builder, array $params = [])
    {
        if (! empty($params) && count($params) <= 2) {
            $limit  = ($params[0] <= 0) ? 10 : $params[0];
            $offset = isset($params[1]) && $params[1] > 0 ? $params[1] : 0;

            $builder->take($limit)->skip((int) $offset);
        }

        return $builder;
    }

    /**
     * search with order
     *
     * @param  Builder $builder
     * @param  mixed   $limit
     * @return mixed
     */
    protected function searchOrder(Builder $builder, array $params = [])
    {
        list($key, $order) = $params;

        if (empty(! $key) && in_array($key, $this->getModelFillable($builder))) {
            $order = in_array(strtolower($order), ['asc', 'desc'], true) ? $order : 'desc';

            $builder->orderBy($key, $order);
        }

        return $builder;
    }

    /**
     * search with fields
     *
     * @param  Builder $builder
     * @param  mixed   $limit
     * @return mixed
     */
    protected function searchFields(Builder $builder, array $params = [])
    {
        $model = $builder->getModel();

        if (! empty($params) && ! empty($selects = array_intersect($this->getModelFillable($builder), $params))) {

            $builder->select($selects);
        }

        return $builder;
    }

    /**
     * Get model fillable and append id field
     *
     * @param  Model  $model
     *
     * @return array
     */
    protected function getModelFillable(Builder $builder): array
    {
        return array_merge($builder->getModel()->getFillable(), ['id', 'created_at']);
    }
}
