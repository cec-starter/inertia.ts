import { InputError } from "@/components";
import { Button, Input, Label } from "@/components/ui";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    auth,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
    auth: any;
}) {
    const user = auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        className="block mt-1 w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                        error={errors.name}
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        className="block mt-1 w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                        error={errors.email}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <span className="ms-1">
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="text-sm underline rounded-md text-foreground hover:text-muted-foreground"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </span>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex gap-4 items-center">
                    <Button className="block w-40" disabled={processing}>
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
