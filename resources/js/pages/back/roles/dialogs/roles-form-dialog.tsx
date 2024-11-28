import { Form, InputError } from "@/components";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Input,
    Label,
} from "@/components/ui";
import { useForm } from "@inertiajs/react";
import React from "react";
import { RolesFormDialogProps } from "@/types/roles";
import TablePermissions from "../components/table-permissions";

export default function RolesFormDialog({
    open,
    onOpenChange,
    selectedFormRoles,
    onSuccess,
    listPermissions,
}: RolesFormDialogProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        _method: "post",
        permissions: {} as Record<string, string[]>,
    });

    React.useEffect(() => {
        if (selectedFormRoles) {
            const mappedPermissions: Record<string, string[]> = {};

            // Initialize permissions for each module
            listPermissions.forEach((module) => {
                mappedPermissions[module.module_name] = [];
            });

            // Map existing permissions
            if (selectedFormRoles.permissions) {
                selectedFormRoles.permissions.forEach((permission) => {
                    // Find the module that matches this permission
                    const [action, targetModule] = permission.name.split(" ");

                    // Find the module name that contains the targetModule (case insensitive)
                    const moduleKey = Object.keys(mappedPermissions).find(
                        (key) =>
                            key
                                .toLowerCase()
                                .includes(targetModule.toLowerCase())
                    );

                    if (
                        moduleKey &&
                        !mappedPermissions[moduleKey].includes(action)
                    ) {
                        mappedPermissions[moduleKey].push(action);
                    }
                });
            }

            console.log("Final mappedPermissions:", mappedPermissions);

            setData({
                name: selectedFormRoles.name,
                _method: "put",
                permissions: mappedPermissions,
            });
        } else {
            reset();
            setData({
                name: "",
                _method: "post",
                permissions: {},
            });
        }
    }, [selectedFormRoles]);

    const handlePermissionChange = (
        moduleName: string,
        permissionName: string,
        checked: boolean
    ) => {
        const currentPermissions = { ...data.permissions };

        if (!currentPermissions[moduleName]) {
            currentPermissions[moduleName] = [];
        }

        if (checked) {
            if (!currentPermissions[moduleName].includes(permissionName)) {
                currentPermissions[moduleName].push(permissionName);
            }
        } else {
            currentPermissions[moduleName] = currentPermissions[
                moduleName
            ].filter((p) => p !== permissionName);
        }

        setData("permissions", currentPermissions);
    };

    function submit() {
        post(
            selectedFormRoles
                ? route("roles.update", selectedFormRoles.id)
                : route("roles.store"),
            {
                onSuccess: () => {
                    reset();
                    onOpenChange(false);
                    onSuccess?.();
                },
            }
        );
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="overflow-hidden fixed top-1/2 left-1/2 max-w-sm rounded-xl border shadow-lg md:max-w-xl lg:max-w-4xl"
                onEscapeKeyDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>
                        {selectedFormRoles ? "Edit Role" : "Create Role"}
                    </DialogTitle>
                    <DialogDescription>
                        {selectedFormRoles
                            ? "Edit role for your application."
                            : "Create a new role for your application."}
                    </DialogDescription>
                </DialogHeader>
                <Form
                    onSubmit={submit}
                    className="space-y-4 [&>div>input]:mt-2 overflow-x-auto"
                >
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter role name"
                            value={data.name}
                            onChange={onChange}
                            error={errors.name}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="permission">Permissions</Label>
                        <div className="mt-2 rounded-lg border">
                            <TablePermissions
                                listPermissions={listPermissions}
                                data={data}
                                handlePermissionChange={handlePermissionChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {selectedFormRoles ? "Update" : "Create"}
                        </Button>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
