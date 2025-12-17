import { getPageBySlug, type FunnelPage } from "@starter/content";

export const usePageStatic = () => {
    const route = useRoute();

    const slug = computed(() => {
        const p = route.params.slug;
        const segments = !p ? [] : Array.isArray(p) ? p : [p];
        return segments.length ? segments.join("/") : "home";
    });

    const key = computed(() => `page:${slug.value}`);

    const asyncData = useAsyncData(
        key, // ✅ computed key (not a function)
        () => getPageBySlug(slug.value),
        {
            // ✅ let Nuxt do SSR on first load, and CSR on navigation
            server: true,
            lazy: false,
            immediate: true,

            // ✅ still refetch when slug changes
            watch: [slug],
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
