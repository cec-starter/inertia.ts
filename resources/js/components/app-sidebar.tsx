import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    useSidebar,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenu,
    DropdownMenuSeparator,
} from "./ui";
import { Link, router } from "@inertiajs/react";
import { IconChevronRight } from "justd-icons";
import { Logo } from "./logo";
import { useLocationPath } from "@/hooks/use-locationPath";
import { useSidebarStatus } from "@/hooks/use-sidebar-status";
import { groups } from "@/constants/menu-data";
import { getFilteredMenuGroups } from "@/utils/menu-filter";

function SidebarDropdownMenu({ item, location }: any) {
    return (
        <SidebarMenuItem key={item.title}>
            <DropdownMenu>
                <SidebarMenuButton
                    // tooltip={item.title}
                    className="flex justify-between items-center"
                >
                    <DropdownMenuTrigger className="w-full">
                        {item.icon && <item.icon />}
                    </DropdownMenuTrigger>
                </SidebarMenuButton>
                <SidebarMenuSub>
                    <DropdownMenuContent className="relative -top-8 left-10 w-48">
                        <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className="list-none">
                            {item.items.map((subItem: any) => {
                                const { isActive: isSubItemActive } =
                                    useSidebarStatus(location, subItem);

                                return (
                                    <SidebarMenuSubItem
                                        className="pb-1"
                                        key={subItem.title}
                                    >
                                        <SidebarMenuSubButton
                                            asChild
                                            className={
                                                isSubItemActive
                                                    ? "rounded-lg bg-primary text-accent hover:bg-primary/95 hover:text-accent active:bg-primary dark:text-accent-foreground"
                                                    : "text-muted-foreground"
                                            }
                                        >
                                            <Link href={subItem.url ?? ""}>
                                                {subItem.title}
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                );
                            })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </SidebarMenuSub>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}

function SidebarCollapsibleMenu({ item, location }: any) {
    const { isActive, isSubmenuActive } = useSidebarStatus(location, item);

    return (
        <Collapsible
            key={item.title}
            asChild
            defaultOpen={isSubmenuActive}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <IconChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items.map((subItem: any) => {
                            const { isActive: isSubItemActive } =
                                useSidebarStatus(location, subItem);

                            return (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                        asChild
                                        className={
                                            isSubItemActive
                                                ? "rounded-lg bg-primary text-accent hover:bg-primary/95 hover:text-accent active:bg-primary dark:text-accent-foreground"
                                                : "text-muted-foreground"
                                        }
                                    >
                                        <Link href={subItem.url ?? ""}>
                                            {subItem.title}
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            );
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

function SidebarMenuItems({ items, state, location, isMobile }: any) {
    return items.map((item: any) => {
        const { isActive } = useSidebarStatus(location, item);

        if (item.items) {
            if (state === "collapsed" && isMobile === false) {
                return (
                    <SidebarDropdownMenu
                        key={item.title}
                        item={item}
                        location={location}
                    />
                );
            }
            return (
                <SidebarCollapsibleMenu
                    key={item.title}
                    item={item}
                    location={location}
                />
            );
        }

        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    className={
                        isActive
                            ? "rounded-lg bg-primary text-accent hover:bg-primary/95 hover:text-accent active:bg-primary dark:text-accent-foreground"
                            : "text-muted-foreground"
                    }
                >
                    <Link href={item.url ?? ""}>
                        {item.icon && <item.icon />}
                        {state === "expanded" && <span>{item.title}</span>}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    });
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocationPath();
    const { isMobile, state, setOpenMobile } = useSidebar();

    const filteredGroups = getFilteredMenuGroups(groups);

    React.useEffect(() => {
        router.on("navigate", () => {
            setOpenMobile(false);
        });
    }, [setOpenMobile]);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="px-2 h-16 border-b border-sidebar-border">
                <Link className="flex items-center" href={route("dashboard")}>
                    <Logo className="size-10" />
                    <div className="text-sm leading-tight text-left group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold truncate">Apple</span>
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent className="overflow-x-hidden">
                {filteredGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        {state === "expanded" && (
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        )}
                        <SidebarMenu>
                            <SidebarMenuItems
                                items={group.items}
                                state={state}
                                location={location}
                                isMobile={isMobile}
                            />
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
