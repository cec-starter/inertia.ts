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
import { PermissionFormDialogProps } from "@/types/permission";

export default function PermissionFormDialog({
    open,
    onOpenChange,
    selectedFormPermission,
    onSuccess,
}: PermissionFormDialogProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        module_name: "",
        _method: "post",
    });

    React.useEffect(() => {
        if (selectedFormPermission) {
            setData({
                name: selectedFormPermission.name,
                module_name: selectedFormPermission.module_name,
                _method: "put",
            });
        } else {
            reset();
            setData({
                name: "",
                module_name: "",
                _method: "post",
            });
        }
    }, [selectedFormPermission]);

    function submit() {
        post(
            selectedFormPermission
                ? route("permissions.update", selectedFormPermission.id)
                : route("permissions.store"),
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
                className="overflow-hidden fixed top-1/3 left-1/2 max-w-sm rounded-xl border shadow-lg md:max-w-xl lg:max-w-2xl"
                onEscapeKeyDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>
                        {selectedFormPermission
                            ? "Edit Permission"
                            : "Create Permission"}
                    </DialogTitle>
                    <DialogDescription>
                        {selectedFormPermission
                            ? "Edit permission for your application."
                            : "Create a new permission for your application."}
                    </DialogDescription>
                </DialogHeader>
                <Form
                    onSubmit={submit}
                    className="space-y-4 [&>div>input]:mt-2"
                >
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="view users"
                            value={data.name}
                            onChange={onChange}
                            error={errors.name}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="module_name">Module Name</Label>
                        <Input
                            id="module_name"
                            name="module_name"
                            type="text"
                            placeholder="Users Module"
                            value={data.module_name}
                            onChange={onChange}
                            error={errors.module_name}
                        />
                        <InputError
                            message={errors.module_name}
                            className="mt-2"
                        />
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
                            {selectedFormPermission ? "Update" : "Create"}
                        </Button>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
