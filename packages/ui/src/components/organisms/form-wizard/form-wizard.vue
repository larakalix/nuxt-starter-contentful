<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import { FORM_WIZARD_KEY } from './composables/use-form-wizard';
import type { FormWizardProps } from './types';

const props = defineProps<FormWizardProps>()

const stepNames = props.steps.map(s => s.name)

const current = ref(props.initial ?? stepNames[0])
const index = computed(() => stepNames.indexOf(current.value))

const isFirst = computed(() => index.value === 0)
const isLast = computed(() => index.value === stepNames.length - 1)

const stepErrors = ref<Record<string, boolean>>({})

function setStepValid(step: string, valid: boolean) {
  stepErrors.value[step] = !valid
}

const canProceed = computed(() => {
  const step = props.steps[index.value]
  if (step.optional) return true
  return !stepErrors.value[step.name]
})

function next() {
  if (!canProceed.value || isLast.value) return
  current.value = stepNames[index.value + 1]
}

function previous() {
  if (!isFirst.value) {
    current.value = stepNames[index.value - 1]
  }
}

provide(FORM_WIZARD_KEY, {
  steps: props.steps,
  current,
  index,
  isFirst,
  isLast,
  canProceed,
  next,
  previous,
  setStepValid,
})
</script>

<template>
  <div class="space-y-6">
    <slot />
  </div>
</template>
