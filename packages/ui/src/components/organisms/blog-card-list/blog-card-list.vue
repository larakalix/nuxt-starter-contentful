<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { blogCardListVariants } from "./variants";
import BlogCard from "../../molecules/blog-card/blog-card.vue";
import type { BlogCardListProps } from "./types";
import { SectionHeading } from "../../molecules";

const props = withDefaults(defineProps<BlogCardListProps>(), {
    layout: "grid",
    columns: 2,
});

const classes = computed(() =>
    clsx("blog-card-list",
        blogCardListVariants({
            layout: props.layout,
            columns: props.columns,
        }),
        props.class,
    ),
);
</script>

<template>
    <SectionHeading v-if="props.sectionHeading" v-bind="props.sectionHeading" />

    <div :class="classes">
        <BlogCard v-for="item in items" :key="item.id ?? item.href ?? item.title" v-bind="item" />
    </div>
</template>
