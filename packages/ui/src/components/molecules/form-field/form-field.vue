<script setup lang="ts">
import { useFormField } from "../../composables";
import { FormError } from "../form-error";
import type { FormFieldProps } from "./types";

const props = defineProps<FormFieldProps>();
const field = useFormField(props.name);
</script>

<template>
  <div class="space-y-1">
    <label v-if="props.label" :for="field.id" class="text-sm font-medium">
      {{ props.label }}
    </label>

    <slot :field="field" />

    <p v-if="props.description && !field.error" class="text-xs text-muted">
      {{ props.description }}
    </p>

    <FormError v-if="field.error" :id="`field-${props.name}-error`">
      {{ field.error }}
    </FormError>
  </div>
</template>