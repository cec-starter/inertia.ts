<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;

class RolesController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:read role', only: ['index', 'getData']),
            new Middleware('permission:create role', only: ['store']),
            new Middleware('permission:update role', only: ['edit', 'update']),
            new Middleware('permission:delete role', only: ['destroy', 'bulkDestroy']),
        ];
    }

    public function index()
    {
        $data = [
            'pageModule' => [
                'title' => 'Roles',
            ],
            'breadcrumbs' => [
                'home' => ['title' => 'Home', 'url' => route('dashboard')],
                'roles' => ['title' => 'Roles'],
            ],
            'listPermissions' => $this->getListPermissions(),
        ];

        // echo json_encode($data['listPermissions']);
        // exit;

        return inertia('back/roles/index', $data);

    }

    public function getData(Request $request)
    {
        try {
            $query = $this->buildUserQuery($request);
            $roles = $this->paginateAndTransform($query, $request);

            return response()->json([
                'roles' => $roles,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching roles data',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    private function getListPermissions()
    {
        return Permission::query()
            ->select('module_name')
            ->groupBy('module_name')
            ->get()
            ->map(fn($permission) => [
                'module_name' => $permission->module_name,
                'permissions' => Permission::query()
                    ->where('module_name', $permission->module_name)
                    ->get()
                    ->map(fn($permission) => [
                        'name' => $permission->name,
                    ]),
            ]);
    }

    private function buildUserQuery($request)
    {
        $query = Role::query()
            ->withCount('permissions');

        $this->applySearchFilter($query, $request);
        $this->applySorting($query, $request);

        return $query;
    }

    private function applySearchFilter($query, $request)
    {
        if ($request->filled('search')) {
            $search = '%' . $request->search . '%';
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', $search);
            });
        }
    }

    private function applySorting($query, $request)
    {
        if ($request->filled('sort')) {
            $direction = $request->input('direction', 'desc');
            $sortField = $request->sort;

            if ($sortField === 'permission_count') {
                $query->orderBy('permissions_count', $direction);
            } else {
                $query->orderBy($sortField, $direction);
            }
        } else {
            $query->latest('created_at');
        }

    }

    private function paginateAndTransform($query, $request)
    {
        $perPage = (int) $request->input('limit', 10);
        $roles = $query->paginate($perPage)->withQueryString();

        $roles->getCollection()->transform(function ($roles) {
            return [
                'id' => $roles->id,
                'name' => ucfirst($roles->name),
                'guard_name' => $roles->guard_name,
                'permission_count' => $roles->permissions->count(),
                'permissions' => $roles->permissions->map(fn($permission) => [
                    'name' => $permission->name,
                ]),
                'created_at' => Carbon::parse($roles->created_at)->format('Y-m-d H:i'),
                'updated_at' => Carbon::parse($roles->updated_at)->format('Y-m-d H:i'),
            ];
        });

        return $roles;
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array',
        ]);

        try {
            DB::beginTransaction();

            $role = Role::create(['name' => $request->name]);

            // Process permissions
            $permissions = [];
            foreach ($request->permissions as $module => $modulePermissions) {
                foreach ($modulePermissions as $permission) {
                    $permissions[] = $permission . ' ' . strtolower(str_replace(' Module', '', $module));
                }
            }

            if (!empty($permissions)) {
                $role->syncPermissions($permissions);
            }

            DB::commit();
            flashMessage('Success', 'Role created successfully');

            return back();

        } catch (ValidationException $e) {
            DB::rollBack();
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'array',
        ]);

        try {
            DB::beginTransaction();

            $role->update(['name' => $request->name]);

            // Process permissions
            $permissions = [];
            foreach ($request->permissions as $module => $modulePermissions) {
                foreach ($modulePermissions as $permission) {
                    $permissions[] = $permission . ' ' . strtolower(str_replace(' Module', '', $module));
                }
            }

            $role->syncPermissions($permissions);

            DB::commit();
            flashMessage('Success', 'Role updated successfully');

            return back();
        } catch (ValidationException $e) {
            DB::rollBack();
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

    public function destroy(Role $role)
    {
        try {
            $role->delete();
            flashMessage('Success', 'Role deleted successfully');
            return back();
        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

    public function bulkDestroy(Request $request)
    {
        try {
            Role::whereIn('id', $request->ids)->delete();
            flashMessage('Success', 'Roles deleted successfully');
            return back();
        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

}
