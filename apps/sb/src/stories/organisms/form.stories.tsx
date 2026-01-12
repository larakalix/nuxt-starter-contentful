import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { z } from "zod";
import { defineComponent, onMounted, reactive, ref } from "vue";
import {
    Button,
    Checkbox,
    Input,
    Select,
    Switch,
    Textarea,
} from "@starter/ui/atoms";
import { Form, FormField, useFieldArray } from "@starter/ui/organisms";

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
        components: { Form, FormField, Checkbox, Input, Button },
        setup() {
            const schema = z.object({
                email: z.email("Invalid email address"),
                password: z.string().min(8, "Must be at least 8 characters"),
                rememberMe: z.boolean().optional(),
            });

            type LoginSchemaType = z.infer<typeof schema>;

            const state = reactive<LoginSchemaType>({
                email: "",
                password: "",
                rememberMe: false,
            });

            const submittedData = ref<LoginSchemaType | null>(null);

            function onSubmit(data: LoginSchemaType) {
                submittedData.value = data;
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

              <FormField name="rememberMe" v-slot="{ field }">
                <Checkbox label="Remember Me" v-bind="field">
                  <div v-if="value" class="mt-2 text-xs text-gray-400">
                    You can unsubscribe at any time.
                  </div>
                </Checkbox>
              </FormField>

              <Button type="submit">Login</Button>
            </Form>

            <div v-if="submittedData" class="mt-4 p-4 bg-gray-100 submittedData">
              <h3 class="text-sm font-bold text-gray-700 mb-2">Submitted Data:</h3>
              <ul class="text-sm text-gray-600">
                <li><strong>Email:</strong> {{ submittedData.email }}</li>
                <li><strong>Remember Me:</strong> {{ submittedData.rememberMe }}</li>
              </ul>
            </div>
          </div>
    `,
    }),
};

export const WithInitialValues: Story = {
    render: (args) => ({
        components: { Form, FormField, Input, Textarea, Button },
        setup() {
            const configFromDb = {
                minAge: 18,
                maxBioLength: 180,
            };

            const schema = z.object({
                username: z.string().min(3, "Must be at least 3 characters"),
                bio: z
                    .string()
                    .min(10, "Must be at least 10 characters")
                    .max(
                        configFromDb.maxBioLength,
                        `Must be at most ${configFromDb.maxBioLength} characters`
                    )
                    .optional(),
                age: z
                    .number()
                    .transform((val) => (val ? Number(val) : undefined))
                    .refine(
                        (val) =>
                            val === undefined ||
                            (typeof val === "number" &&
                                val >= configFromDb.minAge),
                        {
                            message: `Age must be at least ${configFromDb.minAge}`,
                        }
                    ),
            });

            type UserSchemaType = z.infer<typeof schema>;

            const state = reactive<UserSchemaType>({
                username: "John Doe",
                bio: "",
                age: 30,
            });

            const submittedData = ref<UserSchemaType | null>(null);

            function onSubmit(data: UserSchemaType) {
                submittedData.value = data;
                alert(`User ${data.username} is ${data.age} years old`);
            }

            return { schema, state, onSubmit, submittedData, args };
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

              <FormField name="bio" label="Bio" v-slot="{ field, invalid }">
                <Textarea
                  placeholder="Tell us about yourself"
                  :maxLength="180"
                  hint="Short bio"
                  v-bind="field"
                  :invalid="invalid"
                />
              </FormField>

              <FormField name="age" label="Age" v-slot="{ field, invalid }">
                <Input type="number" v-bind="field" :invalid="invalid" />
              </FormField>

              <Button type="submit">Submit</Button>
            </Form>

            <div v-if="submittedData" class="mt-4 p-4 bg-gray-100 submittedData">
              <h3 class="text-sm font-bold text-gray-700 mb-2">Submitted Data:</h3>
              <ul class="text-sm text-gray-600">
                <li><strong>Username:</strong> {{ submittedData.username }}</li>
                <li><strong>Age:</strong> {{ submittedData.age }}</li>
              </ul>
            </div>
          </div>
    `,
    }),
};

