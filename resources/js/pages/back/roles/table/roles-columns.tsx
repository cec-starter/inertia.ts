import { formatDate, formatRelativeTime } from "@/utils/format-date";
import { Column } from "@/types/table";
import { RolesType } from "@/types/roles";
import { Badge } from "@/components/ui";

export const rolesColumns: Column<RolesType>[] = [
    {
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "permission_count",
        label: "Permissions",
        sortable: true,
        className: "flex justify-center items-center my-2",
        render: (roles: RolesType) => (
            <div className="text-center">
                <Badge
                    variant="outline"
                    className="text-xs font-medium rounded-full border border-primary text-primary bg-primary/15"
                >
                    {roles.permission_count}
                </Badge>
            </div>
        ),
    },
    {
        key: "created_at",
        label: "Created At",
        sortable: true,
    },
];
