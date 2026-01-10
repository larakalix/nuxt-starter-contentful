<script setup lang="ts">
import { computed } from "vue";
import { FormError } from "../form-error";
import { useFormField } from "../../composables";
import type { FormFieldProps } from "./types";

const props = withDefaults(defineProps<FormFieldProps>(), {
  description: '',
});

const { field, error, touched, invalid } = useFormField(props.name);

const showError = computed(() => touched.value && Boolean(error.value));
</script>

<template>
  <div class="flex flex-col gap-y-0 mb-2">
    <label v-if="props.label" class="text-sm font-medium text-gray-700" :for="props.name">{{ props.label }}</label>

    <slot :field="field" :error="error" :touched="touched" :invalid="invalid" />

    <p v-if="props.description" class="form-description">{{ props.description }}</p>

    <FormError v-if="showError" role="alert">
      {{ error }}
    </FormError>
  </div>
</template>
