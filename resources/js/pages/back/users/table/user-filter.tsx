export const userFilters = (filterRoles: string[]) => [
    {
        key: "role",
        label: "Role",
        options: filterRoles.map((role) => ({
            label: role,
            value: role,
        })),
    },
];
