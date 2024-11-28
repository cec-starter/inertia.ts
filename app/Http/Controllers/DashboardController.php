<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Permission;

class DashboardController extends Controller
{
    public function index()
    {
        $userCount = User::count();
        $roleCount = Role::count();
        $permissionCount = Permission::count();

        $data = [
            'pageModule' => [
                'title' => 'Dashboard',
            ],
            'breadcrumbs' => [
                'home' => ['title' => 'Home'],
            ],
            'userCount' => $userCount,
            'roleCount' => $roleCount,
            'permissionCount' => $permissionCount
        ];

        return inertia('dashboard', $data);
    }
}
