<script setup lang="ts">
const LAYOUT = "default";
</script>

<template>
  <NuxtLoadingIndicator color="red" />

  <NuxtRouteAnnouncer />
  <NuxtLayout :name="LAYOUT">
    <NuxtPage />
  </NuxtLayout>
</template>