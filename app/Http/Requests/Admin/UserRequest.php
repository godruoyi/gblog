<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;
use App\Handlers\ImageUploadHandler;

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
            'avatar' => 'required|url',
        ];

        switch ($this->method()) {
            case 'POST':
                $rules['email'] = 'required|email|unique:users,email';
                $rules['password'] = 'required|min:6|max:20|confirmed';
                break;
            case 'PUT':
                $rules['email'] = ['required', 'email', Rule::unique('users')->ignore($this->route('user'))];
                $rules['password'] = 'nullable|min:6|max:20|confirmed';
                $rules['avatar']   = 'nullable|url';
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
    public function prepareStoreUser(): array
    {
        return $this->validated();
    }

    /**
     * Prepare update user data
     *
     * @return array
     */
    public function prepareUpdateUser(): array
    {
        $datas = $this->validated();

        return array_filter($datas);
    }
}
