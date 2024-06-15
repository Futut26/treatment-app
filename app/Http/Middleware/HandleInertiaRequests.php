<?php

namespace App\Http\Middleware;

use App\Models\Order;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Mendapatkan semua pesanan dari pengguna yang terautentikasi

        if ($request->user()) {
            $orders = Order::where('user_id', $request->user()->id)->get();
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

        } else {
            $orders = null;
        }


        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? $request->user()->load(['role', 'customer']) : null,
            ],

            'order' => $orders ? $orders : null,

            'service' => [
                'treatment' => fn () => Treatment::with('jadwal.dokter')->get() ? Treatment::with('jadwal.dokter')->get() : null,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
