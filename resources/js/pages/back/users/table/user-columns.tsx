import { Avatar, AvatarImage, Badge } from "@/components/ui";
import { formatDate, formatRelativeTime } from "@/utils/format-date";
import { UserType } from "@/types/user";

export const userColumns = (handleClick?: (user: UserType) => void) => [
    {
        key: "name",
        label: "Name",
        sortable: true,
        render: (user: UserType) => (
            <div
                className="flex gap-2 items-center p-1"
                onClick={() => handleClick?.(user)}
            >
                <Avatar>
                    <AvatarImage
                        className="rounded-full size-10"
                        src={user.gravatar}
                        alt={user.name}
                    />
                </Avatar>
                <span className="ml-2">{user.name}</span>
            </div>
        ),
    },
    {
        key: "email",
        label: "Email",
        sortable: true,
        render: (user: UserType) => (
            <div
                className="flex gap-2 items-center p-1"
                onClick={() => handleClick?.(user)}
            >
                {user.email}
            </div>
        ),
    },
    {
        key: "roles",
        label: "Roles",
        render: (user: UserType) => (
            <div className="flex gap-1.5">
                {user.roles.map((role, index) => (
                    <Badge
                        key={index}
                        variant="outline"
                        className="px-2 py-1 text-xs font-medium rounded-full border border-primary text-primary bg-primary/15"
                    >
                        {role}
                    </Badge>
                ))}
            </div>
        ),
    },
    {
        key: "created_at",
        label: "Joined",
        sortable: true,
        render: (user: UserType) => (
            <span title={formatDate(user.created_at)}>
                {formatRelativeTime(user.created_at)}
            </span>
        ),
    },
];
