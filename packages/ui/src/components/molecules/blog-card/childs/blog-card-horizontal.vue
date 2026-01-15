<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { blogCardVariants } from "../variants";
import { Badge } from "../../../atoms/badge";
import { VersatileLink } from "../../../atoms/versatile-link";
import BlogCardMeta from "./blog-card-meta.vue";
import type { BlogCardProps } from "../types";

const props = withDefaults(defineProps<BlogCardProps>(), {
    clickable: true,
});

const classes = computed(() =>
    clsx("blog-card-horizontal",
        blogCardVariants({ layout: props.layout, clickable: props.clickable }),
        props.class,
    ),
);
</script>

<template>
    <VersatileLink :id="props.id" :href="props.href" :class="classes" :onNavigate="props.onNavigate">
        <!-- Image column -->
        <div v-if="imageSrc"
            class="hidden @[500px]:block max-w-full md:max-w-1/3 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
            <img :src="imageSrc" :alt="imageAlt || title" class="h-full w-full aspect-3/2 object-cover"
                loading="lazy" />
        </div>

        <!-- Content column -->
        <div class="flex flex-1 flex-col gap-3">
            <header class="flex flex-col gap-y-2">
                <!-- Tag pill -->
                <Badge v-if="tag" v-bind="tag" class="text-xs px-3 py-1" />

                <!-- Title -->
                <h3 class="text-base @[550px]:text-2xl text-foreground font-semibold leading-tight tracking-tight">
                    {{ title }}
                </h3>
            </header>

            <!-- Meta row: author, date, read time -->
            <div class="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <BlogCardMeta :authors="props.authors" :date-label="dateLabel" :read-time-label="readTimeLabel"
                    :clickable="clickable" />

                <!-- Excerpt -->
                <p class="text-sm leading-relaxed text-muted-foreground line-clamp-3 min-h-[2.75rem] w-full"
                    :class="{ invisible: !excerpt }">
                    {{ excerpt }}
                </p>
            </div>
        </div>
    </VersatileLink>
</template>