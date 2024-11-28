import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import AppLayout from "./layouts/app-layout";
import { ThemeProvider } from "./components/theme-provider";
import { Ziggy } from "@/ziggy";
import { useRoute } from "ziggy-js";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx")
        );

        page.then((module: any) => {
            if (!module.default.layout) {
                module.default.layout = (page: any) => (
                    <AppLayout>{page}</AppLayout>
                );
            }
        });

        return page;
    },

    setup({ el, App, props }) {
        // @ts-expect-error
        window.route = useRoute(Ziggy as any);
        const appElement = (
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App {...props} />
            </ThemeProvider>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, appElement);
            return;
        }

        createRoot(el).render(appElement);
    },
    progress: {
        color: "#2563EB",
        delay: 0,
        includeCSS: true,
        showSpinner: false,
    },
});
