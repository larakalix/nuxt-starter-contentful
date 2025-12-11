<!-- packages/ui/src/components/molecules/blog-card-list/BlogCardList.vue -->
<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { blogCardListVariants } from "./variants";
import BlogCard from "../../molecules/blog-card/blog-card.vue";
import type { BlogCardListProps } from "./types";

const props = withDefaults(defineProps<BlogCardListProps>(), {
    layout: "grid",
    columns: 2,
});

const classes = computed(() =>
    clsx(
        blogCardListVariants({
            layout: props.layout,
            columns: props.columns,
        }),
        props.class,
    ),
);
</script>

<template>
    <div :class="classes">
        <BlogCard v-for="item in items" :key="item.id ?? item.href ?? item.title" v-bind="item" />
    </div>
</template>
