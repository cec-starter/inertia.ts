import { PermissionModuleGroup, PermissionType } from "../permission";

export interface RolesType {
    id: string;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: PermissionType[];
    permission_count: number;
}

export interface RolesFormData {
    name: string;
    _method: "post" | "put";
    permissions: Record<string, string[]>;
}

export interface RolesFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedFormRoles?: RolesType | null;
    onSuccess?: () => void;
    listPermissions: PermissionModuleGroup[];
    permissions: PermissionType[];
}

export interface RolesActionCellProps {
    auth: any;
    roles: RolesType;
    onEdit: (roles: RolesType) => void;
}

export interface RolesBulkDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedRolesBulk: RolesType[];
    onSuccess: () => void;
}
