<?php

namespace App\Transformers;

use App\Models\Comment;
use League\Fractal\ParamBag;
use League\Fractal\TransformerAbstract as BaseTransformerAbstract;

class CommentTransformer extends BaseTransformerAbstract
{
    /**
     * Include resources without needing it to be requested.
     *
     * @var array
     */
    protected $defaultIncludes = ['user'];

    /**
     * Transform a model.
     *
     * @return array
     */
    public function transform(Comment $comment)
    {
        return [
            'id'      => $comment->id,
            'content' => $comment->content,
            'created_at' => $comment->created_at->toDateTimeString(),
        ];
    }

    /**
     * Includer user
     *
     * @param  Post   $post
     *
     * @return mixed
     */
    public function includeUser(Comment $comment)
    {
        return $this->item($comment->githubUser, new GithubUserTransformer());
    }
}
