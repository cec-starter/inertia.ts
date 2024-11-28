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
import { UserBulkDeleteDialogProps } from "@/types/user";
import { useForm } from "@inertiajs/react";

export default function UserBulkDeleteDialog({
    open,
    onOpenChange,
    selectedUsersBulk,
    onSuccess,
}: UserBulkDeleteDialogProps) {
    const { delete: destroy } = useForm();

    const handleBulkDelete = () => {
        destroy(
            route("users.bulk-destroy", {
                ids: selectedUsersBulk.map((user) => user.id),
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
                        delete {selectedUsersBulk.length} selected users.
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
