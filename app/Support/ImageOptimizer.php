<?php

namespace App\Support;

use GuzzleHttp\Client;

class ImageOptimizer
{
    /**
     * OPtimize file
     *
     * @param  \SplFileInfo|local_path|url $file $file
     *
     * @return string
     */
    public static function optimize($file)
    {
        $content = self::fileToContent($file);

        return \Tinify\fromBuffer($content)->toBuffer();
    }

    /**
     * Resiz and optimize
     *
     * https://tinypng.com/developers/reference/php
     *
     * @param  \SplFileInfo|local_path|url $file $file
     * @param  string   $method
     * @param  int|null $width
     * @param  int|null $height
     *
     * @return string
     */
    public static function resize($file, array $params)
    {
        $source = \Tinify\fromBuffer(self::fileToContent($file));

        return $source->resize($params)->toBuffer();
    }

    /**
     * Transform file to content
     *
     * @param  \SplFileInfo|local_path|url $file $file
     *
     * @return string
     */
    public static function fileToContent($file)
    {
        if ($file instanceof \SplFileInfo) {
            return file_get_contents($file->getRealPath());
        } elseif (is_string($file) && filter_var($file, FILTER_VALIDATE_URL)) {
            return Downloader::download($file);
        } elseif (is_string($file) && is_file($file)) {
            return file_get_contents($file);
        } else {
            throw new Extension('Invalid file type.');
        }
    }

    /**
     * Is Not Support Optimize Type
     *
     * @param  \SplFileInfo|local_path|url $file $file
     *
     * @return boolean
     */
    public static function isNotSupportOptimizeType($file)
    {
        $extension = Uploader::resolveFileExtension($file);

        return in_array(strtolower($extension), ['gif'], true);
    }
}
