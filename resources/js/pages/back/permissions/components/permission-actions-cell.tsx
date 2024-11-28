import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui";
import { IconDotsVertical, IconHighlight } from "justd-icons";
import { useUserPermissions } from "@/hooks/use-user-permissions";
import { PermissionDeleteDialog } from "../dialogs/permission-delete-dialog";
import { PermissionActionCellProps } from "@/types/permission";

function PermissionActionCell({
    auth,
    permission,
    onEdit,
}: PermissionActionCellProps) {
    const { hasPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <IconDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {hasPermission("update permission") && (
                    <DropdownMenuItem
                        onClick={() => onEdit(permission)}
                        className="flex gap-2 items-center cursor-pointer"
                    >
                        <IconHighlight />
                        Edit
                    </DropdownMenuItem>
                )}
                {hasPermission("delete permission") && (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <PermissionDeleteDialog permission={permission} />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default PermissionActionCell;
