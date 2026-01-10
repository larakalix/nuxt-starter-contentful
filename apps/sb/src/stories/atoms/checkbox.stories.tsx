import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Checkbox } from "@starter/ui/atoms";

const meta = {
    title: "Atoms/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The Checkbox component is a versatile and reusable UI element that allows users to select one or more options from a set of choices. It can be used in forms, settings, and other interactive interfaces.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        modelValue: {
            control: { type: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        modelValue: false,
        disabled: false,
    },
};

export const Disabled: Story = {
    args: {
        modelValue: false,
        disabled: true,
    },
};

export const Checked: Story = {
    args: {
        modelValue: true,
        disabled: false,
    },
};

export const CheckedDisabled: Story = {
    args: {
        modelValue: true,
        disabled: true,
    },
};
