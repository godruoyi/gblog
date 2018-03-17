<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:20',
            'category_id' => 'required|integer|exists:categories,id',
            'content' => 'required|string',
        ];
    }
}
