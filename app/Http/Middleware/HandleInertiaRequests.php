<?php

namespace App\Http\Middleware;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        return [
             ...parent::share($request),
            'auth' => [
                'user' => optional($request->user())->only([
                    'id', 'name', 'email', 'created_at', 'gravatar', 'email_verified_at',
                ]),
                'role' => $request->user() ? $request->user()->getRoleNames()->toArray() : [],
                'permissions' => $request->user() ? $this->getPermissionsByRoles($request->user()) : [],
            ],
            // 'ziggy' => fn () => [
            //     ...(new Ziggy)->toArray(),
            'location' => $request->url(),
            // ],
            'flashMessage' => fn() => [
                'title' => $request->session()->get('title'),
                'description' => $request->session()->get('description'),
            ],

        ];
    }

    protected function getPermissionsByRoles($user): array
    {
        $roles = $user->getRoleNames();

        $permissions = [];

        foreach ($roles as $role) {
            $permissions = array_merge($permissions, Permission::whereHas('roles', function ($query) use ($role) {
                $query->where('roles.name', $role);
            })->pluck('name')->toArray());
        }

        return $permissions;

    }
}
