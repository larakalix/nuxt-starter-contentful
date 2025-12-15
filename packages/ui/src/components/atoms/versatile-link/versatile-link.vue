<script setup lang="ts">
import type { VersatileLinkProps } from "./types";
import { computed, resolveComponent, useAttrs } from "vue";

const props = withDefaults(defineProps<VersatileLinkProps>(), {
  external: false,
  replace: false,
  prefetch: undefined,
  target: undefined,
  rel: undefined,
  ariaLabel: undefined,
  disabled: false,
  onNavigate: undefined,
});

const attrs = useAttrs();

function isExternalUrl(v: string) {
  // covers http(s), mailto, tel, protocol-relative, etc.
  return /^[a-z][a-z0-9+.-]*:|^\/\//i.test(v);
}

const rawHref = computed(() => {
  if (typeof props.href === "string" && props.href.length) return props.href;
  if (typeof props.to === "string" && props.to.length) return props.to;
  return "";
});

const isExternal = computed(() => {
  if (props.external) return true;
  const h = rawHref.value;
  if (!h) return false;
  // absolute/protocol links => external, hash links are treated as "external" too (use <a>)
  if (isExternalUrl(h) || h.startsWith("#")) return true;
  return false;
});

const computedRel = computed(() => {
  // safe defaults for target=_blank
  if (props.rel) return props.rel;
  if (props.target === "_blank") return "noopener noreferrer";
  return undefined;
});

const NuxtLink = computed(() => {
  try {
    return resolveComponent("NuxtLink");
  } catch {
    return null;
  }
});

const shouldUseNuxtLink = computed(() => {
  if (props.disabled) return false;
  if (isExternal.value) return false;
  if (!props.to && !rawHref.value) return false;
  return !!NuxtLink.value;
});

const tag = computed(() => (shouldUseNuxtLink.value ? NuxtLink.value : "a"));

const linkProps = computed(() => {
  if (shouldUseNuxtLink.value) {
    return {
      to: props.to ?? rawHref.value,
      replace: props.replace,
      prefetch: props.prefetch,
      "aria-label": props.ariaLabel,
    };
  }

  // <a> fallback (Astro / Storybook / external)
  return {
    href: rawHref.value || undefined,
    target: props.target,
    rel: computedRel.value,
    "aria-label": props.ariaLabel,
  };
});

const mergedProps = computed(() => ({
  ...attrs,
  ...linkProps.value,
  "aria-disabled": props.disabled ? "true" : undefined,
  tabindex: props.disabled ? -1 : attrs.tabindex,
}));

function shouldLetBrowserHandle(e: MouseEvent, href: string) {
  // allow new tab / new window patterns
  if (e.defaultPrevented) return true;
  if (e.button !== 0) return true; // not left click
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return true;

  // external links: let browser handle
  const isExternal = /^[a-z][a-z0-9+.-]*:|^\/\//i.test(href);
  if (isExternal) return true;

  return false;
}

const handleClick = async (href: string, event: MouseEvent) => {
  // if you didn't pass onNavigate, do nothing; browser navigates via <a href>
  if (!props.onNavigate) return;

  // respect normal browser behaviors
  if (shouldLetBrowserHandle(event, href)) return;

  // we DO want to intercept
  event.preventDefault();
  await props.onNavigate(href, event);
};
</script>

<template>
  <component :is="tag" v-bind="mergedProps" @click="handleClick(rawHref, $event)">
    <slot />
  </component>
</template>
