import type { Meta, StoryFn } from "@storybook/vue3-vite";
import { z } from "zod";
import { computed, reactive } from "vue";
import { Form, FormWizard } from "@starter/ui/organisms";
import {
    FormField,
    FormStep,
    FormWizardControls,
    FormWizardProgress,
} from "@starter/ui/molecules";
import { Input } from "@starter/ui/atoms";

const meta = {
    title: "Organisms/Form Wizard",
    component: FormWizard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The Form Wizard component is an organism that provides a structured way to create and manage multi-step forms, including validation, error handling, and navigation between steps.",
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
} satisfies Meta<typeof FormWizard>;

export default meta;

export const BasicWizard: StoryFn = () => ({
    components: {
        FormWizard,
        FormStep,
        FormWizardProgress,
        FormWizardControls,
        Form,
        FormField,
        Input,
    },
    setup() {
        const schema = z.object({
            email: z.email(),
            name: z.string().min(2),
        });

        const state = reactive({
            email: "",
            name: "",
        });

        const step1Valid = computed(() => !!state.email);
        const step2Valid = computed(() => !!state.name);

        const steps = [
            { name: "account", label: "Account" },
            { name: "profile", label: "Profile" },
            { name: "confirm", label: "Confirm" },
        ];

        return { steps, schema, state, step1Valid, step2Valid };
    },
    template: `
    <FormWizard :steps="steps" class="space-y-4 p-4">
      <FormWizardProgress />

      <FormStep name="account" :valid="step1Valid">
        <Form :schema="schema" :state="state">
          <FormField name="email" label="Email" v-slot="{ model, meta, error, onBlur, onInput }">
            <Input type="text" v-model="model.value" @input="onInput" @blur="onBlur" />
          </FormField>
        </Form>
      </FormStep>

      <FormStep name="profile" :valid="step2Valid">
        <Form :schema="schema" :state="state">
          <FormField label="Name" name="name" v-slot="{ model, meta, error, onBlur, onInput }">
            <Input type="text" v-model="model.value" @input="onInput" @blur="onBlur" />
          </FormField>
        </Form>
      </FormStep>

      <FormStep name="confirm">
        <pre>{{ state }}</pre>
      </FormStep>

      <FormWizardControls />
    </FormWizard>
  `,
});
