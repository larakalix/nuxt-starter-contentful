import { getPageBySlug, type FunnelPage } from "@starter/content";

export const usePage = (segments: string[], server = true) => {
    const slug = segments.length ? segments.join("/") : "home";
    const key = `page:${slug}`;

    const handlers: Array<(() => Promise<FunnelPage | null>) | undefined> = [
        undefined,
        () => getPageBySlug(slug),
        async () => null,
    ];

    const fetcher = handlers[segments.length] ?? handlers[1]!;

    return useAsyncData<FunnelPage | null, Error>(key, fetcher, { server });
};
