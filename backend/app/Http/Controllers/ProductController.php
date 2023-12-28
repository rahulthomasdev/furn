<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function search(Request $req)
    {
        $query = $req->input('query');
        $products = Product::where('name', 'like', "%$query%")->get();
        return response()->json(['query' => $query, 'products' => $products]);
    }
    public function index()
    {
        $products = Product::all();

        $products = $products->map(function ($product) {
            $product['image_path'] = collect($product['image_path'])->map(function ($path) {
                return env('APP_URL') . '/storage/' . $path;
            })->all();
            return $product;
        });

        return response()->json($products);
    }

    public function getProducts(Request $req)
    {
        $pageno = $req->input('pageno', 1);
        $prod_per_page = 8;

        $products = Product::paginate($prod_per_page, ['*'], 'page', $pageno);

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
    }
    public function getProductDetails(Request $req)
    {
        $prod_key = $req->input('pkey');
        $product = Product::where('prod_key', $prod_key)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found!'], 404);
        }

        $product['image_path'] = collect($product['image_path'])->map(function ($path) {
            return env('APP_URL') . '/storage/' . $path;
        });

        $relatedProducts = Product::where(function ($query) use ($product) {
            $query->where('category', 'like', '%' . $product->category . '%')
                ->orWhere('description', 'like', '%' . $product->description . '%');
        })
            ->where('prod_key', '!=', $prod_key)
            ->limit(4)
            ->get();

        $relatedProducts->transform(function ($relatedProduct) {
            $relatedProduct['image_path'] = collect($relatedProduct['image_path'])->map(function ($path) {
                return env('APP_URL') . '/storage/' . $path;
            });
            return $relatedProduct;
        });

        return response()->json(['product' => $product, 'related_products' => $relatedProducts]);
    }
}
