<script lang="ts" setup>
import { computed } from "vue";
import clsx from "clsx";
import { AuthorCard } from "../../molecules/author-card";
import { SectionHeading } from "../../molecules/section-heading";
import type { AuthorListProps } from "./types";
import { authorListVariants } from "./variants";

const props = defineProps<AuthorListProps>();

const classes = computed(() =>
    clsx("flex flex-col gap-6", authorListVariants({
        columns: props.columns,
    }), props.class),
);
</script>

<template>
    <!-- Heading: "Top" + "Authors" -->
    <SectionHeading v-if="props.sectionHeading" v-bind="props.sectionHeading" />

    <!-- Authors list -->
    <section :class="classes">
        <AuthorCard v-for="author in items" :key="author.id ?? author.name" v-bind="author" />
    </section>
</template>
