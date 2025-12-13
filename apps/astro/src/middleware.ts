import { setupContentful, getContentfulConfig } from "@starter/content";
import { defineMiddleware } from "astro:middleware";

const {
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT_ID,
    CONTENTFUL_CDA_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = import.meta.env;

const state = {
    initialized: false,
    config: {
        spaceId: CONTENTFUL_SPACE_ID,
        environmentId: CONTENTFUL_ENVIRONMENT_ID ?? "master",
        cdaToken: CONTENTFUL_CDA_TOKEN,
        previewToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
        preview: false,
    },
};

export const onRequest = defineMiddleware((context, next) => {
    if (!state.initialized) {
        setupContentful(state.config);

        state.initialized = true;
    }

    return next();
});
