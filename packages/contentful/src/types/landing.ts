export enum ContentfulType {
    FUNNEL_PAGE = "FunnelPage",
    TEMPLATE = "Template",
    HEADING = "Heading",
    BLOG_CARD_LIST = "BlogCardListSection",
    BLOG_CARD_LIST_ITEM = "BlogCardListItem",
    NAVBAR = "Navbar",
    FOOTER = "Footer",
    TAG = "Tag",
    IMAGE_ASSET = "Asset",
}

export enum TemplateType {
    GENERIC = "generic",
    BLOG = "blog",
}

export type SectionImageAsset = {
    __typename: ContentfulType.IMAGE_ASSET;
    title: string;
    description: string;
    url: string;
};

export type SectionTag = {
    __typename: ContentfulType.TAG;
    id: string;
    label: string;
    variant?: string;
    color?: string;
    rounded?: string;
    weight?: string;
};

export type SectionHeading = {
    __typename: ContentfulType.HEADING;
    id: string;
    title: string;
    label: string;
    tag?: SectionTag;
    align?: string;
    size?: string;
};

export type SectionNavbar = {
    __typename: ContentfulType.NAVBAR;
    id: string;
    variant: string;
    items: { label: string; href: string }[];
};

export type SectionFooter = {
    __typename: ContentfulType.FOOTER;
    id: string;
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
    __typename: ContentfulType.BLOG_CARD_LIST_ITEM;
    id: string;
    title?: string;
    // authorName?: string;
    // authorAvatarSrc?: string;
    author?: SectionImageAsset;
    dateLabel?: string;
    readTimeLabel?: string;
    layout?: string;
    columns?: number;
    excerpt?: string;
    image?: SectionImageAsset;
    href?: string;
    tag?: SectionTag;
};

export type SectionBlogCardList = {
    __typename: ContentfulType.BLOG_CARD_LIST;
    id: string;
    heading?: SectionHeading;
    description?: string;
    items: BlogCardListItem[];
    layout?: string;
    columns?: number;
};

export type SectionType = SectionNavbar | SectionFooter | SectionBlogCardList;

export type StructureTemplate = {
    __typename: ContentfulType.TEMPLATE;
    id: string;
    sections: SectionType[];
};

/*
 * Funnel Page type
 */
export type FunnelPage = {
    __typename: ContentfulType.FUNNEL_PAGE;
    id: string;
    slug: string;
    templateType: TemplateType;
    structure: StructureTemplate;
};
