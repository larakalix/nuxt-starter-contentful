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
    <component :id="props.id" :is="asTag" :href="href" :class="['flex h-full flex-col gap-y-4', classes]">
        <header class="flex flex-col gap-y-2 flex-1">
            <Badge v-if="tag" v-bind="tag" class="text-xs px-3 py-1" />

            <h3 class="text-lg md:text-2xl text-foreground font-semibold leading-tight tracking-tight">
                {{ title }}
            </h3>
        </header>

        <!-- Image -->
        <div v-if="imageSrc" class="overflow-hidden rounded-xl bg-muted">
            <img :src="imageSrc" :alt="imageAlt || title" class="w-full aspect-3/2 object-cover" loading="lazy" />
        </div>

        <!-- Footer pushed to bottom -->
        <div class="mt-auto flex flex-col gap-4">
            <!-- Meta row -->
            <div class="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                <div class="flex items-center gap-2">
                    <div class="h-8 w-8 overflow-hidden rounded-full bg-muted">
                        <img v-if="authorAvatarSrc" :src="authorAvatarSrc" :alt="authorName"
                            class="h-full w-full object-cover aspect-square" loading="lazy" />
                    </div>
                    <span class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">
                        {{ authorName }}
                    </span>
                </div>

                <span class="h-1 w-1 rounded-full bg-secondary" />

                <div v-if="dateLabel" class="flex items-center gap-1.5">
                    <!-- calendar icon... -->
                    <span class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">{{ dateLabel }}</span>
                </div>

                <template v-if="readTimeLabel">
                    <span class="h-1 w-1 rounded-full bg-secondary" />
                    <div class="flex items-center gap-1.5">
                        <!-- clock icon... -->
                        <span class="text-xs md:text-sm font-normal text-foreground-muted-subtitle">{{ readTimeLabel
                            }}</span>
                    </div>
                </template>
            </div>

            <!-- Excerpt: reserve space even if missing -->
            <p class="text-sm leading-relaxed text-muted-foreground line-clamp-2 min-h-[2.75rem]"
                :class="{ invisible: !excerpt }">
                {{ excerpt }}
            </p>
        </div>
    </component>
</template>
