<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { BLOCKS } from "@contentful/rich-text-types";
import { slugify, getPlainTextFromNode } from "./../../../utils/blog.utils";
import { findScrollRoot, headingSelector } from "./helpers/toc-menu.helpers";
import type { Document } from "@contentful/rich-text-types";
import type { PostTocProps, TocItem } from "./types";
import { clsx } from "clsx";
import { tocMenuVariants } from "./variants";

const props = withDefaults(defineProps<PostTocProps>(), {
  containerSelector: "#root-content",
  scrollOffset: 0,
  variant: "default",
});

const activeId = ref("");
const lockActiveUntil = ref(0);

let observer: IntersectionObserver | null = null;

const emptyDoc: Document = { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] };

const doc = computed<Document>(() => {
  try {
    return props.bodyContent ? (JSON.parse(props.bodyContent) as Document) : emptyDoc;
  } catch {
    return emptyDoc;
  }
});

const items = computed<TocItem[]>(() => {
  const counts = new Map<string, number>();

  const uniqueIdFromTitle = (title: string) => {
    const base = slugify(title) || "section";
    const prev = counts.get(base) ?? 0;
    const next = prev + 1;
    counts.set(base, next);

    return next === 1 ? base : `${base}-${next}`;
  };

  const out: TocItem[] = [];
  for (const node of doc.value.content ?? []) {
    const isHeading = [
      BLOCKS.HEADING_1,
      BLOCKS.HEADING_2,
      BLOCKS.HEADING_3,
      BLOCKS.HEADING_4,
      BLOCKS.HEADING_5,
      BLOCKS.HEADING_6].includes(node.nodeType);

    if (!isHeading) continue;

    const text = getPlainTextFromNode(node).trim();
    if (!text) continue;

    const level = {
      [BLOCKS.HEADING_1]: 1,
      [BLOCKS.HEADING_2]: 2,
      [BLOCKS.HEADING_3]: 3,
      [BLOCKS.HEADING_4]: 4,
      [BLOCKS.HEADING_5]: 5,
      [BLOCKS.HEADING_6]: 6,
    };
    const tocItemLevel = level[node.nodeType as keyof typeof level] || 6;

    out.push({
      id: uniqueIdFromTitle(text),
      text,
      level: tocItemLevel as TocItem['level'],
    });
  }

  return out;
});

const setActive = (id: string) => {
  activeId.value = id;
}

const scrollToId = (id: string) => {
  setActive(id);

  const el = document.getElementById(id);
  if (!el) return;

  lockActiveUntil.value = Date.now() + 800;

  if (!props.scrollOffset) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - props.scrollOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

async function initObserver() {
  observer?.disconnect();
  observer = null;

  await nextTick();
  await nextTick();

  const container = document.querySelector(props.containerSelector) as HTMLElement | null;
  if (!container) return;

  const headings = Array.from(container.querySelectorAll<HTMLElement>(headingSelector));
  if (!headings.length) return;

  setActive(headings[0].id);

  const scrollRoot = findScrollRoot(container);

  observer = new IntersectionObserver(
    (entries) => {
      if (Date.now() < lockActiveUntil.value) return;

      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

      const id = (visible?.target as HTMLElement | undefined)?.id;
      if (id) setActive(id);
    },
    {
      root: scrollRoot,
      threshold: 0,
      rootMargin: "-20% 0px -70% 0px",
    }
  );

  headings.forEach((h) => observer!.observe(h));
}

const classes = computed(() => [
  "toc-menu",
  clsx(
    tocMenuVariants({
      variant: props.variant || "default",
    }),
  )
]);

onMounted(() => {
  initObserver();
});

watch(
  () => props.bodyContent,
  () => {
    initObserver();
  }
);

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <nav v-if="items.length" class="hidden md:flex flex-col mb-6">
    <p class="text-xs md:text-sm font-bold uppercase text-muted-foreground">
      On this page
    </p>

    <ul class="mt-3 space-y-2">
      <li v-for="item in items" :key="item.id" :class="tocMenuVariants">
        <button type="button" class="w-full text-left text-sm leading-5 transition" :class="item.id === activeId
          ? 'font-semibold text-primary hover:text-primary.30'
          : 'text-muted-foreground hover:text-foreground'" @click="scrollToId(item.id)">
          {{ item.text }}
        </button>
      </li>
    </ul>
  </nav>
</template>
