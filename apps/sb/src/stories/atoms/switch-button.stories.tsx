import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { SwitchButton } from "@starter/ui/atoms/switch-button";
import { ref } from "vue";

const meta = {
    title: "Atoms/Switch Button",
    component: SwitchButton,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The Switch Button component is a toggleable UI element that allows users to switch between two states, typically representing an on/off or true/false value.",
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
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof SwitchButton>;

export const Default: Story = {
    render: (args) => ({
        components: { SwitchButton },
        setup() {
            const value = ref(false);
            return { value, args };
        },
        template: `
            <div class="flex items-center gap-3">
                <SwitchButton v-model="value" v-bind="args" />
                <span class="text-sm text-gray-400">
                {{ value ? 'On' : 'Off' }}
                </span>
            </div>
    `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        components: { SwitchButton },
        setup() {
            const value = ref(true);
            return { value };
        },
        template: `
      <SwitchButton
        v-model="value"
        label="Notifications"
      />
    `,
    }),
};

export const SuccessVariant: Story = {
    render: () => ({
        components: { SwitchButton },
        setup() {
            const value = ref(true);
            return { value };
        },
        template: `
      <SwitchButton
        v-model="value"
        variant="success"
        label="Enabled"
      />
    `,
    }),
};
