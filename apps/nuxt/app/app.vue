<script setup lang="ts">
import { FunnelPageSections } from "@starter/ui/wrappers";
import { useLandingPage } from "./composables/use-landing-page";

const { data: funnelPage, pending, error } = useLandingPage("home");
</script>

<template>
  <FunnelPageSections :funnel-page="funnelPage" :pending="pending" :error="error" />
</template>