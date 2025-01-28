<script setup lang="ts">
// init user store
useUserStore()

const route = useRoute()

const layoutName = computed(() => route.path.startsWith('/app') ? 'app-mobile' : 'default')
</script>

<template>
  <div class="bg-background text-foreground min-h-screen flex flex-col">
    <NuxtLayout :name="layoutName">
      <NuxtPage />
    </NuxtLayout>

    <CnSonner class="pointer-events-auto" />
  </div>
</template>
