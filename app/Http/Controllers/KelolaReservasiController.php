<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Treatment;
use Illuminate\Http\Request;

class KelolaReservasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get all orders
        $orders = Order::all();
        $orders->load('treatment', 'jadwal.dokter', 'user.customer');

        return inertia('Admin/CustomerReservasi/Index', [
            'title' => 'Kelola Reservasi',
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
    public function store(Request $request)
    {
        //

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
        $currentDateTime = now();
        $treatmentDateTime = \Carbon\Carbon::parse($order->tanggal_treatment . ' ' . $order->jam_treatment);
        $notificationTime = $treatmentDateTime->copy()->subDay()->subHours(3);

        if ($currentDateTime->between($notificationTime, $treatmentDateTime)) {
            $order->notif = true;
        } else {
            $order->notif = false;
        }

        $order->load('treatment', 'jadwal.dokter','user.customer');
        $treatmnet = Treatment::find($order->treatment_id);
        $treatmnet->load('jadwal.dokter');

        return inertia('Admin/CustomerReservasi/Show', [
            'title' => 'Detail Reservasi ' . $order->user->name,
            'order' =>  $order,
            'treatment' => $treatmnet
        ]);
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
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
