import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Badge, Button } from "@starter/ui/atoms";

const meta = {
    title: "Atoms/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The Badge component is a compact UI element used to display small pieces of information, such as status indicators or counts, in a visually distinct manner.",
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
            options: ["solid", "outline", "ghost", "soft", "primary-outline"],
        },
        color: {
            control: { type: "select" },
            options: [
                "default",
                "primary",
                "secondary",
                "success",
                "danger",
                "warning",
                "info",
            ],
        },
        rounded: {
            control: { type: "select" },
            options: ["none", "xs", "sm", "md", "lg", "xl", "full"],
        },
        class: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { label: "Badge Label", variant: "solid", color: "secondary" },
    render: (args) => ({
        components: { Badge },
        setup: () => ({ args }),
        template: `<Badge v-bind="args" />`,
    }),
};

export const WithButton: Story = {
    args: { label: "New", variant: "solid", color: "primary", rounded: "full" },
    render: (args) => ({
        components: { Badge, Button },
        setup: () => ({ args }),
        template: `
            <div>
                <Button variant="ghost" size="lg" class="flex items-center gap-2">
                    <span>Notifications</span>
                    <Badge v-bind="args" />
                </Button>
            </div>
        `,
    }),
};
