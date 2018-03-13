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
            'avatar' => 'required|file',
        ];

        switch ($this->method()) {
            case 'POST':
                $rules['email'] = 'required|email|unique:users,email';
                $rules['password'] = 'required|min:6|max:20|confirmed';
                break;
            case 'PUT':
                $rules['email'] = ['required', 'email', Rule::unique('users')->ignore($this->route('user'))];
                $rules['password'] = 'nullable|min:6|max:20|confirmed';
                $rules['avatar']   = 'nullable|file';
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
        $path = app(ImageUploadHandler::class)->resize(200)->upload($this->file('avatar'), 'users');

        $datas = $this->validated();
        $datas['avatar'] = $path;

        return $datas;
    }

    /**
     * Prepare update user data
     *
     * @return array
     */
    public function prepareUpdateUser(): array
    {
        $datas = $this->validated();

        if ($file = $this->file('avatar')) {
            $path = app(ImageUploadHandler::class)->resize(200)->upload($file, 'users');
            $datas['avatar'] = $path;
        }

        return array_filter($datas);
    }
}
