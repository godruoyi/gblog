<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Handlers\ImageUploadHandler;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class StorageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request, ImageUploadHandler $uploader)
    {
        $file = $request->upload_files;

        // ->resize(1200)
        if (($file instanceof UploadedFile) && ($path = $uploader->upload($file, 'comments', mt_rand(1, 100)))) {
            return [
                'filename' => $path
            ];
        }

        return ['error' => '上传失败'];
    }
}
