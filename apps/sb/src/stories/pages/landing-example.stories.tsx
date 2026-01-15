import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { LandingExample } from "@starter/ui/pages/landing-example";

const meta = {
    title: "Pages/Landing Example",
    component: LandingExample,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The Landing Example page showcases a sample landing page layout using various UI components from the design system, demonstrating responsiveness and visual hierarchy.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
} satisfies Meta<typeof LandingExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
