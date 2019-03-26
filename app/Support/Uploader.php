<?php

namespace App\Support;

use Storage;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;

class Uploader
{
    /**
     * Upload file
     *
     * @param  \SplFileInfo|local_path $file
     * @param  string $folder
     * @param  array  $options
     *
     * @return path
     */
    public static function upload($file, string $folder, array $options = [])
    {
        $path = self::buildFileName($file, $folder);

        if (is_string($file) && is_file($file)) {
            $file = file_get_contents($file);
        }

        return self::put($path, $file, $options);
    }

    /**
     * Optimize and upload
     *
     * @param  \SplFileInfo|local_path|url $file $file
     * @param  string $folder
     * @param  array  $options
     *
     * @return mixed
     */
    public static function optimizeUpload($file, string $folder, array $options = [])
    {
        if (ImageOptimizer::isNotSupportOptimizeType($file)) {
            $content = ImageOptimizer::fileToContent($file);
        } else {
            $content = ImageOptimizer::optimize($file);
        }

        $path = self::buildFileName($file, $folder);

        return self::put($path, $content, $options);
    }

    /**
     * Resize upload
     *
     * @param  \SplFileInfo|local_path|url $file $file
     * @param  string $folder
     * @param  array  $options
     * @param  array  $resizeParams
     *
     * @return mixed
     */
    public static function resizeUpload($file, string $folder, array $resizeParams, array $options = [])
    {
        if (ImageOptimizer::isNotSupportOptimizeType($file)) {
            $content = ImageOptimizer::fileToContent($file);
        } else {
            $content = ImageOptimizer::resize($file, $resizeParams);
        }

        $path = self::buildFileName($file, $folder);

        return self::put($path, $content, $options);
    }

    /**
     * Put file by default storage
     *
     * @param  string $path
     * @param  \SplFileInfo|local_path $file
     * @param  array  $options
     *
     * @return mixed
     */
    public static function put(string $path, $file, array $options)
    {
        $storage = Storage::disk();

        if ($storage->put($path, $file, $options)) {
            if (method_exists($storage, 'url')) {
                return $storage->url($path);
            }

            if (! filter_var($path, FILTER_VALIDATE_URL)) {
                return config('app.url') . $path;
            }

            return $path;
        }

        throw new UploadException("File upload fail.", 500);
    }

    /**
     * Get file Extension
     *
     * @param  mixed $file
     *
     * @return string
     */
    public static function resolveFileExtension($file)
    {
        switch (true) {
            case $file instanceof UploadedFile:
                return $file->getClientOriginalExtension();
            case $file instanceof \SplFileInfo:
                return $file->getExtension();
            case is_string($file) && filter_var($file, FILTER_VALIDATE_URL):
            case is_string($file) && is_file($file):
                $ext = explode('.', $file);

                return end($ext);
            default:
                return '';
        }
    }

    /**
     * Build The file name
     *
     * @param  UploadedFile $file
     * @param  string       $folder
     * @param  string|null  $filePrefix
     *
     * @return string
     */
    public static function buildFileName($file, string $folder, string $filePrefix = null): string
    {
        $fileName  = date("Ym", time()) . '/' .date("d", time()) . '/';
        $extension = self::resolveFileExtension($file) ?: 'png';

        return  $folder . '/' . $fileName . $filePrefix . '_' . time() . '_' . str_random(10) . '.' . $extension;
    }
}
