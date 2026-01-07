<script setup lang="ts">
import type { HeroBannerProps } from "./types";
import { HeroBannerVariants } from "./variants";

defineProps<HeroBannerProps>();
</script>

<template>
  <div :class="HeroBannerVariants({})">
    <!-- TODO: HeroBanner -->
  </div>
</template>
