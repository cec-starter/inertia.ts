import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Container,
} from "@/components/ui";
import AppLayout from "@/layouts/app-layout";
import UserActionCell from "./components/user-actions-cell";
import { UserType } from "@/types/user";
import { DataTable } from "@/components/datatable";
import React from "react";
import { userColumns } from "./table/user-columns";
import { userFilters } from "./table/user-filter";
import UserDetailDialog from "./dialogs/user-detail-dialog";
import UserBulkDeleteDialog from "./dialogs/user-bulk-delete-dialog";
import { userAction } from "./table/user-action";
import { useUserPermissions } from "@/hooks/use-user-permissions";

export default function Users({
    auth,
    filterRoles,
}: {
    auth: any;
    filterRoles: string[];
}) {
    const [selectedUsersBulk, setSelectedUsersBulk] = React.useState<UserType[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [tableKey, setTableKey] = React.useState(0);
    const [selectedUserDetailDialog, setSelectedUserDetailDialog] = React.useState<UserType | null>(null);

    const { hasPermission, hasAnyPermission } = useUserPermissions({
        permissions: auth.permissions ?? [],
    });

    const handleClick = (user: UserType) => {
        setSelectedUserDetailDialog(user);
    };

    const handleSelectionChange = (selectedCheckbox: UserType[]) => {
        setSelectedUsersBulk(selectedCheckbox);
    };

    const selectable = hasPermission("delete user");

    return (
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        List of all users in the system. Here you can view, add,
                        edit, disable and delete users.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable<UserType>
                        key={tableKey}
                        columns={userColumns(handleClick)}
                        filters={userFilters(filterRoles)}
                        fetchUrl={route("users.get-data")}
                        dataPath="users"
                        topContent={userAction({
                            auth,
                            selectedUsersBulk,
                            setIsDeleteDialogOpen,
                        })}
                        searchPlaceholder="Search users..."
                        defaultSort={{
                            key: "created_at",
                            direction: "desc",
                        }}
                        selectable={selectable}
                        onSelectionChange={handleSelectionChange}
                    >
                        {(user: UserType) =>
                            hasAnyPermission(["update user", "delete user"]) ? (
                                <UserActionCell auth={auth} user={user} />
                            ) : (
                                ""
                            )
                        }
                    </DataTable>
                </CardContent>
            </Card>

            <UserDetailDialog
                open={!!selectedUserDetailDialog}
                user={selectedUserDetailDialog}
                onClose={() => setSelectedUserDetailDialog(null)}
            />

            <UserBulkDeleteDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                selectedUsersBulk={selectedUsersBulk}
                onSuccess={() => {
                    setSelectedUsersBulk([]);
                    setTableKey((prev) => prev + 1);
                }}
            />
        </Container>
    );
}

Users.layout = (page: React.ReactNode) => <AppLayout children={page} />;
