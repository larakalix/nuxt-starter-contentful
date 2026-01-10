import type { Meta, StoryFn } from "@storybook/vue3-vite";
import { z } from "zod";
import { reactive } from "vue";
import { Form } from "@starter/ui/organisms";
import { FormField } from "@starter/ui/molecules";
import { Button, Input } from "@starter/ui/atoms";

const meta = {
    title: "Organisms/Form",
    component: Form,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "The Form component is an organism that provides a structured way to create and manage forms, including validation, error handling, and submission.",
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
} satisfies Meta<typeof Form>;

export default meta;

const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters"),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const Login: StoryFn = () => ({
    components: { Form, FormField, Input, Button },
    setup() {
        const state = reactive<LoginSchemaType>({
            email: "",
            password: "",
        });

        function onSubmit(e: any) {
            const data = LoginSchema.parse(state) as LoginSchemaType;
            console.log("SUBMIT", data);
        }

        return { LoginSchema, state, onSubmit };
    },
    template: `
    <Form :schema="LoginSchema" :state="state" class="space-y-4 p-4" @submit="onSubmit">
      <FormField name="email" label="Email" v-slot="{ field }">
        <Input type="text" v-bind="field" />

        <pre class="text-xs mt-2">{{ {
          state,
          model,
          meta: { touched: field.meta.touched, dirty: field.meta.dirty, blurred: field.meta.blurred },
          error
        } }}</pre>
      </FormField>

      <FormField name="password" label="Password" v-slot="{ field }">
        <Input type="password" v-bind="field.bind" />

        <pre class="text-xs mt-2">{{ {
          state,
          model,
          meta: { touched: field.meta.touched, dirty: field.meta.dirty, blurred: field.meta.blurred },
          error
        } }}</pre>
      </FormField>

      <Button type="submit">Login</Button>
    </Form>
  `,
});

export const AsyncValidation: StoryFn = () => ({
    components: { Form, FormField, Input, Button },
    setup() {
        const schema = z.object({
            email: z.string().email(),
        });

        const state = reactive({ email: "" });

        async function validate(values: any) {
            await new Promise((r) => setTimeout(r, 800));

            if (values.email === "taken@email.com") {
                return [{ name: "email", message: "Email already taken" }];
            }
            return [];
        }

        return { schema, state, validate };
    },
    template: `
    <Form :schema="schema" :state="state" :validate="validate" class="space-y-4 p-4">
      <FormField label="Email" name="email">
        <Input :v-model="state.email" />
      </FormField>

      <Button type="submit">Submit</Button>
    </Form>
  `,
});
