import { setupContentful } from "@starter/content";

setupContentful({
    spaceId: import.meta.env.CONTENTFUL_SPACE_ID,
    environmentId: import.meta.env.CONTENTFUL_ENVIRONMENT_ID ?? "master",
    cdaToken: import.meta.env.CONTENTFUL_CDA_TOKEN,
    previewToken: import.meta.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    preview: false,
});
