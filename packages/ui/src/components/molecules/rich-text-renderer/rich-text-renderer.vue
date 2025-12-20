<script setup lang="ts">
import { computed } from "vue";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, type Document } from '@contentful/rich-text-types';
import { options } from "./options";
import type { RichTextRendererProps } from './types';

const props = withDefaults(defineProps<RichTextRendererProps>(), {
  bodyContent: '',
});

const emptyDoc: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [],
};

const document = computed<Document>(() => {
  if (!props.bodyContent) return emptyDoc;

  try {
    return JSON.parse(props.bodyContent) as Document;
  } catch {
    return emptyDoc;
  }
});

const html = computed(() => documentToHtmlString(document.value, options));

</script>

<template>
  <div class="prose prose-sm md:prose-lg max-w-none prose-foreground" v-html="html" />
</template>
