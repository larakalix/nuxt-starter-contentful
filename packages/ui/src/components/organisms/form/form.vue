<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, computed, provide, toRef, type PropType } from 'vue';
import { z } from 'zod';
import { getByPath, setByPath, normalizePath } from './../../../utils/path.utils';
import { mapToObject, zodErrorsToMap } from './../../../utils/form.utils';
import { FORM_CONTEXT_KEY, type ErrorMap, type FormContext, type FormProps, type SubmitInvalidPayload, type TouchedMap } from "./types";

const props = defineProps<FormProps<T>>();

const emit = defineEmits<{
  (e: "submit", data: T): void;
  (e: "submit-invalid", payload: SubmitInvalidPayload): void;
}>();

const schema = props.schema as z.ZodType<T>;
const state = props.state;

const validateOnChange = ref(Boolean(props.validateOnChange));

const errors = ref<ErrorMap>(new Map());
const touched = ref<TouchedMap>(new Map());
const errorsObject = computed(() => mapToObject(errors.value));
const touchedObject = computed(() => mapToObject(touched.value));
const isValid = computed(() => errors.value.size === 0);

function getValue(path: string) {
  return getByPath(state, normalizePath(path));
}
function setValue(path: string, value: any) {
  setByPath(state, normalizePath(path), value);
}

function setTouched(name: string, value = true) {
  const key = normalizePath(name);
  touched.value.set(key, value);
}
function isTouched(name: string) {
  const key = normalizePath(name);
  return touched.value.get(key) === true;
}

function getError(name: string) {
  const key = normalizePath(name);
  return errors.value.get(key);
}

function hasError(name: string) {
  const key = normalizePath(name);
  return errors.value.has(key);
}

function setError(name: string, message: string) {
  const key = normalizePath(name);
  errors.value.set(key, message);
}

function clearError(name: string) {
  const key = normalizePath(name);
  errors.value.delete(key);
}

function clearAllErrors() {
  errors.value.clear();
}

function markErrorsAsTouched() {
  for (const key of errors.value.keys()) {
    if (key === "_form") continue;
    touched.value.set(key, true);
  }
}

async function validateForm(): Promise<boolean> {
  const result = schema.safeParse(state);
  const map = zodErrorsToMap(result);
  
  errors.value = map;

  return map.size === 0;
}

/**
 * Validates the whole schema (reliable for nested + refinements),
 * then updates error state for ONLY the requested field (and removes it if fixed).
 */
async function validateField(name: string): Promise<boolean> {
  const key = normalizePath(name);

  const result = schema.safeParse(state);
  if (result.success) {
    // if whole form valid, remove this field error if any
    errors.value.delete(key);
    // also remove form-level error if it exists
    if (errors.value.has("_form")) errors.value.delete("_form");
    return true;
  }

  const next = zodErrorsToMap(result);
  const nextMessage = next.get(key);

  if (nextMessage) errors.value.set(key, nextMessage);
  else errors.value.delete(key);

  // keep/refresh form-level error if present
  if (next.has("_form")) errors.value.set("_form", next.get("_form")!);
  else errors.value.delete("_form");

  return !errors.value.has(key);
}

async function handleSubmit(e: Event) {
  e.preventDefault();

  const ok = await validateForm();
  if (ok) {
    emit("submit", state as T);
    return;
  }

  // show all errors when submit fails
  markErrorsAsTouched();

  emit("submit-invalid", {
    errors: errorsObject.value,
    errorMap: errors.value,
  });
}

const ctx: FormContext<T> = {
  state: state as T,
  schema: schema as any,
  validateOnChange: toRef(validateOnChange, "value") as any, // keep as Ref<boolean>

  errors,
  touched,
  errorsObject,
  touchedObject,
  isValid,

  setTouched,
  isTouched,

  getError,
  hasError,
  setError,
  clearError,
  clearAllErrors,

  validateForm,
  validateField,

  getValue,
  setValue,

  markErrorsAsTouched,
};

provide(FORM_CONTEXT_KEY, ctx);
</script>

<template>
  <form @submit="handleSubmit" :class="props.class">
    <slot />
  </form>
</template>