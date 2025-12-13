<script setup lang="ts">
import { FunnelPageSections } from "@starter/ui/pages";
import { Error } from "@starter/ui/organisms";
import { setupContentful } from "@starter/content";

// setupContentful({
//   spaceId: process.env.CONTENTFUL_SPACE_ID as string,
//   environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID ?? "master",
//   cdaToken: process.env.CONTENTFUL_CDA_TOKEN as string,
//   previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
//   preview: false,
// });

const slug = "home";

const { data: funnelPage, pending, error, refresh } = useLandingPage(slug);
</script>

<template>
  <NuxtLoadingIndicator />

  <!-- Pending state -->
  <div v-if="pending" class="flex items-center justify-center space-x-1 py-6">
    <span class="dot"></span>
    <span class="dot [animation-delay:0.2s]"></span>
    <span class="dot [animation-delay:0.4s]"></span>
  </div>

  <!-- Error state -->
  <Error v-else-if="error" :message="error?.message" :refresh="refresh" />

  <!-- Success state -->
  <FunnelPageSections v-else :funnel-page="funnelPage" :pending="pending" :error="error" />
</template>