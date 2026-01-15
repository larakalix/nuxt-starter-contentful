import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { SectionHeading } from "@starter/ui/molecules/section-heading";

const meta = {
    title: "Molecules/Section Heading",
    component: SectionHeading,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The SectionHeading component is used to display a heading for different sections of a webpage, often accompanied by a label or subtitle to provide context.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        align: {
            control: { type: "select" },
            options: ["left", "center", "right"],
        },
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg"],
        },
        label: {
            control: { type: "text" },
        },
        title: {
            control: { type: "text" },
        },
        as: {
            control: { type: "text" },
        },
        class: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
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
    },
};
