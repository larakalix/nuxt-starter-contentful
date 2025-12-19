<script setup lang="ts">
import { FunnelPageSections, mapFooterProps, mapNavbarProps } from "@starter/ui/pages";
import { usePageStatic } from '~/composables/use-page.server'
import { Error } from "@starter/ui/organisms";
import type { OnNavigate } from "@starter/ui/atoms";

const router = useRouter();
const shell = useShellState();
const { funnelPage, pending, error, refresh, } = usePageStatic();

watchEffect(() => {
  const _funnelPage = funnelPage.value;
  if (!_funnelPage?.page) return;

  if (_funnelPage.page.skipWrapper) {
    shell.value = {
      ...shell.value,
      enabled: true,
      navBar: _funnelPage.page.navBar ? mapNavbarProps(_funnelPage.page.navBar) : undefined,
      footer: _funnelPage.page.footer ? mapFooterProps(_funnelPage.page.footer) : undefined,
    };
  }
});

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
  <FunnelPageSections v-else :funnel-page="funnelPage?.page" :pending="pending" :error="error"
    :on-navigate="onNavigate" />

  <!-- Pending state -->
  <div v-if="pending" class="flex items-center justify-center space-x-1 py-6">
    <span class="dot"></span>
    <span class="dot [animation-delay:0.2s]"></span>
    <span class="dot [animation-delay:0.4s]"></span>
  </div>
</template>
