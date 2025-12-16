import type { MaybeRefOrGetter } from "vue";
import { getPageBySlug, type FunnelPage } from "@starter/content";

export const usePageStatic = () => {
    const route = useRoute();

    const slug = computed(() => {
        const p = route.params.slug;

        const segments = !p ? [] : Array.isArray(p) ? p : [p];

        return segments.length ? segments.join("/") : "home";
    });

    watch(slug, (v) => console.log("[SLUG_PAGE] slug changed ->", v), {
        immediate: true,
    });

    // ✅ also verify the route actually changes
    watch(
        () => route.fullPath,
        (v) => console.log("[SLUG_PAGE] route changed ->", v),
        { immediate: true }
    );

    const {
        data: funnelPage,
        pending,
        error,
        refresh,
    } = useAsyncData<FunnelPage | null>(
        () => `page:${slug.value}`,
        () => getPageBySlug(slug.value),
        {
            server: true,
            watch: [slug],
        }
    );

    return {
        slug,
        funnelPage,
        pending,
        error,
        refresh,
    };
};
