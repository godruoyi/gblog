<?php

if (! function_exists('make_excerpt')) {
    /**
     * 截取字符串前面一部分
     *
     * @param  string      $content
     * @param  int|integer $length
     *
     * @return string
     */
    function make_excerpt(string $content, int $length = 200): string
    {
        $excerpt = trim(preg_replace('/\r\n|\r|\n+/', ' ', strip_tags($content)));

        return (string) str_limit($excerpt, $length);
    }
}
