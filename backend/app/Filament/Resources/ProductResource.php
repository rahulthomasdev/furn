<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required()->maxLength(255),
                Textarea::make('description'),
                TextInput::make('price')->required()->maxLength(10),
                TextInput::make('discount')->label('Discount %')->required()->maxLength(3),
                TextInput::make('quantity')->required()->maxLength(10),
                TextArea::make('specification'),
                TextArea::make('info'),
                TextArea::make('reviews')->nullable(),
                Select::make('category')->options([
                    'tables' => 'Tables',
                    'chairs' => 'Chairs',
                    'sofas' => 'Sofas',
                    'desks' => 'Desks',
                    'bookshelves' => 'Bookshelves',
                    'lamps' => 'Lamps'
                ]),
                TextInput::make('tag')->nullable(),
                FileUpload::make('image_path')->multiple()->preserveFilenames(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable(),
                TextColumn::make('description'),
                TextColumn::make('price'),
                TextColumn::make('quantity'),
                TextColumn::make('specification'),
                TextColumn::make('info'),
                ImageColumn::make('image_path'),
                TextColumn::make('category'),
                TextColumn::make('tag'),

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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
