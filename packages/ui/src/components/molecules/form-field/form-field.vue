<script setup lang="ts">
import { computed } from "vue";
import { FormError } from "../form-error";
import { useFormField } from "../../composables";
import type { FormFieldProps } from "./types";

const props = defineProps<FormFieldProps>();

const { field, error, touched, invalid } = useFormField(props.name);

const showError = computed(() => touched.value && Boolean(error.value));
</script>

<template>
  <div class="flex flex-col gap-y-0 mb-2">
    <label v-if="label" class="text-xs font-medium text-gray-700 pb-1" :for="name">{{ label }}</label>

    <slot :field="field" :error="error" :touched="touched" :invalid="invalid" />

    <p v-if="description" class="form-description">{{ description }}</p>

    <FormError v-if="showError" role="alert">
      {{ error }}
    </FormError>
  </div>
</template>
