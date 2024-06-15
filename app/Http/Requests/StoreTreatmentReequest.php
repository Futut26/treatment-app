<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTreatmentReequest extends FormRequest
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
        "treatment_image"=> "required|image|mimes:jpeg,png,jpg,gif,svg|max:2048"
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama treatment harus diisi',
            'harga.required' => 'Harga treatment harus diisi',
            'deskripsi.required' => 'Deskripsi treatment harus diisi',
            'treatment_image.required' => 'Gambar treatment harus diisi',
            'treatment_image.image' => 'File harus berupa gambar',
            'treatment_image.mimes' => 'File harus berupa gambar dengan format jpeg, png, jpg, gif, atau svg',
            'treatment_image.max' => 'Ukuran gambar maksimal 2MB'
        ];
    }
}
