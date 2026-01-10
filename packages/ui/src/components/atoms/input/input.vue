<script setup lang="ts">
import clsx from "clsx";
import { computed } from "vue";
import { inputVariants } from "./variants";
import type { InputProps } from "./types";

const props = defineProps<InputProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "blur"): void;
}>();

const classes = computed(() =>
  clsx(
    inputVariants({
      variant: props.variant,
      size: props.size,
      rounded: props.rounded,
      invalid: props.invalid,
      disabled: props.disabled,
    }),
    props.class
  )
);

function onInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <input :placeholder="props.placeholder" :disabled="props.disabled" :value="modelValue ?? ''" @input="onInput"
    @blur="emit('blur')" :type="type" :class="classes" v-bind="$attrs" />
</template>