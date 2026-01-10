import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { SwitchCard } from "@starter/ui/molecules";
import { ref } from "vue/dist/vue.js";

const meta = {
    title: "Molecules/Switch Card",
    component: SwitchCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The Switch Card component is a versatile UI element that combines the functionality of a switch with the visual appeal of a card. It allows users to toggle between two states while providing additional information or context within the card layout.",
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
        label: {
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof SwitchCard>;

export default meta;
type Story = StoryObj<typeof SwitchCard>;

export const Default: Story = {
    render: (args) => ({
        components: { SwitchCard },
        setup() {
            const value = ref(false);
            return { value, args };
        },
        template: `
            <SwitchCard v-model="value" v-bind="args" />
    `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        components: { SwitchCard },
        setup() {
            const value = ref(true);
            return { value };
        },
        template: `
      <SwitchCard
        v-model="value"
        label="Enable Notifications"
      />
    `,
    }),
};
