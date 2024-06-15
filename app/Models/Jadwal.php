<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'dokter_id', 'id');
    }


    public function treatment()
    {
        return $this->belongsTo(Treatment::class, 'treatment_id', 'id');
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
