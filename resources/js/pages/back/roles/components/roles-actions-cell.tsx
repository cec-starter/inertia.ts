import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui";
import { IconDotsVertical, IconHighlight } from "justd-icons";
import { useUserPermissions } from "@/hooks/use-user-permissions";
import { RolesActionCellProps } from "@/types/roles";
import { RolesDeleteDialog } from "../dialogs/roles-delete-dialog";

function RolesActionCell({ auth, roles, onEdit }: RolesActionCellProps) {
    const { hasPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                <IconDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {hasPermission("update role") && (
                    <DropdownMenuItem
                        onClick={() => onEdit(roles)}
                        className="flex gap-2 items-center cursor-pointer"
                    >
                        <IconHighlight />
                        Edit
                    </DropdownMenuItem>
                )}
                {hasPermission("delete role") && (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <RolesDeleteDialog roles={roles} />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default RolesActionCell;
