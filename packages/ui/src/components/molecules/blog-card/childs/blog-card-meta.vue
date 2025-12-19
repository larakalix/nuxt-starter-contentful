<script setup lang="ts">
import type { BlogCardProps } from "../types";

const props = withDefaults(defineProps<Pick<BlogCardProps, "authorName" | "authorAvatarSrc" | "dateLabel" | "readTimeLabel" | "clickable">>(), {
    clickable: true,
});
</script>

<template>
    <!-- <div class="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"> -->
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

    <!-- Date -->
    <div v-if="dateLabel" class="hidden @[350px]:flex items-center gap-1.5">
        <span class="h-1 w-1 rounded-full bg-secondary" />
        <svg class="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5" />
            <path d="M7 3v3M13 3v3M4 8.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <time class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">
            {{ dateLabel }}
        </time>
    </div>

    <!-- Read time -->
    <template v-if="readTimeLabel" class="hidden @[350px]:block">
        <span class="h-1 w-1 rounded-full bg-secondary" />
        <div class="flex items-center gap-1.5">
            <svg class="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" />
                <path d="M10 6v4l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <span class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">
                {{ readTimeLabel }}
            </span>
        </div>
    </template>
    <!-- </div> -->
</template>