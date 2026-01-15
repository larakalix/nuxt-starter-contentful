export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: unknown;
    signal?: AbortSignal;
}

export async function http<T>(
    url: string,
    options: HttpOptions = {}
): Promise<T> {
    const res = await fetch(url, {
        method: options.method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: options.signal,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }

    return res.json() as Promise<T>;
}
