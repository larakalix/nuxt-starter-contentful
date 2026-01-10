import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { z } from "zod";
import { reactive, ref } from "vue";
import { FormField } from "@starter/ui/molecules";
import { Button, Input } from "@starter/ui/atoms";
import { Form } from "@starter/ui/organisms";

const meta = {
    title: "Organisms/Form",
    component: Form as any,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A comprehensive form component with Zod validation, field tracking, and error management.",
            },
        },
    },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { Form, FormField, Input, Button },
        setup() {
            const schema = z.object({
                email: z.email("Invalid email address"),
                password: z.string().min(8, "Must be at least 8 characters"),
            });

            type LoginSchemaType = z.infer<typeof schema>;

            const state = reactive<LoginSchemaType>({
                email: "",
                password: "",
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
          <div style="max-width: 400px; margin: 2rem auto;">
            <h2 style="margin-bottom: 1.5rem;">Login Form</h2>
            
            <Form
              :schema="schema"
              :state="state"
              :validateOnChange="true"
              @submit="onSubmit"
            >
              <FormField name="email" label="Email" v-slot="{ field, invalid }">
                <Input type="email" v-bind="field" :invalid="invalid" />
              </FormField>

              <FormField name="password" label="Password" v-slot="{ field, invalid }">
                <Input type="password" v-bind="field" :invalid="invalid" />
              </FormField>

              <Button type="submit">Login</Button>
            </Form>
          </div>
    `,
    }),
};

export const WithInitialValues: Story = {
    render: (args) => ({
        components: { Form, FormField, Input, Button },
        setup() {
            const schema = z.object({
                username: z.string().min(3, "Must be at least 3 characters"),
                age: z
                    .number()
                    .min(18, "Must be at least 18 years old")
                    .refine(
                        (val) => Number.isInteger(val),
                        "Age must be an integer"
                    ),
            });

            type UserSchemaType = z.infer<typeof schema>;

            const state = reactive<UserSchemaType>({
                username: "John Doe",
                age: 30,
            });

            function onSubmit(data: UserSchemaType) {
                console.log("Form submitted!", data);
                alert(`User ${data.username} is ${data.age} years old`);
            }

            return { schema, state, onSubmit, args };
        },
        template: `
          <div style="max-width: 400px; margin: 2rem auto;">
            <h2 style="margin-bottom: 1.5rem;">User Form with Initial Values</h2>
            
            <Form
              :schema="schema"
              :state="state"
              :validateOnChange="true"
              @submit="onSubmit"
            >
              <FormField name="username" label="Username" v-slot="{ field, invalid }">
                <Input type="text" v-bind="field" :invalid="invalid" />
              </FormField>

              <FormField name="age" label="Age" v-slot="{ field, invalid }">
                <Input type="number" v-bind="field" :invalid="invalid" />
              </FormField>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
    `,
    }),
};

export const WithNestedFields: Story = {
    render: (args) => ({
        components: { Form, FormField, Input, Button },
        setup() {
            const schema = z.object({
                company: z.string().min(2, "Must be at least 2 characters"),
                user: z.object({
                    name: z.string().min(3, "Must be at least 3 characters"),
                    email: z.email("Invalid email address"),
                }),
            });

            type UserFormSchema = z.infer<typeof schema>;

            const state = reactive<UserFormSchema>({
                company: "",
                user: {
                    name: "",
                    email: "",
                },
            });

            function onSubmit(data: UserFormSchema) {
                console.log("Form submitted!", data);
                alert(
                    `User ${data.user.name} with email ${data.user.email} submitted the form`
                );
            }

            return { schema, state, onSubmit, args };
        },
        template: `
          <div style="max-width: 400px; margin: 2rem auto;">
            <h2 style="margin-bottom: 1.5rem;">Nested User Form</h2>
            
            <Form
              :schema="schema"
              :state="state"
              :validateOnChange="true"
              @submit="onSubmit"
            >
              <FormField name="company" label="Company" v-slot="{ field, invalid }">
                <Input type="text" v-bind="field" :invalid="invalid" />
              </FormField>

              <FormField name="user.name" label="Name" v-slot="{ field, invalid }">
                <Input type="text" v-bind="field" :invalid="invalid" />
              </FormField>

              <FormField name="user.email" label="Email" v-slot="{ field, invalid }">
                <Input type="email" v-bind="field" :invalid="invalid" />
              </FormField>

              <Button type="submit">Submit</Button>
            </Form>
          </div>
    `,
    }),
};
