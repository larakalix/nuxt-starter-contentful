<script setup lang="ts">
import { provide, ref, reactive, toRef } from "vue"
import { FORM_CONTEXT, type FormSchema, type FormSubmitEvent, type InferInput, type InferOutput } from "./types";
;

interface FormProps<S extends FormSchema> {
  schema?: S
  state: Partial<InferInput<S>>
}

const props = defineProps<FormProps<any>>()
const emit = defineEmits<{
  submit: [FormSubmitEvent<any>]
  error: [unknown]
}>()

const state = toRef(props, "state");
const errors = ref<Record<string, string>>({})

const touched = reactive(new Set<string>())
const blurred = reactive(new Set<string>())
const registered = reactive(new Set<string>())
const dirty = reactive(new Set<string>())

function register(name: string) {
  registered.add(name)
}

function unregister(name: string) {
  registered.delete(name)
  delete errors.value[name]
  touched.delete(name)
  blurred.delete(name)
}

function markBlurred(name: string) {
  blurred.add(name)
}

function markTouched(name: string) {
  touched.add(name)
}

function setTouched(name: string) {
  touched.add(name)
}

function setBlurred(name: string) {
  blurred.add(name)
}

async function validate() {
  errors.value = {}

  if (!props.schema) return true

  const result = await props.schema.safeParseAsync(state.value)

  if (!result.success) {
    for (const issue of result.error.issues) {
      const name = issue.path[0] as string
      if (registered.has(name)) {
        errors.value[name] = issue.message
      }
    }
    return false
  }

  return true
}

async function onSubmit(e: SubmitEvent) {
  e.preventDefault()

  const ok = await validate()
  if (!ok) {
    emit("error", errors.value)
    return
  }

  emit("submit", {
    ...e,
    data: state.value as InferOutput<any>
  })
}

provide(FORM_CONTEXT, {
  state,
  errors,
  touched,
  blurred,
  dirty,
  register,
  unregister,
  setTouched,
  setBlurred,
  markBlurred,
  markTouched,
  validate
})
</script>

<template>
  <form @submit="onSubmit">
    <slot />
  </form>
</template>
