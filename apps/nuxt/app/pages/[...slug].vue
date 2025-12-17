<script setup lang="ts">
import { FunnelPageSections } from "@starter/ui/pages";
import { usePageStatic } from '~/composables/use-page.server'
import { Error } from "@starter/ui/organisms";
import { VersatileLink, type OnNavigate } from "@starter/ui/atoms";

const router = useRouter();

const { slug, funnelPage, pending, error, refresh, } = usePageStatic();

const onNavigate: OnNavigate = async (href, event) => {
  console.log('[ON_NAVIGATE] -> ', {
    href
  })

  // allow external links to behave normally
  if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(href)) return;

  event?.preventDefault();

  // ensure internal paths are absolute
  const path = href.startsWith("/") ? href : `/${href}`;
  await router.push(path);
};

</script>

<template>
  <section class="flex flex-col min-h-screen">
    <NuxtLoadingIndicator />

    <pre>
      {{ JSON.stringify({ slug }, null, 2) }}
    </pre>

    <ul class="flex gap-x-2 px-2 my-2">
      <li>
        <!-- <button class="bg-blue-400 p-2 rounded cursor-pointer" @click="() => onNavigate('/')">Home</button> -->
        <NuxtLink class="bg-blue-400 p-2 rounded cursor-pointer" to="/">Home</NuxtLink>
      </li>
      <li>
        <!-- <button class="bg-blue-400 p-2 rounded cursor-pointer" @click="() => onNavigate('/about')">About</button> -->
        <NuxtLink class="bg-blue-400 p-2 rounded cursor-pointer" to="/about">About</NuxtLink>
      </li>
      <li>
        <VersatileLink class="bg-blue-400 p-2 rounded cursor-pointer text-white" :to="`/`" @navigate="onNavigate">Funnel
          Home
        </VersatileLink>
      </li>
      <li>
        <VersatileLink class="bg-blue-400 p-2 rounded cursor-pointer text-white" :to="`/about`" @navigate="onNavigate">
          About
        </VersatileLink>
      </li>
    </ul>

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