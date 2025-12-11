import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { BlogCardList } from "@starter/ui/organisms";

const meta = {
    title: "Organisms/Blog Card List",
    component: BlogCardList,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
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
    items: [
        {
            id: "blog-card-1",
            tag: {
                label: "Technology",
                variant: "solid",
                color: "primary",
                rounded: "sm",
            },
            title: "Exploring the Future of AI: Trends to Watch in 2024",
            imageSrc:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Futuristic AI concept image",
            authorName: "Jane Doe",
            authorAvatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
            dateLabel: "20 June 2024",
            readTimeLabel: "5 Min. To Read",
            layout: "horizontal",
        },
        {
            id: "blog-card-2",
            tag: {
                label: "Health",
                variant: "solid",
                color: "success",
                rounded: "sm",
            },
            title: "I Created a Developer Rap Video - Here's What I Learned",
            imageSrc:
                "https://plus.unsplash.com/premium_photo-1696799145787-34f745238354?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            imageAlt: "Healthy lifestyle concept image",
            authorName: "John Smith",
            authorAvatarSrc: "https://randomuser.me/api/portraits/men/46.jpg",
            dateLabel: "15 June 2024",
            readTimeLabel: "7 Min. To Read",
            layout: "horizontal",
        },
        {
            id: "blog-card-3",
            tag: {
                label: "Travel",
                variant: "solid",
                color: "secondary",
                rounded: "sm",
            },
            title: "Top 10 Travel Destinations for 2024",
            imageSrc:
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Beautiful travel destination image",
            authorName: "Alice Johnson",
            authorAvatarSrc: "https://randomuser.me/api/portraits/women/65.jpg",
            dateLabel: "10 June 2024",
            readTimeLabel: "6 Min. To Read",
            layout: "horizontal",
        },
    ],
    layout: "grid",
    columns: 3,
} satisfies Partial<Story["args"]>;

export const Default: Story = {
    args: {
        ...defaultProps,
    },
    render: (args) => ({
        components: { BlogCardList },
        setup: () => ({ args }),
        template: `
            <div class="max-w-5xl"><BlogCardList v-bind="args" /></div>
        `,
    }),
};

export const List: Story = {
    args: {
        ...defaultProps,
        layout: "stacked",
    },
    render: (args) => ({
        components: { BlogCardList },
        setup: () => ({ args }),
        template: `
            <div class="max-w-5xl"><BlogCardList v-bind="args" /></div>
        `,
    }),
};
