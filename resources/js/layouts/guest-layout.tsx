// import ApplicationLogo from '@/components/ApplicationLogo';
import { Logo } from "@/components";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui";
import { Link } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

interface GuestLayoutProps {
    title_header?: string | null;
    description_header?: string | ReactNode | null;
}

export default function Guest({
    title_header,
    description_header,
    children,
}: PropsWithChildren<GuestLayoutProps>) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
            <div className="flex flex-col items-center">
                <Link href="/">
                    <Logo className="size-24" />
                </Link>
                <strong className="font-bold group-data-[collapsible=dock]:hidden">
                    Apple
                </strong>
            </div>

            <div className="w-full max-w-lg px-4 mt-10 md:px-0">
                <div className="relative w-full h-px -mb-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent dark:via-blue-600"></div>
                <Card className="rounded-2xl  border-l-zinc-400/80 border-t-zinc-400/80 border-b-zinc-400 border-r-zinc-400  border-l-[0.5px]  border-t-[0.8px] dark:border-l-blue-600/80 dark:border-t-blue-600/80 dark:border-b-blue-600 dark:border-r-blue-600">
                    <CardHeader>
                        <CardTitle>
                            {title_header ? title_header : "Welcome"}
                        </CardTitle>
                        <CardDescription>
                            {description_header
                                ? description_header
                                : "Login to your account"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </div>
        </div>
    );
}
