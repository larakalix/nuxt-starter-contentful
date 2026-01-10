<script setup lang="ts">
import { provide } from "vue";
import { FORM_WIZARD_KEY } from "./types";
import { createWizardContext } from "./composables/use-form-wizard";

const ctx = createWizardContext();

provide(FORM_WIZARD_KEY, ctx);
</script>

<template>
  <div class="form-wizard">
    <slot />
  </div>
</template>
