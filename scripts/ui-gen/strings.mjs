export function toKebabCase(input) {
    return input
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase();
}

export function toPascalCase(input) {
    return toKebabCase(input)
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("");
}
