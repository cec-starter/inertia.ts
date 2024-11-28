import { InputError } from "@/components";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
} from "@/components/ui";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <Dialog
                open={confirmingUserDeletion}
                onOpenChange={(open) => {
                    if (!open) closeModal();
                }}
            >
                <DialogTrigger asChild>
                    <Button
                        className="block w-40 bg-red-600 hover:bg-red-600/80 dark:bg-red-700 dark:hover:bg-red-700/80"
                        onClick={confirmUserDeletion}
                    >
                        Delete Account
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="overflow-hidden fixed top-1/3 left-1/2 max-w-sm rounded-xl border shadow-lg md:max-w-xl lg:max-w-2xl"
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle>
                            Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Please enter
                            your password to confirm you would like to
                            permanently delete your account.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={deleteUser}>
                        <div>
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="mt-1"
                                onFocus={() => clearErrors("password")}
                                placeholder="Password"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                type="button"
                                onClick={closeModal}
                                variant="outline"
                                className="bg-white text-foreground hover:bg-slate-200/80 border-foreground/40 dark:bg-white dark:text-accent dark:hover:bg-white/80"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="bg-red-600 ms-2 hover:bg-red-600/80 dark:bg-red-700 dark:hover:bg-red-700/80"
                                disabled={processing}
                            >
                                {processing ? "Deleting..." : "Delete Account"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
