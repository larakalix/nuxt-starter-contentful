// https://nuxt.com/docs/api/configuration/nuxt-config
import type { PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";

const {
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT_ID,
    CONTENTFUL_CDA_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = process.env;

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
    runtimeConfig: {
        contentfulSpaceId: CONTENTFUL_SPACE_ID,
        contentfulEnvironmentId: CONTENTFUL_ENVIRONMENT_ID ?? "master",
        contentfulCdaToken: CONTENTFUL_CDA_TOKEN,
        contentfulPreviewToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    },
    plugins: ["./plugins/contentful.ts"],
});
