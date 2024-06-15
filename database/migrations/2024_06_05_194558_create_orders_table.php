<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->index();
            $table->foreignId('treatment_id');
            $table->foreignId('jadwal_id');
            $table->time('jam_treatment');
            $table->date('tanggal_treatment');
            $table->string('status');
            $table->string('no_antrian')->unique()->nullable();
            $table->timestamps();
        });

        // create relationship
        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('treatment_id')->references('id')->on('treatments')->cascadeOnDelete();
            $table->foreign('jadwal_id')->references('id')->on('jadwals')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
