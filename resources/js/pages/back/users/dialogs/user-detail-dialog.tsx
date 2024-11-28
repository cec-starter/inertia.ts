import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Avatar,
    AvatarImage,
} from "@/components/ui";
import { UserDetailDialogProps, UserType } from "@/types/user";
import { formatDate } from "@/utils/format-date";



export default function UserDetailDialog({
    open,
    user,
    onClose,
}: UserDetailDialogProps) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        Detailed information about the selected user.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="size-16">
                            <AvatarImage
                                src={user.gravatar}
                                alt={user.name}
                                className="rounded-full"
                            />
                        </Avatar>
                        <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <div>
                            <h4 className="text-sm font-medium">Roles</h4>
                            <div className="flex gap-1 mt-1">
                                {user.roles.map((role, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium">Joined Date</h4>
                            <p className="text-sm text-muted-foreground">
                                {formatDate(user.created_at)}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium">
                                Last Updated
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {formatDate(user.updated_at)}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
