<script setup lang="ts">
import { computed } from "vue";
import { resolveBlogCardLayout } from "./childs/factory";
import type { BlogCardProps } from "./types";

const props = withDefaults(defineProps<BlogCardProps>(), {
    layout: "vertical",
    clickable: true,
});

const LayoutComponent = computed(() =>
    resolveBlogCardLayout(props.layout)
);
</script>

<template>
    <component :is="LayoutComponent" v-bind="props" />
</template>
