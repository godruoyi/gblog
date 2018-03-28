<?php

namespace App\Models;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category_id', 'user_id', 'title', 'slug', 'order', 'banner',
        'reply_count', 'view_count', 'content', 'excerpt', 'is_draft'
    ];

    /**
     * The post's user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The post's category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * Is not draft
     *
     * @return Builder
     */
    public function scopeIsNotDraft($builder)
    {
        return $builder->where('is_draft', 'no');
    }
}
