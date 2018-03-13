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
                $rules['email'] = 'required|email|unique:users,email';
                $rules['password'] = 'required|min:6|max:20|confirmed';
                break;
            case 'PUT':
                $rules['email'] = ['required', 'email', Rule::unique('users')->ignore($this->route('user'))];
                $rules['password'] = 'min:6|max:20|confirmed';
                break;
            default:
                return [];
        }

        return $rules;
    }

    public function prepareStoreUser($value = '')
    {
    }

    public function prepareUpdateUser($value = '')
    {
        # code...
    }
}
