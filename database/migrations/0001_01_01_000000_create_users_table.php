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
        $faker = Faker\Factory::create('id_ID');
        // create table roles
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });


        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->nullable()->index();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('avatar', 2048)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        // create table for customers
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->index();
            $table->string('no_hp')->nullable()->unique();
            $table->string('no_ktp')->nullable()->unique();
            $table->string('alamat')->nullable();
            $table->timestamps();
        });

        // create relationship between users and customers
        Schema::table('customers', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });

        // create relationship between users and roles
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('roles')->nullOnDelete();
        });


        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        // insert default roles
        DB::table('roles')->insert([
            ['name' => 'admin'],
            ['name' => 'customer'],
        ]);

        // insert default admin user
        DB::table('users')->insert([
            [
                'role_id' => 1,
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'avatar' => '/assets/img/avatar/'.$faker->image('public/assets/img/avatar/', 440, 280, null, false),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_id' => 2,
                'name' => 'User',
                'email' => 'user@gmail.com',
                'avatar' => '/assets/img/avatar/'.$faker->image('public/assets/img/avatar/', 440, 280, null, false),
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // insert default customer
        DB::table('customers')->insert([
            [
                'user_id' => 2,
                'no_hp' => '081234567890',
                'no_ktp' => '1234567890',
                'alamat' => 'Jl. Jalan No. 1',
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
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
