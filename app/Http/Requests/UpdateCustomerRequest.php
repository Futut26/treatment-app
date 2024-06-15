<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
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
            'no_hp' => 'required|string|max:15|unique:customers,no_hp,',
            'no_ktp' => 'required|string|max:16|unique:customers,no_ktp,',
            'alamat' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'no_hp.required' => 'Nomor HP tidak boleh kosong.',
            'no_hp.string' => 'Nomor HP harus berupa string.',
            'no_hp.max' => 'Nomor HP tidak boleh lebih dari :max karakter.',
            'no_hp.unique' => 'Nomor HP sudah terdaftar.',
            'no_ktp.required' => 'Nomor KTP tidak boleh kosong.',
            'no_ktp.string' => 'Nomor KTP harus berupa string.',
            'no_ktp.max' => 'Nomor KTP tidak boleh lebih dari :max karakter.',
            'no_ktp.unique' => 'Nomor KTP sudah terdaftar.',
            'alamat.required' => 'Alamat tidak boleh kosong.',
            'alamat.string' => 'Alamat harus berupa string.',
            'alamat.max' => 'Alamat tidak boleh lebih dari :max karakter.',
        ];
    }
}
