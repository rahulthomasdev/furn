<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('order_no')->unique();
            $table->decimal('net_amount', 8, 2);
            $table->decimal('discount', 8, 2)->nullable();
            $table->decimal('total_price', 8, 2);
            $table->json('address');
            $table->string('status')->nullable();
            $table->date('shipped_date')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('payment_mode')->nullable();
            $table->string('payment_id')->nullable();
            $table->json('order_items_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
