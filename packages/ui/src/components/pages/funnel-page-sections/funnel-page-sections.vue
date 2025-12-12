<script setup lang="ts">
import type { Component } from "vue";
import { ContentfulType } from "@starter/content/types";
import { Navbar, Footer } from "@starter/ui/organisms";
import type { FunnelPageSectionProps } from "./types";

const props = defineProps<FunnelPageSectionProps>();

// Make the section "loose" for the factory, we don't want strict prop inference here
type AnySection = Record<string, any>;

function keyFor(section: AnySection, index: number): string {
    return section.id ?? section.sys?.id ?? `${section.__typename ?? "section"}-${index}`;
}

// 🔹 Switch by __typename, but always return a generic Component
function getComponentByTypename(section: AnySection): Component {
    switch (section.__typename) {
        case ContentfulType.NAVBAR:
        case "SectionNavbar":
            return Navbar;

        case ContentfulType.FOOTER:
        case "SectionFooter":
            return Footer;

        default:
            // if you have an UnknownSection, return that instead
            return null as unknown as Component;
    }
}

// 🔹 Props are just a plain object for TS (no strict component-props inference)
function getProps(section: AnySection): Record<string, any> {
    return {
        ...section,
        section,
        page: props.funnelPage,
    };
}
</script>

<template>
    <!-- pending -->
    <div v-if="pending" class="flex items-center justify-center space-x-1 py-6">
        <span class="dot"></span>
        <span class="dot [animation-delay:0.2s]"></span>
        <span class="dot [animation-delay:0.4s]"></span>
    </div>

    <!-- error -->
    <div v-else-if="error"
        class="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
        <svg class="size-4 flex-shrink-0 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v3m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>

        <span class="leading-snug">
            {{ error?.message }}
        </span>
    </div>

    <!-- sections -->
    <component v-else v-for="(section, index) in (funnelPage?.structure.sections as AnySection[] ?? [])"
        :key="keyFor(section, index)" :is="getComponentByTypename(section)" v-bind="getProps(section)" />
</template>
