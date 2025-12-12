<script setup lang="ts">
import type { Component } from "vue";
import { ContentfulType, type SectionBlogCardList, type SectionFooter, type SectionNavbar } from "@starter/content/types";
import { Navbar, Footer, BlogCardList } from "@starter/ui/organisms";
import type { FunnelPageSectionProps } from "./types";
import { mapFooterProps } from "./mappers/footer-mapper";
import { mapNavbarProps } from "./mappers/navbar-mapper";
import { mapBlogCardListProps } from "./mappers/blog-card-list-mapper";

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
            return Navbar;

        case ContentfulType.FOOTER:
            return Footer;

        case ContentfulType.BLOG_CARD_LIST:
            return BlogCardList;

        default:
            // if you have an UnknownSection, return that instead
            return null as unknown as Component;
    }
}

// 🔹 Props are just a plain object for TS (no strict component-props inference)
function getProps(section: AnySection): Record<string, any> {
    let componentProps: Record<string, any> = {};

    switch (section.__typename) {
        case ContentfulType.NAVBAR:
            componentProps = mapNavbarProps(section as SectionNavbar);
            break;

        case ContentfulType.FOOTER:
            componentProps = mapFooterProps(section as SectionFooter);
            break;

        case ContentfulType.BLOG_CARD_LIST:
            componentProps = mapBlogCardListProps(section as SectionBlogCardList);
            break;

        default:
            // unknown section – you could return {} or some debug props
            componentProps = {};
    }

    // Common context available to all sections
    return componentProps;
}

// Extract sections from funnelPage prop
const sections = (props.funnelPage?.structure.sections ?? []) as AnySection[];

// Separate sections by type for layout purposes
const headerSections = sections.filter(s => s.__typename === ContentfulType.NAVBAR);
const footerSections = sections.filter(s => s.__typename === ContentfulType.FOOTER);
const mainSections = sections.filter(s => s.__typename !== ContentfulType.NAVBAR && s.__typename !== ContentfulType.FOOTER);
</script>

<template>
    <component v-for="(section, index) in headerSections" :key="keyFor(section, index)"
        :is="getComponentByTypename(section)" v-bind="getProps(section)" />

    <main class="mx-auto max-w-6xl flex flex-col flex-1 gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <component v-for="(section, index) in mainSections" :key="keyFor(section, index)"
            :is="getComponentByTypename(section)" v-bind="getProps(section)" />
    </main>

    <component v-for="(section, index) in footerSections" :key="keyFor(section, index)"
        :is="getComponentByTypename(section)" v-bind="getProps(section)" />
</template>
