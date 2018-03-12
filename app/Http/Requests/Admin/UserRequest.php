<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name'   => 'required|string|max:20',
            'avatar' => 'required|file',
        ];

        switch ($this->method()) {
            case 'POST':
                $rules['password'] = 'required|min:6|max:20|confirmed';
                $rules['email'] = 'required|email|unique:users,email';
                break;
            case 'PUT':
                $rules['password'] = 'min:6|max:20|confirmed';
                $rules['email'] = ['required', 'email', Rule::unique('users')->ignore($this->route('user'))];
                break;
            default:
                return [];
        }

        return $rules;
    }

    public function prepareStoreUser($value = '')
    {
    }
}
