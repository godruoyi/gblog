<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Handlers\ImageUploadHandler;

class StorageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request, ImageUploadHandler $uploader)
    {
        if ($request->upload_files && ($path = $uploader->resize(1200)->upload($request->upload_files, 'comments', mt_rand(1, 100)))) {
            return [
                'filename' => $path
            ];
        }

        return ['error' => '上传失败'];
    }
}
