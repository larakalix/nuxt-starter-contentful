<script setup lang="ts">
import clsx from "clsx";
import { computed } from "vue";
import { inputVariants } from "./variants";
import type { InputProps } from "./types";

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
});

const variant = computed(() => props.invalid ? 'error' : props.variant);

const classes = computed(() =>
  clsx(
    inputVariants({
      variant: variant.value,
      size: props.size,
      rounded: props.rounded,
    }),
    props.class,
    props.invalid ? "invalid" : "",
  )
);

const emit = defineEmits<{
  (e: "update:modelValue", v: any): void;
  (e: "blur"): void;
}>();

function onInput(e: Event) {
  const el = e.target as HTMLInputElement;
  emit("update:modelValue", el.value);
}

function handleBlur() {
  emit('blur');
}
</script>

<template>
  <input :name="props.name" :type="props.type" :placeholder="props.placeholder" :disabled="props.disabled"
    :value="props.modelValue ?? ''" @input="onInput" @blur="handleBlur" :class="classes" />
</template>