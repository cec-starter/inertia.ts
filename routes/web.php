<?php

use App\Http\Controllers\Back\PermissionController;
use App\Http\Controllers\Back\RolesController;
use App\Http\Controllers\Back\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('auth', 'verified')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::controller(UserController::class)->group(function () {
        Route::prefix('users')->group(function () {
            Route::get('/', 'index')->name('users.index');
            Route::get('/get-data', 'getData')->name('users.get-data');
            Route::get('/create', 'create')->name('users.create');
            Route::post('/', 'store')->name('users.store');
            Route::get('/{user}/edit', 'edit')->name('users.edit');
            Route::put('/{user}', 'update')->name('users.update');
            Route::delete('/bulk-destroy', 'bulkDestroy')->name('users.bulk-destroy');
            Route::delete('/{user}', 'destroy')->name('users.destroy');

        });
    });

    Route::controller(PermissionController::class)->group(function () {
        Route::prefix('permissions')->group(function () {
            Route::get('/', 'index')->name('permissions.index');
            Route::get('/get-data', 'getData')->name('permissions.get-data');
            Route::post('/', 'store')->name('permissions.store');
            Route::put('/{permission}', 'update')->name('permissions.update');
            Route::delete('/bulk-destroy', 'bulkDestroy')->name('permissions.bulk-destroy');
            Route::delete('/{permission}', 'destroy')->name('permissions.destroy');
        });
    });

    Route::controller(RolesController::class)->group(function () {
        Route::prefix('roles')->group(function () {
            Route::get('/', 'index')->name('roles.index');
            Route::get('/get-data', 'getData')->name('roles.get-data');
            Route::post('/', 'store')->name('roles.store');
            Route::put('/{role}', 'update')->name('roles.update');
            Route::delete('/bulk-destroy', 'bulkDestroy')->name('roles.bulk-destroy');
            Route::delete('/{role}', 'destroy')->name('roles.destroy');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
