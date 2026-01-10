<script setup lang="ts">
import type { SwitchButtonProps } from './types';

const props = withDefaults(defineProps<SwitchButtonProps>(), {
  onLabel: 'ON',
  offLabel: 'OFF',
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <div class="inline-flex rounded-lg border border-gray-600 overflow-hidden">
    <button type="button" class="px-4 py-2 text-sm transition"
      :class="props.modelValue ? 'bg-primary text-primary-text' : 'text-gray-400'"
      @click="emit('update:modelValue', true)">
      {{ props.onLabel }}
    </button>

    <button type="button" class="px-4 py-2 text-sm transition"
      :class="!props.modelValue ? 'bg-secondary text-secondary-text' : 'text-gray-400'"
      @click="emit('update:modelValue', false)">
      {{ props.offLabel }}
    </button>
  </div>
</template>