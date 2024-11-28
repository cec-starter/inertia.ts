<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(PermissionSeeder::class);

        // User::factory()->create([
        //     'name' => 'yudha',
        //     'email' => 'yudha@app.com',
        //     'password' => bcrypt('rahasia!'),
        // ])->assignRole('super admin');

        // User::factory()->create([
        //     'name' => 'admin',
        //     'email' => 'admin@app.com',
        //     'password' => bcrypt('rahasia!'),
        // ])->assignRole('admin');

        User::factory(10000)->create()->each(fn(User $user) => $user->assignRole('user'));
    }
}
