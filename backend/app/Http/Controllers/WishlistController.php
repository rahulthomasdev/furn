<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Whishlist;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlist = auth()->user()->wishlist;

        if (!empty($wishlist->product_keys)) {
            return response()->json(['product_keys' => $wishlist->product_keys]);
        } else {
            return response()->json(['message' => 'Wishlist is empty']);
        }
    }

    public function updateWishlist(Request $req)
    {
        $req->validate([
            'product_key' => 'required|string',
        ]);

        $productKey = $req->input('product_key');
        $user = auth()->user();
        $wishlist = $user->wishlist;

        if (!$wishlist) {
            $wishlist = Whishlist::create(['user_id' => $user->id, 'product_keys' => [$productKey]]);
        } else if (in_array($productKey, $wishlist->product_keys)) {
            $wishlist->update(['product_keys' => array_values(array_diff($wishlist->product_keys, [$productKey]))]);
        } else {
            $wishlist->update(['product_keys' => array_merge($wishlist->product_keys, [$productKey])]);
        }

        return response()->json(['message' => 'Product updated', 'product_keys' => $wishlist->product_keys]);
    }

    public function wishlistDetails(Request $request)
    {
        $wishlist = auth()->user()->wishlist;
        $pageno = $request->input('pageno', 1);
        $prod_per_page = 8;

        if (!empty($wishlist->product_keys)) {
            $products = Product::whereIn('prod_key', $wishlist->product_keys)->paginate($prod_per_page, ['*'], 'page', $pageno);

            $result = [
                'current_page' => $products->currentPage(),
                'total_page' => $products->lastPage(),
                'products_per_page' => $prod_per_page,
                'products' => $products->getCollection()->map(function ($product) {
                    $product['image_path'] = collect($product['image_path'])->map(function ($path) {
                        return env('APP_URL') . '/storage/' . $path;
                    })->all();
                    return $product;
                }),
                'next_page_url' => $products->nextPageUrl(),
                'prev_page_url' => $products->previousPageUrl(),
            ];


            return response()->json($result);
        } else {
            return response()->json(['message' => 'Wishlist is empty']);
        }
    }
}
