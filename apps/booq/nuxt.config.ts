// https://nuxt.com/docs/api/configuration/nuxt-config
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    build: {
        transpile: ["contentful-module"],
    },
    typescript: {
        tsConfig: {
            extends: "tsconfig/nuxt.json",
        },
    },
    css: [
        "@starter/tailwind-config/tailwindcss",
        "@starter/ui/styles/date-picker",
    ],
    vite: {
        ssr: {
            noExternal: [],
        },
        optimizeDeps: {
            include: [],
        },
        plugins: [tailwindcss() as PluginOption],
    },
});
