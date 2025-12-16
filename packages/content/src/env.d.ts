/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly CONTENTFUL_SPACE_ID: string;
    readonly CONTENTFUL_ENVIRONMENT_ID: string;
    readonly CONTENTFUL_CDA_TOKEN: string;
    readonly CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
    readonly CONTENTFUL_PREVIEW_MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
