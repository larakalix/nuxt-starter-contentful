import {
    setupContentful,
    getContentfulClient,
    getContentfulConfig,
} from "@starter/content";

export default defineNuxtPlugin(() => {
    const rc = useRuntimeConfig();

    const cfg = {
        spaceId: rc.contentfulSpaceId,
        environmentId: rc.contentfulEnvironmentId ?? "master",
        cdaToken: rc.contentfulCdaToken,
        previewToken: rc.contentfulPreviewToken,
        preview: false,
    };

    setupContentful(cfg);

    console.log("[NUXT_PLUGIN]", {
        cfg: getContentfulConfig(),
        client: getContentfulClient(),
    });
});
