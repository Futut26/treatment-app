<?php
use App\Http\Controllers\DokterController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\KelolaReservasiController;
use App\Http\Controllers\KelolaTreatmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/admin/treatment', [KelolaTreatmentController::class, 'index'])->name('admin.treatment.index');
    Route::post('/admin/treatment', [KelolaTreatmentController::class, 'store'])->name('admin.treatment.store');
    Route::post('/admin/treatment/{treatment}', [KelolaTreatmentController::class, 'update'])->name('admin.treatment.update');
    Route::delete('/admin/treatment/{treatment}', [KelolaTreatmentController::class, 'destroy'])->name('admin.treatment.destroy');


    Route::get('/admin/dokter/', [DokterController::class, 'index'])->name('admin.dokter.index');
    Route::post('/admin/dokter/', [DokterController::class, 'store'])->name('admin.dokter.store');
    Route::post('/admin/dokter/{dokter}', [DokterController::class, 'update'])->name('admin.dokter.update');
    Route::delete('/admin/dokter/{dokter}', [DokterController::class, 'destroy'])->name('admin.dokter.destroy');
    Route::get('/admin/dokter/jadwal/{dokter}', [DokterController::class, 'jadwal'])->name('admin.dokter.jadwal');


    Route::post('/admin/jadwal/', [JadwalController::class, 'store'])->name('admin.jadwal.store');
    Route::post('/admin/jadwal/{jadwal}', [JadwalController::class, 'update'])->name('admin.jadwal.update');
    Route::delete('/admin/jadwal/{jadwal}', [JadwalController::class, 'destroy'])->name('admin.jadwal.destroy');


    Route::get('admin/customer/order', [KelolaReservasiController::class, 'index'])->name('admin.customer.order.index');
    Route::get('admin/customer/order/{order}', [KelolaReservasiController::class, 'show'])->name('admin.customer.order.show');
    // reschedule
    Route::post('admin/customer/order/reschedule/{order}', [KelolaReservasiController::class, 'reschedule'])->name('admin.reschedule.order');
});
