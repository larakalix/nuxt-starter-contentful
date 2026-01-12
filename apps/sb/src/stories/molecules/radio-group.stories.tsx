import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { RadioGroup, RadioOption, RadioSwatch } from "@starter/ui/molecules";
import { ref } from "vue";

const meta = {
    title: "Molecules/Radio Group",
    component: RadioGroup,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The RadioGroup component allows users to select one option from a set of predefined options. It is commonly used in forms and settings where only one choice is allowed.",
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
        disabled: {
            control: { type: "boolean" },
        },
        variant: {
            control: { type: "select" },
            options: ["default", "card"],
        },
    },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    render: () => ({
        components: { RadioGroup, RadioOption },
        setup() {
            const value = ref("with");
            return { value };
        },
        template: `
      <div class="max-w-sm">
        <RadioGroup v-model="value" variant="list">
          <RadioOption
            value="with"
            label="Buy cold war expansion"
            description="You can use this checkbox with a label and a description."
          >
            <template #expansion>
              Price: $59.99
            </template>
          </RadioOption>

          <RadioOption
            value="without"
            label="Radio without expansion"
            description="You can use this checkbox with a label and a description."
          />
        </RadioGroup>
      </div>
    `,
    }),
};

export const ServerLocation: Story = {
    render: () => ({
        components: { RadioGroup, RadioOption },
        setup() {
            const value = ref("usa");
            return { value };
        },
        template: `
      <div class="max-w-md">
        <div class="text-sm font-medium text-gray-900 mb-2">Server location</div>

        <RadioGroup v-model="value" variant="pill">
          <RadioOption value="usa" label="USA" />
          <RadioOption value="uk" label="UK" />
          <RadioOption value="fr" label="France" />
        </RadioGroup>
      </div>
    `,
    }),
};

export const ChooseAColor: Story = {
    render: () => ({
        components: { RadioGroup, RadioSwatch },
        setup() {
            const value = ref("blue");
            return { value };
        },
        template: `
      <div class="max-w-md">
        <div class="text-sm font-medium text-gray-900 mb-2">Choose a color</div>

        <RadioGroup v-model="value" variant="swatch">
          <RadioSwatch value="blue" ariaLabel="Blue" colorClass="bg-blue-500" />
          <RadioSwatch value="indigo" ariaLabel="Indigo" colorClass="bg-indigo-500" />
          <RadioSwatch value="pink" ariaLabel="Pink" colorClass="bg-pink-500" />
          <RadioSwatch value="red" ariaLabel="Red" colorClass="bg-red-500" />
          <RadioSwatch value="orange" ariaLabel="Orange" colorClass="bg-orange-500" />
          <RadioSwatch value="yellow" ariaLabel="Yellow" colorClass="bg-yellow-400" />
          <RadioSwatch value="green" ariaLabel="Green" colorClass="bg-emerald-500" />
        </RadioGroup>
      </div>
    `,
    }),
};
