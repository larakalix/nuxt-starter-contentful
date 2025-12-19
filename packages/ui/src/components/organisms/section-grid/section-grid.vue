<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { Error } from "@starter/ui/organisms";
import { sectionGridVariants } from "./variants";
import { buildRenderSections } from "../../pages/funnel-page-sections/section-renderer";
import type { SectionGridProps } from "./types";

const props = withDefaults(defineProps<SectionGridProps>(), {
  columns: 2,
})

const classes = computed(() =>
  clsx("section-grid",
    sectionGridVariants({
      columns: props.columns,
    }),
    props.class,
  ),
);

const group = computed(() => buildRenderSections(props.items, Error, props.onNavigate));
</script>

<template>
  <section :class="classes">
    <component v-for="item in group" :key="item.key" :is="item.component" v-bind="item.props" />
  </section>
</template>
