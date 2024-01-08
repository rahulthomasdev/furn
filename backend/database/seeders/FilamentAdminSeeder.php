<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FilamentAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filamentMakeUserCommand = new FilamentMakeUserCommand();
        $reflector = new \ReflectionObject($filamentMakeUserCommand);

        $getUserModel = $reflector->getMethod('getUserModel');
        $getUserModel->setAccessible(true);
        $getUserModel->invoke($filamentMakeUserCommand)::create([
            'name' => 'admin',
            'email' => 'admin@furn.com',
            'password' => Hash::make('password'),
        ]);
    }
}
