<?php

namespace App\Transformers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use League\Fractal\ParamBag;

class PostTransformer extends TransformerAbstract
{
    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = ['user', 'category', 'comments'];

    /**
     * List of default includes.
     *
     * @var array
     */
    protected $defaultIncludes = [];

    /**
     * Available field for model
     *
     * @var array
     */
    public $transformFields = ['body' => 'content'];

    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transformFields(Post $post)
    {
        return [
            'title'       => $post->title,
            'id'          => $post->id,
            'body'        => $post->content,
            'slug'        => $post->slug,
            'excerpt'     => $post->excerpt,
            'banner'      => $post->banner,
            'user_id'     => $post->user_id,
            'category_id' => $post->category_id,
            'created_at'  => $post->created_at ? $post->created_at->toDateTimeString() : null,
            'highlight'   => $post->highlight,
        ];
    }

    /**
     * Includer user
     *
     * @param  Post   $post
     *
     * @return mixed
     */
    public function includeUser(Post $post, ParamBag $params)
    {
        $user = $this->searchItem($post, 'user', $params);

        return $this->item($user, new UserTransformer());
    }

    /**
     * Includer user
     *
     * @param  Post   $post
     *
     * @return mixed
     */
    public function includeComments(Post $post, ParamBag $params)
    {
        $comments = $this->searchItem($post, 'comments', $params);

        return $this->collection($comments, new CommentTransformer());
    }

    /**
     * Includer user
     *
     * @param  Post   $post
     *
     * @return mixed
     */
    public function includeCategory(Post $post, ParamBag $params)
    {
        $category = $this->searchItem($post, 'category', $params);

        return $this->item($category, new CategoryTransformer());
    }
}
