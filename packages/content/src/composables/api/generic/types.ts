import type { Ref } from "vue";
import type { HttpOptions } from "../../../lib/http/http-client";

export interface ApiState<T> {
    data: Ref<T | null>;
    error: Ref<Error | null>;
    loading: Ref<boolean>;
}

export interface ApiExecutor<T> extends ApiState<T> {
    execute: (path: string, options?: HttpOptions) => Promise<T | null>;
}

export interface QueryResult<T> extends ApiState<T> {
    refetch: () => Promise<T | null>;
}

export interface MutationResult<TResponse, TPayload>
    extends ApiState<TResponse> {
    mutate: (payload: TPayload) => Promise<TResponse | null>;
}
