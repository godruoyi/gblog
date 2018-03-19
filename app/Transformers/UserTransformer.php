<?php

namespace App\Transformers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * Transform a collection.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'name' => $user->name,
            'created_at' => $user->created_at->toDateTimeString()
        ];
    }
}
