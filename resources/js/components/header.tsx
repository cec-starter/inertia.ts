import { CommandMenu, ModeToggle, UserNav } from ".";
import { Separator, SidebarTrigger } from "./ui";

export function Header({ auth }: any) {
    return (
        <header className="sticky top-0 flex items-center justify-between h-16 gap-2 border border-b bg-sidebar/60 shrink-0 backdrop-blur-md">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-4 mr-2" />
                <CommandMenu />
            </div>
            <div className="flex items-center justify-center gap-4 px-4">
                <ModeToggle />
                <UserNav auth={auth} />
            </div>
        </header>
    );
}
