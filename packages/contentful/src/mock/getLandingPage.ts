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
                __typename: ContentfulType.BLOG_CARD_LIST,
                id: "blog-card-list-1",
                heading: {
                    __typename: ContentfulType.HEADING,
                    id: "heading-1",
                    title: "Latest Blog Posts",
                    label: "Blog",
                },
                description: "Check out our latest blog posts.",
                items: [
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        id: "blog-card-1",
                        tag: {
                            __typename: ContentfulType.TAG,
                            id: "tag-1",
                            label: "Technology",
                            variant: "solid",
                            color: "primary",
                            rounded: "sm",
                        },
                        title: "Exploring the Future of AI: Trends to Watch in 2024",
                        image: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Futuristic AI concept image",
                            description:
                                "An image representing futuristic AI concepts.",
                            url: "https://plus.unsplash.com/premium_photo-1661962958462-9e52fda9954d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhhaWxhbmR8ZW58MHx8MHx8fDA%3D",
                        },
                        author: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Jane Doe",
                            description: "Author Jane Doe's avatar",
                            url: "https://randomuser.me/api/portraits/women/44.jpg",
                        },
                        dateLabel: "20 June 2024",
                        readTimeLabel: "5 Min. To Read",
                        layout: "grid",
                        columns: 2,
                    },
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        id: "blog-card-2",
                        tag: {
                            __typename: ContentfulType.TAG,
                            id: "tag-2",
                            label: "Health",
                            variant: "solid",
                            color: "success",
                            rounded: "sm",
                        },
                        title: "I Created a Developer Rap Video - Here's What I Learned",
                        image: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Developer rap video image",
                            description:
                                "An image related to developer rap videos.",
                            url: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaWxhbmR8ZW58MHx8MHx8fDA%3D",
                        },
                        author: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "John Smith",
                            description: "Author John Smith's avatar",
                            url: "https://randomuser.me/api/portraits/men/46.jpg",
                        },
                        dateLabel: "15 June 2024",
                        readTimeLabel: "7 Min. To Read",
                        layout: "horizontal",
                    },
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        id: "blog-card-3",
                        tag: {
                            __typename: ContentfulType.TAG,
                            id: "tag-3",
                            label: "Travel",
                            variant: "solid",
                            color: "secondary",
                            rounded: "sm",
                        },
                        title: "Top 10 Travel Destinations for 2024",
                        image: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Beautiful travel destination image",
                            description:
                                "An image showcasing a beautiful travel destination.",
                            url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGhhaWxhbmR8ZW58MHx8MHx8fDA%3D",
                        },
                        author: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Alice Johnson",
                            description: "Author Alice Johnson's avatar",
                            url: "https://randomuser.me/api/portraits/women/65.jpg",
                        },
                        dateLabel: "10 June 2024",
                        readTimeLabel: "6 Min. To Read",
                        layout: "horizontal",
                    },
                ],
                layout: "grid",
                columns: 3,
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
