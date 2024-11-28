import { buttonVariants } from "@/components/ui";
import { IconPlus, IconTrash } from "justd-icons";
import { useUserPermissions } from "@/hooks/use-user-permissions";
import { PermissionType } from "@/types/permission";

export const permissionAction = ({
    auth,
    selectedPermissionBulk,
    setIsDeleteDialogOpen,
    onCreateClick,
}: {
    auth: any;
    selectedPermissionBulk: PermissionType[];
    setIsDeleteDialogOpen: (open: boolean) => void;
    onCreateClick: () => void;
}) => {
    const { hasPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    return (
        <>
            {hasPermission("create permission") && (
                <button
                    onClick={onCreateClick}
                    className={buttonVariants({ variant: "default" })}
                >
                    <IconPlus className="mr-2 w-4 h-4" />
                    Add Permission
                </button>
            )}
            {selectedPermissionBulk.length > 0 &&
                hasPermission("delete permission") && (
                    <button
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className={buttonVariants({ variant: "destructive" })}
                    >
                        <IconTrash className="mr-2 w-4 h-4" />
                        Delete Selected ({selectedPermissionBulk.length})
                    </button>
                )}
        </>
    );
};
