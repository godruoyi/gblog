<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;
use App\Handlers\ImageUploadHandler;

class PostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title' => 'required|string|max:100',
            'category_id' => 'required|integer|exists:categories,id',
            'content' => 'required|string',
            'banner' => 'required|file',
        ];


        switch ($this->method()) {
            case 'POST':
                $rules['slug'] = 'required|string|unique:posts,slug';
                break;
            case 'PUT':
                $rules['slug'] = ['required', 'string', Rule::unique('posts')->ignore($this->route('post'))];
                $rules['banner']   = 'nullable|file';
                break;
            default:
                return [];
        }

        return $rules;
    }

    /**
     * Prepare store user data
     *
     * @return array
     */
    public function prepareStorePost(): array
    {
        $path = app(ImageUploadHandler::class)->upload($this->file('banner'), 'posts');

        $datas = $this->validated();
        $datas['banner'] = $path;

        return $datas;
    }

    /**
     * Prepare update user data
     *
     * @return array
     */
    public function prepareUpdatePost(): array
    {
        $datas = $this->validated();

        if ($file = $this->file('banner')) {
            $path = app(ImageUploadHandler::class)->upload($file, 'posts');
            $datas['banner'] = $path;
        }

        return array_filter($datas);
    }
}
