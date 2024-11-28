import { formatDate, formatRelativeTime } from "@/utils/format-date";
import { Column } from "@/types/table";
import { PermissionType } from "@/types/permission";

export const permissionColumns: Column<PermissionType>[] = [
    {
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "module_name",
        label: "Module",
        sortable: true,
    },
    {
        key: "created_at",
        label: "Created At",
        sortable: true,
    },
];
