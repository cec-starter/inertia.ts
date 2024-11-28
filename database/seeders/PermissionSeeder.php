<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected function generatePermissions(): array
    {
        $models = [];
        $path = app_path('Models');
        $permissions = ['create', 'read', 'update', 'delete'];

        foreach (glob($path . '/*.php') as $file) {
            $modelName = strtolower(basename($file, '.php'));
            $moduleName = basename($file, '.php') . ' Module';
            foreach ($permissions as $permission) {
                $models[] = [
                    'name' => "{$permission} {$modelName}",
                    'guard_name' => 'web',
                    'module_name' => $moduleName,
                ];
            }
        }

        return $models;
    }

    public function run(): void
    {
        collect($this->generatePermissions())
            ->each(fn($permission) => Permission::create($permission));

        $rolesPermission = collect([
            'super admin' => Permission::pluck('name')->toArray(),
            'admin' => [
                'create user',
                'read user',
                'update user',
                'delete user',
            ],
            'user' => [
                'read user',
            ],
        ]);

        $rolesPermission->each(function ($permissions, $role) {
            $roleInstance = Role::create(['name' => $role]);
            $roleInstance->givePermissionTo($permissions);
        });

    }
}
