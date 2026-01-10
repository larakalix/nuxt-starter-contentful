<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { FORM_WIZARD_KEY, type WizardStepMeta } from "./types";
import { validateFormContext } from "../form/composables/use-form";

const form = validateFormContext();

const currentStep = ref(0);
const steps = ref<WizardStepMeta[]>([]);

function registerStep(step: WizardStepMeta) {
  const index = steps.value.length;
  steps.value.push(step);
  return index;
}

const stepsComputed = computed(() => steps.value);

const isFirstStep = computed(() => currentStep.value === 0);
const isLastStep = computed(
  () => currentStep.value === steps.value.length - 1
);

async function validateCurrentStep(): Promise<boolean> {
  const step = steps.value[currentStep.value];
  if (!step?.fields?.length) {
    // fallback: validate whole form
    const valid = await form.validateForm();
    if (!valid) form.markErrorsAsTouched();
    return valid;
  }

  const valid = await form.validateForm();
  if (valid) return true;

  let hasStepErrors = false;

  for (const field of step.fields) {
    if (form.hasError(field)) {
      form.setTouched(field, true);
      hasStepErrors = true;
    }
  }

  return !hasStepErrors;
}

async function canLeaveCurrentStep(): Promise<boolean> {
  const step = steps.value[currentStep.value];

  // no fields -> allow
  if (!step?.fields?.length) return true;

  const ok = await form.validateFields(step.fields);

  if (!ok) {
    // touch only current step fields
    for (const f of step.fields) form.setTouched(f, true);
  }

  return ok;
}

async function next() {
  const ok = await canLeaveCurrentStep();
  if (!ok) return;

  if (!isLastStep.value) currentStep.value++;
}

function previous() {
  if (!isFirstStep.value) currentStep.value--;
}

async function goTo(stepIndex: number) {
  if (stepIndex < 0 || stepIndex >= steps.value.length) return;

  // going backwards should always be allowed
  if (stepIndex <= currentStep.value) {
    currentStep.value = stepIndex;
    return;
  }

  // going forward: cannot leave current step if invalid
  const ok = await canLeaveCurrentStep();
  if (!ok) return;

  currentStep.value = stepIndex;
}

provide(FORM_WIZARD_KEY, {
  currentStep,
  steps: stepsComputed,
  isFirstStep,
  isLastStep,
  next,
  previous,
  goTo,
  registerStep,
});
</script>

<template>
  <div class="form-wizard">
    <slot />
  </div>
</template>
