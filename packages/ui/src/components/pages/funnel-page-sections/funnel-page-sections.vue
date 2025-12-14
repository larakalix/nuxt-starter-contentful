<script setup lang="ts">
import type { FunnelPageSectionProps } from "./types";
import { computed } from "vue";
import { Error } from "@starter/ui/organisms";
import { buildRenderItems, type BaseSection } from "./helpers/section-renderer";

const props = defineProps<FunnelPageSectionProps>();
const { funnelPage } = props;

const sections = computed(() => {
    return (funnelPage?.template.sectionsCollection.items ?? []) as BaseSection[];
});

const grouped = computed(() => buildRenderItems(sections.value, Error));

</script>

<template>
    <pre>
    {{
        JSON.stringify(funnelPage, null, 2)
    }}
    </pre>

    <component v-if="grouped.header" :key="grouped.header.key" :is="grouped.header.component"
        v-bind="grouped.header.props" />

    <main class="mx-auto max-w-6xl flex flex-col flex-1 gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <component v-for="item in grouped.main" :key="item.key" :is="item.component" v-bind="item.props" />
    </main>

    <component v-if="grouped.footer" :key="grouped.footer.key" :is="grouped.footer.component"
        v-bind="grouped.footer.props" />
</template>
