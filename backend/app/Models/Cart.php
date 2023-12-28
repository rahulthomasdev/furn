<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'product_key', 'qty', 'tot_price'];


    public function product()
    {
        return $this->belongsTo(Product::class, 'product_key', 'prod_key');
    }
}
