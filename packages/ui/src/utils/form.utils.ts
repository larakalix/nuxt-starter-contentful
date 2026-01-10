import { z } from "zod";

// Convert Zod issues to a Map keyed by dot paths.
export function zodErrorsToMap(
    result: z.ZodSafeParseResult<any>
): Map<string, string> {
    const map = new Map<string, string>();
    if (result.success) return map;

    for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        const key = path.length ? path : "_form";

        if (!map.has(key)) {
            map.set(key, issue.message);
        }
    }

    return map;
}

// Map -> plain object
export function mapToObject<V>(map: Map<string, V>) {
    const obj: Record<string, V> = {};
    for (const [k, v] of map.entries()) obj[k] = v;
    return obj;
}
