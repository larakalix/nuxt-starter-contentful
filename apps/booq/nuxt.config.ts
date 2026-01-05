// https://nuxt.com/docs/api/configuration/nuxt-config
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    build: {
        transpile: ["contentful-module", "@starter/ui", "@starter/content"],
    },
    typescript: {
        tsConfig: {
            extends: "tsconfig/nuxt.json",
        },
    },
    css: ["@starter/tailwind-config/tailwindcss"],
    vite: {
        ssr: {
            noExternal: ["@starter/content"],
        },
        optimizeDeps: {
            include: ["@starter/ui", "@starter/content"],
        },
        plugins: [tailwindcss() as PluginOption],
    },
});
