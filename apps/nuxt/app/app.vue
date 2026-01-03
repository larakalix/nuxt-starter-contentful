<script setup lang="ts">
const LAYOUT = "default";
</script>

<template>
  <NuxtLoadingIndicator />

  <NuxtRouteAnnouncer />
  <NuxtLayout :name="LAYOUT">
    <NuxtPage />
  </NuxtLayout>
</template>