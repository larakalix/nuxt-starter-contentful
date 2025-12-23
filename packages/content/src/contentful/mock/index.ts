export const getMockedContentfulData = (slug: string) => {
    const pages: { [key: string]: any } = {
        home: HOME,
        about: ABOUT,
        categories: CATEGORY,
        authors: AUTHORS,
    };

    return pages[slug] || null;
};

const ABOUT = {
    data: {
        __typename: "FunnelPage",
        sys: {
            id: "3SHj9bYaX0dy4W967tptwG",
            __typename: "Sys",
        },
        slug: "about",
        theme: "theme-green",
        showBackButton: null,
        skipWrapper: true,
        footer: {
            sys: {
                id: "2NTTQfagJPlLJokoA6OdO0",
                __typename: "Sys",
            },
            __typename: "Footer",
            name: "Main Footer > All pages",
        },
        navBar: {
            sys: {
                id: "1BGhvliX55v5nvJcOmiFeQ",
                __typename: "Sys",
            },
            __typename: "Navbar",
            name: "Home Page > Navbar",
            sticky: false,
            showBorder: false,
        },
        template: {
            __typename: "Template",
            sys: {
                id: "36V5JA1viXUhGl76TndI8J",
                __typename: "Sys",
            },
            name: "About Template",
            sectionsCollection: {
                __typename: "TemplateSectionsCollection",
                items: [
                    {
                        __typename: "CtaBanner",
                        sys: {
                            id: "1NGfp8AxEHBOPwAXqz3g8E",
                            __typename: "Sys",
                        },
                        title: "Write on notebook is very simple",
                        subtitle: null,
                        label: null,
                        paragraphs:
                            "Join thousands of writers using Notebook to bring their ideas to life.,\nUnlock your creativity with our intuitive writing tools.,\nStay organized and inspired with our seamless interface.",
                        tone: null,
                        class: null,
                        size: null,
                        sectionHeading: {
                            __typename: "Heading",
                            sys: {
                                id: "40SFhPDuhRVj2nSlf8NTyJ",
                                __typename: "Sys",
                            },
                            name: "About Page > CTA Banner > Heading",
                            title: "Notebook",
                            label: "Write On",
                            align: "left",
                            size: "md",
                            colSpan: null,
                        },
                    },
                    {
                        __typename: "BlogCardList",
                        sys: {
                            id: "5dkA1v2af4WElg3qX3NZE",
                            __typename: "Sys",
                        },
                        name: "Home > Main Blog Card List 2",
                        description: null,
                        layout: "stacked",
                        columns: 2,
                        colSpan: 2,
                        sectionHeading: {
                            __typename: "Heading",
                            sys: {
                                id: "1He54dWqbuNe7t2tbOhbc0",
                                __typename: "Sys",
                            },
                            name: "Home > Main Blog Card List > Heading > Popular Posted",
                            title: "Popular",
                            label: "Poster",
                            align: "left",
                            size: "md",
                            colSpan: 3,
                            tag: {
                                __typename: "Tag",
                                sys: {
                                    id: "7E2HPPqKARRVDtY9C9IhhW",
                                    __typename: "Sys",
                                },
                                label: "Popular Posts",
                                variant: "solid",
                                color: "primary",
                                rounded: "sm",
                            },
                        },
                        itemsCollection: {
                            __typename: "BlogCardListItemsCollection",
                            items: [
                                {
                                    __typename: "BlogCardListItem",
                                    sys: {
                                        id: "7wYzNgfkwZ9WQ5wrds1gWk",
                                        __typename: "Sys",
                                    },
                                    bodyContent: {
                                        json: {
                                            data: {},
                                            content: [
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Introduction",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "The JavaScript ecosystem moves fast.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Every year, new frameworks promise better performance, cleaner APIs, and a smoother developer experience. While choice is a good thing, it also makes decision-making harder — especially when building production applications.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt often enters the conversation as a “meta-framework,” but what does that actually mean when compared to other JavaScript frameworks?",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "What Makes Nuxt Different",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt is built on top of Vue, but it goes far beyond a UI library.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Out of the box, Nuxt provides:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "File-based routing",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Server-side rendering and static generation",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Data fetching conventions",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "API routes",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "SEO defaults",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Deployment-ready builds",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Instead of assembling your own stack, Nuxt gives you a cohesive system.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt vs React-Based Frameworks",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "React itself is not a framework — it’s a library.\n To build a full application, you usually reach for tools like Next.js, Remix, or custom setups.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Compared to these ecosystems:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Nuxt emphasizes convention over configuration",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Vue’s reactivity system often feels more intuitive for newcomers",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Nuxt’s data fetching is more tightly integrated into the framework lifecycle",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "React ecosystems tend to offer more flexibility, but that flexibility often comes with more decisions.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt vs Vanilla Vue",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "It’s technically possible to build large applications with Vue alone.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "However, as projects grow, teams often end up rebuilding features that Nuxt already provides:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Routing",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Code splitting",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Meta handling",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Server rendering",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Deployment pipelines",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt removes that overhead and lets teams focus on product logic instead of infrastructure.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt vs Svelte and SvelteKit",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "SvelteKit is often praised for its performance and simplicity.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "While Svelte’s compile-time approach is impressive:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Nuxt offers a more mature ecosystem",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Vue’s component model is familiar to many teams",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Nuxt’s module system makes integrations easier",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Both are strong choices, but Nuxt tends to be more predictable at scale.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Learning Curve and Team Adoption",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "A framework’s success isn’t just about benchmarks.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "It’s also about:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "How quickly new developers can onboard",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "How easy it is to follow conventions",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "How much documentation exists",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "How stable the ecosystem feels",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt scores well here by building on Vue’s approachable syntax and adding clear project structure.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Performance Considerations",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Performance depends more on ",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [
                                                                {
                                                                    type: "bold",
                                                                },
                                                            ],
                                                            value: "architecture",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: " than framework choice.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt supports:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Static generation for content-heavy sites",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Server-side rendering for dynamic data",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Edge deployment with Nitro",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "When used correctly, Nuxt performs competitively with any modern JavaScript framework.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "When Nuxt Is a Good Fit",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt shines when:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "SEO matters",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Content is dynamic or CMS-driven",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Teams want strong conventions",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Deployment simplicity is important",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "ordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "It may be less ideal for highly experimental UI work or ultra-minimal setups.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Final Thoughts",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "There is no universally “best” JavaScript framework.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt is a strong choice not because it does everything differently — but because it ",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [
                                                                {
                                                                    type: "bold",
                                                                },
                                                            ],
                                                            value: "does many things consistently well",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: ".",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "For teams that value structure, scalability, and developer experience, Nuxt is often a safe and productive option.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                            ],
                                            nodeType: "document",
                                        },
                                        __typename:
                                            "BlogCardListItemBodyContent",
                                    },
                                    tag: null,
                                    name: "Home > Main Blog Card List 2 > Blog Card > Nuxt vs Other ",
                                    title: "Nuxt vs Other JavaScript Frameworks: Choosing the Right Tool",
                                    excerpt:
                                        "Every year, new frameworks promise better performance, cleaner APIs, and a smoother developer experience. While choice is a good thing, it also makes decision-making harder — especially when building production applications.",
                                    href: "/blog/nuxt-vs-others",
                                    dateLabel: null,
                                    readTimeLabel: "6 min read",
                                    layout: "horizontal",
                                    showTocMenu: null,
                                    image: {
                                        __typename: "Asset",
                                        sys: {
                                            id: "3fWN9FOizLQd47X5ZHFVAx",
                                            __typename: "Sys",
                                        },
                                        url: "https://images.ctfassets.net/wj2zmppehg9u/3fWN9FOizLQd47X5ZHFVAx/2811eb0832ccd67108d93cb8e9f81476/premium_photo-1764702231469-dd64affc3b28",
                                        title: "premium photo-1764702231469-dd64affc3b28",
                                        description:
                                            "premium photo-1764702231469-dd64affc3b28",
                                    },
                                    authorsCollection: {
                                        __typename:
                                            "BlogCardListItemAuthorsCollection",
                                        items: [
                                            {
                                                sys: {
                                                    id: "5oiKmKtiVLzCo4qwd7OeAU",
                                                    __typename: "Sys",
                                                },
                                                __typename: "Author",
                                                name: "Emma Johansson",
                                                bio: "Frontend specialist working with Nuxt, design systems, and accessibility to create reliable and user-friendly web applications.",
                                                avatar: {
                                                    __typename: "Asset",
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/7JlXq7JO4sa0irLKCx1I7T/135069dfc1ab3d34c8ecea1509b8db59/300",
                                                    title: "Emma Johansson",
                                                    description: "",
                                                },
                                            },
                                            {
                                                sys: {
                                                    id: "52YTvWYYonx4ifufCVODpa",
                                                    __typename: "Sys",
                                                },
                                                __typename: "Author",
                                                name: "Lucas Pereira",
                                                bio: "Software engineer interested in performance optimization, static rendering strategies, and modern frontend toolin",
                                                avatar: {
                                                    __typename: "Asset",
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/5HAoy0ztKTzFwW819zZx7S/3e4d2c7cda1b2a8ef8e378789940cfe9/300",
                                                    title: "Lucas Pereira",
                                                    description: "",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    __typename: "BlogCardListItem",
                                    sys: {
                                        id: "1NsNgc8kWZcjBM0JipCTkl",
                                        __typename: "Sys",
                                    },
                                    bodyContent: {
                                        json: {
                                            data: {},
                                            content: [
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Introduction",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt didn’t appear overnight as the full-featured framework we know today.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "It started as a solution to a simple problem:\n ",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [
                                                                {
                                                                    type: "bold",
                                                                },
                                                            ],
                                                            value: "How do you build Vue applications that are fast, SEO-friendly, and easy to structure?",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Over time, Nuxt evolved from a thin abstraction into a complete application platform.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "The Early Days: Nuxt 1.x",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "The earliest versions of Nuxt focused on one core idea: ",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [
                                                                {
                                                                    type: "bold",
                                                                },
                                                            ],
                                                            value: "server-side rendering made accessible",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: ".",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Key characteristics of early Nuxt included:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "File-based routing",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Automatic code splitting",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Vue-powered server rendering",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Opinionated project structure",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "At the time, these features dramatically reduced the complexity of building production-ready Vue applications.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Growing Pains and Nuxt 2.x",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "As adoption grew, so did expectations.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt 2.x became the backbone for:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Marketing websites",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Content platforms",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "SaaS dashboards",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "E-commerce storefronts",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "During this phase, Nuxt introduced:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "A stable module ecosystem",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Improved async data handling",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Better plugin and middleware systems",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Widespread community adoption",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt was no longer just a convenience layer — it became a standard.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "The Shift to a New Architecture",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "As the JavaScript ecosystem changed, Nuxt faced a challenge.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Modern applications demanded:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Faster builds",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Better TypeScript support",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "More flexible rendering strategies",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Stronger server capabilities",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Rather than incrementally patching the old model, the Nuxt team chose to ",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [
                                                                {
                                                                    type: "bold",
                                                                },
                                                            ],
                                                            value: "rethink the framework from the ground up",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: ".",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt 3 and the Composition Era",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt 3 marked a turning point.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Built on top of Vue 3 and the Composition API, it introduced:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "A fully typed core",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Nitro as a unified server engine",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Hybrid rendering (SSG, SSR, edge)",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Improved developer tooling",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Smaller runtime footprint",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "This wasn’t just an upgrade — it was a reset aligned with modern web standards.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Developer Experience as a First-Class Feature",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "One of Nuxt’s most important evolutions has been its focus on developer experience.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Features like:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Auto-imports",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Convention-driven APIs",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Unified data fetching",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Zero-config defaults",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "These changes reduced boilerplate and allowed teams to focus on product logic rather than setup.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "The Role of the Ecosystem",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt’s evolution isn’t just technical.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "The growth of:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Official modules",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Community plugins",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Documentation quality",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Enterprise adoption",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Has helped Nuxt mature into a reliable platform for long-term projects.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Where Nuxt Is Headed",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt continues to evolve alongside the web itself.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Current and future priorities include:",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Better edge deployment support",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Faster builds and cold starts",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Improved content workflows",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                        {
                                                            data: {},
                                                            content: [
                                                                {
                                                                    data: {},
                                                                    content: [
                                                                        {
                                                                            data: {},
                                                                            marks: [],
                                                                            value: "Stronger full-stack capabilities",
                                                                            nodeType:
                                                                                "text",
                                                                        },
                                                                    ],
                                                                    nodeType:
                                                                        "paragraph",
                                                                },
                                                            ],
                                                            nodeType:
                                                                "list-item",
                                                        },
                                                    ],
                                                    nodeType: "unordered-list",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "The framework is no longer just about rendering — it’s about ",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [
                                                                {
                                                                    type: "bold",
                                                                },
                                                            ],
                                                            value: "building complete web applications",
                                                            nodeType: "text",
                                                        },
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: ".",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [],
                                                    nodeType: "hr",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Final Thoughts",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "heading-2",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "Nuxt’s success comes from its willingness to evolve.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "By adapting to new standards, embracing modern APIs, and maintaining strong conventions, Nuxt has remained relevant in an ecosystem that changes rapidly.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                                {
                                                    data: {},
                                                    content: [
                                                        {
                                                            data: {},
                                                            marks: [],
                                                            value: "That balance between stability and innovation is what keeps Nuxt moving forward.",
                                                            nodeType: "text",
                                                        },
                                                    ],
                                                    nodeType: "paragraph",
                                                },
                                            ],
                                            nodeType: "document",
                                        },
                                        __typename:
                                            "BlogCardListItemBodyContent",
                                    },
                                    tag: null,
                                    name: "Home > Main Blog Card List 2 > Blog Card > How Nuxt Has Evolved",
                                    title: "How Nuxt Has Evolved Since Its Creation",
                                    excerpt:
                                        "Nuxt didn’t appear overnight as the full-featured framework we know today.",
                                    href: "/blog/how-nuxt-has-evolved",
                                    dateLabel: "2025-11-18T00:00:00.000Z",
                                    readTimeLabel: "8 min read",
                                    layout: "horizontal",
                                    showTocMenu: true,
                                    image: {
                                        __typename: "Asset",
                                        sys: {
                                            id: "5FHJkr7jl4PK1Vu2kf75iy",
                                            __typename: "Sys",
                                        },
                                        url: "https://images.ctfassets.net/wj2zmppehg9u/5FHJkr7jl4PK1Vu2kf75iy/7a0d9ca8f0a231759ee08d4eed46cb58/photo-1765498069280-b863094c17bf",
                                        title: "photo-1765498069280-b863094c17bf",
                                        description:
                                            "photo-1765498069280-b863094c17bf",
                                    },
                                    authorsCollection: {
                                        __typename:
                                            "BlogCardListItemAuthorsCollection",
                                        items: [
                                            {
                                                sys: {
                                                    id: "fA9QGLvpFiWXwPrz1IDEs",
                                                    __typename: "Sys",
                                                },
                                                __typename: "Author",
                                                name: "Nina Kovács",
                                                bio: "Frontend engineer working with Nuxt and TypeScript, interested in clean code, content-driven sites, and developer experience.",
                                                avatar: {
                                                    __typename: "Asset",
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/6xkYyJpi5VhxZ8cPHbbYj3/e0a84440af8bc505bbd5c4757bb9db4a/300",
                                                    title: "Nina Kovács",
                                                    description: "",
                                                },
                                            },
                                            {
                                                sys: {
                                                    id: "6F9v53Bnk4fY3OnQPIAMH",
                                                    __typename: "Sys",
                                                },
                                                __typename: "Author",
                                                name: "Ivan Lara",
                                                bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                avatar: {
                                                    __typename: "Asset",
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/2kDgHv9QKxbJtIZfNIBZL5/99682cd2f5704337b189dd5b98ff190b/pp.jpg",
                                                    title: "Ivan Lara",
                                                    description: "",
                                                },
                                            },
                                            {
                                                sys: {
                                                    id: "7mNFJVwOIL3s3wZx7Ef6UU",
                                                    __typename: "Sys",
                                                },
                                                __typename: "Author",
                                                name: "Sofia Ramirez",
                                                bio: "Web developer and technical writer passionate about modern JavaScript, TypeScript, and clear documentation for growing teams.",
                                                avatar: {
                                                    __typename: "Asset",
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/2AlTtSZ3Cl0F7ujMF3QagA/3f3d97009c821b6fdbcac56e97add908/300",
                                                    title: "Sofia Ramirez",
                                                    description: "",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    },
};

const HOME = {
    data: {
        __typename: "FunnelPage",
        sys: {
            id: "2izaCH86K2F4UEcDyURJjS",
            __typename: "Sys",
        },
        slug: "home",
        theme: "theme-green",
        showBackButton: null,
        skipWrapper: true,
        footer: {
            sys: {
                id: "2NTTQfagJPlLJokoA6OdO0",
                __typename: "Sys",
            },
            __typename: "Footer",
            name: "Main Footer > All pages",
        },
        navBar: {
            sys: {
                id: "1BGhvliX55v5nvJcOmiFeQ",
                __typename: "Sys",
            },
            __typename: "Navbar",
            name: "Home Page > Navbar",
            sticky: false,
            showBorder: false,
        },
        template: {
            __typename: "Template",
            sys: {
                id: "3oeSMUj1tW7cx2cSrPAips",
                __typename: "Sys",
            },
            name: "Home Template",
            sectionsCollection: {
                __typename: "TemplateSectionsCollection",
                items: [
                    {
                        __typename: "GridSection",
                        sys: {
                            id: "2TNb7DjiDWG2NNk7PR3plK",
                            __typename: "Sys",
                        },
                        sectionHeading: null,
                        name: "Home > Section Grid > Latest",
                        columns: 6,
                        tone: "prominent",
                        sectionsCollection: {
                            __typename: "GridSectionSectionsCollection",
                            items: [
                                {
                                    __typename: "BlogCardList",
                                    sys: {
                                        id: "4gM1rjYU3U9Og1fwTnXotF",
                                        __typename: "Sys",
                                    },
                                    name: "Home > Main Blog Card List 1",
                                    description:
                                        "Check out our latest blog posts.",
                                    layout: "grid",
                                    columns: 2,
                                    colSpan: 4,
                                    sectionHeading: {
                                        __typename: "Heading",
                                        sys: {
                                            id: "3FFpvMgf5FyhPdxDOJATnI",
                                            __typename: "Sys",
                                        },
                                        name: "Home > Main Blog Card List > Heading > Latest Blog Posts",
                                        title: "Latest Blog Posts",
                                        label: "Blog",
                                        align: "left",
                                        size: "md",
                                        colSpan: 2,
                                        tag: {
                                            __typename: "Tag",
                                            sys: {
                                                id: "40JkK1z589wc9iJMqrrMFM",
                                                __typename: "Sys",
                                            },
                                            label: "Blog",
                                            variant: "solid",
                                            color: "primary",
                                            rounded: "sm",
                                        },
                                    },
                                    itemsCollection: {
                                        __typename:
                                            "BlogCardListItemsCollection",
                                        items: [
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "4mivDerHXj0TKwy5rn1zbo",
                                                    __typename: "Sys",
                                                },
                                                tag: null,
                                                name: "Home > Main Blog Card List > Blog Card > Building a Blog System",
                                                title: "Building a Blog System That Scales (Without Overengineering)",
                                                excerpt:
                                                    "The real challenge isn’t building a blog — it’s building one that scales without becoming a maintenance nightmare.",
                                                href: "/blog/building-a-blog-system",
                                                dateLabel:
                                                    "2025-06-19T00:00:00.000Z",
                                                readTimeLabel: "5 Min. To Read",
                                                layout: "horizontal",
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "xZ8xs9t51pgU8yXyV04Jy",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Daniel Chen",
                                                            bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/4wZFYOx7Q0NGlgNlGU1qFr/eb79d29b7b3d3f297db08148e5aadd2c/300",
                                                                title: "Daniel Chen",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "6p5G97AZAxhiGfGiaXtnSA",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/6p5G97AZAxhiGfGiaXtnSA/7ffefe21ad7836faec7013a8a7190fc7/premium_photo-1661962958462-9e52fda9954d",
                                                    title: "premium photo-1661962958462-9e52fda9954d",
                                                    description:
                                                        "premium photo-1661962958462-9e52fda9954d",
                                                },
                                            },
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "5AbxjqbUUmANkMJUGsmpYk",
                                                    __typename: "Sys",
                                                },
                                                tag: null,
                                                name: "Home > Main Blog Card List > Blog Card > Why Nuxt",
                                                title: "Why Nuxt + Contentful Is a Powerful Combo for Modern Blogs",
                                                excerpt:
                                                    "Learn how Nuxt and Contentful work together to create fast, scalable, and editor-friendly blog platforms using modern web standards.",
                                                href: "/blog/nuxt-contentful-modern-blogs",
                                                dateLabel:
                                                    "2025-12-19T00:00:00.000Z",
                                                readTimeLabel: "7 Min. To Read",
                                                layout: "horizontal",
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "fA9QGLvpFiWXwPrz1IDEs",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Nina Kovács",
                                                            bio: "Frontend engineer working with Nuxt and TypeScript, interested in clean code, content-driven sites, and developer experience.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/6xkYyJpi5VhxZ8cPHbbYj3/e0a84440af8bc505bbd5c4757bb9db4a/300",
                                                                title: "Nina Kovács",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "2gWZEGPXs85oQFheK36n0e",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/2gWZEGPXs85oQFheK36n0e/3df8b78f6fb223a48afba82560e6323c/photo-1519451241324-20b4ea2c4220",
                                                    title: "photo-1519451241324-20b4ea2c4220",
                                                    description:
                                                        "photo-1519451241324-20b4ea2c4220",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    __typename: "BlogCardList",
                                    sys: {
                                        id: "5dkA1v2af4WElg3qX3NZE",
                                        __typename: "Sys",
                                    },
                                    name: "Home > Main Blog Card List 2",
                                    description: null,
                                    layout: "stacked",
                                    columns: 2,
                                    colSpan: 2,
                                    sectionHeading: {
                                        __typename: "Heading",
                                        sys: {
                                            id: "1He54dWqbuNe7t2tbOhbc0",
                                            __typename: "Sys",
                                        },
                                        name: "Home > Main Blog Card List > Heading > Popular Posted",
                                        title: "Popular",
                                        label: "Poster",
                                        align: "left",
                                        size: "md",
                                        colSpan: 3,
                                        tag: {
                                            __typename: "Tag",
                                            sys: {
                                                id: "7E2HPPqKARRVDtY9C9IhhW",
                                                __typename: "Sys",
                                            },
                                            label: "Popular Posts",
                                            variant: "solid",
                                            color: "primary",
                                            rounded: "sm",
                                        },
                                    },
                                    itemsCollection: {
                                        __typename:
                                            "BlogCardListItemsCollection",
                                        items: [
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "7wYzNgfkwZ9WQ5wrds1gWk",
                                                    __typename: "Sys",
                                                },
                                                tag: null,
                                                name: "Home > Main Blog Card List 2 > Blog Card > Nuxt vs Other ",
                                                title: "Nuxt vs Other JavaScript Frameworks: Choosing the Right Tool",
                                                excerpt:
                                                    "Every year, new frameworks promise better performance, cleaner APIs, and a smoother developer experience. While choice is a good thing, it also makes decision-making harder — especially when building production applications.",
                                                href: "/blog/nuxt-vs-others",
                                                dateLabel: null,
                                                readTimeLabel: "6 min read",
                                                layout: "horizontal",
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "5oiKmKtiVLzCo4qwd7OeAU",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Emma Johansson",
                                                            bio: "Frontend specialist working with Nuxt, design systems, and accessibility to create reliable and user-friendly web applications.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/7JlXq7JO4sa0irLKCx1I7T/135069dfc1ab3d34c8ecea1509b8db59/300",
                                                                title: "Emma Johansson",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "52YTvWYYonx4ifufCVODpa",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Lucas Pereira",
                                                            bio: "Software engineer interested in performance optimization, static rendering strategies, and modern frontend toolin",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/5HAoy0ztKTzFwW819zZx7S/3e4d2c7cda1b2a8ef8e378789940cfe9/300",
                                                                title: "Lucas Pereira",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "3fWN9FOizLQd47X5ZHFVAx",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/3fWN9FOizLQd47X5ZHFVAx/2811eb0832ccd67108d93cb8e9f81476/premium_photo-1764702231469-dd64affc3b28",
                                                    title: "premium photo-1764702231469-dd64affc3b28",
                                                    description:
                                                        "premium photo-1764702231469-dd64affc3b28",
                                                },
                                            },
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "1NsNgc8kWZcjBM0JipCTkl",
                                                    __typename: "Sys",
                                                },
                                                tag: null,
                                                name: "Home > Main Blog Card List 2 > Blog Card > How Nuxt Has Evolved",
                                                title: "How Nuxt Has Evolved Since Its Creation",
                                                excerpt:
                                                    "Nuxt didn’t appear overnight as the full-featured framework we know today.",
                                                href: "/blog/how-nuxt-has-evolved",
                                                dateLabel:
                                                    "2025-11-18T00:00:00.000Z",
                                                readTimeLabel: "8 min read",
                                                layout: "horizontal",
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "fA9QGLvpFiWXwPrz1IDEs",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Nina Kovács",
                                                            bio: "Frontend engineer working with Nuxt and TypeScript, interested in clean code, content-driven sites, and developer experience.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/6xkYyJpi5VhxZ8cPHbbYj3/e0a84440af8bc505bbd5c4757bb9db4a/300",
                                                                title: "Nina Kovács",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "6F9v53Bnk4fY3OnQPIAMH",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Ivan Lara",
                                                            bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/2kDgHv9QKxbJtIZfNIBZL5/99682cd2f5704337b189dd5b98ff190b/pp.jpg",
                                                                title: "Ivan Lara",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "7mNFJVwOIL3s3wZx7Ef6UU",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Sofia Ramirez",
                                                            bio: "Web developer and technical writer passionate about modern JavaScript, TypeScript, and clear documentation for growing teams.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/2AlTtSZ3Cl0F7ujMF3QagA/3f3d97009c821b6fdbcac56e97add908/300",
                                                                title: "Sofia Ramirez",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "5FHJkr7jl4PK1Vu2kf75iy",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/5FHJkr7jl4PK1Vu2kf75iy/7a0d9ca8f0a231759ee08d4eed46cb58/photo-1765498069280-b863094c17bf",
                                                    title: "photo-1765498069280-b863094c17bf",
                                                    description:
                                                        "photo-1765498069280-b863094c17bf",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        __typename: "GridSection",
                        sys: {
                            id: "18WigI2CTCIdLq8jbxv2pg",
                            __typename: "Sys",
                        },
                        sectionHeading: null,
                        name: "Home > Section Grid > Recents",
                        columns: 6,
                        tone: "none",
                        sectionsCollection: {
                            __typename: "GridSectionSectionsCollection",
                            items: [
                                {
                                    __typename: "BlogCardList",
                                    sys: {
                                        id: "1IakssidkFfEl82aqd9Z4s",
                                        __typename: "Sys",
                                    },
                                    name: "Home > Main Blog Card List 3",
                                    description: "Check out our recent posts.",
                                    layout: "stacked",
                                    columns: 1,
                                    colSpan: 4,
                                    sectionHeading: {
                                        __typename: "Heading",
                                        sys: {
                                            id: "1UJpXdBIYMr6SGH3WsoGlX",
                                            __typename: "Sys",
                                        },
                                        name: "Home > Main Blog Card List > Heading > Recent Posts",
                                        title: "Posts",
                                        label: "Recent",
                                        align: "left",
                                        size: "md",
                                        colSpan: 2,
                                        tag: {
                                            __typename: "Tag",
                                            sys: {
                                                id: "7E2HPPqKARRVDtY9C9IhhW",
                                                __typename: "Sys",
                                            },
                                            label: "Popular Posts",
                                            variant: "solid",
                                            color: "primary",
                                            rounded: "sm",
                                        },
                                    },
                                    itemsCollection: {
                                        __typename:
                                            "BlogCardListItemsCollection",
                                        items: [
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "0kCYVYXV8UQaq7gMMr4x7",
                                                    __typename: "Sys",
                                                },
                                                name: "Home > Main Blog Card List > Blog Card > Why Frameworks Matter",
                                                title: "Why Frameworks Matter More as Web Projects Grow",
                                                excerpt:
                                                    "Frameworks aren’t just about speed or syntax. They exist to manage complexity as applications and teams scale over time.",
                                                href: "/blog/why-frameworks-matter",
                                                dateLabel:
                                                    "2025-12-04T00:00:00.000Z",
                                                readTimeLabel: "6 min read",
                                                layout: "vertical",
                                                tag: {
                                                    __typename: "Tag",
                                                    sys: {
                                                        id: "7E2HPPqKARRVDtY9C9IhhW",
                                                        __typename: "Sys",
                                                    },
                                                    label: "Popular Posts",
                                                    variant: "solid",
                                                    color: "primary",
                                                    rounded: "sm",
                                                },
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "6F9v53Bnk4fY3OnQPIAMH",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Ivan Lara",
                                                            bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/2kDgHv9QKxbJtIZfNIBZL5/99682cd2f5704337b189dd5b98ff190b/pp.jpg",
                                                                title: "Ivan Lara",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "5ZTRFZEW3Bha9LK7wi5HPF",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/5ZTRFZEW3Bha9LK7wi5HPF/d244879601133cf8c897fcd9a0b5a472/woman-working_8LHTBAZW32.jpg",
                                                    title: "woman-working 8LHTBAZW32",
                                                    description: "",
                                                },
                                            },
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "17FAIZdITyZv0Rvwpp6bfi",
                                                    __typename: "Sys",
                                                },
                                                name: "Home > Main Blog Card List > Blog Card > The Real Cost of Overengineering",
                                                title: "The Real Cost of Overengineering in Frontend Projects",
                                                excerpt:
                                                    "Overengineering rarely fails immediately. Instead, it slowly makes projects harder to change, understand, and maintain.",
                                                href: "/blog/real-cost-of-overengineering-frontend-projects",
                                                dateLabel:
                                                    "2025-12-01T00:00:00.000Z",
                                                readTimeLabel: "5 min read",
                                                layout: "vertical",
                                                tag: {
                                                    __typename: "Tag",
                                                    sys: {
                                                        id: "7E2HPPqKARRVDtY9C9IhhW",
                                                        __typename: "Sys",
                                                    },
                                                    label: "Popular Posts",
                                                    variant: "solid",
                                                    color: "primary",
                                                    rounded: "sm",
                                                },
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "52YTvWYYonx4ifufCVODpa",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Lucas Pereira",
                                                            bio: "Software engineer interested in performance optimization, static rendering strategies, and modern frontend toolin",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/5HAoy0ztKTzFwW819zZx7S/3e4d2c7cda1b2a8ef8e378789940cfe9/300",
                                                                title: "Lucas Pereira",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "xZ8xs9t51pgU8yXyV04Jy",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Daniel Chen",
                                                            bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/4wZFYOx7Q0NGlgNlGU1qFr/eb79d29b7b3d3f297db08148e5aadd2c/300",
                                                                title: "Daniel Chen",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "2agmyWLmLpRMFfMmfGuDWd",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/2agmyWLmLpRMFfMmfGuDWd/b0a96f9667e20a5a2ff8dbcf443a8958/macbook-laptop_LEJ7HJ5BEA.jpg",
                                                    title: "macbook-laptop LEJ7HJ5BEA",
                                                    description: "",
                                                },
                                            },
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "6Cq7nZvBTZeRuWzgPf1mhI",
                                                    __typename: "Sys",
                                                },
                                                name: "Home > Main Blog Card List > Blog Card > Type Safety",
                                                title: "Type Safety as a Communication Tool, Not a Constraint",
                                                excerpt:
                                                    "TypeScript isn’t just about preventing bugs. It’s a way for developers to communicate intent clearly across a codebase.",
                                                href: "/blog/typescript-as-communication-tool",
                                                dateLabel:
                                                    "2025-11-20T00:00:00.000Z",
                                                readTimeLabel: "7 min read",
                                                layout: "vertical",
                                                tag: {
                                                    __typename: "Tag",
                                                    sys: {
                                                        id: "7E2HPPqKARRVDtY9C9IhhW",
                                                        __typename: "Sys",
                                                    },
                                                    label: "Popular Posts",
                                                    variant: "solid",
                                                    color: "primary",
                                                    rounded: "sm",
                                                },
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "6F9v53Bnk4fY3OnQPIAMH",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Ivan Lara",
                                                            bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/2kDgHv9QKxbJtIZfNIBZL5/99682cd2f5704337b189dd5b98ff190b/pp.jpg",
                                                                title: "Ivan Lara",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "fA9QGLvpFiWXwPrz1IDEs",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Nina Kovács",
                                                            bio: "Frontend engineer working with Nuxt and TypeScript, interested in clean code, content-driven sites, and developer experience.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/6xkYyJpi5VhxZ8cPHbbYj3/e0a84440af8bc505bbd5c4757bb9db4a/300",
                                                                title: "Nina Kovács",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "52YTvWYYonx4ifufCVODpa",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Lucas Pereira",
                                                            bio: "Software engineer interested in performance optimization, static rendering strategies, and modern frontend toolin",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/5HAoy0ztKTzFwW819zZx7S/3e4d2c7cda1b2a8ef8e378789940cfe9/300",
                                                                title: "Lucas Pereira",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "1wlDUbx4eZoDsjLSi3xZ7Q",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/1wlDUbx4eZoDsjLSi3xZ7Q/6374993bc5b28ae1420903d6ab47b421/photo-1526572728358-228f6b8ca29b",
                                                    title: "photo-1526572728358-228f6b8ca29b",
                                                    description: "",
                                                },
                                            },
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "6WlW1zfFSH8WL6i36vwPE3",
                                                    __typename: "Sys",
                                                },
                                                name: "Home > Main Blog Card List > Blog Card > How Modern Web Performance Is Really Won",
                                                title: "How Modern Web Performance Is Really Won (and Lost)",
                                                excerpt:
                                                    "Performance isn’t about one metric or trick. It’s the result of many small decisions made consistently.",
                                                href: "/blog/how-modern-web-performance-is-won",
                                                dateLabel:
                                                    "2025-11-14T00:00:00.000Z",
                                                readTimeLabel: "6 min read",
                                                layout: "vertical",
                                                tag: {
                                                    __typename: "Tag",
                                                    sys: {
                                                        id: "7E2HPPqKARRVDtY9C9IhhW",
                                                        __typename: "Sys",
                                                    },
                                                    label: "Popular Posts",
                                                    variant: "solid",
                                                    color: "primary",
                                                    rounded: "sm",
                                                },
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "xZ8xs9t51pgU8yXyV04Jy",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Daniel Chen",
                                                            bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/4wZFYOx7Q0NGlgNlGU1qFr/eb79d29b7b3d3f297db08148e5aadd2c/300",
                                                                title: "Daniel Chen",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "4AorUxOGzuzTCZQXxEAWiG",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/4AorUxOGzuzTCZQXxEAWiG/7872c8aa6253d9a0f4def6bc846f9f0c/photo-1531591022136-eb8b0da1e6d0",
                                                    title: "photo-1531591022136-eb8b0da1e6d0",
                                                    description: "",
                                                },
                                            },
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "4q2eqCxkwndKpz5iuaP4hn",
                                                    __typename: "Sys",
                                                },
                                                tag: null,
                                                name: "Home > Main Blog Card List > Blog Card > Why Content Structure Matters",
                                                title: "Why Content Structure Matters More Than Styling",
                                                excerpt:
                                                    "Clean content structure improves readability, accessibility, SEO, and long-term maintainability — often more than visual polish.",
                                                href: "/blog/why-content-structure-matters-more-than-styling",
                                                dateLabel: null,
                                                readTimeLabel: "5 min read",
                                                layout: "vertical",
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "fA9QGLvpFiWXwPrz1IDEs",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Nina Kovács",
                                                            bio: "Frontend engineer working with Nuxt and TypeScript, interested in clean code, content-driven sites, and developer experience.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/6xkYyJpi5VhxZ8cPHbbYj3/e0a84440af8bc505bbd5c4757bb9db4a/300",
                                                                title: "Nina Kovács",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "7mNFJVwOIL3s3wZx7Ef6UU",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Sofia Ramirez",
                                                            bio: "Web developer and technical writer passionate about modern JavaScript, TypeScript, and clear documentation for growing teams.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/2AlTtSZ3Cl0F7ujMF3QagA/3f3d97009c821b6fdbcac56e97add908/300",
                                                                title: "Sofia Ramirez",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "5iBvOoBimjC8VrUIPZ3NSk",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/5iBvOoBimjC8VrUIPZ3NSk/1025a94a745b98009ac1a3270cbb1321/photo-1766086892325-74a61d0465f6",
                                                    title: "photo-1766086892325-74a61d0465f6",
                                                    description: "",
                                                },
                                            },
                                            {
                                                __typename: "BlogCardListItem",
                                                sys: {
                                                    id: "7sALoykIQJGJcVLgNzlCjr",
                                                    __typename: "Sys",
                                                },
                                                name: "Home > Main Blog Card List > Blog Card > The Long-Term Value of Choosing Boring Technology",
                                                title: "The Long-Term Value of Choosing Boring Technology",
                                                excerpt:
                                                    "“Boring” tools are often the most reliable choice for products that need to survive real-world constraints and long timelines.",
                                                href: "/blog/long-term-value-of-boring-technology",
                                                dateLabel: null,
                                                readTimeLabel: "6 min read",
                                                layout: "vertical",
                                                tag: {
                                                    __typename: "Tag",
                                                    sys: {
                                                        id: "7E2HPPqKARRVDtY9C9IhhW",
                                                        __typename: "Sys",
                                                    },
                                                    label: "Popular Posts",
                                                    variant: "solid",
                                                    color: "primary",
                                                    rounded: "sm",
                                                },
                                                authorsCollection: {
                                                    __typename:
                                                        "BlogCardListItemAuthorsCollection",
                                                    items: [
                                                        {
                                                            sys: {
                                                                id: "6F9v53Bnk4fY3OnQPIAMH",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Ivan Lara",
                                                            bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/2kDgHv9QKxbJtIZfNIBZL5/99682cd2f5704337b189dd5b98ff190b/pp.jpg",
                                                                title: "Ivan Lara",
                                                                description: "",
                                                            },
                                                        },
                                                        {
                                                            sys: {
                                                                id: "fA9QGLvpFiWXwPrz1IDEs",
                                                                __typename:
                                                                    "Sys",
                                                            },
                                                            __typename:
                                                                "Author",
                                                            name: "Nina Kovács",
                                                            bio: "Frontend engineer working with Nuxt and TypeScript, interested in clean code, content-driven sites, and developer experience.",
                                                            avatar: {
                                                                __typename:
                                                                    "Asset",
                                                                url: "https://images.ctfassets.net/wj2zmppehg9u/6xkYyJpi5VhxZ8cPHbbYj3/e0a84440af8bc505bbd5c4757bb9db4a/300",
                                                                title: "Nina Kovács",
                                                                description: "",
                                                            },
                                                        },
                                                    ],
                                                },
                                                image: {
                                                    __typename: "Asset",
                                                    sys: {
                                                        id: "1zsoP0GWqRKZyCXQK9nG1O",
                                                        __typename: "Sys",
                                                    },
                                                    url: "https://images.ctfassets.net/wj2zmppehg9u/1zsoP0GWqRKZyCXQK9nG1O/6b6121a1a202bb3acde571564b20291b/photo-1765871321366-c2b86bd243b0",
                                                    title: "photo-1765871321366-c2b86bd243b0",
                                                    description: "",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    },
};

const CATEGORY = {
    data: {
        __typename: "FunnelPage",
        sys: {
            id: "16NcDpzfoRJskxusznlq3j",
            __typename: "Sys",
        },
        slug: "categories",
        theme: "theme-green",
        showBackButton: true,
        skipWrapper: true,
        footer: {
            sys: {
                id: "2NTTQfagJPlLJokoA6OdO0",
                __typename: "Sys",
            },
            __typename: "Footer",
            name: "Main Footer > All pages",
        },
        navBar: {
            sys: {
                id: "1BGhvliX55v5nvJcOmiFeQ",
                __typename: "Sys",
            },
            __typename: "Navbar",
            name: "Home Page > Navbar",
            sticky: false,
            showBorder: false,
        },
        template: {
            __typename: "Template",
            sys: {
                id: "5r0FtlRJtvWolpDg7dYWiH",
                __typename: "Sys",
            },
            name: "Categories Template",
            sectionsCollection: {
                __typename: "TemplateSectionsCollection",
                items: [
                    {
                        __typename: "CtaBanner",
                        sys: {
                            id: "dsTSIno2mG7DfdbbtK1WI",
                            __typename: "Sys",
                        },
                        sectionHeading: null,
                        title: "Categories",
                        subtitle: null,
                        label: "Categories",
                        paragraphs: null,
                        tone: "prominent",
                        class: null,
                        size: null,
                    },
                    {
                        __typename: "Category",
                    },
                    {
                        __typename: "Category",
                    },
                    {
                        __typename: "Category",
                    },
                ],
            },
        },
    },
};

const AUTHORS = {
    data: {
        __typename: "FunnelPage",
        sys: {
            id: "42dEvGzItdnQwh6SmN13Gy",
            __typename: "Sys",
        },
        slug: "authors",
        theme: "theme-green",
        showBackButton: true,
        skipWrapper: true,
        footer: {
            sys: {
                id: "2NTTQfagJPlLJokoA6OdO0",
                __typename: "Sys",
            },
            __typename: "Footer",
            name: "Main Footer > All pages",
        },
        navBar: {
            sys: {
                id: "1BGhvliX55v5nvJcOmiFeQ",
                __typename: "Sys",
            },
            __typename: "Navbar",
            name: "Home Page > Navbar",
            sticky: false,
            showBorder: false,
        },
        template: {
            __typename: "Template",
            sys: {
                id: "5dGRTTlhH4XvCKwbVQKz2L",
                __typename: "Sys",
            },
            name: "Authors Template",
            sectionsCollection: {
                __typename: "TemplateSectionsCollection",
                items: [
                    {
                        __typename: "Author",
                        sys: {
                            id: "6F9v53Bnk4fY3OnQPIAMH",
                            __typename: "Sys",
                        },
                        name: "Ivan Lara",
                        bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                        avatar: {
                            __typename: "Asset",
                            url: "https://images.ctfassets.net/wj2zmppehg9u/2kDgHv9QKxbJtIZfNIBZL5/99682cd2f5704337b189dd5b98ff190b/pp.jpg",
                            title: "Ivan Lara",
                            description: "",
                        },
                    },
                    {
                        __typename: "Author",
                        sys: {
                            id: "fA9QGLvpFiWXwPrz1IDEs",
                            __typename: "Sys",
                        },
                        name: "Nina Kovács",
                        bio: "Frontend engineer working with Nuxt and TypeScript, interested in clean code, content-driven sites, and developer experience.",
                        avatar: {
                            __typename: "Asset",
                            url: "https://images.ctfassets.net/wj2zmppehg9u/6xkYyJpi5VhxZ8cPHbbYj3/e0a84440af8bc505bbd5c4757bb9db4a/300",
                            title: "Nina Kovács",
                            description: "",
                        },
                    },
                    {
                        __typename: "Author",
                        sys: {
                            id: "52YTvWYYonx4ifufCVODpa",
                            __typename: "Sys",
                        },
                        name: "Lucas Pereira",
                        bio: "Software engineer interested in performance optimization, static rendering strategies, and modern frontend toolin",
                        avatar: {
                            __typename: "Asset",
                            url: "https://images.ctfassets.net/wj2zmppehg9u/5HAoy0ztKTzFwW819zZx7S/3e4d2c7cda1b2a8ef8e378789940cfe9/300",
                            title: "Lucas Pereira",
                            description: "",
                        },
                    },
                    {
                        __typename: "Author",
                        sys: {
                            id: "5oiKmKtiVLzCo4qwd7OeAU",
                            __typename: "Sys",
                        },
                        name: "Emma Johansson",
                        bio: "Frontend specialist working with Nuxt, design systems, and accessibility to create reliable and user-friendly web applications.",
                        avatar: {
                            __typename: "Asset",
                            url: "https://images.ctfassets.net/wj2zmppehg9u/7JlXq7JO4sa0irLKCx1I7T/135069dfc1ab3d34c8ecea1509b8db59/300",
                            title: "Emma Johansson",
                            description: "",
                        },
                    },
                    {
                        __typename: "Author",
                        sys: {
                            id: "xZ8xs9t51pgU8yXyV04Jy",
                            __typename: "Sys",
                        },
                        name: "Daniel Chen",
                        bio: "Full-stack developer with experience in scalable frontend architectures, API design, and long-term product maintenance.",
                        avatar: {
                            __typename: "Asset",
                            url: "https://images.ctfassets.net/wj2zmppehg9u/4wZFYOx7Q0NGlgNlGU1qFr/eb79d29b7b3d3f297db08148e5aadd2c/300",
                            title: "Daniel Chen",
                            description: "",
                        },
                    },
                    {
                        __typename: "Author",
                        sys: {
                            id: "7mNFJVwOIL3s3wZx7Ef6UU",
                            __typename: "Sys",
                        },
                        name: "Sofia Ramirez",
                        bio: "Web developer and technical writer passionate about modern JavaScript, TypeScript, and clear documentation for growing teams.",
                        avatar: {
                            __typename: "Asset",
                            url: "https://images.ctfassets.net/wj2zmppehg9u/2AlTtSZ3Cl0F7ujMF3QagA/3f3d97009c821b6fdbcac56e97add908/300",
                            title: "Sofia Ramirez",
                            description: "",
                        },
                    },
                    {
                        __typename: "CtaBanner",
                        sys: {
                            id: "2SLbZExhmiE3k5rLOsLfIS",
                            __typename: "Sys",
                        },
                        sectionHeading: null,
                        title: "Authors",
                        subtitle: null,
                        label: "Authors",
                        paragraphs: null,
                        tone: "prominent",
                        class: null,
                        size: null,
                    },
                ],
            },
        },
    },
};
