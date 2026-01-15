<script setup lang="ts">
import type { FunnelPageSectionProps } from "./types";
import { computed } from "vue";
import { Error } from "@starter/ui/organisms/error";
import { buildRenderItems } from "./section-renderer";
import { injectTheme } from "./helpers/inject-theme";

const props = defineProps<FunnelPageSectionProps>();
const grouped = computed(() => buildRenderItems(props.funnelPage, Error, 0, props.onNavigate));

injectTheme(props.funnelPage?.theme ?? 'default');
</script>

<template>
    <component v-for="item in grouped.header" :key="item.key" :is="item.component" v-bind="item.props" />

    <main id="root-content" class="mx-auto max-w-page flex flex-col flex-1 gap-4">
        <component v-for="item in grouped.main" :key="item.key" :is="item.component" v-bind="item.props" />
    </main>

    <component v-for="item in grouped.footer" :key="item.key" :is="item.component" v-bind="item.props" />
</template>
