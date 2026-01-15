<script lang="ts" setup>
import { computed } from "vue";
import clsx from "clsx";
import { ctaBannerVariants } from "./variants";
import { Button } from "../../atoms/button";
import { SectionHeading } from "../section-heading";
import type { CtaBannerProps } from "./types";

const props = withDefaults(defineProps<CtaBannerProps>(), {
    tone: "soft",
    size: "md",
    align: "center",
    paragraphAlign: "center",
    rounded: "sm",
    paragraphs: () => [],
});

const classes = computed(() =>
    clsx("cta-banner",
        ctaBannerVariants({
            tone: props.tone,
            size: props.size,
            align: props.align,
            paragraphAlign: props.paragraphAlign,
            rounded: props.rounded,
        }),
        props.class,
    ),
);

const paragraphAlignClass = computed(() => clsx({
    "text-left": props.paragraphAlign === "left",
    "text-center": props.paragraphAlign === "center",
    "text-right": props.paragraphAlign === "right",
}));
</script>

<template>
    <section :class="classes">
        <div class="flex w-full max-w-xl flex-col items-center text-center gap-2">
            <!-- Brand title -->
            <SectionHeading v-if="props.sectionHeading" v-bind="props.sectionHeading" />

            <!-- Main title -->
            <h3 class="text-base md:text-lg font-semibold text-foreground">
                {{ title }}
            </h3>

            <!-- Subtitle / description -->
            <div
                :class="['space-y-2 text-xs md:text-sm leading-relaxed text-foreground-muted-subtitle', paragraphAlignClass]">
                <p v-if="subtitle">
                    {{ subtitle }}
                </p>

                <!-- If user provides slot content, use that instead of paragraphs -->
                <slot v-if="$slots.default" />

                <template v-else>
                    <p v-for="(paragraph, idx) in paragraphs" :key="idx">
                        {{ paragraph }}
                    </p>
                </template>
            </div>

            <!-- CTA Button -->
            <Button v-if="buttonProps" v-bind="buttonProps" :as="'versatile-link'" :onNavigate="props.onNavigate">
                {{ buttonProps?.label }}
            </Button>
        </div>
    </section>
</template>
