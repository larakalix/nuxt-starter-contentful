<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { FORM_WIZARD_KEY, type WizardStepMeta } from "./types";
import { validateFormContext } from "../form/composables/use-form";
import { createWizardContext } from "./composables/use-form-wizard";

// const form = validateFormContext();

// const currentStep = ref(0);
// const steps = ref<WizardStepMeta[]>([]);

// function registerStep(step: WizardStepMeta) {
//   const index = steps.value.length;
//   steps.value.push(step);
//   return index;
// }

// const stepsComputed = computed(() => steps.value);
// const visitedSteps = ref<Set<number>>(new Set([0]));
// const attemptedSteps = ref<Set<number>>(new Set());
// const isFirstStep = computed(() => currentStep.value === 0);
// const isLastStep = computed(
//   () => currentStep.value === steps.value.length - 1
// );

// function hasStepError(stepIndex: number): boolean {
//   const step = steps.value[stepIndex];
//   if (!step?.fields?.length) return false;

//   const isRelevant =
//     visitedSteps.value.has(stepIndex) ||
//     attemptedSteps.value.has(stepIndex);

//   if (!isRelevant) return false;

//   return step.fields.some((field) => form.hasError(field));
// }

// function isStepVisited(stepIndex: number): boolean {
//   return visitedSteps.value.has(stepIndex);
// }

// function markVisited(stepIndex: number) {
//   visitedSteps.value.add(stepIndex);
// }

// async function canLeaveCurrentStep(): Promise<boolean> {
//   const step = steps.value[currentStep.value];

//   // no fields -> allow
//   if (!step?.fields?.length) return true;

//   const ok = await form.validateFields(step.fields);

//   if (!ok) {
//     // touch only current step fields
//     for (const f of step.fields) form.setTouched(f, true);
//   }

//   return ok;
// }

// async function next() {
//   attemptedSteps.value.add(currentStep.value);

//   const ok = await canLeaveCurrentStep();
//   if (!ok) return;

//   if (!isLastStep.value) {
//     currentStep.value++;
//     markVisited(currentStep.value);
//   }
// }

// function previous() {
//   if (!isFirstStep.value) currentStep.value--;
// }

// async function goTo(stepIndex: number) {
//   if (stepIndex < 0 || stepIndex >= steps.value.length) return;

//   // backwards is always allowed
//   if (stepIndex <= currentStep.value) {
//     currentStep.value = stepIndex;
//     markVisited(stepIndex);
//     return;
//   }

//   // forward navigation
//   attemptedSteps.value.add(currentStep.value);
//   const ok = await canLeaveCurrentStep();
//   if (!ok) return;

//   currentStep.value = stepIndex;
//   markVisited(stepIndex);
// }

const ctx = createWizardContext();

provide(FORM_WIZARD_KEY, ctx);
</script>

<template>
  <div class="form-wizard">
    <slot />
  </div>
</template>
