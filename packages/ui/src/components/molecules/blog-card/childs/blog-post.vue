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
        label: "Top",
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
    items: [
        {
            id: "author-1",
            name: "Andress rasel",
            avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
            avatarAlt: "Andress rasel Avatar",
            role: "Senior Writer",
            bio: "Blogger, activist, content creator, part time web developer.",
            socials: [],
        },
        {
            id: "author-2",
            name: "Jane Doe",
            avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
            avatarAlt: "Jane Doe Avatar",
            role: "Editor",
            bio: "Editor and content strategist with a passion for storytelling.",
            socials: [],
        },
    ],
} satisfies AuthorListProps;

const ctaBannerProps = {
    sectionHeading: {
        label: "",
        title: "Want to travel sikkim by car?",
        class: "px-0! md:px-0!",
    },
    title: "",
    tone: "full",
    size: "xs",
    align: "start",
    paragraphAlign: "left",
    paragraphs: [
        "Did you come here for something in particular or just general Riker-bashing? And blowing into",
    ],
    class: "theme-light",
    buttonProps: {
        label: "Get Started",
        href: "#",
        variant: "outline",
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