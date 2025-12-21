<script lang="ts" setup>
import { computed, ref } from "vue";
import clsx from "clsx";
import Button from "../../atoms/button/button.vue";
import { navbarVariants } from "./variant";
import type { NavbarProps } from "./types";
import { VersatileLink } from "../../atoms";

const props = withDefaults(defineProps<NavbarProps>(), {
    items: () => [],
    variant: "solid",
    sticky: true,
    showBorder: true,
    brandPrimary: "Nuxt",
    brandSecondary: "Blog.",
});

const emit = defineEmits<{
    (event: "login"): void;
    (event: "logout"): void;
    (event: "createAccount"): void;
}>();

const isOpen = ref(false);

const classes = computed(() =>
    clsx("bg-navbar",
        navbarVariants({
            variant: props.variant,
            sticky: props.sticky,
            showBorder: props.showBorder,
        }),
        props.class
    )
);
</script>

<template>
    <header :class="classes" aria-label="Main navigation">
        <div class="flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <!-- LEFT: Logo -->
            <div class="flex items-center gap-3 px-2 md:px-6">
                <VersatileLink href="/" :onNavigate="props.onNavigate">
                    <slot name="logo">
                        <div class="inline-flex items-baseline gap-1">
                            <span
                                class="inline-flex rounded-sm bg-primary px-2 py-1 text-sm font-semibold text-primary-foreground">
                                {{ props.brandPrimary }}
                            </span>
                            <span class="text-lg font-semibold tracking-tight text-foreground">
                                {{ props.brandSecondary }}
                            </span>
                        </div>
                    </slot>
                </VersatileLink>
            </div>

            <!-- DESKTOP NAV ITEMS -->
            <nav class="hidden items-center gap-6 md:flex">
                <VersatileLink v-for="item in items" :key="item.href" :href="item.href" :onNavigate="props.onNavigate"
                    class="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                    {{ item.label }}
                </VersatileLink>
            </nav>

            <!-- RIGHT: User + CTA -->
            <div class="hidden items-center gap-3 md:flex px-2 md:px-6">
                <slot name="right">
                    <!-- Auth state -->
                    <template v-if="user">
                        <span class="text-sm text-muted-foreground">
                            Welcome, <b>{{ user.name }}</b>!
                        </span>
                        <Button size="sm" variant="danger" @click="emit('logout')">
                            Log out
                        </Button>
                    </template>

                    <template v-else>
                        <Button size="sm" variant="primary" @click="emit('login')">
                            Log in
                        </Button>
                        <Button v-if="ctaLabel" size="sm" variant="primary" as="a" :href="ctaHref"
                            @click="emit('createAccount')">
                            {{ ctaLabel }}
                        </Button>
                    </template>
                </slot>
            </div>

            <!-- MOBILE MENU BUTTON -->
            <button type="button"
                class="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:bg-muted hover:text-foreground md:hidden"
                :aria-expanded="isOpen" aria-label="Toggle navigation" @click="isOpen = !isOpen">
                <span class="sr-only">Toggle menu</span>
                <div class="relative h-4 w-5">
                    <span class="absolute left-0 top-0 h-0.5 w-full bg-foreground transition-transform"
                        :class="isOpen ? 'translate-y-1.5 rotate-45' : ''" />
                    <span class="absolute left-0 top-1.5 h-0.5 w-full bg-foreground transition-opacity"
                        :class="isOpen ? 'opacity-0' : 'opacity-100'" />
                    <span class="absolute left-0 top-3 h-0.5 w-full bg-foreground transition-transform"
                        :class="isOpen ? '-translate-y-1.5 -rotate-45' : ''" />
                </div>
            </button>
        </div>

        <!-- MOBILE MENU -->
        <div v-if="isOpen" class="border-t border-border bg-background md:hidden">
            <div class="space-y-1 px-4 py-3">
                <VersatileLink v-for="item in items" :key="item.href" :href="item.href"
                    class="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                    :onNavigate="props.onNavigate" @click="isOpen = false">
                    {{ item.label }}
                </VersatileLink>

                <!-- Mobile auth block -->
                <div class="mt-3 space-y-2">
                    <template v-if="user">
                        <div class="text-sm text-muted-foreground">
                            Welcome, <b>{{ user.name }}</b>!
                        </div>
                        <Button class="w-full justify-center" size="md" variant="danger" @click="
                            emit('logout');
                        isOpen = false;
                        ">
                            Log out
                        </Button>
                    </template>

                    <template v-else>
                        <Button class="w-full justify-center" size="md" variant="primary" @click="
                            emit('login');
                        isOpen = false;
                        ">
                            Log in
                        </Button>

                        <Button v-if="ctaLabel" class="w-full justify-center" size="md" variant="primary" as="a"
                            :href="ctaHref" @click="
                                emit('createAccount');
                            isOpen = false;
                            ">
                            {{ ctaLabel }}
                        </Button>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>
