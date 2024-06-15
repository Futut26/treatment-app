<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTreatmentReequest;
use App\Http\Requests\UpdateTreatmentRequest;
use App\Models\Treatment;
use Illuminate\Http\Request;

class KelolaTreatmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $treatment = Treatment::all();
        return inertia('Admin/Treatments/Index', [
            'title' => 'Kelola Layanan Treatment',
            'treatment' => $treatment
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTreatmentReequest $request)
    {
        $treatment = new Treatment();
        $treatment->nama = $request->nama;
        $treatment->harga = $request->harga;
        $treatment->deskripsi = $request->deskripsi;
        $request->file('treatment_image')->move(public_path('/assets/img/treatment/'), $request->file('treatment_image')->getClientOriginalName());
        $treatment->treatment_image = "/assets/img/treatment/" . $request->file('treatment_image')->getClientOriginalName();
        $treatment->save() ? back()->with('message', 'Treatment berhasil ditambahkan') : back()->with('error', 'Treatment gagal ditambahkan');

    }

    /**
     * Display the specified resource.
     */
    public function show(Treatment $treatment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Treatment $treatment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTreatmentRequest $request, Treatment $treatment)
    {

        if ($request->hasFile('treatment_image')) {
            $request->validate([
                'treatment_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ], [
                'treatment_image.required' => 'Gambar treatment harus diisi',
                'treatment_image.image' => 'File yang diupload harus berupa gambar',
                'treatment_image.mimes' => 'File yang diupload harus berupa gambar dengan format jpeg, png, jpg, gif, atau svg',
                'treatment_image.max' => 'Ukuran file yang diupload tidak boleh melebihi 2MB',
            ]);
            if (file_exists(public_path($treatment->treatment_image))) {
                unlink(public_path($treatment->treatment_image));
            }
            $request->file('treatment_image')->move(public_path('/assets/img/treatment/'), $request->file('treatment_image')->getClientOriginalName());
            $fileName = "/assets/img/treatment/" . $request->file('treatment_image')->getClientOriginalName();
        }

        $treatment->update([
            'nama' => $request->nama,
            'harga' => $request->harga,
            'deskripsi' => $request->deskripsi,
            'treatment_image' => $fileName ?? $treatment->treatment_image,
        ]) ? back()->with('message', 'Treatment berhasil diubah') : back()->with('error', 'Treatment gagal diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Treatment $treatment)
    {
        if (file_exists(public_path($treatment->treatment_image))) {
            unlink(public_path($treatment->treatment_image));
        }
        $treatment->delete() ? back()->with('message', 'Treatment berhasil dihapus') : back()->with('error', 'Treatment gagal dihapus');
    }
}
