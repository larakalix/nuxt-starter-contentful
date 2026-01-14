<script setup lang="ts">
import { OctagonAlert } from 'lucide-vue-next';
import type { FormErrorProps } from './types';

const props = defineProps<FormErrorProps>()
</script>

<template>
  <p :id="props.id" class="text-xs text-danger mt-1 flex items-center gap-1" role="alert">
    <octagon-alert :size="12" />

    <slot />
  </p>
</template>