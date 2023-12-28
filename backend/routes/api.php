<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WishlistController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/productsAll', [ProductController::class, 'index']);
Route::get('/products', [ProductController::class, 'getProducts']);
Route::get('/product', [ProductController::class, 'getProductDetails']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/feedback', [FeedbackController::class, 'index']);
Route::post('/feedback', [FeedbackController::class, 'createFeedback']);
Route::post('/search', [ProductController::class, 'search']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/order', [OrderController::class, 'index']);
    Route::post('/order', [OrderController::class, 'create']);
    Route::get('/address', [AddressController::class, 'index']);
    Route::post('/address', [AddressController::class, 'createAddress']);
    Route::post('/addressDelete', [AddressController::class, 'deleteAddress']);
    Route::post('/updateAddress', [AddressController::class, 'updateAddress']);
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::get('/wishlistDetails', [WishlistController::class, 'wishlistDetails']);
    Route::post('/wishlist', [WishlistController::class, 'updateWishlist']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/cart', [CartController::class, 'add']);
    Route::get('/validateToken', [CartController::class, 'validateToken']);
    Route::post('/updateProfile', [AuthController::class, 'updateProfile']);
});
