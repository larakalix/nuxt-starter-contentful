import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Input } from "@starter/ui/atoms/input";

const meta = {
    title: "Atoms/Input",
    component: Input,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The Input component is an atom that provides a basic input field for user interaction, supporting various types and validation.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        class: {
            control: { type: "text" },
        },
        type: {
            control: { type: "select" },
            options: ["text", "email", "password", "number"],
        },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        type: "text",
        placeholder: "Enter text",
    },
};

export const Color: Story = {
    args: {
        type: "color",
        placeholder: "Enter your email",
    },
};

export const Password: Story = {
    args: {
        type: "password",
        placeholder: "Enter your password",
    },
};

export const Invalid: Story = {
    args: {
        type: "text",
        placeholder: "Enter text",
        invalid: true,
        variant: "error",
    },
};

export const Disabled: Story = {
    args: {
        type: "text",
        placeholder: "Enter text",
        disabled: true,
    },
};
