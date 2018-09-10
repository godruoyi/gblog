<?php

namespace App\Transformers;

use App\Models\GithubUser;
use League\Fractal\TransformerAbstract as BaseTransformerAbstract;

class GithubUserTransformer extends BaseTransformerAbstract
{
    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transform(GithubUser $user)
    {
        return [
            'home_page' => $user->blog ?: $user->html_url,
            'username'  => $user->username,
            'avatar'    => $user->avatar,
        ];
    }
}
