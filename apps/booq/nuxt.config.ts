// https://nuxt.com/docs/api/configuration/nuxt-config
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    components: [
        {
            path: "@starter/ui/atoms",
            prefix: "Ui",
        },
        {
            path: "@starter/ui/organisms",
            prefix: "Ui",
        },
        {
            path: "@starter/ui/molecules",
            prefix: "Ui",
        },
    ],
    devtools: { enabled: true },
    build: {
        transpile: ["contentful-module", "@starter/ui", "@starter/content"],
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
            noExternal: ["@starter/content"],
        },
        optimizeDeps: {
            include: ["@starter/ui", "@starter/content"],
        },
        plugins: [tailwindcss() as PluginOption],
    },
});
