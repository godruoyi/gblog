<?php

namespace App\Models;

class Category extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $categories;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'slug', 'post_count', 'description'
    ];

    /**
     * The category post list
     * 
     * @return mixed
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'category_id');
    }
}