export const WithNestedFields: Story = {
    render: (args) => ({
        components: { Form, FormField, Switch, Select, Input, Button },
        setup() {
            const schema = z.object({
                company: z.string().min(2, "Must be at least 2 characters"),
                subscribe: z.boolean().optional(),
                user: z.object({
                    name: z.string().min(3, "Must be at least 3 characters"),
                    email: z.email("Invalid email address"),
                    role: z.string().min(1, "Please select a role"),
                }),
            });

            type UserFormSchema = z.infer<typeof schema>;

            const state = reactive<UserFormSchema>({
                company: "",
                subscribe: false,
                user: {
                    name: "",
                    email: "",
                    role: "",
                },
            });

            const roleOptions = [
                { label: "Frontend Developer", value: "frontend" },
                { label: "Backend Developer", value: "backend" },
                { label: "Fullstack Developer", value: "fullstack" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "pm" },
                { label: "DevOps Engineer", value: "devops" },
            ];

            const submittedData = ref<UserFormSchema | null>(null);

            function onSubmit(data: UserFormSchema) {
                submittedData.value = data;
            }

            return {
                schema,
                submittedData,
                roleOptions,
                state,
                onSubmit,
                args,
            };
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

              <FormField name="user.role" label="Role" v-slot="{ field, invalid }">
                <Select
                  v-bind="field"
                  :options="roleOptions"
                  placeholder="Select a role"
                  searchable
                />
              </FormField>

              <FormField name="subscribe" v-slot="{ field }">
                <Switch label="Subscribe to newsletter" v-bind="field" />
              </FormField>

              <Button type="submit">Submit</Button>
            </Form>

            <div v-if="submittedData" class="mt-4 p-4 bg-gray-100 submittedData">
              <h3 class="text-sm font-bold text-gray-700 mb-2">Submitted Data:</h3>
              <ul class="text-sm text-gray-600">
                <li><strong>Company:</strong> {{ submittedData.company }}</li>
                <li><strong>Name:</strong> {{ submittedData.user.name }}</li>
                <li><strong>Email:</strong> {{ submittedData.user.email }}</li>
                <li><strong>Role:</strong> {{ submittedData.user.role }}</li>
                <li><strong>Subscribe:</strong> {{ submittedData.subscribe ? "Yes" : "No" }}</li>
              </ul>
            </div>
          </div>
    `,
    }),
};

const schema = z.object({
    recipeName: z.string().min(2, "Must be at least 2 characters"),
    ingredients: z
        .array(
            z.object({
                name: z.string().min(1, "Ingredient name is required"),
            })
        )
        .min(1, "At least one ingredient is required"),
});

type RecipeFormSchema = z.infer<typeof schema>;

const IngredientFields = defineComponent({
    name: "IngredientFields",
    components: { FormField, Input, Button },
    setup() {
        const { fields, append, remove } = useFieldArray<
            RecipeFormSchema,
            RecipeFormSchema["ingredients"][number]
        >("ingredients");

        // Storybook UX: start with one row
        onMounted(() => {
            if (fields.value.length === 0) {
                append({ name: "" });
            }
        });

        return { fields, append, remove };
    },

    template: `
                  <div class="space-y-4 mb-4">
                    <div
                      v-for="(item, index) in fields"
                      :key="item.key"
                      class="border p-3 rounded"
                    >
                      <h3 class="text-sm font-bold mb-1">
                        Ingredient {{ index + 1 }}
                      </h3>

                      <FormField
                        :name="\`ingredients.\${index}.name\`"
                        label="Name"
                        v-slot="{ field, invalid }"
                      >
                        <Input type="text" v-bind="field" :invalid="invalid" />
                      </FormField>

                      <Button type="button" @click="remove(index)">
                        Remove
                      </Button>
                    </div>

                    <Button
                      type="button"
                      @click="append({ name: '', quantity: undefined })"
                    >
                      + Add Ingredient
                    </Button>
                  </div>
                `,
});

export const WithIngredientFields: Story = {
    render: () => ({
        components: {
            Form,
            FormField,
            Input,
            Button,
            IngredientFields,
        },

        setup() {
            const state = reactive<RecipeFormSchema>({
                recipeName: "",
                ingredients: [],
            });

            const submittedData = ref<RecipeFormSchema | null>(null);

            function onSubmit(data: RecipeFormSchema) {
                submittedData.value = data;
                alert(
                    `Recipe "${data.recipeName}" submitted with ${data.ingredients.length} ingredients`
                );
            }

            return {
                schema,
                state,
                onSubmit,
                submittedData,
            };
        },

        template: `
            <div style="max-width: 400px; margin: 2rem auto;">
              <h2 style="margin-bottom: 1.5rem;">
                Recipe Form with Ingredients
              </h2>

              <Form
                :schema="schema"
                :state="state"
                :validateOnChange="true"
                @submit="onSubmit"
              >
                <FormField
                  name="recipeName"
                  label="Recipe Name"
                  v-slot="{ field, invalid }"
                >
                  <Input type="text" v-bind="field" :invalid="invalid" />
                </FormField>

                <IngredientFields />

                <Button type="submit">Submit</Button>
              </Form>

              <div
                v-if="submittedData"
                class="mt-4 p-4 bg-gray-100 submittedData"
              >
                <h3 class="text-sm font-bold text-gray-700 mb-2">
                  Submitted Data:
                </h3>

                <ul class="text-sm text-gray-600">
                  <li>
                    <strong>Recipe Name:</strong>
                    {{ submittedData.recipeName }}
                  </li>

                  <li>
                    <strong>Ingredients:</strong>
                    <ul>
                      <li
                        v-for="(ingredient, index) in submittedData.ingredients"
                        :key="index"
                      >
                        {{ ingredient.name }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          `,
    }),
};
