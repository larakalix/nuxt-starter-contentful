<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { buttonVariants } from "./variants";
import type { ButtonProps } from "./types";

const props = withDefaults(defineProps<ButtonProps>(), {
    variant: "primary",
    size: "md",
    rounded: "md",
    as: "button",
    class: "",
    disabled: false,
    onClick: undefined,
});

const classes = computed(() =>
    clsx(
        buttonVariants({
            variant: props.variant,
            size: props.size,
            rounded: props.rounded,
        }),
        props.class
    )
);
</script>

<template>
    <component :is="as" :href="as === 'a' ? href : undefined" :class="classes"
        :disabled="as === 'button' ? disabled : undefined" @click="onClick">
        <slot />
    </component>
</template>
