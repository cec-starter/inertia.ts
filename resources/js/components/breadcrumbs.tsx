import { Link } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui";
import React from "react";
import { BreadcrumbType } from "@/types";

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: Record<string, BreadcrumbType>;
}) {
    const breadcrumbItems = Object.entries(breadcrumbs);
    return (
        <div className="flex justify-between items-center px-4 py-2 border-b shadow-sm backdrop-blur-xl bg-sidebar/60">
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbItems.map(([key, crumb], index) => (
                        <React.Fragment key={key}>
                            <BreadcrumbItem
                                className={
                                    index === 0 ? "text-muted-foreground" : ""
                                }
                            >
                                {crumb.url ? (
                                    <Link href={crumb.url}>{crumb.title}</Link>
                                ) : (
                                    <span className="text-foreground">
                                        {crumb.title}
                                    </span>
                                )}
                            </BreadcrumbItem>
                            {index < breadcrumbItems.length - 1 && (
                                <BreadcrumbSeparator />
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
