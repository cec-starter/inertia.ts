import { InputError } from "@/components";
import { Button, Checkbox, Input, Label } from "@/components/ui";
import GuestLayout from "@/layouts/guest-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { IconEye, IconEyeOff } from "justd-icons";
import React from "react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const [isView, setIsView] = React.useState(false);

    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        autoFocus={true}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={isView ? "text" : "password"}
                            name="password"
                            value={data.password}
                            className="block w-full mt-1"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            error={errors.password}
                        />
                        {isView ? (
                            <IconEye
                                className="absolute z-10 cursor-pointer top-2 text-muted-foreground right-4"
                                onClick={() => {
                                    setIsView(!isView), console.log(isView);
                                }}
                            />
                        ) : (
                            <IconEyeOff
                                className="absolute z-10 cursor-pointer top-2 text-muted-foreground right-4"
                                onClick={() => setIsView(!isView)}
                            />
                        )}
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4 ">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(e) =>
                                setData("remember", e as any)
                            }
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <div>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route("register")}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Don&apos;t have an account?
                    </Link>
                    <Button disabled={processing}>Log in</Button>
                </div>
            </form>
        </>
    );
}

Login.layout = (page: React.ReactNode) => {
    return (
        <GuestLayout
            title_header="Login"
            description_header="Log in to your account."
            children={page}
        />
    );
};
