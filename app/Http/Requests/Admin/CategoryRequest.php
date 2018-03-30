<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|string|max:20',
            'description' => 'nullable|string|max:100',
            'title' => 'required|string|max:100',
            'slug' => $this->method() === 'POST'
                ? 'required|regex:/^[A-Za-z0-9\-\_]+$/|unique:categories,slug'
                : ['required', 'regex:/^[A-Za-z0-9\-\_]+$/', Rule::unique('categories')->ignore($this->route('category'))]
        ];

        return $rules;
    }
}
