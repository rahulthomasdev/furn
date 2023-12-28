<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrdersResource\Pages;
use App\Filament\Resources\OrdersResource\RelationManagers;
use App\Models\Order;
use App\Models\Orders;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrdersResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('user_id'),
                TextInput::make('order_no'),
                TextInput::make('shipped_date'),
                TextInput::make('total_price'),
                TextInput::make('address.pincode'),
                TextInput::make('net_amount'),
                TextInput::make('discount'),
                TextInput::make('status'),
                TextInput::make('payment_status'),
                TextInput::make('payment_mode'),
                TextInput::make('payment_id'),
                Section::make('Address')->statePath('address')->schema([
                    TextInput::make('address_name'),
                    TextInput::make('address_line'),
                    TextInput::make('street'),
                    TextInput::make('city'),
                    TextInput::make('state'),
                    TextInput::make('postal_code'),
                    TextInput::make('country'),
                    TextInput::make('landmark'),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user_id'),
                TextColumn::make('order_no'),
                TextColumn::make('shipped_date'),
                TextColumn::make('total_price'),
                TextColumn::make('address.pincode'),
                TextColumn::make('net_amount'),
                TextColumn::make('discount'),
                TextColumn::make('status'),
                TextColumn::make('payment_status'),
                TextColumn::make('payment_mode'),
                TextColumn::make('payment_id'),
                TextColumn::make('address'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateActions([
                Tables\Actions\CreateAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrders::route('/create'),
            'edit' => Pages\EditOrders::route('/{record}/edit'),
        ];
    }
}
