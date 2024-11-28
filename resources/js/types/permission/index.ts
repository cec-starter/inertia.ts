export interface PermissionType {
    id: number;
    name: string;
    module_name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}
[];

export interface PermissionModuleGroup {
    module_name: string;
    permissions: { name: string }[];
}

export interface PermissionFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedFormPermission?: PermissionType | null;
    onSuccess?: () => void;
}

export interface PermissionActionCellProps {
    auth: any;
    permission: PermissionType;
    onEdit: (permission: PermissionType) => void;
}

export interface PemissionBulkDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedPermissionBulk: PermissionType[];
    onSuccess: () => void;
}
