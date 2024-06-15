<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Customer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
    //    cek jika belum login arahkan ke halaman login
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // cek jika role bukan customer arahkan forbidden
        if (auth()->user()->role->name != 'customer') {
            abort(403);
        }


        return $next($request);
    }
}
