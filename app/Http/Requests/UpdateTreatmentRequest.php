<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTreatmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nama" => "required|string|max:255",
            "harga" => "required|numeric",
            "deskripsi" => "required|string",
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama treatment harus diisi',
            'harga.required' => 'Harga treatment harus diisi',
            'deskripsi.required' => 'Deskripsi treatment harus diisi',
        ];
    }
}
