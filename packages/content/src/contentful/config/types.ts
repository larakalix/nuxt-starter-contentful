export type ContentfulEnvConfig = {
    spaceId: string;
    environmentId?: string;
    accessToken?: string;
    previewAccessToken?: string;
    previewMode?: boolean;
};

export type NormalizedContentfulConfig = {
    spaceId: string;
    environmentId: string;
    accessToken?: string;
    previewAccessToken?: string;
    previewMode: boolean;
};

export function normalizeContentfulConfig(
    cfg: ContentfulEnvConfig
): NormalizedContentfulConfig {
    return {
        spaceId: cfg.spaceId,
        environmentId: cfg.environmentId ?? "master",
        accessToken: cfg.accessToken,
        previewAccessToken: cfg.previewAccessToken,
        previewMode: cfg.previewMode ?? false,
    };
}
