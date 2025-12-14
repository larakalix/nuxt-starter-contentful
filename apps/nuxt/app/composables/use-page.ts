import type { MaybeRefOrGetter } from "vue";
import { getPageBySlug, type FunnelPage } from "@starter/content";

export const usePage = (
    segments: MaybeRefOrGetter<string[]>,
    server = true
) => {
    const slug = computed(() => {
        const s = toValue(segments);
        return s.length ? s.join("/") : "home";
    });
    const key = `page:${slug}`;

    const handlers: Array<(() => Promise<FunnelPage | null>) | undefined> = [
        undefined,
        () => getPageBySlug(slug.value),
        async () => null,
    ];

    const fetcher = handlers[toValue(segments).length] ?? handlers[1]!;

    return useAsyncData<FunnelPage | null, Error>(key, fetcher, {
        server,
        watch: [slug],
    });
};
