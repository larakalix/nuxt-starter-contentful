import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";
import { Navbar } from "@starter/ui/organisms";

const meta = {
    title: "Organisms/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The Navbar component serves as the primary navigation bar for the application, providing links to key sections and enhancing user experience with its customizable design.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["solid", "transparent", "blur"],
        },
        sticky: {
            control: { type: "boolean" },
        },
        showBorder: {
            control: { type: "boolean" },
        },
        ctaLabel: {
            control: { type: "text" },
        },
        ctaHref: {
            control: { type: "text" },
        },
        onLogin: fn(),
        onLogout: fn(),
        onCreateAccount: fn(),
    },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
    items: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
} satisfies Partial<Story["args"]>;

export const Default: Story = {
    args: {
        ...defaultArgs,
        logoText: "MyApp",
    },
};

export const LoggedIn: Story = {
    args: {
        ...defaultArgs,
        user: {
            name: "Jane Doe",
        },
    },
};

export const WithCTA: Story = {
    args: {
        ...defaultArgs,
        logoText: "MyApp",
        ctaLabel: "Create Account",
        ctaHref: "/signup",
    },
};

export const StickyNavbar: Story = {
    args: {
        ...defaultArgs,
        logoText: "MyApp",
        sticky: true,
        showBorder: true,
    },
};

export const NoBorder: Story = {
    args: {
        ...defaultArgs,
        logoText: "MyApp",
        sticky: true,
        showBorder: false,
        class: "bg-red-100 backdrop-blur-md",
    },
};
