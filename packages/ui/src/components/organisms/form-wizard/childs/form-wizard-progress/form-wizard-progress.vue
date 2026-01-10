<script setup lang="ts">
import { inject } from "vue";
import { FORM_WIZARD_KEY } from "../../types";

const wizard = inject(FORM_WIZARD_KEY);
if (!wizard) {
  throw new Error("<FormWizardProgress> must be used inside <FormWizard>");
}
</script>

<template>
  <nav aria-label="Form steps" class="mb-6">
    <ol class="
        flex flex-col gap-4
        md:flex-row md:items-center md:justify-between md:gap-2
      ">
      <li v-for="(step, index) in wizard.steps.value" :key="step.name" class="flex md:flex-1">
        <button type="button" @click="wizard.goTo(index)"
          :aria-current="index === wizard.currentStep.value ? 'step' : undefined" class="
            group flex w-full items-center gap-3
            md:flex-col md:gap-2
            focus:outline-none
          ">
          <!-- Step circle -->
          <div class="
              flex h-9 w-9 shrink-0 items-center justify-center rounded-full
              border text-sm font-semibold transition-colors
            " :class="[
              // 🔴 ERROR STATE (highest priority)
              wizard.hasStepError(index) &&
              'bg-red-600 border-red-600 text-white',

              // 🟢 COMPLETED
              !wizard.hasStepError(index) &&
              index < wizard.currentStep.value &&
              'bg-success border-success text-white',

              // 🔵 ACTIVE
              !wizard.hasStepError(index) &&
              index === wizard.currentStep.value &&
              'bg-primary border-primary text-white',

              // ⚪ UPCOMING
              !wizard.hasStepError(index) &&
              index > wizard.currentStep.value &&
              'bg-white border-gray-300 text-gray-400',

              // hover
              'group-hover:border-primary'
            ]">
            <span v-if="wizard.hasStepError(index)">!</span>
            <span v-else>{{ index + 1 }}</span>
          </div>

          <!-- Label -->
          <span class="text-sm font-medium transition-colors" :class="[
            wizard.hasStepError(index)
              ? 'text-red-600'
              : index === wizard.currentStep.value
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
