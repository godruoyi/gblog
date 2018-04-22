<?php

namespace App\Http\Requests\Admin;

use App\Handlers\ImageUploadHandler;

class LinkRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
            'link' => 'required|string|max:255|url',
            'description' => 'nullable|string|max:255',
            'logo' => 'nullable|url',
            'type' => 'required|string|in:bottom,left'
        ];
    }

    /**
     * Prepare update or create data for link
     *
     * @return array
     */
    public function prepare(): array
    {
        $datas = $this->validated();

        // if (($logo = $this->file('logo'))
        //     && ($logopath = app(ImageUploadHandler::class)->resize(200)->upload($logo, 'links'))) {
        //     $datas['logo'] = $logopath;
        // }

        return $datas;
    }
}
