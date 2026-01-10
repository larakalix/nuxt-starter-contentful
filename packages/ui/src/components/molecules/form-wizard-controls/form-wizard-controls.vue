<script setup lang="ts">
import { Button } from '../../atoms';
import { useFormWizard } from '../../organisms/form-wizard/composables/use-form-wizard';

const wizard = useFormWizard()
</script>

<template>
  <div class="flex justify-between gap-4">
    <Button type="button" class="btn-secondary" :disabled="wizard.isFirst.value" @click="wizard.previous">
      Back
    </Button>

    <Button type="button" class="btn-primary" :disabled="!wizard.canProceed.value || wizard.isLast.value"
      @click="wizard.next">
      Next
    </Button>
  </div>
</template>