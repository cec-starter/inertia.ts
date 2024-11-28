<?php

namespace App\Http\Controllers\Back;

use App\Http\Controllers\Controller;
use App\Http\Requests\Back\PermissionRequest;
use App\Models\Permission;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\ValidationException;

class PermissionController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {
        return [
            new Middleware('permission:read permission', only: ['index', 'getData']),
            new Middleware('permission:create permission', only: ['store']),
            new Middleware('permission:update permission', only: ['edit', 'update']),
            new Middleware('permission:delete permission', only: ['destroy', 'bulkDestroy']),
        ];
    }

    public function index(Request $request)
    {

        $data = [
            'pageModule' => [
                'title' => 'Permissions',
            ],
            'breadcrumbs' => [
                'home' => ['title' => 'Home', 'url' => route('dashboard')],
                'permissions' => ['title' => 'Permissions'],
            ],
        ];

        return inertia('back/permissions/index', $data);
    }

    public function getData(Request $request)
    {
        try {
            $query = $this->buildUserQuery($request);
            $permissions = $this->paginateAndTransform($query, $request);

            return response()->json([
                'permissions' => $permissions,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching permissions data',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function store(PermissionRequest $request)
    {
        try {
            $request->validated();

            $moduleName = $request->module_name;
            if (stripos($moduleName, 'module') === false) {
                $moduleName = "{$moduleName} Module";
            }

            // Get base module name for validation
            $baseModuleName = str_replace(' module', '', strtolower($moduleName));
            $permissionName = strtolower($request->name);

            // Validate that permission name contains the module name
            if (stripos($permissionName, $baseModuleName) === false) {
                throw ValidationException::withMessages([
                    'name' => ["Permission name must contain the module name '{$baseModuleName}'"],
                ]);
            }

            Permission::create([
                'name' => $permissionName,
                'module_name' => ucfirst($moduleName),
                'guard_name' => 'web',
            ]);

            flashMessage('Success', 'Permission created successfully');

            return back();

        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

    public function update(PermissionRequest $request, Permission $permission)
    {
        try {
            $request->validated();

            $moduleName = $request->module_name;
            if (stripos($moduleName, 'module') === false) {
                $moduleName = "{$moduleName} Module";
            }

            // Get base module name for validation
            $baseModuleName = str_replace(' module', '', strtolower($moduleName));
            $permissionName = strtolower($request->name);

            // Validate that permission name contains the module name
            if (stripos($permissionName, $baseModuleName) === false) {
                throw ValidationException::withMessages([
                    'name' => ["Permission name must contain the module name '{$baseModuleName}'"],
                ]);
            }

            $permission->update([
                'name' => $permissionName,
                'module_name' => ucfirst($moduleName),
                'guard_name' => 'web',
            ]);

            flashMessage('Success', 'Permission updated successfully');

            return back();

        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

    public function destroy(Permission $permission)
    {
        try {
            $permission->delete();

            flashMessage('Success', 'Permission deleted successfully');

            return back();

        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

    public function bulkDestroy(Request $request)
    {
        try {
            $ids = $request->ids;
            Permission::whereIn('id', $ids)->delete();

            flashMessage('Success', 'Selected permissions deleted successfully');

            return back();

        } catch (\Exception $e) {
            flashMessage('Error', 'Oops, something went wrong');
            return back();
        }
    }

    private function buildUserQuery($request)
    {
        $query = Permission::query();

        $this->applySearchFilter($query, $request);
        $this->applySorting($query, $request);

        return $query;
    }

    private function applySearchFilter($query, $request)
    {
        if ($request->filled('search')) {
            $search = '%' . $request->search . '%';
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', $search)
                    ->orWhere('module_name', 'like', $search);
            });
        }
    }

    private function applySorting($query, $request)
    {
        if ($request->filled('sort')) {
            $direction = $request->input('direction', 'desc');
            $query->orderBy($request->sort, $direction);

        } else {
            $query->latest('created_at');
        }
    }

    private function paginateAndTransform($query, $request)
    {
        $perPage = (int) $request->input('limit', 10);
        $permissions = $query->paginate($perPage)->withQueryString();

        $permissions->getCollection()->transform(function ($permissions) {
            return [
                'id' => $permissions->id,
                'name' => ucfirst($permissions->name),
                'module_name' => $permissions->module_name,
                'guard_name' => $permissions->guard_name,
                'created_at' => Carbon::parse($permissions->created_at)->format('Y-m-d H:i'),
                'updated_at' => Carbon::parse($permissions->updated_at)->format('Y-m-d H:i'),
            ];
        });

        return $permissions;
    }

}
