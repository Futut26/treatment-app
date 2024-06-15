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
        $faker = Faker\Factory::create('id_ID');

        // create table jadwal
        Schema::create('jadwals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dokter_id');
            $table->foreignId('treatment_id');
            $table->string('hari');
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->timestamps();
        });

        Schema::table('jadwals', function (Blueprint $table) {
            $table->foreign('dokter_id')->references('id')->on('dokters')->onDelete('cascade');
            $table->foreign('treatment_id')->references('id')->on('treatments')->onDelete('cascade');
        });


        // insert dummy data
        DB::table('jadwals')->insert([

            [
                'dokter_id' => 1,
                'treatment_id' => 1,
                'hari' => 'Senin',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'dokter_id' => 1,
                'treatment_id' => 2,
                'hari' => 'Selasa',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'dokter_id' => 1,
                'treatment_id' => 3,
                'hari' => 'Rabu',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'dokter_id' => 1,
                'treatment_id' => 4,
                'hari' => 'Kamis',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'dokter_id' => 1,
                'treatment_id' => 4,
                'hari' => 'Jumat',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'dokter_id' => 1,
                'treatment_id' => 4,
                'hari' => 'Sabtu',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'dokter_id' => 1,
                'treatment_id' => 4,
                'hari' => 'Minggu',
                'jam_mulai' => '08:00:00',
                'jam_selesai' => '12:00:00',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwals');
    }
};
