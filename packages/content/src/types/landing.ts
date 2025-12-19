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

export type Sys = {
    id: string;
};

export type SectionImageAsset = {
    __typename: typeof ContentfulType.IMAGE_ASSET;
    sys: Sys;
    title: string;
    description: string;
    url: string;
};

export type SectionTag = {
    __typename: typeof ContentfulType.TAG;
    sys: Sys;
    label: string;
    variant?: string;
    color?: string;
    rounded?: string;
    weight?: string;
};

export type SectionHeading = {
    __typename: typeof ContentfulType.HEADING;
    sys: Sys;
    title: string;
    label: string;
    tag?: SectionTag;
    align?: string;
    size?: string;
    colSpan?: number;
};

export type SectionNavbar = {
    __typename: typeof ContentfulType.NAVBAR;
    sys: Sys;
    name: string;
    sticky?: boolean;
    showBorder?: boolean;
    variant: string;
    items: { label: string; href: string }[];
};

export type SectionFooter = {
    __typename: typeof ContentfulType.FOOTER;
    sys: Sys;
    brandPrimary?: string;
    brandSecondary?: string;
    description?: string;
    blogLinks?: { label: string; href: string }[];
    quickLinks?: { label: string; href: string }[];
    socialLinks?: {
        type: "facebook" | "twitter" | "instagram" | "linkedin";
        href: string;
        label?: string;
    }[];
    newsletterPlaceholder?: string;
    newsletterButtonLabel?: string;
};

export type BlogCardListItem = {
    __typename: typeof ContentfulType.BLOG_CARD_LIST_ITEM;
    sys: Sys;
    title?: string;
    author?: SectionImageAsset;
    dateLabel?: string;
    readTimeLabel?: string;
    excerpt?: string;
    image?: SectionImageAsset;
    href?: string;
    tag?: SectionTag;
    layout?: string;
};

export type SectionBlogCardListItemsCollection = {
    items: BlogCardListItem[];
};

export type SectionBlogCardList = {
    __typename: typeof ContentfulType.BLOG_CARD_LIST;
    sys: Sys;
    colSpan?: number;
    sectionHeading?: SectionHeading;
    description?: string;
    itemsCollection: SectionBlogCardListItemsCollection;
    layout?: string;
    columns?: number;
    onNavigate?: (href: string, event?: MouseEvent) => void | Promise<void>;
};

export type SectionGridSectionsCollection = {
    items: SectionType[];
};

export type SectionGrid = {
    __typename: typeof ContentfulType.GRID_SECTION;
    sys: Sys;
    class?: string;
    columns?: number;
    sectionsCollection: SectionGridSectionsCollection;
};

export type SectionCtaBanner = {
    __typename: typeof ContentfulType.CTA_BANNER;
    sys: Sys;
    title?: string;
    subtitle?: string;
    label?: string;
    paragraphs?: string;
    tone?: string;
    class?: string;
    sectionHeading?: SectionHeading;
};

export type SectionType =
    | SectionNavbar
    | SectionFooter
    | SectionBlogCardList
    | SectionGrid
    | SectionCtaBanner;

export type StructureTemplateSectionsCollection = {
    items: SectionType[];
};

export type StructureTemplate = {
    __typename: typeof ContentfulType.TEMPLATE;
    sys: Sys;
    name: string;
    sectionsCollection: StructureTemplateSectionsCollection;
};

/*
 * Funnel Page type
 */
export type FunnelPage = {
    __typename: typeof ContentfulType.FUNNEL_PAGE;
    sys: Sys;
    slug: string;
    theme: string;
    navBar?: SectionNavbar;
    footer?: SectionFooter;
    template: StructureTemplate;
    // This prop renders navbar/footer from sections instead of getting this from funnel page navbar/footer
    skipWrapper?: boolean;
};
