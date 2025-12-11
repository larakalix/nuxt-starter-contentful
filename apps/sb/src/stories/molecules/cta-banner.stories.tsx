import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { CtaBanner } from "@starter/ui/molecules";

const meta = {
    title: "Molecules/Cta Banner",
    component: CtaBanner,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The CtaBanner component is a prominent call-to-action banner designed to capture user attention and encourage interaction through compelling messaging and a clear action button.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        tone: {
            control: { type: "select" },
            options: ["default", "soft", "prominent"],
        },
        size: {
            control: { type: "select" },
            options: ["xs", "sm", "md", "lg"],
        },
        label: {
            control: { type: "text" },
        },
        brandTitle: {
            control: { type: "text" },
        },
        title: {
            control: { type: "text" },
        },
        subtitle: {
            control: { type: "text" },
        },
        paragraphs: {
            control: { type: "object" },
        },
        buttonProps: {
            control: { type: "object" },
        },
        class: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof CtaBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
    sectionHeading: {
        label: "Write On",
        title: "Notebook",
        tag: {
            variant: "solid",
            color: "primary",
            rounded: "none",
            class: "px-2 py-1 text-base! font-semibold",
        },
    },
    title: "Write on notebook is very simple",
    tone: "soft",
    size: "md",
    paragraphs: [
        "Join thousands of writers using Notebook to bring their ideas to life.",
        "Unlock your creativity with our intuitive writing tools.",
        "Stay organized and inspired with our seamless interface.",
    ],
    buttonProps: {
        label: "Get Started",
        href: "#",
        variant: "outline",
        rounded: "md",
        size: "md",
    },
} satisfies Meta<typeof CtaBanner>["args"];

export const Default: Story = {
    args: {
        ...defaultProps,
    },
    render: (args) => ({
        components: { CtaBanner },
        setup: () => ({ args }),
        template: `<CtaBanner v-bind="args" />`,
    }),
};

export const ProminentLarge: Story = {
    args: {
        ...defaultProps,
        tone: "prominent",
        size: "lg",
    },
    render: (args) => ({
        components: { CtaBanner },
        setup: () => ({ args }),
        template: `<CtaBanner v-bind="args" />`,
    }),
};

export const Small: Story = {
    args: {
        ...defaultProps,
        sectionHeading: undefined,
        title: "Share Your Knowledge with Our Readers",
        tone: "prominent",
        paragraphs: [],
        size: "sm",
        class: "text-center w-full",
    },
    render: (args) => ({
        components: { CtaBanner },
        setup: () => ({ args }),
        template: `<CtaBanner v-bind="args" />`,
    }),
};
