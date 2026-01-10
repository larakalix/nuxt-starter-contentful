<script setup lang="ts">
import { switchStyles } from './variants';
import type { SwitchProps } from './types';
import { computed } from 'vue';

const props = defineProps<SwitchProps>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const styles = computed(() =>
  switchStyles({
    size: props.size,
    variant: props.variant,
    checked: props.modelValue,
  })
);

function toggle() {
  if (props.disabled) return;
  emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <div class="inline-flex items-center gap-3">
    <button type="button" role="switch" :aria-checked="modelValue" :data-checked="modelValue" :disabled="disabled"
      @click="toggle" :class="styles.root()">
      <span :class="styles.thumb()" />
    </button>

    <span v-if="label" :class="styles.label()">
      {{ label }}
    </span>
  </div>
</template>