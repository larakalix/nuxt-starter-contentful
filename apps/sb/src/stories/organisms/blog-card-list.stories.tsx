import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { BlogCardList } from "@starter/ui/organisms/blog-card-list";

const meta = {
    title: "Organisms/Blog Card List",
    component: BlogCardList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The Blog Card List component is an organism that displays a collection of blog cards in various layouts, allowing for easy browsing of blog posts.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        layout: {
            control: { type: "select" },
            options: ["grid", "list"],
        },
        columns: {
            control: { type: "select" },
            options: [1, 2, 3, 4],
        },
        class: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof BlogCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
    sectionHeading: {
        label: "Featured",
        title: "This Month",
        align: "left",
        size: "md",
        as: "h2",
        tag: {
            variant: "solid",
            color: "primary",
            rounded: "none",
            class: "px-2 py-1 text-base! font-semibold",
        },
        class: "mb-12",
    },
    items: [
        {
            id: "blog-card-1",
            tag: {
                label: "Technology",
                variant: "solid",
                color: "primary",
                rounded: "none",
            },
            title: "Exploring the Future of AI: Trends to Watch in 2024",
            imageSrc:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Futuristic AI concept image",
            authors: [
                {
                    name: "Jane Doe",
                    avatarSrc:
                        "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                    name: "John Smith",
                    avatarSrc: "https://randomuser.me/api/portraits/men/46.jpg",
                },
            ],
            dateLabel: "20 June 2024",
            readTimeLabel: "5 Min. To Read",
            layout: "vertical",
            excerpt:
                "Exploring the latest advancements and future possibilities in artificial intelligence for 2024.",
        },
        {
            id: "blog-card-2",
            tag: {
                label: "Health",
                variant: "solid",
                color: "primary",
                rounded: "none",
            },
            title: "I Created a Developer Rap Video - Here's What I Learned",
            imageSrc:
                "https://plus.unsplash.com/premium_photo-1696799145787-34f745238354?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            imageAlt: "Healthy lifestyle concept image",
            authors: [
                {
                    name: "Jane Doe",
                    avatarSrc:
                        "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                    name: "John Smith",
                    avatarSrc: "https://randomuser.me/api/portraits/men/46.jpg",
                },
            ],
            dateLabel: "15 June 2024",
            readTimeLabel: "7 Min. To Read",
            layout: "vertical",
            excerpt:
                "Discover effective strategies to maintain a healthy lifestyle in today's fast-paced world.",
        },
        {
            id: "blog-card-3",
            tag: {
                label: "Travel",
                variant: "solid",
                color: "primary",
                rounded: "none",
            },
            title: "Top 10 Travel Destinations for 2024",
            imageSrc:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Beautiful travel destination image",
            authors: [
                {
                    name: "Jane Doe",
                    avatarSrc:
                        "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                    name: "John Smith",
                    avatarSrc: "https://randomuser.me/api/portraits/men/46.jpg",
                },
            ],
            dateLabel: "10 June 2024",
            readTimeLabel: "6 Min. To Read",
            layout: "vertical",
            excerpt:
                "Discover the must-visit places around the world for your next adventure in 2024.",
        },
    ],
    layout: "grid",
    columns: 2,
} satisfies Partial<Story["args"]>;

export const Default: Story = {
    args: {
        ...defaultProps,
    },
};

export const List: Story = {
    args: {
        ...defaultProps,
        layout: "stacked",
    },
    render: (args) => ({
        components: { BlogCardList },
        setup: () => ({ args }),
        template: `<div class="max-w-xl"><BlogCardList v-bind="args" /></div>`,
    }),
};
