import { usePage } from "@inertiajs/react";
import React from "react";

export function useLocationPath() {
    const { props } = usePage<{ location?: string }>();
    const location = props.location ?? "";
    return React.useMemo(() => location, [location]);
}

