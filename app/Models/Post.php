<?php

namespace App\Models;

use Laravel\Scout\Searchable;

class Post extends Model
{
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category_id', 'user_id', 'title', 'slug', 'order', 'banner',
        'reply_count', 'view_count', 'content', 'excerpt', 'is_draft'
    ];

    public $searchSettings = [
        'attributesToHighlight' => [
            '*'
        ]
    ];

    public $highlight = [];

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'title'   => $this->title,
            'slug'    => $this->slug,
            'content' => $this->content,
        ];
    }

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
     * The post's comments
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'id');
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
