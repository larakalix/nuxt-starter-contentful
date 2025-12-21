<script setup lang="ts">
import { computed } from 'vue';
import clsx from 'clsx';
import { Badge } from "../../../atoms";
import { CtaBanner, RichTextRenderer, TocMenu, type CtaBannerProps } from "../../../molecules";
import BlogCardMeta from './blog-card-meta.vue';
import { AuthorList, type AuthorListProps } from './../../..//organisms';
import type { BlogCardProps } from '../types';

const props = withDefaults(defineProps<BlogCardProps>(), {
    clickable: false,
    showTocMenu: true,
});

const classes = computed(() =>
    clsx("blog-post grid gap-2 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-8 global-content-padding",
        props.class,
    ),
);

const authorListProps = {
    sectionHeading: {
        label: "The",
        title: "Authors",
        align: "left",
        size: "md",
        as: "h2",
        tag: {
            variant: "solid",
            color: "primary",
            class: "px-2 py-1 text-base! font-semibold",
        },
        class: "px-0! md:px-0!"
    },
    items: props.authors || [],
} satisfies AuthorListProps;

const ctaBannerProps = {
    sectionHeading: {
        label: "",
        title: "Enjoyed the article?",
        align: "left",
        class: "px-0! md:px-0! w-full",
    },
    title: "",
    tone: "full",
    size: "xs",
    align: "start",
    paragraphAlign: "left",
    paragraphs: [
        "Subscribe to our newsletter to stay updated with the latest blog posts and exclusive content.",
        "Don't miss out on new insights and stories from our expert authors.",
    ],
    class: "theme-light",
    buttonProps: {
        label: "Get Started",
        href: "#",
        variant: "secondary",
        rounded: "md",
        size: "md",
    },
} satisfies CtaBannerProps;

</script>

<template>
    <article :key="props.id" id="blog-article" :class="classes">
        <div class="col-span-1 md:col-span-2 lg:col-span-6 flex flex-col gap-y-4">
            <header class="flex flex-col gap-y-2">
                <!-- Tag pill -->
                <Badge v-if="tag" v-bind="tag" class="text-xs px-3 py-1" />

                <!-- Title -->
                <h1 class="text-3xl md:text-2xl text-foreground font-semibold leading-tight tracking-tight">
                    {{ title }}
                </h1>
            </header>

            <div class="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                <!-- Author -->
                <BlogCardMeta :authors="props.authors" :date-label="dateLabel" :read-time-label="readTimeLabel"
                    :clickable="clickable" />
            </div>

            <div v-if="imageSrc" class="overflow-hidden rounded-xl bg-muted">
                <img :src="imageSrc" :alt="imageAlt || title" class="w-full aspect-video object-cover" loading="lazy" />
            </div>

            <div v-if="props.bodyContent" class="prose prose-sm md:prose-lg max-w-none prose-foreground">
                <RichTextRenderer :body-content="props.bodyContent" />
            </div>
        </div>
        <div class="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-y-4 sticky top-20 self-start">
            <TocMenu v-if="props.showTocMenu && props.bodyContent" :bodyContent="props.bodyContent"
                container-selector="#blog-article" />

            <AuthorList v-bind="authorListProps" />

            <CtaBanner v-bind="ctaBannerProps" />
        </div>
    </article>
</template>