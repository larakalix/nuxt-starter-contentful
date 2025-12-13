import { setupContentful } from "@starter/content";

export default defineNuxtPlugin(() => {
    const {
        contentfulSpaceId,
        contentfulEnvironmentId,
        contentfulCdaToken,
        contentfulPreviewToken,
    } = useRuntimeConfig();

    setupContentful({
        spaceId: contentfulSpaceId,
        environmentId: contentfulEnvironmentId ?? "master",
        cdaToken: contentfulCdaToken,
        previewToken: contentfulPreviewToken,
        preview: false,
    });
});
