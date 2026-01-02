import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { BlogCard } from "@starter/ui/molecules";
import type { BadgeProps } from "@starter/ui/atoms";

const meta = {
    title: "Molecules/Blog Card",
    component: BlogCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The BlogCard component is a versatile UI element designed to showcase blog posts with key information such as title, author, date, and excerpt in an engaging format.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        tag: {
            control: { type: "object" },
        },
        variant: {
            control: { type: "select" },
            options: ["default", "compact"],
        },
        clickable: {
            control: { type: "boolean" },
        },
        class: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
    tag: {
        label: "Technology",
        variant: "solid",
        color: "primary",
        rounded: "sm",
    } satisfies BadgeProps,
    title: "Exploring the Future of AI: Trends to Watch in 2024",
    authors: [
        {
            name: "Jane Doe",
            avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "John Smith",
            avatarSrc: "https://randomuser.me/api/portraits/men/46.jpg",
        },
    ],
    dateLabel: "20 June 2024",
    readTimeLabel: "5 Min. To Read",
} satisfies Partial<typeof BlogCard.props>;

export const Default: Story = {
    args: {
        ...defaultProps,
        excerpt:
            "Dive into the latest advancements in artificial intelligence and discover the trends that will shape the tech landscape in 2024 and beyond.",
        href: "#",
        variant: "default",
    },
    render: (args) => ({
        components: { BlogCard },
        setup: () => ({ args }),
        template: `<BlogCard v-bind="args" />`,
    }),
};

export const Compact: Story = {
    args: {
        ...defaultProps,
        tag: undefined,
        href: "#",
        variant: "compact",
    },
    render: (args) => ({
        components: { BlogCard },
        setup: () => ({ args }),
        template: `
            <div class="max-w-[400px]">
                <BlogCard v-bind="args" />
            </div>
            `,
    }),
};

export const List: Story = {
    args: {
        ...defaultProps,
        tag: {
            label: "Design",
            variant: "outline",
            color: "primary",
            rounded: "sm",
            class: "font-semibold ",
        },
        title: "Design is the Mix of emotions",
        imageSrc: undefined,
        excerpt:
            "Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp",
        href: "#",
        variant: "default",
        dateLabel: "02 December 2025",
        readTimeLabel: "3 Min. To Read",
    },
    render: (args) => ({
        components: { BlogCard },
        setup: () => ({ args }),
        template: `
            <div class="max-w-5xl">
                <BlogCard v-bind="args" />
            </div>
            `,
    }),
};

export const Horizontal: Story = {
    args: {
        ...defaultProps,
        excerpt:
            "Exploring the latest trends in AI technology, from machine learning advancements to ethical considerations shaping the future.",
        layout: "horizontal",
        href: "#",
        variant: "default",
    },
    render: (args) => ({
        components: { BlogCard },
        setup: () => ({ args }),
        template: `
            <div class="max-w-3xl">
                <BlogCard v-bind="args" />
            </div>
            `,
    }),
};

export const Post: Story = {
    args: {
        ...defaultProps,
        layout: "post",
        imageSrc:
            "https://images.unsplash.com/photo-1713345248737-2698000f143d?q=80&w=1629&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        href: "#",
        variant: "default",
        imageAlt: "Blog post main image",
        bodyContent: JSON.stringify(
            {
                nodeType: "document",
                content: [
                    {
                        nodeType: "heading-2",
                        content: [
                            {
                                nodeType: "text",
                                value: "The Future of AI in 2024",
                                marks: [],
                                data: {},
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "paragraph",
                        content: [
                            {
                                nodeType: "text",
                                value: "Artificial Intelligence (AI) has rapidly evolved over the past decade, transforming various industries and reshaping the way we live and work. As we look ahead to 2024, several key trends are emerging that will define the future of AI technology.",
                                marks: [],
                                data: {},
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "paragraph",
                        content: [
                            {
                                nodeType: "text",
                                value: "One of the most significant trends is the advancement of machine learning algorithms. These algorithms are becoming more sophisticated, allowing AI systems to learn from vast amounts of data and make more accurate predictions. This has led to breakthroughs in areas such as natural language processing, computer vision, and autonomous systems.",
                                marks: [],
                                data: {},
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "table",
                        content: [
                            {
                                nodeType: "table-row",
                                content: [
                                    {
                                        nodeType: "table-header-cell",
                                        content: [
                                            {
                                                nodeType: "text",
                                                value: "Year",
                                                marks: [],
                                                data: {},
                                            },
                                        ],
                                        data: {},
                                    },
                                    {
                                        nodeType: "table-header-cell",
                                        content: [
                                            {
                                                nodeType: "text",
                                                value: "AI Milestone",
                                                marks: [],
                                                data: {},
                                            },
                                        ],
                                        data: {},
                                    },
                                ],
                                data: {},
                            },
                            {
                                nodeType: "table-row",
                                content: [
                                    {
                                        nodeType: "table-cell",
                                        content: [
                                            {
                                                nodeType: "text",
                                                value: "2022",
                                                marks: [],
                                                data: {},
                                            },
                                        ],
                                        data: {},
                                    },
                                    {
                                        nodeType: "table-cell",
                                        content: [
                                            {
                                                nodeType: "text",
                                                value: "AI models achieve human-level performance in specific tasks",
                                                marks: [],
                                                data: {},
                                            },
                                        ],
                                        data: {},
                                    },
                                ],
                                data: {},
                            },
                            {
                                nodeType: "table-row",
                                content: [
                                    {
                                        nodeType: "table-cell",
                                        content: [
                                            {
                                                nodeType: "text",
                                                value: "2023",
                                                marks: [],
                                                data: {},
                                            },
                                        ],
                                        data: {},
                                    },
                                    {
                                        nodeType: "table-cell",
                                        content: [
                                            {
                                                nodeType: "text",
                                                value: "Widespread adoption of AI in healthcare and finance",
                                                marks: [],
                                                data: {},
                                            },
                                        ],
                                        data: {},
                                    },
                                ],
                                data: {},
                            },
                        ],
                        data: {},
                    },
                ],
                data: {},
            },
            null,
            2
        ),
    },
};
