<script setup lang="ts">
import { computed, provide } from "vue";
import { radioGroupVariants } from "./variants";
import type { RadioGroupContext, RadioGroupProps } from "./types";


const props = withDefaults(defineProps<RadioGroupProps>(), {
  variant: "list",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

function setValue(v: string | number) {
  if (props.disabled) return;
  emit("update:modelValue", v);
}

const modelValueRef = computed(() => props.modelValue);

provide("RADIO_GROUP_CTX", {
  modelValue: modelValueRef,
  variant: props.variant,
  disabled: props.disabled,
  setValue,
} satisfies RadioGroupContext);

const styles = computed(() => radioGroupVariants({ variant: props.variant }));
</script>

<template>
  <div :class="styles.root()" role="radiogroup">
    <div v-if="legend" :class="styles.legend()">
      {{ legend }}
    </div>

    <!-- list: vertical -->
    <div v-if="variant === 'list'" class="flex flex-col gap-4">
      <slot />
    </div>

    <!-- pill: horizontal -->
    <div v-else-if="variant === 'pill'" :class="styles.optionsRow()">
      <slot />
    </div>

    <!-- swatch: horizontal dots -->
    <div v-else :class="styles.swatchRow()">
      <slot />
    </div>
  </div>
</template>
