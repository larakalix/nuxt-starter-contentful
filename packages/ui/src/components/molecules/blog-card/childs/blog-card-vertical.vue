<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { blogCardVariants } from "../variants";
import { Badge, VersatileLink } from "../../../atoms";
import BlogCardMeta from "./blog-card-meta.vue";
import type { BlogCardProps } from "../types";

const props = withDefaults(defineProps<BlogCardProps>(), {
    clickable: true,
    href: undefined,
});

const classes = computed(() =>
    clsx("blog-card-vertical",
        blogCardVariants({ layout: props.layout, clickable: props.clickable }),
        props.class,
    ),
);
</script>

<template>
    <VersatileLink :id="props.id" :href="href" :class="classes" :onNavigate="props.onNavigate">
        <header class="flex flex-col gap-y-2 min-h-15">
            <Badge v-if="props?.tag" v-bind="props.tag" class="text-xs px-3 py-1" />

            <h3 class="text-lg md:text-2xl text-foreground font-semibold leading-tight tracking-tight">
                {{ title }}
            </h3>
        </header>

        <!-- Image -->
        <div v-if="imageSrc" class="overflow-hidden rounded-md bg-muted">
            <img :src="props.imageSrc" :alt="props.imageAlt || title" class="w-full aspect-3/2 object-cover"
                loading="lazy" />
        </div>

        <!-- Footer pushed to bottom -->
        <div class="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <!-- Meta row -->
            <BlogCardMeta :authors="props.authors" :date-label="dateLabel" :read-time-label="readTimeLabel"
                :clickable="clickable" />

            <!-- Excerpt: reserve space even if missing -->
            <p class="text-sm leading-relaxed text-muted-foreground line-clamp-2 min-h-[2.75rem] w-full"
                :class="{ invisible: !props.excerpt }">
                {{ props.excerpt }}
            </p>
        </div>
    </VersatileLink>
</template>
