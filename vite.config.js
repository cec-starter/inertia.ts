import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { watch } from "vite-plugin-watch";
import { resolve } from "path";

const laravelConfig = {
    input: "resources/js/app.tsx",
    ssr: "resources/js/ssr.tsx",
    refresh: true,
};

const watchConfigs = [
    {
        pattern: "routes/**/*.php",
        command: "php artisan ziggy:generate",
    },
    {
        pattern: "routes/**/*.php",
        command: "php artisan optimize",
    },
];

export default defineConfig({
    plugins: [
        laravel(laravelConfig),
        react(),
        ...watchConfigs.map((config) => watch(config)),
    ],
    resolve: {
        alias: {
            "ziggy-js": resolve("vendor/tightenco/ziggy/dist"),
            "@": resolve("resources/js"),
        },
    },
});

