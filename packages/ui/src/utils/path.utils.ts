type PathPart = string | number;

function isIndex(part: string) {
    return /^\d+$/.test(part);
}

/**
 * Splits dot notation paths.
 * Supports "items.0.name" and "items[0].name" if you pass bracket notation too.
 */
export function parsePath(path: string): PathPart[] {
    // convert brackets to dots: items[0].name -> items.0.name
    const normalized = path.replace(/\[(\d+)\]/g, ".$1").replace(/^\./, "");
    return normalized
        .split(".")
        .filter(Boolean)
        .map((p) => (isIndex(p) ? Number(p) : p));
}

export function getByPath<T = any>(obj: any, path: string): T {
    const parts = parsePath(path);
    let cur = obj;

    for (const key of parts) {
        if (cur == null) return undefined as T;
        cur = cur[key as any];
    }

    return cur as T;
}

export function setByPath(obj: any, path: string, value: any): void {
    const parts = parsePath(path);
    if (parts.length === 0) return;

    let cur = obj;

    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        const nextKey = parts[i + 1];

        if (cur[key as any] == null) {
            // decide whether next container is array or object
            cur[key as any] = typeof nextKey === "number" ? [] : {};
        }

        cur = cur[key as any];
    }

    const last = parts[parts.length - 1];
    cur[last as any] = value;
}

/**
 * Optional helper: ensure consistent "dot" path keys for Maps
 */
export function normalizePath(path: string) {
    return path.replace(/\[(\d+)\]/g, ".$1").replace(/^\./, "");
}
