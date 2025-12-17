<script setup lang="ts">
import type { VersatileLinkProps } from "./types";
import { computed, getCurrentInstance, useAttrs } from "vue";

const props = withDefaults(defineProps<VersatileLinkProps>(), {
  external: false,
  replace: false,
  disabled: false,
});

const attrs = useAttrs();

function isExternalUrl(v: string) {
  return /^[a-z][a-z0-9+.-]*:|^\/\//i.test(v);
}

const rawHref = computed(() => {
  if (typeof props.href === "string" && props.href.length) return props.href;
  if (typeof props.to === "string" && props.to.length) return props.to;
  return "";
});

const NuxtLink = computed(() => {
  const inst = getCurrentInstance();
  return (inst?.appContext.components as any)?.NuxtLink ?? null;
});

const isExternal = computed(() => {
  if (props.external) return true;
  const h = rawHref.value;
  if (!h) return false;
  if (h.startsWith("#")) return true;
  return isExternalUrl(h);
});

const computedRel = computed(() => {
  if (props.rel) return props.rel;
  if (props.target === "_blank") return "noopener noreferrer";
  return undefined;
});

const shouldUseNuxtLink = computed(() => {
  if (props.disabled) return false;
  if (isExternal.value) return false;
  if (!props.to && !rawHref.value) return false;
  return Boolean(NuxtLink.value);
});

const tag = computed(() => (shouldUseNuxtLink.value ? NuxtLink.value : "a"));

const linkProps = computed<Record<string, unknown>>(() => {
  if (shouldUseNuxtLink.value) {
    return {
      to: props.to ?? rawHref.value,
      replace: props.replace,
      prefetch: props.prefetch,
      "aria-label": props.ariaLabel,
    };
  }

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
  if (e.defaultPrevented) return true;
  if (e.button !== 0) return true;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return true;
  if (isExternalUrl(href)) return true;
  return false;
}

const handleClick = async (event: MouseEvent) => {
  const href = rawHref.value;

  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (!href || !props.onNavigate) return;
  if (shouldLetBrowserHandle(event, href)) return;

  event.preventDefault();
  await props.onNavigate(href, event);
};
</script>

<template>
  <component :is="tag" v-bind="mergedProps" @click="handleClick">
    <slot />
  </component>
</template>
