<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;
use App\Handlers\TranslateHandler;

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
            'slug' => $this->method() === 'PUT'
                ? ['required', 'max:20', 'regex:/^[A-Za-z0-9\-\_]+$/', Rule::unique('categories')->ignore($this->route('category'))]
                : ''
        ];

        return $rules;
    }

    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    protected function validationData()
    {
        if ($this->name && $this->method() === 'POST') {
            $this->offsetSet('slug', str_slug(app(TranslateHandler::class)->trans($this->name)));
        }

        return $this->all();
    }
}
