import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { z } from "zod";
import { reactive, ref } from "vue";
import {
    Form,
    FormField,
    FormStep,
    FormWizard,
    FormWizardControls,
    FormWizardProgress,
} from "@starter/ui/organisms";
import { Input } from "@starter/ui/atoms";

const meta = {
    title: "Organisms/Form Wizard",
    component: FormWizard as any,
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
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
                email: z.email("Invalid email address"),
                name: z.string().min(2, "Must be at least 2 characters"),
                company: z.string().min(2, "Must be at least 2 characters"),
            });

            type LoginSchemaType = z.infer<typeof schema>;

            const state = reactive<LoginSchemaType>({
                email: "",
                name: "",
                company: "",
            });

            const submittedData = ref<LoginSchemaType | null>(null);

            function onSubmit(data: LoginSchemaType) {
                console.log("Form submitted!", data);
                submittedData.value = data;
                alert(`Login successful for ${data.email}`);
            }

            return { schema, state, onSubmit, submittedData, args };
        },
        template: `
          <Form :schema="schema" :state="state" class="p-4" @submit="onSubmit">
            <FormWizard>
              <FormWizardProgress />

              <FormStep
                name="account"
                label="Account Info"
                :fields="['email']"
              >
                <FormField name="email" label="Email" v-slot="{ field, invalid }">
                  <Input type="email" v-bind="field" :invalid="invalid" />
                </FormField>
              </FormStep>

              <FormStep
                name="profile"
                label="Profile"
                :fields="['name', 'company']"
              >
                <FormField name="name" label="Name" v-slot="{ field, invalid }">
                  <Input type="text" v-bind="field" :invalid="invalid" />
                </FormField>

                <FormField name="company" label="Company" v-slot="{ field, invalid }">
                  <Input type="text" v-bind="field" :invalid="invalid" />
                </FormField>
              </FormStep>

              <FormStep name="summary" label="Summary">
                <p><strong>Email:</strong> {{ state.email }}</p>
                <p><strong>Name:</strong> {{ state.name }}</p>
                <p><strong>Company:</strong> {{ state.company }}</p>
              </FormStep>

              <FormWizardControls />
            </FormWizard>
          </Form>
    `,
    }),
};
