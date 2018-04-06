<?php

namespace App\Models;

class Link extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'logo', 'description', 'link', 'type'
    ];
}
