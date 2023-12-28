<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected   $fillable =   ['user_id', 'primary', 'address_name', 'address_line', 'street', 'city', 'state', 'postal_code', 'country', 'landmark'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
