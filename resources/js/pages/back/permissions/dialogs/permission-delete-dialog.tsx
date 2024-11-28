import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    buttonVariants,
} from "@/components/ui";
import { router, useForm } from "@inertiajs/react";
import { IconTrash } from "justd-icons";

export function PermissionDeleteDialog({ permission }: { permission: any }) {
    const { delete: destroy } = useForm();

    function submit() {
        destroy(route("permissions.destroy", [permission]), {
            onSuccess: () => {
                router.visit(route("permissions.index"));
            },
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="flex gap-2 justify-start items-center w-full">
                <div>
                    <IconTrash />
                </div>
                <span>Delete</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this permission?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={buttonVariants({ variant: "outline" })}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({
                            variant: "destructive",
                        })}
                        onClick={submit}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
