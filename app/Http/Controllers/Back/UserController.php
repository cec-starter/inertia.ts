<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\User\StoreUserRequest;
use App\Http\Requests\Back\User\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('permission:read user', only: ['index', 'getData']),
            new Middleware('permission:create user', only: ['create', 'store']),
            new Middleware('permission:update user', only: ['edit', 'update']),
            new Middleware('permission:delete user', only: ['destroy', 'bulkDestroy']),
        ];
    }

    public function index()
    {

        $data = [
            'pageModule' => [
                'title' => 'Users',
            ],
            'breadcrumbs' => [
                'home' => ['title' => 'Home', 'url' => route('dashboard')],
                'users' => ['title' => 'Users'],
            ],
            'filterRoles' => $this->getListRoles(),
        ];

        return inertia('back/users/index', $data);
    }

    public function getData(Request $request)
    {
        try {
            $query = $this->buildUserQuery($request);
            $users = $this->paginateAndTransform($query, $request);

            return response()->json([
                'users' => $users,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching users data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function create()
    {
        $data = [
            'pageModule' => [
                'title' => 'Create User',
                'method' => 'post',
                'url' => route('users.store'),
            ],
            'breadcrumbs' => [
                'home' => ['title' => 'Home', 'url' => route('dashboard')],
                'users' => ['title' => 'Users', 'url' => route('users.index')],
                'create' => ['title' => 'Create User'],
            ],
            'roles' => $this->getFormattedRoles(),
        ];

        return inertia('back/users/form', $data);
    }

    public function store(StoreUserRequest $request)
    {
        try {
            $request->validated();

            $user = $this->createUser($request);

            flashMessage('Success', 'User created successfully');

        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {

            flashMessage('Error', 'Oops, something went wrong');

            return back();
        }

        return to_route('users.index');
    }

    public function edit(User $user)
    {
        $data = [
            'pageModule' => [
                'title' => 'Edit User',
                'method' => 'put',
                'url' => route('users.update', $user),
            ],
            'breadcrumbs' => [
                'home' => ['title' => 'Home', 'url' => route('dashboard')],
                'users' => ['title' => 'Users', 'url' => route('users.index')],
                'edit' => ['title' => 'Edit User'],
            ],
            'user' => $this->formatUserData($user),
            'roles' => $this->getFormattedRoles(),
        ];

        return inertia('back/users/form', $data);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $request->validated();

            $this->updateUser($user, $request);

            flashMessage('Success', 'User updated successfully');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {

            flashMessage('Error', 'Oops, something went wrong');

            return back();
        }

        return to_route('users.index');
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            flashMessage('Success', 'User deleted successfully');
        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
        }

        return back();
    }

    public function bulkDestroy(Request $request)
    {
        try {
            $ids = $request->input('ids', []);
            if (empty($ids)) {
                return back();
            }

            User::whereIn('id', $ids)->delete();
            flashMessage('Success', count($ids) > 1
                ? 'Users deleted successfully'
                : 'User deleted successfully'
            );
        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
        }

        return back();
    }

    private function getListRoles()
    {
        return Role::where('name', '!=', 'super admin')
            ->get()
            ->map(fn($role) => [ucfirst($role->name)]);
    }

    private function buildUserQuery($request)
    {
        $query = User::query()->with('roles');

        $this->applySearchFilter($query, $request);
        $this->applyRoleFilter($query, $request);
        $this->applySorting($query, $request);

        return $query;
    }

    private function applySearchFilter($query, $request)
    {
        if ($request->filled('search')) {
            $search = '%' . $request->search . '%';
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', $search)
                    ->orWhere('email', 'like', $search)
                    ->orWhereHas('roles', function ($q) use ($search) {
                        $q->where('name', 'like', $search);
                    });
            });
        }
    }

    private function applyRoleFilter($query, $request)
    {
        if ($request->filled('role') && $request->role !== 'all') {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->role);
            });
        }
    }

    private function applySorting($query, $request)
    {
        if ($request->filled('sort')) {
            $direction = $request->input('direction', 'desc');

            if ($request->sort === 'roles') {
                $this->applyRoleSorting($query, $direction);
            } elseif (in_array($request->sort, ['name', 'email', 'created_at'])) {
                $query->orderBy($request->sort, $direction);
            }
        } else {
            $query->latest('created_at');
        }
    }

    private function applyRoleSorting($query, $direction)
    {
        $query->leftJoin('role_user', 'users.id', '=', 'role_user.user_id')
            ->leftJoin('roles', 'role_user.role_id', '=', 'roles.id')
            ->select('users.*')
            ->orderBy(DB::raw('GROUP_CONCAT(roles.name)'), $direction)
            ->groupBy('users.id');
    }

    private function paginateAndTransform($query, $request)
    {
        $perPage = (int) $request->input('limit', 10);
        $users = $query->paginate($perPage)->withQueryString();

        $users->getCollection()->transform(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'gravatar' => $user->gravatar,
                'roles' => $user->roles->pluck('name')->map(fn($role) => ucfirst($role)),
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ];
        });

        return $users;
    }

    private function getFormattedRoles()
    {
        return Role::where('name', '!=', 'super admin')
            ->get()
            ->map(fn($role) => [
                'id' => $role->id,
                'name' => ucfirst($role->name),
            ]);
    }

    private function formatUserData(User $user)
    {
        $user->load('roles');
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->roles->map(fn($role) => [
                'id' => $role->id,
                'name' => $role->name,
            ]),
        ];
    }

    private function createUser($request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return $user;
    }

    private function updateUser($user, $request)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->filled('role')) {
            $user->syncRoles($request->role);
        }

        return $user;
    }

}
