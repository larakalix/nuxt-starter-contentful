<script setup lang="ts">
import { inject } from "vue";
import { FORM_WIZARD_KEY } from "../../types";
import { Button } from "./../../../../atoms";

const wizard = inject(FORM_WIZARD_KEY);
if (!wizard) {
  throw new Error("<FormWizardControls> must be used inside <FormWizard>");
}
</script>

<template>
  <div class="flex justify-between mt-6">
    <Button type="button" @click="wizard.previous" :disabled="wizard.isFirstStep.value">
      Back
    </Button>

    <Button v-if="!wizard.isLastStep.value" type="button" @click="wizard.next">
      Next
    </Button>

    <Button v-else type="submit">
      Submit
    </Button>
  </div>
</template>
