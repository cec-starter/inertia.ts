import React from "react";
import { Button } from "./ui/button";
import { IconHome, IconPeople, IconSearch, IconSketchbook } from "justd-icons";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    Dialog,
    DialogContent,
} from "./ui";
import { CreditCard, Link, Settings, User } from "lucide-react";
import { router } from "@inertiajs/react";

export function CommandMenu() {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open: boolean) => !open);
            }
        };

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, [setIsOpen]);

    React.useEffect(() => {
        router.on("navigate", () => {
            setIsOpen(false);
        });
    }, []);

    return (
        <div>
            <CommandMenuButton onClick={() => setIsOpen(true)} />
            <CommandDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                className="fixed max-w-sm p-0 py-2 border overflow-hidden top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:max-w-xl lg:max-w-2xl bg-background"
            >
                <Command className="bg-background">
                    <CommandInput
                        className="flex py-3 w-full h-11 text-lg rounded-md border-0 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Type a command or search..."
                    />
                    <CommandList className="px-2 pb-2">
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Pages" className="mb-2">
                            <CommandItem
                                className="cursor-pointer relative flex gap-2 select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-primary data-[selected=true]:text-accent data-[disabled=true]:opacity-50 [&_svg]:ml-1w [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:data-[selected=true]:text-accent-foreground [&>span]:data-[selected=true]:text-accent [&>span]:dark:data-[selected=true]:text-accent-foreground"
                                onSelect={() => {
                                    router.visit(route("dashboard"));
                                }}
                            >
                                <IconHome />
                                Dashboard
                            </CommandItem>
                            <CommandItem
                                className="cursor-pointer relative flex gap-2 select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-primary data-[selected=true]:text-accent data-[disabled=true]:opacity-50 [&_svg]:ml-1w [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:data-[selected=true]:text-accent-foreground [&>span]:data-[selected=true]:text-accent [&>span]:dark:data-[selected=true]:text-accent-foreground"
                                onSelect={() => {
                                    router.visit(route("roles.index"));
                                }}
                            >
                                <IconSketchbook />
                                Roles
                            </CommandItem>
                            <CommandItem
                                className="cursor-pointer relative flex gap-2 select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-primary data-[selected=true]:text-accent data-[disabled=true]:opacity-50 [&_svg]:ml-1w [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:data-[selected=true]:text-accent-foreground [&>span]:data-[selected=true]:text-accent [&>span]:dark:data-[selected=true]:text-accent-foreground"
                                onSelect={() => {
                                    router.visit(route("permissions.index"));
                                }}
                            >
                                <IconSketchbook />
                                Permissions
                            </CommandItem>
                            <CommandItem
                                className="cursor-pointer relative flex gap-2 select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-primary data-[selected=true]:text-accent data-[disabled=true]:opacity-50 [&_svg]:ml-1w [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:data-[selected=true]:text-accent-foreground [&>span]:data-[selected=true]:text-accent [&>span]:dark:data-[selected=true]:text-accent-foreground"
                                onSelect={() => {
                                    router.visit(route("roles.index"));
                                }}
                            >
                                <IconPeople />
                                Users
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem className="cursor-pointer relative flex gap-2 select-none items-center rounded-xl px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-primary data-[selected=true]:text-accent data-[disabled=true]:opacity-50 [&_svg]:ml-1w [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:data-[selected=true]:text-accent-foreground [&>span]:data-[selected=true]:text-accent [&>span]:dark:data-[selected=true]:text-accent-foreground">
                                <User />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    );
}

function CommandMenuButton(props: React.ComponentPropsWithoutRef<"button">) {
    return (
        <Button
            {...props}
            variant="outline"
            className="relative h-9 w-full justify-start border rounded-[0.5rem] text-sm font-normal text-muted-foreground hidden md:flex md:w-40 lg:w-64 hover:bg-background/80 shadow-[0px_2px_0px_0px_#00000005_inset] dark:shadow-[0px_2px_0px_0px_#FFFFFF05_inset]"
        >
            <IconSearch className="mr-2 w-5 h-5" />
            Search...
            <kbd className="pointer-events-none absolute right-[1.8rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>
            </kbd>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">K</span>
            </kbd>
        </Button>
    );
}
