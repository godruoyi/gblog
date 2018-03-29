<?php

namespace App\Transformers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use League\Fractal\ParamBag;
use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
{
    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = ['user', 'category'];

    /**
     * List of default includes.
     *
     * @var array
     */
    protected $defaultIncludes = [];

    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transform(Post $post)
    {
        return [
            'title'       => $post->title,
            'id'          => $post->id,
            'body'        => $post->content,
            'slug'        => $post->slug,
            'excerpt'     =>  $post->excerpt,
            'banner'      =>  $post->banner,
            'user_id'     => $post->user_id,
            'category_id' => $post->category_id,
            'created_at'  => $post->created_at->toDateTimeString()
        ];
    }

    /**
     * Includer user
     *
     * @param  Post   $post
     *
     * @return mixed
     */
    public function includeUser(Post $post)
    {
        return $this->item($post->user, new UserTransformer());
    }

    /**
     * Includer user
     *
     * @param  Post   $post
     *
     * @return mixed
     */
    public function includeCategory(Post $post)
    {
        return $this->item($post->category, new CategoryTransformer());
    }
}
