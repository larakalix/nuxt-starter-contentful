<script setup lang="ts">
import { computed } from "vue";
import { clsx } from "clsx";
import { authorBadgeVariants } from "./variants";
import type { AuthorBadgeProps } from "./types";

const props = withDefaults(defineProps<AuthorBadgeProps>(), {
  showTooltip: true,
  variant: "multiple",
});

const classes = computed(() =>
  clsx("author-badge",
    authorBadgeVariants({
      variant: props.variant,
    }),
    props.class,
  ),
);
</script>

<template>
  <div :key="props.author?.id" :class="classes" :style="{ marginLeft: props.isFirst ? '0px' : '-8px' }">
    <!-- Avatar (the peer) -->
    <div
      class="peer relative flex items-center size-6 overflow-hidden rounded-full bg-muted ring-2 ring-background transition hover:z-20 hover:ring-primary">
      <img v-if="props.author?.avatarSrc" :src="props.author.avatarSrc" :alt="props.author.name" class="h-full w-full"
        loading="lazy" />
      <div v-else class="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
        {{ props.author?.name.slice(0, 1).toUpperCase() }}
      </div>
    </div>

    <!-- Tooltip (reacts ONLY to this peer hover) -->
    <div v-if="props.showTooltip" class="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2
             whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs text-white shadow-sm backdrop-blur-sm
             opacity-0 translate-y-1 transition
             peer-hover:opacity-100 peer-hover:translate-y-0" role="tooltip">
      {{ props.author?.name }}
    </div>
  </div>
</template>
