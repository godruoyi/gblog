<?php

namespace App\Transformers;

use App\Models\Link;
use League\Fractal\ParamBag;

class LinkTransformer extends TransformerAbstract
{
    /**
     * Available field for model
     *
     * @var array
     */
    public $transformFields = ['desc' => 'description'];

    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transformFields(Link $link)
    {
        return [
            'id'   => $link->id,
            'name' => $link->name,
            'desc' => $link->description,
            'link' => $link->link,
            'type' => $link->type,
        ];
    }
}
