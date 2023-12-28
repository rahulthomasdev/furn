<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Whishlist extends Model
{
    use HasFactory;


    protected $fillable = ['user_id', 'product_keys'];

    protected $casts = [
        'product_keys' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
