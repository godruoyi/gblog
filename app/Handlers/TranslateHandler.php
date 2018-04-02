<?php

namespace App\Handlers;

use GuzzleHttp\Client;
use Overtrue\Pinyin\Pinyin;

class TranslateHandler
{
    const API_HTTPS = 'https://openapi.youdao.com/api';

    protected $appId;

    protected $secret;

    protected $keyword;

    /**
     * Create Youdan translate instance
     *
     * @param string $appId
     * @param string $secret
     */
    public function __construct(string $appId = null, string $secret = null)
    {
        $this->appId = $appId ?? config('services.translate.youdao.appid');
        $this->secret = $secret ?? config('services.translate.youdao.secret');
    }

    /**
     * Start translate
     *
     * @param  string $keyword
     * @param  string $form
     * @param  string $to
     *
     * @return string
     */
    public function trans(string $keyword, string $form = 'zh-CHS', string $to = 'EN'): string
    {
        $keyword = trim($keyword);
        $this->keyword = $keyword;

        if (! $this->appId && ! $this->secret) {
            return $this->defaultTrans($this->keyword);
        }

        try {
            return $this->responseToString($this->getHttpClient()->get(self::API_HTTPS, $this->buildRequestParam($keyword, $form, $to)));
        } catch (Exception $e) {
            return $this->keyword;
        }
    }

    /**
     * Default trans if youdao appid and secret is not set
     *
     * @param  string $word
     *
     * @return string
     */
    public function defaultTrans(string $word): string
    {
        return (new Pinyin())->sentence($word);
    }

    /**
     * Convert Response to string
     *
     * @param  \GuzzleHttp\Psr7\Response|null $response
     *
     * @return string
     */
    protected function responseToString($response): string
    {
        if ($response instanceof \GuzzleHttp\Psr7\Response) {
            $response = json_decode((string) $response->getBody(), true);

            if (json_last_error() === JSON_ERROR_NONE && ! empty($response['translation'][0])) {
                $word = (string) $response['translation'][0];

                $pattern = ['/[[:punct:]]/i', '/[ ]{1,}/'];
                return trim(preg_replace($pattern, ' ', $word));
            }
        }

        return $this->keyword;
    }

    /**
     * Get Http Client Instance
     *
     * @return \GuzzleHttp\Client
     */
    protected function getHttpClient(): Client
    {
        return new Client();
    }

    /**
     * Build youdao translate request param
     *
     * @param  string $keyword
     * @param  string $form
     * @param  string $to
     *
     * @return array
     */
    protected function buildRequestParam(string $keyword, string $form = 'en', string $to = 'zh'): array
    {
        $keyword = mb_convert_encoding($keyword, 'UTF-8', 'auto');

        return [
            // 'headers' => ['content-type' => 'application/json'],
            'query' => [
                'q'      => $keyword,
                'from'   => $form,
                'to'     => $to,
                'appKey' => $this->appId,
                'salt'   => $salt = mt_rand(10086, 99999),
                'sign'   => $this->sign($keyword, $salt)
            ],
            // 'verify'=> false,
        ];
    }

    /**
     * Youdaoyun sign
     *
     * @param  string $keyword
     * @param  string $salt
     *
     * @return string
     */
    protected function sign(string $keyword, string $salt): string
    {
        return md5(join('', [
            $this->appId,
            $keyword,
            $salt,
            $this->secret,
        ]));
    }
}
