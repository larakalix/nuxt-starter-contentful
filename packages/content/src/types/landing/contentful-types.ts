export type ContentfulEntry<T> = T & {
    __typename?: string;
    sys: { id: string };
};

export type ContentfulCollectionResponse<K extends string, T> = {
    [P in K]?: { items?: T[]; total?: number; limit?: number; skip?: number };
};

export const ContentfulType = {
    FUNNEL_PAGE: "FunnelPage",
    TEMPLATE: "Template",
    HEADING: "Heading",
    BLOG_CARD_LIST: "BlogCardList",
    BLOG_CARD_LIST_COLLECTION: "BlogCardListCollection",
    BLOG_CARD_LIST_ITEM: "BlogCardListItem",
    NAVBAR: "Navbar",
    FOOTER: "Footer",
    TAG: "Tag",
    IMAGE_ASSET: "Asset",
    GRID_SECTION: "GridSection",
    CTA_BANNER: "CtaBanner",
} as const;

export type ContentfulType =
    (typeof ContentfulType)[keyof typeof ContentfulType];

export const TemplateType = {
    GENERIC: "generic",
    BLOG: "blog",
} as const;

export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType];
