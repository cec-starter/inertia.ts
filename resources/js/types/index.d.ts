export type AuthUser = {
    user: AuthenticatedUserData;
    roles: RoleUser;
    permissions: PermissionUser;
};
export type AuthenticatedUser = {
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    gravatar: string;
    created_at: string;
};
export type BreadcrumbType = {
    key: string;
    title: string;
    url?: string;
};
export type FlashMessageType = {
    title: string;
    description: string;
};
export type MenuGroupType = {
    label: string;
    permission?: string[];
    items: MenuItem[];
};
export type MenuItemType = {
    title: string;
    url?: string;
    child?: string;
    icon?: React.ComponentType;
    items?: MenuItem[];
    permission?: string[];
};
export type PageModuleType = {
    title: string;
    method?: string;
    url?: string;
};
export type PagePropsDataType<T = {}> = {
    auth: AuthUser;
    flashMessage: FlashMessageType;
    sidebarItem: SidebarItemData;
    pageModule: PageModuleType;
    breadcrumb: BreadcrumbType;
    location: string;
} & T;
export type SidebarItemData = {
    url: string;
    child: string;
    items: Array<any>;
};

export type RoleUser = {}[];

export type PermissionUser = {}[];

export interface PageSettingProps {
    url: string;
    method: "post" | "put";
}
