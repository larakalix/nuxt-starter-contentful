<script setup lang="ts">
import { computed, inject } from "vue";
import clsx from "clsx";
import { FORM_WIZARD_KEY } from "../../types";

const wizard = inject(FORM_WIZARD_KEY);
if (!wizard) {
  throw new Error("<FormWizardProgress> must be used inside <FormWizard>");
}

const classes = computed(() => clsx(
  "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
));
</script>

<template>
  <nav aria-label="Form steps" class="mb-6">
    <ol class="flex items-center justify-between gap-2">
      <li v-for="(step, index) in wizard.steps.value" :key="step.name" class="flex-1">
        <button type="button" @click="wizard.goTo(index)"
          :aria-current="index === wizard.currentStep.value ? 'step' : undefined"
          class="group flex w-full flex-col items-center gap-2 focus:outline-none">
          <!-- Step circle -->
          <div :class="[
            classes,
            // Completed
            index < wizard.currentStep.value && 'bg-success border-success text-white',
            // Active
            index === wizard.currentStep.value && 'bg-primary border-primary text-white',
            // Upcoming
            index > wizard.currentStep.value && 'border-gray-300 text-gray-400 bg-white',
          ]">
            {{ index + 1 }}
          </div>

          <!-- Label -->
          <span class="text-xs font-medium transition-colors" :class="[
            index === wizard.currentStep.value
              ? 'text-primary'
              : index < wizard.currentStep.value
                ? 'text-success'
                : 'text-gray-400'
          ]">
            {{ step.label ?? step.name }}
          </span>
        </button>
      </li>
    </ol>
  </nav>
</template>
