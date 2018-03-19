<?php

namespace App\Transformers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use League\Fractal\TransformerAbstract;

class CategoryTransformer extends TransformerAbstract
{
    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transform(Category $category)
    {
        return [
            'name' => $category->name,
            'created_at' => $category->created_at->toDateTimeString()
        ];
    }
}
