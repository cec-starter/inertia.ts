import { buttonVariants } from "@/components/ui";
import { IconPlus, IconTrash } from "justd-icons";
import { useUserPermissions } from "@/hooks/use-user-permissions";
import { RolesType } from "@/types/roles";

export const rolesAction = ({
    auth,
    selectedRolesBulk,
    setIsDeleteDialogOpen,
    onCreateClick,
}: {
    auth: any;
    selectedRolesBulk: RolesType[];
    setIsDeleteDialogOpen: (open: boolean) => void;
    onCreateClick: () => void;
}) => {
    const { hasPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    return (
        <>
            {hasPermission("create role") && (
                <button
                    onClick={onCreateClick}
                    className={buttonVariants({ variant: "default" })}
                >
                    <IconPlus className="mr-2 w-4 h-4" />
                    Add Role
                </button>
            )}
            {selectedRolesBulk.length > 0 && hasPermission("delete role") && (
                <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className={buttonVariants({ variant: "destructive" })}
                >
                    <IconTrash className="mr-2 w-4 h-4" />
                    Delete Selected ({selectedRolesBulk.length})
                </button>
            )}
        </>
    );
};
