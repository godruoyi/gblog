<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;
use App\Handlers\ImageUploadHandler;
use App\Handlers\TranslateHandler;

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
            'is_draft' => 'required|string|in:no,yes'
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
        $datas = $this->validated();
        $datas['banner'] = app(ImageUploadHandler::class)->resize(1100)->upload($this->file('banner'), 'posts');

        return $datas;
    }

    /**
     * Prepare update user data
     *
     * @return array
     */
    public function prepareUpdatePost(): array
    {
        $datas = array_filter($this->validated());

        if ($file = $this->file('banner')) {
            $datas['banner'] = app(ImageUploadHandler::class)->resize(1100)->upload($this->file('banner'), 'posts');
        }

        return $datas;
    }

    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    protected function validationData()
    {
        if ($this->title) {
            $this->offsetSet('slug', str_slug(app(TranslateHandler::class)->trans($this->title)));
        }

        return $this->all();
    }
}
