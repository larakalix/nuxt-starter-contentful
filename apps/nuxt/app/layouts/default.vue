<script setup lang="ts">
import type { OnNavigate } from '@starter/ui/atoms';
import { Footer, Navbar } from '@starter/ui/organisms';
import { useShellState } from '~/composables/use-layout';


const router = useRouter();
const shell = useShellState();

const onNavigate: OnNavigate = async (href, event) => {
    if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(href)) return;

    event?.preventDefault();

    const path = href.startsWith("/") ? href : `/${href}`;
    await router.push(path);
};
</script>

<template>
    <Navbar v-if="shell.navBar" v-bind="shell.navBar" :onNavigate="onNavigate" />

    <main v-if="!shell.enabled" class="mx-auto max-w-6xl flex flex-col flex-1 gap-4 px-4 py-10 sm:px-6 lg:px-8 w-full">
        <slot />
    </main>
    <slot v-else />

    <Footer v-if="shell.footer" v-bind="shell.footer" :onNavigate="onNavigate" />
</template>
