import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { FlashMessageType } from "@/types";

export function useFlashMessage() {
    const { flashMessage } = usePage<{ flashMessage: FlashMessageType }>()
        .props;

    useEffect(() => {
        if (flashMessage && flashMessage.title && flashMessage.description) {
            const type = flashMessage.title.toLowerCase() as
                | "success"
                | "error"
                | "warning"
                | "info";

            toast[type](flashMessage.title, {
                description: flashMessage.description,
            });
        }
    }, [flashMessage]);
}
