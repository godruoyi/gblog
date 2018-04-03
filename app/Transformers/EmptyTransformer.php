<?php

namespace App\Transformers;

class EmptyTransformer extends TransformerAbstract
{
    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transformFields()
    {
        return [];
    }
}
