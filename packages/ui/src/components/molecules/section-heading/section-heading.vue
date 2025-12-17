<script lang="ts" setup>
import { computed } from "vue";
import clsx from "clsx";
import { sectionHeadingVariants } from "./variants";
import Badge from "../../atoms/badge/badge.vue";
import type { SectionHeadingProps } from "./types";

const props = withDefaults(defineProps<SectionHeadingProps>(), {
    as: "h2",
    align: "left",
    size: "md",
});

const classes = computed(() =>
    clsx(
        sectionHeadingVariants({
            align: props.align,
            size: props.size,
            colSpan: props.colSpan,
        }),
        props.class,
    ),
);
</script>

<template>
    <div :class="classes">
        <!-- Left label (pills) -->
        <Badge v-bind="props.tag" :label="props.label" />
        <span>{{ props.colSpan }}</span>

        <!-- Title text -->
        <component :is="props.as" class="font-semibold text-foreground">
            {{ props.title }}
        </component>
    </div>
</template>
