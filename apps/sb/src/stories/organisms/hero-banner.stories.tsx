import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { HeroBanner } from "@starter/ui/organisms";

const meta = {
    title: "Organisms/Hero Banner",
    component: HeroBanner,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The Hero Banner component is an organism that serves as a prominent section on a webpage, typically used to showcase key information, promotions, or calls to action.",
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
    },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {};

export const Default: Story = {
    args: {
        ...defaultProps,
    },
};
