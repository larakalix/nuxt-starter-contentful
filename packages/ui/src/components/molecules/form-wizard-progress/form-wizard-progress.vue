<script setup lang="ts">
import { useFormWizard } from '../../organisms/form-wizard/composables/use-form-wizard';
import type { FormWizardProgressProps } from './types';

const props = defineProps<FormWizardProgressProps>()

const wizard = useFormWizard()
</script>

<template>
  <div :class="['flex items-center gap-6', props.class]">
    <div v-for="(step, i) in wizard.steps" :key="step.name" class="flex items-center gap-2">
      <div class="h-2 w-10 rounded-full transition" :class="i <= wizard.index.value ? 'bg-primary' : 'bg-muted'" />
      <span class="text-sm opacity-80">
        {{ step.label ?? step.name }}
      </span>
    </div>
  </div>
</template>