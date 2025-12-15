import { setupContentful, getContentfulClient } from "@starter/content";

export default defineNuxtPlugin(() => {
    const rc = useRuntimeConfig();

    const cfg = {
        spaceId: rc.contentfulSpaceId,
        environmentId: rc.contentfulEnvironmentId ?? "master",
        cdaToken: rc.contentfulCdaToken,
        previewToken: rc.contentfulPreviewToken,
        preview: false,
    };

    console.log("[NUXT_PLUGIN]");

    setupContentful(cfg);
});
