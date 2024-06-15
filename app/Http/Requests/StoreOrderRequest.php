<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'jadwal_id' => 'required',
            'jam_treatment' => 'required',
            'tanggal_treatment' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'jadwal_id.required' => 'pilih dokter terlebih dahulu',
            'jam_treatment.required' => 'Jam treatment harus diisi',
            'tanggal_treatment.required' => 'Tanggal treatment harus diisi',
        ];
    }
}
