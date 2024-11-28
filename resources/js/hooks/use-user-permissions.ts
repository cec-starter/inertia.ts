import React from "react";

type PermissionCheck = string | string[];

interface UseUserPermissionsProps {
    permissions: string[];
}

export const useUserPermissions = ({
    permissions,
}: UseUserPermissionsProps) => {
    const hasPermission = React.useMemo(() => {
        return (check: PermissionCheck): boolean => {
            if (!permissions) return false;

            if (Array.isArray(check)) {
                return check.every((permission) =>
                    permissions.includes(permission)
                );
            }

            return permissions.includes(check);
        };
    }, [permissions]);

    const hasAnyPermission = React.useMemo(() => {
        return (check: PermissionCheck): boolean => {
            if (!permissions) return false;

            if (Array.isArray(check)) {
                return check.some((permission) =>
                    permissions.includes(permission)
                );
            }

            return permissions.includes(check);
        };
    }, [permissions]);

    return {
        hasPermission,
        hasAnyPermission,
    };
};
