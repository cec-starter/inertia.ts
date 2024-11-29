import { MenuGroupType } from "@/types";
import { IconHome, IconMacbookAir } from "justd-icons";

export const groups: MenuGroupType[] = [
    {
        label: "Application",
        // permission: ["read user"],
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: IconHome,
                child: "dashboard",
            },
        ],
    },
    {
        label: "Settings",
        permission: ["read permission", "read role"],
        items: [
            {
                title: "Access Control List",
                icon: IconMacbookAir,
                permission: ["read permission", "read role"],
                items: [
                    {
                        title: "Permissions",
                        url: "/permissions",
                        child: "permissions",
                        permission: ["read permission"],
                    },
                    {
                        title: "Roles",
                        url: "/roles",
                        child: "roles",
                        permission: ["read role"],
                    },
                ],
            },
            {
                title: "Management",
                icon: IconMacbookAir,
                permission: [ "read user"],
                items: [
                    {
                        title: "Users",
                        url: "/users",
                        child: "users",
                        permission: ["read user"],
                    },
                ],
            },
        ],
    },
];
