import type { MutationResult } from "./types";
import { useApi } from "./use-api";

export function useMutation<TResponse, TPayload>(
    path: string,
    method: "POST" | "PUT" | "PATCH" = "POST"
): MutationResult<TResponse, TPayload> {
    const api = useApi<TResponse>();

    async function mutate(payload: TPayload) {
        return api.execute(path, {
            method,
            body: payload,
        });
    }

    return {
        data: api.data,
        error: api.error,
        loading: api.loading,
        mutate,
    };
}
