<script setup lang="ts">
import type { CheckboxProps } from './types';

defineProps<CheckboxProps>();

const emit = defineEmits<{
  (e: "update:modelValue", v: any): void;
  (e: "blur"): void;
}>();

function onChange(e: Event) {
  const el = e.target as HTMLInputElement;
  emit("update:modelValue", el.checked);
}

function handleBlur() {
  emit('blur');
}
</script>

<template>
  <label class="flex cursor-pointer gap-3 rounded-lg p-3 transition
           hover:bg-white/5
           focus-within:ring-2 focus-within:ring-primary/40">
    <input type="checkbox" class="mt-[2px] h-4 w-4 rounded border-gray-600 bg-transparent
             text-primary focus:ring-primary" :checked="modelValue" :disabled="disabled" @change="onChange"
      @blur="handleBlur" />

    <div class="flex flex-col gap-1">
      <span class="text-sm font-medium text-secondary-text">
        {{ label }}
      </span>

      <span v-if="description" class="text-xs text-muted-subtitle-text">
        {{ description }}
      </span>

      <slot />
    </div>
  </label>
</template>
