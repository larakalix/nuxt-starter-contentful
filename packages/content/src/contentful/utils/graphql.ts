function isPlainObject(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function gqlValue(v: unknown): string {
    if (v === null) return "null";
    if (typeof v === "string") return JSON.stringify(v);
    if (typeof v === "number" || typeof v === "boolean") return String(v);

    if (Array.isArray(v)) return `[${v.map(gqlValue).join(", ")}]`;

    if (isPlainObject(v)) {
        const entries = Object.entries(v)
            .filter(([, val]) => typeof val !== "undefined")
            .map(([k, val]) => `${k}: ${gqlValue(val)}`);
        return `{ ${entries.join(", ")} }`;
    }

    // For unsupported types (Date, bigint, function, etc.), force callers to serialize.
    throw new Error(
        `Unsupported GraphQL input value type: ${Object.prototype.toString.call(
            v
        )}`
    );
}

export function toCollectionField(contentType: string): string {
    // Accept "BlogPost", "blogPost", "blog-post", "blog_post" and convert to "blogPostCollection"
    const cleaned = contentType
        .replace(/[_-]+(.)/g, (_, ch: string) => ch.toUpperCase())
        .replace(/^\w/, (ch) => ch.toLowerCase());

    return `${cleaned}Collection`;
}
