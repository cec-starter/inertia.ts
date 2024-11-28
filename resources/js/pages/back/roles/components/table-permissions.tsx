import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Checkbox,
} from "@/components/ui";
import { PermissionModuleGroup } from "@/types/permission";

interface TablePermissionsProps {
    listPermissions: PermissionModuleGroup[];
    data: {
        permissions: Record<string, string[]>;
    };
    handlePermissionChange: (
        moduleName: string,
        permissionName: string,
        checked: boolean
    ) => void;
}

export default function TablePermissions({
    listPermissions,
    data,
    handlePermissionChange,
}: TablePermissionsProps) {
    return (
        <div className="relative">
            <div className="max-h-[300px] overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 z-10">
                        <TableRow>
                            <TableHead>Module / Permission</TableHead>
                            <TableHead className="text-center">Read</TableHead>
                            <TableHead className="text-center">
                                Create
                            </TableHead>
                            <TableHead className="text-center">
                                Update
                            </TableHead>
                            <TableHead className="text-center">
                                Delete
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listPermissions.map((module) => (
                            <React.Fragment key={module.module_name}>
                                <TableRow>
                                    <TableCell>{module.module_name}</TableCell>
                                    <TableCell className="text-center">
                                        {module.permissions.some((permission) =>
                                            permission.name.includes("read")
                                        ) && (
                                            <Checkbox
                                                checked={data.permissions[
                                                    module.module_name
                                                ]?.includes("read")}
                                                onCheckedChange={(checked) =>
                                                    handlePermissionChange(
                                                        module.module_name,
                                                        "read",
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {module.permissions.some((permission) =>
                                            permission.name.includes("create")
                                        ) && (
                                            <Checkbox
                                                checked={data.permissions[
                                                    module.module_name
                                                ]?.includes("create")}
                                                onCheckedChange={(checked) =>
                                                    handlePermissionChange(
                                                        module.module_name,
                                                        "create",
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {module.permissions.some((permission) =>
                                            permission.name.includes("update")
                                        ) && (
                                            <Checkbox
                                                checked={data.permissions[
                                                    module.module_name
                                                ]?.includes("update")}
                                                onCheckedChange={(checked) =>
                                                    handlePermissionChange(
                                                        module.module_name,
                                                        "update",
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {module.permissions.some((permission) =>
                                            permission.name.includes("delete")
                                        ) && (
                                            <Checkbox
                                                checked={data.permissions[
                                                    module.module_name
                                                ]?.includes("delete")}
                                                onCheckedChange={(checked) =>
                                                    handlePermissionChange(
                                                        module.module_name,
                                                        "delete",
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
