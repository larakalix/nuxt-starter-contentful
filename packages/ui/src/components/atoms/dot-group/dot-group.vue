<script setup lang="ts">
import type { DotGroupProps } from "./types";
import { DotGroupVariants } from "./variants";

defineProps<DotGroupProps>();
</script>

<template>
  <div :class="DotGroupVariants({})">
    <!-- TODO: DotGroup -->
  </div>
</template>
