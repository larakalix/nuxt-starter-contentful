<!-- packages/ui/src/components/molecules/author-card/AuthorCard.vue -->
<script lang="ts" setup>
import { computed } from "vue";
import clsx from "clsx";
import { authorCardVariants } from "./variants";
import type { AuthorCardProps } from "./types";
import Button from "../../atoms/button/button.vue";

const props = withDefaults(defineProps<AuthorCardProps>(), {
    clickable: false,
    socials: () => [],
});

const classes = computed(() =>
    clsx(
        authorCardVariants({
            clickable: props.clickable,
            align: props.align,
        }),
        props.class,
    ),
);

const hasSocials = computed(() => props.socials && props.socials.length > 0);
</script>

<template>
    <section :class="classes">
        <!-- Avatar -->
        <div class="h-14 w-14 md:h-16 md:w-16 overflow-hidden rounded-full bg-muted flex-shrink-0">
            <img v-if="avatarSrc" :src="avatarSrc" :alt="avatarAlt || name" class="h-full w-full object-cover"
                loading="lazy" />
            <!-- if no avatarSrc, keep the grey circle from Figma via bg-muted -->
        </div>

        <!-- Text + socials -->
        <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-0">
                <h3 class="text-sm md:text-base font-semibold text-muted-foreground">
                    {{ name }}
                </h3>
                <p v-if="bio" class="text-xs md:text-sm text-foreground-muted-subtitle/70 font-normal">
                    {{ bio }}
                </p>
                <p v-if="role" class="text-xs md:text-sm text-foreground-muted-subtitle/70 font-normal">
                    {{ role }}
                </p>
            </div>

            <!-- Social icons -->
            <div v-if="hasSocials" class="flex items-center gap-2">
                <Button v-for="social in socials" :key="social.type + social.href" as="a" :href="social.href"
                    :variant="social.button?.variant" :rounded="social.button?.rounded" :class="social.button?.class"
                    :aria-label="social.label || social.type" target="_blank" rel="noreferrer">
                    <!-- Facebook -->
                    <svg v-if="social.type === 'facebook'" viewBox="0 0 24 24" class="size-4" fill="currentColor"
                        aria-hidden="true">
                        <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.2L16 11h-3v-2c0-.6.4-1 1-1Z" />
                    </svg>

                    <!-- Twitter / X (simplified) -->
                    <svg v-else-if="social.type === 'twitter'" viewBox="0 0 24 24" class="size-4" fill="currentColor"
                        aria-hidden="true">
                        <path
                            d="M18.25 5.75h-2.1l-2.7 3.78L11 5.75H7.75l3.96 5.52L7.5 18.25h2.1l2.78-3.9 2.6 3.9h3.25l-4.16-5.8 4.08-5.75Z" />
                    </svg>

                    <!-- Instagram -->
                    <svg v-else-if="social.type === 'instagram'" viewBox="0 0 24 24" class="size-2" fill="none"
                        aria-hidden="true">
                        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" stroke-width="1.6" />
                        <circle cx="12" cy="12" r="3.3" stroke="currentColor" stroke-width="1.6" />
                        <circle cx="17" cy="7" r="0.9" fill="currentColor" />
                    </svg>

                    <!-- LinkedIn -->
                    <svg v-else-if="social.type === 'linkedin'" viewBox="0 0 24 24" class="size-4" fill="currentColor"
                        aria-hidden="true">
                        <path
                            d="M6.5 6.75A1.75 1.75 0 1 1 3 6.75a1.75 1.75 0 0 1 3.5 0ZM4 9h3v9H4V9Zm5 0h2.8v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 3 0 3.56 1.97 3.56 4.53V18H15v-4.1c0-.98-.02-2.25-1.37-2.25-1.38 0-1.6 1.07-1.6 2.17V18H8.99V9Z" />
                    </svg>

                    <!-- Website / default globe -->
                    <svg v-else viewBox="0 0 24 24" class="size-2" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6" />
                        <path
                            d="M4.5 12h15M12 4.5c2.2 2.3 3.4 4.7 3.4 7.5S14.2 16.7 12 19.5c-2.2-2.8-3.4-5.2-3.4-7.5S9.8 6.8 12 4.5Z"
                            stroke="currentColor" stroke-width="1.6" />
                    </svg>
                </Button>
            </div>
        </div>
    </section>
</template>
