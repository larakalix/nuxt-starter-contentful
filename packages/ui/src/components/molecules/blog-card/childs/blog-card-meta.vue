<script setup lang="ts">
import { computed, ref } from "vue";
import { AuthorBadge } from "../../author-badge";
import { CalendarDays, Clock } from "lucide-vue-next";
import type { BlogCardProps } from "../types";

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
        <span class="h-5 w-[2px] rounded-full bg-secondary" />
        <CalendarDays class="size-3.5 text-muted-foreground/80 group-hover:text-muted-foreground" />

        <time class="text-xs md:text-sm font-normal text-muted-foreground/80 group-hover:text-muted-foreground">
            {{ dateLabel }}
        </time>
    </div>

    <!-- Read time -->
    <template v-if="readTimeLabel" class="hidden @[350px]:block">
        <span class="h-5 w-[2px] rounded-full bg-secondary" />
        <div class="flex items-center gap-1.5">
            <Clock class="size-3.5 text-muted-foreground/80 group-hover:text-muted-foreground" />

            <span class="text-xs md:text-sm font-normal text-muted-foreground/80 group-hover:text-muted-foreground">
                {{ readTimeLabel }}
            </span>
        </div>
    </template>
    <!-- </div> -->
</template>