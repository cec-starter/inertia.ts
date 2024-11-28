import { SidebarItemData } from "@/types";
import React from "react";

export function useSidebarStatus(location: string, item: SidebarItemData) {
    const isActive = React.useMemo(() => {
        if (!item.child || typeof item.child !== "string") return false;
        return location.includes(item.child);
    }, [location, item.child]);

    const isSubmenuActive = React.useMemo(() => {
        return item.items?.some((subItem) => {
            if (subItem.url) return location.includes(subItem.url);
            if (subItem.child) return location.includes(subItem.child);
            return false;
        });
    }, [location, item.items]);

    return { isActive, isSubmenuActive };
}
