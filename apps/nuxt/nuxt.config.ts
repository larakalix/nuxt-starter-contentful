// https://nuxt.com/docs/api/configuration/nuxt-config
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    build: {
        transpile: ["@starter/ui"],
    },
    typescript: {
        tsConfig: {
            extends: "tsconfig/nuxt.json",
        },
    },
    css: ["@starter/tailwind-config/tailwindcss"],
    vite: {
        optimizeDeps: {
            include: ["@starter/ui"],
        },
        plugins: [tailwindcss() as PluginOption],
    },
});
