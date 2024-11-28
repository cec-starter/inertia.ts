import { Head } from "@inertiajs/react";
import DeleteUserForm from "./partials/DeleteUserForm";
import UpdatePasswordForm from "./partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./partials/UpdateProfileInformationForm";
import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Tabs,
} from "@/components/ui";
import { PagePropsDataType } from "@/types";

export default function Profile({
    mustVerifyEmail,
    status,
    auth,
}: PagePropsDataType<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            <Head title="Profile" />

            <div className="p-10">
                <div className="space-y-6">
                    <Tabs aria-label="Recipe App">
                        <Tabs.List>
                            <Tabs.Tab id="profile">Profile</Tabs.Tab>
                            <Tabs.Tab id="password">Update Password</Tabs.Tab>
                            <Tabs.Tab id="delete">Delete Account</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel id="profile">
                            <Card className="w-auto">
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>
                                        Update your account's profile
                                        information and email address.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        auth={auth}
                                        className="max-w-xl"
                                    />
                                </CardContent>
                            </Card>
                        </Tabs.Panel>
                        <Tabs.Panel id="password">
                            <Card className="w-auto">
                                <CardHeader>
                                    <CardTitle>Update Password</CardTitle>
                                    <CardDescription>
                                        Ensure your account is using a long,
                                        random password to stay secure.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <UpdatePasswordForm className="max-w-xl" />
                                </CardContent>
                            </Card>
                        </Tabs.Panel>
                        <Tabs.Panel id="delete">
                            <Card className="w-auto">
                                <CardHeader>
                                    <CardTitle>Delete Account</CardTitle>
                                    <CardDescription>
                                        Once your account is deleted, all of its
                                        resources and data will be permanently
                                        deleted. Before deleting your account,
                                        please download any data or information
                                        that you wish to retain.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DeleteUserForm className="max-w-xl" />
                                </CardContent>
                            </Card>
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

Profile.layout = (page: React.ReactNode) => <AppLayout children={page} />;
