<?php

namespace App\Handlers;

use Image;
use Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;

class ImageUploadHandler
{
    protected $allowedExts = [];

    protected $disk = 'public';

    protected $maxWidth = null;

    protected $options = [];

    /**
     * Set the default storage disk
     *
     * @param  string $disk
     *
     * @return \App\Handlers\ImageUploadHandler
     */
    public function disk(string $disk = 'public'): ImageUploadHandler
    {
        $this->disk = $disk;

        return $this;
    }

    /**
     * Set the default allow file ext
     *
     * @param  mixed $exts
     *
     * @return \App\Handlers\ImageUploadHandler
     */
    public function alloweds(): ImageUploadHandler
    {
        $arguments = func_get_args();

        if (! empty($arguments)) {
            $this->allowedExts = $arguments;
        }

        return $this;
    }

    /**
     * Reset the image max width
     *
     * @param  int|integer $maxWidth
     *
     * @return \App\Handlers\ImageUploadHandler
     */
    public function resize(int $maxWidth = 200): ImageUploadHandler
    {
        $this->maxWidth = $maxWidth;

        return $this;
    }

    /**
     * Set storage options patrams
     *
     * @param  array $options
     *
     * @return \App\Handlers\ImageUploadHandler
     */
    public function options(array $options = []): ImageUploadHandler
    {
        $this->options = $options;

        return $this;
    }

    /**
     * Upload file to use storage
     *
     * @param  UploadedFile $file
     * @param  string       $folder
     * @param  string|null  $filePrefix
     *
     * @throws UploadException
     *
     * @return string
     */
    public function upload(UploadedFile $file, string $folder, string $filePrefix = null): string
    {
        $extension = strtolower($file->getClientOriginalExtension()) ?: 'png';
        if (! empty($this->allowedExts) && ! in_array($extension, $this->allowedExts, true)) {
            throw new UploadException("File extension not allow.", 403);
        }

        if ($this->maxWidth && $extension != 'gif') {
            $this->reduseSize($file, $this->maxWidth);
        }

        $storage = Storage::disk($this->disk);

        if ($path = $storage->putFileAs($folder, $file, $this->buildFileName(...func_get_args()), $this->options)) {
            if (method_exists($storage, 'url')) {
                $path = $storage->url($path);
            }

            if (! filter_var($path, FILTER_VALIDATE_URL)) {
                $path = config('app.url') . $path;
            }

            return $path;
        }

        throw new UploadException("File upload fail.", 500);
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
    protected function buildFileName(UploadedFile $file, string $folder, string $filePrefix = null): string
    {
        $fileName  = date("Ym", time()) . '/' .date("d", time()) . '/';
        $extension = strtolower($file->getClientOriginalExtension()) ?: 'png';

        return  $fileName . $filePrefix . '_' . time() . '_' . str_random(10) . '.' . $extension;
    }

    /**
     * Reset image size
     *
     * @param  UploadedFile $file
     * @param  int    $maxWidth
     *
     * @return void
     */
    protected function reduseSize(UploadedFile $file, int $maxWidth)
    {
        $image = Image::make($file);
        $image->resize($maxWidth, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $image->save();
    }
}
