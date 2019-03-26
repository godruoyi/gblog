<?php

namespace App\Support;

use GuzzleHttp\Client;

class Downloader
{
    public static function download(string $url, $returnExt = false)
    {
        $http = new Client;

        $response = $http->get($url, null, ['connect_timeout' => 5]);

        if (! $returnExt) {
            return $response->getBody()->getContents();
        }

        $contentType = explode('/', $response->getHeader('Content-Type')[0]);
        $ext = array_pop($contentType);

        return [$response->getBody()->getContents(), $ext];
    }
}
