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
        Schema::create('dokters', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('spesialis');
            $table->text('deskripsi');
            $table->string('dokter_image');
            $table->timestamps();
        });

        // insert dummy data
        DB::table('dokters')->insert([
            [
                'nama' => 'Dr. John Doe',
                'spesialis' => 'Dokter Umum',
                'deskripsi' => $faker->text(100),
                'dokter_image' => '/assets/img/dokter/' . $faker->image('public/assets/img/dokter/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nama' => 'Dr. Jane Doe',
                'spesialis' => 'Dokter Gigi',
                'deskripsi' => $faker->text(100),
                'dokter_image' => '/assets/img/dokter/' . $faker->image('public/assets/img/dokter/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nama' => 'Dr. Richard Roe',
                'spesialis' => 'Dokter Kandungan',
                'deskripsi' => $faker->text(100),
                'dokter_image' => '/assets/img/dokter/' . $faker->image('public/assets/img/dokter/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nama' => 'Dr. Jane Roe',
                'spesialis' => 'Dokter Anak',
                'deskripsi' => $faker->text(100),
                'dokter_image' => '/assets/img/dokter/' . $faker->image('public/assets/img/dokter/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ]

        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokter');
    }
};
