<script setup lang="ts">
import { reactive } from "vue";
import { buildSchema } from "./composables/build-schema";
import { buildState } from "./composables/build-state";
import { FIELD_COMPONENTS, type FormType } from "./composables/field-registry";
import { Button } from "../../atoms";
import { FormField } from "../form/childs/form-field";
import { Form } from "../form";
import type { FormRendererProps } from "./types";

const props = defineProps<FormRendererProps>();

const emit = defineEmits<{
  (e: "submit", data: Record<string, any>): void;
}>();

const fields = props.form.fieldsCollection.items;

const schema = buildSchema(fields);
const state = reactive(buildState(fields));

function handleSubmit(data: Record<string, any>) {
  emit("submit", data);
}
</script>

<template>
  <Form :schema="schema" :state="state" :validateOnChange="form.validateOnChange" :class="$props.class"
    @submit="handleSubmit" :layout="form.variant as 'vertical' | 'inline'">
    <FormField v-for="field in fields" :key="field.sys.id" :name="field.name" :label="field.label"
      :description="field.description" v-slot="{ field: binding, invalid }">
      <component :is="FIELD_COMPONENTS[field.type as FormType]" v-model="state[field.name]"
        :type="field.type === 'email' ? 'email' : 'text'" :placeholder="field.placeholder" :invalid="invalid" />
    </FormField>

    <footer class="mt-1 md:mt-4.5">
      <Button type="submit" class="w-full md:w-auto">
        {{ form.submitLabel ?? "Submit" }}
      </Button>
    </footer>
  </Form>
</template>