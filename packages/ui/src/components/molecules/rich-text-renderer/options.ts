import type { Next } from "@contentful/rich-text-html-renderer";
import {
    BLOCKS,
    MARKS,
    type Block,
    type Inline,
} from "@contentful/rich-text-types";
import { slugify, getPlainTextFromNode } from "./../../../utils/blog.utils";

const idCount = new Map<string, number>();

const uniqueIdFromTitle = (title: string) => {
    const base = slugify(title) || "section";
    const prev = idCount.get(base) ?? 0;
    const next = prev + 1;
    idCount.set(base, next);
    return next === 1 ? base : `${base}-${next}`;
};

const getHeadingProps = (node: Block | Inline) => {
    const title = getPlainTextFromNode(node);
    const id = uniqueIdFromTitle(title);

    return { id };
};

const escapeHtml = (v: string) => {
    return v
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#039;");
};

export const options = {
    renderMark: {
        [MARKS.BOLD]: (text: string) =>
            `<strong class="font-semibold">${text}</strong>`,
        [MARKS.ITALIC]: (text: string) => `<em class="italic">${text}</em>`,
        [MARKS.CODE]: (text: string) =>
            `<code class="rounded bg-muted px-1 py-0.5 text-sm">${escapeHtml(
                text
            )}</code>`,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: Block | Inline, next: Next) =>
            `<p class="mb-4 leading-4 text-sm md:text-md text-muted-foreground leading-relaxed">${next(
                node.content
            )}</p>`,
        [BLOCKS.HEADING_1]: (node: Block | Inline, next: Next) => {
            const { id } = getHeadingProps(node);

            return `<h1 id="${id}" class="mb-6 text-4xl text-foreground font-semibold leading-tight tracking-tight">${next(
                node.content
            )}</h1>`;
        },
        [BLOCKS.HEADING_2]: (node: Block | Inline, next: Next) => {
            const { id } = getHeadingProps(node);

            return `<h2 id="${id}" class="mb-5 text-3xl text-foreground font-semibold leading-tight tracking-tight">${next(
                node.content
            )}</h2>`;
        },
        [BLOCKS.HEADING_3]: (node: Block | Inline, next: Next) => {
            const { id } = getHeadingProps(node);

            return `<h3 id="${id}" class="mb-3 text-2xl text-foreground font-semibold leading-tight tracking-tight">${next(
                node.content
            )}</h3>`;
        },
        [BLOCKS.HEADING_4]: (node: Block | Inline, next: Next) => {
            const { id } = getHeadingProps(node);

            return `<h4 id="${id}" class="mb-2 text-xl text-foreground font-semibold leading-tight tracking-tight">${next(
                node.content
            )}</h4>`;
        },
        [BLOCKS.HEADING_5]: (node: Block | Inline, next: Next) => {
            const { id } = getHeadingProps(node);

            return `<h5 id="${id}" class="mb-2 text-lg text-foreground font-semibold leading-tight tracking-tight">${next(
                node.content
            )}</h5>`;
        },
        [BLOCKS.HEADING_6]: (node: Block | Inline, next: Next) => {
            const { id } = getHeadingProps(node);

            return `<h6 id="${id}" class="mb-2 text-md text-foreground font-semibold leading-tight tracking-tight">${next(
                node.content
            )}</h6>`;
        },
        [BLOCKS.HR]: () => `<hr class="my-2 md:my-4 border-primary/20" />`,
        [BLOCKS.UL_LIST]: (node: Block | Inline, next: Next) =>
            `<ul class="ml-6 list-disc marker:text-primary">${next(
                node.content
            )}</ul>`,
        [BLOCKS.OL_LIST]: (node: Block | Inline, next: Next) =>
            `<ol class="ml-6 list-decimal">${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node: Block | Inline, next: Next) =>
            `<li class="mb-0">${next(node.content)}</li>`,
    },
};
