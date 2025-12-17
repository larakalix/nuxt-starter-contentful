<script setup lang="ts">
import { FunnelPageSections, mapFooterProps, mapNavbarProps } from "@starter/ui/pages";
import { usePageStatic } from '~/composables/use-page.server'
import { Error } from "@starter/ui/organisms";
import type { OnNavigate } from "@starter/ui/atoms";
import type { FunnelPage } from "@starter/content";

const router = useRouter();
const shell = useShellState();
const { funnelPage, pending, error, refresh, } = usePageStatic();

watchEffect(() => {
  const page = funnelPage.value as FunnelPage | null;
  if (!page) return;

  if (page.skipWrapper) {
    shell.value.enabled = true;
    shell.value.navBar = page.navBar && mapNavbarProps(page.navBar);
    shell.value.footer = page.footer && mapFooterProps(page.footer);
  }
});

// onBeforeUnmount(() => {
//   shell.value.enabled = true;
//   shell.value.navBar = undefined;
//   shell.value.footer = undefined;
// });

const onNavigate: OnNavigate = async (href, event) => {
  if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(href)) return;

  event?.preventDefault();

  const path = href.startsWith("/") ? href : `/${href}`;
  await router.push(path);
};

</script>

<template>

  <!-- Error state -->
  <Error v-if="error" :message="error?.message" :refresh="refresh" />

  <!-- Success state -->
  <FunnelPageSections v-else :funnel-page="funnelPage" :pending="pending" :error="error" :on-navigate="onNavigate" />

  <!-- Pending state -->
  <div v-if="pending" class="flex items-center justify-center space-x-1 py-6">
    <span class="dot"></span>
    <span class="dot [animation-delay:0.2s]"></span>
    <span class="dot [animation-delay:0.4s]"></span>
  </div>
</template>
