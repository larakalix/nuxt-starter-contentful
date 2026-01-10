<script setup lang="ts" generic="T extends Record<string, any>">
import { onMounted, onUnmounted, provide } from 'vue';
import { createFormContext } from './composables/use-form';
import { FORM_CONTEXT_KEY, type FormContext, type FormProps, type SubmitInvalidPayload } from "./types";
import { generateNanoid } from './../../../utils/string.utils';
import type { ZodAny } from 'zod';

const props = defineProps<FormProps<T>>();

const emit = defineEmits<{
  (e: "submit", data: T): void;
  (e: "submit-invalid", payload: SubmitInvalidPayload): void;
}>();

const ctx = props.form ?? createFormContext(props);

if (window.__FORM_DEVTOOLS__) {
  const id = generateNanoid();

  onMounted(() => {
    window.__FORM_DEVTOOLS__?.register({ id, form: ctx as FormContext<any> });
  });

  onUnmounted(() => {
    window.__FORM_DEVTOOLS__?.unregister(id);
  });
}

async function handleSubmit(e: Event) {
  e.preventDefault();

  const { state, errors, errorsObject, validateForm, markErrorsAsTouched } = ctx;

  const ok = await validateForm();
  if (ok) {
    emit("submit", state as T);
    return;
  }

  markErrorsAsTouched();

  emit("submit-invalid", {
    errors: errorsObject.value,
    errorMap: errors.value,
  });
}

provide(FORM_CONTEXT_KEY, ctx);
</script>

<template>
  <form @submit="handleSubmit" :class="props?.class">
    <slot />
  </form>
</template>