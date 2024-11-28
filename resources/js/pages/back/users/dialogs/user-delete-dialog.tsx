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

export function UserDeleteDialog({ user }: { user: any }) {
    const { delete: destroy } = useForm();

    function submit() {
        destroy(route("users.destroy", [user]), {
            onSuccess: () => {
                router.visit(route("users.index"));
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
                        Are you sure you want to delete this user?
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
                        className="bg-red-600 hover:bg-red-600/80 dark:bg-red-700 dark:hover:bg-red-700/80"
                        onClick={submit}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
