<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDokterRequest;
use App\Http\Requests\UpdateDokterRequest;
use App\Models\Dokter;
use App\Models\Treatment;
use Illuminate\Http\Request;

class DokterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $search = request()->query('search');

        if ($search) {
            // cari dokter berdasarkan nama atau spesialis
            $dokter = Dokter::where('nama', 'LIKE', "%{$search}%")
                ->orWhere('spesialis', 'LIKE', "%{$search}%")
                ->get();


        } else {
            $dokter = Dokter::all();
        }
        return inertia('Admin/Dokter/Index', [
            'title' => 'Kelola Dokter',
            'dokter' => $dokter
        ]);
    }

    public function jadwal(Dokter $dokter)
    {
       $jadwal = $dokter->load('jadwal.treatment');

       $treatment = Treatment::all();
        return inertia('Admin/Dokter/Jadwal', [
            'title' => 'Kelola Jadwal Dokter',
            'jadwal' => $jadwal,
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
    public function store(StoreDokterRequest $request)
    {
        $dokter_image = $request->file('dokter_image');
        $dokter_image->move(public_path('/assets/img/dokter/'), $dokter_image->getClientOriginalName());
        Dokter::create([
            'nama' => $request->nama,
            'spesialis' => $request->spesialis,
            'deskripsi' => $request->deskripsi,
            'dokter_image' =>"/assets/img/dokter/". $dokter_image->getClientOriginalName()
        ]) ? back()->with('message', 'Dokter berhasil ditambahkan') : back()->with('error', 'Dokter gagal ditambahkan');

    }

    /**
     * Display the specified resource.
     */
    public function show(Dokter $dokter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dokter $dokter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDokterRequest $request, Dokter $dokter)
    {
        if ($request->hasFile('dokter_image')) {
            $request->validate([
                'dokter_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ], [
                'dokter_image.required' => 'Gambar treatment harus diisi',
                'dokter_image.image' => 'File yang diupload harus berupa gambar',
                'dokter_image.mimes' => 'File yang diupload harus berupa gambar dengan format jpeg, png, jpg, gif, atau svg',
                'dokter_image.max' => 'Ukuran file yang diupload tidak boleh melebihi 2MB',
            ]);
            if (file_exists(public_path($dokter->dokter_image))) {
                unlink(public_path($dokter->dokter_image));
            }
            $request->file('dokter_image')->move(public_path('/assets/img/dokter/'), $request->file('dokter_image')->getClientOriginalName());
            $fileName = "/assets/img/dokter/" . $request->file('dokter_image')->getClientOriginalName();


            $dokter->update([
                'nama' => $request->nama,
                'spesialis' => $request->spesialis,
                'deskripsi' => $request->deskripsi,
                'dokter_image' => $fileName
            ]) ? back()->with('message', 'Dokter berhasil diupdate') : back()->with('error', 'Dokter gagal diupdate');
        } else {
            $dokter->update([
                'nama' => $request->nama,
                'spesialis' => $request->spesialis,
                'deskripsi' => $request->deskripsi,
            ]) ? back()->with('message', 'Dokter berhasil diupdate') : back()->with('error', 'Dokter gagal diupdate');
        }



    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dokter $dokter)
    {
        // hapus gambar dokter
        if (file_exists(public_path($dokter->dokter_image))) {
            unlink(public_path($dokter->dokter_image));
        }

        $dokter->delete() ? back()->with('message', 'Dokter berhasil dihapus') : back()->with('error', 'Dokter gagal dihapus');

    }
}
