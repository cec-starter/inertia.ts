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
import { RolesType } from "@/types/roles";
import { rolesColumns } from "./table/roles-columns";
import React from "react";
import { rolesAction } from "./table/roles-action";
import { useUserPermissions } from "@/hooks/use-user-permissions";
import RolesBulkDeleteDialog from "./dialogs/roles-bulk-delete-dialog";
import RolesActionCell from "./components/roles-actions-cell";
import RolesFormDialog from "./dialogs/roles-form-dialog";

export default function Roles({
    auth,
    listPermissions,
}: {
    auth: any;
    listPermissions: any;
}) {
    const [tableKey, setTableKey] = React.useState(0);
    const [selectedRolesBulk, setselectedRolesBulk] = React.useState<
        RolesType[]
    >([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [isFormDialogOpen, setIsFormDialogOpen] = React.useState(false);
    const [selectedFormRoles, setSelectedFormRoles] =
        React.useState<RolesType | null>(null);

    const { hasPermission, hasAnyPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    const selectable = hasPermission("delete role");

    const handleSelectionChange = (selectedRows: RolesType[]) => {
        setselectedRolesBulk(selectedRows);
    };

    function handleCreate() {
        setSelectedFormRoles(null);
        setIsFormDialogOpen(true);
    }

    function handleEdit(roles: RolesType) {
        setSelectedFormRoles(roles);
        setIsFormDialogOpen(true);
    }

    return (
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle>Roles</CardTitle>
                    <CardDescription>
                        List of all roles in the system. Here you can view, add,
                        edit, disable and delete roles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable<RolesType>
                        key={tableKey}
                        columns={rolesColumns}
                        dataPath="roles"
                        fetchUrl={route("roles.get-data")}
                        searchPlaceholder="Search roles..."
                        topContent={rolesAction({
                            auth,
                            selectedRolesBulk,
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
                        {hasAnyPermission(["update role", "delete role"])
                            ? (row: RolesType) => (
                                  <RolesActionCell
                                      auth={auth}
                                      roles={row}
                                      onEdit={handleEdit}
                                  />
                              )
                            : undefined}
                    </DataTable>
                </CardContent>
            </Card>
            <RolesFormDialog
                open={isFormDialogOpen}
                onOpenChange={setIsFormDialogOpen}
                selectedFormRoles={selectedFormRoles}
                onSuccess={() => {
                    setTableKey((prev) => prev + 1);
                }}
                listPermissions={listPermissions}
                permissions={[]}
            />

            <RolesBulkDeleteDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                selectedRolesBulk={selectedRolesBulk}
                onSuccess={() => {
                    setselectedRolesBulk([]);
                    setTableKey((prev) => prev + 1);
                }}
            />
        </Container>
    );
}

Roles.layout = (page: React.ReactNode) => <AppLayout children={page} />;
