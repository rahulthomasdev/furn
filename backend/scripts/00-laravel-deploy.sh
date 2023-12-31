#!/usr/bin/env bash
echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html/public

# echo "generating application key..."
# php artisan key:generate --show
echo Skipping application key generation...

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo Creating filament admin..

php artisan db:seed --class=FilamentAdminSeeder


