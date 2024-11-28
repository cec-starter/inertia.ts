import { Form, InputError } from "@/components";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Container,
    Input,
    Label,
    MultiSelect,
} from "@/components/ui";
import AppLayout from "@/layouts/app-layout";
import { PageSettingProps } from "@/types";
import { RolesType } from "@/types/roles";
import { PasswordFormProps } from "@/types/user";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function FormUser({
    pageModule,
    user,
    roles,
}: {
    pageModule: PageSettingProps;
    user: any;
    roles: RolesType[];
}) {
    const { data, setData, reset, post, errors, processing } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
        password_confirmation: "",
        role: user?.roles?.map((role: any) => role.id) ?? [],
        _method: pageModule.method,
    });

    const [selected, setSelected] = React.useState<string[]>(
        user?.roles?.map((role: any) => role.id) ?? []
    );
    const roleOptions = roles.map((role) => ({
        value: role.id,
        label: role.name,
    }));

    function submit() {
        post(pageModule.url, {
            onSuccess: () => {
                reset();
            },
            onError: () => {},
        });
    }

    function onChange(e: any) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        {pageModule.method === "post"
                            ? "Create a new user for your application."
                            : "Edit users for your application."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form
                        onSubmit={submit}
                        className="space-y-4 [&>div>input]:mt-2"
                    >
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="block w-full"
                                value={data.name}
                                onChange={onChange}
                                error={errors.name}
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="lT9Lw@example.com"
                                className="block w-full"
                                value={data.email}
                                onChange={onChange}
                                error={errors.email}
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label htmlFor="role">Role</Label>
                            <MultiSelect
                                options={roleOptions}
                                onValueChange={(value) => {
                                    setSelected(value);
                                    setData("role", value);
                                }}
                                defaultValue={selected}
                                placeholder="Select Roles"
                                variant="inverted"
                                className="block mt-2 w-full"
                                // maxCount={3}
                            />
                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>

                        {pageModule.method === "post" && (
                            <PasswordForm
                                data={data}
                                errors={errors}
                                onChange={onChange}
                            />
                        )}

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="block px-4 py-2 w-40"
                                disabled={processing}
                            >
                                {processing && "Prosessing "}

                                {pageModule.method === "post"
                                    ? "Create"
                                    : "Update"}
                            </Button>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </Container>
    );
}



function PasswordForm({ data, errors, onChange }: PasswordFormProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    className="block mt-2 w-full"
                    value={data.password}
                    onChange={onChange}
                    error={errors.password}
                />

                <InputError message={errors.password} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="password_confirmation">
                    Password confirmation
                </Label>
                <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    placeholder="********"
                    className="block mt-2 w-full"
                    value={data.password_confirmation}
                    onChange={onChange}
                    error={errors.password_confirmation}
                />

                <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />
            </div>
        </div>
    );
}

FormUser.layout = (page: React.ReactNode) => <AppLayout children={page} />;
