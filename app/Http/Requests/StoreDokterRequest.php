<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDokterRequest extends FormRequest
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
            'nama' => ['required', 'string', 'max:255'],
            'spesialis' => ['required', 'string', 'max:255'],
            'deskripsi' => ['required', 'string'],
            'dokter_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama dokter harus diisi',
            'spesialis.required' => 'Spesialis dokter harus diisi',
            'deskripsi.required' => 'Deskripsi dokter harus diisi',
            'dokter_image.required' => 'Foto dokter harus diisi',
            'dokter_image.image' => 'Foto dokter harus berupa gambar',
            'dokter_image.mimes' => 'Foto dokter harus berformat jpeg, png, jpg, gif, atau svg',
            'dokter_image.max' => 'Foto dokter tidak boleh lebih dari 2MB',
        ];
    }
}
