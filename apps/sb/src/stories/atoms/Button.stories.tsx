import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Button } from "@starter/ui/atoms/button";
import {
    ShoppingBasket,
    LinkIcon,
    SquareArrowOutUpRight,
    Settings,
} from "lucide-vue-next";

const meta = {
    title: "Atoms/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The Button component is a versatile and reusable UI element that can be customized using various props to fit different design requirements.",
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
            options: [
                "primary",
                "secondary",
                "outline",
                "ghost",
                "link",
                "success",
                "danger",
            ],
        },
        size: {
            control: { type: "inline-radio" },
            options: ["sm", "md", "lg"],
        },
        rounded: {
            control: { type: "inline-radio" },
            options: ["none", "sm", "default", "md", "lg", "full"],
        },
        as: {
            control: { type: "select" },
            options: ["button", "a"],
        },
        type: {
            control: { type: "select" },
            options: ["button", "submit", "reset"],
        },
        default: {
            table: { disable: true },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: "primary",
        size: "lg",
    },
    render: (args) => ({
        components: { Button },
        setup: () => ({ args }),
        template: `
      <Button v-bind="args">Read More</Button>
    `,
    }),
};

export const AddToCart: Story = {
    args: {
        variant: "success",
        size: "md",
        rounded: "full",
        onClick: () => alert("Added to cart!"),
    },
    render: (args) => ({
        components: { Button, ShoppingBasket },
        setup: () => ({ args }),
        template: `
            <Button v-bind="args">
                <span class="flex items-center gap-2">
                    <span>Add to Cart</span>
                    <ShoppingBasket class="size-4" />
                </span>
            </Button>`,
    }),
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        size: "sm",
    },
    render: (args) => ({
        components: { Button, LinkIcon },
        setup: () => ({ args }),
        template: `
            <Button v-bind="args">
                <LinkIcon class="size-4" />
            </Button>`,
    }),
};

export const Link: Story = {
    args: {
        variant: "link",
        size: "md",
        as: "a",
        href: "#",
    },
    render: (args) => ({
        components: { Button, SquareArrowOutUpRight },
        setup: () => ({ args }),
        template: `
            <Button v-bind="args">
                <span class="flex items-center gap-2">
                    <span>Read article</span>
                    <SquareArrowOutUpRight class="size-4" />
                </span>
            </Button>`,
    }),
};

export const Outline: Story = {
    args: {
        variant: "outline",
    },
    render: (args) => ({
        components: { Button, Settings },
        setup: () => ({ args }),
        template: `
            <Button v-bind="args">
                <span class="flex items-center gap-2">
                    <Settings class="size-4" />
                    <span>Settings</span>
                </span>
            </Button>`,
    }),
};
