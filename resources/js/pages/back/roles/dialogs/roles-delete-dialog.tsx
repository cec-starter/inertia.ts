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

export function RolesDeleteDialog({ roles }: { roles: any }) {
    const { delete: destroy } = useForm();

    function submit() {
        destroy(route("roles.destroy", [roles]), {
            onSuccess: () => {
                router.visit(route("roles.index"));
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
                        Are you sure you want to delete this roles?
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
