interface ImportMetaEnv {
    readonly CONTENTFUL_SPACE_ID: string;
    readonly CONTENTFUL_ENVIRONMENT_ID: string;
    readonly CONTENTFUL_CDA_TOKEN: string;
    readonly CONTENTFUL_PREVIEW_MODE: string;
    readonly CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
