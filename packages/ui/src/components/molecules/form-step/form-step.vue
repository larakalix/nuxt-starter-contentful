<!-- => USAGE
<Form>
  <FormStep name="account">
  <FormStep name="profile">
  <FormStep name="billing">
</Form> -->

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useFormWizard } from '../../composables/forms/use-form-wizard';
import type { FormStepProps } from './types';

const props = defineProps<FormStepProps>()

const wizard = useFormWizard()
const visible = computed(() => wizard.current.value === props.name)

watch(
  () => props.valid,
  v => wizard.setStepValid(props.name, v ?? true),
  { immediate: true }
)
</script>

<template>
  <div v-show="visible" :class="props.class">
    <slot />
  </div>
</template>