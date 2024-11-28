import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui";
import { PemissionBulkDeleteDialogProps } from "@/types/permission";
import { useForm } from "@inertiajs/react";

export default function PemissionBulkDeleteDialog({
    open,
    onOpenChange,
    selectedPermissionBulk,
    onSuccess,
}: PemissionBulkDeleteDialogProps) {
    const { delete: destroy } = useForm();

    const handleBulkDelete = () => {
        destroy(
            route("permissions.bulk-destroy", {
                ids: selectedPermissionBulk.map((permission) => permission.id),
            }),
            {
                onSuccess: () => {
                    onSuccess();
                    onOpenChange(false);
                },
            }
        );
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete {selectedPermissionBulk.length} selected
                        permissions.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBulkDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
