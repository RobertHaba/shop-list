<script setup lang="ts">
// init user store
useUserStore()
</script>

<template>
  <div class="bg-background text-foreground min-h-screen flex flex-col">
    <NuxtLayout name="app-mobile">
      <NuxtPage />
    </NuxtLayout>

    <CnSonner class="pointer-events-auto" />
  </div>
</template>
