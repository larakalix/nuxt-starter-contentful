import { ref, onMounted } from "vue";
import { getLandingPage, type FunnelPage } from "@starter/content";

export function useLandingPage(slug: string) {
    const data = ref<FunnelPage | null>(null);
    const pending = ref(true);
    const error = ref<Error | null>(null);

    const load = async () => {
        pending.value = true;
        error.value = null;

        try {
            data.value = await getLandingPage(slug);
        } catch (err) {
            error.value = err as Error;
            data.value = null;
        } finally {
            pending.value = false;
        }
    };

    onMounted(load);

    return {
        data,
        pending,
        error,
        refresh: load,
    };
}
