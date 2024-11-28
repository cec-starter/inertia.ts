import { Card, Container } from "@/components/ui";
import AppLayout from "@/layouts/app-layout";
import { IconPeople, IconListBullets } from "justd-icons";
import { Link } from "@inertiajs/react";

const DashboardCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    href,
}: {
    title: string;
    value: string | number;
    subtitle: string;
    icon: any;
    href?: string;
}) => {
    const CardWrapper = ({ children }: { children: React.ReactNode }) =>
        href ? <Link href={href}>{children}</Link> : <div>{children}</div>;

    return (
        <CardWrapper>
            <Card className="flex relative p-4 rounded-xl ring-1 ring-inset transition duration-200 cursor-pointer group focus:outline-none focus-visible:ring-primary ring-border hover:ring-input hover:bg-secondary/20">
                <div className="grid relative place-content-center w-32">
                    <div className="absolute top-1/2 left-1/2 blur-3xl -translate-x-1/2 -translate-y-1/2 size-10 dark:bg-zinc-400" />
                    <div className="z-20 rounded-full transition size-10 grid place-content-center border group-hover:border-foreground/25 border-border bg-tertiary/60 group-hover:bg-bg [box-shadow:0px_0px_1px_0px_hsl(var(--foreground))]">
                        <Icon className="size-4 text-muted-foreground group-hover:text-foreground" />
                    </div>
                    <div className="absolute inset-x-0 top-6 w-full h-px border-b border-dashed" />
                    <div className="absolute inset-x-0 bottom-6 w-full h-px border-b border-dashed" />
                    <div className="absolute inset-y-0 left-8 w-px h-full border-r border-dashed" />
                    <div className="absolute inset-y-0 right-8 w-px h-full border-r border-dashed" />
                </div>
                <div className="p-6">
                    <h4 className="font-mono text-base font-medium tracking-normal text-foreground sm:text-xl">
                        {value}
                    </h4>
                    <small className="block mt-2 text-muted-foreground">
                        {subtitle}
                    </small>
                </div>
            </Card>
        </CardWrapper>
    );
};

export default function Dashboard({
    userCount,
    roleCount,
    permissionCount,
}: {
    userCount: number;
    roleCount: number;
    permissionCount: number;
}) {
    return (
        <Container>
            <div className="grid p-1.5 mt-4 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                    title="Users"
                    value={userCount}
                    subtitle="Users"
                    icon={IconPeople}
                    href="/users"
                />
                <DashboardCard
                    title="Roles"
                    value={roleCount}
                    subtitle="Roles"
                    icon={IconListBullets}
                    href="/roles"
                />
                <DashboardCard
                    title="Permissions"
                    value={permissionCount}
                    subtitle="Permissions"
                    icon={IconListBullets}
                    href="/permissions"
                />
            </div>
        </Container>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout children={page} />;
