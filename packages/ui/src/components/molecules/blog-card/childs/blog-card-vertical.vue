<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";
import { blogCardVariants } from "../variants";
import type { BlogCardProps } from "../types";
import Badge from "../../../atoms/badge/badge.vue";

const props = withDefaults(defineProps<BlogCardProps>(), {
    clickable: true,
});

const asTag = computed(() => (props.href ? "a" : "article"));

const classes = computed(() =>
    clsx("flex flex-col gap-y-4 md:gap-y-6",
        blogCardVariants({ layout: props.layout, clickable: props.clickable }),
        props.class,
    ),
);
</script>

<template>
    <component :id="props.id" :is="asTag" :href="href" :class="classes">
        <header class="flex flex-col gap-y-2 flex-1">
            <!-- Tag pill -->
            <Badge v-if="tag" v-bind="tag" class="text-xs px-3 py-1" />

            <!-- Title -->
            <h3 class="text-lg md:text-2xl text-foreground font-semibold leading-tight tracking-tight">
                {{ title }}
            </h3>
        </header>

        <!-- Image / placeholder -->
        <div v-if="imageSrc" class="overflow-hidden rounded-xl bg-muted">
            <img :src="imageSrc" :alt="imageAlt || title" class="w-full aspect-3/2 object-cover" loading="lazy" />
            <!-- <div v-else class="h-56 w-full sm:h-64" /> -->
        </div>

        <!-- Meta row: author, date, read time -->
        <div class="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <!-- Author -->
            <div class="flex items-center gap-2">
                <div class="h-8 w-8 overflow-hidden rounded-full bg-muted">
                    <img v-if="authorAvatarSrc" :src="authorAvatarSrc" :alt="authorName"
                        class="h-full w-full object-cover aspect-square" loading="lazy" />
                </div>
                <span class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">
                    {{ authorName }}
                </span>
            </div>

            <!-- separator dot -->
            <span class="h-1 w-1 rounded-full bg-secondary" />

            <!-- Date with calendar icon -->
            <div v-if="dateLabel" class="flex items-center gap-1.5">
                <svg class="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5" />
                    <path d="M7 3v3M13 3v3M4 8.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <span class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">{{ dateLabel }}</span>
            </div>

            <!-- separator dot -->
            <template v-if="readTimeLabel">
                <span class="h-1 w-1 rounded-full bg-secondary" />

                <!-- Read time with clock icon -->
                <div class="flex items-center gap-1.5">
                    <svg class="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" />
                        <path d="M10 6v4l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">{{ readTimeLabel
                        }}</span>
                </div>
            </template>
        </div>

        <!-- Excerpt -->
        <p v-if="excerpt" class="text-sm leading-relaxed text-muted-foreground">
            {{ excerpt }}
        </p>
    </component>
</template>