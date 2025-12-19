import { pickResolver } from "@starter/content/utils";

export const usePageStatic = () => {
    const route = useRoute();

    const segments = computed<string[]>(() => {
        const p = route.params.slug;
        return !p ? [] : Array.isArray(p) ? p : [p];
    });

    const slug = computed(() =>
        segments.value.length ? segments.value.join("/") : "home"
    );

    const resolver = computed(() =>
        pickResolver({ slug: slug.value, segments: segments.value })
    );

    const asyncData = useAsyncData(
        () => resolver.value.key,
        () =>
            resolver.value.load({ slug: slug.value, segments: segments.value }),
        {
            server: true,
            lazy: false,
            immediate: true,
            watch: [segments],
        }
    );

    return {
        slug,
        funnelPage: asyncData.data,
        pending: asyncData.pending,
        error: asyncData.error,
        refresh: asyncData.refresh,
    };
};
