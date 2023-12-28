<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->orders;
        foreach ($orders as $order) {
            $productKeys = array_column($order['order_items_details'], 'product_key');
            $products = Product::whereIn('prod_key', $productKeys)->get();
            $order['order_items_details'] = collect($order['order_items_details'])->map(function ($item) use ($products) {
                $product = $products->where('prod_key', $item['product_key'])->first();
                $product['image_path'] = collect($product['image_path'])->map(function ($path) {
                    return env('APP_URL') . '/storage/' . $path;
                })->all();
                if ($product) {
                    return [
                        'product_key' => $item['product_key'],
                        'product' => $product,
                        'quantity' => $item['qty'],
                    ];
                }

                return null;
            })->filter(); // Filter out null values

            // Now $order['products'] contains an array of products with their quantities
        }
        if ($orders) {
            return response()->json(['orders' => $orders,]);
        } else {
            return response()->json(['message' => 'No orders'], 404);
        }
    }

    public function create(Request $request)
    {
        $cartItems = auth()->user()->cart()->with('product')->select('product_key', 'qty', 'tot_price')->get();
        $tt = 0;
        $discount = 0;
        $order_items_details = [];
        foreach ($cartItems as $item) {
            $product = Product::where('prod_key', $item['product_key'])->first();
            if ($item['qty'] > $product['quantity']) {
                return response()->json(['message' => 'One or more items in cart are out of stock'], 422);
            }
        }

        $cartItems->map(function ($item) use (&$tt, &$discount, &$order_items_details) {
            $item['product']['image_path'] = collect($item['product']['image_path'])->map(function ($path) {
                return env('APP_URL') . '/storage/' . $path;
            })->all();
            $tt += $item['tot_price'];
            $discount += ($item['product']['price'] / 100) * $item['product']['discount'] * $item['qty'] ?? 0;
            $order_items_details[] = ['product_key' => $item['product_key'], 'qty' => $item['qty']];
        });

        $user = auth()->user();
        $address = $user->address()->where('primary', 10)->first();




        if (!$cartItems->isEmpty()) {
            $order = Order::create([
                'user_id' => auth()->user()->id,
                'net_amount' => round($tt - $discount, 2),
                'address' => [
                    'address_name' => $address->address_name,
                    'address_line' => $address->address_line,
                    'street' => $address->street,
                    'city' => $address->city,
                    'state' => $address->state,
                    'postal_code' => $address->postal_code,
                    'country' => $address->country,
                    'landmark' => $address->landmark,
                ],
                'total_price' => $tt,
                'discount' => $discount,
                'order_items_details' => $order_items_details,
                'status' => 'Order Placed'
            ]);
            $user->cart()->delete();
            foreach ($cartItems as $item) {
                $product = Product::where('prod_key', $item['product_key'])->first();
                if ($product) {
                    $product->update([
                        'quantity' => $product->quantity - $item['qty'],
                    ]);
                }
            }
            return response()->json(['message' => 'Order created successfully', 'order' => $order, 'cart_items' => $cartItems, 'order_items_details' => $order_items_details]);
        } else {
            return response()->json(['message' => 'Orders empty', 'cart_items' => $cartItems]);
        }
    }
}
