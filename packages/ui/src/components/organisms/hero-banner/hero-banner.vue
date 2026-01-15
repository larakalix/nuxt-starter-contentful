<script setup lang="ts">
import { heroBannerVariants } from "./variants";
import type { HeroBannerProps } from "./types";
import { Button } from "../../atoms/button";
import clsx from "clsx";
import { computed } from "vue";
import { SectionHeading } from "../../molecules/section-heading";

const props = defineProps<HeroBannerProps>();

const classes = computed(() => {
  const styles = heroBannerVariants({
    layout: props.layout,
    rounded: props.rounded,
    density: props.density,
    align: props.align,
    background: props.background,
    columns: props.columns,
  });

  return {
    root: styles.root(),
    container: styles.container(),
    grid: styles.grid(),
    content: styles.content(),
    media: styles.media?.(),
    overlay: styles.overlay?.(),
    description: styles.description?.(),
  };
});
</script>

<template>
  <section :class="clsx(classes.root)">
    <!-- Background image -->
    <div v-if="media?.src && classes.overlay" class="absolute inset-0">
      <img :src="media.src" class="h-full w-full object-cover" />
      <div :class="classes.overlay" />
    </div>

    <div :class="classes.container">
      <div :class="classes.grid">
        <!-- Content -->
        <div :class="classes.content">
          <p v-if="content.eyebrow" class="inline-block rounded-full bg-white/20 px-4 py-1 text-sm">
            {{ content.eyebrow }}
          </p>

          <SectionHeading v-if="content.sectionHeading" v-bind="content.sectionHeading" />
          <p v-if="content.description" :class="clsx('w-full text-sm text-primary-text/70', classes.description)">
            {{ content.description }}
          </p>

          <div class="w-full">
            <Button v-if="props.content.actions?.length" v-for="(action, index) in content.actions" :key="index"
              :href="action.href" :variant="action.variant" :rounded="action.rounded" :size="action.size"
              :class="action.class">
              {{ action.label }}
            </Button>
            <slot v-else="$slots.actions" name="actions" />
            <slot v-if="$slots.form" name="form" />
          </div>
        </div>

        <!-- Media -->
        <div v-if="media?.src && classes.media" :class="classes.media">
          <img :src="media.src" :alt="media.alt" :class="`${media.class} object-contain`" />
        </div>
      </div>
    </div>
  </section>
</template>