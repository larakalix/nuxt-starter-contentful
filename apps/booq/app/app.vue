<script setup lang="ts">
import type { OnNavigate } from '@starter/ui/atoms';
import { Footer, Navbar } from '@starter/ui/organisms';

const router = useRouter();

const footer = {
  text: '© 2024 Booq App. All rights reserved.',
  links: [
    { title: 'Privacy Policy', to: '/privacy' },
    { title: 'Terms of Service', to: '/terms' },
  ],
}

const onNavigate: OnNavigate = async (href, event) => {
  if (/^[a-z][a-z0-9+.-]*:|^\/\//i.test(href)) return;

  event?.preventDefault();

  const path = href.startsWith("/") ? href : `/${href}`;
  await router.push(path);
};

</script>

<template>
  <NuxtRouteAnnouncer />

  <Navbar variant="secondary" :items="[
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }]" :onNavigate="onNavigate" />

  <main class="max-w-page flex flex-col flex-1 gap-4 px-4 py-10 sm:px-6 lg:px-8">
    Hello from Booq App!
  </main>

  <Footer v-bind="footer" :onNavigate="onNavigate" />
</template>
