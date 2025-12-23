<script setup lang="ts">
import { computed, ref } from "vue";
import type { BlogCardProps } from "../types";
import { AuthorBadge } from "../../author-badge";

const props = withDefaults(defineProps<Pick<BlogCardProps, "authors" | "dateLabel" | "readTimeLabel" | "clickable">>(), {
    clickable: true,
});

const hasOne = computed(() => props.authors?.length === 1);
</script>

<template>
    <!-- <div class="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"> -->
    <!-- Authors -->
    <div class="flex items-center">
        <AuthorBadge v-for="(a, i) in props.authors" :key="a.id" :author="a" :variant="hasOne ? 'single' : 'multiple'"
            :isFirst="i === 0" />
    </div>

    <!-- Date -->
    <div v-if="dateLabel" class="hidden @[350px]:flex items-center gap-1.5">
        <span class="h-3 w-1 rounded-full bg-secondary" />
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