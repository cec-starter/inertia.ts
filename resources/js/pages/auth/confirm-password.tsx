import { InputError } from "@/components";
import { Button, Input, Label } from "@/components/ui";
import GuestLayout from "@/layouts/guest-layout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoFocus={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </>
    );
}

ConfirmPassword.layout = (page: React.ReactNode) => {
    return (
        <GuestLayout
            title_header="Confirm Password"
            description_header="Confirm your password."
            children={page}
        />
    );
};
