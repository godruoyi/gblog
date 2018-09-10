<?php

namespace App\Models;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content', 'status', 'post_id', 'user_id'
    ];

    /**
     * The comment's post
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }

    /**
     * The comment's user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function githubUser()
    {
        return $this->belongsTo(GithubUser::class, 'user_id', 'id');
    }
}
