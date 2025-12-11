<script lang="ts" setup>
import { computed, ref } from "vue";
import Button from "../../atoms/button/button.vue";
import { navbarVariants } from "./variant";
import type { NavbarProps } from "./types";
import clsx from "clsx";

const props = withDefaults(defineProps<NavbarProps>(), {
    items: () => [],
    logoText: "Acme",
    variant: "solid",
    sticky: true,
    showBorder: true,
});

const emit = defineEmits<{
    (event: "login"): void;
    (event: "logout"): void;
    (event: "createAccount"): void;
}>();

const isOpen = ref(false);

const classes = computed(() =>
    clsx("bg-navbar w-full z-50",
        navbarVariants({
            variant: props.variant,
            sticky: props.sticky,
            showBorder: props.showBorder,
        })
    )
);
</script>

<template>
    <header :class="classes" aria-label="Main navigation">
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <!-- LEFT: Logo -->
            <div class="flex items-center gap-3">
                <slot name="logo">
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                        <g fill="none" fill-rule="evenodd">
                            <path d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                                fill="#FFF" />
                            <path d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z" fill="#555AB9" />
                            <path d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z" fill="#91BAF8" />
                        </g>
                    </svg>

                    <h1 class="text-lg font-semibold tracking-tight">
                        {{ logoText }}
                    </h1>
                </slot>
            </div>

            <!-- DESKTOP NAV ITEMS -->
            <nav class="hidden items-center gap-6 md:flex">
                <a v-for="item in items" :key="item.href" :href="item.href"
                    class="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                    {{ item.label }}
                </a>
            </nav>

            <!-- RIGHT: User + CTA -->
            <div class="hidden items-center gap-3 md:flex">
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
                <a v-for="item in items" :key="item.href" :href="item.href"
                    class="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
                    @click="isOpen = false">
                    {{ item.label }}
                </a>

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
