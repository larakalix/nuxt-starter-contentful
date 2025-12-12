// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    build: {
        transpile: ["@starter/ui"],
    },
    typescript: {
        tsConfig: {
            extends: "@starter/tsconfig/app.json",
        },
    },
    css: ["@starter/tailwind-config/tailwindcss"],
    vite: {
        optimizeDeps: {
            include: ["@starter/ui"],
        },
    },
});
