<script setup lang="ts">
import { FunnelPageSections } from "@starter/ui/pages";
import { useLandingPage } from "./composables/use-landing-page";
import { Error } from "@starter/ui/organisms";
import { getPageBySlug } from "@starter/content";

const { data: funnelPage, pending, error } = useLandingPage("home");
const contentfulRequest = getPageBySlug("home");
</script>

<template>
  <!-- Pending state -->
  <div v-if="pending" class="flex items-center justify-center space-x-1 py-6">
    <span class="dot"></span>
    <span class="dot [animation-delay:0.2s]"></span>
    <span class="dot [animation-delay:0.4s]"></span>
  </div>

  <!-- Error state -->
  <Error v-else-if="error" :message="error?.message" />

  <FunnelPageSections v-else :funnel-page="funnelPage" :pending="pending" :error="error" />
</template>