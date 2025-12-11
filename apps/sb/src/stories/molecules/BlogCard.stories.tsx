import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { BlogCard } from "@starter/ui/molecules";
import type { BadgeProps } from "@starter/ui/atoms";

const meta = {
    title: "Molecules/Blog Card",
    component: BlogCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
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
    imageSrc:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Futuristic AI concept image",
    authorName: "Jane Doe",
    authorAvatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
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
        template: `
            <div class="max-w-[400px]">
                <BlogCard v-bind="args" />
            </div>
            `,
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
