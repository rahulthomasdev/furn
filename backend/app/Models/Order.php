<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'order_no', 'shipped_date', 'total_price', 'net_amount', 'discount', 'status', 'payment_status', 'payment_mode', 'payment_id'];

    protected $casts = [
        'address' => 'array',
        'order_items_details' => 'array',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // public function product()
    // {
    //     return $this->belongsTo(Product::class, 'product_key', 'prod_key');
    // }

    // public function cart()
    // {
    //     return $this->belongsToMany(Cart::class);
    // }
    // public function address()
    // {
    //     return $this->hasOne(Address::class);
    // }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($order) {
            $order->order_no = 'FRN' . str_pad(static::max('id') + 1, 8, 0, STR_PAD_LEFT);
        });
    }
}
