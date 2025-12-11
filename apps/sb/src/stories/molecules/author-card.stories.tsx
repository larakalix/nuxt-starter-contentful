import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { AuthorCard } from "@starter/ui/molecules";

const meta = {
    title: "Molecules/Author Card",
    component: AuthorCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The AuthorCard component is designed to display author information in a concise and visually appealing manner, typically including the author's name, avatar, and a brief bio.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        name: {
            control: { type: "text" },
        },
        avatarSrc: {
            control: { type: "text" },
        },
        avatarAlt: {
            control: { type: "text" },
        },
        role: {
            control: { type: "text" },
        },
        class: {
            control: { type: "text" },
        },
        socials: {
            control: { type: "object" },
        },
    },
} satisfies Meta<typeof AuthorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
    name: "Andress rasel",
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    avatarAlt: "Andress rasel Avatar",
    role: "Senior Writer",
    bio: "Blogger, activist, content creator, part time web developer.",
    socials: [],
} satisfies Partial<typeof AuthorCard.props>;

export const Default: Story = {
    args: {
        ...defaultProps,
    },
};

export const WithSocials: Story = {
    args: {
        ...defaultProps,
        socials: [
            {
                type: "twitter",
                href: "https://twitter.com/andressrasel",
                label: "Twitter",
                button: { variant: "primary", size: "xs" },
            },
            {
                type: "linkedin",
                href: "https://linkedin.com/in/andressrasel",
                label: "LinkedIn",
                button: { variant: "ghost", size: "xs" },
            },
            {
                type: "website",
                href: "https://andressrasel.com",
                label: "Personal Website",
                button: { variant: "ghost", size: "xs" },
            },
        ],
    },
};
