<script setup lang="ts">
import { computed } from 'vue';
import { Switch } from '../../atoms';
import { switchCardStyles } from './variants';
import { BatteryCharging, CreditCard } from 'lucide-vue-next';
import type { SwitchCardProps } from './types';

const props = withDefaults(defineProps<SwitchCardProps>(), {
  variant: "default",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function update(value: boolean) {
  if (props.disabled) return;
  emit("update:modelValue", value);
}

const styles = computed(() =>
  switchCardStyles({ variant: props.variant })
);

</script>

<template>
  <div :class="styles.root()">
    <div :class="styles.left()">
      <!-- Icon -->
      <div v-if="icon" :class="styles.icon()">
        <CreditCard v-if="icon === 'payment'" :size="24" />
        <BatteryCharging v-else-if="icon === 'energy'" />
      </div>

      <!-- Text -->
      <div :class="styles.text()">
        <div>
          <span :class="styles.label()">
            {{ label }}
          </span>
          <span v-if="subLabel" :class="styles.subLabel()">
            ({{ subLabel }})
          </span>
        </div>

        <p v-if="description" :class="styles.description()">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- Switch -->
    <Switch :modelValue="modelValue" @update:modelValue="update" :disabled="disabled" />
  </div>
</template>