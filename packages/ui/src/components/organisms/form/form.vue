<script setup lang="ts">
import type { FormProps } from "./types";
import { FormVariants } from "./variants";

defineProps<FormProps>();
</script>

<template>
  <div :class="FormVariants({})">
    <!-- TODO: Form -->
  </div>
</template>
