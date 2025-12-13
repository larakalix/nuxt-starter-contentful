import { getPageBySlug, type FunnelPage } from "@starter/content";

export const useLandingPage = (slug: string) => {
    return useAsyncData<FunnelPage | null, Error>(
        `funnel:${slug}`,
        async () => await getPageBySlug(slug),
        {
            server: true,
        }
    );
};
