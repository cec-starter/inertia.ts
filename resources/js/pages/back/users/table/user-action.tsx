import { buttonVariants } from "@/components/ui";
import { UserType } from "@/types/user";
import { Link } from "@inertiajs/react";
import { IconPlus, IconTrash } from "justd-icons";
import { useUserPermissions } from "@/hooks/use-user-permissions";

export const userAction = ({
    auth,
    selectedUsersBulk,
    setIsDeleteDialogOpen,
}: {
    auth: any;
    selectedUsersBulk: UserType[];
    setIsDeleteDialogOpen: (open: boolean) => void;
}) => {
    const { hasPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    return (
        <>
            {hasPermission("create user") && (
                <Link className={buttonVariants()} href={route("users.create")}>
                    <IconPlus className="mr-2 w-4 h-4" />
                    Add User
                </Link>
            )}
            {selectedUsersBulk.length > 0 && hasPermission("delete user") && (
                <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className={buttonVariants({ variant: "destructive" })}
                >
                    <IconTrash className="mr-2 w-4 h-4" />
                    Delete Selected ({selectedUsersBulk.length})
                </button>
            )}
        </>
    );
};
