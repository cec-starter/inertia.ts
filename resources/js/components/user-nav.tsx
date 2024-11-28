import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "./ui";
import { Link, router } from "@inertiajs/react";

export function UserNav({ auth }: any) {
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                router.visit(route("profile.index"));
            }
        };

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, []);

    const platform = navigator.platform;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="relative w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={auth.user.gravatar} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-1" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {auth.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {auth.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={route("profile.index")}>
                        <DropdownMenuItem>
                            Profile
                            <DropdownMenuShortcut>
                                {platform === "MacIntel" ? "⌘P" : "Ctrl+P"}
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        router.post(route("logout"));
                    }}
                >
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
