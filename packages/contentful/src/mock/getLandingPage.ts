import { ContentfulType, FunnelPage, TemplateType } from "../types/landing";

export const getLandingPage = (slug: string): FunnelPage | null => {
    if (!slug || slug.trim() === "") return null;

    const pages: Record<string, FunnelPage> = {
        home: HomeFunnelPage,
    };

    return pages[slug];
};

const HomeFunnelPage: FunnelPage = {
    __typename: ContentfulType.FUNNEL_PAGE,
    id: "1",
    slug: "home",
    templateType: TemplateType.GENERIC,
    structure: {
        __typename: ContentfulType.TEMPLATE,
        id: "template-1",
        sections: [
            {
                __typename: ContentfulType.NAVBAR,
                id: "navbar-1",
                variant: "secondary",
                items: [
                    { label: "Home", href: "/" },
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                ],
            },
            {
                __typename: ContentfulType.FOOTER,
                id: "footer-1",
                brandPrimary: "#000000",
                brandSecondary: "#FFFFFF",
                description: "This is a sample footer description.",
                blogLinks: [
                    { label: "Blog Post 1", href: "/blog/post-1" },
                    { label: "Blog Post 2", href: "/blog/post-2" },
                ],
                quickLinks: [
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Service", href: "/terms" },
                ],
                socialLinks: [
                    { type: "facebook", href: "https://facebook.com" },
                    { type: "twitter", href: "https://twitter.com" },
                ],
                newsletterPlaceholder: "Enter your email",
                newsletterButtonLabel: "Subscribe",
            },
        ],
    },
};
