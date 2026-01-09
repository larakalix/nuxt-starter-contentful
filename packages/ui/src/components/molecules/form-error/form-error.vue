<script setup lang="ts">
import type { FormErrorProps } from './types';

const props = defineProps<FormErrorProps>()
</script>

<template>
  <p :id="props.id" class="text-xs text-danger" role="alert">
    <slot />
  </p>
</template>