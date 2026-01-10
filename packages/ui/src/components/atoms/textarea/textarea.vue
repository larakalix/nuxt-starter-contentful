<script setup lang="ts">
import { computed } from "vue";
import type { TextareaProps } from "./types";
import { textareaVariants } from "./variants";
import { clsx } from "clsx";

const props = defineProps<TextareaProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur"): void;
}>();

const variant = computed(() => props.invalid ? 'error' : props.variant);

const classes = computed(() =>
  clsx(
    textareaVariants({
      variant: variant.value,
      size: props.size,
      rounded: props.rounded,
    }),
    props.class,
    props.invalid ? "invalid" : "",
  )
);

const remaining = computed(() =>
  props.maxLength ? props.maxLength - props.modelValue.length : null
);

function onInput(e: Event) {
  const el = e.target as HTMLInputElement;
  emit("update:modelValue", el.value);
}

function handleBlur() {
  emit('blur');
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <textarea :value="modelValue" :placeholder="placeholder" :disabled="disabled" :maxlength="maxLength"
      :class="classes" @input="onInput" @blur="handleBlur" />

    <div class="flex justify-between text-xs text-gray-400">
      <span>{{ hint }}</span>

      <span v-if="remaining !== null">
        {{ remaining }} characters left
      </span>
    </div>
  </div>
</template>
