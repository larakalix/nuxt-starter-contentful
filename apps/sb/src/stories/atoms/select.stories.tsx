import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { Select } from "@starter/ui/atoms";
import { ref } from "vue";

const meta = {
    title: "Atoms/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The Select component is a versatile dropdown menu that allows users to choose from a list of options. It supports features like searchability, placeholders, and helper text to enhance the user experience.",
            },
            controls: {
                sort: "alpha",
                expanded: true,
            },
        },
    },
    argTypes: {
        modelValue: {
            control: { type: "text" },
        },
        options: {
            control: { type: "object" },
        },
        placeholder: {
            control: { type: "text" },
        },
        helper: {
            control: { type: "text" },
        },
        searchable: {
            control: { type: "boolean" },
        },
        disabled: {
            control: { type: "boolean" },
        },
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
    { label: "🍎 Apple", value: "apple" },
    { label: "🍌 Banana", value: "banana" },
    { label: "🍇 Grape", value: "grape" },
    { label: "🍉 Watermelon", value: "watermelon" },
    { label: "🍓 Strawberry", value: "strawberry" },
    { label: "🍍 Pineapple", value: "pineapple" },
    { label: "🍑 Peach", value: "peach" },
    { label: "🍒 Cherry", value: "cherry" },
    { label: "🍋 Lemon", value: "lemon" },
    { label: "🍊 Orange", value: "orange" },
    { label: "🍐 Pear", value: "pear" },
    { label: "🍈 Melon", value: "melon" },
    { label: "🍏 Green Apple", value: "green-apple" },
];

export const Default: Story = {
    render: () => ({
        components: { Select },
        setup() {
            const value = ref();
            return { value, options };
        },
        template: `
      <Select
        v-model="value"
        :options="options"
        placeholder="Select a fruit"
      />
    `,
    }),
};

export const WithHelperText: Story = {
    render: () => ({
        components: { Select },
        setup() {
            const value = ref("astro");
            return { value, options };
        },
        template: `
      <Select
        v-model="value"
        :options="options"
        helper="Please select your favorite fruit from the list."
      />
    `,
    }),
};

export const WithSearch: Story = {
    render: () => ({
        components: { Select },
        setup() {
            const value = ref();
            const fruits = options.map((v) => ({
                label: v.label,
                value: v.value,
            }));
            return { value, fruits };
        },
        template: `
      <Select
        v-model="value"
        :options="fruits"
        placeholder="Select a fruit"
        searchable
      />
    `,
    }),
};
