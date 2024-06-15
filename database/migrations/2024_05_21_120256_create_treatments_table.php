<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->text('deskripsi');
            $table->string('harga');
            $table->text('treatment_image');
            $table->timestamps();
        });

        // insert dummy data
        $faker = Faker\Factory::create('id_ID');
        DB::table('treatments')->insert([
            [
                'nama' => 'Facial',
                'deskripsi' => $faker->text(100),
                'harga' => $faker->randomNumber(6),
                'treatment_image' => '/assets/img/treatment/' . $faker->image('public/assets/img/treatment/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nama' => 'Haircut',
                'deskripsi' => $faker->text(100),
                'harga' => $faker->randomNumber(6),
                'treatment_image' => '/assets/img/treatment/' . $faker->image('public/assets/img/treatment/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nama' => 'Manicure',
                'deskripsi' => $faker->text(100),
                'harga' => $faker->randomNumber(6),
                'treatment_image' => '/assets/img/treatment/' . $faker->image('public/assets/img/treatment/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nama' => 'Pedicure',
                'deskripsi' => $faker->text(100),
                'harga' => $faker->randomNumber(6),
                'treatment_image' => '/assets/img/treatment/' . $faker->image('public/assets/img/treatment/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ]

        ]);

        // create table dokter
        





    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
