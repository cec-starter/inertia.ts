import { MenuGroupType } from "@/types";
import { IconHome, IconMacbookAir } from "justd-icons";

export const groups: MenuGroupType[] = [
    {
        label: "Application",
        // permission: ["read user"],
        items: [
            {
                title: "Dashboard",
                url: route("dashboard"),
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
                        url: route("permissions.index"),
                        child: "permissions",
                        permission: ["read permission"],
                    },
                    {
                        title: "Roles",
                        url: route("roles.index"),
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
                        url: route("users.index"),
                        child: "users",
                        permission: ["read user"],
                    },
                ],
            },
        ],
    },
];
