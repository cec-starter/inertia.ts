import { InputError } from "@/components";
import { Button, Input } from "@/components/ui";
import GuestLayout from "@/layouts/guest-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-foreground">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="block w-full mt-1"
                    autoFocus={true}
                    onChange={(e) => setData("email", e.target.value)}
                    error={errors.email}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex flex-col items-center justify-between mt-6 gap-y-3 md:flex-row">
                    <Link
                        href={route("login")}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Remember your password?
                    </Link>
                    <Button className="w-full md:w-auto" disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </>
    );
}

ForgotPassword.layout = (page: React.ReactNode) => {
    return (
        <GuestLayout
            title_header="Forgot Password"
            description_header="Forgot your password"
            children={page}
        />
    );
};
