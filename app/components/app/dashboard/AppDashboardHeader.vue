<script setup lang="ts">
const userStore = useUserStore()
</script>

<template>
  <div class="h-12 flex items-center justify-between">
    <div class="text-sm flex gap-1 text-muted-foreground">
      <span>{{ $t('app.dashboard.welcome') }}</span>

      <span class="truncate max-w-36 font-semibold">{{ userStore.user?.name }}</span>  👋
    </div>

    <SlAvatar :name="userStore.user?.name!" />
  </div>
</template>
