<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { blogCardListVariants } from "./variants";
import BlogCard from "../../molecules/blog-card/blog-card.vue";
import { SectionHeading } from "../../molecules";
import type { BlogCardListProps } from "./types";

const props = withDefaults(defineProps<BlogCardListProps>(), {
    layout: "grid",
    columns: 2,
});

const classes = computed(() =>
    clsx("blog-card-list",
        blogCardListVariants({
            layout: props.layout,
            columns: props.columns,
            colSpan: props.colSpan,
        }),
        props.class,
    ),
);

</script>

<template>
    <div :class="classes">
        <SectionHeading v-if="props.sectionHeading" v-bind="props.sectionHeading" :col-span="props.sectionHeading.colSpan ?? props.columns
            " />

        <BlogCard v-for="item in items" :key="item.id ?? item.href ?? item.title" v-bind="item" />
    </div>
</template>
