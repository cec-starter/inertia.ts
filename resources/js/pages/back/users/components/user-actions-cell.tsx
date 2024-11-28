import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui";
import { Link } from "@inertiajs/react";
import { UserDeleteDialog } from "../dialogs/user-delete-dialog";
import { IconDotsVertical, IconHighlight } from "justd-icons";
import { useUserPermissions } from "@/hooks/use-user-permissions";

function UserActionCell({ auth, user }: { auth: any; user: any }) {
    const { hasPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <IconDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {hasPermission("update user") && (
                    <DropdownMenuItem asChild>
                        <Link href={route("users.edit", [user])}>
                            <IconHighlight />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                )}
                {hasPermission("delete user") && (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <UserDeleteDialog user={user} />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserActionCell;
