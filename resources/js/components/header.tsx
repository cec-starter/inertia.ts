import { CommandMenu, ModeToggle, UserNav } from ".";
import { Separator, SidebarTrigger } from "./ui";

export function Header({ auth }: any) {
    return (
        <header className="flex sticky top-0 gap-2 justify-between items-center h-16 border border-b backdrop-blur-md bg-sidebar/60 shrink-0">
            <div className="flex gap-2 items-center px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <CommandMenu />
            </div>
            <div className="flex gap-4 justify-center items-center px-4">
                <ModeToggle />
                <UserNav auth={auth} />
            </div>
        </header>
    );
}
