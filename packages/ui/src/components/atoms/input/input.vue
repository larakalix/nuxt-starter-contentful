<script setup lang="ts">
import { cn } from "tailwind-variants";
import type { InputProps } from "./types";

const props = defineProps<InputProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "blur"): void;
}>();

function onInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <input :value="modelValue ?? ''" @input="onInput" @blur="emit('blur')" :type="type" :class="cn(
    'border-input placeholder:text-muted-foreground/70 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none',
    props.class
  )" v-bind="$attrs" />
</template>