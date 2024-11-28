import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui";
import { useTheme } from "@/components/theme-provider";
import { IconMoonStar, IconSun } from "justd-icons";

const modes = ["light", "dark", "system"];

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                    <IconSun className="w-10 h-10 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
                    <IconMoonStar className="absolute w-10 h-10 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-1 " align="end">
                {modes.map((mode) => (
                    <DropdownMenuItem
                        key={mode}
                        // @ts-ignore
                        onClick={() => setTheme(mode)}
                        className="capitalize"
                    >
                        {mode}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
