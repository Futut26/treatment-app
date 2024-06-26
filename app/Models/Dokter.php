<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // dokter punya banyak treatment


    public function jadwal()
    {
        return $this->hasMany(Jadwal::class, 'dokter_id', 'id' );
    }
}
