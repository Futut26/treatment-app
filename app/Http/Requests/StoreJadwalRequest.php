<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJadwalRequest extends FormRequest
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
            //
            "dokter_id" => "required",
            "treatment_id" => "required",
            "hari" => "required",
            "jam_mulai" => "required",
            "jam_selesai" => "required",
        ];
    }

    public function messages(): array
    {
        return [
            "dokter_id.required" => "Dokter harus diisi",
            "treatment_id.required" => "Treatment harus diisi",
            "hari.required" => "Hari harus diisi",
            "jam_mulai.required" => "Jam mulai harus diisi",
            "jam_selesai.required" => "Jam selesai harus diisi",
        ];
    }


}
