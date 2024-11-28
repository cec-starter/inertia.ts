import { DataTable } from "@/components/datatable";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Container,
} from "@/components/ui";
import AppLayout from "@/layouts/app-layout";
import React from "react";
import { permissionColumns } from "./table/permission-columns";
import { PermissionType } from "@/types/permission";
import { useUserPermissions } from "@/hooks/use-user-permissions";
import PermissionActionCell from "./components/permission-actions-cell";
import { permissionAction } from "./table/permission-action";
import PermissionBulkDeleteDialog from "./dialogs/permission-bulk-delete-dialog";
import PermissionFormDialog from "./dialogs/permission-form-dialog";

export default function Permissions({ auth }: { auth: any }) {
    const [tableKey, setTableKey] = React.useState(0);
    const [selectedPermissionBulk, setselectedPermissionBulk] = React.useState<
        PermissionType[]
    >([]);
    const [isFormDialogOpen, setIsFormDialogOpen] = React.useState(false);
    const [selectedFormPermission, setSelectedFormPermission] =
        React.useState<PermissionType | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    const { hasPermission, hasAnyPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    const handleSelectionChange = (selectedCheckbox: PermissionType[]) => {
        setselectedPermissionBulk(selectedCheckbox);
    };

    function handleCreate() {
        setSelectedFormPermission(null);
        setIsFormDialogOpen(true);
    }

    function handleEdit(permission: PermissionType) {
        setSelectedFormPermission(permission);
        setIsFormDialogOpen(true);
    }

    const selectable = hasPermission("delete permission");

    return (
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                    <CardDescription>
                        List of all permissions in the system. Here you can
                        view, add, edit, disable and delete permissions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable<PermissionType>
                        key={tableKey}
                        columns={permissionColumns}
                        dataPath="permissions"
                        fetchUrl={route("permissions.get-data")}
                        searchPlaceholder="Search permission..."
                        topContent={permissionAction({
                            auth,
                            selectedPermissionBulk,
                            setIsDeleteDialogOpen,
                            onCreateClick: handleCreate,
                        })}
                        defaultSort={{
                            key: "created_at",
                            direction: "desc",
                        }}
                        selectable={selectable}
                        onSelectionChange={handleSelectionChange}
                    >
                        {(permission: PermissionType) =>
                            hasAnyPermission([
                                "update permission",
                                "delete permission",
                            ]) ? (
                                <PermissionActionCell
                                    auth={auth}
                                    permission={permission}
                                    onEdit={handleEdit}
                                />
                            ) : (
                                ""
                            )
                        }
                    </DataTable>
                </CardContent>
            </Card>
            <PermissionFormDialog
                open={isFormDialogOpen}
                onOpenChange={setIsFormDialogOpen}
                selectedFormPermission={selectedFormPermission}
                onSuccess={() => {
                    setTableKey((prev) => prev + 1);
                }}
            />
            <PermissionBulkDeleteDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                selectedPermissionBulk={selectedPermissionBulk}
                onSuccess={() => {
                    setselectedPermissionBulk([]);
                    setTableKey((prev) => prev + 1);
                }}
            />
        </Container>
    );
}

Permissions.layout = (page: React.ReactNode) => <AppLayout children={page} />;
