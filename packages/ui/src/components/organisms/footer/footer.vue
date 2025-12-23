<script setup lang="ts">
import { computed, ref } from "vue";
import clsx from "clsx";
import { Button, VersatileLink } from "../../atoms";
import { footerVariants } from "./variants";
import type { FooterProps } from "./types";

const props = withDefaults(
    defineProps<FooterProps>(),
    {
        brandPrimary: "Nuxt",
        brandSecondary: "Blog.",
        description: "Nuxt Blog is a modern blog template built with Nuxt.js and Tailwind CSS. It offers a clean and responsive design for sharing your thoughts and ideas.",
        blogLinks: () => [
            { label: "Travel", href: "#" },
            { label: "Technology", href: "#" },
            { label: "Lifestyle", href: "#" },
            { label: "Fashion", href: "#" },
            { label: "Business", href: "#" },
        ],
        quickLinks: () => [
            { label: "FAQ", href: "#" },
            { label: "Terms & Conditions", href: "#" },
            { label: "Support", href: "#" },
            { label: "Privacy Policy", href: "#" },
        ],
        socialLinks: () => [
            { type: "facebook", href: "#" },
            { type: "twitter", href: "#" },
            { type: "instagram", href: "#" },
            { type: "linkedin", href: "#" },
        ],
        newsletterPlaceholder: "Your Email",
        newsletterButtonLabel: "Subscribe",
        copyright: "Designed by Themefisher & Developed by Gethugothemes",
    },
);

const classes = computed(() =>
    clsx("bg-navbar w-full z-50",
        footerVariants({
            variant: props.variant,
        }),
        props.class
    )
);

const email = ref("");

const emit = defineEmits<{
    (e: "subscribe", email: string): void;
}>();

const onSubmit = () => {
    if (!email.value) return;
    emit("subscribe", email.value);
};
</script>

<template>
    <footer :class="classes" aria-label="Footer">
        <div class="flex max-w-page flex-col gap-10 px-6 py-10 md:px-8 md:py-14">
            <!-- Top grid -->
            <div class="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)]">
                <!-- Brand / description -->
                <VersatileLink href="/" :onNavigate="props.onNavigate">
                    <div class="space-y-4">
                        <div class="inline-flex items-baseline gap-1">
                            <span
                                class="inline-flex rounded-none bg-primary p-1 text-sm font-semibold text-primary-foreground">
                                {{ props.brandPrimary }}
                            </span>
                            <span class="text-lg font-semibold tracking-tight text-foreground">
                                {{ props.brandSecondary }}
                            </span>
                        </div>

                        <p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            {{ props.description }}
                        </p>
                    </div>
                </VersatileLink>

                <!-- Blogs -->
                <div class="space-y-3">
                    <h4 class="text-sm font-semibold text-foreground">Blogs</h4>
                    <ul class="space-y-1.5 text-sm text-muted-foreground">
                        <li v-for="link in blogLinks" :key="link.label">
                            <a :href="link.href" class="hover:text-foreground">
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Quick links -->
                <div class="space-y-3">
                    <h4 class="text-sm font-semibold text-foreground">Quick Links</h4>
                    <ul class="space-y-1.5 text-sm text-muted-foreground">
                        <li v-for="link in quickLinks" :key="link.label">
                            <a :href="link.href" class="hover:text-foreground">
                                {{ link.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Newsletter + socials -->
                <div class="space-y-4">
                    <div class="space-y-2">
                        <h4 class="text-sm font-semibold text-foreground">
                            Subscribe For Newsletter
                        </h4>
                        <form class="flex items-stretch overflow-hidden rounded-md bg-background shadow-xs"
                            @submit.prevent="onSubmit">
                            <input v-model="email" type="email" :placeholder="newsletterPlaceholder"
                                class="w-full border-0 bg-muted/60 px-3 py-2 text-sm text-foreground outline-none focus:ring-0" />
                            <Button type="submit" variant="primary" size="md" rounded="none"
                                class="rounded-none rounded-r-md px-4 text-sm">
                                {{ newsletterButtonLabel }}
                            </Button>
                        </form>
                    </div>

                    <div class="space-y-2">
                        <p class="text-sm font-semibold text-foreground">
                            Follow On:
                        </p>
                        <div class="flex items-center gap-2">
                            <Button v-for="social in socialLinks" :key="social.type + social.href" :as="'a'"
                                :href="social.href" target="_blank" rel="noreferrer" variant="ghost" size="icon"
                                rounded="md" class="border border-border bg-card text-muted-foreground hover:bg-muted"
                                :aria-label="social.label || social.type">
                                <!-- Facebook -->
                                <svg v-if="social.type === 'facebook'" viewBox="0 0 24 24" class="h-4 w-4"
                                    fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.2L16 11h-3v-2c0-.6.4-1 1-1Z" />
                                </svg>

                                <!-- Twitter -->
                                <svg v-else-if="social.type === 'twitter'" viewBox="0 0 24 24" class="h-4 w-4"
                                    fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M18.25 5.75h-2.1l-2.7 3.78L11 5.75H7.75l3.96 5.52L7.5 18.25h2.1l2.78-3.9 2.6 3.9h3.25l-4.16-5.8 4.08-5.75Z" />
                                </svg>

                                <!-- Instagram -->
                                <svg v-else-if="social.type === 'instagram'" viewBox="0 0 24 24" class="h-4 w-4"
                                    fill="none" aria-hidden="true">
                                    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor"
                                        stroke-width="1.6" />
                                    <circle cx="12" cy="12" r="3.3" stroke="currentColor" stroke-width="1.6" />
                                    <circle cx="17" cy="7" r="1" fill="currentColor" />
                                </svg>

                                <!-- LinkedIn -->
                                <svg v-else viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M6.5 6.75A1.75 1.75 0 1 1 3 6.75a1.75 1.75 0 0 1 3.5 0ZM4 9h3v9H4V9Zm5 0h2.8v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 3 0 3.56 1.97 3.56 4.53V18H15v-4.1c0-.98-.02-2.25-1.37-2.25-1.38 0-1.6 1.07-1.6 2.17V18H8.99V9Z" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Divider + bottom text -->
            <div class="h-px w-full bg-border" />

            <p class="text-center text-[11px] text-muted-foreground">
                {{ copyright }}
            </p>
        </div>
    </footer>
</template>
