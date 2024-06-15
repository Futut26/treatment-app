<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Mendapatkan semua pesanan dari pengguna yang terautentikasi
        $orders = Order::where('user_id', auth()->user()->id)->get();
        $orders->load('treatment', 'jadwal.dokter');

        // Mendapatkan tanggal dan waktu saat ini
        $currentDateTime = now();

        // Iterasi setiap pesanan untuk memeriksa kondisi notifikasi
        foreach ($orders as $order) {
            // Menggabungkan tanggal_treatment dan jam_treatment menjadi objek DateTime tunggal
            $treatmentDateTime = \Carbon\Carbon::parse($order->tanggal_treatment . ' ' . $order->jam_treatment);

            // Menghitung waktu notifikasi target (H-1 3 jam)
            $notificationTime = $treatmentDateTime->copy()->subDay()->subHours(3);

            // Memeriksa apakah waktu saat ini berada dalam jendela notifikasi
            if ($currentDateTime->between($notificationTime, $treatmentDateTime)) {
                $order->notif = true;
            } else {
                $order->notif = false;
            }
        }

        return inertia('Orders/Index', [
            'title' => 'Reservasi Saya',
            'orders' => $orders,
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
    public function store(StoreOrderRequest $request)
    {
        // Save data
        $order = new Order();
        $order->user_id = auth()->user()->id;
        $order->treatment_id = $request->treatment_id;
        $order->jadwal_id = $request->jadwal_id;
        $order->jam_treatment = $request->jam_treatment;
        $order->tanggal_treatment = $request->tanggal_treatment;
        $order->status = $request->status;
        $order->save();

        if ($order) {
            $order->update([
                'no_antrian' => $order->id . $order->treatment_id . $order->jadwal_id
            ]);
            return redirect()->route('customer.order.index')->with('message', 'Order created successfully');
        } else {
            return redirect()->back()->with('error', 'Order failed to create');
        }



    }
    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {

        $currentDateTime = now();
        $treatmentDateTime = \Carbon\Carbon::parse($order->tanggal_treatment . ' ' . $order->jam_treatment);
        $notificationTime = $treatmentDateTime->copy()->subDay()->subHours(3);

        if ($currentDateTime->between($notificationTime, $treatmentDateTime)) {
            $order->notif = true;
        } else {
            $order->notif = false;
        }

        $treatmnet = Treatment::find($order->treatment_id);
        $treatmnet->load('jadwal.dokter');

        return inertia('Orders/Show', [
            'title' => 'Detail Reservasi Saya',
            'order' => $order->load('treatment', 'jadwal.dokter'),
            'treatment' => $treatmnet
        ]);



    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    public function reschedule(Order $order, Request $request)
    {
        $order->update([
            'jadwal_id' => $request->jadwal_id,
            'jam_treatment' => $request->jam_treatment,
            'tanggal_treatment' => $request->tanggal_treatment,
            'status' => 'reschedule'
        ]);

        return redirect()->back()->with('message', 'Reschedule order successfully');
    }

    public function confirm(Order $order){
        $order->update([
            'status' => 'terkonfirmasi'
        ]);

        return redirect()->route('customer.order.index')->with('message', 'Order confirmed successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete() ? back()->with('message', 'Berhasil membatalkan reservasi') : back()->with('error', 'gagal membatalkan reservasi');
    }
}
