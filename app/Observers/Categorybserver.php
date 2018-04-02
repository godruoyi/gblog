<?php

namespace App\Observers;

use App\Models\Category;
use App\Handlers\TranslateHandler;

class Categorybserver
{
    /**
     * 分类保存时
     *
     * @param  Post   $post
     *
     * @return void
     */
    public function saving(Category $category)
    {
        $category->slug = app(TranslateHandler::class)->trans($category->name);
    }
}
