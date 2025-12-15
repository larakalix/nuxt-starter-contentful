<script setup lang="ts">
import type { FunnelPageSectionProps } from "./types";
import { computed } from "vue";
import { Error } from "@starter/ui/organisms";
import { buildRenderItems } from "./helpers/section-renderer";

const props = defineProps<FunnelPageSectionProps>();
const grouped = computed(() => buildRenderItems(props.funnelPage, Error, props.onNavigate));

// injectTheme(props.funnelPage.theme);
</script>

<template>
    <component v-for="item in grouped.header" :key="item.key" :is="item.component" v-bind="item.props" />

    <main class="mx-auto max-w-6xl flex flex-col flex-1 gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <component v-for="item in grouped.main" :key="item.key" :is="item.component" v-bind="item.props" />
    </main>

    <component v-for="item in grouped.footer" :key="item.key" :is="item.component" v-bind="item.props" />
</template>
