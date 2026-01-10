<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { FORM_WIZARD_KEY } from "../../types";

const props = defineProps<{
  name: string;
  label?: string;
  fields?: string[];
}>();

const wizard = inject(FORM_WIZARD_KEY);
if (!wizard) {
  throw new Error("<FormStep> must be used inside <FormWizard>");
}

const stepIndex = ref<number | null>(null);

onMounted(() => {
  stepIndex.value = wizard.registerStep({
    name: props.name,
    label: props.label,
    fields: props.fields,
  });
});

const isActive = computed(
  () => stepIndex.value === wizard.currentStep.value
);
</script>

<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>
