<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";

import { badgeVariants } from "./variants";
import type { BadgeProps } from "./types";

const props = withDefaults(defineProps<BadgeProps>(), {
    as: "span",
    variant: "solid",
    color: "secondary",
    rounded: "sm",
    label: "",
});

const classes = computed(() =>
    clsx("w-fit flex items-center",
        badgeVariants({
            variant: props.variant,
            color: props.color,
            rounded: props.rounded,
        }),
        props.class,
    ),
);
</script>

<template>
    <component :id="props.id" :is="as" :class="classes">
        {{ props.label }}
    </component>
</template>
