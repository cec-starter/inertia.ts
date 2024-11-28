import { AppSidebar, Breadcrumbs, Header } from "@/components";
import { SidebarInset, SidebarProvider, Toaster } from "@/components/ui";
import { useFlashMessage } from "@/hooks/use-flash-message";
import { BreadcrumbType, PagePropsDataType } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import logo from "@/assets/logo.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
    const {
        auth,
        breadcrumbs: rawBreadcrumbs,
        pageModule,
    } = usePage<PagePropsDataType>().props;

    const breadcrumbs: Record<string, BreadcrumbType> =
        rawBreadcrumbs as Record<string, BreadcrumbType>;
    useFlashMessage();

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden">
                <Head>
                    <title>{pageModule?.title}</title>
                    <link rel="icon" href={logo} />
                </Head>
                <Header auth={auth} />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div>{children}</div>
                <Toaster position="top-right" richColors />
            </SidebarInset>
        </SidebarProvider>
    );
}
