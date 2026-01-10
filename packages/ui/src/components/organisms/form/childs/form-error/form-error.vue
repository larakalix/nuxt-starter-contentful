<script setup lang="ts">
import type { FormErrorProps } from './types';

const props = defineProps<FormErrorProps>()
</script>

<template>
  <p :id="props.id" class="text-xs text-danger pt-1" role="alert">
    <slot />
  </p>
</template>