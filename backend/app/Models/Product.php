<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'quantity', 'image_path', 'specification', 'info', 'reviews', 'category', 'tag', 'discount'];

    protected $casts = [
        'image_path' => 'array',
        'reviews' => 'array'
    ];

    protected static function boot()
    {
        parent::boot();
        static::created(function ($product) {
            $product->prod_key = bin2hex('p_' . str_pad((string) $product->id, 8, '0'));
            $product->save();
        });
        // static::updated(function ($product) {
        //     $product->prod_key = bin2hex('p_' . str_pad((string) $product->id, 8, '0'));
        //     $product->save();
        // });
    }
}
