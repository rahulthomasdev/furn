<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

use function PHPSTORM_META\map;

class CartController extends Controller
{
    public function index()
    {

        $cartItems = auth()->user()->cart()->with('product')->select('product_key', 'qty', 'tot_price')->get();
        $tt = 0;
        $discount = 0;
        $cartItems->map(function ($item) use (&$tt, &$discount) {
            $item['product']['image_path'] = collect($item['product']['image_path'])->map(function ($path) {
                return env('APP_URL') . '/storage/' . $path;
            })->all();
            $tt += $item['tot_price'];
            $discount += ($item['product']['price'] / 100) * $item['product']['discount'] * $item['qty'] ?? 0;
        });




        if (!$cartItems->isEmpty()) {
            return response()->json(['cart' => $cartItems, 'total_price' => $tt, 'discount' => round($discount, 2), 'net_amount' => round($tt - $discount, 2)]);
        } else {
            return response()->json(['message' => 'Cart empty', 'cart' => $cartItems]);
        }
    }

    public function validateToken()
    {
        return response()->json(['message' => 'Token valid']);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_key' => 'required',
            'quantity' => 'required|integer|min:-10|max:10',
        ]);

        $user = auth()->user();
        $cart = $user->cart;

        if (!$cart->isEmpty() && $cart->where('product_key', $request->input('product_key'))->count() > 0) {
            $qty = $cart->where('product_key', $request->input('product_key'))->first()->qty + $request->input('quantity');
            if ($qty > 0) {
                $product = Product::where('prod_key', $request->input('product_key'))->first();
                $avlQty = $product['quantity'];
                if ($avlQty <  $qty) {
                    return response()->json(['message' => "Item Out Of Stock. Only $avlQty left"], 422);
                }
                $cart->where('product_key', $request->input('product_key'))->first()->update([
                    'qty' =>  $qty,
                    'tot_price' => $qty * Product::where('prod_key', $request->input('product_key'))->value('price')
                ]);
            } else if ($qty <= 0) {
                $cart->where('product_key', $request->input('product_key'))->first()->delete();
                $user->refresh();
                $cart = $user->cart;
                if ($cart->isEmpty()) {
                    return response()->json(['message' => 'Cart empty', 'cart' => $cart]);
                }
            }
        } else {
            if ($request->input('quantity') > 0) {
                $user->cart()->create([
                    'product_key' => $request->input('product_key'),
                    'qty' => $request->input('quantity'),
                    'tot_price' => $request->input('quantity') * Product::where('prod_key', $request->input('product_key'))->value('price')
                ]);
                $user->refresh();
                $cart = $user->cart;
            }
        }

        $cartItems = auth()->user()->cart()->with('product')->select('product_key', 'qty', 'tot_price')->get();

        return response()->json(['message' => 'Cart updated', 'cart' => $cartItems]);
    }
}
