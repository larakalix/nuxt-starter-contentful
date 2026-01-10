<script setup lang="ts">
import { switchStyles } from './variants';
import type { SwitchProps } from './types';

const props = defineProps<SwitchProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const classes = switchStyles({
  size: props.size,
  variant: props.variant,
  checked: props.modelValue,
});
</script>

<template>
  <div class="inline-flex items-center gap-3">
    <button type="button" role="switch" :aria-checked="modelValue" :disabled="disabled" :data-checked="modelValue"
      @click="emit('update:modelValue', !modelValue)" :class="classes.root()">
      <span :class="[
        classes.thumb(),
        modelValue ? 'translate-x-[calc(100%-1.25rem)]' : 'translate-x-0'
      ]" />
    </button>

    <span v-if="label" :class="classes.label()">
      {{ label }}
    </span>
  </div>
</template>