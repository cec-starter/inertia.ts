import { MenuGroupType, MenuItemType, PagePropsDataType } from "@/types";
import { usePage } from "@inertiajs/react";

export function getFilteredMenuGroups(
    groups: MenuGroupType[]
): MenuGroupType[] {
    const { auth } = usePage<PagePropsDataType>().props;
    const userPermissions = auth.permissions;

    const hasPermission = (permissions: string[] = []) => {
        // Jika tidak ada izin yang diberikan, tampilkan (default true)
        if (permissions.length === 0) return true;
        // Periksa jika memiliki salah satu izin
        return permissions.some((permission) =>
            userPermissions.includes(permission)
        );
    };

    const filterItems = (items: MenuItemType[]): MenuItemType[] => {
        return items
            .filter(
                (item) => !item.permission || hasPermission(item.permission)
            ) // Filter berdasarkan izin
            .map((item) => {
                if (item.items) {
                    item.items = filterItems(item.items); // Rekursif untuk submenu
                }
                return item;
            })
            .filter((item) => !item.items || item.items.length > 0); // Hapus item kosong
    };

    return groups
        .filter((group) => !group.permission || hasPermission(group.permission)) // Filter grup berdasarkan izin
        .map((group) => ({
            ...group,
            items: filterItems(group.items),
        }));
}
