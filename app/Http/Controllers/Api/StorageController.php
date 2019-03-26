<?php

namespace App\Http\Controllers\Api;

use App\Support\Uploader;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class StorageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        $file = $request->upload_files;

        if (($file instanceof UploadedFile) && ($path = Uploader::resizeUpload($file, 'comments', [
            'method' => 'scale',
            'height' => 300,
        ]))) {
            return [
                'filename' => $path
            ];
        }

        return ['error' => '上传失败'];
    }
}
