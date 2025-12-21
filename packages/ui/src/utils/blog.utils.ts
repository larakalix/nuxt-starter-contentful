export const slugify = (input: string) => {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

export const getPlainTextFromNode = (node: any): string => {
    if (!node) return "";
    if (node.nodeType === "text") return node.value ?? "";
    if (Array.isArray(node.content))
        return node.content.map(getPlainTextFromNode).join("");

    return "";
};
