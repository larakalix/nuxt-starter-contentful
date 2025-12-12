export enum ContentfulType {
    FUNNEL_PAGE = "FunnelPage",
    TEMPLATE = "Template",
    POSTS = "Posts",
    NAVBAR = "Navbar",
    FOOTER = "Footer",
}

export enum TemplateType {
    GENERIC = "generic",
    BLOG = "blog",
}

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
    socialLinks?: { type: "facebook" | "twitter" | "instagram" | "linkedin"; href: string; label?: string }[];
    newsletterPlaceholder?: string;
    newsletterButtonLabel?: string;
};

export type SectionType = SectionNavbar | SectionFooter;

export type StructureTemplate = {
    __typename: ContentfulType.TEMPLATE;
    id: string;
    sections: SectionType[];
};

export type FunnelPage = {
    __typename: ContentfulType.FUNNEL_PAGE;
    id: string;
    slug: string;
    templateType: TemplateType;
    structure: StructureTemplate;
};
