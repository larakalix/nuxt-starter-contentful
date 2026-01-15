import { onMounted, watch } from "vue";
import { useApi } from "./use-api";
import type { QueryResult } from "./types";

export function useQuery<T>(
    key: () => string,
    options: { enabled?: boolean } = {}
): QueryResult<T> {
    const api = useApi<T>();
    const enabled = options.enabled ?? true;

    async function refetch() {
        return api.execute(key());
    }

    if (enabled) {
        onMounted(refetch);
        watch(key, refetch);
    }

    return {
        data: api.data,
        error: api.error,
        loading: api.loading,
        refetch,
    };
}
