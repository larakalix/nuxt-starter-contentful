import {
    ContentfulType,
    type FunnelPage,
    TemplateType,
} from "../types/landing";

export const getLandingPage = (slug: string): FunnelPage | null => {
    if (!slug || slug.trim() === "") return null;

    const pages: Record<string, FunnelPage> = {
        home: HomeFunnelPage,
        about: AboutFunnelPage,
    };

    return pages[slug] || null;
};

const HomeFunnelPage: FunnelPage = {
    __typename: ContentfulType.FUNNEL_PAGE,
    sys: { id: "1" },
    slug: "home",
    templateType: TemplateType.GENERIC,
    structure: {
        __typename: ContentfulType.TEMPLATE,
        sys: { id: "template-1" },
        slug: "home",
        theme: "theme-green",
        sections: [
            {
                __typename: ContentfulType.NAVBAR,
                sys: { id: "navbar-1" },
                variant: "secondary",
                items: [
                    { label: "Home", href: "/" },
                    { label: "About", href: "/about" },
                ],
            },
            {
                __typename: ContentfulType.BLOG_CARD_LIST,
                sys: { id: "blog-card-list-1" },
                heading: {
                    __typename: ContentfulType.HEADING,
                    sys: { id: "heading-1" },
                    title: "Latest Blog Posts",
                    label: "Blog",
                },
                description: "Check out our latest blog posts.",
                items: [
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        sys: { id: "blog-card-1" },
                        tag: {
                            __typename: ContentfulType.TAG,
                            sys: { id: "tag-1" },
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
                    },
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        sys: { id: "blog-card-2" },
                        tag: {
                            __typename: ContentfulType.TAG,
                            sys: { id: "tag-2" },
                            label: "Health",
                            variant: "solid",
                            color: "success",
                            rounded: "sm",
                        },
                        title: "I Created a Developer Rap Video",
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
                    },
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        sys: { id: "blog-card-3" },
                        tag: {
                            __typename: ContentfulType.TAG,
                            sys: { id: "tag-3" },
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
                    },
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        sys: { id: "blog-card-4" },
                        tag: {
                            __typename: ContentfulType.TAG,
                            sys: { id: "tag-4" },
                            label: "Finance",
                            variant: "solid",
                            color: "warning",
                            rounded: "sm",
                        },
                        title: "Understanding Cryptocurrency in 2024",
                        image: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Cryptocurrency concept image",
                            description:
                                "An image representing cryptocurrency concepts.",
                            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRoYWlsYW5kfGVufDB8fDB8fHww",
                        },
                        author: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Emily Davis",
                            description: "Author Emily Davis's avatar",
                            url: "https://randomuser.me/api/portraits/women/68.jpg",
                        },
                        dateLabel: "8 June 2024",
                        readTimeLabel: "9 Min. To Read",
                    },
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        sys: { id: "blog-card-5" },
                        tag: {
                            __typename: ContentfulType.TAG,
                            sys: { id: "tag-5" },
                            label: "Lifestyle",
                            variant: "solid",
                            color: "info",
                            rounded: "sm",
                        },
                        title: "10 Tips for a Healthy Lifestyle",
                        image: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Healthy lifestyle concept image",
                            description:
                                "An image representing healthy lifestyle concepts.",
                            url: "https://images.unsplash.com/photo-1513568720563-6a5b8c6caab3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRoYWlsYW5kfGVufDB8fDB8fHww",
                        },
                        author: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Sarah Wilson",
                            description: "Author Sarah Wilson's avatar",
                            url: "https://randomuser.me/api/portraits/women/72.jpg",
                        },
                        dateLabel: "7 June 2024",
                        readTimeLabel: "4 Min. To Read",
                    },
                    {
                        __typename: ContentfulType.BLOG_CARD_LIST_ITEM,
                        sys: { id: "blog-card-6" },
                        tag: {
                            __typename: ContentfulType.TAG,
                            sys: { id: "tag-6" },
                            label: "Education",
                            variant: "solid",
                            color: "dark",
                            rounded: "sm",
                        },
                        title: "The Future of Online Education",
                        image: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Online education concept image",
                            description:
                                "An image representing online education concepts.",
                            url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRoYWlsYW5kfGVufDB8fDB8fHww",
                        },
                        author: {
                            __typename: ContentfulType.IMAGE_ASSET,
                            title: "Michael Brown",
                            description: "Author Michael Brown's avatar",
                            url: "https://randomuser.me/api/portraits/men/52.jpg",
                        },
                        dateLabel: "5 June 2024",
                        readTimeLabel: "8 Min. To Read",
                    },
                ],
                layout: "grid",
                columns: 3,
            },
            {
                __typename: ContentfulType.FOOTER,
                sys: { id: "footer-1" },
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

const AboutFunnelPage: FunnelPage = {
    __typename: ContentfulType.FUNNEL_PAGE,
    sys: { id: "2" },
    slug: "about",
    templateType: TemplateType.GENERIC,
    structure: {
        __typename: ContentfulType.TEMPLATE,
        sys: { id: "template-2" },
        slug: "about",
        theme: "theme-green",
        sections: [
            {
                __typename: ContentfulType.NAVBAR,
                sys: { id: "navbar-1" },
                variant: "secondary",
                items: [
                    { label: "Home", href: "/" },
                    { label: "About", href: "/about" },
                ],
            },
        ],
    },
};
