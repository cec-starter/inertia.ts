import ReactDOMServer from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { route } from "ziggy-js";
import { Ziggy as ziggy } from "@/ziggy";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Define route globally before server creation
// @ts-expect-error
globalThis.route = (name: string, params?: any, absolute?: boolean) => {
    // @ts-expect-error
    return route(name, params, absolute, ziggy);
};

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob("./pages/**/*.tsx")
            ),
        setup: ({ App, props }) => {
            // Update route with correct location
            // @ts-expect-error
            globalThis.route = (name: string, params?: any, absolute?: boolean) => {
                // @ts-expect-error
                return route(name, params, absolute, {
                    ...ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.location),
                });
            };

            return <App {...props} />;
        },
    })
);
