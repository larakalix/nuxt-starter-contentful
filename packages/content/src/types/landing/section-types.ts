import type { ContentfulType } from "./contentful-types";

export type SectionNavbar = {
    __typename: typeof ContentfulType.NAVBAR;
    sys: Sys;
    name: string;
    sticky?: boolean;
    showBorder?: boolean;
    variant: string;
    linksCollection: {
        items: { label: string; href: string; highlight?: boolean }[];
    };
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

export type SectionBlogCardList = {
    __typename: typeof ContentfulType.BLOG_CARD_LIST;
    sys: Sys;
    colSpan?: number;
    sectionHeading?: SectionHeading;
    description?: string;
    itemsCollection: {
        items: BlogCardListItem[];
    };
    layout?: string;
    columns?: number;
    onNavigate?: (href: string, event?: MouseEvent) => void | Promise<void>;
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

export type Author = {
    __typename: typeof ContentfulType.AUTHOR;
    sys: Sys;
    name: string;
    bio?: string;
    avatar?: SectionImageAsset;
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
    showTocMenu?: boolean;
    authorsCollection?: {
        items: Author[];
    };
    bodyContent: {
        json: any;
    };
};

export type SectionGrid = {
    __typename: typeof ContentfulType.GRID_SECTION;
    sys: Sys;
    class?: string;
    columns?: number;
    tone?: string;
    sectionsCollection: {
        items: SectionType[];
    };
};

export type SectionCtaBanner = {
    __typename: typeof ContentfulType.CTA_BANNER;
    sys: Sys;
    title?: string;
    subtitle?: string;
    label?: string;
    paragraphs?: string;
    tone?: string;
    size?: string;
    class?: string;
    sectionHeading?: SectionHeading;
};

export type FormType =
    | "text"
    | "email"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "date-range"
    | "time"
    | "number"
    | "switch"
    | "password"
    | "tel"
    | "url"
    | "color";

export type FieldValidation = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    email?: boolean;
    errorMessage?: string;
};

export type SectionFormFields = {
    __typename: typeof ContentfulType.FORM_FIELD;
    sys: Sys;
    name: string;
    label?: string;
    description?: string;
    defaultValue?: string | number | boolean | Date;
    type: FormType;
    validation?: FieldValidation;
    placeholder?: string;
    loadCatalogueOptions?: boolean;
    options?: { label: string; value: string }[];
};

export type SectionForm = {
    __typename: typeof ContentfulType.FORM;
    sys: Sys;
    validateOnChange?: boolean;
    fieldsCollection: {
        items: SectionFormFields[];
    };
    variant?: string;
    submitEndpoint?: string;
    submitLabel?: string;
};

export type SectionHeroBanner = {
    __typename: typeof ContentfulType.HERO_BANNER;
    sys: Sys;
    name: string;
    sectionHeading?: SectionHeading;
    description?: string;
    media?: {
        src: string;
        alt: string;
        class?: string;
    };
    actions?: { label: string; href: string }[];
    form?: SectionForm;
};

export type Sys = {
    id: string;
};

export type StructureTemplate = {
    __typename: typeof ContentfulType.TEMPLATE;
    sys: Sys;
    name: string;
    sectionsCollection: {
        items: SectionType[];
    };
};

/*
 * Funnel Page type
 */
export type FunnelPage = {
    __typename: typeof ContentfulType.FUNNEL_PAGE;
    sys: Sys;
    slug: string;
    theme: string;
    showBackButton?: boolean;
    navBar?: SectionNavbar;
    footer?: SectionFooter;
    template: StructureTemplate;
    // This prop renders navbar/footer from sections instead of getting this from funnel page navbar/footer
    skipWrapper?: boolean;
};

export type BlogPostPage = {
    __typename: typeof ContentfulType.BLOG_CARD_LIST_COLLECTION;
    items: SectionType[];
};

export type FunnelGenericPage = {
    page: FunnelPage | null;
};

export type FunnelBlogPostPage = FunnelGenericPage & {
    postPage: BlogPostPage | null;
};

export type SectionType =
    | SectionNavbar
    | SectionFooter
    | SectionBlogCardList
    | SectionGrid
    | SectionCtaBanner
    | SectionHeroBanner
    | SectionForm;
