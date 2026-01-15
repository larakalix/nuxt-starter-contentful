<script setup lang="ts">
import { computed } from "vue";
import { FormError } from "../form-error";
import type { FormFieldProps } from "./types";
import { useFormField } from "../../composables/use-form-field";

const props = defineProps<FormFieldProps>();

const { field, error, touched, invalid } = useFormField(props.name);

const showError = computed(() => touched.value && Boolean(error.value));
</script>

<template>
  <div class="flex flex-col gap-y-0">
    <label v-if="label" class="text-xs font-medium text-gray-700 pb-1" :for="name">
      {{ label }}

      {{ $props.required ? "*" : "" }}
    </label>

    <slot :field="field" :error="error" :touched="touched" :invalid="invalid" />

    <p v-if="description" class="text-xs text-muted-text mt-1">{{ description }}</p>

    <FormError v-if="showError" role="alert">
      {{ error }}
    </FormError>
  </div>
</template>
