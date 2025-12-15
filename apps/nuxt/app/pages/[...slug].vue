<script setup lang="ts">
import { FunnelPageSections } from "@starter/ui/pages";
import { usePage } from '~/composables/use-page'
import { Error } from "@starter/ui/organisms";
import type { OnNavigate } from "@starter/ui/atoms";

const route = useRoute()
const router = useRouter()

const segments = computed<string[]>(() => {
  const s = route.params.slug
  if (!s) return []
  return Array.isArray(s) ? s : [s]
})

const { data: funnelPage, pending, error, refresh } = usePage(segments.value);

const onNavigate: OnNavigate = async (href, event) => {
  event?.preventDefault();
  await router.push(href);
};
</script>

<template>
  <section class="flex flex-col min-h-screen">
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
    <FunnelPageSections v-else :funnel-page="funnelPage" :pending="pending" :error="error" :on-navigate="onNavigate" />
  </section>
</template>