import type { Next } from "@contentful/rich-text-html-renderer";
import {
    BLOCKS,
    MARKS,
    type Block,
    type Inline,
} from "@contentful/rich-text-types";
import { slugify, getPlainTextFromNode } from "./../../../utils/blog.utils";
import { getEntryById } from "../../../../../content/src/contentful/services/entries";

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

function renderTable(node: Block, next: Next) {
    const rows = node.content ?? [];
    const headRow = rows[0];
    const bodyRows = rows.slice(1);

    const renderRow = (row: any, asHeader = false) => {
        const cells = row.content ?? [];

        const renderedCells = cells
            .map((cell: any) => {
                const inner = next(cell.content);

                return asHeader
                    ? `<th class="px-2 py-4 text-xs font-semibold text-primary [&>p]:text-center [&>p]:m-0 [&>p]:text-primary [&>p]:leading-snug">${inner}</th>`
                    : `<td class="px-2 py-4 border-r  border-table-header last:border-none text-sm text-muted-foreground [&>p]:text-center [&>p]:m-0 [&>p]:leading-snug">${inner}</td>`;
            })
            .join("");
        return `

    <tr class="${
        asHeader ? "" : "odd:bg-table-odd even:bg-table-even"
    }">${renderedCells}</tr>`;
    };

    const thead = headRow
        ? `<thead class="bg-table-header text-primary">${renderRow(
              headRow,
              true
          )}</thead>`
        : "";

    const tbody = bodyRows.length
        ? `<tbody>${bodyRows.map((r) => renderRow(r, false)).join("")}</tbody>`
        : "";

    return `
    <div class="my-4 overflow-x-auto rounded-sm">
      <table class="w-full border-collapse">
        ${thead}
        ${tbody}
      </table>
    </div>
  `;
}

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
        [BLOCKS.TABLE]: (node: Block | Inline, next: Next) => {
            return renderTable(node as Block, next);
        },
        [BLOCKS.TABLE_ROW]: (_node: Block | Inline, next: Next) =>
            next((_node as any).content),
        [BLOCKS.TABLE_CELL]: (node: Block | Inline, next: Next) =>
            `<td class="px-4 py-3 text-sm text-muted-foreground text-center">${next(
                (node as any).content
            )}</td>`,
        [BLOCKS.TABLE_HEADER_CELL]: (node: Block | Inline, next: Next) =>
            `<th class="px-4 py-3 text-xs font-semibold text-muted-foreground text-center">${next(
                (node as any).content
            )}</th>`,
        [BLOCKS.QUOTE]: (node: Block | Inline, next: Next) => {
            return `
                <blockquote
                    class="
                        group relative my-8 rounded-md bg-secondary/40 px-6 py-5
                        text-sm text-muted-foreground
                        [&>p]:m-0
                        [&>p]:leading-relaxed
                        [&>p]:italic
                    "
                >
                <span
                    aria-hidden="true"
                    class="
                    absolute -top-3 left-4 text-6xl font-serif
                    text-primary/60 group-hover:text-primary/90">
                    “
                    </span>
                ${next(node.content)}
                </blockquote>
            `;
        },
        // [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
        //     const target = node.data?.target;
        //     const id = target?.sys?.id || "";

        //     if (!id) return "";

        //     return JSON.stringify({ id }, null, 2);
        // },
    },
};
