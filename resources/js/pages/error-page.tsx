import { CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { MinimalLayout } from "@/layouts/minimal-layout";
import { Head } from "@inertiajs/react";

export default function ErrorPage({ status }: { status: string }) {
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <div>
            <Head title={title} />
            <div className="flex items-center justify-center text-white bg-black min-h-svh">
                <CardHeader className="w-full max-w-xl border rounded-2xl">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-zinc-400">{description}</CardDescription>
                </CardHeader>
            </div>
        </div>
    );
}

ErrorPage.layout = (page: any) => <MinimalLayout children={page} />;
