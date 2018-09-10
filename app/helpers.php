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

if (! function_exists('upload_github_avatar')) {
    /**
     * 截取字符串前面一部分
     *
     * @param  string      $content
     * @param  int|integer $length
     *
     * @return string
     */
    function upload_github_avatar(string $url, $prefix = null): string
    {
        try {
            $host = parse_url($url, PHP_URL_HOST);

            if (empty($host) || $host == 'images.godruoyi.com') {
                return $url;
            }

            $http = new \GuzzleHttp\Client;

            $response = $http->get($url, null, ['connect_timeout' => 5]);

            $contentType = explode('/', $response->getHeader('Content-Type')[0]);
            $ext = array_pop($contentType);

            $avatarName = sprintf('avatars/github/%s_%s.%s', $prefix, (time() . '_' . str_random(10)), $ext);
            $storage    = Storage::disk('cosv5');

            if ($storage->put($avatarName, $response->getBody()->getContents(), 'public')) {
                return $storage->url($avatarName);
            }
        } catch (\Exception $e) {
            \Log::error('上传 github 图片失败' . $e->getMessage());
        }

        return $url;
    }
}
