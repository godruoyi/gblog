<?php

namespace App\Transformers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use League\Fractal\TransformerAbstract;

class CategoryTransformer extends TransformerAbstract
{
    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = ['posts'];

    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transform(Category $category)
    {
        return [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'created_at' => $category->created_at->toDateTimeString()
        ];
    }

    /**
     * Includer posts
     *
     * @param  category   $category
     *
     * @return mixed
     */
    public function includePosts(Category $category)
    {
        return $this->collection($category->posts, new PostTransformer());
    }
}
