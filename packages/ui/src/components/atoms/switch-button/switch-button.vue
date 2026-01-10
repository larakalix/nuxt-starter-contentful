<script setup lang="ts">
import { computed } from 'vue';
import type { SwitchButtonProps } from './types';
import { switchButtonStyles } from './variants';

const props = withDefaults(defineProps<SwitchButtonProps>(), {
  onLabel: 'ON',
  offLabel: 'OFF',
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function set(value: boolean) {
  if (props.disabled) return;
  emit("update:modelValue", value);
}

const styles = computed(() =>
  switchButtonStyles({
    size: props.size,
    variant: props.variant,
  })
);
</script>

<template>
  <div :class="styles.root()">
    <!-- ON -->
    <button type="button" :data-active="modelValue" :disabled="disabled" @click="set(true)" :class="[
      styles.button({ active: modelValue }),
    ]">
      {{ onLabel }}
    </button>

    <!-- OFF -->
    <button type="button" :data-active="!modelValue" :disabled="disabled" @click="set(false)" :class="[
      styles.button({ active: !modelValue }),
    ]">
      {{ offLabel }}
    </button>
  </div>
</template>