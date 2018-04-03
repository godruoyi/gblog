<?php

namespace App\Transformers;

use Exception;
use League\Fractal\ParamBag;
use League\Fractal\TransformerAbstract as BaseTransformerAbstract;
use Illuminate\Database\Eloquent\Model;

abstract class TransformerAbstract extends BaseTransformerAbstract
{
    use Traits\FractalIncludeSearchAble;

    /**
     * Available field for model
     *
     * @var array
     */
    public $transformFields = [];

    /**
     * Transform a model.
     *
     * @return array
     */
    public function transform($model)
    {
        if (! $model instanceof Model || is_null($model) || ! method_exists($this, 'transformFields')) {
            return [];
        }

        return $this->getAvailabletransformFields(array_keys($model->getAttributes()), $this->transformFields($model));
    }

    public function getAvailabletransformFields(array $attributs, array $transformData)
    {
        if (! empty($this->transformFields)) {
            foreach ($attributs as $key => $attribut) {
                foreach ($this->transformFields as $custom => $field) {
                    if ($attribut == $field) {
                        unset($attributs[$key]);
                        $attributs[] = $custom;
                    }
                }
            }

        }

        return collect($transformData)->only($attributs)->toArray();
    }
}
