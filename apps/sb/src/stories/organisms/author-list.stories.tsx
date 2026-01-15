import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { AuthorList } from "@starter/ui/organisms/author-list";

const meta = {
    title: "Organisms/Author List",
    component: AuthorList,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The Author List component is an organism that displays a collection of author profiles in various layouts, allowing for easy browsing of authors.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        columns: {
            control: { type: "select" },
            options: [1, 2, 3, 4],
        },
        class: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof AuthorList>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
    sectionHeading: {
        label: "Top",
        title: "Authors",
        align: "left",
        size: "md",
        as: "h2",
        tag: {
            variant: "solid",
            color: "primary",
            rounded: "none",
            class: "px-2 py-1 text-base! font-semibold",
        },
        class: "mb-6",
    },
    items: [
        {
            id: "author-1",
            name: "Andress rasel",
            avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
            avatarAlt: "Andress rasel Avatar",
            role: "Senior Writer",
            bio: "Blogger, activist, content creator, part time web developer.",
            socials: [],
        },
        {
            id: "author-2",
            name: "Jane Doe",
            avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
            avatarAlt: "Jane Doe Avatar",
            role: "Editor",
            bio: "Editor and content strategist with a passion for storytelling.",
            socials: [],
        },
    ],
} satisfies Meta<typeof AuthorList>["args"];

export const Default: Story = {
    args: {
        ...defaultProps,
    },
    render: (args) => ({
        components: { AuthorList },
        setup: () => ({ args }),
        template: `
            <div class="max-w-xl"><AuthorList v-bind="args" /></div>
        `,
    }),
};

export const TwoColumns: Story = {
    args: {
        ...defaultProps,
        items: defaultProps.items.map((item) => ({
            ...item,
            bio: "",
        })),
        columns: 2,
    },
    render: (args) => ({
        components: { AuthorList },
        setup: () => ({ args }),
        template: `
            <div class="max-w-xl"><AuthorList v-bind="args" /></div>
        `,
    }),
};
