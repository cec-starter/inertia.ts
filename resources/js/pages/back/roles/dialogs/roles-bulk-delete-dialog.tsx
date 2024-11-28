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
import { RolesBulkDeleteDialogProps } from "@/types/roles";
import { useForm } from "@inertiajs/react";

export default function RolesBulkDeleteDialog({
    open,
    onOpenChange,
    selectedRolesBulk,
    onSuccess,
}: RolesBulkDeleteDialogProps) {
    const { delete: destroy } = useForm();

    const handleBulkDelete = () => {
        destroy(
            route("roles.bulk-destroy", {
                ids: selectedRolesBulk.map((roles) => roles.id),
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
                        delete {selectedRolesBulk.length} selected roles.
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
