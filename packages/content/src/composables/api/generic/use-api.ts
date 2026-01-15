import { ref, type Ref } from "vue";
import { http, type HttpOptions } from "../../../lib/http/http-client";
import type { ApiExecutor, ApiState } from "./types";

const API_CONFIG = {
    baseUrl: "http://localhost:3000/api",
    apiKey: "bq_public_ec40c28225e9545eca8c6290556869f866dd2de64993df0996256602a0513094",
};

export function useApi<T>(): ApiExecutor<T> {
    const data = ref<T | null>(null);
    const error = ref<Error | null>(null);
    const loading = ref(false);

    async function execute(
        path: string,
        options?: HttpOptions
    ): Promise<T | null> {
        loading.value = true;
        error.value = null;

        try {
            const result = await http<T>(
                `${API_CONFIG.baseUrl}${path}`,
                options
            );
            console.log("useApi execute result", result);

            data.value = result;
            return result;
        } catch (err) {
            error.value = err as Error;
            return null;
        } finally {
            loading.value = false;
        }
    }

    return {
        data: data as ApiState<T>["data"],
        error: error as ApiState<T>["error"],
        loading: loading as ApiState<T>["loading"],
        execute,
    };
}
