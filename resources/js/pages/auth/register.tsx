import { InputError } from "@/components";
import { Button, Input, Label } from "@/components/ui";
import GuestLayout from "@/layouts/guest-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1"
                        autoComplete="name"
                        autoFocus={true}
                        onChange={(e) => setData("name", e.target.value)}
                        // required
                        error={errors.name}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        // required
                        error={errors.email}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        // required
                        error={errors.password}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        // required
                        error={errors.password_confirmation}
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex flex-col items-center justify-between mt-6 gap-y-3 md:flex-row">
                    <Link
                        href={route("login")}
                        className="text-sm text-muted-foreground hover:text-foreground"
                    >
                        Already registered?
                    </Link>

                    <Button className="w-full md:w-auto" disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </>
    );
}

Register.layout = (page: React.ReactNode) => {
    return (
        <GuestLayout
            title_header="Register"
            description_header="Register new account."
            children={page}
        />
    );
};
