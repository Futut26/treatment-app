<?php
use App\Http\Controllers\OrderController;

Route::middleware('customer')->group(function () {
    Route::get('/customer/order', [OrderController::class, 'index'])->name('customer.order.index');
    Route::get('/customer/order/{order}', [OrderController::class, 'show'])->name('customer.order.show');
    Route::post('/customer/order', [OrderController::class, 'store'])->name('customer.order.store');
    Route::delete('/customer/order/{order}', [OrderController::class, 'destroy'])->name('customer.order.destroy');
    Route::post('/customer/order/reschedule/{order}', [OrderController::class, 'reschedule'])->name('customer.order.reschedule');
    Route::get('/customer/order/{order}/confirm', [OrderController::class, 'confirm'])->name('customer.order.confirm');
});

